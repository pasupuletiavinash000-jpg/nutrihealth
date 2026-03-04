import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-emerald-100">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🥗</span>
            <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              NutriHealth
            </h1>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/login')} className="px-6 py-2 rounded-full font-bold text-gray-600 hover:bg-gray-100 transition">Login</button>
            <button onClick={() => navigate('/register')} className="px-6 py-2 rounded-full font-bold bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition hover:scale-105">Get Started</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
        <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-6 animate-fade-in">🚀 AI-Powered Health Plans</span>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
          Your Personal <span className="text-emerald-500">Diet & Health</span> Assistant
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Get customized diet plans, track your BMI, and achieve your fitness goals with our smart AI advisor. Simple, Effective, and Free.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/register')} className="px-8 py-4 rounded-xl font-bold text-xl bg-gray-900 text-white hover:bg-black transition shadow-2xl hover:-translate-y-1">Start Your Journey</button>
        </div>
      </header>

      {/* FEATURES GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 hover:scale-105 transition">
                <div className="text-4xl mb-4">🥗</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Smart Diet Plans</h3>
                <p className="text-gray-600">Get meal recommendations based on your BMI and health goals.</p>
            </div>
            <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 hover:scale-105 transition">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">BMI Tracker</h3>
                <p className="text-gray-600">Instantly calculate your BMI and understand your health status.</p>
            </div>
            <div className="p-8 rounded-3xl bg-purple-50 border border-purple-100 hover:scale-105 transition">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">Instant Results</h3>
                <p className="text-gray-600">No waiting time. Get your personalized dashboard in seconds.</p>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-400 border-t border-gray-100">
        <p>© 2025 NutriHealth Advisor. Built for health.</p>
      </footer>

    </div>
  );
};

export default Landing;