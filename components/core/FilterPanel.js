"use client";
import { useState, useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";
import styles from "./AdminView.module.css";

export default function FilterPanel({ 
  adminConfig, 
  filters, 
  onFilterChange, 
  onReset,
  className = ""
}) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  if (!adminConfig) {
    return null;
  }

  const { admin, model } = adminConfig;
  const listFilter = admin.list_filter || [];

  if (listFilter.length === 0) {
    return null;
  }

  const handleFilterChange = async (filterName, value) => {
    const newFilters = {
      ...localFilters,
      [filterName]: value
    };
    setLocalFilters(newFilters);
    
    if (onFilterChange) {
      try {
        setLoading(true);
        await onFilterChange(newFilters);
      } catch (error) {
        console.error('Filter change error:', error);
        // Error will be handled by parent ErrorBoundary
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = async () => {
    setLocalFilters({});
    if (onReset) {
      try {
        setLoading(true);
        await onReset();
      } catch (error) {
        console.error('Filter reset error:', error);
        // Error will be handled by parent ErrorBoundary
      } finally {
        setLoading(false);
      }
    }
  };

  const getFilterInput = (field) => {
    const fieldName = field.name;
    const currentValue = localFilters[fieldName] || '';

    const baseInputClass = `${styles.filterInput} ${
      loading ? 'opacity-50 cursor-not-allowed' : ''
    }`;

    switch (field.type) {
      case 'BooleanField':
        return (
          <select
            value={currentValue}
            onChange={(e) => handleFilterChange(fieldName, e.target.value)}
            disabled={loading}
            className={baseInputClass}
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        );

      case 'CharField':
        if (field.choices && field.choices.length > 0) {
          return (
            <select
              value={currentValue}
              onChange={(e) => handleFilterChange(fieldName, e.target.value)}
              disabled={loading}
              className={baseInputClass}
            >
              <option value="">All</option>
              {field.choices.map(choice => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          );
        }
        return (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => handleFilterChange(fieldName, e.target.value)}
            placeholder={`Filter by ${field.verbose_name}`}
            disabled={loading}
            className={baseInputClass}
          />
        );

      case 'DateField':
      case 'CustomDateField':
        return (
          <input
            type="date"
            value={currentValue}
            onChange={(e) => handleFilterChange(fieldName, e.target.value)}
            disabled={loading}
            className={baseInputClass}
          />
        );

      case 'DateTimeField':
        return (
          <input
            type="datetime-local"
            value={currentValue}
            onChange={(e) => handleFilterChange(fieldName, e.target.value)}
            disabled={loading}
            className={baseInputClass}
          />
        );

      case 'IntegerField':
      case 'BigAutoField':
        return (
          <input
            type="number"
            value={currentValue}
            onChange={(e) => handleFilterChange(fieldName, e.target.value)}
            placeholder={`Filter by ${field.verbose_name}`}
            disabled={loading}
            className={baseInputClass}
          />
        );

      case 'ForeignKey':
        return (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => handleFilterChange(fieldName, e.target.value)}
            placeholder={`Filter by ${field.verbose_name}`}
            disabled={loading}
            className={baseInputClass}
          />
        );

      default:
        return (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => handleFilterChange(fieldName, e.target.value)}
            placeholder={`Filter by ${field.verbose_name}`}
            disabled={loading}
            className={baseInputClass}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className={`${styles.filterCard} ${className}`}>
        <div className={styles.filterHeader}>
          <div className="flex justify-between items-center">
            <h3>Filters</h3>
            <button
              onClick={handleReset}
              disabled={loading}
              className={styles.resetButton}
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  Loading...
                </div>
              ) : (
                'Reset All'
              )}
            </button>
          </div>
        </div>
        
        <div className={styles.filterContent}>
          {listFilter.map(filterName => {
            const field = model.fields.find(f => f.name === filterName);
            if (!field) return null;

            return (
              <div key={filterName} className={styles.filterItem}>
                <label className={styles.filterLabel}>
                  {field.verbose_name}
                </label>
                {getFilterInput(field)}
              </div>
            );
          })}
        </div>
      </div>
    </ErrorBoundary>
  );
}
