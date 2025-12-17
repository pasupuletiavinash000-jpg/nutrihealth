import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserProfile } from '../services/api';
import toast from 'react-hot-toast';

const ProfileSetup = () => {
  const navigate = useNavigate();
  

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

  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    activity_level: '1.2',
    goal: 'Maintenance',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Calculating your personalized plan...');
    
    try {
      await saveUserProfile(formData);
      toast.dismiss(loadingToast);
      toast.success('Profile Set! Redirecting... 🚀');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Error saving profile.');
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 font-sans selection:bg-emerald-500 selection:text-white
      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-black flex justify-center items-center py-10 px-4">
      
  
      <button 
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md p-4 rounded-full shadow-2xl border border-white/20 
        hover:scale-125 hover:rotate-12 transition-all duration-300 group"
      >
        <span className="text-2xl group-hover:animate-spin">
          {theme === "light" ? "🌙" : "☀️"}
        </span>
      </button>

   
      <div className="w-full max-w-4xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-gray-700 overflow-hidden animate-fade-in relative">
        
   
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="p-8 md:p-12">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-purple-600 dark:from-emerald-400 dark:to-purple-400 mb-2 text-center">
            Let's Get to Know You
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-10 text-lg">
            Fill in the details to unlock your AI Health Plan.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
              <div className="group relative">
                <label className="absolute -top-3 left-4 bg-white dark:bg-gray-800 px-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 transition-all group-hover:scale-110">
                  Your Age
                </label>
                <input name="age" type="number" placeholder="25" onChange={handleChange} required 
                  className="w-full p-5 bg-transparent border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-xl font-bold outline-none 
                  text-gray-700 dark:text-white
                  focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 
                  hover:scale-[1.05] hover:shadow-xl hover:border-emerald-400 transition-all duration-300 transform" 
                />
              </div>

              
              <div className="group relative">
                 <label className="absolute -top-3 left-4 bg-white dark:bg-gray-800 px-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 transition-all group-hover:scale-110">
                  Gender
                </label>
                <select name="gender" onChange={handleChange} 
                  className="w-full p-5 bg-transparent border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-xl font-bold outline-none 
                  text-gray-700 dark:text-white cursor-pointer
                  focus:border-emerald-500 
                  hover:scale-[1.05] hover:shadow-xl hover:border-emerald-400 transition-all duration-300 transform appearance-none"
                >
                  <option className="text-black" value="Male">Male 👨</option>
                  <option className="text-black" value="Female">Female 👩</option>
                </select>
              </div>
            </div>

            {/* ROW 2: BODY STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative">
                 <label className="absolute -top-3 left-4 bg-white dark:bg-gray-800 px-2 text-sm font-bold text-purple-600 dark:text-purple-400 transition-all group-hover:scale-110">
                  Height (cm)
                </label>
                <input name="height" type="number" placeholder="175" onChange={handleChange} required 
                  className="w-full p-5 bg-transparent border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-xl font-bold outline-none 
                  text-gray-700 dark:text-white
                  focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 
                  hover:scale-[1.05] hover:shadow-xl hover:border-purple-400 transition-all duration-300 transform" 
                />
              </div>

              <div className="group relative">
                 <label className="absolute -top-3 left-4 bg-white dark:bg-gray-800 px-2 text-sm font-bold text-purple-600 dark:text-purple-400 transition-all group-hover:scale-110">
                  Weight (kg)
                </label>
                <input name="weight" type="number" placeholder="70" onChange={handleChange} required 
                  className="w-full p-5 bg-transparent border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-xl font-bold outline-none 
                  text-gray-700 dark:text-white
                  focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 
                  hover:scale-[1.05] hover:shadow-xl hover:border-purple-400 transition-all duration-300 transform" 
                />
              </div>
            </div>

            {/* ROW 3: GOAL SELECTION (INTERACTIVE TILES) */}
            <div>
              <label className="block text-gray-500 dark:text-gray-400 font-bold mb-4 ml-2">Choose your target 🎯</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'Weight Loss', emoji: '🔥', color: 'hover:border-orange-500 hover:shadow-orange-500/30' },
                  { id: 'Maintenance', emoji: '🧘', color: 'hover:border-emerald-500 hover:shadow-emerald-500/30' },
                  { id: 'Muscle Gain', emoji: '💪', color: 'hover:border-blue-500 hover:shadow-blue-500/30' }
                ].map((item) => (
                  <label key={item.id} className={`cursor-pointer relative overflow-hidden p-6 rounded-2xl border-2 transition-all duration-300 transform 
                    ${formData.goal === item.id 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 scale-105 shadow-xl' 
                      : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:scale-110'} 
                    ${item.color}`}>
                    
                    <input type="radio" name="goal" value={item.id} checked={formData.goal === item.id} onChange={handleChange} className="hidden" />
                    
                    <div className="text-center">
                      <div className="text-4xl mb-2 animate-bounce-slow">{item.emoji}</div>
                      <div className={`font-bold ${formData.goal === item.id ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-300'}`}>
                        {item.id}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button type="submit" className="w-full py-5 rounded-2xl font-black text-xl text-white shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95
              bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400">
              Generating Diet Plan... ✨
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;