# Plan de migration du format des examens LaTeX

Ce plan decrit comment migrer progressivement les examens LaTeX du repo vers le format commun defini dans `rule-latex-exam.md`, sans casser les scripts de generation HTML existants.

## Objectif

Uniformiser les examens LaTeX pour obtenir :

- des fichiers LaTeX plus faciles a maintenir ;
- des corrections toujours encapsulees dans `\corr{...}` ;
- des titres d'exercices/problemes detectables automatiquement ;
- une extraction HTML plus stable ;
- a terme, un seul generateur commun pour les examens d'electronique, VHDL et Java.

## Avancement applique

Etat apres application initiale du plan :

- `rule-latex-exam.md` a ete complete avec les regles pour `lstlisting`.
- `tools/rebuild-exams-from-latex.js` a ete cree comme extracteur commun Electronique/VHDL/Java.
- `tools/exam-pages.json` contient la configuration globale des pages a generer : matiere, source LaTeX, cible HTML, titres, resumes, assets et figures.
- `vhdl-exam4.tex` est maintenant pris en charge par la generation HTML.
- `package.json` utilise le generateur commun dans `npm run build`.
- Les anciens generateurs specifiques ont ete remplaces par le generateur commun.

Reste a faire pour une migration stricte des sources :

- reformater progressivement les `.tex` VHDL pour qu'ils suivent exactement `rule-latex-exam.md` ;
- reformater les `.tex` Java, notamment en encapsulant toutes les corrections dans `\corr{...}` ;
- utiliser uniquement `npm run rebuild-exams` pour regenerer les pages d'examens configurees.

## Etat actuel

Examens LaTeX concernes :

```text
pdf/elec/exam/ELEC-exam-2025.tex
pdf/elec/exam/ELEC-exam-2026.tex
pdf/vhdl/exam/vhdl-exam1.tex
pdf/vhdl/exam/vhdl-exam2.tex
pdf/vhdl/exam/vhdl-exam3.tex
pdf/vhdl/exam/vhdl-exam4.tex
pdf/java/exam/java-exam1.tex
pdf/java/exam/java-exam2.tex
pdf/java/exam/java-exam3.tex
pdf/java/exam/java-exam4.tex
```

Etat par matiere :

- Electronique : deja proche du format cible.
- VHDL : partiellement compatible, car les corrections utilisent deja `\corr{...}`, mais les titres et l'en-tete different.
- Java : format le plus eloigne, avec `\title`, `\maketitle`, `\section*{Exercice ...}` et des corrections pas toujours isolees dans `\corr{...}`.

## Phase 1 - Stabiliser la regle commune

Fichier de reference :

```text
rule-latex-exam.md
```

Actions :

- verifier que la structure type couvre Electronique, VHDL et Java ;
- ajouter une section dediee aux blocs de code `lstlisting` pour VHDL et Java ;
- accepter explicitement les titres `Problème` et `Exercice` ;
- documenter les conventions de nommage des figures pour chaque matiere ;
- preciser que toute correction doit etre dans `\corr{...}`.

Decision recommandee :

- utiliser `Problème` pour Electronique et VHDL ;
- autoriser `Exercice` pour Java ;
- faire supporter les deux par le futur extracteur.

## Phase 2 - Creer un extracteur generique

Nouveau script propose :

```text
tools/rebuild-exams-from-latex.js
```

Role :

- lire les examens LaTeX de plusieurs matieres ;
- extraire les blocs `Problème` ou `Exercice` ;
- extraire les corrections `\corr{...}` ;
- convertir les maths, listes, tableaux et blocs de code ;
- rattacher les figures via `\imageplaceholder{...}{...}` ;
- produire les pages HTML dans `src/subjects/.../exam`.

Fonctionnalites minimales :

- ignorer le preambule LaTeX ;
- detecter `\begin{document}` et `\end{document}` ;
- detecter les titres principaux ;
- convertir `\subsubsection*{...}` en sous-titres ;
- convertir `itemize` et `enumerate` ;
- convertir `tabular` simple ;
- conserver `lstlisting` avec la bonne classe de langage ;
- conserver les equations MathJax.

Approche retenue :

```text
tools/rebuild-exams-from-latex.js
tools/exam-pages.json
```

Le generateur commun lit `tools/exam-pages.json` pour savoir quelles sources LaTeX convertir et quelles pages HTML produire.

## Phase 3 - Migrer un examen pilote VHDL

Fichier pilote recommande :

```text
pdf/vhdl/exam/vhdl-exam4.tex
```

Pourquoi celui-ci :

- il est deja actif dans le travail courant ;
- il contient des corrections `\corr{...}` ;
- il contient du code VHDL ;
- il permet de tester la conversion de `lstlisting`.

Actions :

