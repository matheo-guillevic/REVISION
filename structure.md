# Structure du projet

## Fichiers principaux

- `index.html` : page d'accueil avec les liens vers les cours.
- `math.html` : page dediee au cours de mathematiques/probabilites.
- `auto.html` : page dediee au cours d'automatique AU361.
- `styles.css` : design responsive, mise en page, couleurs pedagogiques et composants visuels.
- `script.js` : interactions de navigation, boutons d'affichage, progression et etats des exercices.
- `tools/extract-pdfs.js` : script local utilise pour extraire le texte des PDF.
- `tools/split-html.js` : script utilise pour resynchroniser la source unique du cours de math depuis `math.html`.
- `tools/build-html.js` : script utilise pour reconstruire `index.html`, `math.html` et `auto.html`.
- `tools/enrich-td-pages.js` : script utilise pour ajouter les tags de notions et notes de raisonnement dans les pages TD.
- `tools/add-td-question-notes.js` : script utilise pour ajouter les explications question par question dans les corrections TD.
- `tools/add-td-question-blocks.js` : script utilise pour ajouter les blocs Questions et transformer les corrections en blocs Reponse.
- `tools/restructure-td-answers.js` : script utilise pour separer les reponses TD par question avec raisonnement et solution independants.
- `tools/fill-td-question-answers.js` : script utilise pour reinjecter les raisonnements et solutions explicites dans chaque sous-question TD.
- `src/subjects/probabilites/cours.html` : source HTML unique du cours de mathematiques/probabilites.
- `src/subjects/probabilites/td/` : sources HTML des pages corrigees TD de probabilites.
- `src/subjects/auto/cours.html` : source HTML unique du cours d'automatique.
- `td1.html` : page generee du TD 1 de denombrement.
- `td2.html` : page generee du TD 2 d'espaces probabilises.
- `td3.html` : page generee du TD 3 de variables aleatoires.
- `pdf/math/cours/` : PDF des cours de mathematiques.
- `pdf/math/TD/` : PDF des TD et corriges de mathematiques.
- `pdf/auto/` : PDF du cours d'automatique et des TD.
- `package.json` et `package-lock.json` : dependance locale `pdf-parse` utilisee pour l'extraction PDF.
- `structure.md` : description de l'organisation du code.

## Organisation de la page

Le site est construit comme une application statique multi-pages simple.
Le fichier `index.html` sert d'accueil, `math.html` contient le cours de mathematiques, et `auto.html` contient le cours d'automatique.

Sections de `math.html` :

- Accueil
- Programme du semestre
- Chapitre 1 : denombrement
- Chapitre 2 : espaces probabilises
- Chapitre 3 : variables aleatoires discretes
- Chapitre 4 : variables aleatoires continues
- Methodes obligatoires
- TD
- Sujets type examen
- Revision finale

## Composants visuels

- `app-shell` : conteneur general de l'interface.
- `sidebar` : menu lateral fixe sur ordinateur, compact sur mobile.
- `topbar` : barre superieure avec action principale.
- `progress-card` : suivi global de progression.
- `chapter-card` : carte de chapitre avec etat et priorite.
- `content-block` : bloc pedagogique type definition, theoreme, methode, remarque, attention ou a retenir.
- `annotation` : encadre pedagogique visible ou masquable.
- `exercise-card` : exercice avec objectif, notions, difficulte, temps, indice et correction.
- `solution-steps` : liste ordonnee des etapes de correction dans les pages TD.
- `td-actions` : zone des boutons d'affichage des corrections sur les pages TD.
- `topic-tags` et `topic-tag` : etiquettes de notions traitees par chaque exercice TD.
- `reasoning-note` : encadre expliquant le raisonnement avant les etapes de correction TD.
- `question-notes` : encadre d'explications par question ou sous-question dans les corrections TD.
- `question-block` : bloc visible listant les questions reecrites de l'exercice TD.
- `answer-block` : bloc masquable contenant la reponse detaillee, le raisonnement et les explications.
- `question-answer-card` : carte de reponse pour une question precise, avec deux boutons independants.
- `reasoning-panel` : panneau masquable contenant seulement le raisonnement.
- `solution-panel` : panneau masquable contenant seulement la solution finale et les calculs.
- `exam-card` : sujet type examen.
- `checklist` : liste de revision finale.
- `chapter-card` dans la section TD : lien vers un PDF d'entrainement.

## Interactions JavaScript

- Navigation interne entre les sections.
- Mise en evidence du lien actif.
- Affichage ou masquage des indices.
- Affichage ou masquage des corrections.
- Affichage ou masquage global des annotations pedagogiques.
- Marquage d'un exercice comme fait.
- Marquage d'un exercice comme "a refaire".
- Calcul simple de la progression globale.

## Convention pour modifier un chapitre

Pour enrichir un chapitre :

1. Modifier la section correspondante dans `src/subjects/probabilites/cours.html`.
2. Ajuster les objectifs et la liste "ce qui est exigible".
3. Completer les blocs `content-block` avec les definitions, theoremes, methodes et points d'attention.
4. Ajouter ou remplacer les `exercise-card` avec les exercices du cours.
5. Ajouter les annotations pedagogiques avec l'attribut `data-annotation`.
6. Verifier les formules LaTeX entre `\\(` et `\\)` ou entre `\\[` et `\\]`.

Pour enrichir le cours d'automatique, modifier directement `src/subjects/auto/cours.html`.

## Evolution possible

Si le site grossit, il sera pertinent de creer :

- `data/chapters.js` pour stocker les chapitres.
- `data/exercises.js` pour stocker les exercices.
- `components/` si le projet passe vers React, Vue ou Astro.

## Extraction des PDF

Le texte des PDF a ete extrait avec :

```powershell
node tools/extract-pdfs.js
```

Les fichiers extraits sont stockes dans `extracted/` quand la commande est lancee. Ce dossier est un support de travail regenerable, et le site ne le charge pas directement.

## Reconstruction du HTML

Apres modification d'un fichier dans `src/subjects`, reconstruire le site avec :

```powershell
npm run build
```

Pour recreer la source unique du cours de math a partir de `math.html` :

```powershell
npm run split
```

Les sources des pages TD sont dans `src/subjects/probabilites/td/`. `npm run build` recopie ensuite `td1.html`, `td2.html` et `td3.html` a la racine pour garder des URLs simples. Leurs liens de retour pointent vers `math.html#probabilites-td`.

Pour reappliquer les tags et notes de raisonnement des pages TD :

```powershell
npm run enrich-td
```

Pour reappliquer les explications par question dans les pages TD :

```powershell
npm run explain-td
```

Pour reappliquer les blocs Questions/Reponse dans les pages TD :

```powershell
npm run questions-td
```

Pour restructurer les TD en reponses par question puis reinjecter les solutions explicites :

```powershell
npm run restructure-td
npm run fill-td
```
