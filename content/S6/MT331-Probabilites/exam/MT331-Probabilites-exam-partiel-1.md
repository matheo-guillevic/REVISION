---
title: "Partiel corrige 1 - MT331-Probabilites"
subject: "MT331-Probabilites"
type: "exam"
target: "MT331-Probabilites-exam-partiel-1.html"
eyebrow: "Partiel 1"
heading: "Corrige de partiel"
summary: "Lois discretes, lois conjointes, esperance, variance et probabilites conditionnelles."
---
:::exercise label="Exercice 1" title="Exercice 1"
**Question 1** : DÃ©terminer \(\mathbb{P}(X=k|N=n)\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Analyse de l'expÃ©rience conditionnÃ©e.**
 Si on sait que Robert a pris le train \(n\) fois (c'est-Ã -dire sachant \(N=n\)), chaque trajet a une probabilitÃ© \(p\) d'Ãªtre en retard et les retards sont implicitement indÃ©pendants.

**Ã‰tape 2 : DÃ©duction de la loi.**
 La variable \(X\), qui compte le nombre de retards (succÃ¨s) parmi ces \(n\) trajets, suit donc une loi Binomiale de paramÃ¨tres \(n\) et \(p\) : \(\mathcal{B}(n, p)\). Ainsi, pour tout \(k \in [0, n]\) : \[\mathbf{\mathbb{P}(X=k|N=n) = \binom{n}{k} p^k (1-p)^{n-k}}\]
:::

**Question 2** : DÃ©terminer la loi de probabilitÃ© de X. En dÃ©duire son espÃ©rance et sa variance.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Utilisation de la formule des probabilitÃ©s totales.**
 Pour trouver la loi marginale de \(X\), on utilise la formule des probabilitÃ©s totales avec le systÃ¨me complet d'Ã©vÃ©nements \((N=n)_{n \in \mathbb{N}}\). Il faut sommer pour tous les \(n \ge k\) puisque le nombre de retards \(k\) ne peut pas excÃ©der le nombre de trains pris \(n\). \[\begin{aligned}\mathbb{P}(X=k) &= \sum_{n=k}^{+\infty} \mathbb{P}(X=k|N=n)\mathbb{P}(N=n) \\ &= \sum_{n=k}^{+\infty} \binom{n}{k} p^k (1-p)^{n-k} e^{-\lambda} \frac{\lambda^n}{n!} \\ &= e^{-\lambda} \frac{p^k}{k!} \sum_{n=k}^{+\infty} \frac{n!}{(n-k)!} (1-p)^{n-k} \frac{\lambda^n}{n!} \\ &= e^{-\lambda} \frac{(\lambda p)^k}{k!} \sum_{n=k}^{+\infty} \frac{(\lambda(1-p))^{n-k}}{(n-k)!}\end{aligned}\]

**Ã‰tape 2 : Simplification par changement d'indice.**
 On effectue le changement d'indice \(j = n-k\) : \[\mathbb{P}(X=k) = e^{-\lambda} \frac{(\lambda p)^k}{k!} \sum_{j=0}^{+\infty} \frac{(\lambda(1-p))^j}{j!} = e^{-\lambda} \frac{(\lambda p)^k}{k!} e^{\lambda(1-p)}\] \[\mathbf{\mathbb{P}(X=k) = e^{-\lambda p} \frac{(\lambda p)^k}{k!}}\] \(X\) suit donc une **loi de Poisson de paramÃ¨tre \(\lambda p\)**.

**Ã‰tape 3 : EspÃ©rance et Variance.**
 D'aprÃ¨s les propriÃ©tÃ©s de la loi de Poisson : \[\mathbf{\mathbb{E}(X) = \lambda p \quad \text{et} \quad \mathbb{V}(X) = \lambda p}\]
:::

**Question 3** : Quelle est la loi de probabilitÃ© de Y ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : ModÃ©lisation du temps d'attente.**
 Brad prend le train de maniÃ¨re rÃ©pÃ©tÃ©e jusqu'Ã  l'obtention d'un premier succÃ¨s (l'Ã©vÃ©nement "le train est en retard", de probabilitÃ© \(p\)). On s'arrÃªte dÃ¨s que ce succÃ¨s arrive. \(Y\) compte le nombre d'essais nÃ©cessaires pour obtenir ce premier succÃ¨s.

**Ã‰tape 2 : Conclusion.**
 \(Y\) suit donc une **loi gÃ©omÃ©trique de paramÃ¨tre \(p\)**. Pour tout \(k \in \mathbb{N}^*\) : \[\mathbf{\mathbb{P}(Y=k) = (1-p)^{k-1}p}\]
:::

**Question 4** : Calculer la probabilitÃ© que Robert prenne plus souvent le train que Brad.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Formule des probabilitÃ©s totales.**
 On cherche \(\mathbb{P}(N > Y)\). On sait que \(X\) et \(Y\) (et donc \(N\) et \(Y\)) sont indÃ©pendantes. On va utiliser la formule des probabilitÃ©s totales en fixant \(N=n\). On utilise la propriÃ©tÃ© de la fonction de rÃ©partition complÃ©mentaire de la loi gÃ©omÃ©trique : \(\mathbb{P}(Y \ge n) = (1-p)^{n-1}\).

**Ã‰tape 2 : DÃ©veloppement du calcul.**
 \[\begin{aligned}\mathbb{P}(N > Y) &= \sum_{n=1}^{+\infty} \mathbb{P}(N=n) \mathbb{P}(Y  Y) = 1 - e^{-\lambda} - \frac{e^{-\lambda p} - e^{-\lambda}}{1-p}}\]
