"use client";
import { useState, Suspense } from "react";
import { useAdminData } from "./hooks/useAdminData";
import TopBar from "./TopBar";
import FilterPanel from "./FilterPanel";
import PagedTable from "./PagedTable";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";
import styles from "./AdminView.module.css";

// Separate component for the admin data that can be suspended
function AdminContent({ 
  appName, 
  modelName, 
  initialParams = {},
  onRowClick = null,
  onAddClick = null,
  showAddButton = false
}) {
  const {
    adminConfig,
    data,
    loading,
    error,
    pagination,
    searchTerm,
    filters,
    sortConfig,
    handleSearch,
    handleFilterChange,
    handleFilterReset,
    handlePageChange,
    handleSort
  } = useAdminData(appName, modelName, initialParams);

  const handleRowClick = (item) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick();
    }
  };

  if (error) {
    throw new Error(error);
  }

  if (!adminConfig) {
    return <LoadingSpinner message="Loading configuration..." />;
  }

  const { admin, model } = adminConfig;
  const searchFields = admin.search_fields || [];
  const hasFilters = admin.list_filter && admin.list_filter.length > 0;

  return (
    <>
      {/* Top Bar */}
      <TopBar
        title={model.verbose_name_plural}
        searchFields={searchFields}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onAddClick={handleAddClick}
        addButtonLabel={`Add ${model.verbose_name}`}
        showAddButton={showAddButton}
      />

      <div className={styles.contentContainer}>
        <div className={styles.mainLayout}>
          {/* Table Section - Left Side */}
          <div className={hasFilters ? styles.tableSection : styles.centerTable}>
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner message="Loading data..." />}>
                <PagedTable
                  adminConfig={adminConfig}
                  data={data}
                  loading={loading}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                  onRowClick={handleRowClick}
                  onSort={handleSort}
                  currentSort={sortConfig}
                />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Filter Panel - Right Side */}
          {hasFilters && (
            <div className={styles.filterPanel}>
              <ErrorBoundary>
                <FilterPanel
                  adminConfig={adminConfig}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleFilterReset}
                />
              </ErrorBoundary>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function AdminView({ 
  appName, 
  modelName, 
  initialParams = {},
  onRowClick = null,
  onAddClick = null,
  showAddButton = false,
  className = ""
}) {
  return (
    <div className={`${styles.adminView} ${className}`}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner message="Loading admin interface..." />}>
          <AdminContent
            appName={appName}
            modelName={modelName}
            initialParams={initialParams}
            onRowClick={onRowClick}
            onAddClick={onAddClick}
            showAddButton={showAddButton}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
