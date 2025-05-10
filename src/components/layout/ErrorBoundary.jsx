import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-900 text-white p-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="text-red-200 mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;