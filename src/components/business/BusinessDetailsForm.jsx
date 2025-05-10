import React from 'react';
import { Building2 } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';

const BusinessDetailsForm = () => {
  const { businessDetails, setBusinessDetails } = useQuotation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
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
            name="companyName"
            value={businessDetails.companyName}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">GSTIN</label>
          <input
            type="text"
            name="gstin"
            value={businessDetails.gstin}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={businessDetails.address}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={businessDetails.phone}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={businessDetails.email}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">State</label>
          <input
            type="text"
            name="state"
            value={businessDetails.state}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;