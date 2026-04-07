import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelection from "./pages/RoleSelection";
import ProfileSetup from "./pages/ProfileSetup";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import FacultyDashboard from "./pages/dashboards/FacultyDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import AdminStatistics from "./pages/admin/Statistics";
import AdminStudents from "./pages/admin/Students";
import AdminFaculty from "./pages/admin/Faculty";
import AdminAssignments from "./pages/admin/Assignments";
import AdminActivityLog from "./pages/admin/ActivityLog";
import AdminUsers from "./pages/admin/Users";
import AdminSubjects from "./pages/admin/Subjects";
import AdminDepartments from "./pages/admin/Departments";
import AdminExams from "./pages/admin/Exams";
import AdminFees from "./pages/admin/Fees";
import AdminAttendance from "./pages/admin/Attendance";
import AdminNotices from "./pages/admin/Notices";
import AdminSettings from "./pages/admin/Settings";
import FacultyStudents from "./pages/faculty/Students";
import FacultyUpdateMarks from "./pages/faculty/UpdateMarks";
import FacultyAttendance from "./pages/faculty/Attendance";
import FacultyRemarks from "./pages/faculty/Remarks";
import FacultyProfile from "./pages/faculty/Profile";
import FacultySubjects from "./pages/faculty/Subjects";
import StudentProfile from "./pages/student/Profile";
import StudentSubjects from "./pages/student/Subjects";
import StudentMarks from "./pages/student/Marks";
import StudentRemarks from "./pages/student/Remarks";
import StudentEnrollSubjects from "./pages/student/EnrollSubjects";
import StudentProgress from "./pages/student/Progress";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["admin"]}><AdminStudents /></ProtectedRoute>} />
            <Route path="/admin/faculty" element={<ProtectedRoute allowedRoles={["admin"]}><AdminFaculty /></ProtectedRoute>} />
            <Route path="/admin/assignments" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAssignments /></ProtectedRoute>} />
            <Route path="/admin/activity" element={<ProtectedRoute allowedRoles={["admin"]}><AdminActivityLog /></ProtectedRoute>} />
            <Route path="/admin/statistics" element={<ProtectedRoute allowedRoles={["admin"]}><AdminStatistics /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/subjects" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSubjects /></ProtectedRoute>} />
            <Route path="/admin/departments" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDepartments /></ProtectedRoute>} />
            <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={["admin"]}><AdminExams /></ProtectedRoute>} />
            <Route path="/admin/fees" element={<ProtectedRoute allowedRoles={["admin"]}><AdminFees /></ProtectedRoute>} />
            <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={["admin"]}><AdminAttendance /></ProtectedRoute>} />
            <Route path="/admin/notices" element={<ProtectedRoute allowedRoles={["admin"]}><AdminNotices /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["admin"]}><AdminSettings /></ProtectedRoute>} />
            <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyDashboard /></ProtectedRoute>} />
            <Route path="/faculty/students" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyStudents /></ProtectedRoute>} />
            <Route path="/faculty/marks" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyUpdateMarks /></ProtectedRoute>} />
            <Route path="/faculty/attendance" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyAttendance /></ProtectedRoute>} />
            <Route path="/faculty/remarks" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyRemarks /></ProtectedRoute>} />
            <Route path="/faculty/profile" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultyProfile /></ProtectedRoute>} />
            <Route path="/faculty/subjects" element={<ProtectedRoute allowedRoles={["faculty"]}><FacultySubjects /></ProtectedRoute>} />
            <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/profile" element={<ProtectedRoute allowedRoles={["student"]}><StudentProfile /></ProtectedRoute>} />
            <Route path="/student/subjects" element={<ProtectedRoute allowedRoles={["student"]}><StudentSubjects /></ProtectedRoute>} />
            <Route path="/student/marks" element={<ProtectedRoute allowedRoles={["student"]}><StudentMarks /></ProtectedRoute>} />
            <Route path="/student/remarks" element={<ProtectedRoute allowedRoles={["student"]}><StudentRemarks /></ProtectedRoute>} />
            <Route path="/student/enroll" element={<ProtectedRoute allowedRoles={["student"]}><StudentEnrollSubjects /></ProtectedRoute>} />
            <Route path="/student/progress" element={<ProtectedRoute allowedRoles={["student"]}><StudentProgress /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
