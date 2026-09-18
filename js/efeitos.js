// Camada puramente visual. O arquivo cria uma narrativa de rolagem para a
// cenografia do arquivo, revela seções e atualiza o item de navegação ativo.

const prefereMovimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function configurarCenografia() {
  const cenografia = document.querySelector(".cenografia");
  if (!cenografia || prefereMovimentoReduzido) return;

  let agendado = false;

  function atualizar() {
    const altura = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progresso = Math.min(Math.max(window.scrollY / altura, 0), 1);
    cenografia.style.setProperty("--progresso-scroll", progresso.toFixed(3));
    document.documentElement.style.setProperty("--progresso-scroll", progresso.toFixed(3));
    agendado = false;
  }

  atualizar();
  window.addEventListener("scroll", () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(atualizar);
  }, { passive: true });
}

function configurarRevelacaoProgressiva() {
  const elementos = document.querySelectorAll(".revelar");
  if (elementos.length === 0) return;

  if (prefereMovimentoReduzido || !("IntersectionObserver" in window)) {
    elementos.forEach((elemento) => elemento.classList.add("revelar--visivel"));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("revelar--visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  elementos.forEach((elemento) => observador.observe(elemento));
}

function configurarNavegacaoAtiva() {
  const links = [...document.querySelectorAll(".navegacao__link")];
  const secoes = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if (!("IntersectionObserver" in window)) return;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((link) => link.classList.remove("navegacao__link--ativo"));
      const ativo = links.find((link) => link.getAttribute("href") === `#${entrada.target.id}`);
      if (ativo) ativo.classList.add("navegacao__link--ativo");
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  secoes.forEach((secao) => observador.observe(secao));
}

export function configurarEfeitosVisuais() {
  configurarCenografia();
  configurarRevelacaoProgressiva();
  configurarNavegacaoAtiva();
}
