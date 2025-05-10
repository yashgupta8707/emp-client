import React from 'react';
import { useQuotation } from '../../context/QuotationContext';
import { formatCurrency, numberToWords } from '../../utils/formatters';
import { generateEstimateNumber } from '../../utils/generators';
import { categoryIcons } from '../../data/componentDatabase';
import * as lucideIcons from 'lucide-react';

const QuotationView = () => {
  const { businessDetails, customerDetails, selectedItems, totals, setPrintMode } = useQuotation();

  // Dynamically get icons from lucide
  const getIcon = (iconName, size = 16) => {
    const IconComponent = lucideIcons[iconName];
    return IconComponent ? <IconComponent size={size} /> : null;
  };

  // Early return if no items
  if (selectedItems.length === 0 || !selectedItems.some(item => item.component)) {
    return <div className="text-center p-8">Please add items to the quotation</div>;
  }

  return (
    <div className="quotation-view p-8 max-w-9xl mx-auto text-black shadow-lg rounded-lg bg-white print:shadow-none">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-blue-900">{businessDetails.companyName}</h2>
          <div className="text-sm text-gray-600 mt-2">
            <p>{businessDetails.address}</p>
            <p>Phone: {businessDetails.phone} | Email: {businessDetails.email}</p>
            <p>GSTIN: {businessDetails.gstin} | State: {businessDetails.state}</p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-blue-900">ESTIMATE</h1>
          <div className="mt-2 space-y-1">
            <p><span className="text-gray-600">No:</span> <span className="font-semibold">{generateEstimateNumber()}</span></p>
            <p><span className="text-gray-600">Date:</span> <span className="font-semibold">{new Date().toLocaleDateString('en-IN')}</span></p>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="border rounded-lg p-4 mb-8 bg-gray-50">
        <h3 className="font-bold text-blue-900 mb-2">Bill To:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">{customerDetails.name}</p>
            <p className="text-sm text-gray-600">{customerDetails.address}</p>
          </div>
          <div className="text-right">
            <p><span className="text-gray-600">Contact:</span> <span className="font-semibold">{customerDetails.phone}</span></p>
            <p><span className="text-gray-600">State:</span> <span className="font-semibold">{customerDetails.state}</span></p>
          </div>
        </div>
      </div>

      {/* Items Table - Modern Design */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Item Description</th>
              <th className="p-3 text-center">HSN/SAC</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-left">Warranty</th>
              <th className="p-3 text-right">Rate</th>
              <th className="p-3 text-right">GST</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems
              .filter(item => item.component)
              .map((item, index) => {
                const price = item.isCustomPrice ? item.customPrice : item.basePrice;
                const itemTotal = price * item.quantity;
                const gstAmount = (itemTotal * item.gst) / 100;
                const finalAmount = itemTotal + gstAmount;
                
                return (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 border-b border-gray-200">{index + 1}</td>
                    <td className="p-3 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        {getIcon(categoryIcons[item.category])}
                        <span>{item.component}</span>
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-200 text-center">{item.hsn}</td>
                    <td className="p-3 border-b border-gray-200 text-center">{item.quantity}</td>
                    <td className="p-3 border-b border-gray-200">{item.warranty || 'No warranty'}</td>
                    <td className="p-3 border-b border-gray-200 text-right">{formatCurrency(price)}</td>
                    <td className="p-3 border-b border-gray-200 text-right">{item.gst}%</td>
                    <td className="p-3 border-b border-gray-200 text-right font-semibold">{formatCurrency(finalAmount)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Customer Notice */}
      {totals.totalProfit > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-blue-900 font-medium">
            Thank you for your business! This quotation includes a profit margin of {formatCurrency(totals.totalProfit)} (before GST).
          </p>
        </div>
      )}

      {/* Totals Section */}
      <div className="flex justify-between items-start mb-8">
        <div className="w-1/2">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold text-blue-900 mb-2">Payment Terms</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Quote is valid for 7 days only</li>
              <li>• Payment due within 30 days of invoice date</li>
              <li>• Late payment charges may apply</li>
            </ul>
          </div>
        </div>
        
        <div className="w-1/2 pl-8">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold">{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total GST:</span>
              <span className="font-semibold">{formatCurrency(totals.totalGst)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2">
              <div className="flex justify-between text-lg font-bold text-blue-900">
                <span>Total Amount:</span>
                <span>{formatCurrency(totals.grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amount in Words */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm font-semibold text-blue-900">Amount in Words:</p>
        <p className="text-sm">{numberToWords(totals.grandTotal)}</p>
      </div>

      {/* HSN Summary Table */}
      <div className="mb-8">
        <h3 className="font-bold text-blue-900 mb-3">HSN/SAC Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-2">HSN/SAC</th>
                <th className="p-2">Taxable Amount</th>
                <th className="p-2" colSpan="2">CGST</th>
                <th className="p-2" colSpan="2">SGST</th>
                <th className="p-2">Total Tax</th>
              </tr>
              <tr className="bg-blue-800 text-white">
                <th className="p-2"></th>
                <th className="p-2"></th>
                <th className="p-2">Rate</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Rate</th>
                <th className="p-2">Amount</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(totals.hsnTotals).map(([hsn, data]) => (
                <tr key={hsn} className="border-b border-gray-200">
                  <td className="p-2">{hsn}</td>
                  <td className="p-2 text-right">{formatCurrency(data.taxableAmount)}</td>
                  <td className="p-2 text-center">9%</td>
                  <td className="p-2 text-right">{formatCurrency(data.cgst)}</td>
                  <td className="p-2 text-center">9%</td>
                  <td className="p-2 text-right">{formatCurrency(data.sgst)}</td>
                  <td className="p-2 text-right font-semibold">{formatCurrency(data.totalTax)}</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td className="p-2">Total</td>
                <td className="p-2 text-right">{formatCurrency(totals.subtotal)}</td>
                <td className="p-2"></td>
                <td className="p-2 text-right">{formatCurrency(totals.totalGst / 2)}</td>
                <td className="p-2"></td>
                <td className="p-2 text-right">{formatCurrency(totals.totalGst / 2)}</td>
                <td className="p-2 text-right">{formatCurrency(totals.totalGst)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bank Details and Signature */}
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-bold text-blue-900 mb-2">Bank Details</h3>
          <div className="text-sm text-gray-600">
            <p><strong>Bank:</strong> KOTAK MAHINDRA BANK LIMITED</p>
            <p><strong>Account:</strong> 8707304202</p>
            <p><strong>IFSC:</strong> KKBK0005194</p>
            <p><strong>A/C Holder:</strong> DIGINEXT PRO SOLUTIONS PRIVATE LIMITED</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-gray-600">For {businessDetails.companyName}</p>
          <div className="h-16 my-2"></div>
          <p className="border-t border-gray-400 pt-2">Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
};

export default QuotationView;