import React, { useState, useEffect } from 'react';
import { Printer, Download, Plus, Trash2, Save, Monitor, ChevronDown, ChevronRight, Building2, User, Phone, Mail, MapPin, Hash, Calendar, Package, Grid, Zap, Cpu, Keyboard, MousePointer2, Camera, Fan, Database } from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-900 text-white p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="text-red-200 mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const QuotationMaker = () => {
  // Icon components for each category
  const categoryIcons = {
    'Windows Activation': <Monitor size={16} />,
    'Office Licenses': <Grid size={16} />,
    'Power Supplies': <Zap size={16} />,
    'Accessories': <Keyboard size={16} />,
    'Monitors': <Monitor size={16} />,
    'Web Cameras': <Camera size={16} />,
    'Air Coolers': <Fan size={16} />,
    'Graphics Cards': <Cpu size={16} />,
    'Cabinets': <Package size={16} />,
    'RAM': <Cpu size={16} />,
    'Motherboards': <Cpu size={16} />,
    'Processors': <Cpu size={16} />,
    'Storage': <Database size={16} />
  };

  // Component database with prices
  const componentDatabase = {
    'Windows Activation': [
      { name: 'Windows Genuine License Activation', hsn: '9931', price: 423.73, gst: 18 },
      { name: 'Windows 11 Pro Activation', hsn: '9931', price: 500.00, gst: 18 },
    ],
    'Office Licenses': [
      { name: 'MS Office License', hsn: '9931', price: 423.73, gst: 18 },
      { name: 'MS Office 365 Personal', hsn: '9931', price: 4999.00, gst: 18 },
      { name: 'MS Office 2021 Professional', hsn: '9931', price: 29999.00, gst: 18 },
    ],
    'Power Supplies': [
      { name: 'Artis PS-600VA 600VA Line Interactive', hsn: '8473', price: 2000.00, gst: 18 },
      { name: 'DeepCool PL650D ATX 3.0 650 Watt 80 Plus Bronze SMPS', hsn: '8473', price: 4080.00, gst: 18 },
      { name: 'Corsair CV550 550W 80+ Bronze PSU', hsn: '8473', price: 3500.00, gst: 18 },
      { name: 'Antec Atom V650 650W 80+ Gold', hsn: '8473', price: 5500.00, gst: 18 },
    ],
    'Accessories': [
      { name: 'HP KM160 Wired Mouse and Keyboard Combo', hsn: '8504', price: 800.00, gst: 18 },
      { name: 'Logitech MK240 Wireless Combo', hsn: '8504', price: 1500.00, gst: 18 },
      { name: 'Dell WM126 Wireless Mouse', hsn: '8504', price: 699.00, gst: 18 },
      { name: 'Zebronics Zeb-K16 Wired Keyboard', hsn: '8504', price: 399.00, gst: 18 },
    ],
    'Monitors': [
      { name: 'ZEBRONICS Z-E19HD ZEBSTAR LED Monitor', hsn: '8473', price: 2100.00, gst: 18 },
      { name: 'LG 22MK430H-B 22 inch LED Monitor', hsn: '8473', price: 6999.00, gst: 18 },
      { name: 'Dell E2220H 21.5 inch Monitor', hsn: '8473', price: 7500.00, gst: 18 },
      { name: 'HP M22f 21.5 inch FHD Monitor', hsn: '8473', price: 8999.00, gst: 18 },
    ],
    'Web Cameras': [
      { name: 'Zebronics Zeb-Crystal Pro Web Camera', hsn: '8473', price: 590.00, gst: 18 },
      { name: 'Logitech C270 HD Webcam', hsn: '8473', price: 1499.00, gst: 18 },
      { name: 'HP W200 Webcam', hsn: '8473', price: 999.00, gst: 18 },
    ],
    'Air Coolers': [
      { name: 'Deepcool AK400 Black CPU Air Cooler', hsn: '8473', price: 2050.00, gst: 18 },
      { name: 'Arctic Freezer 34 CPU Cooler', hsn: '8473', price: 2999.00, gst: 18 },
      { name: 'Noctua NH-L9i CPU Cooler', hsn: '8473', price: 4499.00, gst: 18 },
    ],
    'Graphics Cards': [
      { name: 'MSI RTX 3050 Ventus 2X XS OC 8GB', hsn: '8504', price: 19830.00, gst: 18 },
      { name: 'Gigabyte GTX 1650 4GB OC', hsn: '8504', price: 14999.00, gst: 18 },
      { name: 'AMD RX 6600 XT 8GB', hsn: '8504', price: 29999.00, gst: 18 },
    ],
    'Cabinets': [
      { name: 'Ant Esports Zen Wood C3 (ATX) Mid Tower Cabinet', hsn: '8504', price: 3900.00, gst: 18 },
      { name: 'Deepcool MATREXX 40 Micro-ATX Case', hsn: '8504', price: 2199.00, gst: 18 },
      { name: 'Corsair SPEC-DELTA RGB Case', hsn: '8504', price: 5999.00, gst: 18 },
    ],
    'RAM': [
      { name: 'G.Skill Ripjaws S5 16GB DDR5 5200MHz', hsn: '8504', price: 3220.00, gst: 18 },
      { name: 'Crucial 16GB DDR4 3200MHz', hsn: '8504', price: 2999.00, gst: 18 },
      { name: 'Kingston Fury Beast 32GB DDR5 5600MHz', hsn: '8504', price: 6999.00, gst: 18 },
    ],
    'Motherboards': [
      { name: 'Gigabyte B760M G AX (Wi-Fi) DDR5', hsn: '8504', price: 10000.00, gst: 18 },
      { name: 'ASUS PRIME B550M-A', hsn: '8504', price: 8499.00, gst: 18 },
      { name: 'MSI B550 TOMAHAWK', hsn: '8504', price: 12999.00, gst: 18 },
    ],
    'Processors': [
      { name: 'Intel Core i7-12700K', hsn: '8473', price: 19490.00, gst: 18 },
      { name: 'AMD Ryzen 7 5800X', hsn: '8473', price: 18999.00, gst: 18 },
      { name: 'Intel Core i5-12600K', hsn: '8473', price: 14999.00, gst: 18 },
    ],
    'Storage': [
      { name: 'WD Blue SN5000 NVMe SSD 500GB', hsn: '8473', price: 2700.00, gst: 18 },
      { name: 'Samsung 980 1TB NVMe SSD', hsn: '8473', price: 7499.00, gst: 18 },
      { name: 'Seagate BarraCuda 1TB HDD', hsn: '8473', price: 2899.00, gst: 18 },
    ],
  };

  // State for business details
  const [businessDetails, setBusinessDetails] = useState({
    companyName: 'Empress PC',
    address: 'MS-101, Sector D, Aliganj, Lucknow',
    phone: '8881123430',
    email: 'sales@empresspc.in',
    gstin: '09AALCD1630P1Z9',
    state: '09-Uttar Pradesh',
  });

  // State for customer details
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phone: '',
    state: '09-Uttar Pradesh',
  });

  // State for selected items
  const [selectedItems, setSelectedItems] = useState([]);
  
  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for print mode
  const [printMode, setPrintMode] = useState(false);
  const [savedQuotations, setSavedQuotations] = useState(() => {
    const saved = localStorage.getItem('savedQuotations');
    return saved ? JSON.parse(saved) : [];
  });

  // State for category expansion
  const [expandedCategories, setExpandedCategories] = useState(new Set(['Windows Activation']));

  // Add new item row
  const addItemRow = () => {
    setSelectedItems([...selectedItems, {
      id: Date.now(),
      category: '',
      component: null,
      quantity: 1,
      unit: 'Pcs',
      warranty: '1 Year Warranty',  // Default warranty
      basePrice: 0,
      customPrice: 0,
      purchasePrice: 0,  // Add purchase price
      isCustomPrice: false,
      hsn: '',
      gst: 18,
    }]);
  };

  // Remove item row
  const removeItemRow = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  // Update item
  const updateItem = (id, field, value) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.id === id) {
        if (field === 'category') {
          return { 
            ...item, 
            category: value, 
            component: null, 
            basePrice: 0,
            customPrice: 0,
            hsn: '',
            gst: 18,
          };
        } else if (field === 'component') {
          const component = componentDatabase[item.category].find(c => c.name === value);
          return { 
            ...item, 
            component: value,
            basePrice: component?.price || 0,
            customPrice: component?.price || 0,
            hsn: component?.hsn || '',
            gst: component?.gst || 18,
          };
        } else if (field === 'customPrice') {
          return { ...item, customPrice: value, isCustomPrice: true };
        } else if (field === 'purchasePrice') {
          return { ...item, purchasePrice: value };
        } else if (field === 'warranty') {
          return { ...item, warranty: value };
        } else {
          return { ...item, [field]: value };
        }
      }
      return item;
    }));
  };

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0;
    let totalGst = 0;
    let totalProfit = 0;
    let hsnTotals = {};

    selectedItems.forEach(item => {
      if (item.component) {
        const price = item.isCustomPrice ? item.customPrice : item.basePrice;
        const itemTotal = price * item.quantity;
        const gstAmount = (itemTotal * item.gst) / 100;
        
        // Calculate profit (sale price - purchase price) per unit before GST
        const profitPerUnit = price - item.purchasePrice;
        const totalItemProfit = profitPerUnit * item.quantity;
        
        subtotal += itemTotal;
        totalGst += gstAmount;
        totalProfit += totalItemProfit;

        // Group by HSN
        if (!hsnTotals[item.hsn]) {
          hsnTotals[item.hsn] = {
            taxableAmount: 0,
            cgst: 0,
            sgst: 0,
            totalTax: 0,
          };
        }
        hsnTotals[item.hsn].taxableAmount += itemTotal;
        hsnTotals[item.hsn].cgst += gstAmount / 2;
        hsnTotals[item.hsn].sgst += gstAmount / 2;
        hsnTotals[item.hsn].totalTax += gstAmount;
      }
    });

    return {
      subtotal,
      totalGst,
      grandTotal: subtotal + totalGst,
      totalProfit, // Add total profit
      hsnTotals,
    };
  };

  // Generate estimate number
  const generateEstimateNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(5, '0');
    return `EPC/E/${year}/${month}${random}`;
  };

  // Save quotation
  const saveQuotation = () => {
    const quotationData = {
      id: generateEstimateNumber(),
      date: new Date().toISOString(),
      businessDetails,
      customerDetails,
      selectedItems,
      totals,
    };
    
    const updatedQuotations = [...savedQuotations, quotationData];
    setSavedQuotations(updatedQuotations);
    localStorage.setItem('savedQuotations', JSON.stringify(updatedQuotations));
    alert('Quotation saved successfully!');
  };

  // Download PDF
  const downloadPDF = () => {
    // Create a clone of the current page
    const printContent = document.body.innerHTML;
    const originalContent = document.body.innerHTML;
    
    // Create new window for printing
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Quotation</title>');
    printWindow.document.write('<style>body{font-family: Arial, sans-serif;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(document.querySelector('.quotation-view')?.innerHTML || '');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    // Print the content and then close the window
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 100);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₹ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Convert number to words
  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Lakh', 'Crore'];

    if (num === 0) return 'Zero';

    let word = '';
    let i = 0;

    const isDecimal = num % 1 !== 0;
    const rupees = Math.floor(num);
    const paise = isDecimal ? Math.round((num - rupees) * 100) : 0;

    // Convert rupees to words
    let remainingRupees = rupees;
    while (remainingRupees > 0) {
      let chunk = 0;
      if (i === 0) chunk = remainingRupees % 1000;
      else chunk = remainingRupees % 100;

      if (chunk) {
        let chunkWord = '';
        if (chunk < 10) chunkWord = ones[chunk];
        else if (chunk < 20) chunkWord = teens[chunk - 10];
        else {
          chunkWord = tens[Math.floor(chunk / 10)];
          if (chunk % 10) chunkWord += ' ' + ones[chunk % 10];
        }
        word = chunkWord + (thousands[i] ? ' ' + thousands[i] : '') + (word ? ' ' + word : '');
      }

      if (i === 0) remainingRupees = Math.floor(remainingRupees / 1000);
      else remainingRupees = Math.floor(remainingRupees / 100);
      i++;
    }

    let result = word + ' Rupees';

    // Add paise if any
    if (paise > 0) {
      result += ' and ';
      if (paise < 20) result += teens[paise - 10] || ones[paise];
      else {
        result += tens[Math.floor(paise / 10)];
        if (paise % 10) result += ' ' + ones[paise % 10];
      }
      result += ' Paisa';
    }

    return result + ' only';
  };

  const totals = calculateTotals();

  useEffect(() => {
    // Initialize saved quotations from localStorage
    const saved = localStorage.getItem('savedQuotations');
    if (saved) {
      setSavedQuotations(JSON.parse(saved));
    }
  }, []);

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const QuotationView = () => {
    // Early return if no items
    if (selectedItems.length === 0) {
      return <div className="text-center p-8">Please add items to the quotation</div>;
    }

    return (
      <div className="quotation-view p-8 max-w-7xl mx-auto text-black shadow-lg rounded-lg bg-white print:shadow-none">
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
                        {categoryIcons[item.category]}
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

  // Load saved quotation
  const loadQuotation = (quotation) => {
    setBusinessDetails(quotation.businessDetails);
    setCustomerDetails(quotation.customerDetails);
    setSelectedItems(quotation.selectedItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-200">
      {!printMode ? (
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">EmpressPC Quotation Maker</h1>
            <p className="text-gray-300">Create professional quotations with ease</p>
          </div>
          
          {/* Saved Quotations */}
          {savedQuotations.length > 0 && (
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
          )}
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business Details */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <Building2 size={20} />
                  Business Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={businessDetails.companyName}
                      onChange={(e) => setBusinessDetails({...businessDetails, companyName: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">GSTIN</label>
                    <input
                      type="text"
                      value={businessDetails.gstin}
                      onChange={(e) => setBusinessDetails({...businessDetails, gstin: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                    <input
                      type="text"
                      value={businessDetails.address}
                      onChange={(e) => setBusinessDetails({...businessDetails, address: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={businessDetails.phone}
                      onChange={(e) => setBusinessDetails({...businessDetails, phone: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <User size={20} />
                  Customer Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Customer Name</label>
                    <input
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                    <input
                      type="text"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">State</label>
                    <select
                      value={customerDetails.state}
                      onChange={(e) => setCustomerDetails({...customerDetails, state: e.target.value})}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="09-Uttar Pradesh">09-Uttar Pradesh</option>
                      <option value="27-Maharashtra">27-Maharashtra</option>
                      <option value="19-West Bengal">19-West Bengal</option>
                      <option value="06-Haryana">06-Haryana</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Items Selection */}
              <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Package size={20} />
                    Selected Items
                  </h2>
                  <button
                    onClick={addItemRow}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={20} /> Add Item
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-700 text-gray-200">
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Component</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-left">Warranty</th>
                        <th className="p-3 text-right">Purchase Price</th>
                        <th className="p-3 text-right">Sale Price</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-700">
                          <td className="p-3">
                            <select
                              value={item.category}
                              onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                              className="w-full bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                            >
                              <option value="">Select Category</option>
                              {Object.keys(componentDatabase).map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3">
                            <select
                              value={item.component || ''}
                              onChange={(e) => updateItem(item.id, 'component', e.target.value)}
                              className="w-full bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                              disabled={!item.category}
                            >
                              <option value="">Select Component</option>
                              {item.category && componentDatabase[item.category].map(comp => (
                                <option key={comp.name} value={comp.name}>{comp.name}</option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                              className="w-20 bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                              min="1"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={item.warranty}
                              onChange={(e) => updateItem(item.id, 'warranty', e.target.value)}
                              className="w-32 bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                              placeholder="e.g., 1 Year"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={item.purchasePrice}
                              onChange={(e) => updateItem(item.id, 'purchasePrice', parseFloat(e.target.value))}
                              className="w-24 bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                              step="0.01"
                              placeholder="Purchase"
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={item.isCustomPrice ? item.customPrice : item.basePrice}
                              onChange={(e) => updateItem(item.id, 'customPrice', parseFloat(e.target.value))}
                              className="w-24 bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                              step="0.01"
                              placeholder="Sale"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => removeItemRow(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Component Browser */}
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
                          {categoryIcons[category]}
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
              </div>

              {/* Quote Summary */}
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
          </div>
        </div>
      ) : (
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
        </div>
      )}

      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

// Wrap the main component with error boundary
const App = () => (
  <ErrorBoundary>
    <QuotationMaker />
  </ErrorBoundary>
);

export default App;