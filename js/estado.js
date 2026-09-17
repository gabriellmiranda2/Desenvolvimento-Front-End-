// js/estado.js
// A fonte única de verdade da aplicação (E4). Este é o único objeto
// que guarda "o que está acontecendo" — tarefas, critérios de busca
// e filtro, ordenação, carregamento e erro. A tela nunca é lida para
// descobrir o que existe; ela é sempre uma projeção deste objeto.
// Nenhuma função deste arquivo toca o DOM.

export const estado = {
  tarefas: [], // array bruto, exatamente como veio de carregarTarefas()
  busca: "",
  status: "", // "" significa "Todos"
  prioridade: "", // "" significa "Todas"
  ordenacao: "", // "" | "prazo-asc" | "prazo-desc"
  carregamento: "carregando", // "carregando" | "concluido"
  erro: null, // null ou a mensagem de erro já pronta para exibir
};

// Valores de fábrica dos filtros — a mesma forma usada para inicializar
// o estado é reaproveitada pelo botão "Limpar filtros", então as duas
// coisas nunca podem ficar dessincronizadas.
export const FILTROS_INICIAIS = Object.freeze({
  busca: "",
  status: "",
  prioridade: "",
  ordenacao: "",
});
