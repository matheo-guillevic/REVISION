# Guide de Formatage LaTeX : TD et Corriges

Ce document liste les conventions a respecter pour ecrire les fichiers LaTeX de TD afin qu'ils soient facilement convertibles en pages HTML par les scripts de generation du site.

L'objectif est double :

- garder un fichier `.tex` lisible et compilable ;
- permettre une conversion fiable vers `src/subjects/.../td/*.html`.

---

## 1. Structure Generale du Fichier

Chaque TD doit etre un document LaTeX complet, meme si le generateur HTML ignore le preambule.

Structure minimale recommandee :

```latex
\documentclass[11pt,a4paper]{article}

\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[french]{babel}
\usepackage{amsmath, amssymb}
\usepackage{geometry}
\usepackage{booktabs}
\usepackage{listings}
\usepackage{xcolor}
\usepackage{graphicx}

\geometry{margin=2.5cm}

\title{Corrige - TD 1 : Titre du TD}
\author{Module - Grenoble INP Esisar}
\date{Annee 2025-2026}

\begin{document}

\maketitle

% Exercices ici

\end{document}
```

Le generateur retire le preambule, `\maketitle` et `\end{document}`. Le contenu utile doit donc commencer apres `\maketitle`.

---

## 2. Decoupage Principal : Exercices

Chaque exercice doit commencer par une section etoilee.

Format standard :

```latex
\section*{Exercice 1}
```

Ou avec un titre :

```latex
\section*{Exercice 1 - Denombrement}
```

Pour les TD dont la structure n'est pas numerotee en exercices, utiliser quand meme `\section*{...}` pour chaque grande unite :

```latex
\section*{Partie I - Synthese RST}
```

Regles importantes :

- utiliser `\section*{...}` pour les grandes coupures ;
- eviter les titres d'exercice uniquement en texte gras ;
- ne pas numeroter avec `\section{...}` ;
- ne pas imbriquer des exercices dans des environnements complexes.

Format encore tolere pour certains anciens TD de maths :

```latex
\textbf{\Large Exercice 1}
```

Mais ce format est a eviter pour les nouveaux fichiers.

---

## 3. Sous-questions et Sous-parties

Utiliser `\subsection*{...}` ou `\paragraph{...}` pour les sous-questions.

Exemple recommande :

```latex
\subsection*{1. Calcul du nombre total de cas}
\textbf{Raisonnement :} On commence par compter l'univers.

\textbf{Reponse :} Le nombre total de cas est :
$$
\binom{32}{5}
$$
```

Pour des questions courtes, `\paragraph{...}` est accepte :

```latex
\paragraph{1) Donner la table de verite de la fonction NAND.}
La fonction NAND vaut 0 uniquement lorsque les deux entrees valent 1.
```

Regles :

- garder le texte de la question dans le titre de sous-partie si possible ;
- utiliser une numerotation visible : `1.`, `2.`, `(a)`, `(i)`, etc. ;
- eviter les questions uniquement separees par des sauts de ligne ;
- eviter `\subsubsection*` sauf si une vraie hierarchie supplementaire est necessaire.

---

## 4. Corrections et Raisonnement

Chaque correction doit etre explicite et structurée.

Format simple recommande :

```latex
\textbf{Raisonnement :} On identifie d'abord le modele mathematique adapte.

\textbf{Reponse :} On obtient :
$$
\mathbf{P = \frac{\binom{6}{2}\binom{10}{3}}{\binom{16}{5}}}
$$
```

Pour une correction longue, decouper en etapes :

```latex
\textbf{Etape 1 : Identifier l'univers.}\\
Le tirage est simultane, donc l'ordre ne compte pas.
$$
|\Omega| = \binom{16}{5}
$$

\textbf{Etape 2 : Compter les cas favorables.}\\
On choisit les boules blanches et noires separement.
$$
N = \binom{6}{2}\binom{10}{3}
$$

\textbf{Reponse :}
$$
\mathbf{P = \frac{N}{|\Omega|}}
$$
```

Regles :

- toujours expliquer la methode avant de donner une formule ;
- mettre les labels pedagogiques en `\textbf{...}` ;
- utiliser `Raisonnement`, `Correction`, `Etape`, `Reponse` de maniere stable ;
- mettre le resultat final en valeur avec `\mathbf{...}` dans les equations importantes ;
- eviter les corrections uniquement composees d'equations sans texte.

---

## 5. Macro Optionnelle `\corr{...}`

Pour les TD de maths, la macro `\corr{...}` est acceptee et convertie en bloc de correction.

Definition recommandee :

