import React from 'react';
import { Save } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { formatCurrency } from '../../utils/formatters';

const SavedQuotations = () => {
  const { savedQuotations, searchQuery, setSearchQuery, loadQuotation } = useQuotation();

  if (savedQuotations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Save size={20} />
          Saved Quotations
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search quotations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {savedQuotations
          .filter(quotation => 
            quotation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quotation.customerDetails.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((quotation, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-white">{quotation.id}</p>
                <p className="text-sm text-gray-300">
                  {quotation.customerDetails.name}
                </p>
                <p className="text-sm text-green-400">
                  {formatCurrency(quotation.totals.grandTotal)}
                </p>
              </div>
              <button
                onClick={() => loadQuotation(quotation)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Load
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedQuotations;