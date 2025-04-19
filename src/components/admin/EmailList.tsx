
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabaseAdmin } from "@/lib/supabase";
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
      // For now, we'll just display user emails as a placeholder
      // since the email_subscribers table doesn't exist yet
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, email, created_at')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform to match the expected EmailSubscriber format
      return data.map(user => ({
        id: user.id,
        created_at: user.created_at,
        email: user.email,
        source: 'User Registration'
      })) as EmailSubscriber[];
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
        Error loading subscribers.
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
                {new Date(subscriber.created_at).toLocaleDateString()}
              </div>
            </div>
            {subscriber.source && (
              <div className="mt-2 text-sm text-muted-foreground">
                Source: {subscriber.source}
              </div>
            )}
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default EmailList;
