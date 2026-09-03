// js/main.js
// Ponto de entrada. Nenhum await de nível superior: tudo roda dentro
// de iniciar().

import { carregarTarefas } from "./api.js";
import { renderizarEstado } from "./estados.js";

async function iniciar() {
  // Aplicado ANTES do await — se aplicássemos depois, a tela ficaria
  // em branco durante toda a espera da rede.
  renderizarEstado("carregando");

  try {
    const tarefas = await carregarTarefas();

    if (tarefas.length === 0) {
      renderizarEstado("vazio");
    } else {
      renderizarEstado("sucesso", tarefas);
    }
  } catch (erro) {
    let mensagem;

    if (erro.name === "TypeError") {
      // fetch rejeita com TypeError quando não consegue nem completar
      // a requisição: offline, DNS, CORS bloqueado, etc.
      mensagem =
        "Não foi possível conectar ao servidor. Verifique sua conexão com a rede.";
    } else if (erro.name === "SyntaxError") {
      // resposta.json() lança SyntaxError quando o corpo não é um
      // JSON válido (ex.: vírgula sobrando, chave sem aspas).
      mensagem = "Os dados recebidos não estão em um formato válido.";
    } else if (erro.name === "ErroHTTP") {
      // Lançado por nós mesmos em api.js quando response.ok é falso
      // (404, 500 etc.) — a requisição chegou, mas o servidor recusou.
      mensagem = `Não foi possível carregar as tarefas (erro ${erro.status}).`;
    } else {
      mensagem = "Ocorreu um erro inesperado ao carregar as tarefas.";
    }

    renderizarEstado("erro", mensagem);
  }
}

iniciar();