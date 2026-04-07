import DashboardLayout from "@/components/DashboardLayout";
import { User, LayoutDashboard, BookOpen, ClipboardCheck, MessageSquare, Mail, Phone, MapPin, Building, GraduationCap, Calendar, Edit, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Profile", path: "/student/profile", icon: User },
  { label: "Subjects", path: "/student/subjects", icon: BookOpen },
  { label: "Marks", path: "/student/marks", icon: ClipboardCheck },
  { label: "Remarks", path: "/student/remarks", icon: MessageSquare },
];

const MyProfilePage = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout navItems={navItems} title="My Academic Profile">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="stat-card p-8 flex flex-col items-center text-center">
            <div className="gradient-accent w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold text-accent-foreground mb-4 shadow-xl">
              {user?.fullName?.charAt(0) || "S"}
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-1">{user?.fullName || "Student Name"}</h3>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-6">Student</p>
            <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold h-11">
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          </div>

          <div className="stat-card p-6 divide-y divide-border">
            <div className="pb-4">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">Student ID</p>
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" /> {user?.studentId || "STU-12345"}
              </p>
            </div>
            <div className="py-4">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">Enrollment Year</p>
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" /> {user?.academicYear || "2025-26"}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="stat-card p-8">
            <h3 className="text-xl font-heading font-bold text-foreground mb-8">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/50">
                  <div className="p-2.5 bg-background rounded-xl text-accent shadow-sm">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Email Address</p>
                    <p className="text-sm font-semibold text-foreground">{user?.email || "student@institution.edu"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/50">
                  <div className="p-2.5 bg-background rounded-xl text-accent shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Phone Number</p>
                    <p className="text-sm font-semibold text-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/50">
                  <div className="p-2.5 bg-background rounded-xl text-accent shadow-sm">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Department</p>
                    <p className="text-sm font-semibold text-foreground">{user?.department || "Computer Science"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/50">
                  <div className="p-2.5 bg-background rounded-xl text-accent shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Address</p>
                    <p className="text-sm font-semibold text-foreground">123 University Ave, Campus Town</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card p-8 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Academic Standing</h3>
                <p className="opacity-70 max-w-sm">
                  You are currently in good academic standing. Keep up your performance in the upcoming finals!
                </p>
              </div>
              <div className="flex gap-4">
                <div className="p-6 bg-white/10 rounded-2xl text-center min-w-[120px]">
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-50 mb-1">Current CGPA</p>
                  <p className="text-3xl font-bold">8.75</p>
                </div>
                <div className="p-6 bg-white/10 rounded-2xl text-center min-w-[120px]">
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-50 mb-1">Credits Earned</p>
                  <p className="text-3xl font-bold">64</p>
                </div>
              </div>
            </div>
            <GraduationCap className="absolute -bottom-10 -right-10 h-48 w-48 opacity-10 text-white rotate-12" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyProfilePage;
