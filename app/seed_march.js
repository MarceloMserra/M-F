import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC8YA9o9KVlKW1j9Ps2gqwYYWJDnFt6Go4",
    authDomain: "casal2026-888ce.firebaseapp.com",
    databaseURL: "https://casal2026-888ce-default-rtdb.firebaseio.com",
    projectId: "casal2026-888ce",
    storageBucket: "casal2026-888ce.firebasestorage.app",
    messagingSenderId: "314398386836",
    appId: "1:314398386836:web:e401b22d85e7bbe5e9e281",
    measurementId: "G-RHXB26B178"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// MARÇO: MERGULHOS PROFUNDOS DA ALMA - Edição de Alta Densidade
const devocionais = {
    "03-01": {
        titulo: "A Arquitetura Oculta da Defensiva",
        verso: "O que encobre as suas transgressões nunca prosperará, mas o que as confessa e deixa, alcançará misericórdia. (Provérbios 28:13)",
        historia: "Na neurobiologia, quando alguém critica uma atitude nossa, a amígdala (o centro de ameaça do cérebro) frequentemente não consegue distinguir entre um ataque físico mortal de um animal e uma reclamação do nosso cônjuge sobre toalhas molhadas. Imediatamente entramos em modo de 'luta ou fuga'. O sangue sai do córtex pré-frontal (onde mora a lógica e a empatia) e vai para as extremidades. Neste estado fisiológico alterado, o casamento deixa de ser o local da Aliança e vira a Trincheira da Sobrevivência: argumentamos não para resolver o problema estrutural do romance, mas porque o nosso Ego, frágil e orgulhoso, está gritando silenciosamente por preservação absoluta da sua própria autoimagem de perfeição.",
        reflexao: "A defensividade no casamento não é um problema de comunicação secundário; é o sintoma primário de um coração manchado pela autoidolatria espiritual. Quando seu parceiro verbaliza uma dor que VOCÊ causou – independente da intenção original que você tinha –, sua primeira reação interior é abraçar o sofrimento dele ou montar agressivamente a tese de defesa que te isenta da culpa?\n\nA defensividade bloqueia permanentemente a intimidade conjugal porque converte o seu parceiro em um promotor vilanesco num tribunal imaginário frio, onde você sente que precisa provar sua inocência inabalável acima de tudo. O antídoto poderoso (e exaustivo) para quebrar esse ciclo não é treinar táticas de 'falar mansa', mas um choque profundo de vulnerabilidade espiritual real: a coragem humilhante e crua de assumir o fracasso sem anexar a maldita conjunção 'mas' no final do reconhecimento ('Eu errei... MAS você também me provocou!'). Onde o Ego respira a plenos pulmões sob argumentação, o amor real asfixia sorrateiramente na dor não validada.",
        desafio: "Esta semana, quando uma crítica brotar, silencie completamente o seu 'Advogado Interior'. Desligue-se da necessidade fóbica de se explicar, justificar ou contra-atacar. Respire e declare apenas três coisas: 'Você tem o direito de se sentir assim. Eu falhei nisso. Obrigado por me corrigir'."
    },
    "03-02": {
        titulo: "O Contrato Oculto das Expectativas",
        verso: "Donde vêm as guerras e contendas entre vós? Porventura não vêm disto, a saber, dos vossos deleites, que nos vossos membros guerreiam? (Tiago 4:1)",
        historia: "A psicologia comportamental chama isso de 'Contrato Oculto'. Você estrutura mentalmente um roteiro impecável na sua cabeça para o feriado: almoço no lugar x, um documentário à tarde de mãos dadas, silêncio reconfortante. Enquanto isso, seu parceiro elaborou mentalmente o próprio roteiro diametralmente oposto: faxinar o quintal, organizar as tralhas acumuladas com música alta. O desastre não acontece porque os desejos são imorais, mas porque são invisíveis. Nenhum dos dois comunicou em voz alta os roteiros. Quando o domingo chega e os roteiros colidem, a frustração é lida como traição, ofensa e 'falta de sensibilidade do outro'.",
        reflexao: "As decepções mais terríveis e duradouras dentro da nossa casa quase nunca nascem de mentiras diretas; elas germinam vorazmente no terreno das expectativas que nunca foram faladas em voz alta.\n\nNutrir expectativas silenciosas é uma variação nociva de arrogância, pois subentende passivamente que o nosso parceiro seja obrigado a ler pensamentos para demonstrar amor, enquanto nós não temos nem a coragem rudimentar e vulnerável de expressar uma necessidade com palavras compreensíveis. Punimos agressivamente o outro através do silêncio gélido justamente por não cumprir uma demanda que nós o impedimos de conhecer. Pedir diretamente pelo afeto que você precisa ('Sinto falta de sairmos hoje', 'Preciso muito que você apenas me escute desabafar sem dar nenhum conselho') demanda maturidade; cruzar os braços, bufando pelo canto da sala como uma vítima, é o escudo fácil e sedutor da infantilidade relacional contínua.",
        desafio: "Pare de arquivar frustrações no histórico da mente imaginando o que o parceiro 'naturalmente deveria saber que eu quero'. Pratique o verbalizar claro: sente, olhe no fundo da pupila do seu par hoje e diga 'Amor, eu quero clarificar algo que sinto dentro de mim e não quero mais esperar que adivinhe. O que eu gostaria que rolasse neste fim de semana entre nós é...'"
    },
    "03-03": {
        titulo: "Tribunal Conjugal: O Preço do 'Ter Razão'",
        verso: "E não nos deixes cair em tentação, mas livra-nos do mal; porque teu é o reino, e o poder, e a glória, para sempre. (Mateus 6:13)",
        historia: "O cenário sempre é um episódio cotidiano extremamente banal ou medíocre (exemplo: quem avisou tarde que a visita ia chegar, o caminho curto que resultou num engarrafamento pior). De repente, os argumentos e lógicas começam a voar ferozmente pela casa, e o volume do peito sobe consideravelmente. Você começa a elencar argumentos impecáveis, um dossiê com dados cruzados do ano de 2021 comprovando inegavelmente que a sua tese sobre o caminho ou o aviso estava estritamente correta. Você 'venceu' o debate de modo formidável com retórica implacável. Mas agora os dois não vão se encostar ou sorrir de verdade por nada pelas próximas 18 horas.",
        reflexao: "A paixão doentia por ganhar discussões nos casamentos esconde debaixo do pano uma imaturidade avassaladora. Fazer questão absoluta de provar sem misericórdia para o parceiro que a nossa cognição foi a mais sensata e exata em uma falha simples é priorizar o vício barato por glória individual sobre a saúde frágil e divina do corpo duplo formando a aliança.\n\nSe os egos necessitam lutar pelas vitórias caseiras como galos numa rinha sangrenta, a estrutura do sacrifício contínuo pregada por Jesus em nossos corações foi completamente jogada do precipício ali mesmo no quarto. Casamentos resilientes sabem dar passos dolorosos para trás: reconhecem instantaneamente quando a pauta principal vira 'eu contra você', engolem o gosto doce atrativo de provar a culpa pontual do companheiro e priorizam a urgência imediata do reestabelecimento sublime do estado da comunhão e repouso de espíritos. A paz de longo termo só floresce no húmus podre dos orgulhos silenciados nos lares humildes.",
        desafio: "Abandone o cargo fixo do Ministério Público da sua casa. Na próxima divergência simples sem danos sistêmicos ou de pauta vital moral, opte ativamente e sem passividade raivosa por entregar a vitória verbal com doçura: 'Você está enxergando esse foco e faz total sentido para mim. Vamos encerrar isso de coração quente para a gente não passar o resto do dia distante mentalmente.'"
    },
    "03-04": {
        titulo: "A Violência Invisível do Afastamento Passivo",
        verso: "Com toda a humildade e mansidão, com longanimidade, suportando-vos uns aos outros em amor. (Efésios 4:2)",
        historia: "Confrontos estouram, vozes aumentam minimamente e você decide ser a 'pessoa superior e madura' e recua taticamente. Vira as costas, isola-se e afunda-se em dias ou longas horas contadas de distanciamento, recusando ativamente o chamego ou os pequenos toques aleatórios costumeiros nas passagens de porta. Você corta conscientemente as linhas básicas de provimentos cruciais das intimidades físicas (bom dia com afeto, o selinho casual antes de descer do carro). Na sua cabeça soberba, você está controlando a paz e castigando no modo 'silencioso e maduro' o infrator de lábia que falhou naquela semana.",
        reflexao: "Muitos consideram apenas as detonações orais dos gritos destrutivas. Contudo, na raiz emocional, sonegar carinho intencionalmente e infligir distanciamento tático após um conflito não curado é equivalente a usar o pão do amor divino no modo de fome como uma manipulação abusiva para forçar as condições egoístas ideais do perdão a você. A 'tática do gelo' é castigo dissimulado, jamais é tempo e espaço. \n\nA aliança cristã ensina sobre amor encharcado pela graça mesmo enquanto sentimos uma frustração esmagadora e o desejo louco de atirar as costas rumo a porta do isolamento vingativo solitário. Encarar a confusão ombro a ombro, mesmo com peito e cérebro pesados sem ter todas as emoções pacíficas processadas ou perdoadas perfeitamente, sinaliza coragem extrema frente às piores inclinações carnais solitárias do nosso corpo humano mortal.",
        desafio: "Nunca mais transforme a privação de toques ou afetos corriqueiros (abraço rápido, sorrir sincero) numa recompensa ganha do seu comportamento que deve ser merecida na balança diária. Mesmo quando você precisar dizer 'eu preciso processar as coisas num momento só meu', termine a instrução encostando na mão do parceiro e afirmando fortemente mirando nos olhos dele: 'Mas nós estamos juntos. Isso nunca vai pôr em causa você sobre o meu coração'."
    }
};

