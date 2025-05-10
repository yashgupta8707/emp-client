import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  RefreshCw, 
  Users, 
  Building2, 
  UserPlus, 
  Filter,
  List,
  Grid,
  X,
  User
} from 'lucide-react';
import { useParty } from '../context/PartyContext';
import PartyList from '../components/party/PartyList';
import PartyForm from '../components/party/PartyForm';
import DeleteModal from '../components/customer/party/DeleteModal';
import PartyCard from '../components/party/PartyCard';

const Parties = () => {
  const { 
    filteredParties, 
    searchQuery, 
    setSearchQuery, 
    isAddModalOpen, 
    setIsAddModalOpen, 
    editingParty, 
    setEditingParty 
  } = useParty();
  
  const [activeFilter, setActiveFilter] = useState('all'); // all, customer, supplier
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const handleAddNew = () => {
    setEditingParty(null);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingParty(null);
  };

  const getFilteredParties = () => {
    if (activeFilter === 'all') {
      return filteredParties;
    }
    return filteredParties.filter(party => party.type === activeFilter);
  };

  const filteredPartiesCount = getFilteredParties().length;
  const totalPartiesCount = filteredParties.length;
  const customersCount = filteredParties.filter(p => p.type === 'customer').length;
  const suppliersCount = filteredParties.filter(p => p.type === 'supplier').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-200">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Users size={32} className="mr-2" />
            Parties
          </h1>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} /> Add Party
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Search parties by name, phone, GSTIN..."
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X size={18} className="text-gray-400 hover:text-white" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
                  activeFilter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Filter size={16} />
                All ({totalPartiesCount})
              </button>
              <button
                onClick={() => setActiveFilter('customer')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
                  activeFilter === 'customer' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <User size={16} />
                Customers ({customersCount})
              </button>
              <button
                onClick={() => setActiveFilter('supplier')}
                className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
                  activeFilter === 'supplier' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Building2 size={16} />
                Suppliers ({suppliersCount})
              </button>

              <div className="ml-2 border-l border-gray-600 pl-2 flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  title="Grid view"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  title="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Party Cards/List */}
        <div className="bg-gray-800 rounded-lg shadow-lg">
          {filteredPartiesCount > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {getFilteredParties().map(party => (
                  <PartyCard key={party.id} party={party} />
                ))}
              </div>
            ) : (
              <PartyList parties={getFilteredParties()} />
            )
          ) : (
            <div className="p-10 text-center">
              {searchQuery || activeFilter !== 'all' ? (
                <div className="space-y-4">
                  <RefreshCw size={48} className="mx-auto text-gray-500" />
                  <p className="text-gray-400">
                    No parties found with the current filters. Try changing your search or filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <UserPlus size={48} className="mx-auto text-gray-500" />
                  <h3 className="text-xl font-semibold text-white">No parties added yet</h3>
                  <p className="text-gray-400">
                    Add your first customer or supplier to get started
                  </p>
                  <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Add New Party
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <PartyForm 
          isEdit={!!editingParty} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal />
    </div>
  );
};

export default Parties;