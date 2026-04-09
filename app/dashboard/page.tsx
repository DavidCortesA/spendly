import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { DashboardGrid } from "@/components/organisms/DashboardGrid";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <DashboardGrid />
    </DashboardLayout>
  );
}
