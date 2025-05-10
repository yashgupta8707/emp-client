import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useParty } from '../../../context/PartyContext';

const DeleteModal = () => {
  const { 
    partyToDelete, 
    setPartyToDelete, 
    deleteParty, 
    isDeleteModalOpen, 
    setIsDeleteModalOpen 
  } = useParty();

  if (!isDeleteModalOpen || !partyToDelete) {
    return null;
  }

  const handleClose = () => {
    setIsDeleteModalOpen(false);
    setPartyToDelete(null);
  };

  const handleConfirmDelete = () => {
    deleteParty(partyToDelete.id);
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center">
            <AlertTriangle size={24} className="text-red-500 mr-2" />
            Delete Party
          </h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-5 space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete <span className="font-semibold">{partyToDelete.name}</span>? 
            This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;