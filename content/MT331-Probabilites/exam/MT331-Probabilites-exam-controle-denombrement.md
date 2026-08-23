---
title: "Controle corrige - Denombrement"
subject: "MT331-Probabilites"
type: "exam"
target: "MT331-Probabilites-exam-controle-denombrement.html"
eyebrow: "MT331 - Controle"
heading: "Denombrement"
summary: "Questions de cours, denombrement, probabilites finies et calculs combinatoires."
---
:::exercise label="Probleme 1" title="ProblÃ¨me I - Questions de cours"
**1.** Soit \(k\) un entier naturel et \(A\) et \(B\) deux ensembles avec \(|A|=n\) et \(|B|=p\).

(a) le cardinal de \(A \times B\) est :

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition du produit cartÃ©sien.**
 Par dÃ©finition, le cardinal du produit cartÃ©sien de deux ensembles finis est Ã©gal au produit des cardinaux de ces deux ensembles. \[\mathbf{|A \times B| = n \times p}\]
:::

(b) le cardinal de \(A^k\) est :

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Applications vers un ensemble.**
 \(A^k\) dÃ©signe l'ensemble des applications d'un ensemble Ã  \(k\) Ã©lÃ©ments vers \(A\). Pour chacun des \(k\) Ã©lÃ©ments de l'ensemble de dÃ©part, on a \(n\) choix possibles dans \(A\). \[\mathbf{|A^k| = n^k}\]
:::

(c) le nombre de k-listes d'Ã©lÃ©ments de A est :

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : k-listes avec remise.**
 Une k-liste (ou k-uplet) est une suite ordonnÃ©e de \(k\) Ã©lÃ©ments oÃ¹ les rÃ©pÃ©titions sont autorisÃ©es. C'est mathÃ©matiquement Ã©quivalent Ã  un Ã©lÃ©ment de \(A^k\). \[\mathbf{n^k}\]
:::

(d) si \(k \le n\), le nombre de k-listes sans rÃ©pÃ©tition d'Ã©lÃ©ments de A est :

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Arrangements.**
 Il s'agit du nombre d'arrangements de \(k\) Ã©lÃ©ments parmi \(n\) (notÃ© \(A_n^k\)). On a \(n\) choix pour le premier Ã©lÃ©ment, \((n-1)\) pour le second... jusqu'Ã  \((n-k+1)\) pour le \(k\)-iÃ¨me. \[\mathbf{\frac{n!}{(n-k)!}}\]
:::

(e) le nombre de faÃ§ons diffÃ©rentes d'ordonner les n Ã©lÃ©ments de A est :

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Permutations.**
 Ordonner \(n\) Ã©lÃ©ments distincts revient Ã  chercher le nombre de permutations de cet ensemble. Le rÃ©sultat est la factorielle de \(n\). \[\mathbf{n!}\]
:::

(f) si \(k \le n\), le nombre de parties Ã  k Ã©lÃ©ments de A est :

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Combinaisons.**
 Choisir un sous-ensemble (une partie) de \(k\) Ã©lÃ©ments parmi \(n\) revient Ã  calculer le nombre de combinaisons. Ici, contrairement aux listes, l'ordre n'a pas d'importance. \[\mathbf{\binom{n}{k} = \frac{n!}{k!(n-k)!}}\]
:::

(g) le nombre de parties de A est :

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Ensemble des parties.**
 L'ensemble de toutes les parties de \(A\) (notÃ© \(\mathcal{P}(A)\)) a pour cardinal \(2^{|A|}\). On peut le comprendre en disant que pour construire une partie, chaque Ã©lÃ©ment de \(A\) a exactement 2 choix : appartenir ou ne pas appartenir Ã  cette partie. \[\mathbf{2^n}\]
:::

**2.** Soit \((\Omega, \mathcal{P}(\Omega), \mathbb{P})\) un espace probabilisÃ© fini, et A et B deux Ã©vÃ©nements de \(\Omega\).

