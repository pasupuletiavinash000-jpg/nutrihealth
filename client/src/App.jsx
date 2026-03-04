import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages Imports
import Landing from './pages/Landing';        
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProfileSetup from './pages/ProfileSetup';

function App() {
  // User login ayyi unnada leda ani check chestundi
  const isAuth = !!localStorage.getItem('token'); 

  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes (Login ayithe tappa open avvavu) */}
        <Route 
          path="/dashboard" 
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile-setup" 
          element={isAuth ? <ProfileSetup /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;