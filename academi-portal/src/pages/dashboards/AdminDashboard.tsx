import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import {
  LayoutDashboard, Users, BookOpen, Activity, ClipboardList, BarChart3, UserCheck, GraduationCap, Loader2
} from "lucide-react";
import { adminService } from "@/services/api";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "All Students", path: "/admin/students", icon: GraduationCap },
  { label: "All Faculty", path: "/admin/faculty", icon: Users },
  { label: "Assignments", path: "/admin/assignments", icon: ClipboardList },
  { label: "Activity Log", path: "/admin/activity", icon: Activity },
  { label: "Statistics", path: "/admin/statistics", icon: BarChart3 },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<any[]>([]);

  const formatTime = (date: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, logsRes] = await Promise.all([
          adminService.getStats(),
          adminService.getActivityLog({ limit: 5 })
        ]);

        if (statsRes.success) setStats(statsRes.data);
        if (logsRes.success) setActivities(logsRes.data || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout navItems={navItems} title="Admin Dashboard">
      {loading ? (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Loading Dashboard...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard icon={GraduationCap} title="Total Students" value={stats?.totalStudents || 0} trend="+12%" color="accent" />
            <StatCard icon={Users} title="Total Faculty" value={stats?.totalFaculty || 0} trend="+3%" color="info" />
            <StatCard icon={BookOpen} title="Active Subjects" value={stats?.totalSubjects || 0} color="success" />
            <StatCard icon={UserCheck} title="Assignments" value={stats?.totalAssignments || 0} color="warning" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="stat-card">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((a, i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0 group">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all shadow-sm ${
                        a.severity === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                        a.severity === 'warning' ? 'bg-amber-100 text-amber-600' : 
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {a.module === 'Admin' ? <UserCheck className="h-5 w-5" /> : 
                         a.module === 'Auth' ? <Users className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                           <p className="text-xs font-black uppercase text-primary/70 tracking-tighter">{a.module}</p>
                           <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                           <span className="text-[10px] font-bold text-slate-400">{formatTime(a.createdAt)}</span>
                        </div>
                        <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors mt-0.5">{a.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-10 text-center text-muted-foreground text-sm italic">No recent activities to display</p>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="stat-card">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">System Overview</h3>
              <div className="space-y-4">
                {[
                  { label: "Assignment Completion", value: "87%", width: "87%" },
                  { label: "Faculty Utilization", value: "92%", width: "92%" },
                  { label: "Database Health", value: "100%", width: "100%" },
                  { label: "Average Response Time", value: "240ms", width: "81%" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-semibold text-foreground">{s.value}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full gradient-accent rounded-full transition-all duration-500" style={{ width: s.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
