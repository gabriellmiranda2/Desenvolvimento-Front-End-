// js/api.js
// Responsável por UMA coisa: buscar as tarefas e devolvê-las.
// Nenhuma manipulação de DOM acontece aqui — se você se pegar
// escrevendo document.* neste arquivo, ela pertence a outro módulo.

export async function carregarTarefas() {
  const resposta = await fetch("dados.json");

  // response.ok é falso para 404, 500 etc. — o fetch NÃO rejeita a
  // promise nesses casos, então precisamos checar e lançar nós mesmos.
  if (!resposta.ok) {
    const erro = new Error(
      `O servidor respondeu com status ${resposta.status}.`
    );
    erro.name = "ErroHTTP";
    erro.status = resposta.status;
    throw erro;
  }

  // Se o corpo não for um JSON válido, isto lança um SyntaxError —
  // é assim que o chamador vai distinguir "formato" de "rede".
  const corpo = await resposta.json();

  return corpo.tarefas;
}