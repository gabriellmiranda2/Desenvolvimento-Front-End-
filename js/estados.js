// js/estados.js
// Ponto único de renderização (E4). A interface é sempre uma projeção
// do objeto de estado: carregamento, erro, origem vazia, resultado vazio
// ou sucesso. Os painéis extras do redesign também são calculados a
// partir de estado.tarefas, sem criar uma segunda fonte de verdade.

import { renderizarTarefas } from "./renderizacao.js";
import { derivarTarefasVisiveis, contarPorStatus } from "./derivacao.js";

const regiaoStatus = document.getElementById("status-tarefas");
const quadro = document.querySelector(".quadro");

const elementoContagemTotal = document.getElementById("contagem-total");
const elementoContagemAgendado = document.getElementById("contagem-agendado");
const elementoContagemServico = document.getElementById("contagem-servico");
const elementoContagemInspecao = document.getElementById("contagem-inspecao");
const elementoContagemFinalizado = document.getElementById("contagem-finalizado");

const colunas = {
  "a-fazer": document.querySelector(".coluna--a-fazer .coluna__numero"),
  "em-andamento": document.querySelector(".coluna--em-andamento .coluna__numero"),
  "em-revisao": document.querySelector(".coluna--em-revisao .coluna__numero"),
  concluida: document.querySelector(".coluna--concluida .coluna__numero"),
};

const visaoTotal = document.getElementById("visao-total");
const visaoAgendado = document.getElementById("visao-agendado");
const visaoServico = document.getElementById("visao-servico");
const visaoInspecao = document.getElementById("visao-inspecao");
const visaoFinalizado = document.getElementById("visao-finalizado");

const barras = {
  "a-fazer": document.getElementById("barra-agendado"),
  "em-andamento": document.getElementById("barra-servico"),
  "em-revisao": document.getElementById("barra-inspecao"),
  concluida: document.getElementById("barra-finalizado"),
};

const prioridadeAlta = document.getElementById("prioridade-alta");
const prioridadeMedia = document.getElementById("prioridade-media");
const prioridadeBaixa = document.getElementById("prioridade-baixa");
const desempenhoTotal = document.getElementById("desempenho-total");
const desempenhoAlta = document.getElementById("desempenho-alta");
const desempenhoEspecialistas = document.getElementById("desempenho-especialistas");

let elementoMensagem = null;

function obterElementoMensagem() {
  if (!elementoMensagem) {
    elementoMensagem = document.createElement("p");
    elementoMensagem.id = "quadro-mensagem";
    elementoMensagem.hidden = true;
    quadro.appendChild(elementoMensagem);
  }
  return elementoMensagem;
}

function alternarColunas(mostrar) {
  document.querySelectorAll(".quadro .coluna").forEach((coluna) => {
    coluna.hidden = !mostrar;
  });
}

function mostrarMensagem(texto) {
  const mensagem = obterElementoMensagem();
  alternarColunas(false);
  mensagem.hidden = false;
  mensagem.textContent = texto;
}

function esconderMensagem() {
  if (!elementoMensagem) return;
  elementoMensagem.hidden = true;
  elementoMensagem.textContent = "";
}

function anunciar(texto) {
  regiaoStatus.textContent = texto;
}

function contarPrioridades(tarefas) {
  return tarefas.reduce(
    (contagem, tarefa) => {
      if (contagem[tarefa.prioridade] !== undefined) {
        contagem[tarefa.prioridade] += 1;
      }
      return contagem;
    },
    { alta: 0, media: 0, baixa: 0 }
  );
}

function contarEspecialistas(tarefas) {
  return new Set(tarefas.map((tarefa) => tarefa.responsavel).filter(Boolean)).size;
}

function atualizarDashboard(tarefas) {
  const contagem = contarPorStatus(tarefas);

  elementoContagemTotal.textContent = tarefas.length;
  elementoContagemAgendado.textContent = contagem["a-fazer"];
  elementoContagemServico.textContent = contagem["em-andamento"];
  elementoContagemInspecao.textContent = contagem["em-revisao"];
  elementoContagemFinalizado.textContent = contagem.concluida;

  Object.entries(colunas).forEach(([status, elemento]) => {
    if (elemento) elemento.textContent = contagem[status];
  });

  const total = tarefas.length || 1;
  visaoTotal.textContent = `${tarefas.length} ${tarefas.length === 1 ? "operação" : "operações"}`;
  visaoAgendado.textContent = contagem["a-fazer"];
  visaoServico.textContent = contagem["em-andamento"];
  visaoInspecao.textContent = contagem["em-revisao"];
  visaoFinalizado.textContent = contagem.concluida;

  barras["a-fazer"].style.width = `${(contagem["a-fazer"] / total) * 100}%`;
  barras["em-andamento"].style.width = `${(contagem["em-andamento"] / total) * 100}%`;
  barras["em-revisao"].style.width = `${(contagem["em-revisao"] / total) * 100}%`;
  barras.concluida.style.width = `${(contagem.concluida / total) * 100}%`;

  const prioridades = contarPrioridades(tarefas);
  prioridadeAlta.textContent = prioridades.alta;
  prioridadeMedia.textContent = prioridades.media;
  prioridadeBaixa.textContent = prioridades.baixa;

  desempenhoTotal.textContent = tarefas.length;
  desempenhoAlta.textContent = prioridades.alta;
  desempenhoEspecialistas.textContent = contarEspecialistas(tarefas);
}

function limparDashboard() {
  [
    elementoContagemTotal,
    elementoContagemAgendado,
    elementoContagemServico,
    elementoContagemInspecao,
    elementoContagemFinalizado,
    visaoTotal,
    visaoAgendado,
    visaoServico,
    visaoInspecao,
    visaoFinalizado,
    prioridadeAlta,
    prioridadeMedia,
    prioridadeBaixa,
    desempenhoTotal,
    desempenhoAlta,
    desempenhoEspecialistas,
    ...Object.values(colunas),
  ].forEach((elemento) => {
    if (elemento) elemento.textContent = "–";
  });

  Object.values(barras).forEach((barra) => {
    if (barra) barra.style.width = "0%";
  });
}

export function renderizar(estado) {
  if (estado.carregamento === "carregando") {
    limparDashboard();
    mostrarMensagem("Carregando operações da frota...");
    anunciar("Carregando operações da frota...");
    return;
  }

  atualizarDashboard(estado.tarefas);

  if (estado.erro) {
    mostrarMensagem(estado.erro);
    anunciar(estado.erro);
    return;
  }

  if (estado.tarefas.length === 0) {
    mostrarMensagem("Nenhuma operação cadastrada na frota.");
    anunciar("Nenhuma operação cadastrada na frota.");
    return;
  }

  const visiveis = derivarTarefasVisiveis(estado);

  if (visiveis.length === 0) {
    mostrarMensagem(
      "Nenhuma operação encontrada para os critérios atuais. Ajuste ou limpe os filtros."
    );
    anunciar("Nenhuma operação encontrada para os critérios atuais.");
    return;
  }

  esconderMensagem();
  alternarColunas(true);
  renderizarTarefas(visiveis);

  const total = estado.tarefas.length;
  const quantidade = visiveis.length;
  anunciar(
    `${quantidade} ${quantidade === 1 ? "operação encontrada" : "operações encontradas"} de ${total} ${total === 1 ? "operação" : "operações"}.`
  );
}
