import DashboardLayout from "@/components/DashboardLayout";
import { MessageSquare, LayoutDashboard, Users, ClipboardCheck, BarChart3, Send, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Dashboard", path: "/faculty/dashboard", icon: LayoutDashboard },
  { label: "My Students", path: "/faculty/students", icon: Users },
  { label: "Update Marks", path: "/faculty/marks", icon: ClipboardCheck },
  { label: "Attendance", path: "/faculty/attendance", icon: BarChart3 },
  { label: "Remarks", path: "/faculty/remarks", icon: MessageSquare },
];

const RemarksPage = () => (
  <DashboardLayout navItems={navItems} title="Academic Remarks">
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="stat-card p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Add Remark</h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Select Student</label>
                <Input placeholder="Student ID (e.g. STU-001)" className="h-11 bg-secondary border-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <Input placeholder="Improvement, Performance, etc." className="h-11 bg-secondary border-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Remark Content</label>
              <Textarea placeholder="Type your observation here..." className="min-h-[140px] bg-secondary border-none resize-none" />
            </div>
            <div className="flex justify-end">
              <Button className="gradient-accent text-accent-foreground font-bold h-11 px-8 shadow-sm">
                <Send className="h-4 w-4 mr-2" /> Send Remark
              </Button>
            </div>
          </div>
        </div>

        <div className="stat-card p-0 overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="text-lg font-heading font-semibold text-foreground">Recently Sent Remarks</h3>
          </div>
          <div className="divide-y divide-border">
            {[
              { student: "Alice Johnson", date: "Mar 6, 2026", text: "Excellent progress in JavaScript labs.", type: "Positive" },
              { student: "Bob Williams", date: "Mar 4, 2026", text: "Needs to participate more in group discussions.", type: "Neutral" },
              { student: "Carol Davis", date: "Feb 28, 2026", text: "Exceptional performance in mid-term viva.", type: "Positive" },
            ].map((r, i) => (
              <div key={i} className="p-5 hover:bg-secondary/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-foreground">{r.student}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                <span className={`inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  r.type === "Positive" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                }`}>{r.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="stat-card p-6 bg-accent text-accent-foreground">
          <h3 className="text-lg font-heading font-bold mb-2">Remark Guidelines</h3>
          <p className="text-sm opacity-80 mb-6 leading-relaxed">
            Ensure that every remark is objective and constructive. Specific examples of student performance help in tracking academic growth accurately.
          </p>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span> Professional tone
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span> Actionable feedback
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span> Private to student only
            </li>
          </ul>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default RemarksPage;
