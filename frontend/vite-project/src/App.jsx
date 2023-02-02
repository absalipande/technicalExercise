import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' component={LoginForm} />
        <Route path='/home' component={HomePage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
