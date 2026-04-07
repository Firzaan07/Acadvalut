import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  ClipboardList, 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  Activity, 
  BarChart3, 
  Search, 
  MoreVertical, 
  Plus, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { AssignmentFormModal } from "@/components/AssignmentFormModal";
import { adminService } from "@/services/api";
import { toast } from "sonner";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "All Students", path: "/admin/students", icon: GraduationCap },
  { label: "All Faculty", path: "/admin/faculty", icon: Users },
  { label: "Assignments", path: "/admin/assignments", icon: ClipboardList },
  { label: "Activity Log", path: "/admin/activity", icon: Activity },
  { label: "Statistics", path: "/admin/statistics", icon: BarChart3 },
];

const AssignmentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllAssignments();
      if (response.success) {
        setAssignments(response.data || []);
      }
    } catch (error) {
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter(a => 
    a.student?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.faculty?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.subject?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await adminService.updateAssignment(id, { status });
      if (res.success) {
        setAssignments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
        toast.success(`Assignment marked as ${status}`);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this assignment link?")) return;
    try {
      const res = await adminService.deleteAssignment(id);
      if (res.success) {
        setAssignments(prev => prev.filter(a => a._id !== id));
        toast.success("Assignment record deleted");
      }
    } catch (error) {
      toast.error("Failed to delete assignment");
    }
  };

  return (
    <DashboardLayout navItems={navItems} title="Faculty-Student Assignments">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search assignments..." 
            className="pl-10 bg-secondary border-none" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          className="gradient-accent text-accent-foreground"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> New Assignment
        </Button>
      </div>

      <div className="stat-card overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground animate-pulse font-medium">Fetching registry...</p>
            </div>
          ) : filteredAssignments.length > 0 ? (
            <table className="w-full text-sm text-foreground">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left py-4 px-4 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">ASN ID</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">Student</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">Faculty</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">Subject</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">Date</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">Status</th>
                  <th className="text-right py-4 px-4 text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredAssignments.map((a) => (
                  <tr key={a._id} className="hover:bg-secondary/50 transition-all group">
                    <td className="py-4 px-4 font-mono text-[11px] text-muted-foreground uppercase">{a._id.substring(18)}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground group-hover:text-primary transition-colors">{a.student?.fullName || "N/A"}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">{a.student?.studentId || "N/A"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{a.faculty?.fullName || "N/A"}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">{a.faculty?.employeeId || "N/A"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                       <div className="flex flex-col">
                        <span className="font-medium text-foreground">{a.subject?.name || "N/A"}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">{a.subject?.code || "N/A"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                        a.isActive ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : 
                        "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}>
                        {a.isActive ? "Active" : "Archived"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200 shadow-2xl rounded-xl p-1.5 overflow-hidden">
                          <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-100" />
                          
                          {a.status !== "Completed" && (
                            <DropdownMenuItem 
                              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors"
                              onClick={() => handleUpdateStatus(a._id, "Completed")}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="font-bold text-xs uppercase tracking-tight">Mark Completed</span>
                            </DropdownMenuItem>
                          )}
                          
                          {a.status === "Pending" && (
                            <DropdownMenuItem 
                              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                              onClick={() => handleUpdateStatus(a._id, "In Progress")}
                            >
                              <Clock className="h-4 w-4" />
                              <span className="font-bold text-xs uppercase tracking-tight">Approve Assignment</span>
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                            <ExternalLink className="h-4 w-4" />
                            <span className="font-bold text-xs uppercase tracking-tight">View Profile</span>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-slate-100" />
                          
                          <DropdownMenuItem 
                            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                            onClick={() => handleDelete(a._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="font-bold text-xs uppercase tracking-tight">Delete Link</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
              <div className="h-16 w-16 rounded-3xl bg-secondary flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">No assignments found</h3>
                <p className="text-sm text-muted-foreground max-w-xs">Start by linking a student to a faculty member from the dashboard.</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 border-primary/20 hover:bg-primary/5 text-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Create First Assignment
              </Button>
            </div>
          )}
        </div>
      </div>

      <AssignmentFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchAssignments}
      />
    </DashboardLayout>
  );
};

export default AssignmentsPage;
