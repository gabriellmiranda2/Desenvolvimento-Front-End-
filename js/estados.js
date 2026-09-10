// js/estados.js
// Ponto único de renderização (E4). Decide qual das telas está
// valendo — carregando, erro, origem vazia, resultado vazio ou
// sucesso — sempre a partir do objeto de estado inteiro. Nenhuma
// requisição e nenhum cálculo de filtro acontece aqui: quem decide
// o que é visível é derivarTarefasVisiveis(); este módulo só projeta
// esse resultado na tela e mantém a região de status anunciando o
// que mudou.

import { renderizarTarefas } from "./renderizacao.js";
import { derivarTarefasVisiveis } from "./derivacao.js";

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
  // textContent, nunca innerHTML — evita reflow desnecessário e
  // qualquer risco de injeção de HTML vindo dos dados. O elemento já
  // tem role="status" e aria-live="polite" no HTML: só o texto muda,
  // então o foco do teclado nunca é movido por esta função.
  regiaoStatus.textContent = texto;
}

// Chamado depois de QUALQUER mudança no estado — carregamento
// inicial, busca, filtro, ordenação ou "Limpar filtros" — sempre com
// o mesmo objeto de estado inteiro. A lista visível é calculada uma
// única vez por chamada e alimenta cartões, contagem e mensagem.
export function renderizar(estado) {
  if (estado.carregamento === "carregando") {
    mostrarMensagem("Carregando tarefas...");
    anunciar("Carregando tarefas...");
    return;
  }

  if (estado.erro) {
    mostrarMensagem(estado.erro);
    anunciar(estado.erro);
    return;
  }

  // Origem vazia: a API respondeu com sucesso, mas não existe nenhuma
  // tarefa cadastrada. Isto nunca passa pelo catch — array vazio é um
  // resultado legítimo, não uma falha.
  if (estado.tarefas.length === 0) {
    mostrarMensagem("Nenhuma tarefa cadastrada.");
    anunciar("Nenhuma tarefa cadastrada.");
    return;
  }

  const visiveis = derivarTarefasVisiveis(estado);

  // Resultado vazio: existem tarefas na origem, mas nenhuma combina
  // com os critérios atuais de busca/filtro. Decidido aqui a partir
  // da lista derivada — nunca confundido com erro de rede.
  if (visiveis.length === 0) {
    mostrarMensagem(
      "Nenhuma tarefa encontrada para os critérios atuais. Ajuste ou limpe os filtros."
    );
    anunciar("Nenhuma tarefa encontrada para os critérios atuais.");
    return;
  }

  esconderMensagem();
  alternarColunas(true);
  renderizarTarefas(visiveis);
  anunciar(`${visiveis.length} de ${estado.tarefas.length} tarefas.`);
}
