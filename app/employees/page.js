"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import AdminView from "@/components/core/AdminView";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import ErrorBoundary from "@/components/core/ErrorBoundary";

export default function EmployeesPage() {
  const router = useRouter();

  const handleRowClick = (employee) => {
    // Navigate to employee detail page or open modal
    console.log("Employee clicked:", employee);
    // router.push(`/employees/${employee.id}`);
  };

  const handleAddClick = () => {
    // Navigate to add employee page
    router.push('/employees/create');
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="Loading employees..." />}>
        <AdminView
          appName="employees"
          modelName="employee"
          onRowClick={handleRowClick}
          onAddClick={handleAddClick}
          showAddButton={false} // Disabled as requested
          className="min-h-screen"
        />
      </Suspense>
    </ErrorBoundary>
  );
}
