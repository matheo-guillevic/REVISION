---
title: "TD 1 corrige - Denombrement et probabilites"
subject: "MT331-Probabilites"
type: "td"
target: "MT331-Probabilites-td1.html"
eyebrow: "TD 1"
heading: "Denombrement et probabilites"
summary: "Corrige maintenu en Markdown."
---
:::exercise label="Exercice 1" title="Exercice 1"
**Raisonnement :** Le tirage se fait simultanÃ©ment, l'ordre n'a donc pas d'importance. Il s'agit de combinaisons. On choisit 5 cartes parmi 32.

**Reponse :** Le nombre total d'issues possibles est \(\mathbf{\binom{32}{5} = 201376}\).

#### 1. Seulement des cartes noires

**Raisonnement :** Un jeu de 32 cartes contient 16 cartes noires (8 trÃ¨fles et 8 piques). Il faut choisir 5 cartes parmi ces 16.

**Reponse :** \(\mathbf{\binom{16}{5} = \frac{16!}{5!11!} = 4368}\) faÃ§ons.

#### 2. Seulement des figures ou as

**Raisonnement :** Les "figures" prÃ©cisÃ©es ici sont au nombre de 4 par couleur (valet, dame, roi, as), soit \(4 \times 4 = 16\) cartes au total. On en choisit 5 parmi 16.

**Reponse :** \(\mathbf{\binom{16}{5} = 4368}\) faÃ§ons.

#### 3. Quatre as

**Raisonnement :** Il faut choisir les 4 as parmi les 4 disponibles, puis choisir la derniÃ¨re carte parmi les 28 cartes restantes du jeu.

**Reponse :** \(\mathbf{\binom{4}{4} \times \binom{28}{1} = 1 \times 28 = 28}\) faÃ§ons.

#### 4. Cinq figures, dont 3 noires

**Raisonnement :** Il y a 8 figures noires et 8 figures rouges. Il faut choisir 3 figures parmi les 8 noires, et les 2 autres cartes doivent Ãªtre des figures rouges (choisies parmi les 8) pour avoir exactement 5 figures dont 3 noires.

**Reponse :** \(\mathbf{\binom{8}{3} \times \binom{8}{2} = 56 \times 28 = 1568}\) faÃ§ons.

#### 5. Trois as, 2 dames et 1 seul carreau

**Raisonnement :** On tire 5 cartes au total (3 as + 2 dames). L'unique carreau de la main doit obligatoirement Ãªtre soit un as, soit une dame. On sÃ©pare en deux cas disjoints:

- **Cas 1 : Le carreau est un as.** On choisit l'as de carreau (1 choix). Les 2 autres as sont choisis parmi les 3 as restants (non-carreau). Les 2 dames sont choisies parmi les 3 dames restantes (non-carreau). Soit \(\binom{1}{1} \times \binom{3}{2} \times \binom{3}{2} = 1 \times 3 \times 3 = 9\).
- **Cas 2 : Le carreau est une dame.** On choisit la dame de carreau (1 choix). L'autre dame est choisie parmi les 3 restantes (non-carreau). Les 3 as sont choisis parmi les 3 as non-carreau. Soit \(\binom{1}{1} \times \binom{3}{1} \times \binom{3}{3} = 1 \times 3 \times 1 = 3\).

**Reponse :** \(\mathbf{9 + 3 = 12}\) faÃ§ons.

---
:::

:::exercise label="Exercice 2" title="Exercice 2"
#### 1. Nombre total de comitÃ©s

**Raisonnement :** Il y a au total \(12 + 15 = 27\) personnes. On choisit 6 membres sans distinction d'ordre.

**Reponse :** \(\mathbf{\binom{27}{6} = 296010}\) comitÃ©s possibles.

#### 2. ComitÃ©s respectant la paritÃ©

**Raisonnement :** La paritÃ© signifie 3 hommes et 3 femmes. On choisit 3 hommes parmi 12, et 3 femmes parmi 15.

**Reponse :** \(\mathbf{\binom{12}{3} \times \binom{15}{3} = 220 \times 455 = 100100}\) comitÃ©s.

#### 3. Condition de refus entre A et B

