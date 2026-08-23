---
title: "TD 3 corrige - Variables aleatoires"
subject: "math"
type: "td"
target: "math-td3.html"
eyebrow: "TD 3"
heading: "Variables aleatoires"
summary: "Corrige maintenu en Markdown."
---
:::exercise label="Exercice 1" title="Exercice 1"
Le jeu Chuck a Luck consiste Ã  lancer 3 dÃ©s. On parie sur un chiffre (disons le 6). Les lancers sont indÃ©pendants. Soit \(N\) la variable alÃ©atoire dÃ©signant le nombre d'apparitions de notre chiffre. La probabilitÃ© qu'un dÃ© tombe sur le chiffre choisi est \(p = 1/6\). Ainsi, \(N\) suit une loi binomiale \(\mathcal{B}(3, 1/6)\). Le gain \(X\) dÃ©pend de la valeur de \(N\) :

- Si \(N=3\), \(X=3\)
- Si \(N=2\), \(X=2\)
- Si \(N=1\), \(X=1\)
- Si \(N=0\), \(X=-1\)

#### 1. Loi de \(X\)

**Raisonnement :** On calcule la probabilitÃ© de chaque issue de \(N\) via la formule de la loi binomiale : \(P(N=k) = \binom{3}{k}(1/6)^k(5/6)^{3-k}\).

**Reponse :**

- \(\mathbf{P(X=3) = P(N=3) = \binom{3}{3}(1/6)^3(5/6)^0 = \frac{1}{216}}\)
- \(\mathbf{P(X=2) = P(N=2) = \binom{3}{2}(1/6)^2(5/6)^1 = \frac{15}{216}}\)
- \(\mathbf{P(X=1) = P(N=1) = \binom{3}{1}(1/6)^1(5/6)^2 = \frac{75}{216}}\)
- \(\mathbf{P(X=-1) = P(N=0) = \binom{3}{0}(1/6)^0(5/6)^3 = \frac{125}{216}}\)

#### 2. EspÃ©rance de gain

**Raisonnement :** L'espÃ©rance \(\mathbb{E}(X)\) se calcule par \(\sum x_i P(X=x_i)\). \[\mathbb{E}(X) = 3\left(\frac{1}{216}\right) + 2\left(\frac{15}{216}\right) + 1\left(\frac{75}{216}\right) - 1\left(\frac{125}{216}\right) = \frac{3 + 30 + 75 - 125}{216}\]

**Reponse :** \[\mathbf{\mathbb{E}(X) = \frac{-17}{216} \approx -0.0787\$}\] En moyenne, on perd prÃ¨s de 8 cents par partie.

---
:::

:::exercise label="Exercice 2" title="Exercice 2"
Un quartet \(Q\) est composÃ© de 4 bits. Soit \(X_0, X_1, X_2, X_3\) les 4 bits, valant 1 avec probabilitÃ© \(p\) et 0 avec probabilitÃ© \(1-p\). Les variables \(X_i\) sont indÃ©pendantes et suivent des lois de Bernoulli \(\mathcal{B}(p)\). Le nombre \(Z\) vaut \(Z = X_0 + 2X_1 + 4X_2 + 8X_3\) (on suppose ici \(X_0\) le bit de poids faible).

#### 1. EspÃ©rance et variance de \(Z\)

**Raisonnement :** Par linÃ©aritÃ© de l'espÃ©rance : \(\mathbb{E}(Z) = \mathbb{E}(X_0) + 2\mathbb{E}(X_1) + 4\mathbb{E}(X_2) + 8\mathbb{E}(X_3)\). Comme \(\mathbb{E}(X_i) = p\), on a \(\mathbb{E}(Z) = p + 2p + 4p + 8p\). Les \(X_i\) Ã©tant indÃ©pendantes, la variance de la somme est la somme des variances : \(\mathbb{V}(aX) = a^2\mathbb{V}(X)\). Or \(\mathbb{V}(X_i) = p(1-p)\).

**Reponse :** \[\mathbf{\mathbb{E}(Z) = 15p}\] \[\mathbf{\mathbb{V}(Z) = \mathbb{V}(X_0) + 4\mathbb{V}(X_1) + 16\mathbb{V}(X_2) + 64\mathbb{V}(X_3) = 85p(1-p)}\]

#### 2. ProbabilitÃ© que \(Z\) soit pair

**Raisonnement :** \(Z\) est pair si et seulement si son bit de poids faible \(X_0\) vaut 0.

