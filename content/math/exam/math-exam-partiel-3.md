---
title: "Partiel corrige 3 - Probabilites"
subject: "math"
type: "exam"
target: "math-exam-partiel-3.html"
eyebrow: "Partiel 3"
heading: "Corrige de partiel"
summary: "QCM, densites, moments, fonctions de repartition et variables aleatoires continues."
---
:::exercise label="Probleme 1" title="ProblÃ¨me I - QCM"
**Question 1** : Soient X et Y deux variables alÃ©atoires indÃ©pendantes telles que X suit une loi exponentielle de paramÃ¨tre \(\alpha\) et Y suit une loi exponentielle de paramÃ¨tre \(\beta\). \(P(X 0\) : \[F_Y(y) = \mathbb{P}(X \le \sqrt{y}) = 1 - e^{-\lambda\sqrt{y}}\]

**Ã‰tape 2 : DensitÃ© par dÃ©rivation.**
 En dÃ©rivant cette fonction par rapport Ã  y pour obtenir la densitÃ©, on applique la rÃ¨gle de composition (la dÃ©rivÃ©e de \(\sqrt{y}\) fait apparaÃ®tre le facteur \(1/(2\sqrt{y})\)) : \[\mathbf{f_Y(y) = \frac{\lambda}{2\sqrt{y}} e^{-\lambda\sqrt{y}} \quad \text{pour } y>0}\]
:::
:::

:::exercise label="Probleme 2" title="ProblÃ¨me II - DensitÃ© et Moments"
Soit \(f(x) = 6(a-x^2)\) pour \(x \in [-\sqrt{a}, \sqrt{a}]\), et \(0\) sinon.

**Question 1** : DÃ©terminer la valeur de a pour que f soit une densitÃ©.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Condition de normalisation.**
 L'intÃ©grale de la densitÃ© de probabilitÃ© sur l'ensemble de son domaine de dÃ©finition doit Ãªtre strictement Ã©gale Ã  1. \[\int_{-\sqrt{a}}^{\sqrt{a}} 6(a-x^2)\,dx = 1\]

**Ã‰tape 2 : Calcul de l'intÃ©grale et rÃ©solution.**
 On calcule la primitive : \[6 \left[ ax - \frac{x^3}{3} \right]_{-\sqrt{a}}^{\sqrt{a}} = 6 \left( \left(a\sqrt{a} - \frac{a\sqrt{a}}{3}\right) - \left(-a\sqrt{a} + \frac{a\sqrt{a}}{3}\right) \right)\] \[6 \left( \frac{2}{3}a\sqrt{a} + \frac{2}{3}a\sqrt{a} \right) = 6 \left( \frac{4}{3}a\sqrt{a} \right) = 8a\sqrt{a} = 8a^{3/2}\] On rÃ©sout l'Ã©quation : \[8a^{3/2} = 1 \implies a^{3/2} = \frac{1}{8}\] \[\mathbf{a = \frac{1}{4}}\] Le domaine d'intÃ©gration est donc \([-1/2, 1/2]\).
:::

**Question 2** : Calculer l'espÃ©rance et la variance de X.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Calcul de l'espÃ©rance par symÃ©trie.**
 La fonction de densitÃ© \(f(x)\) est paire et l'intervalle d'intÃ©gration \([-1/2, 1/2]\) est symÃ©trique par rapport Ã  0. L'intÃ©grande \(x f(x)\) est donc impair. L'espÃ©rance est de ce fait nulle : \[\mathbf{\mathbb{E}(X) = 0}\]

**Ã‰tape 2 : Calcul de la variance.**
 Puisque l'espÃ©rance est nulle, \(V(X) = \mathbb{E}(X^2)\). \[V(X) = \int_{-1/2}^{1/2} x^2 \cdot 6\left(\frac{1}{4}-x^2\right)\,dx = 6 \int_{-1/2}^{1/2} \left(\frac{x^2}{4} - x^4\right)\,dx\] \[V(X) = 6 \left[ \frac{x^3}{12} - \frac{x^5}{5} \right]_{-1/2}^{1/2} = 12 \left( \frac{(1/2)^3}{12} - \frac{(1/2)^5}{5} \right)\] \[V(X) = 12 \left( \frac{1/8}{12} - \frac{1/32}{5} \right) = 12 \left( \frac{1}{96} - \frac{1}{160} \right) = 12 \left( \frac{5 - 3}{480} \right) = \frac{24}{480}\] \[\mathbf{V(X) = \frac{1}{20}}\]
:::

**Question 3** : Soit \(Y=X^2\), dÃ©terminer la loi de Y.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Fonction de rÃ©partition de Y.**
 Puisque \(X \in [-1/2, 1/2]\), les valeurs possibles pour \(Y\) sont dans \([0, 1/4]\). Pour \(y \in [0, 1/4]\) : \[F_Y(y) = \mathbb{P}(X^2 \le y) = \mathbb{P}(-\sqrt{y} \le X \le \sqrt{y}) = \int_{-\sqrt{y}}^{\sqrt{y}} 6\left(\frac{1}{4}-x^2\right)\,dx\] \[F_Y(y) = 12 \left[ \frac{x}{4} - \frac{x^3}{3} \right]_0^{\sqrt{y}} = 3\sqrt{y} - 4y\sqrt{y} = 3y^{1/2} - 4y^{3/2}\]

**Ã‰tape 2 : DÃ©duction de la densitÃ©.**
 La densitÃ© de \(Y\) s'obtient en dÃ©rivant \(F_Y(y)\) par rapport Ã  \(y\) : \[\mathbf{f_Y(y) = \frac{3}{2\sqrt{y}} - 6\sqrt{y}} \quad \text{pour } y \in \left]0, \frac{1}{4}\right[ \text{ (et } 0 \text{ sinon).}\]
:::
:::

:::exercise label="Probleme 3" title="ProblÃ¨me III - Couple de variables alÃ©atoires"
Soit la densitÃ© jointe : \(f(x,y) = k\left(\frac{1}{x^2} + y^2\right)\) pour \(x \in [1, 5]\) et \(y \in [-1, 1]\).

**Question 1** : Pour quelle valeur de k la fonction f est-elle une densitÃ© ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Condition de normalisation.**
 L'intÃ©grale double sur le domaine dÃ©fini doit valoir 1. \[\iint f(x,y)\,dx\,dy = \int_1^5 \left( \int_{-1}^1 k(x^{-2} + y^2)\,dy \right) dx = 1\]

**Ã‰tape 2 : IntÃ©gration interne (selon y).**
 \[\int_{-1}^1 k(x^{-2} + y^2)\,dy = k \left[ \frac{y}{x^2} + \frac{y^3}{3} \right]_{-1}^1 = k \left( \left(\frac{1}{x^2} + \frac{1}{3}\right) - \left(-\frac{1}{x^2} - \frac{1}{3}\right) \right) = k \left( \frac{2}{x^2} + \frac{2}{3} \right)\]

**Ã‰tape 3 : IntÃ©gration externe (selon x) et rÃ©solution.**
 \[\int_1^5 k \left( \frac{2}{x^2} + \frac{2}{3} \right) dx = k \left[ -\frac{2}{x} + \frac{2x}{3} \right]_1^5\] \[= k \left( \left(-\frac{2}{5} + \frac{10}{3}\right) - \left(-2 + \frac{2}{3}\right) \right) = k \left( \frac{44}{15} - \left(-\frac{4}{3}\right) \right) = k \left( \frac{44}{15} + \frac{20}{15} \right) = k \frac{64}{15}\] On Ã©galise Ã  1 : \[\mathbf{k = \frac{15}{64}}\]
:::

**Question 2** : DÃ©terminer les lois marginales de X et de Y.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DensitÃ© marginale de X.**
 On intÃ¨gre la densitÃ© jointe par rapport Ã  y pour \(x \in [1, 5]\) : \[f_X(x) = \int_{-1}^1 \frac{15}{64} \left( \frac{1}{x^2} + y^2 \right) dy = \frac{15}{64} \left[ \frac{y}{x^2} + \frac{y^3}{3} \right]_{-1}^1 = \frac{15}{64} \left( \frac{2}{x^2} + \frac{2}{3} \right)\] \[\mathbf{f_X(x) = \frac{15}{32x^2} + \frac{5}{32}}\]

**Ã‰tape 2 : DensitÃ© marginale de Y.**
 On intÃ¨gre la densitÃ© jointe par rapport Ã  x pour \(y \in [-1, 1]\) : \[f_Y(y) = \int_1^5 \frac{15}{64} \left( \frac{1}{x^2} + y^2 \right) dx = \frac{15}{64} \left[ -\frac{1}{x} + xy^2 \right]_1^5 = \frac{15}{64} \left( \left(-\frac{1}{5} + 5y^2\right) - \left(-1 + y^2\right) \right)\] \[f_Y(y) = \frac{15}{64} \left( \frac{4}{5} + 4y^2 \right)\] \[\mathbf{f_Y(y) = \frac{3}{16} + \frac{15}{16}y^2}\]
:::

**Question 3** : Les variables X et Y sont-elles indÃ©pendantes ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Condition d'indÃ©pendance.**
 Pour que les variables soient indÃ©pendantes, la densitÃ© conjointe doit Ãªtre le produit exact des densitÃ©s marginales : \(f(x,y) = f_X(x)f_Y(y)\).

**Ã‰tape 2 : Conclusion.**
 Le produit des marginales \(\left( \frac{15}{32x^2} + \frac{5}{32} \right) \times \left( \frac{3}{16} + \frac{15}{16}y^2 \right)\) donne des termes croisÃ©s (constante isolÃ©e, terme en \(1/x^2 \cdot y^2\)) qui ne se factorisent pas sous la forme additive initiale \(k(1/x^2 + y^2)\). **Non, les variables ne sont pas indÃ©pendantes.**
:::

**Question 4** : Calculer la covariance de X et Y.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : PropriÃ©tÃ©s de paritÃ©.**
 On sait que \(cov(X,Y) = \mathbb{E}(XY) - \mathbb{E}(X)\mathbb{E}(Y)\). La densitÃ© marginale \(f_Y(y)\) est une fonction paire dÃ©finie sur un intervalle symÃ©trique \([-1, 1]\). Donc \(\mathbb{E}(Y) = 0\).

**Ã‰tape 2 : Calcul de \(\mathbb{E}(XY)\) par symÃ©trie.**
 Calculons \(\mathbb{E}(XY) = \int_1^5 \int_{-1}^1 xy f(x,y)\,dy\,dx\). L'intÃ©grande \(y f(x,y)\) est impair par rapport Ã  y et l'intervalle est symÃ©trique \([-1, 1]\). L'intÃ©grale interne vaut donc strictement 0. Ainsi, \(\mathbb{E}(XY) = 0\).

**Ã‰tape 3 : RÃ©sultat.**
 \[\mathbf{cov(X,Y) = 0 - \mathbb{E}(X) \times 0 = 0}\]
:::
:::

:::exercise label="Probleme 4" title="ProblÃ¨me IV - Loi du Khi-deux"
Soient \(X, Y, Z \sim \mathcal{N}(0,1)\) indÃ©pendantes. Soit \(U = X^2 + Y^2 + Z^2\).

**Question 1** : Quelle est la loi de U ? EspÃ©rance et variance.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification de la loi usuelle.**
 C'est une dÃ©finition mathÃ©matique fondamentale : la somme des carrÃ©s de \(n\) variables de lois normales centrÃ©es rÃ©duites indÃ©pendantes suit une loi du Khi-deux Ã  \(n\) degrÃ©s de libertÃ©.

**Ã‰tape 2 : CaractÃ©ristiques de la loi.**
 Ici \(n=3\), donc U suit une **loi du \(\chi^2\) Ã  3 degrÃ©s de libertÃ©** (\(\chi^2_3\)). Pour une loi du \(\chi^2_n\), l'espÃ©rance vaut \(n\) et la variance vaut \(2n\). \[\mathbf{\mathbb{E}(U) = 3 \quad \text{et} \quad V(U) = 6}\]
:::

**Question 2** : Fonction de rÃ©partition et densitÃ© de U.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Expression du domaine (CoordonnÃ©es sphÃ©riques).**
 L'Ã©vÃ©nement \((U \le u)\) correspond au volume de la boule de rayon \(\sqrt{u}\) centrÃ©e Ã  l'origine en 3D. La densitÃ© jointe du triplet est le produit des densitÃ©s : \(f(x,y,z) = \frac{1}{(2\pi)^{3/2}} e^{-(x^2+y^2+z^2)/2}\). \[F_U(u) = \iiint_{x^2+y^2+z^2 \le u} \frac{1}{(2\pi)^{3/2}} e^{-(x^2+y^2+z^2)/2}\,dx\,dy\,dz\]

**Ã‰tape 2 : IntÃ©gration en sphÃ©riques.**
 En passant en coordonnÃ©es sphÃ©riques (Jacobien \(\rho^2 \sin(\varphi)\)) : \[F_U(u) = \int_0^{\sqrt{u}} \int_0^{2\pi} \int_0^\pi \frac{1}{(2\pi)^{3/2}} e^{-\rho^2/2} \rho^2 \sin(\varphi)\,d\varphi\,d\theta\,d\rho\] L'intÃ©gration angulaire donne \(\int_0^{2\pi} d\theta \int_0^\pi \sin(\varphi)\,d\varphi = 2\pi \times 2 = 4\pi\). \[\mathbf{F_U(u) = \sqrt{\frac{2}{\pi}} \int_0^{\sqrt{u}} \rho^2 e^{-\rho^2/2}\,d\rho}\]

**Ã‰tape 3 : DÃ©rivation pour obtenir la densitÃ©.**
 En dÃ©rivant selon \(u\) avec le thÃ©orÃ¨me fondamental de l'analyse et la rÃ¨gle de composition (la dÃ©rivÃ©e de la borne \(\sqrt{u}\) vaut \(\frac{1}{2\sqrt{u}}\)) : \[f_U(u) = F_U'(u) = \sqrt{\frac{2}{\pi}} (\sqrt{u})^2 e^{-(\sqrt{u})^2/2} \cdot \frac{1}{2\sqrt{u}}\] \[\mathbf{f_U(u) = \frac{1}{\sqrt{2\pi}} \sqrt{u} e^{-u/2} \quad \text{pour } u>0}\]
