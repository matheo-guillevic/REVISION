---
title: "TD 5 corrige - Couples de variables aleatoires"
subject: "MT331-Probabilites"
type: "td"
target: "MT331-Probabilites-td5.html"
eyebrow: "TD 5"
heading: "Couples de variables aleatoires"
summary: "Corrige maintenu en Markdown."
---
:::exercise label="Exercice 1" title="Exercice 1 - Couple Discret"
#### a) DÃ©terminer les lois marginales du couple.

**Raisonnement :** La probabilitÃ© marginale \(\mathbb{P}(X=x)\) s'obtient en sommant les probabilitÃ©s de la ligne correspondante Ã  \(x\). La probabilitÃ© marginale \(\mathbb{P}(Y=y)\) s'obtient en sommant les probabilitÃ©s de la colonne correspondante Ã  \(y\).

**Reponse :** Loi marginale de X :

- \(\mathbf{\mathbb{P}(X=0)} = 0.03 + 0.05 + 0.05 + 0.04 + 0.03 = \mathbf{0.20}\)
- \(\mathbf{\mathbb{P}(X=1)} = 0.07 + 0.08 + 0.10 + 0.05 + 0.05 = \mathbf{0.35}\)
- \(\mathbf{\mathbb{P}(X=2)} = 0.05 + 0.07 + 0.09 + 0.08 + 0.01 = \mathbf{0.30}\)
- \(\mathbf{\mathbb{P}(X=3)} = 0 + 0.05 + 0.06 + 0.03 + 0.01 = \mathbf{0.15}\)

Loi marginale de Y :

- \(\mathbf{\mathbb{P}(Y=0)} = 0.03 + 0.07 + 0.05 + 0 = \mathbf{0.15}\)
- \(\mathbf{\mathbb{P}(Y=1)} = 0.05 + 0.08 + 0.07 + 0.05 = \mathbf{0.25}\)
- \(\mathbf{\mathbb{P}(Y=2)} = 0.05 + 0.10 + 0.09 + 0.06 = \mathbf{0.30}\)
- \(\mathbf{\mathbb{P}(Y=3)} = 0.04 + 0.05 + 0.08 + 0.03 = \mathbf{0.20}\)
- \(\mathbf{\mathbb{P}(Y=4)} = 0.03 + 0.05 + 0.01 + 0.01 = \mathbf{0.10}\)

#### b) Calculer \(\mathbb{E}(X)\), \(\mathbb{V}(X)\), \(\mathbb{E}(Y)\), \(\mathbb{V}(Y)\) et \(Cov(X;Y)\).

**Raisonnement :** **Etape 1 : EspÃ©rance et Variance de X.**
 \(\mathbb{E}(X) = 0(0.20) + 1(0.35) + 2(0.30) + 3(0.15) = 1.4\). \(\mathbb{E}(X^2) = 0(0.20) + 1^2(0.35) + 2^2(0.30) + 3^2(0.15) = 2.9\). \(\mathbb{V}(X) = \mathbb{E}(X^2) - (\mathbb{E}(X))^2\).

**Etape 2 : EspÃ©rance et Variance de Y.**
 \(\mathbb{E}(Y) = 0(0.15) + 1(0.25) + 2(0.30) + 3(0.20) + 4(0.10) = 1.85\). \(\mathbb{E}(Y^2) = 0 + 1(0.25) + 4(0.30) + 9(0.20) + 16(0.10) = 4.85\). \(\mathbb{V}(Y) = \mathbb{E}(Y^2) - (\mathbb{E}(Y))^2\).

**Etape 3 : Calcul de la Covariance.**
 On calcule d'abord \(\mathbb{E}(XY) = \sum_{x,y} x \cdot y \cdot \mathbb{P}(X=x, Y=y)\). Seuls les cas oÃ¹ \(x \neq 0\) et \(y \neq 0\) comptent :

- \(x=1\) : \(1(0.08) + 2(0.10) + 3(0.05) + 4(0.05) = 0.63\)
- \(x=2\) : \(2(1(0.07) + 2(0.09) + 3(0.08) + 4(0.01)) = 2(0.53) = 1.06\)
- \(x=3\) : \(3(1(0.05) + 2(0.06) + 3(0.03) + 4(0.01)) = 3(0.30) = 0.90\)

\(\mathbb{E}(XY) = 0.63 + 1.06 + 0.90 = 2.59\). \(Cov(X,Y) = \mathbb{E}(XY) - \mathbb{E}(X)\mathbb{E}(Y) = 2.59 - (1.4 \times 1.85)\).

**Reponse :** \[\mathbf{\mathbb{E}(X) = 1.4} \quad \text{et} \quad \mathbf{\mathbb{V}(X) = 0.94}\] \[\mathbf{\mathbb{E}(Y) = 1.85} \quad \text{et} \quad \mathbf{\mathbb{V}(Y) = 1.4275}\] \[\mathbf{Cov(X,Y) = 0}\]

