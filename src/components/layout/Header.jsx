import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Menu, 
  X, 
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  User,
  UserCog
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // If user is not logged in, don't show the header
  if (!user) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white">EmpressPC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link
              to="/quotation"
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                isActive('/') || isActive('/quotation')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <FileText size={18} className="mr-1.5" />
              Quotations
            </Link>
            <Link
              to="/parties"
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                isActive('/parties')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Users size={18} className="mr-1.5" />
              Parties
            </Link>
            {isAdmin() && (
              <Link
                to="/users"
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  isActive('/users')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <UserCog size={18} className="mr-1.5" />
                Users
              </Link>
            )}
          </nav>

          {/* Right Section: Profile */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-gray-700 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                  <User size={16} />
                </div>
                <span>{user.name}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-xs text-gray-400">
                    Logged in as <span className="font-medium text-gray-300">{user.username}</span>
                    <p className="mt-1">
                      Role: <span className="font-medium text-gray-300">{user.role}</span>
                    </p>
                  </div>
                  <div className="border-t border-gray-700 my-1"></div>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <Settings size={16} className="mr-2" />
                    Account Settings
                  </Link>
                  <Link
                    to="/help"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <HelpCircle size={16} className="mr-2" />
                    Help
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button
                    className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/quotation"
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive('/') || isActive('/quotation')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={closeMobileMenu}
            >
              <FileText size={18} className="mr-2" />
              Quotations
            </Link>
            <Link
              to="/parties"
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive('/parties')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={closeMobileMenu}
            >
              <Users size={18} className="mr-2" />
              Parties
            </Link>
            {isAdmin() && (
              <Link
                to="/users"
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  isActive('/users')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={closeMobileMenu}
              >
                <UserCog size={18} className="mr-2" />
                Users
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user.name}</div>
                <div className="text-sm font-medium text-gray-400">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                onClick={closeMobileMenu}
              >
                <Settings size={18} className="mr-2" />
                Account Settings
              </Link>
              <Link
                to="/help"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
                onClick={closeMobileMenu}
              >
                <HelpCircle size={18} className="mr-2" />
                Help
              </Link>
              <button
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-700 flex items-center"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;