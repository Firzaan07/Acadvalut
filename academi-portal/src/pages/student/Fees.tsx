import DashboardLayout from "@/components/DashboardLayout";
import { CreditCard } from "lucide-react";

const StudentFees = () => {
  return (
    <DashboardLayout title="Fee Payment" role="Student">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <CreditCard className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Fees & Payments</h2>
        <p className="text-muted-foreground max-w-md mt-2">
          View your current fee status and payment history.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default StudentFees;
