import React from 'react';
import { Download } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import QuotationView from './QuotationView';

const PrintMode = () => {
  const { setPrintMode } = useQuotation();

  return (
    <div className="bg-white min-h-screen">
      <div className="no-print mb-4 p-4 bg-gray-800 text-white">
        <div className="container mx-auto flex gap-4">
          <button
            onClick={() => setPrintMode(false)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Editor
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Download size={20} /> Download PDF
          </button>
        </div>
      </div>
      <QuotationView />
      
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            size: A4;
            margin: 10mm;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintMode;