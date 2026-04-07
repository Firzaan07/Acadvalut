import DashboardLayout from "@/components/DashboardLayout";
import { Calendar } from "lucide-react";

const StudentAttendance = () => {
  return (
    <DashboardLayout title="My Attendance" role="Student">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <Calendar className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Attendance Record</h2>
        <p className="text-muted-foreground max-w-md mt-2">
          Your daily attendance logs for each subject will be tracked here.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default StudentAttendance;
