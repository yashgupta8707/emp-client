import React, { useEffect, useRef } from 'react';
import { Download, ArrowLeft, FileText } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import EnhancedPrintMode from './EnhancedPrintMode';
import { printAsPdf, autoScaleToFitPage } from '../../utils/pdf-utils';

const PrintMode = () => {
  const { setPrintMode } = useQuotation();
  const contentRef = useRef(null);

  // Auto-scale content to fit one page if needed
  useEffect(() => {
    // Allow content to render first
    const timeoutId = setTimeout(() => {
      if (contentRef.current) {
        autoScaleToFitPage(0.9);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen" ref={contentRef}>
      {/* Header (non-printable) */}
      <div className="no-print fixed top-0 left-0 right-0 bg-gray-800 text-white z-10 shadow-lg">
        <div className="container mx-auto flex justify-between py-3 px-4">
          <button
            onClick={() => setPrintMode(false)}
            className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back to Editor
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FileText size={20} /> Preview
            </button>
            <button
              onClick={printAsPdf}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download size={20} /> Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16 no-print"></div>
      
      {/* Enhanced Quotation Content */}
      <EnhancedPrintMode />
      
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            background: white !important;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintMode;