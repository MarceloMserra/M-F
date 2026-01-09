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

// Helper para texto longo nas reflexões
const devocionais = {
    "01-09": {
        titulo: "A Rocha Inabalável",
        verso: "Todo aquele, pois, que escuta estas minhas palavras, e as pratica, assemelhá-lo-ei ao homem prudente, que edificou a sua casa sobre a rocha. E desceu a chuva, e correram rios, e assopraram ventos, e combateram aquela casa, e não caiu, porque estava edificada sobre a rocha. (Mateus 7:24-25)",
        historia: "Na engenharia, a fundação é a parte mais cara e demorada de um prédio, mas é a única que ninguém vê. Quando olhamos para um casal que admiramos, vemos a 'fachada' bonita — as fotos, os sorrisos, as conquistas. Mas o que sustenta aquilo tudo é o que está enterrado no solo, invisível aos olhos públicos.",
        reflexao: "Jesus encerra o Sermão do Monte com esta parábola crucial. Ele não diz 'se' a chuva descer, mas 'quando' descer. A crise é inevitável para todos os casais. Pode ser uma crise financeira, uma doença, ou um desentendimento profundo. A diferença entre o divórcio e o 'bodas de ouro' não é a sorte, mas a fundação.\n\nConstruir sobre a rocha não é apenas ouvir a Palavra (ir à igreja, ouvir louvores), mas PRATICÁ-LA. Muitos casais cristãos sabem a teoria ('maridos, amai vossas mulheres', 'mulheres, respeitai vossos maridos'), mas na hora da briga, constroem na areia do orgulho e da vontade própria. A Rocha é Cristo, e edificar nEle significa que, quando a vontade de gritar vem, você escolhe calar porque Ele ensinou a mansidão. Quando a vontade de desistir vem, você permanece porque Ele ensinou a aliança.\n\nHoje iniciamos uma nova fase no nosso 'Mundo'. Que cada tijolo colocado aqui (cada missão, cada conversa, cada real guardado) esteja cimentado na obediência radical aos ensinos de Jesus.",
        desafio: "Sentem-se juntos, segurem um objeto pesado (uma pedra ou algo firme) e orem: 'Senhor, Tu és nossa Rocha. Decidimos hoje não tomar nenhuma decisão baseada em emoção (areia), mas em Tua Palavra'."
    },
    "01-10": {
        titulo: "Semeadores de Vida",
        verso: "A morte e a vida estão no poder da língua; e aquele que a ama comerá do seu fruto. (Provérbios 18:21)",
        historia: "Imagine que você tem um saco de sementes no bolso. Por onde você anda na sua casa, você deixa cair algumas. Algumas são ervas daninhas (críticas, sarcasmo, indiferença), outras são carvalhos de justiça (elogios, profecias, gratidão). Daqui a 10 anos, vocês viverão na floresta que estão plantando hoje.",
        reflexao: "A Bíblia nos dá uma responsabilidade aterrorizante e maravilhosa: nossas palavras têm poder criativo. Deus criou o mundo falando. Nós, feitos à Sua imagem, criamos a atmosfera do nosso lar falando. Se o ambiente está pesado, hostil ou triste, a primeira pergunta deve ser: 'O que temos declarado aqui?'.\n\nMuitas vezes, na intimidade do casamento, perdemos o filtro. Tratamos quem mais amamos com uma dureza que jamais usaríamos com um estranho ou um chefe. As palavras 'você nunca faz isso' ou 'você sempre erra aquilo' são maldições lançadas sobre o cônjuge. Elas aprisionam o outro no erro.\n\nA graça nos chama a profetizar o bem. Chamar à existência o que não existe. Elogiar o esforço antes de ver o resultado completo. Se queremos um casamento cheio de vida, nossos lábios devem ser fontes de vida, não de morte.",
        desafio: "Desafio de Silêncio e Graça: Durante as próximas 24h, vocês estão PROIBIDOS de reclamar, criticar ou corrigir o outro. Se não tiver algo bom para dizer, não diga. Ao final, compartilhem como foi a experiência."
    },
    "01-11": {
        titulo: "A Contabilidade do Amor",
        verso: "O amor é paciente, é benigno... não busca os seus interesses, não se irrita, não suspeita mal. (1 Coríntios 13:4-5)",
        historia: "Em contabilidade, existe o livro-razão onde se registram débitos e créditos. Muitos casais vivem com um livro-razão emocional aberto: 'Eu fiz isso por você ontem, então você me deve isso hoje'. 'Você me magoou em 2019, então tenho crédito para te tratar mal hoje'.",
        reflexao: "Paulo, ao escrever aos Coríntios, diz que o amor 'não contabiliza o mal' (em algumas traduções). O amor quebra a calculadora. A graça é injusta: é receber o que não merecemos. No casamento, somos chamados a ser canais dessa graça ilógica de Deus.\n\nQuando guardamos rancor, estamos dizendo: 'Você me deve, e eu vou cobrar'. O perdão é rasgar a nota promissória. É dizer: 'Você errou, me feriu, mas eu decido absorver esse prejuízo e não cobrar mais de você'. Isso dói? Sim, como a cruz doeu. Mas é a única forma de ressuscitar o relacionamento.\n\nNão deixe que o sol se ponha sobre a vossa ira. Zere a conta todos os dias antes de dormir. Não carregue bagagem de hoje para a viagem de amanhã.",
        desafio: "Pegue um papel, escreva uma mágoa ou cobrança que você tem contra o outro. Orem juntos, rasguem esse papel e joguem no lixo, declarando 'Está cancelado em nome de Jesus'."
    },
    "01-12": {
        titulo: "Uma Só Carne, Um Só Propósito",
        verso: "Portanto deixará o homem o seu pai e a sua mãe, e apegar-se-á à sua mulher, e serão ambos uma carne. (Gênesis 2:24)",
        historia: "A matemática de Deus é um mistério: 1 + 1 = 1. Não são dois meios que se completam, mas dois inteiros que se fundem. Como café com leite: depois de misturados, você não consegue mais separar o que é café e o que é leite sem destruir a substância.",
        reflexao: "O termo hebraico para 'uma só carne' envolve fusão total. Fusão física, emocional, espiritual e patrimonial. O grande inimigo moderno do casamento é o individualismo: 'meu dinheiro', 'meus sonhos', 'meu tempo'. Isso é viver como solteiros dividindo o aluguel.\n\nA verdadeira unidade exige 'deixar' (pai e mãe, dependência emocional anterior) e 'apegar-se' (colar, soldar). Vocês são agora a família principal um do outro. Qualquer outra pessoa (pais, amigos, filhos) é parente. A prioridade número 1 na terra, depois de Cristo, é o seu cônjuge. Quando vocês entenderem que chutar o outro é chutar a própria perna, vocês começarão a cuidar um do outro com o mesmo zelo que cuidam de si mesmos.",
        desafio: "Façam um check-up da unidade: 'Existe alguma área da nossa vida (senhas, dinheiro, sonhos, medos) que ainda não é totalmente compartilhada?' Conversem e abram essa porta hoje."
    },
    "01-13": {
        titulo: "Lavando os Pés",
        verso: "Ora, se eu, Senhor e Mestre, vos lavei os pés, vós deveis também lavar os pés uns aos outros. (João 13:14)",
        historia: "Na época de Jesus, lavar os pés era tarefa do escravo mais baixo. As estradas eram de terra e esterco. Ninguém queria tocar na sujeira do outro. Mas o Rei do Universo tirou a capa, pegou a toalha e tocou na área mais suja dos seus discípulos.",
        reflexao: "Muitas vezes, vemos o casamento como uma busca pela nossa própria felicidade: 'Casei para ser feliz'. Mas o Evangelho diz: 'Casei para servir'. A pergunta que deve permear nossa mente ao acordar não é 'O que meu cônjuge vai fazer por mim hoje?', mas 'Como posso servir meu cônjuge hoje?'.\n\nIsso mata o egoísmo. Quando os dois competem para ver quem serve mais, ambos são servidos e ambos são amados. O serviço prático (lavar a louça, fazer massagem, ouvir um desabafo chato, resolver um problema burocrático) é a linguagem do amor mais alta. É dizer 'Eu te amo' sem abrir a boca.",
        desafio: "Ação Secreta de Serviço: Escolha uma tarefa que seu cônjuge odeia fazer e faça por ele(a) hoje, sem que ele(a) precise pedir e sem jogar na cara depois."
    },
    "01-14": {
        titulo: "A Transparência Radical",
        verso: "E ambos estavam nus, o homem e a sua mulher; e não se envergonhavam. (Gênesis 2:25)",
        historia: "No Éden, antes do pecado, não havia roupas nem muros. Nada a esconder. O pecado trouxe as folhas de figueira, as máscaras e os segredos. Restaurar o casamento é voltar a esse estado de 'nudez' emocional.",
        reflexao: "Nudez aqui fala de transparência total. É poder dizer ao outro: 'Estou com medo', 'Me senti tentado', 'Estou triste', sem medo de julgamento. O casamento deve ser o lugar mais seguro da terra, onde você pode ser sua versão mais crua e ainda assim ser amado.\n\nSegredos são cupins na estrutura da casa. Sejam segredos financeiros, conversas apagadas no WhatsApp ou sentimentos reprimidos. Onde há luz, as trevas não prevalecem. A transparência traz proteção. Se um de vocês está lutando contra algo, a confissão ao outro traz cura e quebra o poder do inimigo.",
        desafio: "Troquem seus celulares desbloqueados por 15 minutos. Não para 'fiscalizar' com desconfiança, mas para exercitar a confiança de que 'não há nada aqui que você não possa ver'. Isso gera uma paz imensa."
    },
    "01-15": {
        titulo: "O Casamento como Ministério",
        verso: "Vós sois a luz do mundo... Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai. (Mateus 5:14-16)",
        historia: "Muitos acham que 'ministério' é cantar no louvor ou pregar. Mas o primeiro e maior ministério é a sua casa. Seu casamento é um outdoor de Deus para o mundo.",
        reflexao: "O mundo está descrente do amor. Quando as pessoas olham para vocês, elas veem algo diferente? O jeito que vocês se tratam, se respeitam e se perdoam deve provocar 'ciúmes' (no bom sentido) em quem está fora. Devem olhar e dizer: 'Eu quero o que eles têm'. O que eles têm? Jesus no centro.\n\nDeus uniu vocês não apenas para que fiquem se olhando nos olhos, mas para que, de mãos dadas, olhem para fora e abençoem outros. Um casal fechado em si mesmo adoece. Um casal que serve, que acolhe, que aconselha outros, permanece vivo e frutífero.",
        desafio: "Identifiquem um casal de amigos ou conhecidos que está passando por dificuldade. Orem por eles agora e mandem uma mensagem de encorajamento ou convidem para um café."
    },
    "01-16": {
        titulo: "Intimidade: O Jardim Fechado",
        verso: "Jardim fechado és tu, minha irmã, esposa minha, manancial fechado, fonte selada. (Cânticos 4:12)",
        historia: "Salomão usa a figura de um jardim exclusivo. Não é um parque público. É um lugar de delícias reservado apenas para o proprietário.",
        reflexao: "A intimidade sexual é um presente santo de Deus. O mundo deturpou o sexo, tornando-o vulgar, mas Deus o criou como a celebração máxima da aliança. É o momento em que os corpos dizem 'amém' ao que a alma prometeu no altar.\n\nCuidar desse jardim envolve protegê-lo de pragas (pornografia, flertes externos, comparações) e também regá-lo (romantismo, tempo de qualidade, carinho não-sexual). Não usem o sexo como moeda de troca ou arma de punição. Ele é o termômetro e o cimento da união. Quando o jardim é bem cuidado, ele exala perfume para a casa toda.",
        desafio: "Planejem uma noite especial para essa semana. Não apenas 'sexo', mas 'intimidade'. Preparem o ambiente, conversem, reconectem-se sem pressa."
    },
    "01-17": {
        titulo: "Lidando com as Diferenças",
        verso: "Como o ferro com o ferro se aguça, assim o homem afia o rosto do seu amigo. (Provérbios 27:17)",
        historia: "O atrito gera faíscas, mas também afia. Se vocês fossem iguais, um dos dois seria desnecessário. Deus ama a diversidade e uniu propósitos distintos para formar uma equipe completa.",
        reflexao: "É comum nos irritarmos com o que é diferente no outro. O organizado se irrita com o espontâneo; o rápido se irrita com o detalhista. Mas essas diferenças, se submetidas a Deus, são complementares, não concorrentes.\n\nOnde você é fraco, o outro é forte. Onde o outro é cego, você enxerga. Parem de tentar mudar a essência do cônjuge para torná-lo uma cópia sua. Aceitem que Deus desenhou cada um de forma única. Onde há aceitação, a guerra acaba e a colaboração começa. Vocês são peças de um quebra-cabeça: diferentes no formato, mas perfeitos no encaixe.",
        desafio: "Faça uma lista de 3 características do seu cônjuge que são OPOSTAS às suas, e agradeça a Deus por cada uma delas, verbalizando como isso equilibra o lar."
    },
    "01-18": {
        titulo: "A Raiz da Amargura",
        verso: "Tendo cuidado de que ninguém se prive da graça de Deus, e de que nenhuma raiz de amargura, brotando, vos perturbe, e por ela muitos se contaminem. (Hebreus 12:15)",
        historia: "A amargura é uma raiz silenciosa. Ela cresce debaixo da terra, alimentada por mágoas não resolvidas, palavras engolidas e perdões não liberados. Quando brota, contamina tudo ao redor.",
        reflexao: "Não existe 'pequena mágoa' inofensiva. Toda mágoa guardada apodrece. Se você sente que sua paciência com o cônjuge está curta, que suas respostas são ríspidas ou que você não sente vontade de estar perto, cheque a raiz. Provavelmente há uma amargura ali.\n\nO antídoto é a graça radical. É expor a ferida para que ela seja limpa, e não escondê-la. Conversem sobre o que dói. 'Quando você disse aquilo, eu me senti assim'. Sem acusação, apenas exposição. A luz mata os fungos da alma.",
        desafio: "Perguntem um ao outro: 'Existe algo que eu fiz recentemente que te feriu e você não me disse?'. Ouçam sem se defender. Apenas peçam perdão."
    },
    "01-19": {
        titulo: "Finanças à Moda de Deus",
        verso: "Ninguém pode servir a dois senhores... Não podeis servir a Deus e a Mamon. (Mateus 6:24)",
        historia: "Dinheiro é a segunda maior causa de divórcios no mundo. Mas o problema nunca é apenas matemático (falta de dinheiro), é teológico (quem é o dono do dinheiro?).",
        reflexao: "Se vocês são 'uma só carne', não pode haver segredos financeiros ou contas escondidas. Tudo é nosso, e acima de tudo, tudo é de Deus. Nós somos apenas gerentes (mordomos). Quando entendemos que o dinheiro é um recurso do Reino para abençoar nossa família e outros, a tensão diminui.\n\nSonhem juntos (como a viagem de 2026!), mas sejam fiéis no pouco. O dízimo, a oferta e a generosidade quebram o espírito de ganância e medo. Um casal alinhado financeiramente, que vive um degrau abaixo do que ganha para ter paz, dorme melhor.",
        desafio: "Sentem-se e revisem o orçamento do mês e os alvos de poupança (Pernambuco/Chapada). Orem consagrando cada centavo a Deus e pedindo sabedoria na administração."
    },
    "01-20": {
        titulo: "O Poder da Honra",
        verso: "Amai-vos cordialmente uns aos outros com amor fraternal, preferindo-vos em honra uns aos outros. (Romanos 12:10)",
        historia: "Honrar significa 'dar peso', 'valorizar', 'tratar como precioso'. Desonrar é tratar como comum, leve, descartável.",
        reflexao: "O ambiente de honra blinda o casamento. É nunca falar mal do cônjuge em público (nem em tom de 'brincadeira'). É defender a reputação dele(a). É ouvir com atenção quando ele(a) fala. Quando a esposa honra o marido, ele se sente um rei e quer dar o mundo a ela. Quando o marido honra a esposa, ela floresce e se sente segura.\n\nA cultura do 'zoar', do diminuir, do criticar destrói a intimidade. Que a sua boca seja um instrumento de exaltação das qualidades do seu parceiro. Sejam o maior fã um do outro.",
        desafio: "Elogie seu cônjuge publicamente hoje (seja nas redes sociais, num grupo da família ou diante de amigos). Deixe que outros saibam o quanto você o admira."
    },
    "01-21": {
        titulo: "Ansiedade x Confiança",
        verso: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós. (1 Pedro 5:7)",
        historia: "Pedro, um pescador acostumado com tempestades, aprendeu que carregar o peso do medo afunda o barco. Ele nos convida a 'lançar' (arremessar com força) a ansiedade sobre Jesus.",
        reflexao: "Muitas vezes, a ansiedade visita o lar. Medo do futuro, da saúde, dos filhos, do emprego. A ansiedade é tentar controlar o incontrolável. É viver o sofrimento do amanhã hoje. Isso rouba a energia de amar agora.\n\nDeus 'tem cuidado de vós'. Isso é pessoal. Ele cuida dos detalhes do nosso mundo. Confiar é descansar. É fazer o nosso melhor e dormir, sabendo que Deus não dorme. Um casal que ora junto lança os fardos aos pés da Cruz e levanta leve para caminhar.",
        desafio: "Escrevam num papel seus 3 maiores medos/ansiedades atuais. Coloquem dentro da Bíblia, no Salmo 23, como um ato profético de que o Pastor está cuidando disso."
    },
    "01-22": {
        titulo: "Perdão: Reset Diário",
        verso: "Suportando-vos uns aos outros, e perdoando-vos uns aos outros, se algum tiver queixa contra outro; assim como Cristo vos perdoou, assim fazei vós também. (Colossenses 3:13)",
        historia: "Imagine um computador que nunca é reiniciado. Ele fica lento, trava, esquenta. O perdão é o 'reset' do casamento. Sem ele, o sistema trava.",
        reflexao: "Nós vamos falhar. Vamos falar sem pensar, vamos esquecer compromissos, vamos ser egoístas. A convivência revela nossas falhas. Se não houver um fluxo contínuo de perdão, o lixo emocional se acumula e a casa fica inabitável.\n\nPerdoar 'como Cristo perdoou' é o padrão. Ele perdoou quando ainda éramos inimigos. Ele perdoou completamente. Ele não joga na cara. O perdão não muda o passado, mas destrava o futuro. Decida ser um 'perdoador profissional'.",
        desafio: "Se houver alguma 'queixa' (como diz o versículo) pendente, resolvam agora. Não deixe para amanhã. Orem juntos de mãos dadas selando esse perdão."
    },
    "01-23": {
        titulo: "Tempo de Qualidade",
        verso: "Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu. (Eclesiastes 3:1)",
        historia: "Dizemos que 'tempo é dinheiro', mas tempo é vida. O que você dá seu tempo, você dá sua vida. Se não temos tempo para o cônjuge, estamos dizendo que ele não é nossa vida.",
        reflexao: "A rotina é voraz. Trabalho, trânsito, tarefas, celular. Se não agendarmos o amor, ele não acontece. É preciso lutar por tempo de qualidade. Não é apenas estar na mesma sala (cada um no seu celular), é estar CONECTADO.\n\nOlho no olho. Conversa sem interrupção. Rir juntos. Fazer nada juntos. Esses momentos depositam na 'conta bancária emocional' do casal. Quando a crise vier, vocês terão saldo para sacar.",
        desafio: "Desafio 'No-Phone Zone': Estabeleçam um horário ou local da casa (ex: mesa de jantar ou quarto) onde é proibido entrar com celular. Cumpram isso hoje."
    },
    "01-24": {
        titulo: "O Cuidado com as Pequenas Raposas",
        verso: "Apanhai-nos as raposas, as raposinhas, que fazem mal às vinhas, porque as nossas vinhas estão em flor. (Cânticos 2:15)",
        historia: "Não são os leões que destroem as vinhas, são as raposinhas. Elas cavam por baixo e comem as raízes. No casamento, raramente o problema é um evento gigante repentino; geralmente é o acúmulo de pequenas coisas negligenciadas.",
        reflexao: "Uma mentirinha aqui, uma grosseria ali, uma promessa esquecida, um flerte no trabalho, uma frieza na cama. Coisas pequenas. Mas acumuladas, elas criam um abismo. A vigilância deve ser constante.\n\nEstar atento aos detalhes é sinal de amor. Perceber que o outro está cansado, notar um corte de cabelo, agradecer pelo café. Cuidar dos detalhes fecha as brechas para o inimigo entrar.",
        desafio: "Pergunte ao seu cônjuge: 'Qual é uma pequena coisa que eu faço (ou deixo de fazer) que te incomoda e eu não percebo?'. Prometa tentar mudar isso."
    },
    "01-25": {
        titulo: "Alegrai-vos Sempre",
        verso: "O coração alegre serve de bom remédio; mas o espírito abatido virá a secar os ossos. (Provérbios 17:22)",
        historia: "Casamento cristão não precisa ser sisudo e chato. A alegria é fruto do Espírito! Um lar onde se ouve risadas é um lar onde Deus habita com prazer.",
        reflexao: "Vocês se divertem juntos? Ou a relação virou apenas uma sociedade para pagar contas e gerenciar problemas? Resgatem a ludicidade do namoro. Brinquem, façam cócegas, contem piadas, dancem na sala, corram na chuva.\n\nO bom humor desarma bombas. Às vezes, no meio de uma discussão boba, um sorriso ou uma brincadeira quebra o gelo e lembra: 'Ei, nós nos amamos, isso não importa tanto'. Não levem a vida tão a ferro e fogo.",
        desafio: "Façam uma atividade puramente divertida hoje. Um jogo de tabuleiro, videogame, guerra de travesseiro, ou assistam a uma comédia. O objetivo é rir."
    },
    "01-26": {
        titulo: "Cordão de Três Dobras",
        verso: "E, se alguém prevalecer contra um, os dois lhe resistirão; e o cordão de três dobras não se quebra tão depressa. (Eclesiastes 4:12)",
        historia: "Não tente segurar seu casamento apenas com a força do seu braço. Você vai cansar. O segredo da resistência é a Terceira Dobra: o Espírito Santo entrelaçado em vocês.",
        reflexao: "Quando Jesus é o centro, Ele absorve os impactos. Quando faltar amor em você, busque na Fonte. Quando faltar paciência, peça ao Espírito. Quando não souber o que fazer, peça Sabedoria.\n\nUm casal que ora junto é invencível. Não porque são perfeitos, mas porque a cola que os une é divina e eterna. Incluam Deus nas conversas diárias, não só na hora da refeição.",
        desafio: "Leiam um capítulo curto da Bíblia juntos hoje e compartilhem o que entenderam. Deixem a Terceira Dobra falar."
    },
    "01-27": {
        titulo: "Sede Fortes e Corajosos",
        verso: "Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares. (Josué 1:9)",
        historia: "Diante da terra prometida, o medo paralisou muitos. Mas Josué escolheu crer na promessa, não nos gigantes. Vocês têm uma terra prometida (um futuro, uma família, um legado).",
        reflexao: "O inimigo tenta colocar medo: 'vocês não vão conseguir', 'o dinheiro vai acabar', 'o amor vai esfriar'. Isso é mentira. Deus já deu a ordem: tenham bom ânimo!\n\nCoragem não é ausência de medo, é agir apesar dele, confiando em Quem nos enviou. Encarem os desafios de 2026 (viagens, projetos) com a certeza de que Deus é o patrocinador dos sonhos de vocês.",
        desafio: "Façam uma declaração profética sobre o futuro da família. Digam em voz alta: 'Nossa casa é abençoada, nossos sonhos se cumprirão e serviremos ao Senhor todos os dias'."
    },
    "01-28": {
        titulo: "O Amor é Ação",
        verso: "Filhinhos, não amemos de palavra, nem de língua, mas por obra e em verdade. (1 João 3:18)",
        historia: "Dizer 'eu te amo' é fácil e necessário. Mas o amor se prova quando as palavras acabam e a ação começa. O amor é um verbo.",
        reflexao: "Amor é acordar mais cedo para fazer o café. É buscar aquele remédio na farmácia. É ouvir a mesma história pela décima vez com atenção. É perdoar. É ceder a vez.\n\nO romantismo real não é feito apenas de pétalas de rosas (embora sejam boas!), mas de atitudes diárias de renúncia e cuidado. Quem ama, facilita a vida do outro. Quem ama, protege.",
        desafio: "Identifique uma 'obra' prática que você pode fazer hoje para demonstrar amor sem usar palavras."
    },
    "01-29": {
        titulo: "A Esperança da Glória",
        verso: "Cristo em vós, esperança da glória. (Colossenses 1:27)",
        historia: "Nossa jornada não termina aqui. Somos peregrinos viajando para a Pátria Celestial. O casamento é uma sombra da união eterna entre Cristo e a Igreja.",
        reflexao: "Lembrem-se que os problemas daqui são passageiros. A eternidade é real. Viver com a perspectiva da eternidade muda tudo. Vale a pena brigar por uma toalha molhada se vamos reinar juntos para sempre?\n\nQue o lar de vocês seja um pedacinho do céu na terra. Um lugar onde a presença de Deus é tão real que quem entra sente paz. Vocês são embaixadores do Reino.",
        desafio: "Orem por gratidão pela salvação e pela certeza de passarem a eternidade juntos com Cristo."
    },
    "01-30": {
        titulo: "Gratidão: A Chave da Abundância",
        verso: "Entrai pelas portas dele com gratidão, e em seus átrios com louvor; louvai-o, e bendizei o seu nome. (Salmos 100:4)",
        historia: "A gratidão é a senha do Wi-Fi do céu. Ela abre portas. Um coração grato nunca é amargo.",
        reflexao: "Encerramos este ciclo de devocionais com a chave mestra: gratidão. Agradeçam pelo que têm, e terão mais. Reclamem do que falta, e perderão até o que têm. Agradeçam um pelo outro. Olhem para o seu cônjuge hoje e lembrem-se de quando oravam para ter alguém assim.\n\nDeus tem sido fiel até aqui (Ebenézer) e continuará sendo. Que a gratidão seja a trilha sonora desta casa todos os dias.",
        desafio: "Façam um 'Pote da Gratidão' (pode ser digital ou mental): listem 10 grandes bênçãos que Deus deu a vocês desde que se conheceram."
    }
};

console.log("Iniciando carga de devocionais DETALHADOS...");

update(ref(db, 'devocionais'), devocionais)
    .then(() => {
        console.log("SUCESSO! Conteúdo teológico carregado.");
        process.exit(0);
    })
    .catch((error) => {
        console.error("ERRO ao carregar:", error);
        process.exit(1);
    });
