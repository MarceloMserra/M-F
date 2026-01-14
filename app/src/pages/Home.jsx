import { useState, useEffect } from 'react';
import { useAppData } from '../hooks/useAppData';
import { useUser } from '../context/UserContext';
import { formatter, getTravelStatus, GOALS } from '../utils/gameLogic';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { ref, push, onValue, remove } from 'firebase/database';
import Devotional from '../components/Devotional';

export default function Home() {
    const { user, logout } = useUser();
    const { xp, level, money, loading, history = [] } = useAppData();
    const [showDevotional, setShowDevotional] = useState(false);
    const [showGoals, setShowGoals] = useState(false);
    const [showRewards, setShowRewards] = useState(false);

    // ... (existing code)

    return (
        <div className="p-5 space-y-6 pb-28">
            <Devotional isOpen={showDevotional} onClose={() => setShowDevotional(false)} />

            {/* Rewards Modal */}
            <AnimatePresence>
                {showRewards && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setShowRewards(false)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#1a1a1a] w-full max-w-sm rounded-2xl p-6 border border-brand-gold/20 max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-serif text-brand-gold">Galeria de Conquistas</h2>
                                <p className="text-white/50 text-xs">Desbloqueie prêmios atingindo os níveis!</p>
                            </div>

                            <div className="space-y-4">
                                {LEVELS.map((lvl) => {
                                    const isUnlocked = xp >= lvl.max;
                                    const isNext = !isUnlocked && xp < lvl.max && (lvl.id === 1 || xp >= LEVELS[lvl.id - 2]?.max);

                                    return (
                                        <div key={lvl.id} className={`p-4 rounded-xl border ${isUnlocked ? 'bg-brand-gold/10 border-brand-gold/50' : 'bg-white/5 border-white/5 grayscale opacity-60'}`}>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className={`font-bold ${isUnlocked ? 'text-brand-gold' : 'text-white/50'}`}>Nível {lvl.nome}</h3>
                                                {isUnlocked ? <i className="fas fa-check-circle text-green-400"></i> : <i className="fas fa-lock text-white/30"></i>}
                                            </div>
                                            <p className="text-white text-sm font-medium mb-1">🎁 {lvl.premio}</p>
                                            <p className="text-[10px] text-white/40">{lvl.max} XP Necessários</p>
                                        </div>
                                    )
                                })}
                            </div>

                            <button onClick={() => setShowRewards(false)} className="mt-6 w-full py-3 bg-white/10 rounded-xl text-white font-bold">Fechar</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header with Profile Menu */}
            <div className="flex justify-between items-center relative z-20">
                {/* ... existing header code ... */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 border-white/20 shadow-lg overflow-hidden ${user.name === 'Marcelo' ? 'bg-blue-600' : 'bg-pink-600'}`}>
                        {user.photoURL ? <img src={user.photoURL} alt="Me" className="w-full h-full object-cover" /> : (user.name === 'Marcelo' ? '🧔🏻' : '👩🏻')}
                    </div>
                    <div>
                        <h2 className="text-xs text-white/50 uppercase tracking-widest leading-none mb-1">Olá,</h2>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-white leading-none">{user.name}</h1>
                            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {showProfileMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute top-14 left-0 bg-[#222] border border-white/10 rounded-xl p-2 z-50 shadow-2xl w-56 backdrop-blur-xl"
                        >
                            <button onClick={() => window.location.href = '/perfil'} className="w-full text-left px-4 py-2 text-white hover:bg-white/5 rounded-lg flex items-center gap-2 mb-1">
                                <i className="fas fa-user-circle text-brand-gold"></i> Meu Perfil / Foto
                            </button>
                            <div className="h-px bg-white/10 my-1"></div>
                            <button onClick={logout} className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 rounded-lg flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Sair do App
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Conselheiro Button */}
                <a
                    href="https://conselheirocasal.netlify.app/"
                    target="_blank"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
                >
                    <i className="fas fa-robot text-lg"></i>
                    <span className="text-xs">Conselheiro</span>
                </a>
            </div>

            {/* Devotional Shortcut */}
            <button onClick={() => setShowDevotional(true)} className="w-full btn-card-gold flex items-center justify-between group active:scale-95 transition-transform">
                <div className="flex items-center gap-3 text-white">
                    <div className="bg-white/20 p-2 rounded-full"><i className="fas fa-bible"></i></div>
                    <div className="text-left">
                        <h3 className="font-bold text-sm">Devocional do Casal</h3>
                        <p className="text-[10px] text-white/80">Palavra de hoje</p>
                    </div>
                </div>
                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Level Card */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card relative overflow-hidden">
                <div className="flex justify-between items-end relative z-10">
                    <div>
                        <span className="text-xs font-bold tracking-wider text-brand-gold uppercase mb-1 block">Nível Atual</span>
                        <h1 className="text-3xl font-serif text-white leading-none mb-1">{level?.nome}</h1>

                        {/* REWARD BUTTON */}
                        <button onClick={() => setShowRewards(true)} className="flex items-center gap-2 mt-1 bg-white/10 px-2 py-1 rounded-lg w-fit hover:bg-brand-gold/20 transition-colors">
                            <i className="fas fa-gift text-[10px] text-brand-gold animate-bounce"></i>
                            <p className="text-[10px] text-white/90 font-bold">Ver Recompensas</p>
                        </button>
                    </div>
                    <div className="text-right">
                        <span className="text-4xl font-bold text-white drop-shadow-lg">{xp}</span>
                        <span className="text-[10px] uppercase text-white/60 block tracking-widest">XP Total</span>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex justify-between text-[10px] text-white/40 mb-1"><span>Progresso</span><span>Próx: {nextLevelXp} XP</span></div>
                    <div className="h-3 bg-black/40 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${xpProgress}%` }} className="h-full bg-gradient-to-r from-brand-pink via-purple-500 to-brand-blue" />
                    </div>
                </div>
            </motion.div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
                <ActionButton label="Dia de Paz" sub="+5 XP" icon="fa-hand-holding-heart" color="bg-green-500" onClick={() => handleAction(5, '🕊️ Dia de Paz')} />
                <ActionButton label="Carinho" sub="+2 XP" icon="fa-kiss-wink-heart" color="bg-pink-500" onClick={() => handleAction(2, '❤️ Carinho')} />
                <ActionButton label="Briga" sub="-15 XP" icon="fa-angry" color="bg-red-500" full onClick={() => handleAction(-15, '😠 Briga')} />
            </div>

            {/* Church */}
            <div className="glass p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-center"><span className="block text-2xl font-bold text-white">{churchCount}</span><span className="text-[10px] text-gray-400 uppercase">Domingos</span></div>
                    <div className="h-8 w-px bg-white/10 mx-2"></div>
                    <div><h3 className="text-sm font-bold text-brand-gold"><i className="fas fa-church mr-1"></i> Igreja</h3><p className="text-xs text-white/50">Constância espiritual</p></div>
                </div>
                <button onClick={markChurch} className="bg-white/10 hover:bg-white/20 text-green-400 border border-green-500/30 rounded-lg px-3 py-2 text-xs font-bold transition-colors"><i className="fas fa-check"></i> Marcar</button>
            </div>

            {/* Goals (Shared) */}
            <div className="glass p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-white"><i className="fas fa-bullseye text-brand-gold mr-2"></i> Metas do Casal</h3>
                    <button onClick={() => setShowGoals(!showGoals)} className="text-xs text-brand-blue bg-brand-blue/10 px-2 py-1 rounded-lg">{showGoals ? 'Esconder' : 'Ver Todos'}</button>
                </div>
                <AnimatePresence>{showGoals && <GoalsSection user={user} />}</AnimatePresence>
            </div>

            {/* History Feed with Delete */}
            <div className="pt-4 border-t border-white/10">
                <h3 className="text-xs text-white/40 uppercase tracking-widest mb-4">Últimas Atividades</h3>
                <div className="space-y-3">
                    {history && history.length > 0 ? history.slice(0, 8).map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${item.xp > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <div>
                                    <p className="text-white/90">{item.desc}</p>
                                    <p className="text-[10px] text-white/40">{item.user} • {item.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`${item.xp > 0 ? 'text-green-400' : 'text-red-400'} font-bold text-xs`}>{item.xp > 0 ? '+' : ''}{item.xp} XP</span>
                                {/* Trash Icon - Always Visible */}
                                <button
                                    onClick={() => deleteHistoryItem(item.id)}
                                    className="text-white/40 hover:text-red-500 p-2"
                                    title="Excluir"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-xs text-white/30 text-center">Nenhuma atividade recente.</p>
                    )}
                </div>
            </div>
            {/* Version Indicator */}
            <div className="text-center pb-4">
                <p className="text-[10px] text-white/20">v2.1 - Atualizado</p>
            </div>
        </div>
    );
}