:::
:::

:::exercise label="Probleme 5" title="ProblÃ¨me V - Maximum de vraisemblance"
Soit la densitÃ© \(f(x) = \frac{1}{2\theta\sqrt{x}} e^{-\sqrt{x}/\theta}\) pour \(x>0\). Estimer \(\theta\) par le maximum de vraisemblance.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Fonction de vraisemblance et Log-vraisemblance.**
 On Ã©crit la fonction de vraisemblance comme le produit des densitÃ©s marginales, puis on passe au logarithme pour transformer le produit en somme. \[L(\theta) = \prod_{i=1}^n \frac{1}{2\theta\sqrt{x_i}} e^{-\sqrt{x_i}/\theta} = \frac{1}{(2\theta)^n \prod_{i=1}^n \sqrt{x_i}} \exp\left(-\frac{1}{\theta}\sum_{i=1}^n \sqrt{x_i}\right)\] La log-vraisemblance est : \[\ln L(\theta) = -n\ln(2) - n\ln(\theta) - \sum_{i=1}^n \ln(\sqrt{x_i}) - \frac{1}{\theta} \sum_{i=1}^n \sqrt{x_i}\]

**Ã‰tape 2 : DÃ©rivation et annulation.**
 On dÃ©rive par rapport Ã  \(\theta\) et on cherche la valeur qui annule cette dÃ©rivÃ©e. \[\frac{\partial \ln L}{\partial \theta} = -\frac{n}{\theta} + \frac{1}{\theta^2} \sum_{i=1}^n \sqrt{x_i} = 0\]

