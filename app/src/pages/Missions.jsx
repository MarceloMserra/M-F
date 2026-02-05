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
    "Planejem um detalhe da viagem de 2026.",
    "Façam uma selfie engraçada juntos agora.",
    "Envie uma música que te lembra o outro.",
    "Faça um carinho no cabelo por 2 minutos.",
    "Beijo de cinema por 10 segundos.",
    "Pergunte: 'Como posso orar por você hoje?'",
    "Revejam fotos antigas da galeria juntos.",
    "Faça um elogio sobre a aparência do outro.",
    "Conte uma piada (mesmo que ruim) para o outro.",
    "Leiam um versículo bíblico juntos.",
    "Agradeça por algo específico que o outro fez ontem.",
    "Faça um convite oficial para um 'encontro no sofá' hoje à noite.",
    "Planejem um 'dia de folga' para o próximo feriado.",
    "Façam uma lista de 3 lugares novos para conhecer na cidade.",
    "Comprem um sorvete ou doce e dividam no mesmo pote.",
    "Deem um passeio no quarteirão de mãos dadas sem celular.",
    "Separem uma roupa que não usam mais para doação juntos.",
    "Façam uma massagem nas mãos um do outro com creme.",
    "Dancem uma música agitada na sala como se estivessem em uma festa.",
    "Escrevam em um papel uma meta financeira para o mês que vem.",
    "Façam um elogio sobre a inteligência ou habilidade do outro.",
    "Pergunte: 'Se pudéssemos viajar amanhã para qualquer lugar, pra onde íamos?'",
    "Façam um café da manhã na cama para o outro (ou preparem juntos).",
    "Assistam ao pôr do sol (ou nascer) juntos da janela ou varanda.",
    "Durmam hoje sem roupa (ou com uma lingerie especial).",
    "Façam um 'high-five' sempre que passarem por uma porta juntos hoje.",
    "Contem um segredo de infância que nunca contaram antes.",
    "Façam um carinho no rosto um do outro e digam 'Eu te vejo'.",
    "Orem especificamente pela saúde dos pais de vocês.",
    "Leiam um capítulo de Provérbios que corresponda ao dia de hoje.",
    "Façam uma competição de quem faz a careta mais feia (tirem foto!).",
    "Montem uma playlist com 5 músicas que marcaram o namoro.",
    "Escrevam 3 motivos pelos quais vocês casariam de novo um com o outro.",
    "Deem um beijo de 'esquimó' (nariz com nariz).",
    "Façam um brinde com água celebrando 'Nós'.",
    "Pergunte: 'Qual foi o momento mais feliz do nosso casamento até hoje?'",
    "Façam uma oração de agradecimento por 3 amigos em comum.",
    "Decidam juntos uma melhoria pequena para a casa (ex: arrumar uma gaveta).",
    "Façam um cafuné até o outro quase dormir.",
    "Dê um beijo surpresa no pescoço do outro enquanto ele(a) estiver distraído(a).",
    "Digam 'Eu te amo' em outra língua (I love you, Te quiero, Je t'aime).",
    "Agradeça a Deus por uma característica física específica do seu cônjuge.",
    "Sirva um copo de água ou café para o outro sem ele pedir.",
    "Elogie uma roupa ou o perfume que o outro está usando.",
    "Faça uma oração de 1 minuto de mãos dadas agradecendo pelo dia.",
    "Envie um WhatsApp agora dizendo: 'Sou feliz com você'.",
    "Faça cafuné ou mexa no cabelo do outro por 3 minutos.",
    "Faça uma massagem rápida (5 min) nos ombros ou pés do outro.",
    "Arrume a cama (ou ajude a terminar de arrumar) caprichado.",
    "Elogie uma qualidade de caráter do outro.",
    "Pergunte 'Qual foi a melhor parte do seu dia?' e ouça com atenção.",
    "Deixem os celulares em outro cômodo por 20 minutos juntos.",
    "Agradeça por algo simples que o outro fez essa semana.",
    "Lave a louça do jantar ou tire o lixo para aliviar o outro.",
    "Coloque uma música romântica e tirem o outro para dançar na sala.",
    "Leia um versículo de Salmos em voz alta para o outro.",
    "Dê três beijos na testa do outro em momentos diferentes hoje.",
    "Prepare um lanche surpresa ou leve uma fruta para o outro.",
    "Tirem uma selfie fazendo careta e guardem só para vocês.",
    "Conte uma piada ruim ou mostre um vídeo engraçado para o outro rir.",
    "Conversem 5 minutos sobre um sonho para a viagem de 2026.",
    "Olhe nos olhos por 30 segundos e termine dizendo 'Eu te amo'.",
    "Assista a um vídeo ou programa de TV de mãos dadas.",
    "Já deixou a pasta de dente pronta na escova do outro? Faça hoje.",
    "Faça uma oração abençoando o trabalho/estudos do outro.",
    "Relembrem em 2 minutos como foi o primeiro encontro de vocês.",
    "Invente um apelido fofo novo e use-o durante o dia.",
    "Pergunte agora: 'Posso te ajudar em algo rápido?'.",
    "Ouçam um louvor juntos antes de dormir.",
    "Faça um voto de silêncio sobre reclamações hoje (só elogie).",
    "Receba o outro com um sorriso enorme assim que o vir."
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

        try {
            // Recupera histórico de índices usados (shared key for history to ensure uniqueness across uses if needed, 
            // but for simple user flow, let's keep it specific or global? 
            // Let's use a global history key so missions don't repeat for ANYONE using this device or logical flow)
            let usados = [];
            try {
                usados = JSON.parse(localStorage.getItem(`missoes_usadas_${user.name}`) || "[]");
            } catch (err) {
                console.warn("Resetando histórico corrompido");
                usados = [];
            }

            // Filtra disponíveis
            let disponiveis = MISSOES_LISTA.map((_, i) => i).filter(i => !usados.includes(i));

            // Se acabar, reseta
            if (disponiveis.length === 0) {
                alert("Uau! Você completou TODAS as missões! O baralho será reembaralhado.");
                usados = [];
                disponiveis = MISSOES_LISTA.map((_, i) => i);
            }

            // Sorteia UM índice
            const randomIndex = disponiveis[Math.floor(Math.random() * disponiveis.length)];
            const selectedMission = MISSOES_LISTA[randomIndex];

            // Salva
            localStorage.setItem(storedKey, selectedMission);
            setMission(selectedMission);

            // Atualiza histórico
            usados.push(randomIndex);
            localStorage.setItem(`missoes_usadas_${user.name}`, JSON.stringify(usados));

        } catch (e) {
            console.error("Erro no sorteio", e);
            // Fallback to simple random
            const random = MISSOES_LISTA[Math.floor(Math.random() * MISSOES_LISTA.length)];
            localStorage.setItem(storedKey, random);
            setMission(random);
        }
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
                <div className="flex flex-col items-center">
                    <p className="text-white/60 text-sm">Psiu! É segredo...</p>
                    <span className="text-[10px] text-white/20 mt-1">v2.1 (Sistema Deck)</span>
                </div>
                <button
                    onClick={() => {
                        const today = new Date().toLocaleDateString();
                        localStorage.removeItem(`mission-${user.name}-${today}`);
                        localStorage.removeItem(`mission-${user.name}-${today}-revealed`);

                        // Force SW update if available
                        if ('serviceWorker' in navigator) {
                            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                                for (let registration of registrations) {
                                    registration.unregister();
                                }
                            });
                        }

                        window.location.reload();
                    }}
                    className="text-xs text-white/30 hover:text-white/80 underline mt-2"
                >
                    (Resetar Hoje & Limpar Cache SW)
                </button>
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
