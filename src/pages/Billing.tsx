
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Invoice {
  id: string;
  client_id: string;
  invoice_number: string;
  amount: number;
  date: string;
  due_date: string;
  status: "paid" | "unpaid" | "overdue";
  details?: string;
}

const Billing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { userData } = useAuth();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Fetch invoices from Supabase
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['clientInvoices'],
    queryFn: async () => {
      if (!userData?.id) return [];
      
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('client_id', userData.id);
      
      if (error) throw error;
      return data as Invoice[];
    },
    enabled: !!userData?.id
  });
  
  // Calculate billing summary stats
  const totalRevenue = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'unpaid').reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + parseFloat(inv.amount.toString()), 0);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">Billing & Invoices</h1>
            <p className="text-white/70 mt-2">Manage and track your invoices</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-accent/30 border-accent">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Revenue</CardTitle>
                <CardDescription>All time earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="flex items-center">
                      <Clock className="w-5 h-5 animate-spin mr-2" />
                      Loading...
                    </span>
                  ) : (
                    `$${totalRevenue.toFixed(2)}`
                  )}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/30 border-accent">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending</CardTitle>
                <CardDescription>Unpaid invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="flex items-center">
                      <Clock className="w-5 h-5 animate-spin mr-2" />
                      Loading...
                    </span>
                  ) : (
                    `$${pendingAmount.toFixed(2)}`
                  )}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/30 border-accent">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overdue</CardTitle>
                <CardDescription>Past due date</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {isLoading ? (
                    <span className="flex items-center">
                      <Clock className="w-5 h-5 animate-spin mr-2" />
                      Loading...
                    </span>
                  ) : (
                    `$${overdueAmount.toFixed(2)}`
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and manage all your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
                  <div>Loading invoices...</div>
                </div>
              ) : invoices.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>{invoice.invoice_number}</TableCell>
                          <TableCell>{invoice.details || 'General Services'}</TableCell>
                          <TableCell>${parseFloat(invoice.amount.toString()).toFixed(2)}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.due_date}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                invoice.status === "paid" ? "bg-green-600" : 
                                invoice.status === "overdue" ? "bg-red-600" :
                                "bg-amber-600"
                              }
                            >
                              {invoice.status === "paid" ? "Paid" : 
                              invoice.status === "overdue" ? "Overdue" : 
                              "Unpaid"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/70">No invoices found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
