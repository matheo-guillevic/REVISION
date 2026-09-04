# Structure du projet

Le projet est maintenant organise autour de sources Markdown.

## Dossiers

- `content/` : sources editables des cours, TD et examens.
- `public/` : fichiers statiques copies tels quels dans `out/`.
- `src/build/` : scripts de generation du site.
- `src/config/` : configuration des pages TD et examens.
- `docs/` : documentation du format Markdown enrichi.
- `out/` : site genere, a ne pas modifier a la main.

## Sources Markdown

Les cours principaux sont dans :

```text
content/<matiere>/cours.md
```

Les matieres renommees utilisent des slugs sans accents :

```text
content/AU331-Traitement-Signal/
content/MT321-Mathematiques-general/
content/AU361-Automatique/
content/MT331-Probabilites/
content/EP361-electonique/
content/IN361-JAVA/
content/IN363-Reseau/
content/SN361-VHDL/
content/SN421-Dev-Micro/
content/MT461-Methode-numerique/
content/EP425-Capteur/
content/AU425-Automatique-avance/
content/IN451-IA/
```

Les TD et examens sont dans :

```text
content/<matiere>/td/*.md
content/<matiere>/exam/*.md
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
3. genere les pages de cours depuis `content/*/cours.md` ;
4. genere les pages TD/examens depuis `content/*/td` et `content/*/exam`.

Les pages HTML ne sont plus des sources : elles sont uniquement produites dans
`out/`.