(a) \(\mathbb{P}(\Omega) =\)

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Axiome de probabilitÃ©.**
 C'est l'axiome fondamental de la dÃ©finition d'une probabilitÃ© : la probabilitÃ© de l'univers entier (l'Ã©vÃ©nement certain) est Ã©gale Ã  1. \[\mathbf{1}\]
:::

(b) \(\mathbb{P}(\emptyset) =\)

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Ã‰vÃ©nement impossible.**
 PropriÃ©tÃ© directe dÃ©coulant des axiomes : l'Ã©vÃ©nement impossible a une probabilitÃ© nulle. \[\mathbf{0}\]
:::

(c) Si \(A \cap B = \emptyset\), alors \(\mathbb{P}(A \cup B) =\)

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : AdditivitÃ©.**
 C'est l'axiome d'additivitÃ© pour des Ã©vÃ©nements incompatibles (disjoints). Comme ils ne peuvent pas se produire en mÃªme temps, la probabilitÃ© de la rÃ©union est la somme des probabilitÃ©s. \[\mathbf{\mathbb{P}(A) + \mathbb{P}(B)}\]
:::

(d) \(\mathbb{P}(\overline{A}) =\)

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Ã‰vÃ©nement contraire.**
 Un Ã©vÃ©nement et son contraire forment une partition de l'univers \(\Omega\). La somme de leurs probabilitÃ©s vaut donc 1. \[\mathbf{1 - \mathbb{P}(A)}\]
:::

(e) \(\mathbb{P}(A \cup B) =\)

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Principe d'inclusion-exclusion.**
 C'est la formule gÃ©nÃ©rale de l'additivitÃ©. On doit soustraire \(\mathbb{P}(A \cap B)\) car les Ã©lÃ©ments communs Ã  \(A\) et \(B\) ont Ã©tÃ© comptÃ©s deux fois (une fois dans \(\mathbb{P}(A)\) et une fois dans \(\mathbb{P}(B)\)). \[\mathbf{\mathbb{P}(A) + \mathbb{P}(B) - \mathbb{P}(A \cap B)}\]
:::

(f) Par dÃ©finition, \(\mathbb{P}_A(B) = \mathbb{P}(B|A) =\)

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : ProbabilitÃ© conditionnelle.**
 C'est la dÃ©finition formelle de la probabilitÃ© conditionnelle de \(B\) sachant que l'Ã©vÃ©nement \(A\) est dÃ©jÃ  rÃ©alisÃ© (sous rÃ©serve que \(\mathbb{P}(A) > 0\)). \[\mathbf{\frac{\mathbb{P}(A \cap B)}{\mathbb{P}(A)}}\]
:::

(g) Si \((A_i)_{1\le i\le n}\) est un systÃ¨me complet d'Ã©vÃ©nements de \(\Omega\), alors \(\sum_{i=1}^{n}\mathbb{P}(B|A_i)\mathbb{P}(A_i) =\)

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : ProbabilitÃ©s totales.**
 Il s'agit de la formule des probabilitÃ©s totales. Le systÃ¨me complet d'Ã©vÃ©nements partitionne l'univers de maniÃ¨re disjointe, permettant de dÃ©composer le calcul selon les diffÃ©rents scÃ©narios \(A_i\). \[\mathbf{\mathbb{P}(B)}\]
:::
:::

:::exercise label="Probleme 2" title="ProblÃ¨me II - Rangement de livres"
On souhaite ranger sur une Ã©tagÃ¨re 4 livres de mathÃ©matiques, 6 livres de physique, et 3 de chimie. De combien de faÃ§ons peut-on effectuer ce rangement :

**1. si les livres doivent Ãªtre groupÃ©s par matiÃ¨res.**

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Ordre des blocs de matiÃ¨res.**
 On a 3 blocs distincts Ã  agencer sur l'Ã©tagÃ¨re (le bloc de Maths, le bloc de Physique et le bloc de Chimie). Il y a \(3!\) faÃ§ons d'ordonner ces 3 blocs.

**Ã‰tape 2 : Ordre interne des livres.**
 Ã€ l'intÃ©rieur de chaque bloc, on doit ordonner les livres distincts :

- \(4!\) possibilitÃ©s pour les livres de mathÃ©matiques.
- \(6!\) possibilitÃ©s pour les livres de physique.
- \(3!\) possibilitÃ©s pour les livres de chimie.

**Ã‰tape 3 : Principe multiplicatif.**
 Comme ces choix s'effectuent de maniÃ¨re successive et indÃ©pendante, on multiplie le nombre de possibilitÃ©s de chaque Ã©tape. \[\mathbf{3! \times 4! \times 6! \times 3!}\]
:::

**2. si seuls les livres de mathÃ©matiques doivent Ãªtre groupÃ©s.**

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : CrÃ©ation d'un bloc.**
 On peut considÃ©rer le bloc indissociable des 4 livres de mathÃ©matiques comme un seul "super-livre". On a alors Ã  ranger 9 livres isolÃ©s (les 6 de physique + les 3 de chimie) ainsi que ce super-livre, soit un total de 10 Ã©lÃ©ments. Il y a \(10!\) faÃ§ons d'ordonner ces Ã©lÃ©ments sur l'Ã©tagÃ¨re.

**Ã‰tape 2 : Ordre interne du bloc.**
 On multiplie ensuite par les faÃ§ons de permuter les livres de mathÃ©matiques Ã  l'intÃ©rieur de leur bloc, soit \(4!\). \[\mathbf{10! \times 4!}\]
:::
:::

:::exercise label="Probleme 3" title="ProblÃ¨me III - Anagrammes"
On considÃ¨re les lettres du mot EVENEMENT (sans accents).

**1. Combien d'anagrammes diffÃ©rents peut-on former ?**

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Analyse des lettres.**
 Le mot contient 9 lettres en tout. Certaines lettres se rÃ©pÃ¨tent : la lettre 'E' apparaÃ®t 4 fois, et la lettre 'N' apparaÃ®t 2 fois. Les lettres 'V', 'M', 'T' sont uniques.

**Ã‰tape 2 : Choix successifs des positions.**

- On choisit d'abord les emplacements des 'E' parmi les 9 cases vides : \(\binom{9}{4}\).
- Il reste 5 cases vides. On choisit les emplacements pour les 'N' : \(\binom{5}{2}\).
- Il reste exactement 3 cases pour les 3 lettres distinctes ('V', 'M', 'T'), on les permute : \(3!\).

**Ã‰tape 3 : Principe multiplicatif (ou permutations avec rÃ©pÃ©titions).**
 Le nombre total d'anagrammes s'Ã©crit \(\binom{9}{4} \times \binom{5}{2} \times 3!\), ce qui correspond directement Ã  la formule des permutations avec rÃ©pÃ©titions (on divise le total des permutations par les factorielles des doublons) : \[\mathbf{\frac{9!}{4! \times 2!}}\]
:::

**2. Parmi ces anagrammes, combien commencent et se terminent par la mÃªme lettre ?**

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification des lettres possibles.**
 Pour qu'un anagramme commence et finisse par la mÃªme lettre, cette lettre doit Ãªtre prÃ©sente au moins deux fois dans le mot d'origine. Les seuls choix possibles sont donc la lettre 'N' ou la lettre 'E'.

**Ã‰tape 2 : Cas de la lettre N aux extrÃ©mitÃ©s.**
 On place un 'N' en premiÃ¨re et en derniÃ¨re position. Il reste 7 places au centre pour les lettres restantes (4 'E', 1 'V', 1 'M', 1 'T'). Le nombre de structures possibles au milieu est calculÃ© en permutant ces 7 lettres et en divisant par les rÃ©pÃ©titions des 'E' : \(\frac{7!}{4!}\).

**Ã‰tape 3 : Cas de la lettre E aux extrÃ©mitÃ©s.**
 On place un 'E' au dÃ©but et Ã  la fin. Il reste 7 places au centre pour les lettres restantes (2 'E', 2 'N', 1 'V', 1 'M', 1 'T'). Le nombre d'anagrammes de ce bloc central est : \(\frac{7!}{2! \times 2!}\).

**Ã‰tape 4 : Somme des cas.**
 Les deux cas Ã©tant mutuellement exclusifs, on additionne les probabilitÃ©s (principe additif) : \[\frac{7!}{4!} + \frac{7!}{2! \times 2!} = \frac{7!}{24} + \frac{7!}{4} = \frac{7! + 6 \times 7!}{24}\] \[\mathbf{\frac{7 \times 7!}{24}}\]
:::
:::

:::exercise label="Probleme 4" title="ProblÃ¨me IV - Tirage de cartes"
On prend 5 cartes simultanÃ©ment dans un jeu de 32 cartes. Quelle est la probabilitÃ© d'obtenir au moins un as ? On commencera par modÃ©liser cette expÃ©rience alÃ©atoire en donnant l'ensemble \(\Omega\) des issues et en donnant la probabilitÃ© \(\mathbb{P}\) sur \(\Omega\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : ModÃ©lisation de l'univers \(\Omega\).**
 Le tirage Ã©tant simultanÃ©, l'ordre n'a aucune importance et il n'y a pas de remise. L'univers \(\Omega\) est donc l'ensemble de tous les sous-ensembles (combinaisons) possibles de 5 cartes choisies parmi 32. Le nombre total d'issues est \(|\Omega| = \binom{32}{5}\). Le tirage s'effectuant au hasard, on munit cet espace de la probabilitÃ© Ã©quirÃ©partie.

**Ã‰tape 2 : DÃ©finition de l'Ã©vÃ©nement contraire.**
 Soit \(A\) l'Ã©vÃ©nement "obtenir au moins un as". Il est beaucoup plus rapide de passer par l'Ã©vÃ©nement contraire \(\overline{A}\) : "n'obtenir aucun as". Un jeu de 32 cartes contient 4 as. Les cartes qui ne sont pas des as sont au nombre de \(32 - 4 = 28\). Pour n'avoir aucun as, il faut choisir nos 5 cartes uniquement parmi ces 28 cartes : \[\mathbb{P}(\overline{A}) = \frac{|\overline{A}|}{|\Omega|} = \frac{\binom{28}{5}}{\binom{32}{5}}\]

**Ã‰tape 3 : ProbabilitÃ© de l'Ã©vÃ©nement A.**
 On applique la formule fondamentale des probabilitÃ©s complÃ©mentaires : \(\mathbb{P}(A) = 1 - \mathbb{P}(\overline{A})\). \[\mathbf{\mathbb{P}(A) = 1 - \frac{\binom{28}{5}}{\binom{32}{5}}}\]
:::

\vfill

Ã‰quipe PÃ©dagogique Esisar Page 1/1
:::
