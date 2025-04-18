
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
 */
export const getPdfUrl = (fileName: string): string => {
  // This is a placeholder implementation
  // In a real application, this would be replaced with actual URLs to PDF files,
  // possibly using a file storage solution
  
  // For demonstration purposes only
  const pdfs: Record<string, string> = {
    "marketing_guide.pdf": "https://example.com/files/marketing_guide.pdf",
    "seo_checklist.pdf": "https://example.com/files/seo_checklist.pdf",
    "beginners_guide.pdf": "https://example.com/files/beginners_guide.pdf"
  };
  
  return pdfs[fileName] || "https://example.com/files/default.pdf";
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
    
    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
