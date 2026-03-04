import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserProfile } from '../services/api';
import toast from 'react-hot-toast';

const ProfileSetup = () => {
  const navigate = useNavigate();

  // --- THEME LOGIC ---
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // --- FORM LOGIC ---
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

  // --- DYNAMIC STYLES CONFIGURATION ---
  const goalStyles = {
    'Weight Loss': {
      activeBorder: 'border-orange-500',
      activeBg: 'bg-orange-50 dark:bg-orange-900/20',
      hoverBorder: 'hover:border-orange-400',
      hoverBg: 'hover:bg-orange-50 dark:hover:bg-orange-900/10',
      activeText: 'text-orange-600 dark:text-orange-400',
      buttonGradient: 'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-orange-500/30'
    },
    'Maintenance': {
      activeBorder: 'border-emerald-500',
      activeBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      hoverBorder: 'hover:border-emerald-400',
      hoverBg: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/10',
      activeText: 'text-emerald-600 dark:text-emerald-400',
      buttonGradient: 'from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/30'
    },
    'Muscle Gain': {
      activeBorder: 'border-blue-500',
      activeBg: 'bg-blue-50 dark:bg-blue-900/20',
      hoverBorder: 'hover:border-blue-400',
      hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/10',
      activeText: 'text-blue-600 dark:text-blue-400',
      buttonGradient: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30'
    }
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

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white font-semibold outline-none transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700/80 hover:scale-[1.02] hover:shadow-sm focus:border-gray-400 dark:focus:border-gray-500 focus:scale-[1.02]";

  return (
    <div className="min-h-screen font-sans transition-colors duration-300
      bg-gray-50 dark:bg-gray-900 flex justify-center items-center py-10 px-4">
      
      {/* THEME TOGGLE */}
      <button 
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 
        hover:scale-110 hover:shadow-xl transition-all duration-300"
      >
        <span className="text-xl">
          {theme === "light" ? "🌙" : "☀️"}
        </span>
      </button>

      {/* MAIN CARD */}
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        {/* HEADER (Replaced Black with Emerald Gradient) */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-50"></div> {/* Subtle shine */}
            
            <div className="relative z-10">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight drop-shadow-sm">
                Let's Get to Know You
                </h2>
                <p className="text-emerald-50 text-lg font-medium">
                Fill in the details to unlock your AI Health Plan.
                </p>
            </div>
        </div>

        {/* FORM SECTION */}
        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* ROW 1: AGE & GENDER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 group">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 ml-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Your Age</label>
                <input name="age" type="number" placeholder="e.g. 25" onChange={handleChange} required className={inputClasses} />
              </div>

              <div className="flex flex-col gap-2 group">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 ml-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Gender</label>
                <select name="gender" onChange={handleChange} className={`${inputClasses} cursor-pointer appearance-none`}>
                  <option value="Male">Male 👨</option>
                  <option value="Female">Female 👩</option>
                </select>
              </div>
            </div>

            {/* ROW 2: HEIGHT & WEIGHT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 group">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 ml-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Height (cm)</label>
                <input name="height" type="number" placeholder="e.g. 175" onChange={handleChange} required className={inputClasses} />
              </div>

              <div className="flex flex-col gap-2 group">
                <label className="text-sm font-bold text-gray-500 dark:text-gray-400 ml-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Weight (kg)</label>
                <input name="weight" type="number" placeholder="e.g. 70" onChange={handleChange} required className={inputClasses} />
              </div>
            </div>

            {/* ROW 3: GOAL SELECTION (Dynamic Colors) */}
            <div className="mt-8">
              <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 ml-1">
                Choose your target 🎯
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'Weight Loss', emoji: '🔥' },
                  { id: 'Maintenance', emoji: '🧘' },
                  { id: 'Muscle Gain', emoji: '💪' }
                ].map((item) => {
                    const style = goalStyles[item.id];
                    const isSelected = formData.goal === item.id;

                    return (
                        <label key={item.id} 
                            className={`cursor-pointer relative p-5 rounded-2xl border-2 transition-all duration-300 ease-out flex flex-col items-center justify-center gap-3 shadow-sm
                            ${style.hoverBorder} ${style.hoverBg} hover:scale-105 hover:shadow-lg
                            ${isSelected 
                            ? `${style.activeBorder} ${style.activeBg} scale-105 shadow-md ring-1 ring-offset-2 dark:ring-offset-gray-800 ring-transparent` 
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
                        >
                            <input type="radio" name="goal" value={item.id} checked={isSelected} onChange={handleChange} className="hidden" />
                            
                            <span className="text-4xl transform transition-transform duration-300 group-hover:scale-110 drop-shadow-sm">{item.emoji}</span>
                            
                            <span className={`font-bold text-sm tracking-wide transition-colors duration-300
                                ${isSelected ? style.activeText : 'text-gray-600 dark:text-gray-400'}`}>
                                {item.id}
                            </span>
                        </label>
                    );
                })}
              </div>
            </div>

            {/* DYNAMIC SUBMIT BUTTON */}
            <button type="submit" className={`w-full py-4 mt-8 rounded-2xl font-black text-lg text-white shadow-xl
              bg-gradient-to-r ${goalStyles[formData.goal].buttonGradient}
              transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-500`}>
              Generate {formData.goal} Plan 🚀
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;