// js/api.js
// Responsável somente por obter os dados do arquivo dados.json.
// Não altera o estado e não manipula o DOM.

export async function carregarTarefas() {
  const resposta = await fetch("dados.json");

  if (!resposta.ok) {
    const erro = new Error(`Erro HTTP ${resposta.status}`);
    erro.name = "ErroHTTP";
    erro.status = resposta.status;
    throw erro;
  }

  const dados = await resposta.json();

  if (!dados || !Array.isArray(dados.tarefas)) {
    throw new Error("O arquivo dados.json não possui uma lista válida de casos.");
  }

  return dados.tarefas;
}
