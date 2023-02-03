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

  const handleLoginSucces = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <LoginForm onLoginSuccess={handleLoginSucces} />
      <HomePage />
    </AuthContext.Provider>
  );
};

export default App;
