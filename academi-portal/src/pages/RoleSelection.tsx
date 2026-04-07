import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Shield, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const roles: { id: UserRole; title: string; description: string; icon: React.ElementType }[] = [
  { id: "admin", title: "Administrator", description: "Full system control, manage faculty & students, monitor activities", icon: Shield },
  { id: "faculty", title: "Faculty", description: "Manage student records, update marks, track attendance", icon: BookOpen },
  { id: "student", title: "Student", description: "View grades, attendance, enroll in subjects, track progress", icon: GraduationCap },
];

const RoleSelection = () => {
  const { selectRole } = useAuth();
  const navigate = useNavigate();

  const handleSelect = async (role: UserRole) => {
    try {
      await selectRole(role);
      navigate("/profile-setup");
    } catch (error) {
      console.error("Role selection failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-3xl w-full animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-3">Select Your Role</h1>
          <p className="text-muted-foreground text-lg">Choose how you'll use AcadVault</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelect(role.id)}
              className="group stat-card text-left cursor-pointer hover:border-accent transition-all duration-300"
            >
              <div className="gradient-accent w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <role.icon className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">{role.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{role.description}</p>
              <div className="flex items-center text-accent font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Continue <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