#### c) Les variables alÃ©atoires X et Y sont-elles indÃ©pendantes ?

**Raisonnement :** Bien que la covariance soit nulle, cela ne suffit pas Ã  prouver l'indÃ©pendance. On vÃ©rifie sur une case de la loi jointe. Prenons \(X=3\) et \(Y=0\). \(\mathbb{P}(X=3, Y=0) = 0\). Pourtant, le produit des probabilitÃ©s marginales donne : \(\mathbb{P}(X=3) \times \mathbb{P}(Y=0) = 0.15 \times 0.15 = 0.0225\). Puisque \(0 \neq 0.0225\), la dÃ©finition n'est pas vÃ©rifiÃ©e.

**Reponse :** **Les variables X et Y ne sont pas indÃ©pendantes.**

#### d) On pose \(Z=X+2Y\). DÃ©terminer l'espÃ©rance et la variance de Z.

**Raisonnement :** Par la propriÃ©tÃ© de linÃ©aritÃ© de l'espÃ©rance : \(\mathbb{E}(Z) = \mathbb{E}(X) + 2\mathbb{E}(Y)\). Par la formule de la variance pour une somme : \(\mathbb{V}(Z) = \mathbb{V}(X) + 4\mathbb{V}(Y) + 4 Cov(X, Y)\). Puisque \(Cov(X, Y) = 0\), on remplace simplement par les valeurs trouvÃ©es en b).

**Reponse :** \[\mathbf{\mathbb{E}(Z) = 1.4 + 2(1.85) = 5.1}\] \[\mathbf{\mathbb{V}(Z) = 0.94 + 4(1.4275) + 0 = 6.65}\]

#### e) DÃ©terminer la loi de Z.

**Raisonnement :** \(Z = x + 2y\). En balayant le tableau, les valeurs possibles vont de \(0 + 0 = 0\) Ã  \(3 + 2(4) = 11\). On additionne les probabilitÃ©s des cases \((x,y)\) du tableau initial qui donnent la mÃªme valeur pour \(x+2y\).

**Reponse :**

- \(\mathbf{\mathbb{P}(Z=0)} : (0,0) \implies \mathbf{0.03}\)
- \(\mathbf{\mathbb{P}(Z=1)} : (1,0) \implies \mathbf{0.07}\)
- \(\mathbf{\mathbb{P}(Z=2)} : (2,0), (0,1) \implies 0.05 + 0.05 = \mathbf{0.10}\)
- \(\mathbf{\mathbb{P}(Z=3)} : (3,0), (1,1) \implies 0 + 0.08 = \mathbf{0.08}\)
- \(\mathbf{\mathbb{P}(Z=4)} : (2,1), (0,2) \implies 0.07 + 0.05 = \mathbf{0.12}\)
- \(\mathbf{\mathbb{P}(Z=5)} : (3,1), (1,2) \implies 0.05 + 0.10 = \mathbf{0.15}\)
- \(\mathbf{\mathbb{P}(Z=6)} : (2,2), (0,3) \implies 0.09 + 0.04 = \mathbf{0.13}\)
- \(\mathbf{\mathbb{P}(Z=7)} : (3,2), (1,3) \implies 0.06 + 0.05 = \mathbf{0.11}\)
- \(\mathbf{\mathbb{P}(Z=8)} : (2,3), (0,4) \implies 0.08 + 0.03 = \mathbf{0.11}\)
- \(\mathbf{\mathbb{P}(Z=9)} : (3,3), (1,4) \implies 0.03 + 0.05 = \mathbf{0.08}\)
- \(\mathbf{\mathbb{P}(Z=10)} : (2,4) \implies \mathbf{0.01}\)
- \(\mathbf{\mathbb{P}(Z=11)} : (3,4) \implies \mathbf{0.01}\)

#### f) DÃ©terminer \(Cov(X;Z)\).

**Raisonnement :** On utilise la propriÃ©tÃ© de bilinÃ©aritÃ© de la covariance : \[Cov(X, Z) = Cov(X, X+2Y) = Cov(X,X) + 2Cov(X,Y)\] Or, la covariance d'une variable avec elle-mÃªme est sa variance (\(Cov(X,X) = \mathbb{V}(X)\)), et nous avons dÃ©jÃ  dÃ©montrÃ© que \(Cov(X,Y) = 0\).

**Reponse :** \[\mathbf{Cov(X, Z) = \mathbb{V}(X) = 0.94}\]

---
:::

:::exercise label="Exercice 2" title="Exercice 2 - Couple Discret"
#### a) DÃ©terminer les lois marginales du couple et prÃ©ciser si ces variables alÃ©atoires sont indÃ©pendantes.

