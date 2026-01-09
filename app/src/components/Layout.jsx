import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { id: '/', icon: 'fa-home', label: 'Início' },
        { id: '/missoes', icon: 'fa-bullseye', label: 'Missões' },
        { id: '/galeria', icon: 'fa-images', label: 'Galeria' },
        { id: '/banco', icon: 'fa-landmark', label: 'Sonhos' },
    ];

    return (
        <div className="pb-24 pt-24 pt-[env(safe-area-inset-top)] max-w-md mx-auto min-h-screen relative">
            <main className="animate-fade-in">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-4 left-4 right-4 max-w-md mx-auto glass rounded-2xl p-2 flex justify-around items-center z-50">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => navigate(tab.id)}
                            className={`relative flex flex-col items-center p-2 transition-colors ${isActive ? 'text-brand-gold' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -top-2 w-8 h-1 bg-brand-gold rounded-full shadow-[0_0_10px_#ffd700]"
                                />
                            )}
                            <i className={`fas ${tab.icon} text-xl mb-1`}></i>
                            <span className="text-[10px] font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
