import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Activity, LayoutDashboard, GraduationCap, Users, ClipboardList, BarChart3, Search, Clock, Shield, Loader2, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminService } from "@/services/api";
import { toast } from "sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "All Students", path: "/admin/students", icon: GraduationCap },
  { label: "All Faculty", path: "/admin/faculty", icon: Users },
  { label: "Assignments", path: "/admin/assignments", icon: ClipboardList },
  { label: "Activity Log", path: "/admin/activity", icon: Activity },
  { label: "Statistics", path: "/admin/statistics", icon: BarChart3 },
];

const ActivityLogPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params: any = { limit: 100 };
      if (moduleFilter !== "all") params.module = moduleFilter;
      if (searchTerm) params.search = searchTerm;

      const res = await adminService.getActivityLog(params);
      if (res.success) {
        setLogs(res.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch activity logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLogs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, moduleFilter]);

  const handleClearLogs = async () => {
    if (!window.confirm("Are you sure you want to permanently clear all activity logs?")) return;
    try {
      const res = await adminService.clearActivityLog();
      if (res.success) {
        setLogs([]);
        toast.success("Activity logs cleared successfully");
      }
    } catch (error) {
      toast.error("Failed to clear logs");
    }
  };

  const formatTime = (date: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return new Date(date).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  };

  return (
    <DashboardLayout navItems={navItems} title="System Activity Log">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by user or message..." 
              className="pl-10 bg-secondary border-none" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={moduleFilter} onValueChange={setModuleFilter}>
             <SelectTrigger className="w-full sm:w-[180px] bg-secondary border-none">
                <div className="flex items-center gap-2">
                   <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                   <SelectValue placeholder="All Modules" />
                </div>
             </SelectTrigger>
             <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Faculty">Faculty</SelectItem>
                <SelectItem value="Auth">Auth</SelectItem>
             </SelectContent>
          </Select>
        </div>
        <Button 
          variant="destructive" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleClearLogs}
        >
          <Trash2 className="h-4 w-4" /> Clear All Logs
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest">Scanning logs...</p>
          </div>
        ) : logs.length > 0 ? (
          logs.map((log, i) => (
            <div key={log._id || i} className="stat-card p-5 group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl flex-shrink-0 ${
                  log.severity === "success" ? "bg-emerald-100 text-emerald-600" : 
                  log.severity === "warning" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                }`}>
                  {log.module === "Auth" ? <Shield className="h-5 w-5" /> : 
                   log.module === "Admin" ? <ClipboardList className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 mb-1">
                    <p className="text-sm font-black text-foreground flex items-center gap-2">
                       {log.userName || "System"}
                       <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                       <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter ${
                         log.module === "Admin" ? "bg-purple-100 text-purple-600" :
                         log.module === "Auth" ? "bg-orange-100 text-orange-600" : 
                         "bg-blue-100 text-blue-600"
                       }`}>
                         {log.module}
                       </span>
                    </p>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                       <Clock className="h-3 w-3" /> {formatTime(log.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">{log.message}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
             <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center">
                <Activity className="h-8 w-8 text-muted-foreground/30" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-foreground">No activities found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or wait for system updates.</p>
             </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ActivityLogPage;

