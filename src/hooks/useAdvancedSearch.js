import { useState, useEffect, useMemo } from 'react';
import { useDebouncedSearch } from '../lib/performanceOptimizer';

export const useAdvancedSearch = (data, searchFields = [], options = {}) => {
  const {
    debounceDelay = 300,
    caseSensitive = false,
    exactMatch = false,
    highlightMatches = false
  } = options;

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const debouncedSearchTerm = useDebouncedSearch(searchTerm, debounceDelay);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (debouncedSearchTerm) {
      const searchValue = caseSensitive ? debouncedSearchTerm : debouncedSearchTerm.toLowerCase();
      
      result = result.filter(item => {
        return searchFields.some(field => {
          const fieldValue = getNestedValue(item, field);
          if (!fieldValue) return false;
          
          const value = caseSensitive ? String(fieldValue) : String(fieldValue).toLowerCase();
          
          if (exactMatch) {
            return value === searchValue;
          }
          
          return value.includes(searchValue);
        });
      });
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        result = result.filter(item => {
          const itemValue = getNestedValue(item, key);
          if (Array.isArray(value)) {
            return value.includes(itemValue);
          }
          return itemValue === value;
        });
      }
    });

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = getNestedValue(a, sortBy);
        const bValue = getNestedValue(b, sortBy);
        
        let comparison = 0;
        if (aValue > bValue) comparison = 1;
        if (aValue < bValue) comparison = -1;
        
        return sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [data, debouncedSearchTerm, filters, sortBy, sortOrder, searchFields, caseSensitive, exactMatch]);

  const highlightText = (text, highlight) => {
    if (!highlight || !highlightMatches) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? `<mark key=${index}>${part}</mark>` 
        : part
    ).join('');
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setSortBy('');
    setSortOrder('asc');
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredData: filteredAndSortedData,
    highlightText,
    clearFilters,
    totalResults: filteredAndSortedData.length
  };
};

// Helper function to get nested object values
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};