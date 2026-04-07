import DashboardLayout from "@/components/DashboardLayout";
import { ClipboardCheck, LayoutDashboard, User, BookOpen, MessageSquare, GraduationCap, BarChart3, TrendingUp, AlertCircle, Award } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Profile", path: "/student/profile", icon: User },
  { label: "Subjects", path: "/student/subjects", icon: BookOpen },
  { label: "Marks", path: "/student/marks", icon: ClipboardCheck },
  { label: "Remarks", path: "/student/remarks", icon: MessageSquare },
];

const semesterMarks = [
  { code: "CS-201", subject: "Data Structures", total: 100, obtained: 88, grade: "A" },
  { code: "MA-202", subject: "Mathematics II", total: 100, obtained: 76, grade: "B+" },
  { code: "CS-301", subject: "Database Systems", total: 100, obtained: 92, grade: "A+" },
  { code: "CS-302", subject: "Operating Systems", total: 100, obtained: 81, grade: "A-" },
];

const MarksPage = () => (
  <DashboardLayout navItems={navItems} title="Academic Performance">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
      <div className="stat-card p-6 border-l-4 border-l-accent flex items-center gap-4">
        <div className="p-3 bg-accent/10 rounded-2xl text-accent">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Overall SGPA</p>
          <p className="text-2xl font-bold text-foreground">8.54</p>
        </div>
      </div>
      <div className="stat-card p-6 border-l-4 border-l-success flex items-center gap-4">
        <div className="p-3 bg-success/10 rounded-2xl text-success">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Credits</p>
          <p className="text-2xl font-bold text-foreground">18.0</p>
        </div>
      </div>
      <div className="stat-card p-6 border-l-4 border-l-info flex items-center gap-4">
        <div className="p-3 bg-info/10 rounded-2xl text-info">
          <Award className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Academic Rank</p>
          <p className="text-2xl font-bold text-foreground">Top 10%</p>
        </div>
      </div>
    </div>

    <div className="stat-card overflow-hidden">
      <div className="p-5 border-b border-border flex justify-between items-center bg-secondary/30">
        <h3 className="text-lg font-heading font-semibold text-foreground">Current Semester Results</h3>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-3 py-1 bg-background rounded-full border border-border">
          Semester III, 2025-26
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Course Code</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Subject Name</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Total</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium">Obtained</th>
              <th className="text-left py-4 px-4 text-muted-foreground font-medium text-right">Grade</th>
            </tr>
          </thead>
          <tbody>
            {semesterMarks.map((m) => (
              <tr key={m.code} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="py-4 px-4 font-mono text-xs">{m.code}</td>
                <td className="py-4 px-4 font-medium text-foreground">{m.subject}</td>
                <td className="py-4 px-4 text-muted-foreground">{m.total}</td>
                <td className="py-4 px-4 font-bold text-foreground">{m.obtained}</td>
                <td className="py-4 px-4 text-right">
                  <span className="gradient-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {m.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-secondary/10 flex items-center gap-3 text-muted-foreground border-t border-border">
        <AlertCircle className="h-4 w-4" />
        <p className="text-xs">Final results are subject to verification from the administration portal.</p>
      </div>
    </div>
  </DashboardLayout>
);

export default MarksPage;
