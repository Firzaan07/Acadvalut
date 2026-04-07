import DashboardLayout from "@/components/DashboardLayout";
import { MessageSquare, LayoutDashboard, User, BookOpen, ClipboardCheck, GraduationCap, Calendar, Clock, AlertTriangle, CheckCircle, Info } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Profile", path: "/student/profile", icon: User },
  { label: "Subjects", path: "/student/subjects", icon: BookOpen },
  { label: "Marks", path: "/student/marks", icon: ClipboardCheck },
  { label: "Remarks", path: "/student/remarks", icon: MessageSquare },
];

const facultyRemarks = [
  { faculty: "Dr. Smith", subject: "Data Structures", text: "Excellent performance in practical lab assignments. Keep up the high standard!", date: "Mar 2, 2026", urgency: "Normal" },
  { faculty: "Dr. Patel", subject: "Mathematics II", text: "Needs to focus more on calculus problem sets before the final examination.", date: "Feb 28, 2026", urgency: "Action Required" },
  { faculty: "Dr. Johnson", subject: "Database Systems", text: "A+ performance in SQL project presentation.", date: "Feb 20, 2026", urgency: "Highlight" },
  { faculty: "Dr. Lee", subject: "Operating Systems", text: "Could improve on theoretical concepts during class discussions.", date: "Feb 15, 2026", urgency: "Normal" },
];

const StudentRemarksPage = () => (
  <DashboardLayout navItems={navItems} title="Faculty Feedback & Remarks">
    <div className="grid lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <div className="space-y-4">
          {facultyRemarks.map((r, i) => (
            <div key={i} className="stat-card p-6 border-l-4 group hover:border-accent transition-all duration-300" style={{
              borderLeftColor: r.urgency === "Action Required" ? "var(--destructive)" : 
                              r.urgency === "Highlight" ? "var(--accent)" : "var(--info)"
            }}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="gradient-accent w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-accent-foreground shadow-sm">
                    {r.faculty.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{r.faculty}</h4>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{r.subject}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase font-bold tracking-wider">
                    <Calendar className="h-3 w-3" /> {r.date}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm mt-1 ${
                    r.urgency === "Action Required" ? "bg-destructive/10 text-destructive border border-destructive/20" : 
                    r.urgency === "Highlight" ? "bg-accent/10 text-accent border border-accent/20" : 
                    "bg-info/10 text-info border border-info/20"
                  }`}>
                    {r.urgency}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-2xl relative line-height-relaxed">
                <p className="text-sm text-foreground italic">"{r.text}"</p>
                <Clock className="absolute top-2 right-2 h-3 w-3 opacity-20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="stat-card p-6 bg-primary text-primary-foreground shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" /> Feedback Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-70">
                <span>Positive Remarks</span>
                <span>75%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full w-3/4" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-4 bg-white/5 rounded-2xl flex flex-col items-center">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Total Feedback</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl flex flex-col items-center">
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Pending Actions</p>
                </div>
              </div>
            </div>
          </div>
          <MessageSquare className="absolute -bottom-10 -right-10 h-40 w-40 opacity-5 -rotate-12 transition-transform group-hover:scale-110" />
        </div>

        <div className="stat-card p-6 border border-border border-dashed">
          <h4 className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <Info className="h-4 w-4" /> About Remarks
          </h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Remarks are confidential academic feedback provided directly by your faculty. They help in tracking your strengths and identifying areas needing further focus.
          </p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default StudentRemarksPage;
