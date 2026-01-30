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

// Conteúdo de 30/01 a 28/02 (30 dias)
const devocionais = {
    // FIM DE JANEIRO (RECOMEÇO DO CICLO)
    "01-30": {
        titulo: "O Mapa do Tesouro Escondido",
        verso: "Porque onde estiver o vosso tesouro, aí estará também o vosso coração. (Mateus 6:21)",
        historia: "Imagine que você descobre um mapa antigo no sótão da sua casa. Ele aponta para um tesouro enterrado no quintal. De repente, cavar buracos no jardim deixa de ser um trabalho sujo e cansativo para se tornar a atividade mais empolgante do dia. A perspectiva do tesouro muda a natureza do trabalho.",
        reflexao: "O casamento é esse quintal. Às vezes, cavar (resolver conflitos, alinhar finanças, servir na doença) parece apenas trabalho duro e sujo. Mas se perdermos de vista o tesouro (uma família que glorifica a Deus, filhos emocionalmente saudáveis, um companheirismo na velhice), vamos largar a pá e desistir.\n\nHoje, inauguramos um novo tempo de escavação profunda. Não estamos apenas sobrevivendo juntos; estamos construindo um legado eterno. Cada vez que você escolhe perdoar em vez de revidar, você achou uma moeda de ouro. Cada vez que escolhem orar juntos em vez de assistir TV, acharam um diamante. Onde está o coração de vocês hoje? Nas dificuldades da escavação ou na certeza do tesouro?",
        desafio: "Escondam um bombom ou um bilhete em algum lugar da casa e deem dicas para o outro achar. Quem achar, deve dizer uma qualidade 'de ouro' que vê no parceiro."
    },
    "01-31": {
        titulo: "A Arquitetura do Silêncio",
        verso: "Para tudo há um tempo... tempo de estar calado, e tempo de falar. (Eclesiastes 3:7)",
        historia: "Na música, o silêncio (pausa) é tão importante quanto a nota. Sem pausas, a música vira ruído. Um casamento sem pausas para ouvir vira uma guerra de monólogos.",
        reflexao: "Muitas vezes, pecamos pelo excesso de palavras. Queremos ganhar a discussão, queremos ter a última palavra, queremos explicar nosso ponto de vista exaustivamente. Mas o silêncio sábio edifica.\n\nExiste o silêncio da indiferença (que pune), e existe o silêncio do acolhimento (que escuta). Quando seu cônjuge estiver desabafando, experimente a 'arquitetura do silêncio': construir um espaço seguro onde ele possa falar sem ser interrompido, julgado ou consertado. Às vezes, o maior presente que você pode dar não é um conselho, é sua atenção plena e muda.",
        desafio: "Quando o outro estiver falando hoje, conte até 3 mentalmente antes de responder. Use essa pausa para checar se você realmente ouviu ou só estava preparando a resposta."
    },

    // FEVEREIRO - MÊS DO AMOR E DA CONSTRUÇÃO
    "02-01": {
        titulo: "O Primeiro Amor Renocado",
        verso: "Tenho, porém, contra ti que deixaste o teu primeiro amor. (Apocalipse 2:4)",
        historia: "Lembram do início? A ansiedade para ver a mensagem chegar, o coração acelerado antes do encontro, a vontade de estar junto fazendo nada. Com o tempo, o 'fazer' substitui o 'sentir'. A rotina vira o piloto automático.",
        reflexao: "Deus alerta a igreja de Éfeso não por falta de trabalho (eles trabalhavam muito!), mas por falta de paixão. No casamento, podemos ser ótimos sócios – pagamos contas, limpamos a casa, criamos filhos – mas péssimos amantes. O 'primeiro amor' não é apenas uma emoção, é uma prioridade.\n\nVoltar ao primeiro amor exige voltar às primeiras obras. O que vocês faziam quando namoravam? Façam de novo. O sentimento segue a atitude. Se agirmos com paixão, a paixão reacende. Não deixem a chama virar brasa fria.",
        desafio: "Recriem hoje um 'momento de namoro'. Pode ser ouvir a música que marcou o início ou visitar um lugar especial da história de vocês."
    },
    "02-02": {
        titulo: "O Espelho da Alma",
        verso: "Como na água o rosto corresponde ao rosto, assim o coração do homem ao homem. (Provérbios 27:19)",
        historia: "Você só consegue ver suas próprias costas se tiver um sistema de espelhos. No casamento, o cônjuge é o único espelho que mostra nossas 'costas' – nossos defeitos cegos que ninguém mais vê.",
        reflexao: "É doloroso olhar no espelho e ver falhas. Quando o marido diz 'você foi egoísta' ou a esposa diz 'você foi insensível', nossa reação natural é quebrar o espelho (atacar o outro). Mas Deus colocou essa pessoa na sua vida para te santificar.\n\nSeu cônjuge vê a versão de você que acorda despenteada e estressada. Se, mesmo vendo tudo isso, ele(a) decide ficar e amar, isso é um vislumbre do amor de Deus. Usem um ao outro para crescer, não para se ferir. Agradeça pelo espelho, mesmo quando a imagem não agrada.",
        desafio: "Fiquem de frente um para o outro em silêncio por 2 minutos, olhando nos olhos. É desconfortável, mas gera uma conexão profunda de 'eu vejo você'."
    },
    "02-03": {
        titulo: "A Terceira Corda",
        verso: "Um cordão de três dobras não se rompe com facilidade. (Eclesiastes 4:12)",
        historia: "Tente quebrar uma linha de costura. Fácil. Agora trance três linhas e tente. Muito difícil. A física explica, a teologia confirma.",
        reflexao: "Muitos casais vivem como duas cordas paralelas. Eles não se trançam. E pior, deixam a Terceira Corda (Deus) de fora, usando-a apenas como um 'step' de emergência. A proposta de Eclesiastes é entrelaçamento constante.\n\nComo trançar Deus no dia a dia? Não é só orar na comida. É perguntar: 'Amor, o que você acha que Deus quer nessa decisão?'. É orar antes de discutir. É ler a Bíblia e compartilhar. Quando Deus é a fibra central, a tensão da vida aperta o nó em vez de arrebentá-lo.",
        desafio: "Comecem uma leitura bíblica juntos hoje. Pode ser apenas um Salmo por dia. Leiam em voz alta um para o outro antes de dormir."
    },
    "02-04": {
        titulo: "Dívida de Amor",
        verso: "A ninguém devais coisa alguma, a não ser o amor com que vos ameis uns aos outros. (Romanos 13:8)",
        historia: "Imagine que você tem um cartão de crédito ilimitado, mas a fatura é paga por Outro. Sua única obrigação é usar esse crédito para abençoar alguém.",
        reflexao: "Paulo diz que temos uma dívida impagável: amar. Nunca chegaremos ao ponto de dizer: 'Pronto, já amei minha esposa o suficiente, agora estou quite'. O amor é uma dívida eterna.\n\nIsso muda a perspectiva de 'eu fiz minha parte'. No Reino, não existe 50/50. Existe 100/100. Eu dou 100% de mim, independente da resposta do outro, porque minha dívida é com Deus, e eu pago amando você. Isso liberta a gente da contabilidade mesquinha de 'quem fez mais'.",
        desafio: "Pergunte hoje: 'O que eu posso fazer para facilitar sua vida nesta semana?'. E faça, sem esperar nada em troca."
    },
    "02-05": {
        titulo: "O Poder do Toque",
        verso: "E, estendendo a mão, tocou-lhe... (Mateus 8:3)",
        historia: "Jesus curava com a Palavra, mas muitas vezes escolhia curar com o Toque. O leproso, intocável pela lei, sentiu a mão de Cristo antes de sentir a cura.",
        reflexao: "A pele é o maior órgão do corpo e tem fome. Estudos mostram que casais que se tocam mais (abraços, mãos dadas, cafuné) liberam mais ocitocina (o hormônio do vínculo) e brigam menos. O toque não-sexual é vital para a segurança emocional.\n\nNão deixe o toque ser apenas um prelúdio para o sexo. Toque para dizer 'estou aqui'. Abrace por 20 segundos (tempo necessário para a química do cérebro mudar). O toque físico quebra barreiras que palavras não conseguem ultrapassar.",
        desafio: "Meta de Toque: Hoje, tentem se encostar (mão, ombro, abraço) sempre que estiverem no mesmo cômodo. Restaurem a física do amor."
    },
    "02-06": {
        titulo: "Zonas de Perigo",
        verso: "Vigiai e orai, para que não entreis em tentação. (Mateus 26:41)",
        historia: "Todo motorista sabe onde estão os buracos da estrada que ele usa todo dia. Ele desvia automaticamente. Vocês conhecem os buracos do casamento?",
        reflexao: "Quais são os temas ou situações que sempre geram briga? Dinheiro? A família dele? A bagunça dela? Fome? Cansaço? Mapear essas 'zonas de perigo' é inteligência emocional.\n\nSe vocês sabem que discutir finanças tarde da noite dá briga, mudem o horário. Se sabem que falar da sogra gera tensão, mudem a abordagem. 'Vigiar' é antecipar o problema e desviar antes de cair. Não sejam pegos de surpresa pelo que é previsível.",
        desafio: "Identifiquem UM gatilho recorrente de brigas e combinem uma 'palavra de segurança' para parar a conversa quando ela for ativada."
    },
    "02-07": {
        titulo: "Rir é Santo",
        verso: "Sara disse: Deus me deu motivo de riso; e todo aquele que ouvir isso rirá comigo. (Gênesis 21:6)",
        historia: "A promessa de Isaque parecia impossível, mas quando cumpriu-se, trouxe riso. O nome Isaque significa 'riso'. Deus gosta de ver seus filhos rindo.",
        reflexao: "A seriedade excessiva mata o romance. A vida já é dura lá fora. Dentro de casa, cultivem a leveza. Riam dos próprios erros. Façam piadas internas que só vocês entendem.\n\nUm casal que ri junto cria uma imunidade contra a amargura. O bom humor é um lubrificante para as engrenagens da convivência. Se as coisas rangearem hoje, tentem aplicar uma dose de riso em vez de óleo quente.",
        desafio: "Assistam a um vídeo engraçado juntos ou relembrem uma situação micosa/engraçada que viveram. O objetivo é dar uma gargalhada real."
    },
    "02-08": {
        titulo: "O Ministério da Reconciliação",
        verso: "E tudo isto provém de Deus, que nos reconciliou consigo mesmo por Jesus Cristo, e nos deu o ministério da reconciliação. (2 Coríntios 5:18)",
        historia: "Reconciliar é 'fazer as pazes entre dois que estavam em guerra'. É a essência do Evangelho. Se somos embaixadores de Cristo, nossa primeira embaixada é o lar.",
        reflexao: "Não dormir brigado não é apenas uma regra, é uma proteção espiritual. A cama dividida por um muro frio de silêncio é o playground do diabo. Quebrem o orgulho. Quem pede perdão primeiro não é o mais fraco, é o mais parecido com Cristo.\n\nA reconciliação não exige que vocês concordem em tudo, mas exige que a relação seja mais importante que o problema. Restaurem a ponte, mesmo que o problema ainda precise ser resolvido depois.",
        desafio: "Se há alguma frieza, quebrem o gelo agora. Um abraço, um 'desculpa', um 'eu te amo'. Não deixem para amanhã o que garante a paz de hoje."
    },
    "02-09": {
        titulo: "Jardinagem Constante",
        verso: "O preguiçoso deixa o telhado vazar, e a casa cair. (Eclesiastes 10:18)",
        historia: "Um jardim lindo não acontece por acaso; ele acontece por cuidado intencional. Se você não fizer nada, o mato cresce. A inércia trabalha contra o casamento.",
        reflexao: "A 'preguiça' no casamento não é ficar no sofá, é a passividade emocional. É deixar de conquistar, deixar de elogiar, deixar de ouvir. É achar que 'agora que casou, tá garantido'. Nada está garantido. O amor é uma planta sensível.\n\nArranquem as ervas daninhas (críticas, comparações) enquanto são pequenas. Reguem com palavras de afirmação. O 'teto' do relacionamento precisa de manutenção preventiva, não apenas corretiva quando a goteira já molhou o sofá.",
        desafio: "Faça uma 'manutenção preventiva' hoje: pergunte 'Como está o seu amor por mim numa escala de 0 a 10? O que posso fazer para subir 1 ponto?'."
    },
    "02-10": {
        titulo: "Aos Pés um do Outro",
        verso: "Submetendo-vos uns aos outros no temor de Deus. (Efésios 5:21)",
        historia: "A cultura diz: 'Mande! Lidere! Seja o chefe!'. O Reino diz: 'Sirva! Submeta-se!'. A submissão bíblica não é inferioridade, é funcionalidade e amor.",
        reflexao: "A submissão mútua é uma dança onde ninguém pisa no pé de ninguém porque ambos seguem a música de Cristo. O marido ama a esposa como Cristo (entregando a vida), e a esposa respeita o marido como à Igreja.\n\nÉ uma competição santa de quem serve mais. Quando os dois buscam satisfazer o outro antes de a si mesmos, as necessidades de ambos são supridas abundantemente. O egoísmo diz 'eu primeiro'. O amor diz 'você primeiro'.",
        desafio: "Hoje, em uma decisão pequena (o que comer, o que assistir), ceda a preferência ao outro alegremente, dizendo: 'Sua felicidade me faz feliz'."
    },
    "02-11": {
        titulo: "O Fogo do Altar",
        verso: "O fogo arderá continuamente sobre o altar; não se apagará. (Levítico 6:13)",
        historia: "No Tabernáculo, a responsabilidade dos sacerdotes era nunca deixar o fogo apagar. Chovesse ou fizesse sol, a chama tinha que subir.",
        reflexao: "A vida espiritual do casal é esse altar. Se o fogo apagar (se pararem de orar, de buscar a Deus), o ambiente esfria e as 'feras' se aproximam. Manter o fogo aceso dá trabalho. Exige colocar lenha (Palavra) todo dia, tirar as cinzas (arrependimento) todo dia.\n\nNão delegue a espiritualidade da casa para o outro. Sejam sacerdotes juntos. Um lar onde o fogo de Deus arde é um lugar onde os demônios não conseguem fazer ninho.",
        desafio: "Acendam uma vela ou luz suave, desliguem tudo e orem juntos por 5 minutos, pedindo que o Espírito Santo incendeie o amor de vocês."
    },
    "02-12": {
        titulo: "Palavras que Constroem",
        verso: "Nenhuma palavra torpe saia da vossa boca, mas apenas a que for útil para edificar. (Efésios 4:29)",
        historia: "Imagine que cada palavra sua é um tijolo. Você está construindo uma catedral ou uma prisão para seu cônjuge?",
        reflexao: "Palavras torpes não são apenas palavrões. São palavras que apodrecem: sarcasmo, diminuição, ingratidão. 'Você é igual sua mãe', 'Você nunca vai aprender'. Isso destrói.\n\nPalavras que edificam são: 'Eu acredito em você', 'Obrigado por isso', 'Você é linda(o)'. Profetizem o bem. Usem a boca para abençoar, mesmo quando estiverem com raiva. A raiva passa, a palavra dita fica marcada.",
        desafio: "Envie 3 mensagens de texto ao longo do dia com elogios sinceros ou encorajamento para seu cônjuge."
    },
    "02-13": {
        titulo: "A Matemática da Unidade",
        verso: "E serão os dois uma só carne. (Marcos 10:8)",
        historia: "Deus não sabe somar (1+1=2), Ele só sabe multiplicar. No casamento, 1+1=1. É uma fusão nuclear.",
        reflexao: "Ser 'uma só carne' afeta tudo. Se o braço dói, o corpo todo sente. Se o marido está com problemas, a esposa não pode dizer 'isso é problema dele'. É problema do corpo!\n\nCelebrem essa unidade. Vocês são um time. Não joguem um contra o outro. O inimigo é quem está fora, não quem dorme ao lado. Protejam a unidade a todo custo. Um reino dividido não subsiste.",
        desafio: "Façam algo que exija cooperação hoje: cozinhem juntos, montem algo ou resolvam um problema administrativo em dupla."
    },
    "02-14": {
        titulo: "O Amor Romântico (Valentine's Day)",
        verso: "Beije-me ele com os beijos da sua boca; porque melhor é o teu amor do que o vinho. (Cânticos 1:2)",
        historia: "Hoje o mundo celebra o amor. E Deus inventou o romance! O livro de Cantares é a prova de que Deus celebra a paixão, o desejo e a conquista.",
        reflexao: "Neste dia, reacendam a chama da conquista. Não deixem o casamento virar uma empresa de gestão doméstica. Vocês são amantes! O vinho na Bíblia simboliza alegria e festa. O amor de vocês deve embriagar, deve ser melhor que qualquer festa.\n\nSurpreenda. Façam algo fora da rotina. O romance diz: 'Você ainda é a pessoa mais importante e atraente do mundo para mim'.",
        desafio: "Preparem uma surpresa romântica hoje. Não precisa ser cara, precisa ser intencional. Um bilhete, um chocolate, um jantar à luz de velas em casa."
    },
    "02-15": {
        titulo: "Companheiros de Jugo",
        verso: "Vinde a mim, todos os que estais cansados... e tomai sobre vós o meu jugo. (Mateus 11:28-29)",
        historia: "O jugo era uma peça de madeira que unia dois bois para arar a terra. Se os bois andassem em ritmos diferentes, o jugo machucava. Se andassem juntos, o peso dividia pela metade.",
        reflexao: "Casamento é dividir o jugo. A carga da vida (filhos, contas, trabalho) é pesada. Mas quando dois puxam juntos, no mesmo ritmo e direção, o fardo fica leve. Jesus é o terceiro no jugo, dando a direção.\n\nSe vocês estão se sentindo machucados, talvez estejam em ritmos diferentes. Um correndo demais, outro ficando para trás. Conversem para ajustar o passo. Andar junto é mais importante que chegar rápido.",
        desafio: "Pergunte: 'Existe algum peso que você está carregando sozinho e que eu posso ajudar a levar?'."
    },
    "02-16": {
        titulo: "A Graça na Cozinha",
        verso: "Melhor é um prato de hortaliça, onde há amor, do que o boi gordo, e com ele o ódio. (Provérbios 15:17)",
        historia: "Salomão, o homem mais rico do mundo, diz que o cardápio importa menos que a companhia. O luxo sem paz é um inferno dourado.",
        reflexao: "Muitas vezes focamos em ter 'coisas': a casa melhor, o carro novo, o jantar chique. Mas a atmosfera da casa vale mais. Comer ovo frito rindo com quem se ama é melhor que comer lagosta em silêncio hostil.\n\nValorizem a paz doméstica acima do conforto material. Construam um lar onde é gostoso estar, independente do que tem na geladeira. A simplicidade com amor é o verdadeiro luxo do Reino.",
        desafio: "Preparem uma refeição simples juntos hoje (ou peçam algo), mas com o objetivo de criar o ambiente mais agradável possível (música, conversa boa, sem celulares)."
    },
    "02-17": {
        titulo: "Ouvir com o Coração",
        verso: "Todo homem seja pronto para ouvir, tardio para falar, tardio para se irar. (Tiago 1:19)",
        historia: "Temos dois ouvidos e uma boca. Deveríamos ouvir o dobro do que falamos. Mas geralmente fazemos o contrário.",
        reflexao: "Ouvir é um ato de amor. Ouvir sem interromper. Ouvir para entender, não para responder. Muitas vezes seu cônjuge não quer uma solução, quer empatia. Quer um 'eu entendo você', 'deve ser difícil mesmo'.\n\nValidar os sentimentos do outro ('eu vejo que você está triste') cura a solidão. Quando nos sentimos ouvidos, nos sentimos amados. Pratiquem a escuta ativa hoje.",
        desafio: "Façam o exercício do espelho: um fala por 3 minutos sobre como se sente, e o outro só pode repetir o que ouviu ('então você está dizendo que...') para confirmar se entendeu."
    },
    "02-18": {
        titulo: "A Proteção da Aliança",
        verso: "O que Deus ajuntou não o separe o homem. (Mateus 19:6)",
        historia: "Aliança não é um contrato (baseado em performance), é um pacto (baseado em compromisso incondicional). Contratos você rasga se a outra parte falhar. Pactos são até a morte.",
        reflexao: "A segurança de saber 'ele(a) não vai embora' permite que sejamos vulneráveis. O mundo ameaça com divórcio a qualquer dificuldade. No Reino, removemos a palavra 'divórcio' do vocabulário. Não é uma opção.\n\nQuando resolvemos os problemas com a porta de saída trancada, somos forçados a encontrar soluções reais, não fugas. A aliança protege o amor durante as tempestades, mantendo vocês amarrados um ao outro até o sol voltar.",
        desafio: "Olhem para as alianças nas mãos um do outro e renovem o voto oralmente: 'Eu escolho você novamente hoje e para sempre'."
    },
    "02-19": {
        titulo: "Finanças: O Senhorio de Cristo",
        verso: "Ao Senhor pertence a terra e tudo o que nela se contém. (Salmos 24:1)",
        historia: "Se Deus é dono de tudo, nós somos apenas gerentes de uma conta conjunta do Céu. Como estamos gastando o dinheiro do Chefe?",
        reflexao: "Dinheiro revela coração. Gastamos no que amamos. Se brigamos por dinheiro, estamos disputando poder. Entreguem as finanças a Deus.\n\nSejam transparentes. Sejam generosos. Orem antes de grandes compras. Um casal que alinha o bolso com a Bíblia prospera não apenas financeiramente, mas em paz. A provisão segue a obediência.",
        desafio: "Revisem o 'Banco de Sonhos' do aplicativo. Orem consagrando esses planos a Deus, declarando que Ele é a fonte de todos os recursos."
    },
    "02-20": {
        titulo: "Perdão Total",
        verso: "Sede uns para com os outros benignos, compassivos, perdoando-vos uns aos outros. (Efésios 4:32)",
        historia: "O perdão não é um sentimento, é uma decisão. É cancelar a dívida, mesmo que o devedor não mereça.",
        reflexao: "Guardar mágoa é tomar veneno esperando que o outro morra. Libere o perdão para você ser livre. No casamento, o perdão deve ser rápido. Não deixem o lixo acumular.\n\n'Mas ele fez de novo!' Perdoe de novo. O amor não conta erros. Claro, conversem, ajustem, busquem ajuda se necessário, mas mantenham o coração limpo de amargura. Um coração perdoador é um solo fértil para o amor.",
        desafio: "Existe algum 'assunto proibido' ou mágoa antiga que volta e meia aparece? Decidam enterrá-lo hoje definitivamente."
    },
    "02-21": {
        titulo: "Alegria no Caminho",
        verso: "Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele. (Salmos 118:24)",
        historia: "A vida não começa 'quando' tivermos a casa própria, ou 'quando' viajarmos. A vida é agora. Este dia comum, numa terça-feira qualquer, é um presente.",
        reflexao: "Não esperem 2026 para serem felizes. A felicidade está no café da manhã juntos, na piada interna, no abraço de boa noite. Aprendam a celebrar as pequenas vitórias.\n\nUm casal grato é um casal feliz. A ingratidão cega a gente para as bênçãos diárias. Abram os olhos para o maná de hoje. Ele é suficiente e delicioso.",
        desafio: "Façam uma lista de 5 coisas simples de hoje pelas quais são gratos (ex: chuveiro quente, saúde, cama macia)."
    },
    "02-22": {
        titulo: "Honra aos Pais",
        verso: "Honra a teu pai e a tua mãe, para que se prolonguem os teus dias na terra. (Êxodo 20:12)",
        historia: "Honrar os pais não significa obedecê-los como crianças, mas valorizar a raiz de onde viemos. Um casal abençoado honra suas origens.",
        reflexao: "Sogros podem ser bênção ou desafio. A sabedoria está em estabelecer limites saudáveis (deixar pai e mãe) mantendo o amor e o respeito. Nunca falem mal dos pais do outro.\n\nAme a família do seu cônjuge porque ela produziu a pessoa que você ama. Honrar traz longevidade e paz para a sua própria casa.",
        desafio: "Enviem uma mensagem de carinho ou gratidão para seus pais/sogros hoje."
    },
    "02-23": {
        titulo: "A Inteligência da Mansidão",
        verso: "A resposta branda desvia o furor, mas a palavra dura suscita a ira. (Provérbios 15:1)",
        historia: "Num incêndio, você joga água ou gasolina? A resposta dura é gasolina. A resposta branda é água.",
        reflexao: "Quando o outro levanta a voz, a tentação é levantar também. Isso é a escalada do conflito. A inteligência bíblica diz: baixe o tom. Fale mais baixo. Responda com doçura.\n\nIsso não é fraqueza, é domínio próprio. É preciso muita força para ser manso. Quem grita perde a razão. Quem fala com calma controla a situação e convida a paz de volta para a sala.",
        desafio: "Se houver qualquer tensão hoje, tentem responder num tom de voz sussurrado ou muito calmo. Vejam o efeito prático."
    },
    "02-24": {
        titulo: "Servir é Reinar",
        verso: "Maior é o que serve. (Lucas 22:27)",
        historia: "No Reino de Deus, a pirâmide é invertida. O Rei lava os pés. Quem quer ser grande no casamento, deve ser o maior servo.",
        reflexao: "Sirvam um ao outro com alegria. Leve água na cama. Ofereça massagem. Faça o prato. Busque o chinelo. Esses atos 'pequenos' gritam 'eu me importo com seu conforto'.\n\nQunado os dois competem para servir, o egoísmo morre de fome. O casamento vira um refúgio de cuidado mútuo. Que delícia é chegar em casa e ser cuidado!",
        desafio: "Faça o 'Dia do Rei/Rainha': Escolham quem será servido hoje com mimos especiais, e amanhã troquem."
    },
    "02-25": {
        titulo: "Orar Sem Cessar",
        verso: "Orai sem cessar. Em tudo dai graças. (1 Tessalonicenses 5:17-18)",
        historia: "A oração não é um ritual religioso, é uma conversa contínua com o Pai. É manter a linha aberta.",
        reflexao: "Incluam Deus nos detalhes. 'Senhor, nos ajude a escolher esse sofá'. 'Deus, abençoe meu marido nessa reunião agora'. Transformem preocupações em orações instantâneas.\n\nUm casal que ora junto por tudo desenvolve uma intimidade espiritual inabalável. Vocês não estão sozinhos nas decisões. O Sócio majoritário está na linha.",
        desafio: "Façam pequenas orações de 10 segundos ao longo do dia sobre coisas triviais que acontecerem."
    },
    "02-26": {
        titulo: "O Corpo é Templo",
        verso: "Acaso não sabeis que o vosso corpo é santuário do Espírito Santo? (1 Coríntios 6:19)",
        historia: "Cuidar da saúde também é ato espiritual e conjugal. Queremos envelhecer juntos e com qualidade.",
        reflexao: "Cuidem-se. Alimentação, exercício, descanso. Amar o cônjuge é cuidar do corpo que pertence a ele(a). Queremos ter energia para as viagens de 2026 e para brincar com os netos no futuro.\n\nIncentivem-se mutuamente na saúde, não na 'chatice', mas no amor. 'Quero você vivo e bem por muito tempo ao meu lado'.",
        desafio: "Façam uma caminhada juntos ou preparem uma refeição super saudável hoje celebrando a vida."
    },
    "02-27": {
        titulo: "Abençoando o Futuro",
        verso: "Porque eu bem sei os planos que tenho para vós... planos de paz, e não de mal, para vos dar um futuro e uma esperança. (Jeremias 29:11)",
        historia: "O futuro não é um lugar escuro de medo, é um território preparado por Deus. Ele já está lá.",
        reflexao: "Sonhem com 2026. Sonhem com os próximos 10, 20 anos. Escrevam a visão. Um casal sem sonhos murcha. Onde vocês querem estar? Quem querem ser?\n\nDeus ama sonhadores. Ele é o Deus da esperança. Alinhem os sonhos de vocês com os propósitos dEle e descansem. O melhor ainda está por vir.",
        desafio: "Escrevam uma carta para o 'Casal de Fevereiro de 2027'. Como vocês esperam estar? Guardem para ler ano que vem."
    },
    "02-28": {
        titulo: "O Amor Nunca Falha",
        verso: "O amor jamais acaba. (1 Coríntios 13:8)",
        historia: "Encerramos o mês do amor com a maior verdade do universo: tudo passa, mas o amor permanece. Ele é a substância da eternidade.",
        reflexao: "Profecias acabarão, línguas cessarão, conhecimento passará. Mas o amor que vocês constroem hoje ecoará na eternidade. Invistam no que é eterno.\n\nAmem com força. Perdoem rápido. Riam muito. Deus uniu vocês com um propósito lindo. Olhem um para o outro agora e vejam o presente de Deus. Vocês são a maior riqueza um do outro.",
        desafio: "Renovem seus votos de amor de forma simples e privada hoje e celebrem com um jantar ou momento especial o fim deste mês abençoado."
    }
};

console.log("Iniciando carga de devocionais (FEVEREIRO/26)...");

update(ref(db, 'devocionais'), devocionais)
    .then(() => {
        console.log("SUCESSO! Conteúdo de Fevereiro carregado.");
        process.exit(0);
    })
    .catch((error) => {
        console.error("ERRO ao carregar:", error);
        process.exit(1);
    });