**Raisonnement :** On somme les lignes pour obtenir la loi de X, et les colonnes pour obtenir la loi de Y. Ensuite, pour l'indÃ©pendance, on vÃ©rifie si chaque case du tableau correspond au produit exact de la probabilitÃ© de sa ligne et de sa colonne. Par exemple : \(\mathbb{P}(X=1) \times \mathbb{P}(Y=1) = 0.40 \times 0.20 = 0.08 = \mathbb{P}(X=1,Y=1)\). C'est le cas pour toutes les valeurs.

**Reponse :** Loi marginale de X :

- \(\mathbf{\mathbb{P}(X=1)} = 0.08 + 0.04 + 0.16 + 0.12 = \mathbf{0.40}\)
- \(\mathbf{\mathbb{P}(X=2)} = 0.04 + 0.02 + 0.08 + 0.06 = \mathbf{0.20}\)
- \(\mathbf{\mathbb{P}(X=3)} = 0.08 + 0.04 + 0.16 + 0.12 = \mathbf{0.40}\)

Loi marginale de Y :

- \(\mathbf{\mathbb{P}(Y=1)} = 0.08 + 0.04 + 0.08 = \mathbf{0.20}\)
- \(\mathbf{\mathbb{P}(Y=2)} = 0.04 + 0.02 + 0.04 = \mathbf{0.10}\)
- \(\mathbf{\mathbb{P}(Y=3)} = 0.16 + 0.08 + 0.16 = \mathbf{0.40}\)
- \(\mathbf{\mathbb{P}(Y=4)} = 0.12 + 0.06 + 0.12 = \mathbf{0.30}\)

**Les variables X et Y sont indÃ©pendantes.**

#### b) Calculer \(Cov(X;Y)\).

**Raisonnement :** D'aprÃ¨s le cours, si deux variables alÃ©atoires sont indÃ©pendantes, leur covariance est strictement nulle. Ayant prouvÃ© l'indÃ©pendance Ã  la question prÃ©cÃ©dente, le calcul est direct.

**Reponse :** \[\mathbf{Cov(X, Y) = 0}\]

#### c) DÃ©terminer la loi du couple \((U, V)\) oÃ¹ \(U = \min(X;Y)\) et \(V = \max(X;Y)\).

**Raisonnement :** \(X \in \{1,2,3\}\) et \(Y \in \{1,2,3,4\}\). Par dÃ©finition, on a toujours \(U \le V\). Les valeurs possibles pour \(U\) sont \(\{1,2,3\}\) et pour \(V\) sont \(\{1,2,3,4\}\). Pour construire les probabilitÃ©s jointes \(\mathbb{P}(U=u, V=v)\) :

- Si \(u = v\) : la probabilitÃ© est celle de la diagonale \(\mathbb{P}(X=u, Y=u)\).
- Si \(u V\)) ont une probabilitÃ© de 0.*

---
:::

:::exercise label="Exercice 3" title="Exercice 3 - Lancer de PiÃ¨ces"
#### a) DÃ©terminer la loi du couple \((X;Y)\) puis les lois marginales de X et Y.

**Raisonnement :** L'expÃ©rience consiste en 3 lancers consÃ©cutifs. L'univers comporte \(2^3 = 8\) issues Ã©quiprobables (P=Pile, F=Face). \(\Omega = \{PPP, PPF, PFP, PFF, FPP, FPF, FFP, FFF\}\). \(X\) compte les "F" sur les piÃ¨ces 1 et 2. \(Y\) compte les "P" sur les piÃ¨ces 2 et 3. En Ã©valuant pour chaque issue (chacune ayant une probabilitÃ© de \(1/8\)) :

- \(PPP \implies X=0, Y=2\)
- \(PPF \implies X=0, Y=1\)
- \(PFP \implies X=1, Y=1\)
- \(PFF \implies X=1, Y=0\)
- \(FPP \implies X=1, Y=2\)
- \(FPF \implies X=1, Y=1\)
- \(FFP \implies X=2, Y=1\)
- \(FFF \implies X=2, Y=0\)

**Reponse :** On regroupe les probabilitÃ©s dans un tableau :

| \(\mathbf{X \setminus Y}\) | **0** | **1** | **2** | **Loi de X** |
| --- | --- | --- | --- | --- |
| **0** | 0 | 1/8 | 1/8 | **2/8 = 1/4** |
| **1** | 1/8 | 2/8 | 1/8 | **4/8 = 1/2** |
| **2** | 1/8 | 1/8 | 0 | **2/8 = 1/4** |
| **Loi de Y** | **1/4** | **1/2** | **1/4** | **1** |

#### b) Les variables alÃ©atoires sont-elles indÃ©pendantes ?

