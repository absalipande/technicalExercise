import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';

const AuthContext = React.createContext({
  isAuthenticated: false,
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showHome, setShowHome] = useState(false);

  const handleLoginSuccess = () => setIsAuthenticated(true);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <div>
        {isAuthenticated ? (
          <button onClick={() => setShowHome(true)}>Go to Home Page</button>
        ) : (
          <LoginForm
            onLoginSuccess={() => handleLoginSuccess(setShowHome(true))}
          />
        )}
        {showHome && <HomePage />}
      </div>
    </AuthContext.Provider>
  );
};

export default App;
