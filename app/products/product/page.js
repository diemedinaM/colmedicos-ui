"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import AdminView from "@/components/core/AdminView";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import ErrorBoundary from "@/components/core/ErrorBoundary";

export default function ProductsPage() {
    const router = useRouter();

    const handleRowClick = (product) => {
        // Navigate to employee detail page or open modal
        console.log("Product clicked:", product);
        // router.push(`/employees/${employee.id}`);
    };

    const handleAddClick = () => {
        // Navigate to add employee page
        router.push('/products/products/create');
    };

    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner message="Loading employees..." />}>
                <AdminView
                    appName="products"
                    modelName="product"
                    onRowClick={handleRowClick}
                    onAddClick={handleAddClick}
                    showAddButton={false} // Disabled as requested
                    //className="min-h-screen"
                    displayFields={["id", "name", "observation"]}
                    searchFields={["name"]}
                    filters={["name"]}
                />
            </Suspense>
        </ErrorBoundary>
    );
}
