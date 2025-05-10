import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useParty } from '../../context/PartyContext';

const PartyForm = ({ isEdit = false, onClose }) => {
  const { addParty, updateParty, editingParty } = useParty();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gstin: '',
    address: '',
    state: '09-Uttar Pradesh',
    type: 'customer', // customer or supplier
    notes: ''
  });

  // If editing, populate form with party data
  useEffect(() => {
    if (isEdit && editingParty) {
      setFormData({
        name: editingParty.name || '',
        phone: editingParty.phone || '',
        email: editingParty.email || '',
        gstin: editingParty.gstin || '',
        address: editingParty.address || '',
        state: editingParty.state || '09-Uttar Pradesh',
        type: editingParty.type || 'customer',
        notes: editingParty.notes || ''
      });
    }
  }, [isEdit, editingParty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Name and phone number are required');
      return;
    }
    
    if (isEdit && editingParty) {
      updateParty(editingParty.id, formData);
    } else {
      addParty(formData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {isEdit ? 'Edit Party' : 'Add New Party'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Party Type</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="customer"
                    checked={formData.type === 'customer'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
                  />
                  <span className="ml-2 text-gray-300">Customer</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="supplier"
                    checked={formData.type === 'supplier'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700"
                  />
                  <span className="ml-2 text-gray-300">Supplier</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter party name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter phone number"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">GSTIN</label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter GSTIN"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Enter address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">State</label>
              <select
                name="state"
                value={formData.state}
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
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="2"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Additional notes"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              {isEdit ? 'Update Party' : 'Add Party'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartyForm;