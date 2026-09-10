# Gerenciador de Tarefas Acadêmicas — E4

Etapa 4 (E4) do gerenciador de tarefas acadêmicas: estado único da
aplicação, busca, filtros, ordenação e publicação.

## Aplicação publicada

🔗 **URL pública (GitHub Pages):** https://gabriellmiranda2.github.io/Desenvolvimento-Front-End-/
## Como rodar localmente

Como os módulos usam `import`/`export`, é preciso servir os arquivos
por HTTP (abrir o `index.html` direto no navegador via `file://` não
funciona). Uma opção simples:

```bash
npx serve .
# ou
python3 -m http.server
```

Depois acesse o endereço indicado pelo terminal.

## Estrutura do projeto

- `index.html` — marcação e controles de busca/filtro/ordenação.
- `style.css` — estilos (design tokens em `:root`, layout responsivo).
- `dados.json` — fonte de dados consumida por `carregarTarefas()`.
- `js/api.js` — busca as tarefas (`fetch`), sem tocar no DOM.
- `js/estado.js` — objeto de estado único da aplicação.
- `js/derivacao.js` — calcula a lista visível a partir do estado
  (busca + filtros + ordenação), sem alterar `estado.tarefas`.
- `js/renderizacao.js` — desenha os cartões a partir de um array.
- `js/estados.js` — ponto único de renderização (carregando, erro,
  origem vazia, resultado vazio, sucesso) e da região `aria-live`.
- `js/eventos.js` — liga os controles do formulário ao estado.
- `js/main.js` — ponto de entrada: carrega os dados e inicia os eventos.

## Como publicar no GitHub Pages

1. Faça commit e push de todos os arquivos para a branch padrão do repositório.
2. No GitHub, vá em **Settings → Pages**.
3. Em **Source**, selecione a branch padrão e a pasta raiz (`/`).
4. Salve e aguarde o link ser gerado.
5. Substitua o placeholder no topo deste arquivo pela URL gerada.
6. Abra a URL em uma janela privada e confira, em DevTools, que
   `dados.json`, `style.css` e todos os módulos em `js/` carregam com
   status 200, sem erros no Console.
