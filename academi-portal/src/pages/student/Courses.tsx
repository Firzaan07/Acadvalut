import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen } from "lucide-react";

const StudentCourses = () => {
  return (
    <DashboardLayout title="My Courses" role="Student">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <BookOpen className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Registered Courses</h2>
        <p className="text-muted-foreground max-w-md mt-2">
          Find all your enrolled subjects and course materials here.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default StudentCourses;
