import DashboardLayout from "@/components/DashboardLayout";
import { ClipboardCheck, LayoutDashboard, Users, BarChart3, MessageSquare, Search, Save, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Dashboard", path: "/faculty/dashboard", icon: LayoutDashboard },
  { label: "My Students", path: "/faculty/students", icon: Users },
  { label: "Update Marks", path: "/faculty/marks", icon: ClipboardCheck },
  { label: "Attendance", path: "/faculty/attendance", icon: BarChart3 },
  { label: "Remarks", path: "/faculty/remarks", icon: MessageSquare },
];

const studentMarks = [
  { name: "Alice Johnson", id: "STU-001", currentMarks: 88, subject: "Data Structures" },
  { name: "Bob Williams", id: "STU-002", currentMarks: 72, subject: "Data Structures" },
  { name: "Carol Davis", id: "STU-003", currentMarks: 95, subject: "Data Structures" },
];

const MarksUpdatePage = () => (
  <DashboardLayout navItems={navItems} title="Update Student Marks">
    <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search students..." className="pl-10 bg-secondary border-none" />
      </div>
      <div className="flex items-center gap-2 text-warning text-sm font-medium bg-warning/10 px-3 py-1.5 rounded-lg border border-warning/20">
        <AlertCircle className="h-4 w-4" />
        Final submission due in 2 days
      </div>
    </div>

    <div className="stat-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Student Name</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Student ID</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Subject</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium w-32">Current Marks</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium w-32">New Marks</th>
              <th className="text-right py-4 px-4 text-muted-foreground font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {studentMarks.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="py-4 px-4 font-medium text-foreground">{s.name}</td>
                <td className="py-4 px-4 text-muted-foreground">{s.id}</td>
                <td className="py-4 px-4 text-muted-foreground">{s.subject}</td>
                <td className="py-4 px-4 font-semibold text-foreground">{s.currentMarks}</td>
                <td className="py-2 px-4">
                  <Input type="number" placeholder="Enter..." className="h-9 w-24 bg-background border-border text-center" />
                </td>
                <td className="py-4 px-4 text-right">
                  <Button variant="outline" size="sm" className="h-9 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold">
                    <Save className="h-4 w-4 mr-2" /> Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
);

export default MarksUpdatePage;
