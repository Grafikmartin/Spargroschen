// src/pages/Settings.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Switch,
  Alert,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Settings() {
  const { user, changeUsername, changePassword } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Persönliche Einstellungen
  const [usernameForm, setUsernameForm] = useState({
    newUsername: '',
    password: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setUsernameForm({
      ...usernameForm,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };

  const handleSubmitUsername = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    if (!usernameForm.newUsername) {
      setErrorMessage('Bitte gib einen neuen Benutzernamen ein');
      return;
    }
    
    const result = changeUsername(user.username, usernameForm.newUsername, usernameForm.password);
    
    if (result.success) {
      setSuccessMessage(result.message);
      setUsernameForm({
        newUsername: '',
        password: ''
      });
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage('Die Passwörter stimmen nicht überein');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setErrorMessage('Das neue Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }
    
    const result = changePassword(user.username, passwordForm.currentPassword, passwordForm.newPassword);
    
    if (result.success) {
      setSuccessMessage(result.message);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Einstellungen
        </Typography>
        
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
            {successMessage}
          </Alert>
        )}
        
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMessage('')}>
            {errorMessage}
          </Alert>
        )}
        
        <Paper sx={{ p: 0 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Benutzername" />
            <Tab label="Passwort" />
            <Tab label="Darstellung" />
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            {/* Benutzername ändern */}
            {activeTab === 0 && (
              <Box component="form" onSubmit={handleSubmitUsername}>
                <Typography variant="h6" gutterBottom>
                  Benutzername ändern
                </Typography>
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Aktueller Benutzername"
                  value={user.username}
                  disabled
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Neuer Benutzername"
                  name="newUsername"
                  value={usernameForm.newUsername}
                  onChange={handleUsernameChange}
                  required
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Passwort zur Bestätigung"
                  name="password"
                  type="password"
                  value={usernameForm.password}
                  onChange={handleUsernameChange}
                  required
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Benutzername ändern
                </Button>
              </Box>
            )}
            
            {/* Passwort ändern */}
            {activeTab === 1 && (
              <Box component="form" onSubmit={handleSubmitPassword}>
                <Typography variant="h6" gutterBottom>
                  Passwort ändern
                </Typography>
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Aktuelles Passwort"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Neues Passwort"
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  helperText="Mindestens 6 Zeichen"
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Passwort bestätigen"
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Passwort ändern
                </Button>
              </Box>
            )}
            
            {/* Darstellungsoptionen */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Darstellungsoptionen
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                      />
                    }
                    label="Dunkles Theme"
                  />
                  <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {mode === 'dark' 
                    ? 'Dunkles Theme ist aktiviert. Klicke auf den Schalter, um zum hellen Theme zu wechseln.' 
                    : 'Helles Theme ist aktiviert. Klicke auf den Schalter, um zum dunklen Theme zu wechseln.'}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Settings;
