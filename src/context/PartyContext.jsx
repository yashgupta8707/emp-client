import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../components/services/api';
import { useAuth } from './AuthContext';

// Create context
const PartyContext = createContext();

// Custom hook for using the party context
export const useParty = () => useContext(PartyContext);

// Provider component
export const PartyProvider = ({ children }) => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingParty, setEditingParty] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [partyToDelete, setPartyToDelete] = useState(null);
  
  const { token } = useAuth();

  // Fetch all parties
  const fetchParties = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await api.get('/parties');
      setParties(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch parties:', err);
      setError(err.response?.data?.message || 'Failed to load parties');
    } finally {
      setLoading(false);
    }
  };

  // Add new party
  const addParty = async (party) => {
    try {
      setLoading(true);
      const response = await api.post('/parties', party);
      setParties([...parties, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Failed to add party:', err);
      setError(err.response?.data?.message || 'Failed to add party');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update existing party
  const updateParty = async (id, updatedParty) => {
    try {
      setLoading(true);
      const response = await api.put(`/parties/${id}`, updatedParty);
      
      setParties(parties.map(party => 
        party._id === id ? response.data : party
      ));
      
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Failed to update party:', err);
      setError(err.response?.data?.message || 'Failed to update party');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete party
  const deleteParty = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/parties/${id}`);
      setParties(parties.filter(party => party._id !== id));
      setError(null);
      return true;
    } catch (err) {
      console.error('Failed to delete party:', err);
      setError(err.response?.data?.message || 'Failed to delete party');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get party by ID
  const getPartyById = (id) => {
    return parties.find(party => party._id === id);
  };

  // Filtered parties based on search query
  const filteredParties = parties.filter(party => {
    const searchLower = searchQuery.toLowerCase();
    return (
      party.name.toLowerCase().includes(searchLower) ||
      party.phone.includes(searchQuery) ||
      (party.gstin && party.gstin.toLowerCase().includes(searchLower)) ||
      (party.address && party.address.toLowerCase().includes(searchLower))
    );
  });

  // Fetch parties on mount and when token changes
  useEffect(() => {
    fetchParties();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PartyContext.Provider
      value={{
        parties,
        filteredParties,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        fetchParties,
        addParty,
        updateParty,
        deleteParty,
        getPartyById,
        editingParty,
        setEditingParty,
        isAddModalOpen,
        setIsAddModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        partyToDelete,
        setPartyToDelete
      }}
    >
      {children}
    </PartyContext.Provider>
  );
};

export default PartyContext;