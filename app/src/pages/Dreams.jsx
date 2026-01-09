import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useAppData } from '../hooks/useAppData';
import { formatter, getTravelStatus, GOALS } from '../utils/gameLogic';
import { db } from '../lib/firebase';
import { ref, push } from 'firebase/database';
import { motion } from 'framer-motion';

export default function Dreams() {
    const { user } = useUser();
    const { money, loading } = useAppData();
    const [amount, setAmount] = useState('');
    const [target, setTarget] = useState('pe'); // pe or ch

    // Future Calculator
    const totalCurrent = (target === 'pe' ? money.pe : money.ch) || 0;
    const goal = target === 'pe' ? GOALS.PE : GOALS.CH;
    const remaining = goal - totalCurrent;
    const weeksToGoal = amount && parseFloat(amount) > 0 ? Math.ceil(remaining / parseFloat(amount)) : 0;

    const handleDeposit = async () => {
        const val = parseFloat(amount.replace(',', '.'));
        if (!val || val <= 0) return alert('Digite um valor válido');

        try {
            await push(ref(db, 'historico'), {
                date: new Date().toLocaleDateString(),
                user: user.name,
                desc: `Poupança ${target === 'pe' ? 'Pernambuco' : 'Chapada'}`,
                xp: 5,
                val: val,
                tipo: target
            });
            setAmount('');
            alert('Dinheiro guardado! O sonho está mais perto. ✈️');
        } catch (e) {
            console.error(e);
            alert('Erro ao salvar');
        }
    };

    if (loading) return <div className="p-10 text-center text-white/50">Carregando cofres...</div>;

    return (
        <div className="p-4 pb-24 space-y-8 overflow-hidden">
            <header className="text-center mt-4">
                <h1 className="text-3xl font-serif text-brand-gold drop-shadow-md">Banco de Sonhos</h1>
                <p className="text-xs text-white/60 uppercase tracking-widest mt-1">Foco em Novembro/2026 🚀</p>
            </header>

            {/* 3D Cards Carousel */}
            <div className="perspective-1000">
                <div className="flex flex-col gap-6">
                    <DreamCard3D
                        title="Pernambuco ☀️"
                        current={money.pe}
                        goal={GOALS.PE}
                        color="from-pink-500 to-rose-600"
                        icon="fa-umbrella-beach"
                    />
                    <DreamCard3D
                        title="Chapada 🏞️"
                        current={money.ch}
                        goal={GOALS.CH}
                        color="from-blue-500 to-indigo-600"
                        icon="fa-mountain"
                    />
                </div>
            </div>

            {/* Simulated interactive Deposit Area */}
            <div className="glass-card p-6 border-t border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><i className="fas fa-coins text-6xl text-brand-gold"></i></div>

                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                    <i className="fas fa-piggy-bank text-brand-gold animate-bounce"></i> Novo Depósito
                </h3>

                <div className="space-y-6 relative z-10">
                    <div className="flex bg-black/40 p-1 rounded-xl">
                        <button onClick={() => setTarget('pe')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${target === 'pe' ? 'bg-brand-pink text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>
                            Recife/PE
                        </button>
                        <button onClick={() => setTarget('ch')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${target === 'ch' ? 'bg-brand-blue text-white shadow-lg' : 'text-white/40 hover:text-white'}`}>
                            Chapada
                        </button>
                    </div>

                    <div className="relative group">
                        <span className="absolute left-4 top-4 text-white/50 text-lg">R$</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="w-full bg-black/20 border-2 border-white/10 rounded-2xl p-4 pl-12 text-2xl text-white font-bold focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/10"
                            placeholder="0,00"
                            inputMode="decimal"
                        />
                    </div>

                    {/* Future Simulator */}
                    {amount && parseFloat(amount) > 0 && remaining > 0 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 p-3 rounded-lg text-xs text-center border border-dashed border-white/20">
                            Faltam <span className="text-brand-gold font-bold">{formatter.format(remaining)}</span>.
                            Guardando isso por semana, chegaremos lá em <span className="text-white font-bold">{weeksToGoal} semanas</span>!
                        </motion.div>
                    )}

                    <button
                        onClick={handleDeposit}
                        className="btn-primary w-full py-4 text-lg shadow-xl shadow-brand-gold/10"
                    >
                        Confirmar Depósito
                    </button>
                </div>
            </div>
        </div>
    );
}

function DreamCard3D({ title, current, goal, color, icon }) {
    const percent = Math.min((current / goal) * 100, 100);
    const status = getTravelStatus(current, goal);

    return (
        <motion.div
            initial={{ rotateX: 10, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`relative p-6 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${color}`}
        >
            <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-4 -translate-y-4">
                <i className={`fas ${icon} text-8xl text-white`}></i>
            </div>

            <div className="relative z-10 text-white">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold font-serif">{title}</h2>
                        <span className="inline-block mt-1 text-[10px] bg-black/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold backdrop-blur-md">{status}</span>
                    </div>
                </div>

                <div className="flex items-end gap-2 mb-3">
                    <span className="text-4xl font-bold tracking-tighter">{formatter.format(current)}</span>
                    <span className="text-sm opacity-60 mb-2 font-medium">/ {formatter.format(goal)}</span>
                </div>

                <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                    <motion.div
                        className="h-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                    />
                </div>
                <div className="text-right mt-1 text-[10px] opacity-60 font-mono">{percent.toFixed(1)}% Concluído</div>
            </div>
        </motion.div>
    );
}
