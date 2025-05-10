import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Shield, 
  UserPlus, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/ui/LoadingScreen';

const UserManagement = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    role: 'staff',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { getUsers, registerUser, updateUser, error, isAdmin, user: currentUser } = useAuth();
  
  // Check if user is admin, redirect if not
  useEffect(() => {
    if (!isAdmin()) {
      window.location.href = '/'; // Redirect to home
    }
  }, [isAdmin]);
  
  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsersList(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Open add user modal
  const handleAddUser = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      name: '',
      role: 'staff',
    });
    setConfirmPassword('');
    setFormError('');
    setIsAddModalOpen(true);
  };
  
  // Open edit user modal
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      password: '',
      active: user.active,
    });
    setConfirmPassword('');
    setFormError('');
    setIsEditModalOpen(true);
  };
  
  // Open delete user modal
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  
  // Submit add user form
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    try {
      const result = await registerUser(formData);
      
      if (result.success) {
        setIsAddModalOpen(false);
        fetchUsers();
      } else {
        setFormError(result.error || 'Failed to create user');
      }
    } catch (err) {
      setFormError('An error occurred while creating user');
    }
  };
  
  // Submit edit user form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form if password is being changed
    if (formData.password && formData.password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    try {
      // Remove password if empty
      const userData = { ...formData };
      if (!userData.password) {
        delete userData.password;
      }
      
      const result = await updateUser(selectedUser._id, userData);
      
      if (result.success) {
        setIsEditModalOpen(false);
        fetchUsers();
      } else {
        setFormError(result.error || 'Failed to update user');
      }
    } catch (err) {
      setFormError('An error occurred while updating user');
    }
  };
  
  // Toggle user active status
  const toggleUserStatus = async (user) => {
    try {
      const result = await updateUser(user._id, {
        active: !user.active,
      });
      
      if (result.success) {
        fetchUsers();
      }
    } catch (err) {
      console.error('Error toggling user status:', err);
    }
  };

  // Filter users based on search query
  const filteredUsers = searchQuery 
    ? usersList.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : usersList;
  
  if (loading && usersList.length === 0) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-200">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Users size={32} className="mr-2" />
            User Management
          </h1>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleAddUser}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <UserPlus size={20} /> Add User
            </button>
          </div>
        </div>
        
        {/* Users Table */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700 text-left text-gray-200">
                    <th className="p-4">Username</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user._id}
                      className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="p-4 font-medium">{user.username}</td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-900 text-purple-200' 
                            : 'bg-blue-900 text-blue-200'
                        }`}>
                          {user.role === 'admin' && <Shield size={12} className="mr-1" />}
                          {user.role === 'admin' ? 'Administrator' : 'Staff'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleUserStatus(user)}
                          disabled={user._id === currentUser.id}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.active
                              ? 'bg-green-900 text-green-200'
                              : 'bg-red-900 text-red-200'
                          } ${user._id === currentUser.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {user.active ? (
                            <>
                              <CheckCircle size={12} className="mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle size={12} className="mr-1" />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          {/* Only show delete for non-admin users and not current user */}
                          {user.role !== 'admin' && user._id !== currentUser.id && (
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              {searchQuery ? (
                <div className="space-y-4">
                  <RefreshCw size={48} className="mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">No users found matching "{searchQuery}"</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <RefreshCw size={48} className="mx-auto text-gray-500 mb-4" />
                  <p className="text-gray-400">No users found or error loading users</p>
                  <button
                    onClick={fetchUsers}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Refresh
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats and Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Users Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Users:</span>
                <span className="text-white font-medium">{usersList.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Administrators:</span>
                <span className="text-purple-300 font-medium">
                  {usersList.filter(u => u.role === 'admin').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Staff Members:</span>
                <span className="text-blue-300 font-medium">
                  {usersList.filter(u => u.role === 'staff').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Users:</span>
                <span className="text-green-300 font-medium">
                  {usersList.filter(u => u.active).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Inactive Users:</span>
                <span className="text-red-300 font-medium">
                  {usersList.filter(u => !u.active).length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">User Tips</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Administrators have full access to all system features</li>
              <li>• Staff users can create quotations and manage parties</li>
              <li>• Inactive users cannot log in to the system</li>
              <li>• You cannot deactivate your own account</li>
              <li>• System requires at least one active admin user</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Password Requirements</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Minimum 6 characters</li>
              <li>• Combination of letters and numbers recommended</li>
              <li>• Special characters improve security</li>
              <li>• Avoid using common words or phrases</li>
              <li>• Don't share passwords between users</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add New User</h2>
            
            {/* Error alert */}
            {formError && (
              <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg mb-4">
                <p className="text-sm text-red-300">{formError}</p>
              </div>
            )}
            
            <form onSubmit={handleAddSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Edit User: {selectedUser.username}</h2>
            
            {/* Error alert */}
            {formError && (
              <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg mb-4">
                <p className="text-sm text-red-300">{formError}</p>
              </div>
            )}
            
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password (leave blank to keep unchanged)
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                {formData.password && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    disabled={selectedUser._id === currentUser.id}
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Administrator</option>
                  </select>
                  {selectedUser._id === currentUser.id && (
                    <p className="text-xs text-yellow-500 mt-1">
                      You cannot change your own role
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    name="active"
                    value={formData.active.toString()}
                    onChange={(e) => setFormData({...formData, active: e.target.value === 'true'})}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                    disabled={selectedUser._id === currentUser.id}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                  {selectedUser._id === currentUser.id && (
                    <p className="text-xs text-yellow-500 mt-1">
                      You cannot deactivate your own account
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete User Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-red-500 mr-2" />
              <h2 className="text-xl font-bold text-white">Deactivate User</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to deactivate the user <span className="font-bold">{selectedUser.username}</span>? 
              The user will no longer be able to log in to the system.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    const result = await updateUser(selectedUser._id, { active: false });
                    if (result.success) {
                      setIsDeleteModalOpen(false);
                      fetchUsers();
                    }
                  } catch (err) {
                    console.error('Error deactivating user:', err);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Deactivate User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;