import React from 'react';
import { Save, Printer } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { formatCurrency } from '../../utils/formatters';

const QuotationSummary = () => {
  const { totals, saveQuotation, setPrintMode } = useQuotation();

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Quote Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal:</span>
            <span className="text-white">{formatCurrency(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Total GST (18%):</span>
            <span className="text-white">{formatCurrency(totals.totalGst)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Total Profit (before GST):</span>
            <span className="text-green-400">{formatCurrency(totals.totalProfit)}</span>
          </div>
          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-between text-xl font-bold">
              <span className="text-white">Total Amount:</span>
              <span className="text-green-400">{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={saveQuotation}
          className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
        >
          <Save size={20} /> Save Quotation
        </button>
        <button
          onClick={() => setPrintMode(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Printer size={20} /> Generate PDF
        </button>
      </div>
    </div>
  );
};

export default QuotationSummary;