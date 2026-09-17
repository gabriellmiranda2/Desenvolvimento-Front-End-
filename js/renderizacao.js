// js/renderizacao.js
// Responsável por UMA coisa: desenhar os cartões na tela a partir de
// um array de tarefas. Não sabe de onde os dados vieram, não decide
// o que deve aparecer (isso é papel da derivação) e não lê filtros.
//
// Os valores internos de status/prioridade em dados.json permanecem os
// mesmos de sempre ("a-fazer", "em-andamento", "em-revisao", "concluida",
// "baixa", "media", "alta") — os mapas abaixo só traduzem esses valores
// para o texto exibido, sem alterar o contrato usado pelo restante do
// código (derivacao.js, estado.js, eventos.js).

const PRIORIDADE_TEXTO = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

const ETAPA_TEXTO = {
  "a-fazer": "Agendado",
  "em-andamento": "Em serviço",
  "em-revisao": "Inspeção",
  concluida: "Finalizado",
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
  paragrafo.className = classeExtra
    ? `cartao__campo ${classeExtra}`
    : "cartao__campo";

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

  const veiculo = document.createElement("p");
  veiculo.className = "cartao__veiculo";
  veiculo.textContent = tarefa.projeto;

  const selo = document.createElement("span");
  selo.className = `cartao__selo cartao__selo--${tarefa.prioridade}`;
  selo.textContent = prioridadeTexto;

  cabecalho.append(veiculo, selo);

  const titulo = document.createElement("h4");
  titulo.className = "cartao__titulo";
  titulo.textContent = tarefa.titulo;

  const etapa = document.createElement("p");
  etapa.className = "cartao__etapa";
  etapa.textContent = etapaTexto;

  const detalhes = document.createElement("div");
  detalhes.className = "cartao__detalhes";
  detalhes.append(
    criarCampo("Especialista", tarefa.responsavel),
    criarCampo("Data prevista", tarefa.prazo, "cartao__campo--prazo")
  );

  const rodape = document.createElement("p");
  rodape.className = "cartao__rodape";
  rodape.textContent = `Operação · OP-${tarefa.id}`;

  artigo.append(cabecalho, titulo, etapa, detalhes, rodape);
  item.append(artigo);
  return item;
}

// Recebe o array já pronto (a lista visível, calculada por
// derivarTarefasVisiveis) e substitui inteiramente o conteúdo de cada
// coluna. Interações repetidas nunca duplicam cartões porque cada
// chamada começa limpando as listas antes de desenhar de novo.
export function renderizarTarefas(tarefas) {
  const listas = obterListasPorStatus();

  Object.values(listas).forEach((lista) => {
    if (lista) lista.textContent = "";
  });

  tarefas.forEach((tarefa) => {
    const lista = listas[tarefa.status];
    if (!lista) return;
    lista.appendChild(criarCartao(tarefa));
  });
}
