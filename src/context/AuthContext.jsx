// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Voreingestellte Benutzer
const defaultUsers = [
  { username: 'admin', password: 'password' }
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
  });

  // Speichere Benutzer im localStorage
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, user]);

  const login = (username, password) => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setIsAuthenticated(true);
      setUser({ username: foundUser.username });
      return true;
    }
    return false;
  };

  const loginAsGuest = () => {
    setIsAuthenticated(true);
    setUser({ username: 'Gast', isGuest: true });
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = (username, password) => {
    if (users.some(u => u.username === username)) {
      return false; // Benutzername bereits vergeben
    }
    
    setUsers([...users, { username, password }]);
    return true;
  };

  // Neue Funktionen für Einstellungen
  const changeUsername = (currentUsername, newUsername, password) => {
    // Überprüfe, ob der neue Benutzername bereits vergeben ist
    if (users.some(u => u.username === newUsername)) {
      return { success: false, message: 'Benutzername bereits vergeben' };
    }

    // Überprüfe, ob das Passwort korrekt ist
    const userIndex = users.findIndex(u => u.username === currentUsername);
    if (userIndex === -1 || users[userIndex].password !== password) {
      return { success: false, message: 'Falsches Passwort' };
    }

    // Aktualisiere den Benutzernamen
    const updatedUsers = [...users];
    updatedUsers[userIndex].username = newUsername;
    setUsers(updatedUsers);

    // Aktualisiere den aktuellen Benutzer
    setUser({ ...user, username: newUsername });

    return { success: true, message: 'Benutzername erfolgreich geändert' };
  };

  const changePassword = (username, currentPassword, newPassword) => {
    // Überprüfe, ob das aktuelle Passwort korrekt ist
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1 || users[userIndex].password !== currentPassword) {
      return { success: false, message: 'Aktuelles Passwort ist falsch' };
    }

    // Aktualisiere das Passwort
    const updatedUsers = [...users];
    updatedUsers[userIndex].password = newPassword;
    setUsers(updatedUsers);

    return { success: true, message: 'Passwort erfolgreich geändert' };
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      register,
      loginAsGuest,
      changeUsername,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
