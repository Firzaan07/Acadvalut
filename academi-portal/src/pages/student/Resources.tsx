import DashboardLayout from "@/components/DashboardLayout";
import { Folder } from "lucide-react";

const StudentResources = () => {
  return (
    <DashboardLayout title="Learning Resources" role="Student">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <Folder className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Course Resources</h2>
        <p className="text-muted-foreground max-w-md mt-2">
          Access shared documents, notes, and study materials provided by your faculty.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default StudentResources;
