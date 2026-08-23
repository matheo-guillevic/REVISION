---
title: "TD 4 corrige - Variables aleatoires continues"
subject: "math"
type: "td"
target: "math-td4.html"
eyebrow: "TD 4"
heading: "Variables aleatoires continues"
summary: "Corrige maintenu en Markdown."
---
:::exercise label="Exercice 1" title="Exercice 1"
Soit \(X\) une variable alÃ©atoire Ã  densitÃ© suivant la loi uniforme sur \([-3, 5]\).

#### 1. DensitÃ© \(f_X\) et fonction de rÃ©partition \(F_X\)

**Raisonnement :** **Etape 1 : DensitÃ© d'une loi uniforme.**
 La densitÃ© d'une loi uniforme sur un intervalle \([a, b]\) est constante et vaut \(\frac{1}{b-a}\) sur cet intervalle. \[f_X(x) = \frac{1}{5 - (-3)} = \frac{1}{8} \quad \text{pour } x \in [-3, 5]\]

**Etape 2 : Fonction de rÃ©partition.**
 La fonction de rÃ©partition s'obtient en intÃ©grant la densitÃ© : \(F_X(x) = \int_{-\infty}^x f_X(t)dt\).

- Pour \(x  5\) : \(F_X(x) = 1\)

**Reponse :** \[\mathbf{f_X(x) = \frac{1}{8} \cdot \mathbb{I}_{[-3, 5]}(x)}\] \[\mathbf{F_X(x) = \frac{x+3}{8} \cdot \mathbb{I}_{[-3, 5]}(x) + \mathbb{I}_{]5, +\infty[}(x)}\]

#### 2. ProbabilitÃ©s \(\mathbb{P}(X 0\), la variable \(aZ+b\) aura pour bornes \(a(0)+b = b\) et \(a(1)+b = a+b\). Elle suivra donc une loi uniforme \(\mathcal{U}([b, a+b])\).

**Etape 2 : Identification.**
 On veut \(\mathcal{U}([-3, 8])\). Par identification des bornes : \[b = -3 \quad \text{et} \quad a+b = 8 \implies a - 3 = 8 \implies a = 11\]

**Reponse :** \[\mathbf{a = 11 \quad \text{et} \quad b = -3}\]

---
:::

:::exercise label="Exercice 2" title="Exercice 2"
Soit \(X\) une variable alÃ©atoire suivant la loi uniforme sur \([-1;1]\). DÃ©terminer la loi de \(X^2\).

**Raisonnement :** **Etape 1 : Identification du support.**
 Soit \(Y = X^2\). Puisque \(X \in [-1, 1]\), ses carrÃ©s seront nÃ©cessairement compris entre \(0\) et \(1\). Le support de la loi de \(Y\) est l'intervalle \([0, 1]\).

**Etape 2 : Calcul de la fonction de rÃ©partition de Y.**
 Pour \(y \in [0, 1]\) : \[F_Y(y) = \mathbb{P}(Y \le y) = \mathbb{P}(X^2 \le y) = \mathbb{P}(-\sqrt{y} \le X \le \sqrt{y})\] Puisque la densitÃ© de \(X\) sur \([-1,1]\) vaut \(f_X(x) = \frac{1}{2}\) : \[F_Y(y) = \int_{-\sqrt{y}}^{\sqrt{y}} \frac{1}{2} dx = \frac{1}{2} \left( \sqrt{y} - (-\sqrt{y}) \right) = \frac{1}{2} (2\sqrt{y}) = \sqrt{y}\]

**Etape 3 : DÃ©duction de la densitÃ© de Y.**
 La densitÃ© s'obtient en dÃ©rivant la fonction de rÃ©partition par rapport Ã  \(y\) sur \(]0, 1]\) : \[f_Y(y) = F_Y'(y) = \frac{d}{dy}(\sqrt{y})\]

**Reponse :** \[\mathbf{f_Y(y) = \frac{1}{2\sqrt{y}} \quad \text{pour } y \in ]0, 1] \text{ (et } 0 \text{ sinon)}.}\]

---
:::

:::exercise label="Exercice 3" title="Exercice 3"
On considÃ¨re la variable alÃ©atoire \(X\) d'espÃ©rance 242 et de variance 144. On suppose que \(X\) est une variable gaussienne.

#### 1. ProbabilitÃ©s infÃ©rieures ou supÃ©rieures Ã  0,5

**Raisonnement :** **Etape 1 : SymÃ©trie de la loi normale.**
 On a \(X \sim \mathcal{N}(242, 12^2)\). La courbe de densitÃ© est parfaitement symÃ©trique autour de son espÃ©rance \(\mu = 242\). L'aire totale sous la courbe vaut 1, donc la probabilitÃ© d'Ãªtre d'un cÃ´tÃ© de l'espÃ©rance est exactement 0,5.

