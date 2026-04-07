import DashboardLayout from "@/components/DashboardLayout";
import { Users, Search, LayoutDashboard, ClipboardCheck, BarChart3, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Dashboard", path: "/faculty/dashboard", icon: LayoutDashboard },
  { label: "My Students", path: "/faculty/students", icon: Users },
  { label: "Update Marks", path: "/faculty/marks", icon: ClipboardCheck },
  { label: "Attendance", path: "/faculty/attendance", icon: BarChart3 },
  { label: "Remarks", path: "/faculty/remarks", icon: MessageSquare },
];

const students = [
  { name: "Alice Johnson", id: "STU-001", marks: 88, attendance: "92%", status: "Good" },
  { name: "Bob Williams", id: "STU-002", marks: 72, attendance: "85%", status: "Average" },
  { name: "Carol Davis", id: "STU-003", marks: 95, attendance: "98%", status: "Excellent" },
  { name: "David Brown", id: "STU-004", marks: 65, attendance: "78%", status: "Needs Improvement" },
  { name: "Eve Martinez", id: "STU-005", marks: 91, attendance: "95%", status: "Good" },
];

const statusColor: Record<string, string> = {
  Excellent: "bg-success/10 text-success",
  Good: "bg-info/10 text-info",
  Average: "bg-warning/10 text-warning",
  "Needs Improvement": "bg-destructive/10 text-destructive",
};

const FacultyStudentsPage = () => (
  <DashboardLayout navItems={navItems} title="Assigned Students">
    <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search students..." className="pl-10 bg-secondary border-none" />
      </div>
    </div>

    <div className="stat-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Student</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">ID</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Marks</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Attendance</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="py-4 px-4 font-medium text-foreground">{s.name}</td>
                <td className="py-4 px-4 text-muted-foreground">{s.id}</td>
                <td className="py-4 px-4 text-foreground font-semibold">{s.marks}</td>
                <td className="py-4 px-4 text-foreground">{s.attendance}</td>
                <td className="py-4 px-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[s.status]}`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
);

export default FacultyStudentsPage;
