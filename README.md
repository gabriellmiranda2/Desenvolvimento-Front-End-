# O Mentalista — Arquivo CBI

Etapa 4 (E4) do sistema de gestão: estado único, busca, filtros, ordenação,
estados de carregamento e publicação. O projeto recebeu um redesign completo
para o universo de **O Mentalista**, com foco em Patrick Jane, investigação,
evidências, depoimentos e atmosfera de arquivo policial.

## O que mudou no redesign

- Identidade visual trocada do tema automotivo para investigação policial.
- Interface inteira em português.
- Patrick Jane recebe destaque no hero, no perfil e nos cartões.
- Teresa Lisbon, Kimball Cho e Grace Van Pelt aparecem na área da equipe.
- Cartões de casos exibem retratos dos investigadores.
- Fundo cenográfico reage à rolagem com parallax, deslocamento do retrato e
  aparição progressiva do símbolo associado ao Red John.
- Removidos textos e elementos de estética futurista/IA do protótipo anterior.
- Paleta baseada em vinho, papel envelhecido, grafite, dourado discreto e
  tons quentes de arquivo.
- `dados.json` foi convertido de operações automotivas para casos fictícios
  de investigação, mantendo os valores internos de status e prioridade exigidos
  pela arquitetura E4.

## Imagens

As imagens dos personagens usadas localmente em `imagens/` foram fornecidas
pelo usuário nesta conversa. A pesquisa de referências para o elenco foi
conferida no TVmaze e a pesquisa de materiais relacionados à série no
Wikimedia Commons. Para publicação pública/comercial, substitua as fotos por
ativos licenciados ou obtenha autorização para os materiais promocionais.

Referências pesquisadas:

- TVmaze — elenco de The Mentalist: https://www.tvmaze.com/shows/116/the-mentalist/cast
- Wikimedia Commons — categoria The Mentalist: https://commons.wikimedia.org/wiki/Category:The_Mentalist
- Wikimedia Commons — símbolo de Red John: https://commons.wikimedia.org/wiki/File:Red-John-Smiley-Face.svg
- Wikimedia Commons — Pico House, associado ao cenário da CBI: https://commons.wikimedia.org/wiki/File:Pico_House_-_R%C3%BCckseite.jpg

O símbolo desenhado no fundo pela própria interface é CSS e não depende de
nenhuma biblioteca externa.

## Como rodar localmente

Como os módulos utilizam `import`/`export`, sirva os arquivos por HTTP. No VS Code,
o Live Server é suficiente. Também é possível usar:

```bash
npx serve .
```

ou:

```bash
python3 -m http.server
```

## Estrutura

- `index.html` — estrutura semântica e conteúdo em português.
- `style.css` — identidade visual do Mentalista, responsividade, Grid/Flexbox,
  foco, contraste e cenografia de rolagem.
- `dados.json` — fonte única de casos.
- `imagens/` — imagens locais usadas na interface.
- `js/api.js` — busca os dados com `fetch`.
- `js/estado.js` — estado único.
- `js/derivacao.js` — busca, filtros e ordenação sem mutar a fonte original.
- `js/renderizacao.js` — projeção dos casos nos cartões.
- `js/estados.js` — ciclo único de renderização e indicadores.
- `js/eventos.js` — eventos dos controles.
- `js/efeitos.js` — parallax, revelação progressiva e navegação ativa.
- `js/main.js` — ponto de entrada.

## Compatibilidade E4

Os valores internos permanecem: `a-fazer`, `em-andamento`, `em-revisao`,
`concluida`, `baixa`, `media` e `alta`. A interface traduz esses valores para:

- `a-fazer` → Em aberto
- `em-andamento` → Em investigação
- `em-revisao` → Em análise
- `concluida` → Encerrado

O objeto `estado` continua sendo a única fonte de verdade e a tela continua
sendo uma projeção desse estado. Não foi criado um segundo array permanente
para filtros ou ordenação.

## GitHub Pages

Depois de testar localmente, faça commit e push de todos os arquivos. Em
GitHub → Configurações → Pages, selecione a branch principal e a pasta raiz.
Antes da entrega, confira se `dados.json`, `style.css` e todos os módulos JS
retornam 200 e se o Console do navegador está sem erros.
