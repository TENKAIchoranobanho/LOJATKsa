import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Carregar usuário do localStorage ao montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAdmin(userData.isAdmin || false);
    }
    setLoading(false);
  }, []);

  const login = (email, password, isAdmin = false) => {
    // Simular login - em produção seria uma chamada à API
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      isAdmin,
      createdAt: new Date().toISOString(),
      addresses: [],
      orders: [],
    };
    
    setUser(userData);
    setIsAdmin(isAdmin);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const register = (email, password, name) => {
    // Simular registro
    const userData = {
      id: Date.now(),
      email,
      name,
      isAdmin: false,
      createdAt: new Date().toISOString(),
      addresses: [],
      orders: [],
    };
    
    setUser(userData);
    setIsAdmin(false);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
