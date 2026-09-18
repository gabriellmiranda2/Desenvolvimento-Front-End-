# Gestão Automotiva — Centro de Performance

Etapa 4 (E4) do sistema de gestão de operações automotivas: estado único,
busca, filtros, ordenação e publicação.

O projeto recebeu um redesign de UI/UX para uma experiência de garagem
premium, inspirada no universo de alta performance automobilística, com
fundo de motor, textura de carbono e paleta escura com vermelho de corrida.
A identidade é original e não utiliza logotipos, emblemas ou materiais
proprietários de terceiros.

## Aplicação publicada

🔗 **URL pública (GitHub Pages):** https://gabriellmiranda2.github.io/Desenvolvimento-Front-End-/

## Como rodar localmente

Como os módulos utilizam `import`/`export`, é necessário servir os arquivos
por HTTP. Não abra o `index.html` diretamente por `file://`.

Uma opção simples:

```bash
npx serve .
```

Ou:

```bash
python3 -m http.server
```

Depois acesse o endereço indicado pelo terminal.

## Estrutura do projeto

- `index.html` — estrutura semântica, navegação, hero, painel da frota,
  centro de operações, leitura da garagem e painel de performance.
- `style.css` — sistema visual, paleta automotiva, textura de carbono,
  fundo do motor, Grid, Flexbox, responsividade e microinterações.
- `fundo-motor-ferrari.jpg` — imagem local usada como atmosfera visual do
  motor no fundo e no hero.
- `dados.json` — fonte de dados consumida por `carregarTarefas()`.
- `js/api.js` — busca as operações com `fetch`, sem tocar no DOM.
- `js/estado.js` — objeto de estado único da aplicação.
- `js/derivacao.js` — calcula a lista visível a partir do estado
  (busca + filtros + ordenação), sem alterar `estado.tarefas`.
- `js/renderizacao.js` — desenha os cartões de operação a partir de um array.
- `js/estados.js` — ponto único de renderização e atualização dos indicadores.
- `js/eventos.js` — liga os controles do formulário ao estado.
- `js/efeitos.js` — parallax do hero e revelação progressiva no scroll.
- `js/main.js` — ponto de entrada: carrega os dados e inicia eventos e efeitos.

## Modelo de dados

A estrutura de `dados.json` e os valores internos usados pelo JavaScript
(`a-fazer`, `em-andamento`, `em-revisao`, `concluida`, `baixa`, `media`,
`alta`) permanecem compatíveis com as entregas anteriores.

A linguagem visual traduz os conceitos para o universo automotivo:

- Tarefa → Operação
- Projeto → Veículo
- Responsável → Especialista
- Prazo → Data prevista
- Status → Etapa da operação

Os números exibidos nos painéis são derivados do estado atual; não existe
uma segunda fonte permanente de dados.

## Como publicar no GitHub Pages

1. Faça commit e push de todos os arquivos para a branch padrão do repositório.
2. No GitHub, vá em **Configurações → Pages**.
3. Em **Fonte**, selecione a branch padrão e a pasta raiz (`/`).
4. Salve e aguarde a publicação.
5. Confira a URL pública.
6. Abra a URL e confira, nas ferramentas do navegador, que `dados.json`,
   `style.css` e todos os módulos de `js/` carregam com status 200 e sem
   erros no Console.
