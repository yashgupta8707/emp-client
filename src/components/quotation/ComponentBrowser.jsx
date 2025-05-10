import React from 'react';
import { Grid, ChevronDown, ChevronRight } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { componentDatabase, categoryIcons } from '../../data/componentDatabase';
import { formatCurrency } from '../../utils/formatters';
import * as lucideIcons from 'lucide-react';

const ComponentBrowser = () => {
  const { expandedCategories, toggleCategory } = useQuotation();

  // Dynamically get icons from lucide
  const getIcon = (iconName, size = 16) => {
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
        <Grid size={20} />
        Component Browser
      </h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {Object.entries(componentDatabase).map(([category, components]) => (
          <div key={category} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category)}
              className="w-full px-4 py-2 bg-gray-700 text-white flex items-center justify-between hover:bg-gray-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                {getIcon(categoryIcons[category])}
                {category}
              </span>
              {expandedCategories.has(category) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            {expandedCategories.has(category) && (
              <div className="p-2 bg-gray-750">
                {components.map((comp, index) => (
                  <div key={index} className="flex justify-between items-center py-1 px-2 text-sm hover:bg-gray-600 rounded">
                    <span className="text-gray-200">{comp.name}</span>
                    <span className="text-green-400">{formatCurrency(comp.price)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .bg-gray-750 {
          background-color: #374151;
        }
        
        .max-h-96::-webkit-scrollbar {
          width: 6px;
        }

        .max-h-96::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 3px;
        }

        .max-h-96::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 3px;
        }

        .max-h-96::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </div>
  );
};

export default ComponentBrowser;