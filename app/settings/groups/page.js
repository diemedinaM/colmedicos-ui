"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import AdminView from "@/components/core/AdminView";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import ErrorBoundary from "@/components/core/ErrorBoundary";

const AppName = "common";
const ModelName = "group";

export default function GroupsPage() {
  const router = useRouter();

  const handleRowClick = (item) => {
    // Navigate to employee detail page or open modal
    console.log("Group clicked:", item);
    // router.push(`/employees/${employee.id}`);
  };

  const handleAddClick = () => {
    // Navigate to add employee page
    router.push('/settings/groups/create');
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="Loading groups..." />}>
        <AdminView
          appName={AppName}
          modelName={ModelName}
          onRowClick={handleRowClick}
          onAddClick={handleAddClick}
          showAddButton={false} // Disabled as requested
          className="min-h-screen"
        />
      </Suspense>
    </ErrorBoundary>
  );
}
