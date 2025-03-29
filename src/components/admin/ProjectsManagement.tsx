
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Mock project data
const mockProjects = [
  {
    id: 1,
    clientId: 1,
    clientName: "Jane Cooper",
    title: "E-commerce Website",
    description: "Building a complete e-commerce platform with payment processing and inventory management.",
    startDate: "2023-05-20",
    dueDate: "2023-07-25",
    progress: 65,
    status: "in-progress",
    timeSpent: "42h 15m",
    tasks: [
      { id: 101, title: "Homepage design", status: "completed", timeSpent: "8h 30m" },
      { id: 102, title: "Product catalog implementation", status: "completed", timeSpent: "12h 45m" },
      { id: 103, title: "Shopping cart functionality", status: "in-progress", timeSpent: "6h 10m" },
      { id: 104, title: "Payment gateway integration", status: "not-started", timeSpent: "0h 0m" },
      { id: 105, title: "User authentication", status: "in-progress", timeSpent: "5h 20m" }
    ],
    isActive: false
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Wade Warren",
    title: "Fitness Tracking App",
    description: "Developing a web application for fitness tracking that integrates with wearable devices.",
    startDate: "2023-06-05",
    dueDate: "2023-08-15",
    progress: 30,
    status: "in-progress",
    timeSpent: "22h 45m",
    tasks: [
      { id: 201, title: "User interface design", status: "completed", timeSpent: "10h 15m" },
      { id: 202, title: "Database schema design", status: "completed", timeSpent: "4h 30m" },
      { id: 203, title: "API development", status: "in-progress", timeSpent: "8h 0m" },
      { id: 204, title: "Device integration", status: "not-started", timeSpent: "0h 0m" }
    ],
    isActive: false
  },
  {
    id: 3,
    clientId: 3,
    clientName: "Esther Howard",
    title: "Salon Business Plan",
    description: "Creating a comprehensive business plan and marketing strategy for a new salon business.",
    startDate: "2023-06-12",
    dueDate: "2023-07-10",
    progress: 90,
    status: "in-progress",
    timeSpent: "18h 30m",
    tasks: [
      { id: 301, title: "Market research", status: "completed", timeSpent: "6h 45m" },
      { id: 302, title: "Competitor analysis", status: "completed", timeSpent: "5h 20m" },
      { id: 303, title: "Financial projections", status: "completed", timeSpent: "4h 15m" },
      { id: 304, title: "Marketing plan", status: "in-progress", timeSpent: "2h 10m" }
    ],
    isActive: true
  }
];

const ProjectsManagement = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState(mockProjects);
  
  const toggleProjectDetails = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };
  
  // Start or pause working on a project
  const toggleProjectActivity = (projectId: number) => {
    setProjects(prev => prev.map(project => {
      // If we're activating this project, deactivate all others
      if (projectId === project.id) {
        if (!project.isActive) {
          toast.success(`Started working on "${project.title}"`);
        } else {
          toast.info(`Paused work on "${project.title}"`);
        }
        return { ...project, isActive: !project.isActive };
      } else if (project.isActive && !prev.find(p => p.id === projectId)?.isActive) {
        // If another project is being activated, deactivate this one
        return { ...project, isActive: false };
      }
      return project;
    }));
  };
  
  // Get the status badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-accent/30 border-accent">
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
          <CardDescription>Track and manage all your client projects</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-6 text-white/70">
              No projects available
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Project</TableHead>
                    <TableHead className="hidden md:table-cell">Client</TableHead>
                    <TableHead className="hidden md:table-cell">Progress</TableHead>
                    <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <React.Fragment key={project.id}>
                      <TableRow className={`hover:bg-accent/10 ${project.isActive ? 'bg-primary/10' : ''}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {project.isActive && <Badge variant="default" className="mr-2 h-2 w-2 rounded-full p-0 bg-green-500" />}
                            {project.title}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-white/70" />
                            {project.clientName}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="w-full flex items-center space-x-2">
                            <Progress value={project.progress} className="h-2" />
                            <span className="text-xs text-white/70">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-white/70" />
                            {project.dueDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant={project.isActive ? "destructive" : "default"}
                            size="sm"
                            className={project.isActive ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"}
                            onClick={() => toggleProjectActivity(project.id)}
                          >
                            {project.isActive ? (
                              <>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-4 w-4" />
                                Start Working
                              </>
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleProjectDetails(project.id)}
                            aria-label="Toggle project details"
                          >
                            {expandedProject === project.id ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                            }
                          </Button>
                        </TableCell>
                      </TableRow>
                      
                      {/* Expanded Details Row */}
                      {expandedProject === project.id && (
                        <TableRow className="bg-accent/10">
                          <TableCell colSpan={6} className="p-4">
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Project Description</h4>
                                <p className="text-sm text-white/80">{project.description}</p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Start Date</h4>
                                  <div className="flex items-center text-sm">
                                    <Calendar className="mr-2 h-4 w-4 text-white/70" />
                                    {project.startDate}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Time Spent</h4>
                                  <div className="flex items-center text-sm">
                                    <Clock className="mr-2 h-4 w-4 text-white/70" />
                                    {project.timeSpent}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Status</h4>
                                  <div>
                                    {getStatusBadge(project.status)}
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">Tasks</h4>
                                <div className="rounded-md border overflow-hidden">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Task</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Time Spent</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {project.tasks.map((task) => (
                                        <TableRow key={task.id}>
                                          <TableCell>{task.title}</TableCell>
                                          <TableCell>
                                            {task.status === "completed" ? (
                                              <div className="flex items-center text-green-500">
                                                <CheckCircle className="mr-1 h-4 w-4" />
                                                <span>Completed</span>
                                              </div>
                                            ) : getStatusBadge(task.status)}
                                          </TableCell>
                                          <TableCell>
                                            <div className="flex items-center">
                                              <Clock className="mr-1 h-4 w-4 text-white/70" />
                                              {task.timeSpent}
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="outline">
                                  Edit Project
                                </Button>
                                <Button size="sm" variant="outline">
                                  Contact Client
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsManagement;
