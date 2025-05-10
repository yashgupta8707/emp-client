import React from 'react';
import { Edit, Trash2, Phone, Mail, MapPin, FileText, User, Building } from 'lucide-react';
import { useParty } from '../../context/PartyContext';
import { useNavigate } from 'react-router-dom';

const PartyCard = ({ party }) => {
  const { 
    setEditingParty, 
    setIsAddModalOpen, 
    setPartyToDelete, 
    setIsDeleteModalOpen 
  } = useParty();
  
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditingParty(party);
    setIsAddModalOpen(true);
  };

  const handleDelete = () => {
    setPartyToDelete(party);
    setIsDeleteModalOpen(true);
  };

  const handleCreateQuotation = () => {
    // Navigate to quotation page with party details
    navigate(`/quotation?partyId=${party.id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex justify-between items-start p-4 border-b border-gray-700">
        <div className="flex items-center">
          {party.type === 'customer' ? (
            <User size={20} className="text-blue-400 mr-2" />
          ) : (
            <Building size={20} className="text-green-400 mr-2" />
          )}
          <h3 className="text-lg font-semibold text-white">{party.name}</h3>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleEdit}
            className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-center text-gray-300">
          <Phone size={16} className="mr-2 flex-shrink-0" />
          <span>{party.phone}</span>
        </div>
        
        {party.email && (
          <div className="flex items-center text-gray-300">
            <Mail size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">{party.email}</span>
          </div>
        )}
        
        {party.address && (
          <div className="flex items-start text-gray-300">
            <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
            <span className="text-sm">{party.address}</span>
          </div>
        )}
        
        {party.gstin && (
          <div className="flex items-center text-gray-300">
            <FileText size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">GSTIN: {party.gstin}</span>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-2">
          Added on {formatDate(party.createdAt)}
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-750 border-t border-gray-700">
        {party.type === 'customer' ? (
          <button
            onClick={handleCreateQuotation}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
          >
            Create Quotation
          </button>
        ) : (
          <button
            onClick={() => navigate('/purchase')}
            className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
          >
            Create Purchase
          </button>
        )}
      </div>
    </div>
  );
};

export default PartyCard;