```latex
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

Utilisation :

```latex
\section*{Exercice 1}
Enonce de l'exercice.

\corr{
\textbf{Etape 1 : Choix du modele.}\\
On utilise une combinaison car l'ordre ne compte pas.

$$
\mathbf{\binom{n}{k}}
$$
}
```

Regles :

- utiliser `\corr{...}` pour englober une correction complete ;
- eviter les accolades non fermees ou trop imbriquees dans `\corr{...}` ;
- ne pas mettre plusieurs exercices dans un meme `\corr{...}`.

---

## 6. Mathematiques

Les maths inline doivent etre ecrites avec `$...$` ou `\(...\)`.

```latex
La variable suit une loi binomiale $X \sim \mathcal{B}(n,p)$.
```

Les equations importantes doivent etre en display :

```latex
$$
P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}
$$
```

Ou :

```latex
\[
P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}
\]
```

Regles :

- privilegier les equations courtes ;
- eviter les environnements LaTeX trop rares ou personnalises ;
- utiliser `align` ou `align*` seulement pour les calculs multi-lignes ;
- ne pas mettre de texte long dans `\mathbf{...}` ;
- echapper les symboles speciaux hors mode maths : `\%`, `\_`, `\&`.

---

## 7. Listes

Les listes doivent utiliser les environnements standards.

Liste non ordonnee :

```latex
\begin{itemize}
    \item Premier cas.
    \item Deuxieme cas.
\end{itemize}
```

Liste ordonnee :

```latex
\begin{enumerate}
    \item Identifier l'univers.
    \item Compter les cas favorables.
    \item Diviser.
\end{enumerate}
```

Regles :

- ne pas simuler une liste avec des tirets manuels ;
- garder chaque `\item` sur une ligne claire ;
- eviter les listes trop profondement imbriquees ;
- fermer systematiquement `itemize` et `enumerate`.

---

## 8. Tableaux

Les tableaux doivent rester simples.

Format recommande :

```latex
\begin{table}[h!]
    \centering
    \begin{tabular}{ccc}
        \toprule
        \textbf{A} & \textbf{B} & \textbf{Sortie} \\
        \midrule
        0 & 0 & 1 \\
        0 & 1 & 1 \\
        1 & 0 & 1 \\
        1 & 1 & 0 \\
        \bottomrule
    \end{tabular}
\end{table}
```

Regles :

- utiliser `tabular` ;
- `booktabs` (`\toprule`, `\midrule`, `\bottomrule`) est accepte ;
- `\hline` est accepte ;
- eviter les cellules fusionnees complexes ;
- eviter les tableaux imbriques ;
- eviter les colonnes avec paragraphes tres longs.

---

## 9. Blocs de Code

Tout code de plusieurs lignes doit etre ecrit avec `lstlisting`.

Configuration recommandee :

```latex
\lstset{
    basicstyle=\ttfamily\footnotesize,
    keywordstyle=\color{blue}\bfseries,
    commentstyle=\color{green!60!black},
    stringstyle=\color{red},
    showstringspaces=false,
    frame=single,
    numbers=left,
    numberstyle=\tiny\color{gray},
    breaklines=true,
    columns=fullflexible,
    keepspaces=true
}
```

Exemple VHDL :

```latex
\begin{lstlisting}[language=VHDL]
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity compteur is
    port (
        clk : in std_logic;
        q   : out unsigned(3 downto 0)
    );