**Raisonnement :** Madame A et Monsieur B ne doivent pas siÃ©ger ensemble. On compte le nombre de comitÃ©s paritaires oÃ¹ ils siÃ¨gent *tous les deux*, et on le soustrait au total paritaire calculÃ© prÃ©cÃ©demment. S'ils y sont tous les deux, il reste Ã  choisir 2 femmes parmi 14 (pour complÃ©ter avec Mme A) et 2 hommes parmi 11 (pour complÃ©ter avec M B).

**Reponse :** \(\mathbf{100100 - \left( \binom{14}{2} \times \binom{11}{2} \right) = 100100 - (91 \times 55) = 100100 - 5005 = 95095}\) comitÃ©s.

#### 4. DÃ©signation du bureau

**Raisonnement :** Parmi les 6 membres, on dÃ©signe un prÃ©sident, un secrÃ©taire et un trÃ©sorier (3 postes distincts). L'ordre compte, c'est un arrangement de 3 personnes parmi 6.

**Reponse :** \(\mathbf{A_6^3 = \frac{6!}{(6-3)!} = 6 \times 5 \times 4 = 120}\) bureaux possibles.

---
:::

:::exercise label="Exercice 3" title="Exercice 3"
**Raisonnement :** On utilise l'Ã©vÃ©nement contraire : "les \(n\) personnes ont toutes des jours d'anniversaire diffÃ©rents". Il y a \(365^n\) cas possibles au total (nombre d'applications de l'ensemble des personnes vers les jours de l'annÃ©e, sans annÃ©es bissextiles). Le nombre de cas favorables Ã  l'Ã©vÃ©nement contraire est le nombre d'arrangements de \(n\) jours parmi 365, soit \(A_{365}^n\).

**Reponse :** La probabilitÃ© est \(\mathbf{P = 1 - \frac{A_{365}^n}{365^n}}\).

---
:::

:::exercise label="Exercice 4" title="Exercice 4"
#### 1. Maths groupÃ©s et Physique groupÃ©s

**Raisonnement :** Il y a 2 "blocs" Ã  ordonner : le bloc Maths et le bloc Physique (2! faÃ§ons de les disposer). Ã€ l'intÃ©rieur du bloc Maths, il y a 12! faÃ§ons de ranger les livres. Ã€ l'intÃ©rieur du bloc Physique, il y a 10! faÃ§ons.

**Reponse :** \(\mathbf{2! \times 12! \times 10!}\) rangements possibles.

#### 2. Seulement les Maths groupÃ©s

**Raisonnement :** On considÃ¨re les 12 livres de maths comme un seul gros bloc. Ce bloc s'ajoute aux 10 livres de physique, soit 11 Ã©lÃ©ments Ã  permuter (\(11!\) faÃ§ons). Ã€ l'intÃ©rieur du bloc des maths, les 12 livres peuvent Ãªtre permutÃ©s de \(12!\) faÃ§ons.

**Reponse :** \(\mathbf{11! \times 12!}\) rangements possibles.

---
:::

:::exercise label="Exercice 5" title="Exercice 5"
**Raisonnement global :** L'armoire contient 20 gants au total (10 paires distinctes). Le nombre de tirages possibles de 4 gants est \(\binom{20}{4} = 4845\).

#### (i) Deux paires assorties

**Raisonnement :** Il faut tirer 2 paires complÃ¨tes. Il suffit de choisir 2 paires parmi les 10 paires disponibles.

**Reponse :** Nombre de cas favorables : \(\binom{10}{2} = 45\). ProbabilitÃ© = \(\mathbf{\frac{45}{4845} = \frac{3}{323}}\).

#### (ii) Au moins une paire

**Raisonnement :** "Au moins une paire" signifie soit "une paire exacte", soit "deux paires". Les deux Ã©vÃ©nements sont incompatibles, on additionne leurs probabilitÃ©s.

**Reponse :** ProbabilitÃ© = \(\frac{45}{4845} + \frac{1440}{4845} = \frac{1485}{4845} = \mathbf{\frac{99}{323}}\).

#### (iii) Une paire et une seule