**Reponse :** \[\mathbf{P(Z \text{ pair}) = P(X_0 = 0) = 1-p}\]

#### 3. ProbabilitÃ© \(P(Z>3)\)

**Raisonnement :** \(Z\) prend ses valeurs de 0 Ã  15. On passe par l'Ã©vÃ©nement complÃ©mentaire : \(P(Z \le 3)\). \(Z \le 3 \iff X_3 = 0 \text{ et } X_2 = 0\). Donc \(Z > 3 \iff X_3 = 1 \text{ ou } X_2 = 1\). En utilisant l'indÃ©pendance, \(P(Z>3) = 1 - P(X_3=0 \cap X_2=0)\).

**Reponse :** \[\mathbf{P(Z>3) = 1 - (1-p)^2}\]

---
:::

:::exercise label="Exercice 3" title="Exercice 3"
#### 1. ProbabilitÃ© de non-fonctionnement de l'appareil

**Raisonnement :** L'appareil de 20 composants fonctionne si TOUS ses composants fonctionnent. La probabilitÃ© qu'un composant fonctionne est \(1 - 0.0015 = 0.9985\). On suppose les pannes indÃ©pendantes. La probabilitÃ© que l'appareil fonctionne est \((0.9985)^{20}\).

**Reponse :** La probabilitÃ© de non-fonctionnement est : \[\mathbf{p_{app} = 1 - (0.9985)^{20} \approx 0.0296}\]

#### 2. Loi de \(X\) (10 appareils) et \(P(\text{au moins 7 bons})\)

**Raisonnement :** Soit \(X\) le nombre d'appareils dÃ©fectueux sur 10. Avoir au moins 7 bons appareils signifie avoir au maximum 3 appareils dÃ©fectueux, donc \(X \le 3\). \(P(X \le 3) = P(X=0) + P(X=1) + P(X=2) + P(X=3)\). \(P(X \le 3) = (1-p)^{10} + 10p(1-p)^9 + 45p^2(1-p)^8 + 120p^3(1-p)^7\).

**Reponse :** En prenant \(p \approx 0.03\), \[\mathbf{X \sim \mathcal{B}(10, 0.03)}\] \[\mathbf{P(X \le 3) \approx 0.9998}\]

#### 3. Nombre moyen (100 appareils)

**Raisonnement :** Pour 100 appareils, le nombre de dÃ©fectueux \(Z \sim \mathcal{B}(100, 0.03)\). L'espÃ©rance est \(np\).

**Reponse :** \[\mathbf{\mathbb{E}(Z) = 100 \times 0.03 = 3 \text{ appareils}}\]

---
:::

:::exercise label="Exercice 4" title="Exercice 4"
#### 1. Loi de \(X\)

**Raisonnement :** Le message comporte \(n=32\) bits. La probabilitÃ© d'erreur par bit est \(p=10^{-5}\). On suppose les erreurs indÃ©pendantes. C'est une rÃ©pÃ©tition d'Ã©preuves de Bernoulli.

**Reponse :** \[\mathbf{X \sim \mathcal{B}(32, 10^{-5})}\]

#### 2. Exactement une erreur

**Raisonnement :** Formule de la loi binomiale \(P(X=1)\).

**Reponse :** \[\mathbf{P(X=1) = \binom{32}{1}(10^{-5})^1(1-10^{-5})^{31} \approx 3.2 \times 10^{-4}}\]

#### 3. Exactement quatre erreurs

**Raisonnement :** Formule de la loi binomiale \(P(X=4)\).

**Reponse :** \[\mathbf{P(X=4) = \binom{32}{4}(10^{-5})^4(1-10^{-5})^{28} \approx 3.6 \times 10^{-16}}\]

#### 4. Au moins une erreur

**Raisonnement :** \(P(X \ge 1) = 1 - P(X=0)\).

**Reponse :** \[\mathbf{P(X \ge 1) = 1 - (1-10^{-5})^{32} \approx 3.2 \times 10^{-4}}\]

#### 5. Nombre moyen d'erreurs

**Raisonnement :** L'espÃ©rance d'une loi binomiale est \(np\).

**Reponse :** \[\mathbf{\mathbb{E}(X) = 32 \times 10^{-5} = 3.2 \times 10^{-4}}\]

---
:::