**Etape 2 : Analyse des positions.**

- \(\mathbb{P}(X250)\) : \(250\) est supÃ©rieur Ã  \(\mu=242\). L'aire Ã  droite de 250 est une sous-partie de la moitiÃ© droite.
- \(\mathbb{P}(X>220)\) : \(220\) est infÃ©rieur Ã  \(\mu=242\). L'aire Ã  droite englobe toute la moitiÃ© droite plus une partie gauche.

**Reponse :**

- \(\mathbf{\mathbb{P}(X250) 220) > 0,5}\)

#### 2. ProbabilitÃ©s Ã  0,01 prÃ¨s

**Raisonnement :** On utilise la RÃ¨gle des 68-95-99.7. On identifie les bornes en fonction de \(\mu=242\) et \(\sigma=12\).

- \(\mathbb{P}(206 \le X \le 278)\) : L'intervalle est \([\mu - 3\sigma, \mu + 3\sigma]\).
- \(\mathbb{P}(230 \le X \le 254)\) : L'intervalle est \([\mu - 1\sigma, \mu + 1\sigma]\).
- \(\mathbb{P}(218 < X < 266)\) : L'intervalle est \([\mu - 2\sigma, \mu + 2\sigma]\).

**Reponse :** \[\mathbf{\mathbb{P}(206 \le X \le 278) \approx 0.99}\] \[\mathbf{\mathbb{P}(230 \le X \le 254) \approx 0.68}\] \[\mathbf{\mathbb{P}(218 < X < 266) \approx 0.95}\]

---
:::

:::exercise label="Exercice 4" title="Exercice 4"
Une imprimante permet d'imprimer 5000 copies avec un Ã©cart type de 1000 copies. Le nombre de copies suit une loi normale. Calculer de tÃªte la probabilitÃ© de pouvoir imprimer plus de 6000 copies. Et pour moins de 3000 copies?

**Raisonnement :** **Etape 1 : ModÃ©lisation et centrage.**
 Soit \(X\) le nombre de copies, on a \(X \sim \mathcal{N}(5000, 1000^2)\). L'espÃ©rance est \(\mu = 5000\) et l'Ã©cart-type est \(\sigma = 1000\).

**Etape 2 : ProbabilitÃ© pour plus de 6000 copies.**
 \(6000\) correspond exactement Ã  \(\mu + 1\sigma\). D'aprÃ¨s la rÃ¨gle empirique (68-95-99.7), environ 68% des valeurs se situent entre \(\mu - \sigma\) et \(\mu + \sigma\). L'extÃ©rieur reprÃ©sente 32%, partagÃ© Ã©quitablement des deux cÃ´tÃ©s. Donc la probabilitÃ© d'Ãªtre supÃ©rieur Ã  \(\mu + \sigma\) est de \(32\% / 2 = 16\%\).

**Etape 3 : ProbabilitÃ© pour moins de 3000 copies.**
 \(3000\) correspond exactement Ã  \(\mu - 2\sigma\). Environ 95% des valeurs se situent entre \(\mu - 2\sigma\) et \(\mu + 2\sigma\). L'extÃ©rieur reprÃ©sente 5%, partagÃ© Ã©quitablement (2.5% de chaque cÃ´tÃ©). La probabilitÃ© d'Ãªtre infÃ©rieur Ã  \(\mu - 2\sigma\) est donc de \(2.5\%\).

**Reponse :** \[\mathbf{\mathbb{P}(X > 6000) \approx 0.16}\] \[\mathbf{\mathbb{P}(X < 3000) \approx 0.025}\]

---
:::

:::exercise label="Exercice 5" title="Exercice 5"
Soient \(T_1\) et \(T_2\) indÃ©pendantes de loi exponentielle de paramÃ¨tre \(\lambda_1\) et \(\lambda_2\). Soit \(Z=\min(T_1,T_2)\).

#### 1. Calcul de la loi de Z

**Raisonnement :** **Etape 1 : Fonction de survie du minimum.**
 Le minimum de deux variables est supÃ©rieur Ã  \(z\) si et seulement si les deux variables sont simultanÃ©ment supÃ©rieures Ã  \(z\). \[\mathbb{P}(Z > z) = \mathbb{P}(T_1 > z \cap T_2 > z)\] Par indÃ©pendance des variables : \[\mathbb{P}(Z > z) = \mathbb{P}(T_1 > z) \mathbb{P}(T_2 > z)\]

