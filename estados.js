// js/estados.js
// Responsável por decidir qual das quatro telas está valendo:
// carregando, sucesso, erro ou vazio. Nenhuma requisição acontece aqui.

import { renderizarTarefas } from "./renderizacao.js";

const regiaoStatus = document.getElementById("status-tarefas");
const quadro = document.querySelector(".quadro");

// O parágrafo de mensagem (carregando/erro/vazio) não existe no HTML
// original — é criado uma única vez, na primeira vez que é preciso,
// e reaproveitado depois. Isso evita duplicar markup no arquivo .html.
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

function anunciar(texto) {
  // textContent, nunca innerHTML — evita reflow desnecessário e
  // qualquer risco de injeção de HTML vindo dos dados.
  regiaoStatus.textContent = texto;
}

export function renderizarEstado(estado, dados) {
  const mensagem = obterElementoMensagem();

  switch (estado) {
    case "carregando": {
      alternarColunas(false);
      mensagem.hidden = false;
      mensagem.textContent = "Carregando tarefas...";
      anunciar("Carregando tarefas...");
      break;
    }

    case "sucesso": {
      mensagem.hidden = true;
      mensagem.textContent = "";
      alternarColunas(true);
      renderizarTarefas(dados);
      anunciar(
        `${dados.length} tarefa${dados.length === 1 ? "" : "s"} carregada${
          dados.length === 1 ? "" : "s"
        }.`
      );
      break;
    }

    // Vazio é alcançado só quando tarefas.length === 0 — nunca pelo
    // catch. Um array vazio não é um erro, é um resultado legítimo.
    case "vazio": {
      alternarColunas(false);
      mensagem.hidden = false;
      mensagem.textContent = "Nenhuma tarefa encontrada.";
      anunciar("Nenhuma tarefa encontrada.");
      break;
    }

    case "erro": {
      alternarColunas(false);
      mensagem.hidden = false;
      mensagem.textContent = dados;
      anunciar(dados);
      break;
    }

    default:
      throw new Error(`Estado desconhecido: ${estado}`);
  }
}