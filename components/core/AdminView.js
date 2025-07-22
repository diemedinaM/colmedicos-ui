"use client";
import { useState, Suspense } from "react";
import { useAdminData } from "./hooks/useAdminData";
import TopBar from "./TopBar";
import FilterPanel from "./FilterPanel";
import PagedTable from "./PagedTable";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";
import styles from "./AdminView.module.css";

// Helper function to check if error is a 404
function is404Error(error) {
  return error && (
    error.includes('404') || 
    error.includes('Not Found') || 
    error.includes('not found')
  );
}

// Helper function to create fallback config for 404 errors
function createFallbackConfig(modelName) {
    return {
      "name": modelName,
      "app_label": "common",
      "verbose_name": modelName.charAt(0).toUpperCase() + modelName.slice(1),
      "verbose_name_plural": modelName.charAt(0).toUpperCase() + modelName.slice(1) + 's',
      "db_table": "",
      "fields": []
  }
}

// Component to render empty admin interface for 404 errors
function EmptyAdminInterface({ modelName, onRowClick, onAddClick, showAddButton }) {
  const fallbackConfig = createFallbackConfig(modelName);

  const handleRowClick = (item) => {
    if (onRowClick) onRowClick(item);
  };

  const handleAddClick = () => {
    if (onAddClick) onAddClick();
  };

  return (
    <>
      <TopBar
        title={fallbackConfig.verbose_name_plural}
        searchFields={[]}
        searchTerm=""
        onSearch={() => {}}
        onAddClick={handleAddClick}
        addButtonLabel={`Add ${fallbackConfig.verbose_name}`}
        showAddButton={showAddButton}
      />

      <div className={styles.contentContainer}>
        <div className={styles.mainLayout}>
          <div className={styles.centerTable}>
            <PagedTable
              adminConfig={fallbackConfig}
              data={[]}
              loading={false}
              pagination={{
                count: 0,
                next: null,
                previous: null,
                current_page: 1,
                total_pages: 1,
                page_size: 50
              }}
              onPageChange={() => {}}
              onRowClick={handleRowClick}
              onSort={() => {}}
              currentSort={{}}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// Separate component for the admin data that can be suspended
function AdminContent({ 
  appName, 
  modelName, 
  initialParams = {},
  onRowClick = null,
  onAddClick = null,
  showAddButton = false,
  displayFieldsProp = [],
  searchFieldsProp = [],
  filtersProp = []
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
    // Handle 404 errors gracefully by showing empty interface
    if (is404Error(error)) {
      return (
        <EmptyAdminInterface
          modelName={modelName}
          onRowClick={onRowClick}
          onAddClick={onAddClick}
          showAddButton={showAddButton}
        />
      );
    } else {
      // For other types of errors, still throw
      throw new Error(error);
    }
  }

  if (!adminConfig) {
    return <LoadingSpinner message="Loading configuration..." />;
  }

  const hasFilters = filtersProp.length > 0;

  return (
    <>
      <TopBar
        title={adminConfig.verbose_name_plural}
        searchFields={searchFieldsProp}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onAddClick={handleAddClick}
        addButtonLabel={`Add ${adminConfig.verbose_name}`}
        showAddButton={showAddButton}
      />

      <div className={styles.contentContainer}>
        <div className={styles.mainLayout}>
          <div className={hasFilters ? styles.tableSection : styles.centerTable}>
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner message="Loading data..." />}>
                <PagedTable
                  adminConfig={adminConfig}
                  data={data}
                  displayFields={displayFieldsProp}
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

          {hasFilters && (
            <div className={styles.filterPanel}>
              <ErrorBoundary>
                <FilterPanel
                  adminConfig={adminConfig}
                  filters={filtersProp}
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
  className = "",
  displayFields = [],
  searchFields = [],
  filters = []
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
            displayFieldsProp={displayFields}
            searchFieldsProp={searchFields}
            filtersProp={filters}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