**Etape 2 : Application aux lois exponentielles.**
 La fonction de survie d'une loi exponentielle est \(\mathbb{P}(T > t) = e^{-\lambda t}\). \[\mathbb{P}(Z > z) = e^{-\lambda_1 z} e^{-\lambda_2 z} = e^{-(\lambda_1 + \lambda_2)z}\] Cette expression est exactement la fonction de survie d'une loi exponentielle de paramÃ¨tre \(\lambda_1 + \lambda_2\).

**Reponse :** \[\mathbf{Z \sim \mathcal{E}(\lambda_1 + \lambda_2)}\]

#### 2. GÃ©nÃ©ralisation au cas de n variables

**Raisonnement :** En appliquant la mÃªme logique, le minimum de \(n\) variables exponentielles indÃ©pendantes suit une loi exponentielle dont le paramÃ¨tre est la somme des paramÃ¨tres de chaque loi.

**Reponse :** \[\mathbf{Z = \min(X_1, \dots, X_n) \sim \mathcal{E}\left(\sum_{i=1}^n \lambda_i\right)}\]

#### 3. Temps d'attente au bureau de poste

Robert attend au bureau de poste (2 guichets occupÃ©s avec temps de service \(Exp(\lambda_1)\) et \(Exp(\lambda_2)\)). Loi de son temps d'attente Y ?

**Raisonnement :** Robert commencera Ã  Ãªtre servi dÃ¨s qu'un des deux guichets se libÃ¨re. Son temps d'attente \(Y\) correspond donc au plus court des deux temps de service en cours, soit \(Y = \min(X_1, X_2)\). D'aprÃ¨s la question 1 :

**Reponse :** \[\mathbf{Y \sim \mathcal{E}(\lambda_1 + \lambda_2)}\]

#### 4. Loi de la durÃ©e de vie de n composants en parallÃ¨le (A) et en sÃ©rie (B)

**Raisonnement :** **Etape 1 : SystÃ¨me en SÃ©rie (B).**
 Un systÃ¨me en sÃ©rie tombe en panne dÃ¨s qu'un seul de ses composants tombe en panne. La durÃ©e de vie est donc le minimum des durÃ©es de vie : \(T_B = \min(X_1, \dots, X_n)\).

**Etape 2 : SystÃ¨me en ParallÃ¨le (A).**
 Un systÃ¨me en parallÃ¨le ne tombe en panne que lorsque TOUS ses composants sont en panne. La durÃ©e de vie est le maximum des durÃ©es de vie : \(T_A = \max(X_1, \dots, X_n)\). La fonction de rÃ©partition du maximum est : \[F_{T_A}(t) = \mathbb{P}(\max \le t) = \mathbb{P}(X_1 \le t \cap \dots \cap X_n \le t)\] Par indÃ©pendance : \[F_{T_A}(t) = (\mathbb{P}(X_1 \le t))^n = (1 - e^{-\lambda t})^n\]

**Reponse :** \[\mathbf{T_B \sim \mathcal{E}(n\lambda)}\] \[\mathbf{F_{T_A}(t) = (1 - e^{-\lambda t})^n}\]

---
:::

:::exercise label="Exercice 6" title="Exercice 6"
\(X \in \{5, 15, 25\}\) (probabilitÃ©s \(1/4, 1/2, 1/4\)). \(Y \sim \mathcal{E}(1/5)\). X et Y indÃ©pendantes. Toto prend le premier arrivÃ©.

#### 1. ProbabilitÃ© que Toto attende plus de 10 minutes

**Raisonnement :** Le temps d'attente \(T\) de Toto correspond au minimum entre le temps d'arrivÃ©e de l'autobus \(X\) et celui du taxi \(Y\) : \(T = \min(X, Y)\). \[\mathbb{P}(T > 10) = \mathbb{P}(X > 10 \cap Y > 10)\] Par indÃ©pendance : \[\mathbb{P}(T > 10) = \mathbb{P}(X > 10) \times \mathbb{P}(Y > 10)\] On a \(\mathbb{P}(X > 10) = \mathbb{P}(X=15) + \mathbb{P}(X=25) = \frac{1}{2} + \frac{1}{4} = \frac{3}{4}\). Pour \(Y \sim \mathcal{E}(1/5)\), \(\mathbb{P}(Y > 10) = e^{-\frac{1}{5} \times 10} = e^{-2}\).

**Reponse :** \[\mathbf{\mathbb{P}(T > 10) = \frac{3}{4} e^{-2}}\]

#### 2. ProbabilitÃ© que Toto prenne le taxi plutÃ´t que l'autobus