**Raisonnement :** On choisit la paire assortie parmi 10 (\(\binom{10}{1}\)). Pour les 2 autres gants, il faut qu'ils proviennent de 2 paires diffÃ©rentes. On choisit 2 paires parmi les 9 restantes (\(\binom{9}{2}\)) et pour chacune de ces deux paires, on choisit le gant gauche ou droit (\(2^2\) choix).

**Reponse :** Nombre de cas = \(10 \times 36 \times 4 = 1440\). ProbabilitÃ© = \(\mathbf{\frac{1440}{4845} = \frac{96}{323}}\).

---
:::

:::exercise label="Exercice 6" title="Exercice 6"
**Raisonnement :** C'est un tirage simultanÃ© (ou sans remise) de \(r\) boules parmi \(n\). Le nombre total de tirages est \(\binom{n}{r}\). Pour obtenir exactement \(k\) boules noires, on doit choisir \(k\) boules parmi les \(m\) noires, et les \(r-k\) boules restantes parmi les \(n-m\) boules blanches.

**Reponse :** La probabilitÃ© est \(\mathbf{P = \frac{\binom{m}{k} \times \binom{n-m}{r-k}}{\binom{n}{r}}}\) (Loi hypergÃ©omÃ©trique).

---
:::

:::exercise label="Exercice 7" title="Exercice 7"
**Raisonnement global :** Nombre total de mains de 5 cartes parmi 32 : \(\binom{32}{5} = 201376\). Un jeu de 32 a 8 hauteurs distinctes.

- **(i) Une seule paire :** On choisit la hauteur de la paire (\(\binom{8}{1}\)), puis 2 cartes de cette hauteur (\(\binom{4}{2}\)). On choisit ensuite 3 hauteurs distinctes parmi les 7 restantes (\(\binom{7}{3}\)), puis 1 carte pour chacune d'elles (\(4^3\)).

**Reponse :** ProbabilitÃ© : \(\mathbf{\frac{\binom{8}{1}\binom{4}{2}\binom{7}{3} \times 4^3}{201376} = \frac{107520}{201376} \approx 0.5339}\).

- **(ii) Deux paires :** On choisit 2 hauteurs pour les paires (\(\binom{8}{2}\)), 2 cartes par hauteur (\(\binom{4}{2}^2\)). La cinquiÃ¨me carte est d'une autre hauteur (\(\binom{6}{1} \times \binom{4}{1}\)).

**Reponse :** ProbabilitÃ© : \(\mathbf{\frac{\binom{8}{2}\binom{4}{2}^2 \times 6 \times 4}{201376} = \frac{24192}{201376} \approx 0.1201}\).

- **(iii) Un brelan :** On choisit la hauteur du brelan (\(\binom{8}{1}\)) et 3 cartes (\(\binom{4}{3}\)). Pour Ã©viter un full, on prend 2 hauteurs distinctes pour les 2 cartes restantes (\(\binom{7}{2}\)) et 1 carte de chaque (\(4^2\)).

**Reponse :** ProbabilitÃ© : \(\mathbf{\frac{\binom{8}{1}\binom{4}{3}\binom{7}{2} \times 4^2}{201376} = \frac{10752}{201376} \approx 0.0534}\).

- **(iv) Un carrÃ© :** On choisit la hauteur du carrÃ© (\(\binom{8}{1}\)), on prend les 4 cartes (\(\binom{4}{4} = 1\)), et 1 carte parmi les 28 autres.

**Reponse :** ProbabilitÃ© : \(\mathbf{\frac{\binom{8}{1} \times 1 \times 28}{201376} = \frac{224}{201376} \approx 0.0011}\).

---
:::

:::exercise label="Exercice 8" title="Exercice 8"
Composition de ANNIVERSAIRE (12 lettres) : A(2), N(2), I(2), V(1), E(2), R(2), S(1).

#### 1. Nombre d'anagrammes

**Raisonnement :** Il y a 12 lettres avec des rÃ©pÃ©titions (5 paires de lettres identiques). C'est une permutation avec rÃ©pÃ©tition.

**Reponse :** \(\mathbf{\frac{12!}{2!2!2!2!2!} = \frac{12!}{32} = 14968800}\) mots.

#### 2. CommenÃ§ant et finissant par une voyelle