**Ã‰tape 3 : Calcul de l'estimateur.**
 \[\frac{n}{\theta} = \frac{1}{\theta^2} \sum_{i=1}^n \sqrt{x_i} \iff n\theta = \sum_{i=1}^n \sqrt{x_i}\] L'estimateur du maximum de vraisemblance est donc : \[\mathbf{\hat{\theta} = \frac{1}{n} \sum_{i=1}^n \sqrt{x_i}}\]
:::
:::

:::exercise label="Probleme 6" title="ProblÃ¨me VI - ProbabilitÃ©s appliquÃ©es"
**Question 1(a)** : Calculer la probabilitÃ© de l'Ã©vÃ©nement Â« Robert tombe sur la piste qu'il a choisie Â».

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition des Ã©vÃ¨nements.**
 Soient B, R, N les choix des pistes (Bleue, Rouge, Noire) formant un systÃ¨me complet, et T l'Ã©vÃ©nement "tomber".

**Ã‰tape 2 : Formule des probabilitÃ©s totales.**
 \[\mathbb{P}(T) = \mathbb{P}(T|B)\mathbb{P}(B) + \mathbb{P}(T|R)\mathbb{P}(R) + \mathbb{P}(T|N)\mathbb{P}(N)\] \[\mathbb{P}(T) = \left(\frac{1}{10} \times \frac{1}{4}\right) + \left(\frac{1}{6} \times \frac{1}{2}\right) + \left(\frac{2}{5} \times \frac{1}{4}\right)\] \[\mathbb{P}(T) = \frac{1}{40} + \frac{1}{12} + \frac{1}{10} = \frac{3 + 10 + 12}{120}\] \[\mathbf{\mathbb{P}(T) = \frac{5}{24}}\]