**Raisonnement :** Toto prend le taxi si ce dernier arrive avant l'autobus, donc on cherche \(\mathbb{P}(Y  10)}\] L'Ã©vÃ©nement "prendre le taxi ET attendre plus de 10 min" se traduit par \((Y  10) \cap (Y > 10)\). Ceci Ã©quivaut Ã  \(10  10)\) calculÃ© Ã  la question 1 : \[\mathbb{P}(Y  10) = \frac{\frac{3}{4}e^{-2} - \frac{1}{2}e^{-3} - \frac{1}{4}e^{-5}}{\frac{3}{4}e^{-2}}\]

**Reponse :** \[\mathbf{\mathbb{P}(Y  10) = 1 - \frac{2}{3}e^{-1} - \frac{1}{3}e^{-3}}\]

---
:::

:::exercise label="Exercice 7" title="Exercice 7"
Robert entre chez le coiffeur (occupÃ©). La coupe dure exactement 30 min, dÃ©but alÃ©atoire uniformÃ©ment rÃ©parti entre 0 et 30 min. ProbabilitÃ© que \(t\) min aprÃ¨s, le coiffeur n'ait pas fini ?

**Raisonnement :** **Etape 1 : ModÃ©lisation.**
 Soit \(D\) le temps Ã©coulÃ© depuis le dÃ©but de la coupe en cours lorsque Robert entre. D'aprÃ¨s l'Ã©noncÃ©, \(D \sim \mathcal{U}([0, 30])\). La coupe totale dure 30 minutes, le temps restant pour le client actuel est donc \(R = 30 - D\).

**Etape 2 : Formulation de l'Ã©vÃ©nement.**
 Dire que le coiffeur n'a pas fini la coupe \(t\) minutes aprÃ¨s l'entrÃ©e de Robert signifie que le temps restant est supÃ©rieur Ã  \(t\) : \[\mathbb{P}(R > t) = \mathbb{P}(30 - D > t) = \mathbb{P}(D < 30 - t)\]

**Etape 3 : Calcul selon \(t\).**
 Si \(t \ge 30\), le coiffeur a forcÃ©ment fini, la probabilitÃ© est 0. Si \(t \in [0, 30]\), on calcule la probabilitÃ© Ã  l'aide de la fonction de rÃ©partition de la loi uniforme : \[\mathbb{P}(D < 30 - t) = \frac{(30 - t) - 0}{30}\]

**Reponse :** \[\mathbf{\mathbb{P}(\text{pas fini}) = 1 - \frac{t}{30} \quad \text{pour } t \in [0, 30] \text{ (et 0 sinon)}}\]

---
:::

:::exercise label="Exercice 8" title="Exercice 8"
Route \([0, l]\). Incendie en \(X \sim \mathcal{U}([0, l])\). Pompiers en \(p\). Distance \(D = |X-p|\).

#### 1. Distance moyenne

**Raisonnement :** **Etape 1 : EspÃ©rance avec valeur absolue.**
 Par le thÃ©orÃ¨me de transfert : \(\mathbb{E}(D) = \int_0^l |x-p| f_X(x) dx = \frac{1}{l} \int_0^l |x-p| dx\).

**Etape 2 : SÃ©paration de l'intÃ©grale.**
 On dÃ©coupe l'intÃ©grale en \(p\) pour retirer la valeur absolue : \[\mathbb{E}(D) = \frac{1}{l} \left[ \int_0^p (p-x) dx + \int_p^l (x-p) dx \right]\] \[= \frac{1}{l} \left[ \left(px - \frac{x^2}{2}\right)_0^p + \left(\frac{x^2}{2} - px\right)_p^l \right]\] \[= \frac{1}{l} \left[ \frac{p^2}{2} + \left( \frac{l^2}{2} - pl - \frac{p^2}{2} + p^2 \right) \right] = \frac{1}{l} \left[ p^2 - pl + \frac{l^2}{2} \right]\]

**Reponse :** \[\mathbf{\mathbb{E}(D) = \frac{p^2 + (l-p)^2}{2l}}\]

#### 2. Valeur de \(p\) pour minimiser cette distance

**Raisonnement :** **Etape 1 : Minimisation de la fonction.**
 On cherche le minimum de la fonction \(g(p) = \frac{1}{l}(p^2 - pl + l^2/2)\) en dÃ©rivant par rapport Ã  \(p\) : \[g'(p) = \frac{1}{l} (2p - l)\]

**Etape 2 : RÃ©solution.**
 \[g'(p) = 0 \implies 2p - l = 0 \implies p = \frac{l}{2}\]

**Reponse :** \[\mathbf{p = \frac{l}{2}}\] Les pompiers doivent Ãªtre situÃ©s exactement au milieu de la route.
:::