**Raisonnement :** Les voyelles sont A, I, E (chacune 2 fois, soit 6 voyelles). Il y a deux cas pour le choix des lettres aux extrÃ©mitÃ©s:

- MÃªme voyelle aux deux bouts (ex: A...A) : 3 choix pour la voyelle. Les 10 lettres restantes ont 4 paires. Permutations : \(3 \times \frac{10!}{2!2!2!2!} = 3 \times 226800 = 680400\).
- Voyelles diffÃ©rentes aux bouts (ex: A...E) : \(A_3^2 = 6\) choix pour le couple ordonnÃ©. Les 10 lettres restantes conservent 5 paires. Permutations : \(6 \times \frac{10!}{2!2!2!2!2!} = 6 \times 113400 = 680400\).

**Reponse :** \(\mathbf{680400 + 680400 = 1360800}\) mots.

#### 3. Toutes les voyelles groupÃ©es

**Raisonnement :** On lie les 6 voyelles en 1 seul bloc. Ce bloc + les 6 consonnes forment 7 Ã©lÃ©ments Ã  permuter, avec les paires de N et R (\(\frac{7!}{2!2!}\)). Ã€ l'intÃ©rieur du bloc voyelles, on permute les 6 lettres avec les paires de A, I, E (\(\frac{6!}{2!2!2!}\)).

**Reponse :** \(\mathbf{\frac{7!}{4} \times \frac{6!}{8} = 1260 \times 90 = 113400}\) mots.

---
:::

:::exercise label="Exercice 9" title="Exercice 9"
#### 1. Tirage simultanÃ© de 5 boules

- **(a)** \(\Omega\) est l'ensemble des combinaisons de 5 boules parmi 16 (les boules Ã©tant discernables).

**Reponse :** \(\mathbf{\text{Card}(\Omega) = \binom{16}{5} = 4368}\).

- **(b)** **Reponse :** \(\mathbf{P(2B, 3N) = \frac{\binom{6}{2} \times \binom{10}{3}}{\binom{16}{5}}}\).

#### 2. Tirage successif de 2 boules, sans remise

- **(a) ClassÃ© :** \(\Omega\) est l'ensemble des arrangements de 2 boules parmi 16.

**Reponse :** \(\mathbf{\text{Card}(\Omega) = A_{16}^2 = 16 \times 15 = 240}\).

- **(b)** **Reponse :** \(\mathbf{P(\text{1B puis 1N}) = \frac{6 \times 10}{240} = \frac{1}{4}}\).
- **(c) Non classÃ© :** \(\Omega\) est l'ensemble des combinaisons. \(\text{Card}(\Omega) = \binom{16}{2} = 120\).

**Reponse :** \(\mathbf{P(\text{1B et 1N}) = \frac{\binom{6}{1} \binom{10}{1}}{120} = \frac{60}{120} = \frac{1}{2}}\).

#### 3. Tirage avec remise de 2 boules

- **(a) ClassÃ© :** \(\Omega\) est l'ensemble des listes de 2 boules parmi 16.

**Reponse :** \(\mathbf{\text{Card}(\Omega) = 16^2 = 256}\).

- **(b)** **Reponse :** \(\mathbf{P(\text{1B puis 1N}) = \frac{6 \times 10}{256} = \frac{60}{256} = \frac{15}{64}}\).
- **(c) Non classÃ© :** Il n'y a plus d'ordre imposÃ© (la boule noire peut Ãªtre la premiÃ¨re ou la deuxiÃ¨me).

**Reponse :** On a donc \(\mathbf{P = 2 \times P(\text{1B puis 1N}) = 2 \times \frac{15}{64} = \frac{15}{32}}\).

---
:::

:::exercise label="Exercice 10" title="Exercice 10"
**Raisonnement :** On calcule la probabilitÃ© de l'Ã©vÃ©nement contraire pour chaque scÃ©nario.

- Au moins un 6 en 4 lancers : \(P_1 = 1 - \left(\frac{5}{6}\right)^4 \approx 1 - 0.482 = 0.518\).
- Au moins un double 6 en 24 lancers de 2 dÃ©s : La probabilitÃ© de ne pas faire un double 6 est de 35/36. Donc \(P_2 = 1 - \left(\frac{35}{36}\right)^{24} \approx 1 - 0.509 = 0.491\).

