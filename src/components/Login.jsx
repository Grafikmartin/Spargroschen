// src/components/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Typography, 
  Alert,
  Container,
  Divider
} from '@mui/material';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Prüfe, ob eine Erfolgsmeldung von der Registrierung übergeben wurde
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const success = login(credentials.username, credentials.password);
    if (success) {
      navigate('/');
    } else {
      setError('Ungültiger Benutzername oder Passwort');
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        py: 4
      }}>
        <Paper sx={{ p: 4, width: '100%' }}>
          {/* Logo anstelle des Textes */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <img 
              src={`${process.env.PUBLIC_URL}/ZasterZen.png`} 
              alt="ZasterZen" 
              style={{ height: '80px' }}
            />
          </Box>
          
          <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 3 }}>
            Bitte melde dich an
          </Typography>
          
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          
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
              value={credentials.username}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Passwort"
              name="password"
              type="password"
              margin="normal"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <Button 
              fullWidth 
              variant="contained" 
              type="submit" 
              sx={{ mt: 3 }}
            >
              Anmelden
            </Button>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Noch kein Konto? Registrieren
              </Link>
            </Box>
            
            <Divider sx={{ my: 3 }}>oder</Divider>
            
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={handleGuestLogin}
            >
              Als Gast fortfahren
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
