"use client";
import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import styles from "./AdminView.module.css";

export default function TopBar({ 
  title,
  searchFields = [],
  searchTerm = "",
  onSearch,
  onAddClick,
  addButtonLabel = "Agregar",
  showAddButton = false,
  className = ""
}) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [searching, setSearching] = useState(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (onSearch) {
      try {
        setSearching(true);
        await onSearch(localSearchTerm);
      } catch (error) {
        console.error('Search error:', error);
        // Error will be handled by parent ErrorBoundary
      } finally {
        setSearching(false);
      }
    }
  };

  const handleClear = async () => {
    setLocalSearchTerm("");
    if (onSearch) {
      try {
        setSearching(true);
        await onSearch("");
      } catch (error) {
        console.error('Clear search error:', error);
        // Error will be handled by parent ErrorBoundary
      } finally {
        setSearching(false);
      }
    }
  };

  const handleAddClick = () => {
    if (onAddClick && showAddButton) {
      onAddClick();
    }
  };

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <button
            onClick={handleAddClick}
            disabled={!showAddButton}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              showAddButton
                ? "bg-[#335dab] text-white hover:bg-[#2a4d8a]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {addButtonLabel}
          </button>
        </div>

        {/* Search Bar - Smaller */}
        {searchFields.length > 0 && (
          <ErrorBoundary>
            <div className={styles.searchContainer}>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  placeholder={`Search ${searchFields.join(', ')}`}
                  disabled={searching}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#335dab] focus:border-[#335dab] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={searching}
                  className="px-6 py-2 bg-[#335dab] text-white rounded hover:bg-[#2a4d8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {searching ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Searching...
                    </div>
                  ) : (
                    'Buscar'
                  )}
                </button>
                {localSearchTerm && (
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={searching}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}
