
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Play, 
  Pause,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  User,
  StopCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, formatDistance } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

interface Project {
  id: string;
  client_id: string;
  title: string;
  description: string;
  start_time: string | null;
  end_time: string | null;
  progress: number;
  status: string;
  time_spent: string;
  is_active: boolean;
  created_at: string;
  client_name?: string;
  client_email?: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  time_spent: string;
}

interface WorkSession {
  id: string;
  project_id: string;
  admin_id: string;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  notes: string | null;
}

const ProjectsManagement = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<WorkSession | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stopNotes, setStopNotes] = useState("");
  const [projectToStop, setProjectToStop] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Fetch all projects with client details
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['adminProjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users:client_id (id, full_name, email)
        `);
      
      if (error) throw error;
      
      // Format project data
      return data.map((project: any) => ({
        ...project,
        client_name: project.users?.full_name,
        client_email: project.users?.email
      }));
    }
  });
  
  // Fetch tasks for projects
  const { data: tasks = [] } = useQuery({
    queryKey: ['projectTasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });
  
  // Fetch active work session
  const { data: workSessions = [], refetch: refetchWorkSessions } = useQuery({
    queryKey: ['workSessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work_sessions')
        .select('*')
        .is('end_time', null);
      
      if (error) throw error;
      return data;
    }
  });
  
  // Setup real-time subscription for work sessions
  useEffect(() => {
    const subscription = supabase
      .channel('work_sessions_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'work_sessions' 
        }, 
        () => {
          refetchWorkSessions();
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [refetchWorkSessions]);
  
  // Check for active sessions on load
  useEffect(() => {
    const currentActiveSession = workSessions.find((session: WorkSession) => 
      session.admin_id === user?.id && !session.end_time);
    
    if (currentActiveSession) {
      setCurrentSession(currentActiveSession);
      setActiveProject(currentActiveSession.project_id);
    } else {
      setCurrentSession(null);
      setActiveProject(null);
    }
  }, [workSessions, user]);
  
  // Start a work session on a project
  const startProjectMutation = useMutation({
    mutationFn: async (projectId: string) => {
      // Only one project can be active at a time
      if (activeProject) {
        throw new Error("You already have an active project. Please stop the current one first.");
      }
      
      // Create a new work session
      const { data: sessionData, error: sessionError } = await supabase
        .from('work_sessions')
        .insert({
          project_id: projectId,
          admin_id: user?.id,
          start_time: new Date().toISOString()
        })
        .select()
        .single();
      
      if (sessionError) throw sessionError;
      
      // Update project status
      const { error: projectError } = await supabase
        .from('projects')
        .update({ 
          is_active: true,
          status: 'in-progress',
          start_time: new Date().toISOString()
        })
        .eq('id', projectId);
      
      if (projectError) throw projectError;
      
      return { project_id: projectId, session: sessionData };
    },
    onSuccess: (data) => {
      setActiveProject(data.project_id);
      setCurrentSession(data.session);
      queryClient.invalidateQueries({ queryKey: ['adminProjects'] });
      queryClient.invalidateQueries({ queryKey: ['workSessions'] });
      toast.success("Started working on project");
    },
    onError: (error: any) => {
      console.error('Error starting project:', error);
      toast.error(error.message || "Failed to start project");
    }
  });
  
  // Stop a work session
  const stopProjectMutation = useMutation({
    mutationFn: async ({ projectId, notes }: { projectId: string, notes: string }) => {
      if (!currentSession) {
        throw new Error("No active work session found");
      }
      
      const now = new Date();
      const startTime = new Date(currentSession.start_time);
      const durationMinutes = Math.round((now.getTime() - startTime.getTime()) / 60000);
      
      // Update work session
      const { error: sessionError } = await supabase
        .from('work_sessions')
        .update({
          end_time: now.toISOString(),
          duration_minutes: durationMinutes,
          notes: notes
        })
        .eq('id', currentSession.id);
      
      if (sessionError) throw sessionError;
      
      // Update project status
      const { error: projectError } = await supabase
        .from('projects')
        .update({ 
          is_active: false
        })
        .eq('id', projectId);
      
      if (projectError) throw projectError;
      
      return { project_id: projectId };
    },
    onSuccess: () => {
      setActiveProject(null);
      setCurrentSession(null);
      setStopNotes("");
      setIsDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['adminProjects'] });
      queryClient.invalidateQueries({ queryKey: ['workSessions'] });
      toast.success("Stopped working on project");
    },
    onError: (error: any) => {
      console.error('Error stopping project:', error);
      toast.error(error.message || "Failed to stop project");
    }
  });
  
  const toggleProjectDetails = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };
  
  // Start or pause working on a project
  const handleStartProject = (projectId: string) => {
    startProjectMutation.mutate(projectId);
  };
  
  // Prepare to stop a project
  const prepareStopProject = (projectId: string) => {
    setProjectToStop(projectId);
    setIsDialogOpen(true);
  };
  
  // Confirm stopping a project
  const confirmStopProject = () => {
    if (projectToStop) {
      stopProjectMutation.mutate({ 
        projectId: projectToStop, 
        notes: stopNotes 
      });
    }
  };
  
  // Get project tasks
  const getProjectTasks = (projectId: string): Task[] => {
    return tasks.filter((task: any) => task.project_id === projectId);
  };
  
  // Calculate elapsed time for active project
  const getElapsedTime = () => {
    if (!currentSession) return "0m";
    
    const start = new Date(currentSession.start_time);
    return formatDistance(new Date(), start, { addSuffix: false });
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
      case "on-hold":
        return <Badge variant="destructive">On Hold</Badge>;
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
          {isLoading ? (
            <div className="text-center py-8">
              <Clock className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
              <div>Loading projects...</div>
            </div>
          ) : projects.length === 0 ? (
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
                    <TableHead className="hidden lg:table-cell">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <React.Fragment key={project.id}>
                      <TableRow className={`hover:bg-accent/10 ${project.id === activeProject ? 'bg-green-500/10' : ''}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {project.id === activeProject && 
                              <Badge variant="default" className="mr-2 h-2 w-2 rounded-full p-0 bg-green-500" />}
                            {project.title}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-white/70" />
                            {project.client_name}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="w-full flex items-center space-x-2">
                            <Progress value={project.progress} className="h-2" />
                            <span className="text-xs text-white/70">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {getStatusBadge(project.status)}
                        </TableCell>
                        <TableCell className="text-right">
                          {project.id === activeProject ? (
                            <div className="flex items-center justify-end space-x-2">
                              <div className="text-sm text-green-500 mr-2">
                                Working: {getElapsedTime()}
                              </div>
                              <Button 
                                variant="destructive"
                                size="sm"
                                onClick={() => prepareStopProject(project.id)}
                                className="bg-red-600 hover:bg-red-500"
                              >
                                <StopCircle className="mr-2 h-4 w-4" />
                                Stop Work
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              variant="default"
                              size="sm"
                              className="bg-green-600 hover:bg-green-500"
                              onClick={() => handleStartProject(project.id)}
                              disabled={!!activeProject}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Start Working
                            </Button>
                          )}
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
                                  <h4 className="text-sm font-medium mb-1">Start Time</h4>
                                  <div className="flex items-center text-sm">
                                    <Calendar className="mr-2 h-4 w-4 text-white/70" />
                                    {project.start_time ? format(new Date(project.start_time), 'yyyy-MM-dd HH:mm') : 'Not started'}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1">End Time</h4>
                                  <div className="flex items-center text-sm">
                                    <Calendar className="mr-2 h-4 w-4 text-white/70" />
                                    {project.end_time ? format(new Date(project.end_time), 'yyyy-MM-dd HH:mm') : 'Not completed'}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Time Spent</h4>
                                  <div className="flex items-center text-sm">
                                    <Clock className="mr-2 h-4 w-4 text-white/70" />
                                    {project.time_spent}
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2">Tasks</h4>
                                {getProjectTasks(project.id).length > 0 ? (
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
                                        {getProjectTasks(project.id).map((task: Task) => (
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
                                                {task.time_spent}
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                ) : (
                                  <div className="text-sm text-white/70 p-2">No tasks available</div>
                                )}
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
      
      {/* Dialog for stopping work session */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stop Working</DialogTitle>
            <DialogDescription>
              Add notes about what you accomplished during this work session.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <textarea
              className="w-full p-2 rounded-md bg-accent/30 border border-accent/50 text-white"
              rows={4}
              placeholder="What did you accomplish during this session?"
              value={stopNotes}
              onChange={(e) => setStopNotes(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={confirmStopProject}>
              Stop Work & Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsManagement;
