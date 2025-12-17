import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <--- IDI IMPORT CHESAM

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProfileSetup from './pages/ProfileSetup';

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
        
          style: {
            background: '#1f2937', 
            color: '#fff',         
            padding: '16px',
            borderRadius: '12px',
            fontSize: '16px',
            maxWidth: '500px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
       
          success: {
            iconTheme: {
              primary: '#10B981', 
              secondary: 'white',
            },
            style: {
              border: '1px solid #10B981',
            }
          },
        
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
            style: {
              border: '1px solid #EF4444',
            }
          },
        }}
      />
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;