# Regles de formatage pour un examen LaTeX

Ce document decrit le format LaTeX recommande pour les examens corriges du projet, en particulier pour que les scripts d'extraction puissent reconstruire proprement les pages HTML.

## Objectif

Un fichier d'examen doit servir a deux usages :

- produire un PDF LaTeX lisible ;
- etre extrait automatiquement vers une page HTML de revision.

Pour cela, il faut garder une structure reguliere : preambule stable, en-tete clair, problemes identifies, questions visibles, corrections dans `\corr{...}`, figures sous forme de placeholders.

## Preambule recommande

Utiliser une base proche de celle des examens d'electronique :

```latex
\documentclass[11pt, a4paper]{article}

\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[french]{babel}
\usepackage{amsmath, amssymb}
\usepackage{geometry}
\usepackage{graphicx}
\usepackage{tabularx}
\usepackage{booktabs}
\usepackage{xcolor}

\geometry{
    top=2cm,
    bottom=2cm,
    left=1.5cm,
    right=1.5cm
}
```

## Commandes communes

Chaque examen corrige doit definir ces deux commandes.

```latex
\newcommand{\imageplaceholder}[2]{
    \begin{center}
        \fbox{\begin{minipage}{#1}\centering\vspace{1cm}\textit{#2}\vspace{1cm}\end{minipage}}
    \end{center}
}

\newcommand{\corr}[1]{
    \vspace{0.3cm}
    \begin{center}
    \fcolorbox{blue}{blue!5}{
    \begin{minipage}{0.95\textwidth}
    \color{blue} \textbf{Correction \& Raisonnement :} \\
    #1
    \end{minipage}}
    \end{center}
    \vspace{0.3cm}
}
```

Regle importante : toute correction doit etre dans un bloc `\corr{...}`. Le script HTML repere cette commande pour separer l'enonce et la correction.

## En-tete d'examen

Utiliser un tableau `tabularx` a trois colonnes :

```latex
\noindent
\begin{tabularx}{\textwidth}{@{}X c r@{}}
\textbf{EP361} & \textbf{vendredi 27 Juin 2025} & \textbf{Sans document} \\
\textbf{Electronique} & \textbf{Examen 1h45} & \textbf{Avec calculette} \\
\end{tabularx}
\vspace{0.2cm}
\hrule
\vspace{0.4cm}
```

## Decoupage en problemes

Chaque probleme doit commencer par un titre centre contenant le mot `Probleme` :

```latex
% ==================== PROBLEME I ====================
\begin{center}
    \textbf{\Large Problème I Filtre} \hfill \textbf{20 pts}
\end{center}
\vspace{-0.2cm}
\hrule
\vspace{0.3cm}
```

Bonnes pratiques :

- garder le format `Problème I`, `Problème II`, etc. ;
- mettre les points dans le titre ou juste a cote ;
- utiliser un commentaire visuel avant chaque probleme ;
- eviter les titres trop inventifs que le script aurait du mal a reconnaitre.

## Parties internes

Pour subdiviser un probleme, utiliser `\subsubsection*{...}` :

```latex
\subsubsection*{Partie A: Quadripôles - 10 points}
```

Le script convertit ces sous-sections en sous-titres HTML.

## Questions

Ecrire les questions simplement, avec `\noindent` si besoin :

```latex
\noindent a) Exprimez $Y_s$ la matrice admittance d'un element serie $y_o$.

\corr{
...
}
```

Formats recommandes :

- `a)`, `b)`, `c)` pour les sous-questions ;
- `a/`, `b/`, `c/` si le sujet original l'utilise ;
- listes `itemize` pour les consignes multiples.

## Corrections

Chaque correction doit etre structuree en etapes explicites :

```latex
\corr{
\textbf{Etape 1 : Definition du noeud central.}\\
Soit $v_x$ la tension au noeud central.

\textbf{Etape 2 : Ecriture de la loi des noeuds.}\\
$$ y_1(v_x-v_1)+y_2(v_x-v_2)+y_3v_x=0 $$

\textbf{Etape 3 : Identification du resultat.}\\
$$ \mathbf{Y_T = ...} $$
}
```

