import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, GraduationCap } from "lucide-react";

const ProfileSetup = () => {
  const { role, user, completeProfile } = useAuth();
  const navigate = useNavigate();
  const [fields, setFields] = useState<Record<string, string>>({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  const update = (key: string, value: string) => setFields((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await completeProfile(fields);
      navigate(`/${role}/dashboard`);
    } catch (error) {
       console.error("Profile setup failed", error);
    }
  };

  const extraFields: { key: string; label: string; placeholder: string }[] =
    role === "admin"
      ? [{ key: "organization", label: "Organization Name", placeholder: "University of..." }]
      : role === "faculty"
      ? [
          { key: "department", label: "Department", placeholder: "Computer Science" },
          { key: "employeeId", label: "Employee ID", placeholder: "FAC-001" },
        ]
      : [
          { key: "department", label: "Department", placeholder: "Computer Science" },
          { key: "studentId", label: "Student ID", placeholder: "STU-001" },
          { key: "academicYear", label: "Academic Year", placeholder: "2025-2026" },
        ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-8">
          <div className="gradient-accent w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-7 w-7 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Setting up as <span className="text-accent font-semibold capitalize">{role}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-card space-y-5">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={fields.fullName} onChange={(e) => update("fullName", e.target.value)} className="h-12 bg-secondary" required />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={fields.email} onChange={(e) => update("email", e.target.value)} className="h-12 bg-secondary" required />
          </div>
          {extraFields.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label>{f.label}</Label>
              <Input placeholder={f.placeholder} value={fields[f.key] || ""} onChange={(e) => update(f.key, e.target.value)} className="h-12 bg-secondary" required />
            </div>
          ))}
          <Button type="submit" className="w-full h-12 gradient-accent text-accent-foreground font-semibold hover:opacity-90">
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