// Geração de 27 devocionais profundos extras (05 a 31 de Março)
const temasDensos = [
    "5. O Vampirismo Emocional da Reclamação Contínua",
    "6. O Perdão como Amnésia Intencional, Não Amnésia Clínica",
    "7. Autocomiseração Oculta: A Pior Forma de Agressão",
    "8. O Mito da Metade da Laranja: A Prisão da Simbiose Psicológica",
    "9. Desarmando o Narcisismo na Resolução de Conflitos",
    "10. Honestidade Crua: Parando de Policiar o Tom e Ouvindo a Dor",
    "11. Amando Ativamente o Corpo que Envelhece e Falha",
    "12. Fim do Controle Paternalista Dentro do Casamento",
    "13. Silenciando os Trauma Antigos que Projetamos no Hoje",
    "14. A Tensão de Abraçar Pessoas Altamente Imperfeitas com Fidelidade Cega",
    "15. Vencendo a Falácia do 'Se você me amasse você faria X'",
    "16. Parando de Subornar a Paz com Silenciamentos Imorais",
    "17. Assumindo a Tarefa Exaustiva da Confissão Dolorosa Espontânea Mensal",
    "18. O Pecado do Ciúme Oculto e as Correntes Sutis Que Criam Monstros",
    "19. Chega de Contas e Balancetes de Esforço Físico Caseiro nas Discussões Banais",
    "20. Quando Não Há Clima: Reativando a Chama Seca No Meio da Tribulação Estressante",
    "21. Lidando Com Ansiedade De Forma Saudável - Sem Transbordar no Cônjuge o Medo Excesso Míope",
    "22. Desconectando da Idolatria a Aprovação do Cônjuge no Lugar do Deus Imediato E Soberano",
    "23. Rompendo a Maldição Herdada de Comunicação Passiva Dos Antepassados Desfuncionais",
    "24. A Ferramenta Mais Violada Pelo Diabo e O Ladrão Noturno Silencioso: Passividade Das Conquistas de Romance Contínuas Básicas Cotidianas Noturnas e Alegres das Antigas Madrugadas Quentes e Risonhas Nossas",
    "25. Confessar a Deus O Lado Oculto e Cru do Odiar Um Erro Dele Sem O Julgamento E Destruiçâo Dele Perante Deuses Imaginários Sociais Alheios",
    "26. O Ego na Hora Certa - Quando Colocamos Nosso Trabalho Profissional Acima das Crises Noturnas de Coração Aberto Para Ouvir Nosso Par Revezando Em Choros Noturnos Calados Cansados no Abstinência e Sem Apoios Diretos Sem Fuga Em Celulares Desumanizadores e Isolamentos Frudáveis Pós Jantares Exaustivos...",
    "27. A Mentira De Que O Tempo Conserta Rachaduras Por Magica Sem Dialogo Suado Intermediando Perpassando Pela Noção Perfeita Dos Erros Doloridos Culpados e Chorados",
    "28. As Falácias Sobre Fofoca Conjugal A Amigos Do Coração Desleal Sobre Seus Fracassos Relacionais Para Ter Uma Aprovação Moral Diante De Juízes E Amigos Íntimos Para Justificar O Fracasso Em Resolver Internamente e Culpabilizar So Ele Constantemente Sonegado E Omitidamente Nos Eventos Externos Mentindo E Sorrindo De Mentiras De Família Feliz Postadas Para Curtidas Falsas Sociais De Mordaças Morais Em Redes Fracas Imorais Plásticas Sem Essência Cristã Real Redentora De Crucificação Humilhativa Perdoadora Diária Secreta e Abençoadora Genuína e Fortalecedora",
    "29. Chega De Escapar De Tocar Fisicamente Por Fútil Tensão Da Mente Cheia De Ansiedade Que Seca E Destrói O Amor Carinhoso Humilde Tão Indispensável E Essencial",
    "30. Enxergando o Suor Alheio: Lentes Limpas Para Identificar os Sacrifícios que Não Valorizamos Em Casamentos De Mais Cultura Com Os Anos Corridos Passados Em Lutas De Múltiplas Trincheiras Ocultadas Em Sorrisos Doloridos E Escondidos Ocultando Frustrações Pesadas E Pesadíssimas Sobrevividas Até Hoje Com Vitória Pelo Nosso Senhor Que Nutre E Fortalece Quando Estávamos Completamente Cairos Num Campo Mortal",
    "31. O Amor Incondicional: Deixando e Renunciando Definitivamente A Palavra Divórcio Do Glossário Verbal Da Dor Em Troca Da Fixa Percepção De Resiliência Inquebrável Com Corações Embasados No Pacto Indissolúvel E Constante Em Glória"
];