:::exercise label="Exercice 5" title="Exercice 5"
**Raisonnement :** La probabilitÃ© qu'une personne soit centenaire est \(p = 0.01\). Le nombre de centenaires dans un Ã©chantillon de \(n\) personnes suit une loi binomiale \(\mathcal{B}(n, 0.01)\). On cherche \(P(X \ge 1) = 1 - P(X=0) = 1 - (1-p)^n\).

**Reponse pour 100 personnes :** \[\mathbf{P(X \ge 1) = 1 - 0.99^{100} \approx 0.634}\]

**Reponse pour 200 personnes :** \[\mathbf{P(X \ge 1) = 1 - 0.99^{200} \approx 0.866}\]

---
:::

:::exercise label="Exercice 6" title="Exercice 6"
#### 1. Relation entre \(N, X, Y\)

**Reponse :** \(N\) est le nombre total d'enfants, donc : \[\mathbf{N = X + Y}\]

#### 2. Loi de \(X\)

**Raisonnement :** Sachant que la famille a \(n\) enfants (\(N=n\)), le nombre d'enfants ayant le gÃ¨ne \(A\) suit une loi binomiale \(\mathcal{B}(n, p)\). Donc \(P(X=k | N=n) = \binom{n}{k}p^k(1-p)^{n-k}\). Pour trouver la loi marginale de \(X\), on utilise la formule des probabilitÃ©s totales : \[P(X=k) = \sum_{n=k}^{\infty} P(X=k | N=n)P(N=n)\] Or \(N \sim \mathcal{P}(\lambda)\), donc \(P(N=n) = e^{-\lambda}\frac{\lambda^n}{n!}\). En simplifiant l'expression, on obtient \(P(X=k) = e^{-\lambda p} \frac{(\lambda p)^k}{k!}\).

**Reponse :** \(X\) suit une loi de Poisson de paramÃ¨tre \(\lambda p\) : \[\mathbf{X \sim \mathcal{P}(\lambda p)}\]

#### 3. Loi de \(Y\)

**Raisonnement :** Le raisonnement est symÃ©trique pour \(Y\), l'enfant n'ayant pas le gÃ¨ne avec la probabilitÃ© \(1-p\).

**Reponse :** \(Y\) suit une loi de Poisson de paramÃ¨tre \(\lambda(1-p)\) : \[\mathbf{Y \sim \mathcal{P}(\lambda(1-p))}\]

#### 4. IndÃ©pendance de \(X\) et \(Y\)

**Raisonnement :** On calcule la probabilitÃ© jointe \(P(X=k \cap Y=j)\). Comme \(N = X + Y\), l'Ã©vÃ©nement \((X=k \cap Y=j)\) est Ã©quivalent Ã  \((X=k \cap N=k+j)\). En simplifiant les termes, on obtient \(P(X=k \cap Y=j) = \left(e^{-\lambda p}\frac{(\lambda p)^k}{k!}\right) \times \left(e^{-\lambda(1-p)}\frac{(\lambda(1-p))^j}{j!}\right)\).

**Reponse :** Comme \(P(X=k \cap Y=j) = P(X=k)P(Y=j)\), **X et Y sont indÃ©pendantes**.

#### 5. Application numÃ©rique

**Raisonnement :** On a \(\lambda=2, p=0.4\). On cherche \(P(X=3 \cap Y=2)\). Par indÃ©pendance, c'est \(P(X=3) \times P(Y=2)\). Les paramÃ¨tres sont \(\lambda p = 0.8\) et \(\lambda(1-p) = 1.2\).

**Reponse :** \[\mathbf{P(X=3 \cap Y=2) = \left(e^{-0.8}\frac{0.8^3}{3!}\right) \left(e^{-1.2}\frac{1.2^2}{2!}\right) \approx 0.0083}\]

---
:::

:::exercise label="Exercice 7" title="Exercice 7"
Urne de dÃ©part : 1 Blanche. Ã€ chaque Ã©tape \(k\) : si on tire Blanche, on la remet et on ajoute une Noire. Ã€ l'Ã©tape \(k\), il y a 1 Blanche et \(k-1\) Noires. Le jeu s'arrÃªte au tirage d'une Noire. \(X\) est le nombre de parties jouÃ©es.

#### 1. Loi et espÃ©rance de \(X\)

