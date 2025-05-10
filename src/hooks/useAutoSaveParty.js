import { useEffect, useState } from 'react';
import { useParty } from '../context/PartyContext';

/**
 * Hook for auto-saving customer details to the parties database
 * @param {Object} customerDetails Customer details object 
 * @param {string} selectedPartyId Currently selected party ID (if any)
 * @returns {Object} Feedback message state and handler functions
 */
const useAutoSaveParty = (customerDetails, selectedPartyId) => {
  const { parties, addParty } = useParty();
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [shouldAutoSave, setShouldAutoSave] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  // Check if the customer details have changed and we should consider auto-saving
  useEffect(() => {
    // Clear any existing timers when details change
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }
    
    // Only proceed if both name and phone are provided and not empty
    if (customerDetails.name && customerDetails.phone) {
      // Check if this is a new customer (not in parties list)
      const existingCustomer = parties.find(p => 
        p.type === 'customer' && 
        (p.phone === customerDetails.phone || p.name.toLowerCase() === customerDetails.name.toLowerCase())
      );
      
      if (!existingCustomer && !selectedPartyId) {
        // This appears to be a new customer, set flag for auto-save after a delay
        setShouldAutoSave(true);
        
        // Show feedback message
        setFeedback({
          message: 'New customer will be saved automatically',
          type: 'info'
        });
        
        // Set a timer to clear the feedback
        setAutoSaveTimer(setTimeout(() => {
          setFeedback({ message: '', type: '' });
        }, 3000));
      } else {
        setShouldAutoSave(false);
      }
    } else {
      setShouldAutoSave(false);
    }
    
    // Cleanup function
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [customerDetails.name, customerDetails.phone, parties, selectedPartyId]);

  // Function to manually save customer to parties
  const saveCustomerToParties = () => {
    // Check if customer already exists
    const exists = parties.some(
      p => p.type === 'customer' && 
      (p.phone === customerDetails.phone || p.name.toLowerCase() === customerDetails.name.toLowerCase())
    );
    
    if (!exists && customerDetails.name && customerDetails.phone) {
      // Add new customer to parties
      const newParty = addParty({
        name: customerDetails.name,
        phone: customerDetails.phone,
        address: customerDetails.address || '',
        state: customerDetails.state || '09-Uttar Pradesh',
        type: 'customer'
      });
      
      setFeedback({
        message: 'Customer added successfully!',
        type: 'success'
      });
      
      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
      
      return newParty;
    } else if (exists) {
      setFeedback({
        message: 'Customer already exists',
        type: 'warning'
      });
      
      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
    }
    
    return null;
  };

  // Auto-save when the quotation is being saved
  const autoSaveIfNeeded = () => {
    if (shouldAutoSave) {
      return saveCustomerToParties();
    }
    return null;
  };

  return {
    feedback,
    setFeedback,
    saveCustomerToParties,
    autoSaveIfNeeded,
    shouldAutoSave
  };
};

export default useAutoSaveParty;