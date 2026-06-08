# Unifier les scripts de generation des TD

## Reponse courte

Oui, avec la structure actuelle des fichiers `.tex`, il est possible d'avoir un seul script pour generer les TD de toutes les matieres.

Mais il ne faut pas chercher un script unique totalement automatique et sans configuration. La bonne approche serait plutot :

- un moteur commun de conversion LaTeX vers HTML ;
- un fichier de configuration par matiere ;
- quelques hooks/options pour les cas specifiques comme les figures, le code VHDL ou les titres particuliers.

Autrement dit : un seul script executable, mais pilote par des configs.

## Pourquoi c'est possible

Les anciens scripts `rebuild-math-td-from-latex.js`, `rebuild-auto-td-from-latex.js` et `rebuild-vhdl-td-from-latex.js` faisaient tous les memes grandes etapes :

1. Lire un fichier `.tex`.
2. Nettoyer le preambule LaTeX.
3. Decouper le contenu en sections ou exercices.
4. Convertir du LaTeX courant en HTML :
   - paragraphes ;
   - listes ;
   - tableaux ;
   - maths inline ou display ;
   - titres intermediaires.
5. Injecter le contenu dans une page HTML de TD.
6. Ecrire le resultat dans `src/subjects/.../td/`.
7. Laisser `tools/build-html.js` copier ensuite les pages dans `out/`.

Cette chaine est suffisamment commune pour etre factorisee.

## Ce qui empeche un script totalement generique

Les fichiers `.tex` n'ont pas tous exactement la meme forme.

### Maths

Les TD de maths utilisent surtout :

- `\section*{Exercice ...}` ;
- parfois `\textbf{\Large Exercice ...}` ;
- une commande speciale `\corr{...}` ;
- des corrections avec labels comme `Correction`, `Raisonnement`, `Reponses`.

Le script maths contient donc une logique propre pour `\corr{...}` et pour detecter les blocs de raisonnement/reponse.

### Automatique

Les TD d'automatique utilisent une structure plus proche de sections classiques, avec :

- `\section*{...}` ;
- `\subsection*{...}` ;
- `\paragraph{...}` ;
- `itemize` / `enumerate` ;
- des tableaux ;
- des figures SVG associees manuellement.

La grosse particularite est le placement des figures, notamment avec des overrides comme `3:1`, `3:3`, `4:5`.

### VHDL

Les TD VHDL ajoutent encore des besoins :

- blocs `lstlisting` pour le code ;
- tableaux avec `toprule`, `midrule`, `bottomrule` ;
- commandes `\texttt{...}` ;
- figures a placer a des endroits precis ;
- lien vers PrismJS pour la coloration syntaxique.

C'est tres proche de l'automatique, mais avec une couche code et quelques regles de rendu en plus.

## Proposition de cible

Le projet peut utiliser un script unique :

```text
tools/rebuild-td-from-latex.js
```

Avec une configuration :

```text
tools/td-pages.json
```

Exemple de structure possible :

```json
{
  "subjects": [
    {
      "subject": "math",
      "sourceDir": "pdf/math/TD",
      "targetDir": "src/subjects/probabilites/td",
      "backHref": "math.html#probabilites-td",
      "backLabel": "Retour aux TD",
      "idPrefix": "td",
      "parser": "math",
      "pages": [
        {
          "n": 1,
          "source": "td1 math.tex",
          "target": "td1.html",
          "title": "TD 1 corrige - Denombrement et probabilites",
          "heading": "Denombrement et probabilites",
          "eyebrow": "TD 1"
        }
      ]
    }
  ]
}
```

Le script commun pourrait exposer des options comme :

- `parser: "math" | "standard" | "vhdl"` ;
- `codeBlocks: true` pour VHDL ;
- `figureBasePath` ;
- `figureOverrides` ;
- `figureCaptions` ;
- `pdfHrefPattern` ;
- `extraHeadAssets` pour PrismJS ;
- `sectionMatcher` pour differencier `Exercice`, `Partie`, etc.

## Ce que je factoriserais

Les fonctions suivantes peuvent devenir communes :

- lecture/ecriture ;
- `repairMojibake` ;
- `cleanLatex` avec options ;
- `escapeText` ;
- conversion des maths inline/display ;
- conversion de `textbf`, `textit`, `emph`, `texttt` ;
- conversion des listes ;
- conversion des tableaux ;
- rendu HTML d'une page TD ;
- rendu HTML d'une carte exercice ;
- generation des ids ;
- insertion des figures.

Les scripts actuels contiennent beaucoup de duplication sur ces points.

## Ce que je garderais configurable

Je ne mettrais pas tout en dur dans le script commun.

Les elements suivants doivent rester dans une config :

- titres des TD ;
- noms de fichiers source ;
- noms de fichiers cible ;
- chemins de retour ;
- chemins PDF ;
- captions des figures ;
- placements particuliers des figures ;
- activation PrismJS pour VHDL ;
- resume court affiche dans l'en-tete.

Cela evite que le script devienne une boule de conditions du type :

```js
if (subject === "vhdl") ...
if (subject === "auto") ...
if (subject === "math") ...
```

Un peu de configuration vaut mieux qu'un gros script fragile.

## Migration conseillee

Je ferais la migration en trois etapes.

### Etape 1 : creer le moteur commun sans changer le build

Extraire d'abord les helpers communs dans :

```text
tools/lib/latex-to-html.js
tools/lib/render-td-page.js
```

Puis laisser les scripts actuels les utiliser.

Avantage : faible risque, on peut comparer les sorties HTML avant/apres.

### Etape 2 : creer `td-pages.json`

Deplacer les tableaux `tdConfig`, `figureOverrides` et `figureCaptions` dans une config externe.

Avantage : ajouter un TD devient une modification de JSON, pas une modification de script.

### Etape 3 : remplacer les trois scripts par un seul

Quand les sorties sont stables :

```json
{
  "rebuild-td": "node tools/rebuild-td-from-latex.js",
  "build": "node tools/rebuild-td-from-latex.js && node tools/rebuild-exams-from-latex.js && node tools/build-html.js"
}
```

Les anciens scripts a supprimer dans cette etape etaient :

```text
tools/rebuild-math-td-from-latex.js
tools/rebuild-auto-td-from-latex.js
tools/rebuild-vhdl-td-from-latex.js
```

Cette cible est maintenant en place dans le projet : `npm run build` passe par `tools/rebuild-td-from-latex.js`, configure par `tools/td-pages.json`.

## Risques a surveiller

- Les regex LaTeX peuvent casser sur des accolades imbriquees.
- Les tableaux complexes restent difficiles a convertir proprement.
- Les figures ont parfois besoin d'un placement manuel.
- Le VHDL a besoin d'un rendu de code specifique.
- Les accents/mojibake ne sont pas uniformes entre toutes les sources.
- Les diffs peuvent etre bruyants si le format HTML change trop d'un coup.

## Mon avis

Je pense que l'unification vaut le coup.

Le projet a deja atteint le point ou maintenir trois scripts presque similaires commence a couter plus cher que de creer un moteur commun. La bonne cible n'est pas un parseur LaTeX complet, mais un generateur robuste pour ton corpus actuel de TD.

La version ideale serait donc :

```text
1 script de generation TD
+ 1 config centrale
+ quelques options par matiere
```

Pas besoin de tout refaire brutalement. Une migration progressive permettrait de garder le build stable tout en nettoyant vraiment l'architecture.