:::
:::

:::exercise label="Exercice 2" title="Exercice 2"
**Question 1** : DÃ©terminer les lois marginales de X et de Y. X et Y sont-elles indÃ©pendantes ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Calcul des lois marginales.**
 Les lois marginales s'obtiennent en sommant respectivement les lignes (pour X) et les colonnes (pour Y) du tableau de la loi conjointe.

- \(\mathbb{P}(X=0) = 0.05 + 0.08 + 0.12 = \mathbf{0.25}\)
- \(\mathbb{P}(X=1) = 0.15 + 0.12 + 0.08 = \mathbf{0.35}\)
- \(\mathbb{P}(X=2) = 0.20 + 0.15 + 0.05 = \mathbf{0.40}\)

- \(\mathbb{P}(Y=1) = 0.05 + 0.15 + 0.20 = \mathbf{0.40}\)
- \(\mathbb{P}(Y=2) = 0.08 + 0.12 + 0.15 = \mathbf{0.35}\)
- \(\mathbb{P}(Y=4) = 0.12 + 0.08 + 0.05 = \mathbf{0.25}\)

**Ã‰tape 2 : VÃ©rification de l'indÃ©pendance.**
 Pour vÃ©rifier l'indÃ©pendance, on regarde si la probabilitÃ© conjointe est Ã©gale au produit des probabilitÃ©s marginales. Prenons la case \((X=0, Y=1)\) : \[\mathbb{P}(X=0 \cap Y=1) = 0.05\] \[\mathbb{P}(X=0) \times \mathbb{P}(Y=1) = 0.25 \times 0.40 = 0.10\] Comme \(0.05 \neq 0.10\), on conclut que **\(X\) et \(Y\) ne sont pas indÃ©pendantes**.
:::

