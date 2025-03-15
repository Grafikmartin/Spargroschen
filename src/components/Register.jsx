// src/components/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Typography, 
  Alert,
  Container,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Importiere das Bild direkt
import zasterZenLogo from '/ZasterZen-203847.png';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      return;
    }
    
    const success = register(formData.username, formData.password);
    if (success) {
      navigate('/login', { state: { message: 'Registrierung erfolgreich! Du kannst dich jetzt anmelden.' } });
    } else {
      setError('Benutzername bereits vergeben');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      {/* AppBar mit Zurück-Button */}
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            aria-label="zurück"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Registrieren
          </Typography>
          <Box sx={{ width: 48 }} /> {/* Platzhalter für Ausrichtung */}
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          py: 4,
          mt: 6 // Abstand für die AppBar
        }}>
          <Paper sx={{ p: 4, width: '100%' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <img 
                src={zasterZenLogo} 
                alt="ZasterZen" 
                style={{ height: '40px' }}
              />
            </Box>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Benutzername"
                name="username"
                margin="normal"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Passwort"
                name="password"
                type="password"
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Passwort bestätigen"
                name="confirmPassword"
                type="password"
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <Button 
                fullWidth 
                variant="contained" 
                type="submit" 
                sx={{ mt: 3 }}
              >
                Registrieren
              </Button>
              
              {/* Neuer Button statt Link */}
              <Button 
                fullWidth 
                variant="contained" 
                onClick={handleLoginClick}
                sx={{ 
                  mt: 2,
                  backgroundColor: '#78a6a3',
                  '&:hover': {
                    backgroundColor: '#5d8a87',
                  }
                }}
              >
                Bereits registriert? Anmelden
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default Register;
