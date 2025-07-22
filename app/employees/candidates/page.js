"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import AdminView from "@/components/core/AdminView";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import ErrorBoundary from "@/components/core/ErrorBoundary";

export default function CandidatesPage() {
  const router = useRouter();

  const handleRowClick = (candidate) => {
    // Navigate to candidate detail page or open modal
    console.log("Candidate clicked:", candidate);
    // router.push(`/employees/candidates/${candidate.id}`);
  };

  const handleAddClick = () => {
    // Navigate to add candidate page
    router.push('/employees/candidates/create');
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="Loading candidates..." />}>
        <AdminView
          appName="candidates"
          modelName="candidate"
          onRowClick={handleRowClick}
          onAddClick={handleAddClick}
          showAddButton={false} // Disabled as requested
          className="min-h-screen"
        />
      </Suspense>
    </ErrorBoundary>
  );
} 