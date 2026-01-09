export const LEVELS = [
    { id: 1, max: 150, nome: "Início", premio: "Piquenique na Ermida Dom Bosco" },
    { id: 2, max: 400, nome: "Aprendizes", premio: "Caminhada no Pontão + Água de Coco" },
    { id: 3, max: 800, nome: "Parceiros", premio: "Eixão do Lazer + Fotos na SQS 308" },
    { id: 4, max: 1300, nome: "Cúmplices", premio: "CCBB Cultural + Passeio no Jardim" },
    { id: 5, max: 1900, nome: "Namorados", premio: "Pastel na Torre de TV" },
    { id: 6, max: 2600, nome: "Noivos", premio: "Cine Drive-in (Noite Retrô)" },
    { id: 7, max: 3500, nome: "Guardiões", premio: "Trilha na Água Mineral" },
    { id: 8, max: 4500, nome: "Guerreiros", premio: "Visita ao Templo da LBV (Paz)" },
    { id: 9, max: 6000, nome: "Inabaláveis", premio: "Jardim Botânico (Piquenique)" },
    { id: 10, max: 7500, nome: "Alma Gêmea", premio: "Torre Digital (Vista do DF)" },
    { id: 11, max: 9500, nome: "Realeza", premio: "Jantar de Gala em Casa" },
    { id: 12, max: 13000, nome: "Lendários", premio: "VIAGEM PARA PERNAMBUCO!" }
];

export const GOALS = {
    PE: 7200,
    CH: 2500
};

export function calculateLevel(xp) {
    let currentLevel = LEVELS[0];
    for (let level of LEVELS) {
        if (xp < level.max) {
            currentLevel = level;
            break;
        }
        if (level.id === 12) currentLevel = level;
    }
    return currentLevel;
}

export function getTravelStatus(value, goal) {
    const p = (value / goal) * 100;
    if (p <= 0) return "🎒 Iniciando";
    if (p < 20) return "🧳 Arrumando";
    if (p < 50) return "🚗 A Caminho";
    if (p < 80) return "✈️ Quase lá";
    if (p < 100) return "🏖️ Vendo o Mar";
    return "🥂 CONQUISTADO!";
}

export const formatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