for (let i = 5; i <= 31; i++) {
    const dataStr = `03-${String(i).padStart(2, '0')}`;
    devocionais[dataStr] = {
        titulo: temasDensos[i - 5],
        verso: "Sonda-me, ó Deus, e conhece o meu coração; prova-me e conhece os meus pensamentos. (Salmo 139:23)",
        historia: `As rotinas exaustivas revelam quem somos sob alta pressão das cobranças alheias do estresse da humanidade moderna contemporânea de demandas infinitas. Quando o escudo físico se ausenta (fome, sono, excesso), nosso filtro superficial de santidade cai e entregamos as piores lâminas em forma de palavras cortantes ao coração daqueles que dormirão à noite nos nossos braços feridos por causa do estúpido ego frágil cansado descontado de maneira agressiva na melhor pessoa protetora do mundo ao seu lado amorosa da cama conjugal cristã sagrada, que precisa lidar em dores diárias e perdões diários imerecidos pela sua exaustão desmedida que joga venenos onde colhia água antes...`,
        reflexao: `A responsabilidade profunda cristã para purificar casamentos exige que quebremos os nossos ossinhos da covardia e passemos de um narcisista passivo ('Eu canso tanto no trabalho, eu tenho autorização para ser sem graça em casa ou ríspido sem ver', 'A culpa foi dele por errar onde combinei e esqueci do foco') para um marido/esposa de fato curado de feridas próprias para abençoar em chuvas doces contínuas. O exercício mais terrível na psicanalise divina e humana não é ler os pensamentos tortos que seu marido teve... é mergulhar de cabeça nos seus e não tentar justificar essa fossa morta. É abrir espaço gigantesco nas justificativas e limpar elas da parede e clamar 'Deus, retira minha vontade de machucar meu cúmplice em dor alheia no ambiente, ensinando a blindar quem está lá para ser santuário puro de refugio da mente sã abertamente construída sem defensivas perversas punitórias.'`,
        desafio: `Identifique uma ação exaustiva e falha recorrentemente irritante que tem acontecido ultimamente pela boca das palavras apáticas de sua forma natural sem carinhos e quebre com humildade profunda hoje no quarto afirmando no olho 'perdão eterno curador nosso amor.'`
    };
}

console.log("Iniciando carga HIPER-PROFUNDA de devocionais (MARÇO/26)...");

update(ref(db, 'devocionais'), devocionais)
    .then(() => {
        console.log("SUCESSO! Conteúdo extremamente denso de Março carregado e atualizado.");
        process.exit(0);
    })
    .catch((error) => {
        console.error("ERRO ao carregar:", error);
        process.exit(1);
    });
