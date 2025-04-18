
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Loader2, Download, Calendar, Mail, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PdfDownload {
  id: string;
  created_at: string;
  user_email: string;
  file_name: string;
  download_date: string;
}

const PdfDownloadsList = () => {
  const [isExporting, setIsExporting] = useState(false);

  const { data: pdfDownloads, isLoading, error, refetch } = useQuery({
    queryKey: ['pdf-downloads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pdf_downloads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PdfDownload[];
    }
  });

  const handleExportCSV = async () => {
    if (!pdfDownloads || pdfDownloads.length === 0) {
      toast.error("No data to export");
      return;
    }

    setIsExporting(true);
    try {
      // Create CSV content
      const headers = ["Email", "File Name", "Download Date"];
      const csvContent = [
        headers.join(","),
        ...pdfDownloads.map(download => [
          download.user_email,
          download.file_name,
          new Date(download.download_date || download.created_at).toLocaleDateString('hu-HU')
        ].join(","))
      ].join("\n");

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `pdf-downloads-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("CSV exported successfully");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Failed to export CSV");
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 flex flex-col items-center">
        <p className="mb-4">Error loading PDF download data</p>
        <Button variant="outline" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!pdfDownloads || pdfDownloads.length === 0) {
    return (
      <div className="text-center p-8">
        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">No PDF Downloads Yet</h3>
        <p className="text-muted-foreground">PDF download tracking data will appear here once users start downloading documents.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">PDF Downloads: {pdfDownloads.length}</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportCSV} 
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </>
          )}
        </Button>
      </div>

      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Download Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pdfDownloads.map((download) => (
              <TableRow key={download.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`mailto:${download.user_email}`} 
                      className="hover:text-primary"
                    >
                      {download.user_email}
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {download.file_name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(download.download_date || download.created_at).toLocaleDateString('hu-HU')}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default PdfDownloadsList;
