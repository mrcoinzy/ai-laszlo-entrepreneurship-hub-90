
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Loader2, Mail, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const { data: consultations, isLoading, error } = useQuery({
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Hiba történt a konzultációk betöltésekor.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {consultations?.map((consultation) => (
          <Card key={consultation.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{consultation.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${consultation.email}`} className="hover:text-primary">
                    {consultation.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(consultation.created_at).toLocaleDateString('hu-HU')}
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                  {consultation.business_type}
                </span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <p><strong>Fő cél:</strong> {consultation.main_goal}</p>
              <p><strong>Online jelenlét:</strong> {consultation.online_presence}</p>
              <p><strong>Legnagyobb kihívás:</strong> {consultation.challenge}</p>
              <p><strong>Érdekelt szolgáltatások:</strong> {consultation.interested_services.join(", ")}</p>
              {consultation.website && (
                <p><strong>Weboldal:</strong> <a href={consultation.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{consultation.website}</a></p>
              )}
              {consultation.budget_range && (
                <p><strong>Tervezett költségkeret:</strong> {consultation.budget_range.toLocaleString('hu-HU')} Ft</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ConsultationsList;
