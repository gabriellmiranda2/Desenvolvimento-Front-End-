// js/eventos.js
// Responsável por UMA coisa: ligar os controles do formulário ao
// estado. Cada ouvinte faz sempre as mesmas duas coisas — atualiza um
// campo do estado e chama o mesmo ponto de renderização (recebido de
// fora, via atualizarEstado). Nenhum ouvinte lê ou percorre cartões:
// quem decide o que aparece é a derivação, não este arquivo.

import { FILTROS_INICIAIS } from "./estado.js";

const campoBusca = document.getElementById("busca");
const campoStatus = document.getElementById("status");
const campoPrioridade = document.getElementById("prioridade");
const campoOrdenacao = document.getElementById("ordenacao");
const botaoLimpar = document.getElementById("limpar-filtros");
const formulario = document.getElementById("form-filtros");

export function configurarEventos(atualizarEstado) {
  campoBusca.addEventListener("input", () => {
    atualizarEstado({ busca: campoBusca.value });
  });

  campoStatus.addEventListener("change", () => {
    atualizarEstado({ status: campoStatus.value });
  });

  campoPrioridade.addEventListener("change", () => {
    atualizarEstado({ prioridade: campoPrioridade.value });
  });

  campoOrdenacao.addEventListener("change", () => {
    atualizarEstado({ ordenacao: campoOrdenacao.value });
  });

  botaoLimpar.addEventListener("click", () => {
    // Restaura os CONTROLES e o ESTADO a partir da mesma fonte
    // (FILTROS_INICIAIS), para as duas coisas nunca ficarem
    // dessincronizadas.
    campoBusca.value = FILTROS_INICIAIS.busca;
    campoStatus.value = FILTROS_INICIAIS.status;
    campoPrioridade.value = FILTROS_INICIAIS.prioridade;
    campoOrdenacao.value = FILTROS_INICIAIS.ordenacao;

    atualizarEstado({ ...FILTROS_INICIAIS });
  });

  // A busca já reage a cada tecla digitada e os filtros reagem à
  // escolha; não existe mais um botão "Aplicar filtros", então o
  // Enter no formulário não deve recarregar a página.
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
  });
}
