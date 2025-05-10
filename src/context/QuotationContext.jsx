import React, { createContext, useState, useContext, useEffect } from 'react';
import { calculateTotals } from '../utils/calculations';
import { generateEstimateNumber } from '../utils/generators';
import { componentDatabase } from '../data/componentDatabase';

// Create context
const QuotationContext = createContext();

// Custom hook for using the quotation context
export const useQuotation = () => useContext(QuotationContext);

// Provider component
export const QuotationProvider = ({ children }) => {
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
  
  // State for saved quotations
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

  // Save quotation
  const saveQuotation = () => {
    const totals = calculateTotals(selectedItems);
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

  // Load saved quotation
  const loadQuotation = (quotation) => {
    setBusinessDetails(quotation.businessDetails);
    setCustomerDetails(quotation.customerDetails);
    setSelectedItems(quotation.selectedItems);
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  useEffect(() => {
    // Initialize saved quotations from localStorage
    const saved = localStorage.getItem('savedQuotations');
    if (saved) {
      setSavedQuotations(JSON.parse(saved));
    }
  }, []);

  // Calculate totals based on current selected items
  const totals = calculateTotals(selectedItems);

  return (
    <QuotationContext.Provider
      value={{
        businessDetails,
        setBusinessDetails,
        customerDetails,
        setCustomerDetails,
        selectedItems,
        setSelectedItems,
        searchQuery,
        setSearchQuery,
        printMode,
        setPrintMode,
        savedQuotations,
        setSavedQuotations,
        expandedCategories,
        setExpandedCategories,
        addItemRow,
        removeItemRow,
        updateItem,
        saveQuotation,
        loadQuotation,
        toggleCategory,
        totals,
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
};

export default QuotationContext;