end compteur;
\end{lstlisting}
```

Exemple Java :

```latex
\begin{lstlisting}[language=Java]
public class Exemple {
    public static void main(String[] args) {
        System.out.println("Bonjour");
    }
}
\end{lstlisting}
```

Regles :

- ne pas ecrire un programme complet avec `\texttt{...}` ;
- garder l'indentation du langage ;
- utiliser `\texttt{...}` uniquement pour un mot court dans une phrase ;
- choisir `language=VHDL`, `language=Verilog`, `language=Java`, etc. quand c'est pertinent.

---

## 10. Figures et Schemas

Les figures peuvent etre presentes dans le PDF LaTeX, mais leur placement HTML est souvent gere par la configuration du generateur.

Format LaTeX propre :

```latex
\begin{figure}[h!]
    \centering
    \includegraphics[width=0.8\textwidth]{schema-exemple.pdf}
    \caption{Schema de l'exercice 1.}
\end{figure}
```

Regles pour le site :

- placer les assets web dans `assets/<matiere>/TD/` ;
- preferer des fichiers `.svg` pour les schemas ;
- donner des noms stables : `AU361-TD3-Ex1.svg`, `SN361-TD2_1.1.svg`, etc. ;
- documenter la correspondance dans la configuration du generateur ;
- ne pas compter uniquement sur `\includegraphics` pour le rendu HTML.

Pour une future generation unifiee, les figures devraient etre declarees dans une config :

```json
{
  "figureOverrides": {
    "3:1": ["AU361-TD3-Ex1.svg"],
    "4:2": ["SN361-TD4_2.svg"]
  }
}
```

---

## 11. Separateurs et Sauts de Page

Les separateurs simples sont acceptes :

```latex
\hrulefill
```

ou :

```latex
\hrule
```

Les sauts de page sont acceptes mais ignores ou simplifiés en HTML :

```latex
\newpage
```

Regles :

- utiliser `\hrulefill` entre deux exercices si cela aide la lecture PDF ;
- ne pas utiliser des empilements de `\vspace` pour structurer le document ;
- ne pas dependre de la pagination PDF pour comprendre le TD.

---

## 12. Commandes et Environnements a Eviter

Pour garantir la conversion HTML, eviter :

- macros personnelles nombreuses ou non documentees ;
- environnements LaTeX rares ;
- `tikzpicture` directement dans le `.tex` si le rendu HTML doit l'afficher ;
- tableaux tres complexes ;
- `minipage` imbriquees ;
- mise en page en colonnes pour du contenu essentiel ;
- texte important uniquement dans une image ;
- code multi-ligne en `\texttt{...}` ;
- questions sans `\section*`, `\subsection*` ou `\paragraph`.

Si un schema TikZ est necessaire, exporter le schema en `.svg` et le referencer comme asset.

---

## 13. Encodage et Proprete du Texte

Les fichiers doivent etre en UTF-8.

Regles :

- utiliser directement les accents : `é`, `è`, `à`, `ç` ;
- eviter les textes mojibake du type `Ã©`, `Ã¨`, `Ã ` ;
- supprimer les marqueurs parasites comme `[span_0](start_span)` ;
- supprimer les marqueurs de citation comme `[cite: 12]` ;
- ne pas laisser de commentaires de generation inutiles dans le contenu final.

Les generateurs actuels nettoient certains marqueurs, mais il vaut mieux ne pas les introduire.

---

## 14. Modele Complet Recommande

```latex
\documentclass[11pt,a4paper]{article}

\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[french]{babel}
\usepackage{amsmath, amssymb}
\usepackage{geometry}
\usepackage{booktabs}
\usepackage{listings}
\usepackage{xcolor}
\usepackage{graphicx}

\geometry{margin=2.5cm}

\title{Corrige - TD 1 : Titre du TD}
\author{Module - Grenoble INP Esisar}
\date{Annee 2025-2026}

\lstset{
    basicstyle=\ttfamily\footnotesize,
    breaklines=true,
    frame=single,
    columns=fullflexible,
    keepspaces=true
}

\begin{document}

\maketitle

\section*{Exercice 1 - Titre de l'exercice}

Enonce ou rappel du probleme.

\subsection*{1. Premiere question}

\textbf{Raisonnement :} On explique d'abord la methode.

\textbf{Reponse :} On applique la formule :
$$
\mathbf{R = \frac{A}{B}}
$$

\subsection*{2. Deuxieme question}

\textbf{Etape 1 : Identifier les donnees.}\\
On liste les hypotheses utiles.

\textbf{Etape 2 : Calculer.}\\
On effectue le calcul :
$$
X = 2^n
$$

\textbf{Reponse :}
$$
\mathbf{X = 16}
$$

\hrulefill

\section*{Exercice 2 - Titre de l'exercice}

\paragraph{1) Question courte.}
Reponse argumentee.

\begin{itemize}
    \item Premier point important.
    \item Deuxieme point important.
\end{itemize}

\end{document}
```

---

## 15. Resume des Regles Prioritaires

Pour qu'un TD soit bien converti :

1. Un exercice = un `\section*{Exercice X}`.
2. Une sous-question = un `\subsection*{...}` ou un `\paragraph{...}`.
3. Une correction = du texte explicatif + des formules.
4. Les listes utilisent `itemize` ou `enumerate`.
5. Les tableaux utilisent `tabular`.
6. Le code multi-ligne utilise `lstlisting`.
7. Les figures web sont gerees comme assets externes.
8. Les fichiers sont propres, en UTF-8, sans marqueurs parasites.
9. Les commandes LaTeX restent simples et previsibles.
10. Le contenu doit etre comprehensible sans dependance forte a la mise en page PDF.
