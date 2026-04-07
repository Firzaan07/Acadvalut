import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { BarChart3, LayoutDashboard, GraduationCap, Users, ClipboardList, Activity, TrendingUp, TrendingDown, BookOpen, AlertCircle } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "All Students", path: "/admin/students", icon: GraduationCap },
  { label: "All Faculty", path: "/admin/faculty", icon: Users },
  { label: "Assignments", path: "/admin/assignments", icon: ClipboardList },
  { label: "Activity Log", path: "/admin/activity", icon: Activity },
  { label: "Statistics", path: "/admin/statistics", icon: BarChart3 },
];

const stats = [
  { name: "Total Students", value: 1248, trend: "+12%", color: "accent", icon: GraduationCap },
  { name: "Total Faculty", value: 86, trend: "+3%", color: "info", icon: Users },
  { name: "Active Subjects", value: 42, trend: "-2%", color: "success", icon: BookOpen },
  { name: "Pending Assignments", value: 324, trend: "+8%", color: "warning", icon: AlertCircle },
];

const StatisticsPage = () => (
  <DashboardLayout navItems={navItems} title="System Statistics">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {stats.map((s) => (
        <StatCard key={s.name} icon={s.icon} title={s.name} value={s.value} trend={s.trend} color={s.color as any} />
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <div className="stat-card">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-6">Subject Progress</h3>
        <div className="space-y-6">
          {[
            { label: "Computer Science", value: "87%", trend: "up" },
            { label: "Mathematics", value: "92%", trend: "up" },
            { label: "Physics", value: "76%", trend: "down" },
            { label: "Engineering", value: "81%", trend: "up" },
          ].map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  {s.label}
                  {s.trend === "up" ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                </span>
                <span className="font-semibold text-foreground">{s.value}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full gradient-accent rounded-full" style={{ width: s.value }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stat-card bg-primary text-primary-foreground p-8">
        <h3 className="text-xl font-heading font-bold mb-4">Annual Report Summary</h3>
        <p className="text-primary-foreground/70 mb-6 leading-relaxed">
          The academic performance has increased by 5.4% compared to the last semester. Average attendance remains stable at 89%.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/10 rounded-xl">
            <p className="text-xs text-primary-foreground/50 uppercase tracking-widest font-bold mb-1">Pass Rate</p>
            <p className="text-2xl font-bold">94.2%</p>
          </div>
          <div className="p-4 bg-white/10 rounded-xl">
            <p className="text-xs text-primary-foreground/50 uppercase tracking-widest font-bold mb-1">Dropout Rate</p>
            <p className="text-2xl font-bold">1.8%</p>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default StatisticsPage;
