import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import { useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSucces = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated && <LoginForm onLoginSuccess={handleLoginSucces} />}
      {isAuthenticated && <HomePage />}
    </div>
  );
};

export default App;
