import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, GraduationCap, LayoutDashboard, User, ClipboardCheck, MessageSquare } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Profile", path: "/student/profile", icon: User },
  { label: "Subjects", path: "/student/subjects", icon: BookOpen },
  { label: "Marks", path: "/student/marks", icon: ClipboardCheck },
  { label: "Remarks", path: "/student/remarks", icon: MessageSquare },
];

const subjects = [
  { name: "Data Structures", code: "CS-201", marks: 88, grade: "A", faculty: "Dr. Smith" },
  { name: "Mathematics II", code: "MA-202", marks: 76, grade: "B+", faculty: "Dr. Patel" },
  { name: "Database Systems", code: "CS-301", marks: 92, grade: "A+", faculty: "Dr. Johnson" },
  { name: "Operating Systems", code: "CS-302", marks: 81, grade: "A-", faculty: "Dr. Lee" },
  { name: "Computer Networks", code: "CS-401", marks: 85, grade: "A", faculty: "Dr. Wang" },
];

const StudentSubjectsPage = () => (
  <DashboardLayout navItems={navItems} title="Enrolled Subjects">
    <div className="stat-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Subject</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Code</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Faculty</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Marks</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.code} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="py-4 px-4 font-medium text-foreground">{s.name}</td>
                <td className="py-4 px-4 text-muted-foreground">{s.code}</td>
                <td className="py-4 px-4 text-muted-foreground">{s.faculty}</td>
                <td className="py-4 px-4 text-foreground font-semibold">{s.marks}</td>
                <td className="py-4 px-4">
                  <span className="gradient-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full">{s.grade}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
);

export default StudentSubjectsPage;