:::

**Question 1(b)** : Quelle est la probabilitÃ© que Robert ait choisi la piste noire sachant qu'il est tombÃ© ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Formule de Bayes.**
 C'est une probabilitÃ© conditionnelle inverse (thÃ©orÃ¨me de Bayes). \[\mathbb{P}(N|T) = \frac{\mathbb{P}(T|N)\mathbb{P}(N)}{\mathbb{P}(T)}\]

**Ã‰tape 2 : Application numÃ©rique.**
 \[\mathbb{P}(N|T) = \frac{\frac{2}{5} \times \frac{1}{4}}{\frac{5}{24}} = \frac{1/10}{5/24} = \frac{24}{50}\] \[\mathbf{\mathbb{P}(N|T) = 0.48}\]
:::

**Question 2(a)** : Loi de \(Z = X+Y\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Produit de convolution.**
 On calcule le produit de convolution entre \(X \sim \mathcal{E}(1/5)\) et \(Y \sim \mathcal{U}[10; 15]\). \[f_Z(z) = \int_{10}^{15} f_X(z-y)f_Y(y)\,dy\]

**Ã‰tape 2 : SÃ©paration des cas selon le domaine.**
 Trois cas se prÃ©sentent pour le support de la densitÃ© rÃ©sultante :

- Si \(z  15\) : on intÃ¨gre de 10 Ã  15.

\[f_Z(z) = \frac{1}{25} e^{-z/5} \int_{10}^{15} e^{y/5}\,dy = \mathbf{\frac{1}{5} e^{-z/5} \left( e^3 - e^2 \right)}\]
:::

**Question 2(b)** : ProbabilitÃ© qu'il ne soit pas en retard.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Formulation de l'Ã©vÃ¨nement.**
 Il a 15 minutes devant lui pour le trajet complet. L'Ã©vÃ©nement de non-retard s'Ã©crit \(Z \le 15\).

**Ã‰tape 2 : Calcul de l'intÃ©grale correspondante.**
 \[\mathbb{P}(Z \le 15) = \int_{10}^{15} \frac{1}{5} \left( 1 - e^{-(z-10)/5} \right) dz = \left[ \frac{z}{5} + e^{-(z-10)/5} \right]_{10}^{15}\] \[\mathbb{P}(Z \le 15) = \left( 3 + e^{-1} \right) - (2 + 1)\] \[\mathbf{\mathbb{P}(Z \le 15) = e^{-1} \approx 0.368}\]
:::

**Question 2(c)** : ProbabilitÃ© que StÃ©phanie arrive avant Robert.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Domaine total et domaine favorable.**
 Les variables sont uniformes : \(T_1 \sim \mathcal{U}[55; 85]\) (Robert) et \(T_2 \sim \mathcal{U}[65; 75]\) (StÃ©phanie). On cherche \(\mathbb{P}(T_2 < T_1)\). L'aire totale du domaine (rectangle des temps possibles) est \(30 \times 10 = 300\). Le sous-domaine favorable correspond Ã  \(t_2 < t_1\). Ce domaine gÃ©omÃ©trique se dÃ©coupe en deux : - Un triangle pour \(t_1 \in [65; 75]\), dont l'aire est \(\frac{10 \times 10}{2} = 50\). - Un rectangle plein pour \(t_1 \in [75; 85]\), d'aire \(10 \times 10 = 100\). L'aire favorable totale est \(150\).

**Ã‰tape 2 : ProbabilitÃ© gÃ©omÃ©trique uniforme.**
 \[\mathbb{P}(T_2 < T_1) = \frac{150}{300}\] \[\mathbf{\mathbb{P}(T_2 < T_1) = \frac{1}{2}}\]
:::

**Question 3(a)** : Loi exacte de \(S_n\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification du schÃ©ma de Bernoulli.**
 On rÃ©pÃ¨te \(n\) expÃ©riences identiques et indÃ©pendantes de maniÃ¨re dichotomique (succÃ¨s = obtenir des skis Castafiore, probabilitÃ© \(p\)).

**Ã‰tape 2 : Conclusion sur la loi.**
 \(S_n\) suit donc exactement une **loi binomiale** de paramÃ¨tres \(n\) et \(p\) : \(\mathbf{\mathcal{B}(n, p)}\).
:::

**Question 3(b)** : Valeur de \(n\) pour dÃ©terminer \(p\) Ã  \(10^{-2}\) prÃ¨s avec risque \(0.05\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Marge d'erreur de l'intervalle de confiance.**
 La demi-largeur de l'intervalle de confiance asymptotique Ã  95% (risque 5%) est \(1.96 \sqrt{\frac{p(1-p)}{n}}\). On veut contraindre cette erreur Ã  \(0.01\).

**Ã‰tape 2 : Majoration de la variance.**
 Sans information sur la vraie proportion \(p\), on se place dans le cas mathÃ©matiquement le plus dÃ©favorable maximisant la variance, soit \(p=0.5\). \[1.96 \sqrt{\frac{0.5 \times 0.5}{n}} \le 0.01 \iff \frac{1.96 \times 0.5}{\sqrt{n}} \le 0.01\]

**Ã‰tape 3 : RÃ©solution.**
 \[\sqrt{n} \ge \frac{1.96 \times 0.5}{0.01} = 98\] Soit \(n \ge 98^2 = 9604\). Il faut enquÃªter **au moins 9604 skieurs**.
:::

**Question 3(c)** : Intervalle de confiance avec 1200 skieurs et 250 skis Castafiore.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Estimation ponctuelle.**
 La proportion empirique est : \(\hat{p} = \frac{250}{1200} = \frac{5}{24} \approx 0.2083\).

**Ã‰tape 2 : Marge d'erreur empirique.**
 On applique la formule de la borne de l'intervalle de confiance : \[E = 1.96 \sqrt{\frac{\hat{p}(1-\hat{p})}{n}} = 1.96 \sqrt{\frac{(5/24) \times (19/24)}{1200}} \approx 1.96 \times 0.0117 \approx 0.023\]

**Ã‰tape 3 : Intervalle de confiance.**
 L'intervalle de confiance au risque 5% est centrÃ© sur la proportion observÃ©e : \[IC_{95\%} \approx [0.208 - 0.023, 0.208 + 0.023]\] \[\mathbf{IC_{95\%} = [0.185 ; 0.231]}\]
:::

\vfill

Ã‰quipe PÃ©dagogique Esisar Page 1/1
:::
