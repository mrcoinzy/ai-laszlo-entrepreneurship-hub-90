
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Loader2, Mail, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmailSubscriber {
  id: string;
  created_at: string;
  email: string;
  source: string;
}

const EmailList = () => {
  const { data: subscribers, isLoading, error } = useQuery({
    queryKey: ['email-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as EmailSubscriber[];
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
        Hiba történt a feliratkozók betöltésekor.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {subscribers?.map((subscriber) => (
          <Card key={subscriber.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href={`mailto:${subscriber.email}`} className="text-lg hover:text-primary">
                  {subscriber.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(subscriber.created_at).toLocaleDateString('hu-HU')}
              </div>
            </div>
            {subscriber.source && (
              <div className="mt-2 text-sm text-muted-foreground">
                Forrás: {subscriber.source}
              </div>
            )}
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default EmailList;
