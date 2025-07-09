"use client";
import { useState, useEffect } from "react";

const MultiSelect = ({ 
  options = [], 
  selectedValues = [], 
  onSelectionChange, 
  placeholder = "Seleccione usuarios...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.multiselect-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleOption = (optionId) => {
    const newSelection = selectedValues.includes(optionId)
      ? selectedValues.filter(id => id !== optionId)
      : [...selectedValues, optionId];
    onSelectionChange(newSelection);
  };

  const handleRemoveOption = (optionId) => {
    const newSelection = selectedValues.filter(id => id !== optionId);
    onSelectionChange(newSelection);
  };

  const getSelectedLabels = () => {
    return selectedValues.map(id => {
      const option = options.find(opt => opt.id === id);
      return option ? option.username : '';
    }).filter(label => label);
  };

  return (
    <div className={`relative multiselect-container ${className}`}>
      <div 
        className="w-full px-3 py-2 border border-gray-300 rounded cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 min-h-[20px]">
          {selectedValues.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            getSelectedLabels().map((label, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(selectedValues[index]);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {options.map(option => (
            <div
              key={option.id}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedValues.includes(option.id) ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleToggleOption(option.id)}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.id)}
                  onChange={() => {}} // Manejado por onClick del div
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>{option.username}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect; 