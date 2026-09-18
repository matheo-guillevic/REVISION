# REVISION

Site statique de revision ESISAR genere depuis des sources Markdown.

- `content/S5`, `content/S6`, `content/S7` : cours, TD et examens a modifier, classes par semestre.
- `content/OUTILS-*` : outils transverses.
- `public/` : assets, PDF, CSS et JavaScript copies dans le site final.
- `src/build/` : scripts de generation.
- `src/config/` : configuration des pages TD/examens.
- `out/` : site genere.

Pour reconstruire le site :

```powershell
npm.cmd run build
```
