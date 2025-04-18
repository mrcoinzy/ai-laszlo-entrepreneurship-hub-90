
import { supabase } from "./supabase";

/**
 * Tracks a PDF download by a user
 * @param userEmail The email of the user downloading the PDF
 * @param fileName The name of the PDF file being downloaded
 * @returns Promise resolving to success status and any error
 */
export const trackPdfDownload = async (userEmail: string, fileName: string) => {
  try {
    const { data, error } = await supabase
      .from('pdf_downloads')
      .insert({
        user_email: userEmail,
        file_name: fileName,
        download_date: new Date().toISOString()
      });
      
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error("Error tracking PDF download:", error);
    return { success: false, error };
  }
};

/**
 * Utility function to create a PDF download link with tracking
 * @param pdfUrl The URL of the PDF file
 * @param fileName The name to use for the downloaded file
 * @param userEmail The email of the user downloading the PDF
 * @returns A function that handles the download and tracking
 */
export const createTrackedPdfDownload = (pdfUrl: string, fileName: string, userEmail: string) => {
  return async () => {
    try {
      // First track the download
      await trackPdfDownload(userEmail, fileName);
      
      // Then trigger the actual download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return true;
    } catch (error) {
      console.error("Error in PDF download:", error);
      return false;
    }
  };
};

/**
 * Creates a wrapper component that tracks PDF downloads
 * @param Component The component to wrap
 * @returns A wrapped component that tracks PDF downloads
 */
export const withPdfTracking = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const handleDownload = async (pdfUrl: string, fileName: string, userEmail: string) => {
      await trackPdfDownload(userEmail, fileName);
      // Continue with the original download functionality
      if (props.onDownload) {
        props.onDownload(pdfUrl, fileName);
      }
    };
    
    return <Component {...props} onDownload={handleDownload} />;
  };
};
