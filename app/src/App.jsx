import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Missions from './pages/Missions';
import Gallery from './pages/Gallery';
import Dreams from './pages/Dreams';
import Profile from './pages/Profile';
import Layout from './components/Layout';

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

function AppContent() {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Home />} />
        <Route path="missoes" element={<Missions />} />
        <Route path="galeria" element={<Gallery />} />
        <Route path="banco" element={<Dreams />} />
        <Route path="perfil" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
}
