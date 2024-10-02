import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/auth/Login";
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import useAuth from './context/Authcontext';

const ProtectedRoute = ({ children }) => {
  const { authenticateUser } = useAuth();

  if (!authenticateUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const { authenticateUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={authenticateUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authenticateUser ? <Navigate to="/" /> : <Signup />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
