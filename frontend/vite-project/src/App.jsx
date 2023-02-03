import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';

const AuthContext = React.createContext({
  isAuthenticated: false,
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => setIsAuthenticated(true);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
