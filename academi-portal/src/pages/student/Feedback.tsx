import DashboardLayout from "@/components/DashboardLayout";
import { MessageSquare } from "lucide-react";

const StudentFeedback = () => {
  return (
    <DashboardLayout title="My Feedback" role="Student">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <MessageSquare className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Feedback Portal</h2>
        <p className="text-muted-foreground max-w-md mt-2">
          Provide feedback on your courses and view academic responses.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default StudentFeedback;