**Reponse :** Il est plus probable d'obtenir au moins un 6 en lanÃ§ant 4 fois de suite un dÃ©.

---
:::

:::exercise label="Exercice 11" title="Exercice 11"
**Raisonnement :** Pour gagner, le joueur 2 doit remporter les 2 parties suivantes (probabilitÃ© de \(\frac{1}{2} \times \frac{1}{2} = \frac{1}{4}\)). Dans tous les autres cas (le joueur 1 gagne la partie 4, ou le joueur 2 gagne la 4 et le joueur 1 gagne la 5), le joueur 1 emporte la mise (probabilitÃ© de \(1 - \frac{1}{4} = \frac{3}{4}\)).

**Reponse :** La mise doit Ãªtre rÃ©partie proportionnellement Ã  leurs chances de victoire : \(\mathbf{\frac{3}{4}}\) de la mise pour le premier joueur et \(\mathbf{\frac{1}{4}}\) pour le second.

---
:::

:::exercise label="Exercice 12" title="Exercice 12"
#### 1. Choix possibles

**Reponse :** Il faut choisir 4 voitures parmi 20, soit \(\mathbf{\binom{20}{4} = 4845}\) choix.

#### 2. Au moins une voiture en panne

**Raisonnement :** Il y a 5 voitures en panne et 15 qui fonctionnent.

- **FaÃ§on 1 (Ã‰vÃ©nement contraire) :** \(1 - P(\text{0 panne}) = 1 - \frac{\binom{15}{4}}{\binom{20}{4}} = 1 - \frac{1365}{4845} \approx 0.718\).
- **FaÃ§on 2 (Somme directe) :** \(\frac{\binom{5}{1}\binom{15}{3} + \binom{5}{2}\binom{15}{2} + \binom{5}{3}\binom{15}{1} + \binom{5}{4}\binom{15}{0}}{\binom{20}{4}}\).

#### 3. Exactement 2 voitures en panne

**Reponse :** On choisit 2 en panne parmi 5, et 2 qui fonctionnent parmi 15 : \(\mathbf{\frac{\binom{5}{2} \times \binom{15}{2}}{\binom{20}{4}} = \frac{10 \times 105}{4845} = \frac{1050}{4845} \approx 0.217}\).

---
:::

:::exercise label="Exercice 13" title="Exercice 13"
**Raisonnement :** C'est le nombre de partitions ordonnÃ©es d'un ensemble de 4 personnes (les nombres de Fubini). On sÃ©pare selon le nombre \(k\) de places distinctes Ã  l'arrivÃ©e (les ex-aequo forment des "blocs"):

- 1 bloc (tous 1er ex-aequo) : 1 faÃ§on.
- 2 blocs : Les partitions possibles sont du type "3 et 1" (4 faÃ§ons) ou "2 et 2" (3 faÃ§ons), total 7 partitions. Pour chacune, 2! ordres possibles d'arrivÃ©e. \(7 \times 2 = 14\) faÃ§ons.
- 3 blocs : Partitions "2, 1 et 1" (6 partitions). OrdonnÃ©es : \(6 \times 3! = 36\) faÃ§ons.
- 4 blocs (aucun ex-aequo) : \(4! = 24\) faÃ§ons.

**Reponse :** \(\mathbf{1 + 14 + 36 + 24 = 75}\) classements possibles.

---
:::

:::exercise label="Exercice 14" title="Exercice 14"
**Raisonnement :** Bien qu'il y ait autant de combinaisons brutes donnant une somme de 9 (126, 135, 144, 225, 234, 333) que donnant 10 (136, 145, 226, 235, 244, 334), il faut tenir compte des permutations, les dÃ©s Ã©tant physiquement distincts.

- Pour la somme de 9, les permutations donnent : \(6 + 6 + 3 + 3 + 6 + 1 = 25\) faÃ§ons.
- Pour la somme de 10, les permutations donnent : \(6 + 6 + 3 + 6 + 3 + 3 = 27\) faÃ§ons.

**Reponse :** Il y a 27 cas favorables pour obtenir 10 contre 25 cas pour obtenir 9. Le total de 10 est donc plus probable.
:::
