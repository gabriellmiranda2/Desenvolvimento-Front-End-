// js/main.js
// Ponto de entrada. Nenhum await de nível superior: tudo roda dentro
// de iniciar(). Este módulo não filtra nem ordena tarefas — ele só
// carrega os dados, guarda no estado e aciona o ciclo único de
// renderização definido em estados.js.

import { carregarTarefas } from "./api.js";
import { renderizar } from "./estados.js";
import { configurarEventos } from "./eventos.js";
import { estado } from "./estado.js";
import { configurarEfeitosVisuais } from "./efeitos.js";

// Único lugar que altera o estado. Todo ouvinte de evento (em
// eventos.js) e o próprio carregamento inicial (abaixo) passam por
// aqui, e esta função sempre termina chamando o mesmo ponto de
// renderização — por isso cartões, contagem e mensagens nunca ficam
// dessincronizados entre si.
function atualizarEstado(alteracoes) {
  Object.assign(estado, alteracoes);
  renderizar(estado);
}

async function iniciar() {
  // Os controles já ficam prontos antes dos dados chegarem — eles só
  // não encontram nada para filtrar enquanto estado.tarefas está vazio.
  configurarEventos(atualizarEstado);

  // Puramente decorativo (parallax do hero + revelação no scroll) —
  // não participa do ciclo de estado acima e pode falhar sem afetar
  // busca, filtros ou renderização dos cartões.
  configurarEfeitosVisuais();

  // Aplicado ANTES do await — se aplicássemos depois, a tela ficaria
  // em branco durante toda a espera da rede.
  renderizar(estado);

  try {
    const tarefas = await carregarTarefas();
    atualizarEstado({ tarefas, carregamento: "concluido", erro: null });
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

    atualizarEstado({ carregamento: "concluido", erro: mensagem });
  }
}

iniciar();
