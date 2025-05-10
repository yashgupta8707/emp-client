import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import QuotationMaker from "./pages/QuotationMaker";
import Parties from "./pages/Parties";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import { QuotationProvider } from "./context/QuotationContext";
import { PartyProvider } from "./context/PartyContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoadingScreen from "./components/ui/LoadingScreen";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <PartyProvider>
                    <QuotationProvider>
                      <AppLayout>
                        <QuotationMaker />
                      </AppLayout>
                    </QuotationProvider>
                  </PartyProvider>
                }
              />
              
              <Route
                path="/quotation"
                element={
                  <PartyProvider>
                    <QuotationProvider>
                      <AppLayout>
                        <QuotationMaker />
                      </AppLayout>
                    </QuotationProvider>
                  </PartyProvider>
                }
              />
              
              <Route
                path="/parties"
                element={
                  <PartyProvider>
                    <AppLayout>
                      <Parties />
                    </AppLayout>
                  </PartyProvider>
                }
              />
              
              {/* Admin routes */}
              <Route element={<ProtectedRoute requireAdmin={true} />}>
                <Route
                  path="/users"
                  element={
                    <AppLayout>
                      <UserManagement />
                    </AppLayout>
                  }
                />
              </Route>
            </Route>
            
            {/* Redirect all other routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

// App layout with header and main content
const AppLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white antialiased">
      <Header />
      <div className="pt-16">{children}</div>
    </div>
  );
};

export default App;