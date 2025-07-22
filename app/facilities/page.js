"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import AdminView from "@/components/core/AdminView";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import ErrorBoundary from "@/components/core/ErrorBoundary";

export default function FacilitiesPage() {
  const router = useRouter();

  const handleRowClick = (facility) => {
    // Navigate to employee detail page or open modal
    console.log("Facility clicked:", facility);
    // router.push(`/employees/${employee.id}`);
  };

  const handleAddClick = () => {
    // Navigate to add employee page
    router.push('/facilities/create');
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="Loading facilities..." />}>
        <AdminView
          appName="facilities"
          modelName="facility"
          onRowClick={handleRowClick}
          onAddClick={handleAddClick}
          showAddButton={false} // Disabled as requested
          className="min-h-screen"
        />
      </Suspense>
    </ErrorBoundary>
  );
}
