
import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface ProjectStatusCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  color: string;
}

const ProjectStatusCard = ({ title, count, icon: Icon, color }: ProjectStatusCardProps) => {
  return (
    <Card className="bg-accent/20 border-accent">
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-white/70">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{count}</p>
        </div>
        <div className={`${color} p-2 rounded-full bg-accent/40`}>
          <Icon size={20} />
        </div>
      </div>
    </Card>
  );
};

export default ProjectStatusCard;