**Question 2** : DÃ©terminer la loi de la variable alÃ©atoire \(Z=XY\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification des valeurs possibles.**
 On liste toutes les valeurs possibles pour le produit \(XY\), et on additionne les probabilitÃ©s conjointes des cases correspondantes. Les valeurs possibles pour \(Z\) sont : \(0, 1, 2, 4, 8\).

**Ã‰tape 2 : Calcul des probabilitÃ©s de Z.**

- \(\mathbb{P}(Z=0) = \mathbb{P}(X=0) = \mathbf{0.25}\)
- \(\mathbb{P}(Z=1) = \mathbb{P}(X=1, Y=1) = \mathbf{0.15}\)
- \(\mathbb{P}(Z=2) = \mathbb{P}(X=1, Y=2) + \mathbb{P}(X=2, Y=1) = 0.12 + 0.20 = \mathbf{0.32}\)
- \(\mathbb{P}(Z=4) = \mathbb{P}(X=1, Y=4) + \mathbb{P}(X=2, Y=2) = 0.08 + 0.15 = \mathbf{0.23}\)
- \(\mathbb{P}(Z=8) = \mathbb{P}(X=2, Y=4) = \mathbf{0.05}\)
:::

**Question 3** : Calculer la covariance de X et Y.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Calcul des espÃ©rances marginales.**
 Il faut calculer les espÃ©rances Ã  partir des lois marginales obtenues Ã  la question 1. \[\mathbb{E}(X) = 0(0.25) + 1(0.35) + 2(0.40) = 1.15\] \[\mathbb{E}(Y) = 1(0.40) + 2(0.35) + 4(0.25) = 2.10\]

**Ã‰tape 2 : Calcul de l'espÃ©rance du produit.**
 On utilise la loi de \(Z = XY\) pour calculer \(\mathbb{E}(XY)\). \[\mathbb{E}(XY) = \mathbb{E}(Z) = 0(0.25) + 1(0.15) + 2(0.32) + 4(0.23) + 8(0.05) = 2.11\]

**Ã‰tape 3 : Application de la formule de la covariance.**
 \[Cov(X,Y) = \mathbb{E}(XY) - \mathbb{E}(X)\mathbb{E}(Y) = 2.11 - (1.15 \times 2.10)\] \[\mathbf{Cov(X,Y) = 2.11 - 2.415 = -0.305}\]
:::

**Question 4** : Calculer \(\mathbb{P}(X=Y)\) et \(\mathbb{P}(X \le Y)\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Calcul de \(\mathbb{P}(X=Y)\).**
 On identifie directement les cases de la diagonale du tableau oÃ¹ les valeurs sont Ã©gales et on somme leurs probabilitÃ©s : \[\mathbb{P}(X=Y) = \mathbb{P}(X=1, Y=1) + \mathbb{P}(X=2, Y=2) = 0.15 + 0.15\] \[\mathbf{\mathbb{P}(X=Y) = 0.30}\]

**Ã‰tape 2 : Calcul de \(\mathbb{P}(X \le Y)\).**
 Il est plus rapide de passer par l'Ã©vÃ©nement contraire : \(\mathbb{P}(X \le Y) = 1 - \mathbb{P}(X > Y)\). La seule case du tableau oÃ¹ \(X > Y\) est celle oÃ¹ \(X=2\) et \(Y=1\) (probabilitÃ© de 0.20). \[\mathbb{P}(X \le Y) = 1 - 0.20\] \[\mathbf{\mathbb{P}(X \le Y) = 0.80}\]
:::
:::

:::exercise label="Exercice 3" title="Exercice 3"
**Question 1** : Calculer la probabilitÃ© qu'un habitant pris au hasard soit sans opinion.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition des Ã©vÃ©nements et hypothÃ¨ses.**
 Le problÃ¨me ne prÃ©cise pas la proportion d'habitants entre le pays A et le pays B. En l'absence de cette donnÃ©e et avec l'expression "au hasard", on supposera que les deux pays ont le mÃªme poids dÃ©mographique : \(\mathbb{P}(A) = \mathbb{P}(B) = 0.5\). Notons les Ã©vÃ©nements : \(P\): Paix, \(G\): Guerre, \(S\): Sans opinion. D'aprÃ¨s l'Ã©noncÃ© : \[\mathbb{P}(P|A) = 0.60, \quad \mathbb{P}(G|A) = 0.16 \quad \Rightarrow \mathbb{P}(S|A) = 1 - (0.60 + 0.16) = 0.24\] \[\mathbb{P}(G|B) = 0.68, \quad \mathbb{P}(P|B) = 0.12 \quad \Rightarrow \mathbb{P}(S|B) = 1 - (0.68 + 0.12) = 0.20\]

**Ã‰tape 2 : Formule des probabilitÃ©s totales.**
 \[\mathbb{P}(S) = \mathbb{P}(S|A)\mathbb{P}(A) + \mathbb{P}(S|B)\mathbb{P}(B)\] \[\mathbb{P}(S) = 0.24 \times 0.5 + 0.20 \times 0.5\] \[\mathbf{\mathbb{P}(S) = 0.22}\]
:::

**Question 2** : Calculer la probabilitÃ© qu'il habite le pays A sachant qu'il est favorable Ã  la guerre.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Application de la formule de Bayes.**
 On cherche \(\mathbb{P}(A|G)\). \[\mathbb{P}(A|G) = \frac{\mathbb{P}(G|A)\mathbb{P}(A)}{\mathbb{P}(G|A)\mathbb{P}(A) + \mathbb{P}(G|B)\mathbb{P}(B)}\]

**Ã‰tape 2 : Application numÃ©rique.**
 \[\mathbb{P}(A|G) = \frac{0.16 \times 0.5}{0.16 \times 0.5 + 0.68 \times 0.5} = \frac{0.16}{0.84}\] \[\mathbf{\mathbb{P}(A|G) = \frac{4}{21} \approx 0.19}\]
:::

**Question 3** : Calculer la probabilitÃ© qu'il habite le pays A sachant qu'il est favorable Ã  la paix.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Application de la formule de Bayes.**
 On cherche \(\mathbb{P}(A|P)\). \[\mathbb{P}(A|P) = \frac{\mathbb{P}(P|A)\mathbb{P}(A)}{\mathbb{P}(P|A)\mathbb{P}(A) + \mathbb{P}(P|B)\mathbb{P}(B)}\]

**Ã‰tape 2 : Application numÃ©rique.**
 \[\mathbb{P}(A|P) = \frac{0.60 \times 0.5}{0.60 \times 0.5 + 0.12 \times 0.5} = \frac{0.60}{0.72}\] \[\mathbf{\mathbb{P}(A|P) = \frac{5}{6} \approx 0.83}\]
:::
:::

:::exercise label="Exercice 4" title="Exercice 4"
Soit \(X \sim \mathcal{N}(75, 4^2)\). On pose \(Z = \frac{X-75}{4} \sim \mathcal{N}(0,1)\).

**Question 1** : Calculer \(\mathbb{P}(X>80)\) et \(\mathbb{P}(65 80) &= \mathbb{P}\left(Z > \frac{80-75}{4}\right) \\ &= \mathbb{P}(Z > 1.25) \\ &= 1 - \Phi(1.25)\end{aligned}\]

**Ã‰tape 2 : Application numÃ©rique.**
 \[\mathbf{\mathbb{P}(X > 80) \approx 1 - 0.8944 = 0.1056}\]

**Ã‰tape 3 : Cas de l'intervalle.**
 \[\begin{aligned}\mathbb{P}(65  500)  \frac{500 - 75n}{4\sqrt{n}}\right)  2.326) \approx 0.01\). Il faut donc rÃ©soudre l'inÃ©quation : \[\frac{500 - 75n}{4\sqrt{n}} > 2.326\]

