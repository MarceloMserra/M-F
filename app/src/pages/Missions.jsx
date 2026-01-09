import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { db } from '../lib/firebase';
import { ref, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const MISSOES_LISTA = [
    "Dê um abraço de urso de 1 minuto em silêncio.",
    "Elogie 3 coisas que você admira no outro.",
    "Faça uma massagem de 5 minutos.",
    "Prepare uma bebida ou lanche surpresa.",
    "Relembrem juntos o primeiro encontro.",
    "Dancem uma música lenta na sala.",
    "Faça uma oração de mãos dadas.",
    "Escreva um bilhete de amor escondido.",
    "Desliguem os celulares por 30 min para conversar.",
    "Planejem um detalhe da viagem de 2026."
];

export default function Missions() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [mission, setMission] = useState(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        const storedKey = `mission-${user.name}-${today}`;
        const stored = localStorage.getItem(storedKey);
        const isRevealed = localStorage.getItem(`${storedKey}-revealed`);

        if (stored) {
            setMission(stored);
            if (isRevealed) setRevealed(true);
        }
    }, [user]);

    const drawMission = () => {
        const today = new Date().toLocaleDateString();
        const storedKey = `mission-${user.name}-${today}`;
        const random = MISSOES_LISTA[Math.floor(Math.random() * MISSOES_LISTA.length)];
        localStorage.setItem(storedKey, random);
        setMission(random);
    };

    const revealMission = () => {
        const today = new Date().toLocaleDateString();
        const storedKey = `mission-${user.name}-${today}`;
        localStorage.setItem(`${storedKey}-revealed`, 'true');
        setRevealed(true);
    };

    const completeMission = async () => {
        if (confirm("Concluiu a missão? +10 XP")) {
            await push(ref(db, 'historico'), {
                date: new Date().toLocaleDateString(),
                user: user.name,
                desc: `Missão Cumprida: ${mission}`,
                xp: 10,
                tipo: 'missao'
            });
            alert('Parabéns! +10 XP');
            navigate('/');
        }
    };

    return (
        <div className="p-6 pb-24 space-y-8 flex flex-col items-center justify-center min-h-[80vh] relative">

            {/* Close Button - SVG for Guarantee */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-4 right-4 bg-white/10 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all z-50"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center space-y-2">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border border-white/20 ${user.name === 'Marcelo' ? 'bg-blue-500 shadow-blue-500/50' : 'bg-pink-500 shadow-pink-500/50'}`}>
                    {user.name === 'Marcelo' ? '🧔🏻' : '👩🏻'}
                </div>
                <h2 className="text-2xl font-serif text-brand-gold">Missão de Hoje</h2>
                <p className="text-white/60 text-sm">Psiu! É segredo...</p>
            </div>

            {!mission ? (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={drawMission}
                    className="btn-primary w-full max-w-xs animate-bounce"
                >
                    <i className="fas fa-dice mr-2"></i> Sortear Missão
                </motion.button>
            ) : (
                <div className="w-full max-w-sm">
                    {!revealed ? (
                        <motion.div
                            initial={{ rotateX: 90 }}
                            animate={{ rotateX: 0 }}
                            className="glass-card h-64 flex flex-col items-center justify-center text-center p-8 border-dashed border-2 border-brand-gold/30 cursor-pointer hover:bg-white/5 transition-colors"
                            onClick={revealMission}
                        >
                            <i className="fas fa-eye-slash text-4xl text-white/20 mb-4"></i>
                            <p className="font-bold text-white/80">Toque para revelar</p>
                            <p className="text-xs text-brand-pink mt-2">Certifique-se que o outro não está olhando!</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass-card flex flex-col justify-between min-h-[250px] relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold to-brand-pink"></div>

                            <div className="flex-1 flex items-center justify-center py-6">
                                <p className="text-xl font-serif text-center leading-relaxed drop-shadow-md">
                                    "{mission}"
                                </p>
                            </div>

                            <button
                                onClick={completeMission}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                            >
                                <i className="fas fa-check-circle"></i> Concluído (+10 XP)
                            </button>
                        </motion.div>
                    )}
                </div>
            )}

        </div>
    );
}
