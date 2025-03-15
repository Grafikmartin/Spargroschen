// src/App.jsx
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext'; // Importiere den ThemeProvider
import PrivateRoute from './components/PrivateRoute';

// Layout Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Login from './components/Login';
import Register from './components/Register';

// Pages
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Savings from './pages/Savings';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Help from './pages/Help';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Setze den Dokumententitel
  useEffect(() => {
    document.title = 'ZasterZen';
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AuthProvider>
      <ThemeProvider> {/* Verwende den ThemeProvider */}
        <AppProvider>
          <Router>
            <CssBaseline />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <Box sx={{ display: 'flex' }}>
                      <Header onMenuClick={handleDrawerToggle} />
                      <Sidebar 
                        mobileOpen={mobileOpen} 
                        onClose={handleDrawerToggle} 
                      />
                      <Box
                        component="main"
                        sx={{ 
                          flexGrow: 1, 
                          p: 3, 
                          width: { sm: `calc(100% - 240px)` },
                          mt: 8 
                        }}
                      >
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/transactions" element={<Transactions />} />
                          <Route path="/budget" element={<Budget />} />
                          <Route path="/savings" element={<Savings />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/help" element={<Help />} />
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                      </Box>
                    </Box>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </AppProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
