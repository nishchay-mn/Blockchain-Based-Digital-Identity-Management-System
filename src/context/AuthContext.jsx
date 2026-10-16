import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('trustid_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Default to Identity Holder for an interactive first impression
    return INITIAL_USERS[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('trustid_is_authenticated') !== 'false';
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('trustid_current_user', JSON.stringify(currentUser));
      localStorage.setItem('trustid_is_authenticated', 'true');
    } else {
      localStorage.removeItem('trustid_current_user');
      localStorage.setItem('trustid_is_authenticated', 'false');
    }
  }, [currentUser]);

  // Switch role quickly for presentation/demonstration
  const switchRole = (roleName) => {
    const targetUser = INITIAL_USERS.find((u) => u.role === roleName) || INITIAL_USERS[0];
    setCurrentUser(targetUser);
    setIsAuthenticated(true);
  };

  const login = (email, password, role) => {
    // Simulated authentication with mock credentials
    const found = INITIAL_USERS.find(
      (u) => (email ? u.email.toLowerCase() === email.toLowerCase() : true) && (role ? u.role === role : true)
    ) || INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];

    setCurrentUser(found);
    setIsAuthenticated(true);
    return { success: true, user: found };
  };

  const register = ({ name, email, role, organization }) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role: role || 'holder',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250`,
      did: `did:trustid:0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      status: role === 'issuer' ? 'pending' : 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      organization: organization || 'Independent',
      bio: 'New registered digital identity subject.',
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        role: currentUser?.role || 'guest',
        login,
        register,
        logout,
        switchRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
