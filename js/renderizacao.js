// js/renderizacao.js
// Responsável por UMA coisa: desenhar os cartões na tela a partir de
// um array de tarefas. Não sabe de onde os dados vieram, não decide
// o que deve aparecer (isso é papel da derivação) e não lê filtros.

const PRIORIDADE_TEXTO = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
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
  if (classeExtra) paragrafo.className = classeExtra;

  const forte = document.createElement("strong");
  forte.textContent = `${rotulo}:`;

  paragrafo.append(forte, ` ${valor}`);
  return paragrafo;
}

function criarCartao(tarefa) {
  const item = document.createElement("li");
  const artigo = document.createElement("article");
  artigo.className = "cartao";

  const titulo = document.createElement("h4");
  titulo.textContent = tarefa.titulo;

  const prioridadeTexto =
    PRIORIDADE_TEXTO[tarefa.prioridade] ?? tarefa.prioridade;

  artigo.append(
    titulo,
    criarCampo("Projeto", tarefa.projeto),
    criarCampo("Responsável", tarefa.responsavel),
    criarCampo("Prazo", tarefa.prazo, "prazo"),
    criarCampo(
      "Prioridade",
      prioridadeTexto,
      `prioridade prioridade--${tarefa.prioridade}`
    )
  );

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
