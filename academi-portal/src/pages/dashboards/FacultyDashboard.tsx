import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import {
  LayoutDashboard, Users, ClipboardCheck, MessageSquare, BarChart3, GraduationCap, BookOpen, TrendingUp,
} from "lucide-react";

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

const FacultyDashboard = () => (
  <DashboardLayout navItems={navItems} title="Faculty Dashboard">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatCard icon={Users} title="Assigned Students" value={32} color="accent" />
      <StatCard icon={GraduationCap} title="Avg. Marks" value="82%" color="info" />
      <StatCard icon={BookOpen} title="Subjects" value={4} color="success" />
      <StatCard icon={TrendingUp} title="Avg. Attendance" value="89%" color="warning" />
    </div>

    <div className="stat-card overflow-hidden">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Assigned Students</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Student</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">ID</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Marks</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Attendance</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{s.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{s.id}</td>
                <td className="py-3 px-4 text-foreground font-semibold">{s.marks}</td>
                <td className="py-3 px-4 text-foreground">{s.attendance}</td>
                <td className="py-3 px-4">
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

export default FacultyDashboard;