**Raisonnement :** VÃ©rifions par exemple la case \(X=0\) et \(Y=0\). D'aprÃ¨s le tableau, \(\mathbb{P}(X=0, Y=0) = 0\). Or, le produit des marginales est : \(\mathbb{P}(X=0) \times \mathbb{P}(Y=0) = \frac{1}{4} \times \frac{1}{4} = \frac{1}{16}\).

**Reponse :** Puisque \(0 \neq 1/16\) : **Les variables X et Y ne sont pas indÃ©pendantes.**

#### c) Calculer \(Cov(X;Y)\).

**Raisonnement :** X suit une loi binomiale sur 2 lancers avec probabilitÃ© de succÃ¨s 1/2. \(\mathbb{E}(X) = 1\). De mÃªme, \(\mathbb{E}(Y) = 1\). On calcule d'abord \(\mathbb{E}(XY)\) en sommant le produit \(x \cdot y \cdot p\) pour les cases non nulles du tableau : \[\mathbb{E}(XY) = \left(1\cdot 1 \cdot \frac{2}{8}\right) + \left(1\cdot 2 \cdot \frac{1}{8}\right) + \left(2\cdot 1 \cdot \frac{1}{8}\right) = \frac{6}{8} = \frac{3}{4}\] On utilise ensuite la formule de la covariance.

**Reponse :** \[Cov(X, Y) = \mathbb{E}(XY) - \mathbb{E}(X)\mathbb{E}(Y) = \frac{3}{4} - (1 \times 1)\] \[\mathbf{Cov(X, Y) = -\frac{1}{4}}\]

---
:::

:::exercise label="Exercice 4" title="Exercice 4 - Lien dÃ©terministe non-linÃ©aire"
On considÃ¨re \(X\) telle que \(\mathbb{P}(X=-1) = \mathbb{P}(X=0) = \mathbb{P}(X=1) = \frac{1}{3}\). On pose \(Y = X^2\).

#### a) DÃ©terminer la loi de Y.

**Raisonnement :** Puisque \(X \in \{-1, 0, 1\}\), les valeurs possibles pour \(Y = X^2\) sont \(\{0, 1\}\). \(\mathbb{P}(Y=0) = \mathbb{P}(X=0)\). \(\mathbb{P}(Y=1) = \mathbb{P}(X=-1 \cup X=1) = \frac{1}{3} + \frac{1}{3}\).

**Reponse :**

- \(\mathbf{\mathbb{P}(Y=0) = \frac{1}{3}}\)
- \(\mathbf{\mathbb{P}(Y=1) = \frac{2}{3}}\)

#### b) Calculer \(Cov(X;Y)\).

**Raisonnement :** **Etape 1 : EspÃ©rances des variables.**
 \(\mathbb{E}(X) = -1\left(\frac{1}{3}\right) + 0 + 1\left(\frac{1}{3}\right) = 0\). \(\mathbb{E}(Y) = 0\left(\frac{1}{3}\right) + 1\left(\frac{2}{3}\right) = \frac{2}{3}\).

**Etape 2 : Produit des variables.**
 Le produit \(XY\) correspond Ã  \(X \cdot X^2 = X^3\). \(\mathbb{E}(XY) = \mathbb{E}(X^3) = (-1)^3\left(\frac{1}{3}\right) + 0^3 + 1^3\left(\frac{1}{3}\right) = 0\).

**Etape 3 : Formule de la covariance.**
 \(Cov(X,Y) = \mathbb{E}(XY) - \mathbb{E}(X)\mathbb{E}(Y) = 0 - \left(0 \times \frac{2}{3}\right)\).

**Reponse :** \[\mathbf{Cov(X,Y) = 0}\]

#### c) Les variables X et Y sont-elles indÃ©pendantes ?

**Raisonnement :** Une covariance nulle n'implique pas l'indÃ©pendance (la covariance mesure uniquement la corrÃ©lation linÃ©aire, or ici la relation est quadratique). VÃ©rifions avec les probabilitÃ©s jointes. Regardons l'Ã©vÃ©nement conjoint \(\{X=0 \cap Y=1\}\). Il est impossible d'avoir \(X=0\) et \(Y=X^2=1\) simultanÃ©ment. Donc \(\mathbb{P}(X=0, Y=1) = 0\). Cependant, le produit des probabilitÃ©s marginales donne : \(\mathbb{P}(X=0) \times \mathbb{P}(Y=1) = \frac{1}{3} \times \frac{2}{3} = \frac{2}{9}\).

**Reponse :** Puisque \(0 \neq 2/9\), **les variables X et Y ne sont pas indÃ©pendantes.** (*Leur dÃ©pendance est mÃªme totale puisque Y est entiÃ¨rement dÃ©terminÃ©e par X*).
:::
