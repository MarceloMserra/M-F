import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

export default function Login() {
    const { login } = useUser();

    const handleLogin = (name) => {
        const theme = name === 'Marcelo' ? 'blue' : 'pink';
        login({ name, theme });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card w-full max-w-md text-center z-10 relative"
            >
                <h1 className="text-3xl font-serif text-brand-gold mb-2">Bem-vindos</h1>
                <p className="text-white/80 mb-8">Quem está por aqui hoje?</p>

                <div className="grid grid-cols-2 gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLogin('Marcelo')}
                        className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-900/50 to-blue-600/30 border border-blue-500/30 hover:border-blue-400 transition-all"
                    >
                        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-3xl shadow-lg ring-4 ring-blue-500/20">
                            👨🏻
                        </div>
                        <span className="font-bold text-blue-200">Marcelo</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLogin('Fernanda')}
                        className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-pink-900/50 to-pink-600/30 border border-pink-500/30 hover:border-pink-400 transition-all"
                    >
                        <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center text-3xl shadow-lg ring-4 ring-pink-500/20">
                            👩🏻
                        </div>
                        <span className="font-bold text-pink-200">Fernanda</span>
                    </motion.button>
                </div>

                <p className="mt-8 text-xs text-white/40">
                    "O amor é paciente, o amor é bondoso."
                </p>
            </motion.div>
        </div>
    );
}
