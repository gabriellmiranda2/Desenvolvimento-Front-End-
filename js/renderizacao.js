// Desenha os cartões a partir do array recebido. O estado continua sendo a
// única fonte de verdade; este módulo apenas projeta a lista na interface.

const PRIORIDADE_TEXTO = { baixa: "Baixa", media: "Média", alta: "Alta" };
const ETAPA_TEXTO = {
  "a-fazer": "Em aberto",
  "em-andamento": "Em investigação",
  "em-revisao": "Em análise",
  concluida: "Encerrado",
};

const PERSONAGENS = {
  "Patrick Jane": "imagens/patrick-jane.png",
  "Teresa Lisbon": "imagens/teresa-lisbon.png",
  "Kimball Cho": "imagens/kimball-cho.png",
  "Grace Van Pelt": "imagens/grace-van-pelt.png",
};

function obterListasPorStatus() {
  return {
    "a-fazer": document.querySelector(".coluna--a-fazer .cartoes"),
    "em-andamento": document.querySelector(".coluna--em-andamento .cartoes"),
    "em-revisao": document.querySelector(".coluna--em-revisao .cartoes"),
    concluida: document.querySelector(".coluna--concluida .cartoes"),
  };
}

function criarCampo(rotulo, valor, classeExtra) {
  const paragrafo = document.createElement("p");
  paragrafo.className = classeExtra ? `cartao__campo ${classeExtra}` : "cartao__campo";
  const forte = document.createElement("strong");
  forte.className = "cartao__rotulo";
  forte.textContent = rotulo;
  const valorSpan = document.createElement("span");
  valorSpan.className = "cartao__valor";
  valorSpan.textContent = valor;
  paragrafo.append(forte, valorSpan);
  return paragrafo;
}

function criarCartao(tarefa) {
  const item = document.createElement("li");
  const artigo = document.createElement("article");
  artigo.className = "cartao";

  const prioridadeTexto = PRIORIDADE_TEXTO[tarefa.prioridade] ?? tarefa.prioridade;
  const etapaTexto = ETAPA_TEXTO[tarefa.status] ?? tarefa.status;

  const cabecalho = document.createElement("div");
  cabecalho.className = "cartao__cabecalho";

  const caso = document.createElement("p");
  caso.className = "cartao__veiculo";
  caso.textContent = tarefa.projeto;

  const selo = document.createElement("span");
  selo.className = `cartao__selo cartao__selo--${tarefa.prioridade}`;
  selo.textContent = prioridadeTexto;
  cabecalho.append(caso, selo);

  const identidade = document.createElement("div");
  identidade.className = "cartao__identidade";

  const avatar = document.createElement("img");
  avatar.className = "cartao__avatar";
  avatar.src = PERSONAGENS[tarefa.responsavel] ?? "imagens/patrick-jane.png";
  avatar.alt = `Retrato de ${tarefa.responsavel}`;
  avatar.loading = "lazy";

  const titulo = document.createElement("h4");
  titulo.className = "cartao__titulo";
  titulo.textContent = tarefa.titulo;
  identidade.append(avatar, titulo);

  const etapa = document.createElement("p");
  etapa.className = "cartao__etapa";
  etapa.textContent = etapaTexto;

  const detalhes = document.createElement("div");
  detalhes.className = "cartao__detalhes";
  detalhes.append(
    criarCampo("Investigador", tarefa.responsavel),
    criarCampo("Prazo", tarefa.prazo, "cartao__campo--prazo")
  );

  const rodape = document.createElement("p");
  rodape.className = "cartao__rodape";
  rodape.textContent = `Arquivo · CBI-${tarefa.id}`;

  artigo.append(cabecalho, identidade, etapa, detalhes, rodape);
  item.append(artigo);
  return item;
}

export function renderizarTarefas(tarefas) {
  const listas = obterListasPorStatus();
  Object.values(listas).forEach((lista) => { if (lista) lista.textContent = ""; });

  tarefas.forEach((tarefa) => {
    const lista = listas[tarefa.status];
    if (lista) lista.appendChild(criarCartao(tarefa));
  });
}
