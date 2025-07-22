"use client";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorBoundary from "./ErrorBoundary";
import styles from "./AdminView.module.css";

export default function PagedTable({ 
  adminConfig,
  data = [],
  loading = false,
  pagination = {},
  onPageChange,
  onRowClick = null,
  onSort = null,
  currentSort = {},
  className = ""
}) {
  const [sortConfig, setSortConfig] = useState(currentSort);
  const [sortLoading, setSortLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setSortConfig(currentSort);
  }, [currentSort]);

  const handleSort = async (fieldName) => {
    let direction = 'asc';
    if (sortConfig.field === fieldName && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    const newSort = { field: fieldName, direction };
    setSortConfig(newSort);
    
    if (onSort) {
      try {
        setSortLoading(true);
        await onSort(newSort);
      } catch (error) {
        console.error('Sort error:', error);
        // Error will be handled by parent ErrorBoundary
      } finally {
        setSortLoading(false);
      }
    }
  };

  const handleRowClick = (item) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  const handlePageChange = async (page) => {
    if (onPageChange) {
      try {
        setPageLoading(true);
        await onPageChange(page);
      } catch (error) {
        console.error('Page change error:', error);
        // Error will be handled by parent ErrorBoundary
      } finally {
        setPageLoading(false);
      }
    }
  };

  // Get display value for a field
  const getDisplayValue = (item, fieldName) => {
    if (!adminConfig) return '';
    
    const field = adminConfig.fields.find(f => f.name === fieldName);
    const value = item[fieldName];

    if (value === null || value === undefined) {
      return '-';
    }

    // Handle different field types
    switch (field?.type) {
      case 'BooleanField':
        return value ? '✓' : '✗';
      case 'DateTimeField':
        return new Date(value).toLocaleString();
      case 'CustomDateField':
      case 'DateField':
        return new Date(value).toLocaleDateString();
      case 'CharField':
        if (field.choices && field.choices.length > 0) {
          const choice = field.choices.find(c => c.value === value);
          return choice ? choice.label : value;
        }
        return value;
      case 'ForeignKey':
        // For foreign keys, typically we'd show a string representation
        return typeof value === 'object' ? (value.name || value.username || value.title || value.id) : value;
      case 'EmailField':
        return value;
      default:
        return value;
    }
  };

  // Get column header
  const getColumnHeader = (fieldName) => {
    if (!adminConfig) return fieldName;
    
    const field = adminConfig.fields.find(f => f.name === fieldName);
    return field ? field.verbose_name : fieldName;
  };

  // Check if field is sortable
  const isFieldSortable = (fieldName) => {
    if (!adminConfig) return false;
    
    const field = adminConfig.fields.find(f => f.name === fieldName);
    // Most fields are sortable except for certain types
    return field && !['OneToOneRel', 'ManyToManyField'].includes(field.type);
  };

  // Get sort indicator
  const getSortIndicator = (fieldName) => {
    if (sortConfig.field === fieldName) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  if (!adminConfig) {
    return <LoadingSpinner message="Loading table configuration..." />;
  }

  const listDisplay = adminConfig.fields.map(field => field.name) || [];
  const isTableLoading = loading || sortLoading || pageLoading;

  return (
    <ErrorBoundary>
      <div className={`${styles.tableContainer} ${className}`}>
        {/* Table with Horizontal Scroll */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {listDisplay.map(fieldName => (
                  <th 
                    key={fieldName} 
                    className={`${
                      isFieldSortable(fieldName) && !isTableLoading 
                        ? 'cursor-pointer' 
                        : isTableLoading 
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                    }`}
                    onClick={() => isFieldSortable(fieldName) && !isTableLoading && handleSort(fieldName)}
                  >
                    <div className="flex items-center gap-1">
                      {getColumnHeader(fieldName)}
                      {getSortIndicator(fieldName)}
                      {sortLoading && sortConfig.field === fieldName && (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isTableLoading ? (
                <tr>
                  <td colSpan={listDisplay.length} className="text-center py-8">
                    <div className="flex justify-center items-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#335dab]"></div>
                      <span className="text-gray-500">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={listDisplay.length} className={`${styles.emptyState} text-center py-8`}>
                    No data available
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`${
                      onRowClick && !isTableLoading ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => !isTableLoading && handleRowClick(item)}
                  >
                    {listDisplay.map(fieldName => (
                      <td key={fieldName}>
                        {getDisplayValue(item, fieldName)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.paginationContainer}>
          <div className={styles.paginationInfo}>
            Showing {data.length} of {pagination.count || 0} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={!pagination.previous || isTableLoading}
              className={styles.paginationButton}
            >
              {pageLoading && pagination.current_page > 1 ? (
                <div className="flex items-center gap-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[#335dab]"></div>
                  Loading...
                </div>
              ) : (
                'Previous'
              )}
            </button>
            <span className={styles.paginationInfo}>
              Page {pagination.current_page || 1} of {pagination.total_pages || 1}
            </span>
            <button
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={!pagination.next || isTableLoading}
              className={styles.paginationButton}
            >
              {pageLoading && pagination.current_page < pagination.total_pages ? (
                <div className="flex items-center gap-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[#335dab]"></div>
                  Loading...
                </div>
              ) : (
                'Next'
              )}
            </button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
