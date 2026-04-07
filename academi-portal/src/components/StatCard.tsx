import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color?: "accent" | "info" | "success" | "warning";
}

const colorMap = {
  accent: "gradient-accent",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
};

const StatCard = ({ title, value, icon: Icon, trend, color = "accent" }: StatCardProps) => (
  <div className="stat-card">
    <div className="flex items-start justify-between mb-4">
      <div className={`${colorMap[color]} w-12 h-12 rounded-xl flex items-center justify-center`}>
        <Icon className="h-6 w-6 text-accent-foreground" />
      </div>
      {trend && <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">{trend}</span>}
    </div>
    <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{title}</p>
  </div>
);

export default StatCard;
