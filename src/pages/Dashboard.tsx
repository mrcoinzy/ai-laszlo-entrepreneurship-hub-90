import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import DashboardSidebar from "@/components/DashboardSidebar";
import ProjectStatusCard from "@/components/Dashboard/ProjectStatusCard";
import { toast } from "sonner";
import { ArrowUpRight, Clock, CalendarDays } from "lucide-react";

// Update the Project interface to make description optional
interface Project {
  id: string;
  title: string;
  description?: string; // Making description optional with ? symbol
  client_id: string;
  status: string;
  progress: number;
  is_active: boolean;
  start_time: string | null;
  end_time: string | null;
  created_at: string;
}

interface Invoice {
  id: string;
  client_id: string;
  amount: number;
  date: string;
  status: string;
  description: string;
}

const Dashboard = () => {
  const { userData } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!userData) {
          console.log("No user data");
          return;
        }

        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('client_id', userData.id);

        if (projectsError) {
          console.error("Error fetching projects:", projectsError);
          setError(`Error fetching projects: ${projectsError.message}`);
          return;
        }

        const { data: invoicesData, error: invoicesError } = await supabase
          .from('invoices')
          .select('*')
          .eq('client_id', userData.id);

        if (invoicesError) {
          console.error("Error fetching invoices:", invoicesError);
          setError(`Error fetching invoices: ${invoicesError.message}`);
          return;
        }

        setProjects(projectsData || []);
        setInvoices(invoicesData || []);
      } catch (err: any) {
        console.error("Unexpected error:", err);
        setError(`Unexpected error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userData]);

  // Calculate project status counts
  const totalProjects = projects.length;
  const completedProjects = projects.filter(project => project.status === 'completed').length;
  const ongoingProjects = projects.filter(project => project.status === 'ongoing').length;
  const pendingProjects = projects.filter(project => project.status === 'pending').length;

  // Calculate total revenue from invoices
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid').length;
  const unpaidInvoices = invoices.filter(invoice => invoice.status === 'unpaid').length;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />

      <main className="flex-1 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

          {/* Project Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <ProjectStatusCard title="Total Projects" count={totalProjects} icon={CalendarDays} color="text-blue-500" />
            <ProjectStatusCard title="Completed Projects" count={completedProjects} icon={ArrowUpRight} color="text-green-500" />
            <ProjectStatusCard title="Ongoing Projects" count={ongoingProjects} icon={Clock} color="text-yellow-500" />
            <ProjectStatusCard title="Pending Projects" count={pendingProjects} icon={Clock} color="text-red-500" />
          </div>

          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card className="bg-accent/20 border-accent">
              <div className="p-4">
                <h3 className="text-lg font-semibold">Total Revenue</h3>
                <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
              </div>
            </Card>
            <Card className="bg-accent/20 border-accent">
              <div className="p-4">
                <h3 className="text-lg font-semibold">Paid Invoices</h3>
                <p className="text-2xl">{paidInvoices}</p>
              </div>
            </Card>
            <Card className="bg-accent/20 border-accent">
              <div className="p-4">
                <h3 className="text-lg font-semibold">Unpaid Invoices</h3>
                <p className="text-2xl">{unpaidInvoices}</p>
              </div>
            </Card>
          </div>

          {/* Recent Projects */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Recent Projects</h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map(project => (
                <Card key={project.id} className="bg-accent/20 border-accent">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm">{project.description || 'No description provided.'}</p>
                    <div className="flex items-center mt-2">
                      <Badge variant="secondary">{project.status}</Badge>
                      <span className="ml-2 text-sm">Progress: {project.progress}%</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
