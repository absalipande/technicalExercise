import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import { useState } from 'react';

// create a context
const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {!isAuthenticated && <LoginForm onLoginSuccess={handleLoginSuccess} />}
      {isAuthenticated && <HomePage />}
    </AuthContext.Provider>
  );
};

export default App;