Regles de style :

- utiliser `\textbf{Etape n : ...}` pour guider la lecture ;
- mettre les resultats importants en `\mathbf{...}` dans les equations ;
- expliquer la convention de signe quand elle peut etre ambigue ;
- preferer les lois fondamentales explicites : loi des noeuds, loi des mailles, loi d'Ohm, relations AOP parfait ;
- eviter les raccourcis comme "par Millman" si l'objectif est une correction pedagogique detaillee.

## Figures

Dans le LaTeX, utiliser un placeholder :

```latex
\imageplaceholder{0.7\textwidth}{[Inserer Figure 4 : Ampli de Puissance]}
\begin{center}
    {\small Fig. 4}
\end{center}
```

Dans le projet, les vraies images doivent etre placees dans :

```text
assets/elec/exam/
```

Convention de nommage recommandee :

```text
ELEC-exam-2025-schema-1.png
ELEC-exam-2025-schema-2.png
ELEC-exam-2025-schema-3.png
ELEC-exam-2025-schema-4.png
ELEC-exam-2026-schema-1.png
...
```

Le script rattache les figures dans l'ordre des `\imageplaceholder`.

## Maths

Utiliser :

```latex
$x$                     % formule courte en ligne
$$ ... $$               % equation affichee
\begin{bmatrix} ... \end{bmatrix}
\frac{...}{...}
\left( ... \right)
```

Eviter les macros trop personnelles non gerees par MathJax ou par le script.

## Tableaux

Les tableaux simples sont preferables :

```latex
\begin{tabular}{ll}
$y_1$ : capacite C & $y_2$ : capacite C \\
$y_3$ : resistance R & $y_4$ : resistance R \\
\end{tabular}
```

Eviter les tableaux LaTeX trop complexes si le contenu doit etre extrait en HTML.

## Listes

Utiliser les environnements standards :

```latex
\begin{itemize}
    \item Premier point.
    \item Deuxieme point.
\end{itemize}
```

ou :

```latex
\begin{enumerate}
    \item Premiere etape.
    \item Deuxieme etape.
\end{enumerate}
```

## Structure type complete

```latex
\documentclass[11pt, a4paper]{article}
% packages...
% geometry...
% \imageplaceholder...
% \corr...

\begin{document}

% ==================== EN-TETE ====================
% tabularx d'en-tete

% ==================== PROBLEME I ====================
\begin{center}
    \textbf{\Large Problème I Titre} \hfill \textbf{10 pts}
\end{center}
\vspace{-0.2cm}
\hrule
\vspace{0.3cm}

\subsubsection*{Partie A: Titre - 5 points}

\imageplaceholder{0.7\textwidth}{[Inserer Figure 1 : Description]}
\begin{center}
    {\small Fig. 1}
\end{center}

\noindent a) Question.

\corr{
\textbf{Etape 1 : ...}\\
Explication.

$$ resultat $$
}

\noindent b) Question suivante.

\corr{
...
}

\end{document}
```

## Points a eviter

- Ne pas mettre une correction hors de `\corr{...}`.
- Ne pas imbriquer des commandes LaTeX personnelles non definies dans le fichier.
- Ne pas utiliser des figures reelles directement si le projet attend un placeholder.
- Ne pas changer le mot `Problème` dans les titres principaux.
- Ne pas melanger trop de mise en page complexe (`multicol`, tableaux imbriques, figures flottantes) dans les zones que le script doit extraire.
- Ne pas laisser de balises de citation du type `[cite: ...]` dans une version finale si elles ne sont pas utiles.

## Commandes de regeneration

Apres modification d'un examen LaTeX d'electronique :

```bash
npm run rebuild-elec-exams
```

Pour reconstruire tout le site :

```bash
npm run build
```
