import { useState, useEffect, useCallback, useMemo } from "react";
import { adminService } from "@/services/core/adminService";

export function useAdminData(appName, modelName, initialParams = {}) {
  const [adminConfig, setAdminConfig] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(50);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    current_page: 1,
    total_pages: 1
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({});

  // Memoize initialParams to prevent unnecessary re-renders
  const memoizedInitialParams = useMemo(() => initialParams, [JSON.stringify(initialParams)]);

  // Load admin configuration
  const loadAdminConfig = useCallback(async () => {
    try {
      setError(null);
      const config = await adminService.getModelAdmin(appName, modelName);
      setAdminConfig(config);
      setPageSize(config.admin.list_per_page || 50);
      return config;
    } catch (err) {
      const errorMessage = `Error loading admin configuration: ${err.message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [appName, modelName]);

  // Load data with error handling and loading states
  const loadData = useCallback(async (options = {}) => {
    if (!adminConfig) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: options.page || currentPage,
        page_size: pageSize,
        ...memoizedInitialParams,
        ...filters,
        ...options.additionalParams
      };

      // Add search parameter if search term exists
      const searchValue = options.searchTerm !== undefined ? options.searchTerm : searchTerm;
      if (searchValue && searchValue.trim()) {
        params.search = searchValue.trim();
      }

      // Add ordering parameter if sort is configured
      const sortValue = options.sortConfig || sortConfig;
      if (sortValue.field) {
        params.ordering = sortValue.direction === 'desc' ? `-${sortValue.field}` : sortValue.field;
      }

      const response = await adminService.getModelData(appName, modelName, params);
      
      setData(response.results || []);
      setPagination({
        count: response.count || 0,
        next: response.next,
        previous: response.previous,
        current_page: options.page || currentPage,
        total_pages: Math.ceil((response.count || 0) / pageSize)
      });
      
      return response;
    } catch (err) {
      const errorMessage = `Error loading data: ${err.message}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [
    adminConfig,
    appName,
    modelName,
    currentPage,
    pageSize,
    memoizedInitialParams,
    filters,
    searchTerm,
    sortConfig
  ]);

  // Initialize configuration
  useEffect(() => {
    loadAdminConfig();
  }, [loadAdminConfig]);

  // Load data when config is available
  useEffect(() => {
    if (adminConfig) {
      loadData().catch(err => {
        console.error('Data loading error:', err);
      });
    }
  }, [adminConfig, loadData]);

  // Handler functions that include error handling
  const handleSearch = useCallback(async (term) => {
    try {
      setSearchTerm(term);
      setCurrentPage(1);
      await loadData({ 
        searchTerm: term, 
        page: 1 
      });
    } catch (err) {
      console.error('Search error:', err);
      // Error is already set in loadData
    }
  }, [loadData]);

  const handleFilterChange = useCallback(async (newFilters) => {
    try {
      setFilters(newFilters);
      setCurrentPage(1);
      await loadData({ 
        additionalParams: newFilters, 
        page: 1 
      });
    } catch (err) {
      console.error('Filter error:', err);
      // Error is already set in loadData
    }
  }, [loadData]);

  const handleFilterReset = useCallback(async () => {
    try {
      setFilters({});
      setCurrentPage(1);
      await loadData({ 
        additionalParams: {}, 
        page: 1 
      });
    } catch (err) {
      console.error('Filter reset error:', err);
      // Error is already set in loadData
    }
  }, [loadData]);

  const handlePageChange = useCallback(async (page) => {
    if (page >= 1 && page <= pagination.total_pages) {
      try {
        setCurrentPage(page);
        await loadData({ page });
      } catch (err) {
        console.error('Page change error:', err);
        // Error is already set in loadData
      }
    }
  }, [loadData, pagination.total_pages]);

  const handleSort = useCallback(async (sortData) => {
    try {
      setSortConfig(sortData);
      setCurrentPage(1);
      await loadData({ 
        sortConfig: sortData, 
        page: 1 
      });
    } catch (err) {
      console.error('Sort error:', err);
      // Error is already set in loadData
    }
  }, [loadData]);

  const refresh = useCallback(async () => {
    try {
      await loadData();
    } catch (err) {
      console.error('Refresh error:', err);
      // Error is already set in loadData
    }
  }, [loadData]);

  return {
    // State
    adminConfig,
    data,
    loading,
    error,
    pagination: {
      ...pagination,
      page_size: pageSize
    },
    searchTerm,
    filters,
    currentPage,
    sortConfig,

    // Actions
    handleSearch,
    handleFilterChange,
    handleFilterReset,
    handlePageChange,
    handleSort,
    refresh,

    // Raw actions (without error handling, for manual use)
    loadData,
    loadAdminConfig
  };
}
