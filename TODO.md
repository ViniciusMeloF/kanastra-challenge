- Listar os personagens:
  - Utilizar imagens e animacoes
  - Paginacao de 20 em 20
- Clicar personagem abrir modal contendo:
  - Nome
  - Descricao
  - Quadrinhos
  - Filmes/Series
- Filtro para listagem:
  - Nome do personagem
  - Nome do filme/series
- Grafico:
  - Quantidade de quadrinhos de cada personagem listado na respectiva pagina (tela)

Pontos de Atencao!!!!

- Utilizar React e Typescript com tipagens generics
- SOLID
- Testes unitarios e end-to-end com cypress
- Estilizacoes nos componentes: Button, Inputs, Textos
- Promise handling side effects
- Error handling
- Loading handling
- Filters and pagination side effects
- Traducao utilizando tokenizacao com duas ou mais linguagens
- Animacoes
- Gerenciamento de estado global envitando prop drilling (ContextAPI)

Endpoints a usar:

- Listagem de Personagens + Filtro por nome -> GET /v1/public/characters
  - Parameters: 'name', 'limit', 'offset'
- Filtro de filmes/series -> GET /v1/public/series
  - Parameters: 'title', 'limit', 'offset'
- Listagem de Personagens + filtro de filmes/series + filtro por nome -> GET /v1/public/series/{seriesId}/characters
  - Parameters: 'name', 'limit', 'offset'
