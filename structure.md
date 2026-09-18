# Structure du projet

Le projet est maintenant organise autour de sources Markdown.

## Dossiers

- `content/S5`, `content/S6`, `content/S7` : sources editables des cours, TD et examens par semestre.
- `content/OUTILS-*` : sources des outils transverses.
- `public/` : fichiers statiques copies tels quels dans `out/`.
- `src/build/` : scripts de generation du site.
- `src/config/` : configuration des pages TD et examens.
- `docs/` : documentation du format Markdown enrichi.
- `out/` : site genere, a ne pas modifier a la main.

## Sources Markdown

Les cours principaux sont dans :

```text
content/<semestre>/<matiere>/cours.md
```

Les matieres renommees utilisent des slugs sans accents :

```text
content/S5/AU331-Traitement-Signal/
content/S5/MT321-Mathematiques-general/
content/S6/AU361-Automatique/
content/S6/MT331-Probabilites/
content/S6/EP361-electonique/
content/S6/IN361-JAVA/
content/S6/IN363-Reseau/
content/S6/SN361-VHDL/
content/S7/SN421-Dev-Micro/
content/S7/MT461-Methode-numerique/
content/S7/EP425-Capteur/
content/S7/AU425-Automatique-avance/
content/S7/IN451-IA/
```

Les TD et examens sont dans :

```text
content/<semestre>/<matiere>/td/*.md
content/<semestre>/<matiere>/exam/*.md
```

## Fichiers Statiques

Les assets restent references dans les Markdown avec des chemins web simples
comme `assets/...`.

Sur disque, ils sont ranges dans :

```text
public/assets/
public/styles.css
public/script.js
```

Au build, le contenu de `public/` est copie a la racine de `out/`.

## Build

```powershell
npm.cmd run build
```

Cette commande :

1. vide et regenere `out/` ;
2. copie les fichiers de `public/` ;
3. genere les pages de cours depuis `content/S*/<matiere>/cours.md` ;
4. genere les pages TD/examens depuis `content/S*/<matiere>/td` et `content/S*/<matiere>/exam`.

Les pages HTML ne sont plus des sources : elles sont uniquement produites dans
`out/`.
