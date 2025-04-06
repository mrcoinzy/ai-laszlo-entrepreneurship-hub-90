
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Clock } from "lucide-react";
import { formatDistance } from "date-fns";
import { supabase } from "@/lib/supabase";

interface ProjectStatusCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    start_time: string | null;
    status: string;
    progress: number;
    is_active: boolean;
  };
}

const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({ project }) => {
  const [elapsed, setElapsed] = useState<string>("0 minutes");
  const [isActive, setIsActive] = useState(project.is_active);
  const [projectStatus, setProjectStatus] = useState(project.status);
  const [progress, setProgress] = useState(project.progress);
  
  // Calculate elapsed time since project was started
  useEffect(() => {
    if (!project.start_time) return;
    
    const updateElapsed = () => {
      const start = new Date(project.start_time!);
      setElapsed(formatDistance(new Date(), start, { addSuffix: false }));
    };
    
    // Update immediately
    updateElapsed();
    
    // Then update every minute
    const interval = setInterval(updateElapsed, 60000);
    
    return () => clearInterval(interval);
  }, [project.start_time]);
  
  // Subscribe to real-time updates for this project
  useEffect(() => {
    const subscription = supabase
      .channel(`project-${project.id}`)
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'projects',
          filter: `id=eq.${project.id}`
        }, 
        (payload) => {
          const updatedProject = payload.new as any;
          setIsActive(updatedProject.is_active);
          setProjectStatus(updatedProject.status);
          setProgress(updatedProject.progress);
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [project.id]);
  
  return (
    <Card className={`overflow-hidden ${isActive ? 'border-green-500 bg-green-500/5' : 'bg-accent/30 border-accent'}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{project.title}</h3>
          <Badge variant={
            projectStatus === "completed" ? "default" : 
            projectStatus === "in-progress" ? "secondary" : "outline"
          }>
            {projectStatus === "in-progress" ? "In Progress" : 
            projectStatus === "completed" ? "Completed" : "Pending"}
          </Badge>
        </div>
        
        {isActive && (
          <div className="bg-green-500/20 text-green-400 p-2 rounded-md mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">Working on it • {elapsed}</span>
          </div>
        )}
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between mt-2 text-sm text-white/70">
          <div>{progress}% complete</div>
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            {project.start_time 
              ? new Date(project.start_time).toISOString().split('T')[0]
              : 'Not started'}
          </div>
        </div>
        
        {project.description && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-sm text-white/80">{project.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectStatusCard;
