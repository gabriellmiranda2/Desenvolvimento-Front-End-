# O Mentalista — Arquivo CBI

Projeto acadêmico de Frontend — 2026.2. A aplicação transforma o gerenciador de casos em uma experiência de **arquivo investigativo fictício**, inspirada na atmosfera de *O Mentalista*, sem substituir a arquitetura funcional da E4.

## Direção do redesign

- Arquivo CBI com estética editorial, suspense e dossiês confidenciais.
- Patrick Jane como principal presença visual, utilizando os assets locais já existentes.
- Centro de controle e **Casos em andamento** apresentados juntos na mesma área de investigação.
- Cards tratados como cartas/dossiês, com naipes, selos de prioridade e microinterações.
- Campos de busca e filtros apresentados como uma ficha de investigação.
- Dois jogos mentais locais para reforçar a temática de observação e padrões.
- Fundo cinematográfico usando o retrato local de Patrick Jane, com camadas CSS e parallax discreto.
- Sem frameworks, bibliotecas de animação, CDN ou dependências externas.

## Arquitetura E4 preservada

O fluxo permanece:

```text
dados.json
    ↓
carregarTarefas()
    ↓
estado.tarefas
    ↓
derivarTarefasVisiveis()
    ↓
renderizar()
    ↓
DOM
```

O objeto `estado` continua sendo a fonte única de verdade. O array original não é mutado pela ordenação. A busca agora consulta os campos textuais disponíveis no próprio registro (`titulo`, `projeto`, `responsavel`, `prazo`, `status` e `prioridade`) sem criar uma segunda fonte de dados.

## Valores internos preservados

- `a-fazer` → Em aberto
- `em-andamento` → Em investigação
- `em-revisao` → Em análise
- `concluida` → Encerrado
- `baixa`, `media`, `alta` permanecem inalterados.

## Estrutura

- `index.html` — estrutura semântica da aplicação.
- `style.css` — design system, responsividade, acessibilidade, cartas/dossiês e cenografia.
- `dados.json` — fonte única dos casos.
- `imagens/` — assets locais dos personagens e logo.
- `js/api.js` — carregamento dos dados.
- `js/estado.js` — estado único.
- `js/derivacao.js` — busca, filtros e ordenação.
- `js/renderizacao.js` — criação dinâmica dos cards.
- `js/estados.js` — estados de carregamento, erro, vazio e sucesso.
- `js/eventos.js` — eventos dos filtros.
- `js/efeitos.js` — parallax, IntersectionObserver, navegação ativa e jogos mentais.
- `js/main.js` — ponto de entrada.

## Como rodar

Como os módulos utilizam `import`/`export`, sirva a pasta por HTTP. No VS Code, o Live Server é suficiente. Também é possível usar:

```bash
python3 -m http.server
```

Depois, abra o endereço local informado pelo servidor.

## Auditoria funcional

Verifique no navegador:

1. Busca por texto.
2. Filtro de status.
3. Filtro de prioridade.
4. Combinação dos filtros.
5. Ordenação por prazo sem alterar `estado.tarefas`.
6. Limpeza dos filtros.
7. Estado de resultado vazio.
8. Estado de erro do `dados.json`.
9. Uso completo por teclado e foco visível.
10. Layout em 320px sem scroll horizontal.

O redesign mantém HTML semântico, exatamente um `h1`, `main`, `section`, `article`, listas, labels, fieldsets, legends, `aria-live`, foco visível e `prefers-reduced-motion`.

## GitHub Pages

A publicação continua sendo estática. Todos os arquivos devem permanecer relativos ao projeto para que `index.html`, `style.css`, `dados.json` e os módulos JavaScript funcionem também no GitHub Pages.
