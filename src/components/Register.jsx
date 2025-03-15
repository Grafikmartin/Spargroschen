// src/components/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Typography, 
  Alert,
  Container
} from '@mui/material';

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
          <Typography variant="h5" gutterBottom align="center">
            ZasterZen
          </Typography>
          
          <Typography variant="h6" gutterBottom align="center">
            Registrieren
          </Typography>
          
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
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Bereits registriert? Anmelden
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;