**Raisonnement (Loi de \(X\)) :** Le jeu ne peut pas s'arrÃªter Ã  la 1Ã¨re partie. Donc \(P(X=1) = 0\). Le jeu s'arrÃªte Ã  l'Ã©tape \(n \ge 2\) si on a tirÃ© Blanche aux Ã©tapes 1 Ã  \(n-1\) et Noire Ã  l'Ã©tape \(n\). ProbabilitÃ© de tirer Blanche Ã  l'Ã©tape \(k\) : \(\frac{1}{k}\).

**Reponse (Loi de \(X\)) :** Pour \(n \ge 2\), \[\mathbf{P(X=n) = \left(\frac{1}{1} \times \frac{1}{2} \dots \times \frac{1}{n-1}\right) \times \frac{n-1}{n} = \frac{n-1}{n!}}\]

**Raisonnement (EspÃ©rance) :** \(\mathbb{E}(X) = \sum_{n=2}^{\infty} n \frac{n-1}{n!} = \sum_{n=2}^{\infty} \frac{1}{(n-2)!}\). On pose \(k = n-2\), ce qui donne la sÃ©rie de l'exponentielle.

**Reponse (EspÃ©rance) :** \[\mathbf{\mathbb{E}(X) = e \approx 2.718 \text{ parties}}\]

#### 2. Loi de \(Y\) (gain)

**Raisonnement :** Ã€ chaque partie, le candidat gagne 1000 euros s'il donne la bonne rÃ©ponse (probabilitÃ© 1/2). Sachant que le jeu dure \(n\) parties (\(X=n\)), le nombre de bonnes rÃ©ponses \(R\) suit une binomiale \(\mathcal{B}(n, 1/2)\). Son gain est \(Y = 1000 \times R\). Pour exprimer la loi marginale de \(Y\) : \(P(Y = 1000k) = \sum_{n=\max(2, k)}^{\infty} P(R=k | X=n)P(X=n)\).

**Reponse :** \[\mathbf{P(Y = 1000k) = \sum_{n=\max(2, k)}^{\infty} \binom{n}{k} \left(\frac{1}{2}\right)^n \frac{n-1}{n!}}\]

---
:::

:::exercise label="Exercice 8" title="Exercice 8"
Les probabilitÃ©s sont : \(p_a = 0.5\), \(p_b = 0.25\), \(p_c = 0.125\), \(p_d = 0.125\).

#### 1 et 2. Codage \(C_1\)

**Raisonnement :** Le code \(C_1\) utilise 2 bits pour chaque lettre.

**Reponse :** La variable "longueur" \(L_1\) prend la valeur constante \(\mathbf{2}\). La longueur moyenne est \(\mathbf{\mathbb{E}(L_1) = 2 \text{ bits}}\). L'Ã©cart-type est \(\mathbf{0}\).

#### 3. Codage \(C_2\)

**Raisonnement :** Longueurs \(L_2\) : \(l_a = 1\), \(l_b = 2\), \(l_c = 3\), \(l_d = 3\). La loi de \(L_2\) est \(P(L_2 = 1) = 0.5\), \(P(L_2 = 2) = 0.25\), \(P(L_2 = 3) = 0.25\). EspÃ©rance : \(\mathbb{E}(L_2) = 1(0.5) + 2(0.25) + 3(0.25) = 1.75\). Variance : \(\mathbb{E}(L_2^2) = 1^2(0.5) + 2^2(0.25) + 3^2(0.25) = 3.75\). \(\mathbb{V}(L_2) = 3.75 - (1.75)^2 = 0.6875\).

**Reponse :** \(\mathbf{\mathbb{E}(L_2) = 1.75 \text{ bits}}\). \(\mathbf{\mathbb{V}(L_2) = 0.6875}\) et l'Ã©cart-type est \(\mathbf{\approx 0.829}\).

#### 4. Choix du code

**Reponse :** **On choisit \(C_2\)** car sa longueur moyenne est plus faible (meilleure compression).

#### 5. Entropie \(H(X)\)

**Raisonnement :** \(H(X) = - \sum p_i \log_2(p_i)\). Sachant que \(\log_2(0.5) = -1\), \(\log_2(0.25) = -2\), \(\log_2(0.125) = -3\).

**Reponse :** \[\mathbf{H(X) = 1.75 \text{ bits}}\]

#### 6. Conclusion

**Reponse :** Le code \(C_2\) a une longueur moyenne exactement Ã©gale Ã  l'entropie de \(X\). **C'est un code optimal**.

---
:::

:::exercise label="Exercice 9" title="Exercice 9 (Paradoxe de St Petersbourg)"
#### 1. Paiement au 16Ã¨me lancer

