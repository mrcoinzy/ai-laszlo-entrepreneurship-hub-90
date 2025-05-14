import { supabaseAdmin } from "@/lib/supabase";

/**
 * Track PDF download
 * 
 * @param userEmail Email of the user downloading the PDF
 * @param fileName Name of the PDF file being downloaded
 */
export const trackPdfDownload = async (userEmail: string, fileName: string) => {
  try {
    // Only track if both email and filename are provided
    if (!userEmail || !fileName) {
      console.warn("PDF tracking requires both email and filename");
      return;
    }

    console.log(`Tracking PDF download: ${fileName} by ${userEmail}`);
    
    // For now, we log to console
    // When pdf_downloads table is created, we can uncomment this to track in the database:
    /*
    const { data, error } = await supabaseAdmin
      .from('pdf_downloads')
      .insert({
        user_email: userEmail,
        file_name: fileName,
        download_date: new Date().toISOString()
      });
    
    if (error) {
      console.error("Failed to track PDF download in database:", error);
    }
    */
  } catch (err) {
    console.error("Failed to track PDF download:", err);
  }
};

/**
 * Get the downloadable PDF URL
 * 
 * @param fileName Name of the PDF file
 * @returns URL to the PDF file
 * 
 * Note: A tényleges PDF fájlokat a /public/assets/pdfs/ mappába kell helyezni, 
 * hogy a letöltés működjön. A pdfs mappa létrehozása szükséges, 
 * ha még nem létezik.
 */
export const getPdfUrl = (fileName: string): string => {
  // A helyes elérési út a /public/assets/pdfs/ mappában lévő PDF fájlokhoz
  // Ezeket a fájlokat manuálisan kell elhelyezni
  // Relatív útvonalat használunk, hogy a build után is működjön
  
  // For demonstration purposes only
  const pdfs: Record<string, string> = {
    "marketing_guide.pdf": "/assets/pdfs/marketing_guide.pdf",
    "seo_checklist.pdf": "/assets/pdfs/seo_checklist.pdf",
    "beginners_guide.pdf": "/assets/pdfs/beginners_guide.pdf",
    "konverzio_pszichologia_2025.pdf": "/assets/pdfs/konverzio_pszichologia_2025.pdf"
  };
  
  // Ha létezik a megadott nevű PDF, visszaadjuk az útvonalát, különben egy alapértelmezett PDF-et
  return pdfs[fileName] || "/assets/pdfs/default.pdf";
};

/**
 * Download a PDF file and track the download
 * 
 * @param fileName Name of the PDF file
 * @param userEmail Email of the user downloading the PDF
 */
export const downloadAndTrackPdf = async (fileName: string, userEmail: string) => {
  try {
    // Track the download
    await trackPdfDownload(userEmail, fileName);
    
    // Get the URL for the PDF
    const pdfUrl = getPdfUrl(fileName);
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
