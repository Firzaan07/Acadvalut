import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Briefcase, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  FileText, 
  TrendingUp, 
  Target 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FacultyProfile = () => {
  const { user } = useAuth();

  const performanceData = [
    { label: "Students Taught", value: "145", suffix: "Total" },
    { label: "Avg Class Marks", value: "84.5", suffix: "%" },
    { label: "Attendance Rate", value: "92", suffix: "%" },
    { label: "Satisfaction", value: "4.8", suffix: "/ 5.0" },
  ];

  return (
    <DashboardLayout title="Faculty Profile" role="Faculty">
      <div className="space-y-6">
        {/* Header/Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 stat-card flex flex-col items-center justify-center p-6 bg-card border border-border">
            <div className="w-24 h-24 rounded-full gradient-accent flex items-center justify-center text-accent-foreground text-3xl font-heading font-black mb-4">
              {user?.fullName?.charAt(0)}
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground">{user?.fullName}</h2>
            <Badge className="mt-2 bg-primary/10 text-primary border-primary/20 font-bold px-3">Faculty Member</Badge>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 font-medium italic">
              Emp ID: #F-2024-001
            </p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {performanceData.map((data, idx) => (
              <div key={idx} className="stat-card p-4 flex flex-col items-center justify-center text-center bg-card border border-border group hover:border-primary/50 transition-all">
                <Target className="h-5 w-5 text-primary mb-2 hidden sm:block opacity-40 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">{data.label}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <h3 className="text-3xl font-heading font-black text-foreground">{data.value}</h3>
                  <span className="text-xs font-bold text-muted-foreground">{data.suffix}</span>
                </div>
              </div>
            ))}
            <div className="col-span-2 md:col-span-4 bg-muted/30 border border-border/50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-emerald-600 animate-pulse" />
                <p className="text-sm font-bold text-foreground tracking-tight">Student performance has improved by 4.2% since last semester.</p>
              </div>
              <Button variant="ghost" className="text-xs font-bold text-primary p-0 h-auto">View Detailed Report</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Details Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border shadow-sm bg-card">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg font-heading font-bold flex items-center gap-2 text-foreground">
                  <User className="h-5 w-5 text-primary" /> Personal Information
                </CardTitle>
                <CardDescription className="text-xs font-medium text-muted-foreground italic">Update your contact details and professional info.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Full Name</label>
                  <Input placeholder="Full Name" className="h-11 border-border bg-background font-semibold"  defaultValue={user?.fullName}/>
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Email Address</label>
                  <Input placeholder="Email Address" className="h-11 border-border bg-background font-semibold" defaultValue={user?.email}/>
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Department</label>
                  <Input placeholder="Department" className="h-11 border-border bg-background font-semibold" defaultValue="Computer Science & Engineering" disabled />
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Phone Number</label>
                  <Input placeholder="Phone Number" className="h-11 border-border bg-background font-semibold" defaultValue="+1 234 567 890" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                  <Button variant="outline" className="h-11 px-6 font-bold border-border text-foreground">Discard Changes</Button>
                  <Button className="gradient-accent text-accent-foreground font-black h-11 px-6">Save Profile Updates</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-card">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg font-heading font-bold flex items-center gap-2 text-foreground">
                  <GraduationCap className="h-5 w-5 text-primary" /> Professional Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { title: "Ph.D. in Computer Science", institution: "Stanford University", year: "2018" },
                    { title: "M.Tech in Data Science", institution: "MIT", year: "2014" },
                  ].map((edu, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/10 group cursor-pointer hover:border-primary/40 transition-all">
                      <div className="bg-primary/20 p-2 rounded-lg text-primary font-bold group-hover:scale-110 transition-transform">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">{edu.title}</h4>
                        <p className="text-xs text-muted-foreground font-medium italic">{edu.institution} • {edu.year}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="link" className="p-0 h-auto text-xs font-black text-primary uppercase tracking-widest">+ Add New Qualification</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="border-border shadow-sm bg-card">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg font-heading font-bold flex items-center gap-2 text-foreground uppercase tracking-tight">
                  <Lock className="h-4 w-4 text-primary" /> Security
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button variant="outline" className="w-full justify-start h-11 font-bold border-border text-foreground bg-background hover:bg-muted">
                  <ShieldCheck className="mr-2 h-4 w-4 text-emerald-600" /> Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start h-11 font-bold border-border text-foreground bg-background hover:bg-muted">
                  <FileText className="mr-2 h-4 w-4 text-blue-600" /> Professional Bio
                </Button>
                <div className="p-4 rounded-xl border border-dashed border-border bg-muted/10">
                  <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-2 tracking-widest">Account Status</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-600 tracking-tight">Verified Faculty Account</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-card">
              <CardHeader className="border-b bg-muted/20">
                <CardTitle className="text-lg font-heading font-bold flex items-center gap-2 text-foreground uppercase tracking-tight">
                  Current Assignments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {["Data Structures", "Algorithm Design", "Network Security"].map((sub) => (
                  <div key={sub} className="flex items-center justify-between text-sm font-bold text-foreground p-3 border border-border bg-background rounded-lg shadow-sm">
                    {sub}
                    <Badge className="bg-primary/5 text-primary border-primary/20 text-[10px] uppercase font-black">Subject</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyProfile;
