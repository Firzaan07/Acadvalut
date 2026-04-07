import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import {
  LayoutDashboard, BookOpen, ClipboardCheck, MessageSquare, User, GraduationCap, TrendingUp, Award,
} from "lucide-react";

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
];

const remarks = [
  { faculty: "Dr. Smith", text: "Excellent performance in lab assignments. Keep up the good work!", date: "Mar 2, 2026" },
  { faculty: "Dr. Patel", text: "Needs to focus more on calculus problem sets.", date: "Feb 28, 2026" },
];

const StudentDashboard = () => (
  <DashboardLayout navItems={navItems} title="Student Dashboard">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatCard icon={GraduationCap} title="CGPA" value="8.7" color="accent" />
      <StatCard icon={TrendingUp} title="Attendance" value="91%" color="info" />
      <StatCard icon={BookOpen} title="Enrolled Subjects" value={4} color="success" />
      <StatCard icon={Award} title="Rank" value="#12" color="warning" />
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 stat-card overflow-hidden">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">My Subjects</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Subject</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Code</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Marks</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Grade</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Faculty</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.code} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{s.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{s.code}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">{s.marks}</td>
                  <td className="py-3 px-4">
                    <span className="gradient-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full">{s.grade}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{s.faculty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stat-card">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Faculty Remarks</h3>
        <div className="space-y-4">
          {remarks.map((r, i) => (
            <div key={i} className="p-4 bg-secondary rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="gradient-accent w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                  {r.faculty.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-foreground">{r.faculty}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              <p className="text-xs text-muted-foreground mt-2">{r.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default StudentDashboard;
