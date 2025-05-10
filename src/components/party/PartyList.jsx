import React from 'react';
import { User, Building, Phone, Mail, MapPin, Edit, Trash2, ArrowRight } from 'lucide-react';
import { useParty } from '../../context/PartyContext';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const PartyList = ({ parties }) => {
  const { 
    setEditingParty, 
    setIsAddModalOpen, 
    setPartyToDelete, 
    setIsDeleteModalOpen 
  } = useParty();
  
  const navigate = useNavigate();

  const handleEdit = (party) => {
    setEditingParty(party);
    setIsAddModalOpen(true);
  };

  const handleDelete = (party) => {
    setPartyToDelete(party);
    setIsDeleteModalOpen(true);
  };

  const handleCreateQuotation = (party) => {
    navigate(`/quotation?partyId=${party.id}`);
  };

  const getRelativeTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  if (!parties || parties.length === 0) {
    return <div className="text-center p-4 text-gray-400">No parties found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-700 text-left text-gray-200">
            <th className="p-3 rounded-tl-lg">Name</th>
            <th className="p-3">Contact</th>
            <th className="p-3 hidden md:table-cell">GSTIN</th>
            <th className="p-3 hidden lg:table-cell">Address</th>
            <th className="p-3 hidden sm:table-cell">Added</th>
            <th className="p-3 rounded-tr-lg text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party) => (
            <tr 
              key={party.id} 
              className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
            >
              <td className="p-3">
                <div className="flex items-center">
                  {party.type === 'customer' ? (
                    <User size={18} className="text-blue-400 mr-2 flex-shrink-0" />
                  ) : (
                    <Building size={18} className="text-green-400 mr-2 flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-white">{party.name}</div>
                    <div className="text-xs text-gray-400">
                      {party.type === 'customer' ? 'Customer' : 'Supplier'}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Phone size={14} className="text-gray-400 mr-2 flex-shrink-0" />
                    <span>{party.phone}</span>
                  </div>
                  {party.email && (
                    <div className="flex items-center text-sm">
                      <Mail size={14} className="text-gray-400 mr-2 flex-shrink-0" />
                      <span className="truncate max-w-[150px]">{party.email}</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="p-3 hidden md:table-cell">
                <span className="text-sm">{party.gstin || '-'}</span>
              </td>
              <td className="p-3 hidden lg:table-cell">
                {party.address ? (
                  <div className="flex items-start text-sm">
                    <MapPin size={14} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="truncate max-w-[200px]">{party.address}</span>
                  </div>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </td>
              <td className="p-3 hidden sm:table-cell">
                <span className="text-sm text-gray-400" title={new Date(party.createdAt).toLocaleString()}>
                  {getRelativeTime(party.createdAt)}
                </span>
              </td>
              <td className="p-3 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(party)}
                    className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(party)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                  {party.type === 'customer' && (
                    <button
                      onClick={() => handleCreateQuotation(party)}
                      className="ml-2 px-2 py-1 bg-blue-600 text-white text-sm rounded flex items-center hover:bg-blue-500 transition-colors"
                      title="Create Quotation"
                    >
                      <span className="hidden sm:inline mr-1">Quotation</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartyList;