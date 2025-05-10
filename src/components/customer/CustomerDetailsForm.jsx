import React, { useEffect } from 'react';
import { User, Users } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { useParty } from '../../context/PartyContext';
import { useLocation } from 'react-router-dom';

const CustomerDetailsForm = () => {
  const { customerDetails, setCustomerDetails } = useQuotation();
  const { parties } = useParty();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const partyId = searchParams.get('partyId');

  // Filter only customer type parties
  const customers = parties.filter(party => party.type === 'customer');

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
      }
    }
  }, [partyId, parties, setCustomerDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePartySelect = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      const party = parties.find(p => p.id === selectedId);
      if (party) {
        setCustomerDetails({
          name: party.name,
          phone: party.phone,
          address: party.address || '',
          state: party.state || '09-Uttar Pradesh',
        });
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
        <User size={20} />
        Customer Details
      </h2>

      {/* Party Selector */}
      {customers.length > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-700">
          <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
            <Users size={16} className="mr-2" />
            Select Existing Customer
          </label>
          <select
            value=""
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
      {customerDetails.name && customerDetails.phone && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              // Check if customer already exists
              const exists = parties.some(
                p => p.type === 'customer' && p.phone === customerDetails.phone
              );
              
              if (!exists) {
                // Add new customer to parties if doesn't exist
                const { addParty } = useParty();
                addParty({
                  name: customerDetails.name,
                  phone: customerDetails.phone,
                  address: customerDetails.address,
                  state: customerDetails.state,
                  type: 'customer'
                });
              }
            }}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-500 transition-colors flex items-center"
          >
            Save to Parties
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailsForm;