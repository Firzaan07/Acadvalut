import DashboardLayout from "@/components/DashboardLayout";
import { BarChart3, LayoutDashboard, Users, ClipboardCheck, MessageSquare, Search, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/faculty/dashboard", icon: LayoutDashboard },
  { label: "My Students", path: "/faculty/students", icon: Users },
  { label: "Update Marks", path: "/faculty/marks", icon: ClipboardCheck },
  { label: "Attendance", path: "/faculty/attendance", icon: BarChart3 },
  { label: "Remarks", path: "/faculty/remarks", icon: MessageSquare },
];

const FacultyAttendance = () => {
  const [students, setStudents] = useState([
    { id: "STU-001", name: "Alice Johnson", present: true },
    { id: "STU-002", name: "Bob Williams", present: true },
    { id: "STU-003", name: "Carol Davis", present: false },
    { id: "STU-004", name: "David Brown", present: true },
  ]);

  const toggleAttendance = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  return (
    <DashboardLayout navItems={navItems} title="Manage Attendance" role="Faculty">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-10" placeholder="Search students..." />
          </div>
          <Button className="gradient-accent text-accent-foreground font-semibold">Save Attendance</Button>
        </div>

        <div className="stat-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 font-heading font-semibold text-foreground">Student Name</th>
                <th className="p-4 font-heading font-semibold text-foreground text-center">Status</th>
                <th className="p-4 font-heading font-semibold text-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.id}</p>
                  </td>
                  <td className="p-4 text-center">
                    {student.present ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-success uppercase">
                        <CheckCircle2 className="h-4 w-4" /> Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-destructive uppercase">
                        <XCircle className="h-4 w-4" /> Absent
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleAttendance(student.id)}
                      className={student.present ? "text-destructive" : "text-success"}
                    >
                      Mark {student.present ? "Absent" : "Present"}
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
};

export default FacultyAttendance;
