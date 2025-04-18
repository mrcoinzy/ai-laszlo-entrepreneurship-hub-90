
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
import { Loader2, Mail, Calendar, Download, MessageSquare, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Consultation {
  id: string;
  created_at: string;
  name: string;
  email: string;
  website?: string;
  business_type: string;
  main_goal: string;
  online_presence: string;
  challenge: string;
  interested_services: string[];
  budget_range?: number;
}

const ConsultationsList = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  const { data: consultations, isLoading, error, refetch } = useQuery({
    queryKey: ['consultations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Consultation[];
    }
  });

  const handleExportCSV = async () => {
    if (!consultations || consultations.length === 0) {
      toast.error("No data to export");
      return;
    }

    setIsExporting(true);
    try {
      // Create CSV content
      const headers = ["Name", "Email", "Business Type", "Main Goal", "Budget Range", "Date"];
      const csvContent = [
        headers.join(","),
        ...consultations.map(consultation => [
          `"${consultation.name}"`,
          `"${consultation.email}"`,
          `"${consultation.business_type}"`,
          `"${consultation.main_goal.replace(/"/g, '""')}"`,
          consultation.budget_range ? `"${consultation.budget_range.toLocaleString('hu-HU')} Ft"` : "",
          new Date(consultation.created_at).toLocaleDateString('hu-HU')
        ].join(","))
      ].join("\n");

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `consultations-${new Date().toISOString().split('T')[0]}.csv`);
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
        <p className="mb-4">Error loading consultation requests</p>
        <Button variant="outline" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!consultations || consultations.length === 0) {
    return (
      <div className="text-center p-8">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">No Consultation Requests Yet</h3>
        <p className="text-muted-foreground">Consultation requests will appear here when clients submit them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Consultation Requests: {consultations.length}</h2>
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

      {selectedConsultation ? (
        <Card className="p-4 mb-4">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-lg">{selectedConsultation.name}</h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedConsultation(null)}>
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Contact Info</p>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${selectedConsultation.email}`} className="hover:text-primary">
                  {selectedConsultation.email}
                </a>
              </div>
              
              {selectedConsultation.website && (
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="h-4 w-4" />
                  <a href={selectedConsultation.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    {selectedConsultation.website}
                  </a>
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                {new Date(selectedConsultation.created_at).toLocaleDateString('hu-HU')}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Business Info</p>
              <p className="mb-2"><strong>Type:</strong> {selectedConsultation.business_type}</p>
              {selectedConsultation.budget_range && (
                <p className="mb-2"><strong>Budget:</strong> {selectedConsultation.budget_range.toLocaleString('hu-HU')} Ft</p>
              )}
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Main Goal</p>
              <p>{selectedConsultation.main_goal}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Online Presence</p>
              <p>{selectedConsultation.online_presence}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Biggest Challenge</p>
              <p>{selectedConsultation.challenge}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Interested Services</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedConsultation.interested_services.map((service, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consultations.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell className="font-medium">{consultation.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`mailto:${consultation.email}`} 
                        className="hover:text-primary"
                      >
                        {consultation.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>{consultation.business_type}</TableCell>
                  <TableCell>
                    {new Date(consultation.created_at).toLocaleDateString('hu-HU')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedConsultation(consultation)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
};

export default ConsultationsList;
