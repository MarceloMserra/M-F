import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { ref, onValue, push } from 'firebase/database';
import { useUser } from '../context/UserContext';

export default function Devotional({ isOpen, onClose }) {
    const { user } = useUser();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Date Formatting
    const today = new Date();
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateString = today.toLocaleDateString('pt-BR', dateOptions);

    useEffect(() => {
        if (isOpen) {
            // Format: MM-DD
            const key = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            const devRef = ref(db, `devocionais/${key}`);
            const unsubscribe = onValue(devRef, (snap) => {
                setContent(snap.val());
                setLoading(false);
            });
            return () => unsubscribe();
        }
    }, [isOpen]);

    const handleRead = async () => {
        if (!content) return;
        await push(ref(db, 'historico'), {
            date: new Date().toLocaleDateString(),
            user: 'Nós',
            desc: 'Devocional Lido 📖',
            xp: 20,
            tipo: 'devocional'
        });
        alert('Amém! Palavra guardada no coração. (+20 XP)');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        className="bg-[#121212] w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl border border-brand-gold/30 relative z-10 shadow-2xl shadow-brand-gold/10 flex flex-col"
                    >
                        {/* Header Image/Gradient */}
                        <div className="h-32 bg-gradient-to-r from-brand-gold/20 to-brand-blue/20 flex items-center justify-center relative shrink-0">
                            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
                            <div className="text-center z-10">
                                <h3 className="text-brand-gold font-serif italic text-xl tracking-widest uppercase">Devocional Diário</h3>
                                <p className="text-white/60 text-sm">{dateString}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 bg-black/40 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] text-white/50">
                                <i className="fas fa-circle-notch fa-spin text-3xl text-brand-gold mb-4"></i>
                                <p>Buscando inspiração...</p>
                            </div>
                        ) : content ? (
                            <div className="p-6 md:p-8 space-y-8">

                                {/* Título Principal */}
                                <div className="text-center space-y-2">
                                    <h1 className="text-3xl md:text-4xl text-white font-bold font-serif leading-tight text-transparent bg-clip-text bg-gradient-to-b from-brand-gold to-yellow-700">
                                        {content.titulo}
                                    </h1>
                                </div>

                                {/* Versículo em Destaque */}
                                <div className="relative py-8 px-6 border-y border-white/10 bg-white/5">
                                    <i className="fas fa-quote-left absolute top-4 left-4 text-brand-gold/20 text-4xl"></i>
                                    <p className="text-xl md:text-2xl text-white/90 text-center font-serif italic leading-relaxed">
                                        "{content.verso}"
                                    </p>
                                    <i className="fas fa-quote-right absolute bottom-4 right-4 text-brand-gold/20 text-4xl"></i>
                                </div>

                                {/* Corpo do Texto */}
                                <div className="prose prose-invert max-w-none">
                                    {/* Introdução / História */}
                                    {content.historia && (
                                        <div className="text-gray-300 leading-relaxed text-lg mb-6 first-letter:text-5xl first-letter:font-serif first-letter:text-brand-gold first-letter:float-left first-letter:mr-3">
                                            {content.historia}
                                        </div>
                                    )}

                                    {/* Reflexão Profunda */}
                                    <div className="text-gray-300 leading-relaxed text-lg space-y-4">
                                        <strong className="text-brand-blue block text-sm uppercase tracking-widest mb-2 border-b border-brand-blue/30 pb-1 w-fit">Aprofundando a Palavra</strong>
                                        {content.reflexao.split('\n').map((paragraph, idx) => (
                                            <p key={idx}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Box de Desafio Prático */}
                                <div className="bg-gradient-to-br from-brand-gold/10 to-transparent border border-brand-gold/30 rounded-2xl p-6 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <i className="fas fa-running text-8xl text-brand-gold"></i>
                                    </div>

                                    <h4 className="text-brand-gold font-bold text-lg mb-3 flex items-center gap-2">
                                        <i className="fas fa-fire-alt"></i> Desafio Prático de Hoje
                                    </h4>
                                    <p className="text-white/90 text-lg italic border-l-4 border-brand-gold pl-4">
                                        {content.desafio || "Orem juntos agradecendo por esta palavra."}
                                    </p>
                                </div>

                                {/* Botão de Ação */}
                                <button
                                    onClick={handleRead}
                                    className="w-full bg-brand-gold hover:bg-yellow-500 text-black font-bold text-xl py-5 rounded-2xl shadow-xl shadow-yellow-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                >
                                    <i className="fas fa-check-circle"></i>
                                    <span>Lemos e Aceitamos o Desafio!</span>
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-20 space-y-4">
                                <i className="fas fa-bible text-6xl text-white/10"></i>
                                <h2 className="text-white text-xl">Nenhum devocional hoje.</h2>
                                <button onClick={onClose} className="text-brand-gold underline">Voltar</button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
