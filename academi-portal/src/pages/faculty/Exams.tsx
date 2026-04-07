import DashboardLayout from "@/components/DashboardLayout";
import { GraduationCap } from "lucide-react";

const FacultyExams = () => {
  return (
    <DashboardLayout title="Examination Management" role="Faculty">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Exams Module</h2>
        <p className="text-muted-foreground max-w-md mt-2">
          This module is currently being updated. Check back soon for schedule management and result entry features.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default FacultyExams;