**Raisonnement :** Si Face apparaÃ®t au 1er lancer : 2 euros (\(2^1\)). Au \(n\)-iÃ¨me : \(2^n\) euros.

**Reponse :** Au 16Ã¨me lancer, le gain est : \[\mathbf{2^{16} = 65536 \text{ euros}}\]

#### 2. Loi de \(X\)

**Raisonnement :** La banque paie \(2^n\) euros si Face apparait pour la 1Ã¨re fois au lancer \(n\). Cela correspond Ã  \(n-1\) fois Pile, puis 1 fois Face. La probabilitÃ© est \((1/2)^{n-1} \times (1/2) = (1/2)^n\).

**Reponse :** Pour tout \(n \ge 1\) : \[\mathbf{P(X = 2^n) = \frac{1}{2^n}}\]

#### 3 et 4. Mises initiales (Approche subjective)

**Raisonnement :** Une mise de 150 euros est trÃ¨s Ã©levÃ©e compte tenu qu'on a \(1/2\) chance de ne gagner que 2 euros, et \(3/4\) de gagner \(\le 4\) euros. La plupart des gens refusent 150 euros. Pour 5 euros, la rÃ©ponse est plus mitigÃ©e.

#### 5. EspÃ©rance mathÃ©matique

**Raisonnement :** \(\mathbb{E}(X) = \sum_{n=1}^{\infty} 2^n \times \frac{1}{2^n} = \sum_{n=1}^{\infty} 1 = +\infty\).

**Reponse :** **L'espÃ©rance de gain est infinie.** Un joueur rationnel devrait accepter de payer n'importe quelle somme finie pour jouer.

#### 6. Illustration

**Reponse :** Ce paradoxe illustre les limites de l'utilisation de la seule espÃ©rance mathÃ©matique pour modÃ©liser le comportement humain rationnel. Il introduit l'idÃ©e d'aversion au risque et la thÃ©orie de l'utilitÃ©.

---
:::

:::exercise label="Exercice 10" title="Exercice 10"
CapacitÃ© = 205. RÃ©servations \(n=210\). ProbabilitÃ© de non-prÃ©sentation \(p = 1/70\). \(X\) = nombre de non-prÃ©sentations.

#### 1. Loi de \(X\)

**Raisonnement :** Il y a 210 passagers qui se prÃ©sentent ou non de faÃ§on indÃ©pendante, avec une probabilitÃ© fixe \(p = 1/70\).

**Reponse :** \[\mathbf{X \sim \mathcal{B}(210, 1/70)}\]

#### 2. \(P(X=0)\) et \(P(X=1)\)

**Raisonnement :** \(P(X=0) = (1 - 1/70)^{210} \approx 0.0483\). \(P(X=1) = 210 (1/70) (69/70)^{209} \approx 0.1471\).

**Reponse :** \[\mathbf{P(X=0) \approx 0.0483 \quad \text{et} \quad P(X=1) \approx 0.1471}\]

#### 3 et 4. Approximation par loi de Poisson

**Raisonnement :** Comme \(n\) est grand et \(p\) petit, la loi de \(X\) peut Ãªtre approchÃ©e par une loi de Poisson de paramÃ¨tre \(\lambda = np = 210 \times \frac{1}{70} = 3\). Donc \(X' \sim \mathcal{P}(3)\). \(P(X'=0) = e^{-3} \approx 0.0498\) et \(P(X'=1) = 3e^{-3} \approx 0.1494\).

**Reponse :** \[\mathbf{P(X'=0) \approx 0.0498 \quad \text{et} \quad P(X'=1) \approx 0.1494}\] Les rÃ©sultats sont trÃ¨s proches de la loi binomiale, justifiant l'approximation.

#### 5. ProbabilitÃ© de surbooking

**Raisonnement :** Il y a plus de passagers que de places si le nombre de passagers prÃ©sents \(Y = 210 - X\) est \(> 205\). On cherche \(P(Y > 205) \iff P(210 - X > 205) \iff P(X \le 4)\). En utilisant l'approximation par Poisson \(X' \sim \mathcal{P}(3)\), on somme de \(X'=0\) Ã  \(X'=4\).

**Reponse :** \[\mathbf{P(X \le 4) \approx P(X' \le 4) \approx 0.815}\] Il y a environ **81.5% de chances** qu'il y ait surbooking et que des passagers soient refusÃ©s.
:::
