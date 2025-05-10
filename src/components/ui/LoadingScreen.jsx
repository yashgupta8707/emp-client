import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-white">Loading...</h2>
        <p className="mt-2 text-gray-400">Please wait while we prepare your data</p>
      </div>
    </div>
  );
};

export default LoadingScreen;