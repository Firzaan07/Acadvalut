import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  GraduationCap, LogOut, Menu, X, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: ReactNode;
  navItems?: NavItem[];
  title?: string;
  role?: "Admin" | "Faculty" | "Student";
}

const DashboardLayout = ({ children, navItems, title, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        } bg-primary overflow-hidden`}
      >
        <div className="flex items-center gap-3 p-5 border-b border-sidebar-border min-h-[72px]">
          <div className="gradient-accent p-2 rounded-lg flex-shrink-0">
            <GraduationCap className="h-5 w-5 text-accent-foreground" />
          </div>
          {sidebarOpen && <span className="text-xl font-heading font-bold text-white whitespace-nowrap">AcadVault</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
                {active && sidebarOpen && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {(sidebarOpen || !sidebarOpen) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[72px] border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-heading font-semibold text-foreground">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <div className="gradient-accent w-10 h-10 rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm">
              {user?.fullName?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;
