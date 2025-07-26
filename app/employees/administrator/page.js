"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import AdminView from "@/components/core/AdminView";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import ErrorBoundary from "@/components/core/ErrorBoundary";

export default function AdministratorsPage() {
  const router = useRouter();

  const handleRowClick = (administrator) => {
    // Navigate to administrator detail page or open modal
    console.log("Administrator clicked:", administrator);
    // router.push(`/employees/administrators/${administrator.id}`);
  };

  const handleAddClick = () => {
    // Navigate to add administrator page
    router.push('/employees/administrators/create');
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="Loading administrators..." />}>
        <AdminView
          appName="administrators"
          modelName="administrator"
          onRowClick={handleRowClick}
          onAddClick={handleAddClick}
          showAddButton={false} // Disabled as requested
          className="min-h-screen"
        />
      </Suspense>
    </ErrorBoundary>
  );
} 