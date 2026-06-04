# Guide de Formatage LaTeX : Examen d'Électronique (Esisar)

Ce document liste les conventions de code, la structure et le style visuel à appliquer pour générer un sujet d'examen et son corrigé selon le format officiel de l'Esisar.

---

## 1. Préambule et Géométrie de la Page
Le document doit utiliser la classe `article` en taille `11pt` au format `a4paper`. Les marges sont fines pour maximiser l'espace utilisable pour les schémas et calculs.

**Packages requis et configuration des marges (`geometry`) :**
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

---

## 2. Commandes Personnalisées Essentielles
Deux macros doivent impérativement être définies dans le préambule pour standardiser la gestion des figures (ou de leur emplacement) et l'affichage des corrections étape par étape.

**A. Espace pour image (`\imageplaceholder`) :**
Génère une boîte d'attente avec une bordure et un texte centré (utile si l'image n'est pas encore disponible ou pour calibrer la mise en page).
```latex
\newcommand{\imageplaceholder}[2]{
    \begin{center}
        \fbox{\begin{minipage}{#1}\centering\vspace{1cm}\textit{#2}\vspace{1cm}\end{minipage}}
    \end{center}
}
```

**B. Bloc de correction (`\corr`) :**
Génère un encadré sur fond bleu très clair (`blue!5`) avec une fine bordure bleue, de largeur `0.95\textwidth`, contenant le titre pré-défini "Correction & Raisonnement :".
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

---

## 3. En-tête du Document
L'en-tête de l'examen utilise un environnement `tabularx` sur toute la largeur de la page (`\textwidth`). Il est séparé du corps du sujet par une fine ligne horizontale (`\hrule`).

**Structure standard de l'en-tête :**
```latex
\noindent
\begin{tabularx}{\textwidth}{@{}X c r@{}}
\textbf{Code Module (ex: EP360)} & \textbf{Date de l'examen} & \textbf{Consigne documents} \\
\textbf{Matière (ex: Electronique)} & \textbf{Durée (ex: Examen 2h)} & \textbf{Consigne calculette} \\
\end{tabularx}
\vspace{0.2cm}
\hrule
\vspace{0.4cm}
```

---

## 4. Titres des Problèmes et Sous-parties
Chaque nouveau problème doit être clairement mis en évidence, centré, en gras et grande taille (`\Large`), puis séparé du reste par une ligne horizontale.

**Format d'un Problème principal :**
```latex
% ==================== PROBLÈME I ====================
\begin{center}
    \textbf{\Large Problème I - Titre du problème - 10 pts}
\end{center}
\vspace{-0.2cm}
\hrule
\vspace{0.3cm}
```

**Format d'une sous-partie (si nécessaire) :**
S'il y a des parties distinctes à l'intérieur d'un même problème :
```latex
\subsubsection*{Partie A: Nom de la partie - X points}
```

---

## 5. Mise en Page des Questions et Textes
* Utiliser `\noindent` au début des questions ou des paragraphes de texte pour éviter l'alinéa d'origine de LaTeX.
* **Mise en colonnes (Texte + Image) :** Pour afficher une image ou un circuit à côté d'un bloc de texte/questions, utiliser deux environnements `minipage` alignés en haut `[t]` et séparés par un `\hfill`.

```latex
\noindent
\begin{minipage}[t]{0.45\textwidth}
    % Texte de la question, consignes ou équations
\end{minipage}
\hfill
\begin{minipage}[t]{0.52\textwidth}
    % Image, schéma ou suite de la question
\end{minipage}
```

---

## 6. Structure Pédagogique du Bloc `\corr{...}`
Le contenu à l'intérieur des balises `\corr{...}` doit suivre une norme pédagogique et visuelle stricte pour garantir la lisibilité du raisonnement.

1. **Découpage par étapes :** Utiliser la notation en gras `\textbf{Étape X : Titre de l'étape.}\\` pour structurer le développement.
2. **Explications textuelles :** Toujours rédiger une courte phrase expliquant ce qui va être fait ou calculé *avant* de poser l'équation (ex : "D'après la loi des nœuds en A...").
3. **Équations :** Utiliser les doubles dollars `$$...$$` pour que les équations importantes soient centrées et mises en valeur.
4. **Résultat final :** Mettre l'expression finale ou le résultat numérique en gras directement à l'intérieur du bloc mathématique avec la commande `\mathbf{...}`.

**Exemple de rédaction type d'une correction :**
```latex
\corr{
\textbf{Étape 1 : Analyse du montage.}\\
Texte d'explication de la méthode utilisée ou du théorème invoqué.
$$V_{out} = R \cdot I_{in}$$

\textbf{Étape 2 : Application de la formule.}\\
En remplaçant les variables par leurs expressions respectives, on obtient :
$$V_{out} = R \cdot (I_1 + I_2)$$
$$\mathbf{V_{out} = 15\,V}$$
}
```

---

## 7. Pied de Page
Le pied de page doit être repoussé tout en bas de la page à l'aide de la commande `\vfill`, séparé par une ligne fine et organisé en trois colonnes via `\hfill`.

**Structure standard du pied de page :**
```latex
\vfill
% ==================== PIED DE PAGE ====================
\hrule
\vspace{0.1cm}
\noindent
Nom de l'enseignant \hfill Esisar \hfill Page X/Y
```