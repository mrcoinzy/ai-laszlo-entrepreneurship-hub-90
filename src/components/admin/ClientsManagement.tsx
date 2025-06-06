
import React, { useState, useEffect } from "react";
import { supabaseAdmin } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClientsManagement = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, email, created_at, role')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClient = async (clientId: string) => {
    try {
      const { error } = await supabaseAdmin
        .from('users')
        .update({ role: 'user' })
        .eq('id', clientId);

      if (error) throw error;
      
      // Refresh the client list
      fetchClients();
    } catch (error) {
      console.error('Error approving client:', error);
    }
  };

  const handleRejectClient = async (clientId: string) => {
    try {
      const { error } = await supabaseAdmin
        .from('users')
        .update({ role: 'user' })
        .eq('id', clientId);

      if (error) throw error;
      
      // Refresh the client list
      fetchClients();
    } catch (error) {
      console.error('Error rejecting client:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Client Management</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : clients.length > 0 ? (
        <div className="grid gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="bg-accent/30 border-accent">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{client.email || 'Unnamed Client'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><span className="text-white/70">Email:</span> {client.email}</p>
                  <p><span className="text-white/70">Role:</span> {client.role}</p>
                  <p><span className="text-white/70">Joined:</span> {new Date(client.created_at).toLocaleDateString()}</p>
                  
                  {client.role === 'user' && (
                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => handleApproveClient(client.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Make Admin
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-accent/30 border-accent">
          <CardContent className="pt-6">
            <p className="text-center text-white/70">No clients found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientsManagement;