- harmoniser le preambule avec `rule-latex-exam.md` ;
- garder les packages necessaires a VHDL, notamment `listings`, `xcolor` et eventuellement `tikz` ;
- reformater l'en-tete selon le modele commun ;
- remplacer les titres principaux par des blocs detectables ;
- verifier que chaque correction est dans `\corr{...}` ;
- remplacer les figures directes par `\imageplaceholder` si necessaire ;
- regenerer la page HTML ;
- verifier le rendu.

Commandes de validation :

```bash
npm run rebuild-exams
npm run build
```

## Phase 4 - Migrer tous les examens VHDL

Ordre recommande :

```text
pdf/vhdl/exam/vhdl-exam1.tex
pdf/vhdl/exam/vhdl-exam2.tex
pdf/vhdl/exam/vhdl-exam3.tex
pdf/vhdl/exam/vhdl-exam4.tex
```

Pour chaque fichier :

- appliquer le format commun ;
- conserver les blocs de code en `lstlisting` ;
- verifier les corrections `\corr{...}` ;
- verifier les figures et chronogrammes ;
- regenerer le HTML ;
- lancer le build complet.

Points de vigilance :

- ne pas perdre les assets SVG existants dans `assets/vhdl/exam` ;
- garder les chronogrammes et schemas associes aux bonnes questions ;
- ne pas casser la coloration du code VHDL.

## Phase 5 - Migrer les examens Java

Fichiers :

```text
pdf/java/exam/java-exam1.tex
pdf/java/exam/java-exam2.tex
pdf/java/exam/java-exam3.tex
pdf/java/exam/java-exam4.tex
```

Actions :

- remplacer `\title`, `\author`, `\date` et `\maketitle` par l'en-tete commun ;
- transformer `\section*{Exercice ...}` en titres compatibles avec l'extracteur ;
- encapsuler toutes les corrections dans `\corr{...}` ;
- garder les blocs Java en `lstlisting`;
- retirer les citations parasites du type `[cite: ...]` si elles ne sont pas utiles ;
- regenerer les pages HTML Java.

Points de vigilance :

- les corrections Java sont souvent structurees en paragraphes libres ;
- il faudra parfois separer explicitement enonce, raisonnement et code ;
- les blocs `lstlisting` doivent conserver leur indentation.

## Phase 6 - Garder Electronique comme reference

Fichiers de reference :

```text
pdf/elec/exam/ELEC-exam-2025.tex
pdf/elec/exam/ELEC-exam-2026.tex
```

Actions :

- ne pas les reformater massivement sauf besoin reel ;
- les utiliser comme modele pour les nouveaux examens ;
- verifier que le generateur generique produit le meme rendu HTML que le script actuel.

## Phase 7 - Mettre a jour package.json

Commande commune :

```json
"rebuild-exams": "node tools/rebuild-exams-from-latex.js"
```

Build actuel :

```json
"build": "node tools/rebuild-math-td-from-latex.js && node tools/rebuild-auto-td-from-latex.js && node tools/rebuild-vhdl-td-from-latex.js && node tools/rebuild-exams-from-latex.js && node tools/build-html.js"
```

## Phase 8 - Validation systematique

Apres chaque migration de fichier :

```bash
npm run build
```

Recherches utiles :

```bash
rg -n "Millman|\\[cite:|@@|imageplaceholder|fcolorbox" src/subjects
rg -n "\\\\corr\\{" pdf/*/exam
```

Verifier manuellement :

- les corrections apparaissent dans le HTML ;
- les equations MathJax sont conservees ;
- les listes sont lisibles ;
- les blocs de code gardent leur indentation ;
- les figures sont dans le bon exercice ;
- les liens depuis les pages de cours fonctionnent ;
- aucun artefact LaTeX visible ne reste dans le HTML.

## Ordre global recommande

1. Finaliser `rule-latex-exam.md`.
2. Creer un extracteur generique minimal.
3. Migrer `pdf/vhdl/exam/vhdl-exam4.tex`.
4. Adapter l'extracteur jusqu'a obtenir un rendu correct.
5. Migrer les autres examens VHDL.
6. Migrer les examens Java.
7. Faire passer Electronique sur l'extracteur generique.
8. Supprimer ou archiver les anciens extracteurs specifiques.
9. Simplifier `package.json`.
10. Lancer un dernier `npm run build`.

## Definition de termine

La migration est terminee lorsque :

- tous les examens LaTeX suivent `rule-latex-exam.md` ;
- toutes les corrections sont dans `\corr{...}` ;
- un seul script peut regenerer les examens HTML ;
- `npm run build` passe sans erreur ;
- les pages HTML generees ne contiennent pas d'artefacts LaTeX visibles ;
- les anciens scripts specifiques ne sont plus necessaires.
