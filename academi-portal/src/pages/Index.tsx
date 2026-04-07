import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Shield, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => (
  <div className="min-h-screen bg-background">
    {/* Nav */}
    <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="gradient-accent p-2 rounded-lg">
          <GraduationCap className="h-5 w-5 text-accent-foreground" />
        </div>
        <span className="text-xl font-heading font-bold text-foreground">AcadVault</span>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/login">
          <Button variant="ghost" className="text-foreground font-medium">Sign In</Button>
        </Link>
        <Link to="/signup">
          <Button className="gradient-accent text-accent-foreground font-semibold hover:opacity-90">Get Started</Button>
        </Link>
      </div>
    </nav>

    {/* Hero */}
    <section className="max-w-7xl mx-auto px-8 pt-20 pb-24 text-center">
      <div className="inline-block gradient-accent text-accent-foreground text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
        Academic Data Management
      </div>
      <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight max-w-3xl mx-auto">
        Manage Academic Records with <span className="text-gradient-accent">Precision & Security</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
        AcadVault provides a comprehensive platform for administrators, faculty, and students to manage academic data seamlessly.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link to="/signup">
          <Button size="lg" className="gradient-accent text-accent-foreground font-semibold h-13 px-8 text-base hover:opacity-90">
            Start Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link to="/login">
          <Button size="lg" variant="outline" className="h-13 px-8 text-base font-semibold border-border text-foreground">
            Sign In
          </Button>
        </Link>
      </div>
    </section>

    {/* Features */}
    <section className="max-w-7xl mx-auto px-8 pb-24">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Shield, title: "Admin Control", desc: "Full system oversight with student & faculty management, activity logs, and analytics." },
          { icon: BookOpen, title: "Faculty Tools", desc: "Update marks, track attendance, and provide academic remarks to assigned students." },
          { icon: Users, title: "Student Portal", desc: "View grades, attendance, enroll in subjects, and track your academic journey." },
        ].map((f) => (
          <div key={f.title} className="stat-card group">
            <div className="gradient-accent w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <f.icon className="h-7 w-7 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Index;
