// src/App.jsx
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
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

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

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
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
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
                          <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                      </Box>
                    </Box>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
