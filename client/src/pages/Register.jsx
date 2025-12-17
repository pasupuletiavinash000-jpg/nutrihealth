import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import toast from 'react-hot-toast'; // <--- Stylish Popup Library

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // --- THEME LOGIC (Dark/Light) ---
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // --- FORM HANDLERS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Show Loading Toast
    const loadingToast = toast.loading('Creating your account...');

    try {
      await registerUser(formData);
      
      // 2. Success Toast
      toast.dismiss(loadingToast); // Stop loading
      toast.success('Account Created Successfully! 🎉');
      
      // 3. Redirect to Login
      setTimeout(() => {
        navigate('/login');
      }, 1500); // 1.5 Seconds wait chesi Login ki vellu

    } catch (error) {
      // 4. Error Toast
      toast.dismiss(loadingToast); // Stop loading
      toast.error(error.response?.data?.message || 'Registration Failed. Try again.');
    }
  };

  return (
    // BACKGROUND: Consistent Gradient & Dark Mode
    <div className="min-h-screen flex justify-center items-center transition-colors duration-500
      bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 
      dark:from-gray-900 dark:via-gray-800 dark:to-black">
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="absolute top-5 right-5 bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-110 transition-transform text-white font-bold border border-white/30"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {/* CARD DESIGN: Glassmorphism */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-96 border border-white/20 dark:border-gray-700 transform transition-all hover:scale-[1.01] duration-300">
        
        <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-cyan-400">
          Join NutriHealth
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div className="group">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 group-hover:text-emerald-600 transition-colors">Full Name</label>
            <input 
              name="name" 
              type="text" 
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none 
              focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 
              hover:border-emerald-400 transition-all duration-300 dark:text-white"
              placeholder="Enter your name"
              onChange={handleChange} 
              required
            />
          </div>

          {/* Email */}
          <div className="group">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 group-hover:text-emerald-600 transition-colors">Email Address</label>
            <input 
              name="email" 
              type="email" 
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none 
              focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 
              hover:border-emerald-400 transition-all duration-300 dark:text-white"
              placeholder="Enter your email"
              onChange={handleChange} 
              required
            />
          </div>

          {/* Password */}
          <div className="group">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 group-hover:text-emerald-600 transition-colors">Password</label>
            <input 
              name="password" 
              type="password" 
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none 
              focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 
              hover:border-emerald-400 transition-all duration-300 dark:text-white"
              placeholder="Create password"
              onChange={handleChange} 
              required
            />
          </div>

          {/* Register Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg 
            hover:shadow-emerald-500/50 hover:scale-105 hover:from-emerald-400 hover:to-teal-500
            active:scale-95 transition-all duration-300"
          >
            Sign Up Now ✨
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline hover:text-emerald-500 transition-colors">Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;