import React, { useEffect, useState } from 'react';
import { User, Users, Plus, Check, AlertCircle } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { useParty } from '../../context/PartyContext';
import { useLocation } from 'react-router-dom';

const CustomerDetailsForm = () => {
  const { customerDetails, setCustomerDetails, selectedItems, setSelectedItems, businessDetails } = useQuotation();
  const { parties, addParty } = useParty();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const partyId = searchParams.get('partyId');

  // State for feedback messages
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [selectedPartyId, setSelectedPartyId] = useState('');
  
  // Filter only customer type parties
  const customers = parties.filter(party => party.type === 'customer');

  // Get saved quotations from localStorage
  const getSavedQuotations = () => {
    const saved = localStorage.getItem('savedQuotations');
    return saved ? JSON.parse(saved) : [];
  };

  // Find previous quotations for a customer
  const findPreviousQuotations = (customerId) => {
    const quotations = getSavedQuotations();
    return quotations.filter(quote => 
      quote.customerDetails.phone === customerId || 
      quote.customerDetails.name.toLowerCase() === customerId.toLowerCase()
    );
  };

  // Load most recent quotation for a customer
  const loadMostRecentQuotation = (customerId) => {
    const previousQuotations = findPreviousQuotations(customerId);
    
    if (previousQuotations.length > 0) {
      // Sort by date (newest first)
      previousQuotations.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      // Get most recent quotation
      const recentQuotation = previousQuotations[0];
      
      // Load items from previous quotation
      setSelectedItems(recentQuotation.selectedItems);
      
      setFeedback({
        message: `Previous quotation from ${new Date(recentQuotation.date).toLocaleDateString()} loaded!`,
        type: 'success'
      });
      
      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
      
      return true;
    }
    
    return false;
  };

  // Auto-add new customer to database when details are entered
  useEffect(() => {
    // Only proceed if both name and phone are provided and not empty
    if (customerDetails.name && customerDetails.phone) {
      // Check if this is a new customer (not in parties list)
      const existingCustomer = parties.find(p => 
        p.type === 'customer' && 
        (p.phone === customerDetails.phone || p.name.toLowerCase() === customerDetails.name.toLowerCase())
      );
      
      if (!existingCustomer && !selectedPartyId) {
        // This appears to be a new customer, flag for auto-save
        setFeedback({
          message: 'New customer details will be saved automatically',
          type: 'info'
        });
      }
    }
  }, [customerDetails.name, customerDetails.phone, parties, selectedPartyId]);

  useEffect(() => {
    // If partyId is provided in URL, load the customer details
    if (partyId) {
      const party = parties.find(p => p.id === partyId);
      if (party && party.type === 'customer') {
        setCustomerDetails({
          name: party.name,
          phone: party.phone,
          address: party.address || '',
          state: party.state || '09-Uttar Pradesh',
        });
        
        setSelectedPartyId(partyId);
        
        // Try to load previous quotation
        loadMostRecentQuotation(party.phone);
      }
    }
  }, [partyId, parties, setCustomerDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // If changing fields after selecting a party, clear the selection
    if (selectedPartyId) {
      setSelectedPartyId('');
    }
  };

  const handlePartySelect = (e) => {
    const selectedId = e.target.value;
    setSelectedPartyId(selectedId);
    
    if (selectedId) {
      const party = parties.find(p => p.id === selectedId);
      if (party) {
        setCustomerDetails({
          name: party.name,
          phone: party.phone,
          address: party.address || '',
          state: party.state || '09-Uttar Pradesh',
        });
        
        // Try to load previous quotation
        loadMostRecentQuotation(party.phone);
      }
    }
  };

  const saveCustomerToParties = () => {
    // Check if customer already exists
    const exists = parties.some(
      p => p.type === 'customer' && 
      (p.phone === customerDetails.phone || p.name.toLowerCase() === customerDetails.name.toLowerCase())
    );
    
    if (!exists) {
      // Add new customer to parties
      addParty({
        name: customerDetails.name,
        phone: customerDetails.phone,
        address: customerDetails.address,
        state: customerDetails.state,
        type: 'customer'
      });
      
      setFeedback({
        message: 'Customer added successfully!',
        type: 'success'
      });
      
      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
    } else {
      setFeedback({
        message: 'Customer already exists',
        type: 'warning'
      });
      
      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
        <User size={20} />
        Customer Details
      </h2>

      {/* Feedback message */}
      {feedback.message && (
        <div className={`mb-4 p-2 rounded flex items-start gap-2 ${
          feedback.type === 'success' ? 'bg-green-900/40 text-green-300 border border-green-800' :
          feedback.type === 'warning' ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-800' :
          'bg-blue-900/40 text-blue-300 border border-blue-800'
        }`}>
          {feedback.type === 'success' ? <Check size={16} className="mt-0.5" /> : 
           feedback.type === 'warning' ? <AlertCircle size={16} className="mt-0.5" /> :
           <AlertCircle size={16} className="mt-0.5" />}
          <span className="text-sm">{feedback.message}</span>
        </div>
      )}

      {/* Party Selector */}
      {customers.length > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-700">
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            <Users size={16} className="mr-2" />
            Select Existing Customer
          </label>
          <select
            value={selectedPartyId}
            onChange={handlePartySelect}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">-- Select a customer --</option>
            {customers.map(party => (
              <option key={party.id} value={party.id}>{party.name} ({party.phone})</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Customer Name</label>
          <input
            type="text"
            name="name"
            value={customerDetails.name}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={customerDetails.phone}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={customerDetails.address}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">State</label>
          <select
            name="state"
            value={customerDetails.state}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="09-Uttar Pradesh">09-Uttar Pradesh</option>
            <option value="27-Maharashtra">27-Maharashtra</option>
            <option value="19-West Bengal">19-West Bengal</option>
            <option value="06-Haryana">06-Haryana</option>
            <option value="07-Delhi">07-Delhi</option>
            <option value="10-Bihar">10-Bihar</option>
            <option value="24-Gujarat">24-Gujarat</option>
            <option value="33-Tamil Nadu">33-Tamil Nadu</option>
            <option value="29-Karnataka">29-Karnataka</option>
          </select>
        </div>
      </div>

      {/* Save Customer button */}
      {customerDetails.name && customerDetails.phone && !selectedPartyId && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={saveCustomerToParties}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-500 transition-colors flex items-center gap-1"
          >
            <Plus size={16} />
            Save to Parties
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailsForm;