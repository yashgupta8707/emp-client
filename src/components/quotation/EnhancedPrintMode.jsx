import React, { useEffect, useRef } from 'react';
import { useQuotation } from '../../context/QuotationContext';
import { formatCurrency, numberToWords } from '../../utils/formatters';
import { generateEstimateNumber } from '../../utils/generators';
import * as lucideIcons from 'lucide-react';
import { categoryIcons } from '../../data/componentDatabase';
import Watermark from '../ui/Watermark';
import DownloadButton from '../ui/DownloadButton';
import { autoScaleToFitPage } from '../../utils/pdf-utils';

// Replace with your logo URL or import
const LOGO_URL = '/logo.png'; // If you have a public logo file
const COMPANY_COLOR = '#1e3a8a'; // Dark blue color - change to match your brand color

const EnhancedQuotationPDF = () => {
  const { 
    businessDetails, 
    customerDetails, 
    selectedItems, 
    totals, 
    setPrintMode 
  } = useQuotation();
  
  const contentRef = useRef(null);

  // Auto-scale content to fit one page if needed
  useEffect(() => {
    // Allow content to render first
    const timeoutId = setTimeout(() => {
      if (contentRef.current) {
        autoScaleToFitPage(0.95);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  // Dynamically get icons from lucide
  const getIcon = (iconName, size = 14) => {
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? <IconComponent size={size} className="text-blue-800" /> : null;
  };

  // Early return if no items
  if (selectedItems.length === 0 || !selectedItems.some(item => item.component)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
        <div className="text-2xl text-gray-700 mb-4">No items in quotation</div>
        <DownloadButton 
          variant="secondary" 
          label="Back to Editor" 
          icon="download" 
          onClick={() => setPrintMode(false)}
        />
      </div>
    );
  }

  // Generate estimate number once
  const estimateNumber = generateEstimateNumber();
  const currentDate = new Date().toLocaleDateString('en-IN');

  // Filter valid items
  const validItems = selectedItems.filter(item => item.component);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center" ref={contentRef}>
      {/* Buttons for actions - hidden in print */}
      

      {/* A4 size container with aspect ratio */}
      <div className="w-full max-w-[210mm] min-h-[297mm] relative bg-white my-8 shadow-lg print:shadow-none print:my-0">
        {/* Watermark - visible in print but subtle */}
        <Watermark text="EMPRESS PC" opacity={0.04} color={COMPANY_COLOR} />

        {/* Document container with better print layout */}
        <div className="p-8 relative">
          {/* Header bar */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-blue-800 print:block"></div>

          {/* Header with company info and quotation number */}
          <div className="flex justify-between items-start mt-6 mb-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-blue-800">{businessDetails.companyName}</h2>
              <div className="text-xs text-gray-600 mt-1">
                <p>{businessDetails.address}</p>
                <p>Phone: {businessDetails.phone} | Email: {businessDetails.email}</p>
                <p>GSTIN: {businessDetails.gstin} | State: {businessDetails.state}</p>
              </div>
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold text-white bg-blue-800 px-4 py-1">QUOTATION</h1>
              <div className="mt-1">
                <p className="text-sm"><span className="text-gray-600 font-medium">No:</span> <span className="font-semibold">{estimateNumber}</span></p>
                <p className="text-sm"><span className="text-gray-600 font-medium">Date:</span> <span className="font-semibold">{currentDate}</span></p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="border border-gray-300 rounded p-3 mb-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-sm text-blue-800 mb-1">Bill To:</p>
                <p className="font-semibold text-sm">{customerDetails.name}</p>
                <p className="text-xs text-black-600">{customerDetails.address}</p>
              </div>
              <div className="text-right">
                <p className="text-xs"><span className="text-gray-600">Contact:</span> <span className="font-semibold">{customerDetails.phone}</span></p>
                <p className="text-xs"><span className="text-gray-600">State:</span> <span className="font-semibold">{customerDetails.state}</span></p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-1.5 text-left border border-blue-700">#</th>
                  <th className="p-1.5 text-left border border-blue-700">Item Description</th>
                  <th className="p-1.5 text-center border border-blue-700">HSN</th>
                  <th className="p-1.5 text-center border border-blue-700">Qty</th>
                  <th className="p-1.5 text-left border border-blue-700">Warranty</th>
                  {/* <th className="p-1.5 text-right border border-blue-700">Rate</th>
                  <th className="p-1.5 text-right border border-blue-700">GST</th> */}
                  <th className="p-1.5 text-right border border-blue-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {validItems.map((item, index) => {
                  const price = item.isCustomPrice ? item.customPrice : item.basePrice;
                  const itemTotal = price * item.quantity;
                  const gstAmount = (itemTotal * item.gst) / 100;
                  const finalAmount = itemTotal + gstAmount;
                  
                  return (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                      <td className="p-1.5 border border-gray-200 text-center">{index + 1}</td>
                      <td className="p-1.5 border border-gray-200">
                        <div className="flex items-center gap-1">
                          <span className="text-blue-800">{getIcon(categoryIcons[item.category], 12)}</span>
                          <span>{item.component}</span>
                        </div>
                      </td>
                      <td className="p-1.5 border border-gray-200 text-center text-black">{item.hsn}</td>
                      <td className="p-1.5 border border-gray-200 text-center text-black">{item.quantity}</td>
                      <td className="p-1.5 border border-gray-200 text-xs text-black">{item.warranty || 'No warranty'}</td>
                      {/* <td className="p-1.5 border border-gray-200 text-right">{formatCurrency(price)}</td> */}
                      {/* <td className="p-1.5 border border-gray-200 text-right">{item.gst}%</td> */}
                      <td className="p-1.5 border border-gray-200 text-right font-semibold text-black">{formatCurrency(finalAmount)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom section with 3 columns */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            {/* Column 1: Terms and Bank Details */}
            <div className="col-span-1">
              <div className="border border-gray-300 rounded p-2 bg-gray-50 mb-2">
                <h3 className="font-bold text-xs text-blue-800 mb-1 border-b border-gray-200 pb-1">Payment Terms</h3>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  <li>• Quote is valid for 7 days only</li>
                  <li>• Payment due within 30 days</li>
                  <li>• Late payment charges may apply</li>
                </ul>
              </div>
              
              <div className="border border-gray-300 rounded p-2 bg-gray-50">
                <h3 className="font-bold text-xs text-blue-800 mb-1 border-b border-gray-200 pb-1">Bank Details</h3>
                <div className="text-xs text-gray-600">
                  <p><span className="font-medium">Bank:</span> KOTAK MAHINDRA BANK LIMITED</p>
                  <p><span className="font-medium">Account:</span> 8707304202</p>
                  <p><span className="font-medium">IFSC:</span> KKBK0005194</p>
                  <p><span className="font-medium">A/C Holder:</span> DIGINEXT PRO SOLUTIONS PVT LTD</p>
                </div>
              </div>
            </div>
            
            {/* Column 2: HSN Summary */}
            <div className="col-span-1">
              <div className="border border-gray-300 rounded p-2 bg-gray-50 h-full">
                <h3 className="font-bold text-xs text-blue-800 mb-1 border-b border-gray-200 pb-1">HSN Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="p-1 text-left">HSN</th>
                        <th className="p-1 text-right">Taxable</th>
                        <th className="p-1 text-right">GST</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(totals.hsnTotals).map(([hsn, data]) => (
                        <tr key={hsn} className="border-b border-gray-200">
                          <td className="p-1">{hsn}</td>
                          <td className="p-1 text-right">{formatCurrency(data.taxableAmount)}</td>
                          <td className="p-1 text-right">{formatCurrency(data.totalTax)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Column 3: Amount Details and Signature */}
            <div className="col-span-1">
              <div className="border border-gray-300 rounded p-2 bg-gray-50">
                <h3 className="font-bold text-xs text-blue-800 mb-1 border-b border-gray-200 pb-1">Amount Details</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">CGST:</span>
                    <span className="font-semibold">{formatCurrency(totals.totalGst / 2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">SGST:</span>
                    <span className="font-semibold">{formatCurrency(totals.totalGst / 2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-1 mt-1">
                    <div className="flex justify-between text-sm font-bold text-blue-800">
                      <span>Total:</span>
                      <span>{formatCurrency(totals.grandTotal)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-xs">
                  <p className="text-gray-600 font-semibold">Amount in Words:</p>
                  <p className="text-gray-800 italic">{numberToWords(totals.grandTotal)}</p>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-300">
                  <p className="text-xs text-gray-600 text-right">For {businessDetails.companyName}</p>
                  <div className="h-8"></div>
                  <p className="text-xs text-right">Authorized Signatory</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
            background-color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          .print\\:my-0 {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedQuotationPDF;