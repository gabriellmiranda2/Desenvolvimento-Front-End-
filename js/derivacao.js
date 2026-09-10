// js/derivacao.js
// Responsável por UMA coisa: a partir do estado, calcular qual lista
// de tarefas deve aparecer na tela. Não lê nem escreve no DOM, e
// nunca altera o objeto de estado nem o array estado.tarefas — sempre
// devolve um array novo.

function normalizar(texto) {
  return texto.trim().toLowerCase();
}

// prazo vem como "dd/mm/aaaa" — new Date(string) não interpreta esse
// formato de forma confiável entre navegadores, então convertemos os
// três componentes manualmente antes de comparar.
function paraTimestamp(prazo) {
  const [dia, mes, ano] = prazo.split("/").map(Number);
  return new Date(ano, mes - 1, dia).getTime();
}

// Recebe a lista já filtrada e devolve uma NOVA lista ordenada. O
// sort() acontece sobre esta cópia — nunca diretamente sobre
// estado.tarefas nem sobre o array recebido por referência.
function ordenarPorPrazo(lista, direcao) {
  const copia = [...lista];
  copia.sort((a, b) => {
    const diferenca = paraTimestamp(a.prazo) - paraTimestamp(b.prazo);
    return direcao === "prazo-asc" ? diferenca : -diferenca;
  });
  return copia;
}

// Combina busca, status e prioridade — nesta ordem ou em qualquer
// outra, o resultado final é o mesmo, porque os três critérios são
// aplicados juntos sobre estado.tarefas a cada chamada, nunca sobre
// o resultado da chamada anterior.
export function derivarTarefasVisiveis(estado) {
  const busca = normalizar(estado.busca);

  let visiveis = estado.tarefas.filter((tarefa) => {
    const combinaBusca = busca === "" || normalizar(tarefa.titulo).includes(busca);
    const combinaStatus = estado.status === "" || tarefa.status === estado.status;
    const combinaPrioridade =
      estado.prioridade === "" || tarefa.prioridade === estado.prioridade;

    return combinaBusca && combinaStatus && combinaPrioridade;
  });

  if (estado.ordenacao === "prazo-asc" || estado.ordenacao === "prazo-desc") {
    visiveis = ordenarPorPrazo(visiveis, estado.ordenacao);
  }

  return visiveis;
}
