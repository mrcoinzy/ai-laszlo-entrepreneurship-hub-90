
import React from "react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";

interface Invoice {
  id: string;
  client: string;
  amount: number;
  date: string;
  status: "paid" | "unpaid";
  dueDate: string;
}

const Billing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Mock data for invoices
  const invoices: Invoice[] = [
    { id: "INV-001", client: "John Doe", amount: 500, date: "2023-01-15", status: "paid", dueDate: "2023-02-15" },
    { id: "INV-002", client: "Jane Smith", amount: 750, date: "2023-02-20", status: "paid", dueDate: "2023-03-20" },
    { id: "INV-003", client: "Mike Johnson", amount: 1200, date: "2023-03-05", status: "unpaid", dueDate: "2023-04-05" },
    { id: "INV-004", client: "Sarah Williams", amount: 850, date: "2023-03-18", status: "unpaid", dueDate: "2023-04-18" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
                <p className="text-2xl font-bold">$3,300.00</p>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/30 border-accent">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending</CardTitle>
                <CardDescription>Unpaid invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$2,050.00</p>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/30 border-accent">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overdue</CardTitle>
                <CardDescription>Past due date</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$0.00</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-accent/30 border-accent">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and manage all your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Client</TableHead>
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
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.client}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>
                          <Badge className={invoice.status === "paid" ? "bg-green-600" : "bg-amber-600"}>
                            {invoice.status === "paid" ? "Paid" : "Unpaid"}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
