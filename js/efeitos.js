// js/efeitos.js
// Camada puramente visual: narrativa de scroll (esmaecimento do hero
// e revelação progressiva das seções). Não importa estado.js, não lê
// nem escreve estado.tarefas e não interfere no ciclo
// dados → estado → derivação → renderização definido em main.js,
// estados.js, derivacao.js e renderizacao.js. Se este arquivo for
// removido, a aplicação continua 100% funcional — só perde o efeito.

const prefereMovimentoReduzido = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Esmaece e desloca sutilmente o hero conforme a página é rolada,
// usando apenas uma custom property (--progresso-scroll) que o CSS
// já consome em opacity/transform — nenhum estilo é escrito aqui
// diretamente, só o valor de progresso.
function configurarHeroParallax() {
  const hero = document.querySelector(".hero");
  if (!hero || prefereMovimentoReduzido) return;

  const alturaHero = hero.offsetHeight || 1;
  let atualizacaoAgendada = false;

  function atualizar() {
    const progresso = Math.min(window.scrollY / alturaHero, 1);
    hero.style.setProperty("--progresso-scroll", progresso.toFixed(3));
    atualizacaoAgendada = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (atualizacaoAgendada) return;
      atualizacaoAgendada = true;
      requestAnimationFrame(atualizar);
    },
    { passive: true }
  );
}

// Revela as seções estáticas (hero, dashboard, filtros, painel) com um
// leve fade + translateY assim que entram na viewport. Deliberadamente
// não observa cartões individuais: eles são recriados a cada filtro
// (renderizarTarefas limpa e redesenha as listas), então observá-los
// exigiria reconectar o observer a cada renderização — custo que não
// se paga para um efeito puramente decorativo (ver regra de
// performance: evitar listeners duplicados e cálculos repetidos).
function configurarRevelacaoProgressiva() {
  const elementos = document.querySelectorAll(".revelar");
  if (elementos.length === 0) return;

  if (prefereMovimentoReduzido || !("IntersectionObserver" in window)) {
    elementos.forEach((elemento) => elemento.classList.add("revelar--visivel"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("revelar--visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elementos.forEach((elemento) => observador.observe(elemento));
}

export function configurarEfeitosVisuais() {
  configurarHeroParallax();
  configurarRevelacaoProgressiva();
}