**Ã‰tape 3 : Tests successifs pour \(n\).**

- Si \(n=6\) : \(\frac{500 - 450}{4\sqrt{6}} = \frac{50}{9.8} \approx 5.1 > 2.326\) (La condition est largement respectÃ©e).
- Si \(n=7\) : \(\frac{500 - 525}{4\sqrt{7}} < 0\) (C'est impossible, l'argument est nÃ©gatif donc la probabilitÃ© dÃ©passerait 0.5).

\[\mathbf{\text{Le nombre maximum de personnes autorisÃ©es est } 6}\]
:::
:::

:::exercise label="Exercice 5" title="Exercice 5"
Soit la densitÃ© de probabilitÃ© \(f(x) = \frac{c}{x^4}\) si \(x \ge 1\), 0 sinon.

**Question 1** : Calculer c. Donner la fonction de rÃ©partition \(F_X\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Calcul de la constante \(c\).**
 L'intÃ©grale sur \(\mathbb{R}\) d'une densitÃ© de probabilitÃ© doit valoir 1. \[\int_1^{+\infty} c x^{-4} dx = \left[ \frac{c}{-3} x^{-3} \right]_1^{+\infty} = \frac{c}{3} = 1\] \[\mathbf{c = 3}\]

**Ã‰tape 2 : Fonction de rÃ©partition.**
 Pour \(x \ge 1\) : \[F_X(x) = \int_1^x 3t^{-4} dt = \left[ -t^{-3} \right]_1^x\] \[\mathbf{F_X(x) = 1 - \frac{1}{x^3}}\] (Et \(F_X(x) = 0\) pour \(x < 1\)).
:::

**Question 2** : Calculer des probabilitÃ©s.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Calcul direct via la fonction de rÃ©partition.**

- \(\mathbf{\mathbb{P}(X < 2)} = F_X(2) = 1 - \frac{1}{8} = \mathbf{\frac{7}{8}}\)
- \(\mathbf{\mathbb{P}(2 \le X \le 3)} = F_X(3) - F_X(2) = \left(1 - \frac{1}{27}\right) - \left(1 - \frac{1}{8}\right) = \mathbf{\frac{19}{216}}\)
- \(\mathbf{\mathbb{P}(X = 4) = 0}\) (La probabilitÃ© qu'une variable continue prenne une valeur ponctuelle exacte est nulle).
:::

**Question 3** : Calculer \(\mathbb{E}(X^n)\) pour \(n \in \mathbb{N}\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : IntÃ©grale du moment d'ordre n.**
 Elle ne convergera que si la puissance finale est strictement nÃ©gative pour intÃ©grer en l'infini. \[\mathbb{E}(X^n) = \int_1^{+\infty} x^n \frac{3}{x^4} dx = 3 \int_1^{+\infty} x^{n-4} dx\]

**Ã‰tape 2 : Condition d'existence.**
 Pour que l'intÃ©grale converge en l'infini, il faut \(n-4 < -1 \implies n < 3\). Donc les seuls moments existants pour \(n \in \mathbb{N}\) sont pour \(n=0, 1, 2\).

**Ã‰tape 3 : RÃ©sultat.**
 Pour \(n < 3\) : \[\mathbb{E}(X^n) = 3 \left[ \frac{x^{n-3}}{n-3} \right]_1^{+\infty}\] \[\mathbf{\mathbb{E}(X^n) = \frac{3}{3-n}}\]
:::

**Question 4** : Calculer l'espÃ©rance et la variance et les transformations linÃ©aires.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Calcul de l'espÃ©rance et de la variance de X.**
 En utilisant le rÃ©sultat prÃ©cÃ©dent avec \(n=1\) et \(n=2\) : \[\mathbf{\mathbb{E}(X)} = \frac{3}{3-1} = \mathbf{\frac{3}{2}}\] \[\mathbb{E}(X^2) = \frac{3}{3-2} = 3 \implies \mathbf{\mathbb{V}(X)} = \mathbb{E}(X^2) - (\mathbb{E}(X))^2 = 3 - \frac{9}{4} = \mathbf{\frac{3}{4}}\]

**Ã‰tape 2 : Application des propriÃ©tÃ©s de linÃ©aritÃ©.**

- \(\mathbf{\mathbb{E}(-3X-1)} = -3\mathbb{E}(X) - 1 = -3\left(\frac{3}{2}\right) - 1 = \mathbf{-\frac{11}{2}}\)
- \(\mathbf{\mathbb{V}(-3X-1)} = (-3)^2 \mathbb{V}(X) = 9 \times \frac{3}{4} = \mathbf{\frac{27}{4}}\)
:::
:::

:::exercise label="Exercice 6" title="Exercice 6"
Soit \(R \sim \mathcal{E}(2\lambda)\) et \(B \sim \mathcal{E}(3\lambda)\) des variables indÃ©pendantes.

**Question 1** : Quelle est la probabilitÃ© que Robert ait trouvÃ© avant Brad ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Utilisation des propriÃ©tÃ©s de la loi exponentielle.**
 C'est une propriÃ©tÃ© classique des lois exponentielles indÃ©pendantes : la probabilitÃ© que la premiÃ¨re variable soit infÃ©rieure Ã  la seconde est le ratio de son paramÃ¨tre sur la somme des paramÃ¨tres.

**Ã‰tape 2 : Application de la formule.**
 \[\mathbb{P}(R  t)\) en sachant que le minimum est plus grand que \(t\) si et seulement si toutes les variables le sont : \[\begin{aligned}\mathbb{P}(T > t) &= \mathbb{P}(\min(R, B) > t) \\ &= \mathbb{P}(R > t \cap B > t) \\ &= \mathbb{P}(R > t)\mathbb{P}(B > t) \quad \text{(par indÃ©pendance)} \\ &= e^{-2\lambda t} e^{-3\lambda t} \\ &= e^{-5\lambda t}\end{aligned}\]

**Ã‰tape 3 : Conclusion sur la loi.**
 L'expression \(e^{-5\lambda t}\) correspond exactement Ã  la fonction de survie d'une loi exponentielle de paramÃ¨tre \(5\lambda\). \[\mathbf{T \sim \mathcal{E}(5\lambda)}\]
:::

\vfill

Ã‰quipe PÃ©dagogique Esisar Page 1/1
:::
