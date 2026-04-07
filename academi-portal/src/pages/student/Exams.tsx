import DashboardLayout from "@/components/DashboardLayout";
import { GraduationCap } from "lucide-react";

const StudentExams = () => {
  return (
    <DashboardLayout title="My Examinations" role="Student">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Exams</h2>
        <p className="text-muted-foreground max-w-md mt-2">
          Your upcoming exam schedule and results will appear here.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default StudentExams;