function ActionButton({ label, sub, icon, color, onClick, full }) {
    return (
        <button onClick={onClick} className={`relative overflow-hidden group rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 hover:bg-white/5 ${full ? 'col-span-2' : ''}`}>
            <div className={`absolute inset-0 opacity-10 ${color} group-hover:opacity-20 transition-opacity`}></div>
            <i className={`fas ${icon} text-2xl mb-1 ${color.replace('bg-', 'text-')}`}></i>
            <span className="font-bold text-sm text-white">{label}</span>
            <span className="text-[10px] text-white/50 bg-black/20 px-2 rounded-full">{sub}</span>
        </button>
    )
}

function GoalsSection({ user }) {
    const [goalText, setGoalText] = useState("");
    const [allGoals, setAllGoals] = useState([]);

    useEffect(() => {
        const goalsRef = ref(db, `metas`);
        const unsubscribe = onValue(goalsRef, (snap) => {
            const data = snap.val();
            const list = [];
            if (data) {
                Object.keys(data).forEach(key => {
                    if (data[key].texto) {
                        list.push({ id: key, ...data[key] });
                    } else {
                        Object.keys(data[key]).forEach(subKey => {
                            list.push({ id: subKey, ...data[key][subKey], owner: key });
                        })
                    }
                });
            }
            setAllGoals(list);
        });
        return () => unsubscribe();
    }, []);

    const addGoal = async () => {
        if (!goalText.trim()) return;
        try {
            await push(ref(db, `metas/${user.name}`), {
                texto: goalText,
                criadoEm: new Date().toLocaleDateString(),
                author: user.name
            });
            setGoalText("");
        } catch (e) {
            alert("Erro: " + e.message);
        }
    };

    const deleteGoal = async (goal) => {
        if (confirm("Apagar/Concluir esta meta?")) {
            const path = goal.owner ? `metas/${goal.owner}/${goal.id}` : `metas/${goal.id}`;
            await remove(ref(db, path));
        }
    };

    return (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
            <div className="flex gap-2 mb-4">
                <input type="text" value={goalText} onChange={(e) => setGoalText(e.target.value)} placeholder={`Nova meta de ${user.name}...`} className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-gold" />
                <button onClick={addGoal} className="bg-brand-gold text-black font-bold rounded-lg px-3"><i className="fas fa-plus"></i></button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
                {allGoals.length > 0 ? allGoals.map(goal => (
                    <div key={goal.id} className="bg-white/5 p-3 rounded-lg flex justify-between items-center group border border-transparent hover:border-white/10">
                        <div>
                            <span className="text-sm text-white/90 block">{goal.texto}</span>
                            <span className="text-[10px] text-white/40">{goal.owner || goal.author || 'Geral'}</span>
                        </div>
                        {/* Trash Icon - Always Visible */}
                        <button onClick={() => deleteGoal(goal)} className="text-white/40 hover:text-red-500 p-2 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                )) : <p className="text-center text-xs text-white/30">Adicione a primeira meta do casal!</p>}
            </div>
        </motion.div>
    )
}
