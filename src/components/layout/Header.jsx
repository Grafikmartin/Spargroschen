// src/components/layout/Header.jsx
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Importiere das Bild direkt
import zasterZenLogo from '/ZasterZen.png';

function Header({ onMenuClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setAnchorEl(null);
  };

  const handleSettings = () => {
    navigate('/settings');
    setAnchorEl(null);
  };

  // Diese Funktion muss direkt zur Hilfeseite navigieren
  const handleHelp = () => {
    console.log("Navigiere zur Hilfeseite"); // Debug-Ausgabe
    navigate('/help'); // Stelle sicher, dass dies korrekt ist
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        {/* Logo */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img 
            src={zasterZenLogo} 
            alt="ZasterZen" 
            style={{ height: '24px' }}
          />
        </Box>
        
        {/* Hilfe-Button - Verwende Link statt onClick für direktere Navigation */}
        <IconButton 
          color="inherit" 
          component={Link}
          to="/help"
          sx={{ mr: 1 }}
          aria-label="Hilfe"
        >
          <HelpIcon />
        </IconButton>
        
        {/* Theme-Toggle-Button */}
        <IconButton 
          color="inherit" 
          onClick={toggleTheme} 
          sx={{ mr: 1 }}
          aria-label={mode === 'dark' ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln'}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        
        {user && (
          <Chip
            label={user.isGuest ? "Gast" : user.username}
            color={user.isGuest ? "default" : "primary"}
            variant="outlined"
            sx={{ mr: 2, color: 'white', borderColor: 'white' }}
          />
        )}
        
        <div>
          <IconButton
            size="large"
            aria-label="Benutzerkonto"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSettings}>Einstellungen</MenuItem>
            <MenuItem onClick={handleLogout}>Abmelden</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
