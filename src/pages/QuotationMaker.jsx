import React from 'react';
import { QuotationProvider } from '../context/QuotationContext';
import ErrorBoundary from '../components/layout/ErrorBoundary';
import BusinessDetailsForm from '../components/business/BusinessDetailsForm';
import CustomerDetailsForm from '../components/customer/CustomerDetailsForm';
import ItemsTable from '../components/quotation/ItemsTable';
import ComponentBrowser from '../components/quotation/ComponentBrowser';
import QuotationSummary from '../components/quotation/QuotationSummary';
import SavedQuotations from '../components/quotation/SavedQuotations';
import QuotationView from '../components/quotation/QuotationView';
import PrintMode from '../components/quotation/PrintMode';
import { useQuotation } from '../context/QuotationContext';

// Main content component (separated from wrapper to use context)
const QuotationMakerContent = () => {
  const { printMode } = useQuotation();

  if (printMode) {
    return <PrintMode />;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">EmpressPC Quotation Maker</h1>
        <p className="text-gray-300">Create professional quotations with ease</p>
      </div>
      
      {/* Saved Quotations */}
      <SavedQuotations />
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Details */}
          {/* <BusinessDetailsForm /> */}

          {/* Customer Details */}
          <CustomerDetailsForm />

          {/* Items Selection */}
          <ItemsTable />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Component Browser */}
          <ComponentBrowser />

          {/* Quote Summary */}
          <QuotationSummary />
        </div>
      </div>
      
      {/* Global Styles */}
      <style jsx global>{`
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

        .bg-gray-750 {
          background-color: #374151;
        }

        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }

        /* Custom scrollbar for component browser */
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

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Hover effects */
        .hover\\:shadow-lg:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        /* Focus states */
        input:focus,
        select:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

// Wrapper component that provides context
const QuotationMaker = () => {
  return (
    <ErrorBoundary>
      <QuotationProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-200">
          <QuotationMakerContent />
        </div>
      </QuotationProvider>
    </ErrorBoundary>
  );
};

export default QuotationMaker;