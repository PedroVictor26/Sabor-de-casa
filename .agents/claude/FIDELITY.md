# Matriz de Fidelidade — squad `core`

> Gerado pelo `fw compile`. CHARTER G5 (honestidade > asterisco): declara o que cada alvo preserva/perde ao projetar a squad canonica.
> Canonico (fonte de verdade): `squads/core/` — 12 agentes, 0 tasks.
> Esta saida e do alvo: **claude**.

| Recurso canonico | Claude Code (subagent) | Codex (AGENTS.md) | OpenCode (subagent) | Obsidian (Graph View) |
|---|---|---|---|---|
| id / name (persona) | PRESERVA — `name`=id; persona no corpo | PRESERVA — cabecalho/prosa | PRESERVA — nome do arquivo; persona no corpo | PRESERVA — frontmatter `id`+`persona`; titulo da nota |
| role | PRESERVA — corpo + compoe `description` | PRESERVA — linha "Papel" | PRESERVA — corpo + compoe `description` | PRESERVA — secao "Papel" na nota |
| model por agente | PRESERVA — campo `model` nativo | PERDE — so nota textual (Codex monolitico) | PERDE — OMITIDO por design: OpenCode usa provider/model do usuario; hardcodar quebraria configs diferentes | PRESERVA — frontmatter `model` (visivel no Graph View e nos metadados) |
| tasks-por-agente (entidade, contrato I/O) | PARCIAL — inlinado no system prompt | PARCIAL — tabela de referencia resumida | PARCIAL — inlinado no system prompt | PARCIAL — secao Tasks inline; sem tabela estruturada de I/O |
| workflows / checklists (referencia) | PERDE — subagent individual nao lista (sao cross-agente); chegam via AGENTS.md na raiz | PRESERVA — secao de referencia no AGENTS.md (lista + resumo + ponteiro pro canonico) | PERDE — subagent individual nao lista; chegam via AGENTS.md na raiz | PARCIAL — nota da squad lista nomes como referencia; sem corpo completo |
| commands (contrato) | PARCIAL — mencao textual | PARCIAL — mencao textual | PARCIAL — mencao textual | PRESERVA — secao "Comandos" com lista dedicada na nota do agente |
| governance (light/heavy, gates, QA) | PARCIAL — via tools/disallowedTools/permissionMode/hooks; flag some | PERDE — so prosa descritiva | PARCIAL — prosa textual no corpo; sem campo nativo de permission (omitido) | PRESERVA — frontmatter `governance` + secao Governanca na nota da squad |
| owns (exclusividade por arquivo) | PARCIAL — regra textual (+ hook opcional) | PARCIAL — regra textual | PARCIAL — regra textual | PRESERVA — secao "Owns" dedicada na nota do agente |
| authority.can / cannot | PARCIAL — mapeavel vira tools/disallowedTools; resto textual | PARCIAL — so textual | PARCIAL — so textual | PERDE — PERDE — nao projetado (Obsidian e visualizacao, nao enforcement) |
| handoff (context-manifest) | PERDE — instrucao textual | PERDE — instrucao textual | PERDE — instrucao textual | PRESERVA — secao "Handoff" com wikilinks [[id]] — desenha arestas de delegacao no Graph View |
| squad como unidade | PERDE — N arquivos achatados + governanca replicada | PRESERVA — 1 doc estruturado (melhor alvo p/ squad) | PERDE — N arquivos achatados (mesma limitacao do claude) | PRESERVA — nota _squad-<nome>.md com agentes como [[wikilinks]] — hub central no grafo |
| tools allowlist | PRESERVA — PRESERVA quando o agente declara `tools`/`disallowedTools` no canonico (campos nativos); sem declaracao herda acesso total | PERDE — inexistente | PERDE — inexistente (permission omitida por ora) | PERDE — PERDE — irrelevante para visualizacao |
| delegacao automatica | PRESERVA — via `description` | PARCIAL — Codex decide pelo contexto, sem roteamento por agente | PRESERVA — via `description` + `mode` (primary/subagent) | PRESERVA — wikilinks [[id]] no handoff/quandoUsar revelam o roteamento no Graph View |

## Leitura da matriz

- **Claude Code** preserva melhor o **agente individual** (model, tools, delegacao) mas **achata a squad** (sem unidade de squad nativa; governanca vira prosa).
- **Codex** preserva melhor a **squad como documento** (1 AGENTS.md estruturado, precedencia por proximidade) mas **perde a granularidade por-agente** (sem model/tools/commands/roteamento).
- **OpenCode** e similar ao Claude Code no por-agente (description/mode nativos) mas **perde o model/provider** (omitido por design: o OpenCode usa o provider configurado pelo usuario) e **achata a squad** como o Claude Code.
- **Obsidian** e o melhor alvo para **visualizacao e navegacao do grafo**: wikilinks [[id]] no handoff/quandoUsar desenham arestas de delegacao no Graph View; nota de squad agrupa membros como hub central. Nao e alvo operacional (sem system prompt/tools).
- **Sempre se perde em todos os alvos:** tasks-como-entidade, handoff estruturado. Esses vivem so no canonico; os alvos recebem uma projecao achatada.
- **Antigravity** (CLI `agy` + IDE) e servido pelo mesmo `AGENTS.md` que o emitter Codex ja gera (le o arquivo na raiz nativamente) — SEM emitter dedicado por design (CHARTER G10). Mesma fidelidade da coluna Codex.
- Por isso o canonico e a fonte de verdade e os 4 alvos sao **saida de conveniencia, nunca origem** (CHARTER G10).
