---
title: "Partiel corrige 2 - MT331-Probabilites"
subject: "MT331-Probabilites"
type: "exam"
target: "MT331-Probabilites-exam-partiel-2.html"
eyebrow: "Partiel 2"
heading: "Corrige de partiel"
summary: "Lois normales, densites, variables continues, lois marginales et transformations."
---
:::exercise label="Exercice 1" title="Exercice 1"
Soit \(X \sim \mathcal{N}(75, 4^2)\). On pose \(Z = \frac{X-75}{4}\) la variable centrÃ©e rÃ©duite associÃ©e, avec \(Z \sim \mathcal{N}(0,1)\). On note \(\Phi\) la fonction de rÃ©partition de la loi normale centrÃ©e rÃ©duite.

**Question 1** : Calculer \(\mathbb{P}(X>80)\) et \(\mathbb{P}(65 80) = \mathbb{P}\left(Z > \frac{80-75}{4}\right) = \mathbb{P}(Z > 1.25)\] \[\mathbb{P}(X > 80) = 1 - \Phi(1.25) \approx 1 - 0.8944\] \[\mathbf{\mathbb{P}(X > 80) = 0.1056}\]

**Ã‰tape 2 : Calcul pour l'intervalle.**
 De mÃªme pour la seconde probabilitÃ© : \[\mathbb{P}(65  500) \le 10^{-3}\)) ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Formulation de l'inÃ©quation.**
 On cherche le plus grand entier \(n\) tel que \(\mathbb{P}(S > 500) \le 10^{-3}\). On utilise Ã  nouveau le centrage et la rÃ©duction, appliquÃ©s cette fois Ã  \(S\). \[\mathbb{P}\left(\frac{S - 75n}{4\sqrt{n}} > \frac{500 - 75n}{4\sqrt{n}}\right) \le 0.001\] \[1 - \Phi\left(\frac{500 - 75n}{4\sqrt{n}}\right) \le 0.001 \implies \Phi\left(\frac{500 - 75n}{4\sqrt{n}}\right) \ge 0.999\]

**Ã‰tape 2 : Utilisation des quantiles.**
 D'aprÃ¨s la table de la loi normale, \(\Phi(3.09) \approx 0.999\). Il faut donc : \[\frac{500 - 75n}{4\sqrt{n}} \ge 3.09\]

**Ã‰tape 3 : RÃ©solution et conclusion.**
 Testons les valeurs entiÃ¨res de \(n\) :

- Si \(n=6\), l'espÃ©rance est \(\mu = 450\) et l'Ã©cart-type est \(\sigma = 4\sqrt{6} \approx 9.798\). On a \(z = \frac{50}{9.798} \approx 5.10 \ge 3.09\). Le risque est largement infÃ©rieur Ã  \(10^{-3}\).
- Si \(n=7\), l'espÃ©rance est \(\mu = 525\). L'espÃ©rance dÃ©passe la charge limite, le risque de surcharge sera mathÃ©matiquement supÃ©rieur Ã  \(50\%\).

Le nombre maximum de personnes autorisÃ©es est donc : \[\mathbf{n_{max} = 6 \text{ personnes}}\]
:::
:::

:::exercise label="Exercice 2" title="Exercice 2"
Soit \(f(x,y) = 4y(1-x)\mathbb{I}_{[0;1]}(x)\mathbb{I}_{[0;1]}(y)\).

**Question 1** : Montrer que \(f\) est une densitÃ© de probabilitÃ©.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : VÃ©rification de la positivitÃ©.**
 Il faut vÃ©rifier deux conditions : \(f\) doit Ãªtre positive ou nulle sur \(\mathbb{R}^2\), et l'intÃ©grale double de \(f\) sur \(\mathbb{R}^2\) doit Ãªtre Ã©gale Ã  1. Pour tout \((x,y) \in [0,1]^2\), \(y \ge 0\) et \(1-x \ge 0\), donc \(f(x,y) \ge 0\). Ailleurs, \(f(x,y) = 0\).

**Ã‰tape 2 : Calcul de l'intÃ©grale double.**
 Calculons l'intÃ©grale sur \(\mathbb{R}^2\) : \[\iint_{\mathbb{R}^2} f(x,y) \,dx\,dy = \int_0^1 \int_0^1 4y(1-x) \,dx\,dy\] Comme les variables sont sÃ©parables sur un domaine rectangulaire, on scinde l'intÃ©grale : \[\iint_{\mathbb{R}^2} f(x,y) \,dx\,dy = 4 \left( \int_0^1 (1-x) \,dx \right) \left( \int_0^1 y \,dy \right)\] \[\iint_{\mathbb{R}^2} f(x,y) \,dx\,dy = 4 \left[ x - \frac{x^2}{2} \right]_0^1 \left[ \frac{y^2}{2} \right]_0^1 = 4 \times \frac{1}{2} \times \frac{1}{2}\] \[\mathbf{\iint_{\mathbb{R}^2} f(x,y) \,dx\,dy = 1}\] La fonction \(f\) vÃ©rifie les deux propriÃ©tÃ©s, c'est bien une densitÃ© de probabilitÃ©.
:::

**Question 2** : Calculer \(\mathbb{P}(X < Y)\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition du domaine d'intÃ©gration.**
 Il s'agit d'intÃ©grer la densitÃ© sur le domaine dÃ©fini par \(0 \le x < y \le 1\). \[\mathbb{P}(X < Y) = \int_0^1 \left( \int_0^y 4y(1-x) \,dx \right) dy\]

**Ã‰tape 2 : Calcul de l'intÃ©grale interne (par rapport Ã  x).**
 \[\int_0^y 4y(1-x) \,dx = 4y \left[ x - \frac{x^2}{2} \right]_0^y = 4y \left( y - \frac{y^2}{2} \right) = 4y^2 - 2y^3\]

**Ã‰tape 3 : Calcul de l'intÃ©grale externe (par rapport Ã  y).**
 \[\mathbb{P}(X < Y) = \int_0^1 (4y^2 - 2y^3) \,dy = \left[ \frac{4y^3}{3} - \frac{2y^4}{4} \right]_0^1\] \[\mathbb{P}(X < Y) = \frac{4}{3} - \frac{1}{2} = \frac{8}{6} - \frac{3}{6}\] \[\mathbf{\mathbb{P}(X < Y) = \frac{5}{6}}\]
:::

**Question 3** : DÃ©terminer les lois de X et de Y.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DensitÃ© marginale de X.**
 Pour obtenir la densitÃ© marginale de X, on intÃ¨gre la densitÃ© conjointe par rapport Ã  Y sur son domaine de dÃ©finition \(\mathbb{R}\). Pour \(x \in [0,1]\) : \[f_X(x) = \int_0^1 4y(1-x) \,dy = 4(1-x) \left[ \frac{y^2}{2} \right]_0^1 = 2(1-x)\] Donc pour tout \(x \in \mathbb{R}\) : \[\mathbf{f_X(x) = 2(1-x) \mathbb{I}_{[0;1]}(x)}\]

**Ã‰tape 2 : DensitÃ© marginale de Y.**
 De mÃªme, pour obtenir la densitÃ© marginale de Y, on intÃ¨gre par rapport Ã  X. Pour \(y \in [0,1]\) : \[f_Y(y) = \int_0^1 4y(1-x) \,dx = 4y \left[ x - \frac{x^2}{2} \right]_0^1 = 2y\] Donc pour tout \(y \in \mathbb{R}\) : \[\mathbf{f_Y(y) = 2y \mathbb{I}_{[0;1]}(y)}\]
:::

**Question 4** : Les variables alÃ©atoires X et Y sont-elles indÃ©pendantes ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Condition d'indÃ©pendance.**
 Deux variables Ã  densitÃ© sont indÃ©pendantes si et seulement si leur densitÃ© conjointe est le produit exact de leurs densitÃ©s marginales.

**Ã‰tape 2 : VÃ©rification.**
 On calcule le produit des densitÃ©s marginales trouvÃ©es prÃ©cÃ©demment : \[f_X(x) \times f_Y(y) = 2(1-x)\mathbb{I}_{[0;1]}(x) \times 2y\mathbb{I}_{[0;1]}(y) = 4y(1-x)\mathbb{I}_{[0;1]}(x)\mathbb{I}_{[0;1]}(y)\] On remarque que ce produit correspond Ã  la densitÃ© conjointe initiale : \[f_X(x) \times f_Y(y) = f(x,y)\] Conclusion : **Oui, les variables \(X\) et \(Y\) sont indÃ©pendantes.**
:::
:::

:::exercise label="Exercice 3" title="Exercice 3"
Pour la piÃ¨ce A, on dÃ©finit le "succÃ¨s" comme l'obtention de "face", de probabilitÃ© \(1-a\). Pour la piÃ¨ce B, le succÃ¨s est "face" avec probabilitÃ© \(1-b\). Les variables \(X\) et \(Y\) reprÃ©sentent le nombre d'essais nÃ©cessaires pour obtenir le premier succÃ¨s pour chaque piÃ¨ce.

**Question 1** : Quelles sont les lois de probabilitÃ©s de X et de Y ? Donner \(\mathbb{E}(X)\) et \(\mathbb{E}(Y)\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification des lois.**
 \(X\) et \(Y\) reprÃ©sentent le nombre d'essais nÃ©cessaires pour obtenir le premier succÃ¨s lors d'une succession d'Ã©preuves de Bernoulli indÃ©pendantes. Elles suivent donc des lois gÃ©omÃ©triques de paramÃ¨tre Ã©gal Ã  la probabilitÃ© de succÃ¨s. \[\mathbf{X \sim \mathcal{G}(1-a)} \quad \text{et} \quad \mathbf{Y \sim \mathcal{G}(1-b)}\]

**Ã‰tape 2 : Expression des probabilitÃ©s ponctuelles.**
 Pour tout \(k \in \mathbb{N}^*\) : \[\mathbb{P}(X=k) = a^{k-1}(1-a) \quad \text{et} \quad \mathbb{P}(Y=k) = b^{k-1}(1-b)\]

**Ã‰tape 3 : Calcul des espÃ©rances.**
 L'espÃ©rance d'une loi gÃ©omÃ©trique de paramÃ¨tre \(p\) est dÃ©finie par \(1/p\). \[\mathbf{\mathbb{E}(X) = \frac{1}{1-a}} \quad \text{et} \quad \mathbf{\mathbb{E}(Y) = \frac{1}{1-b}}\]
:::

**Question 2** : Calculer la probabilitÃ© de l'Ã©vÃ¨nement \((X=Y)\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Sommation sur l'univers des possibles.**
 Les lancers des deux piÃ¨ces Ã©tant indÃ©pendants, les variables \(X\) et \(Y\) le sont aussi. On somme sur tous les cas possibles \(k \in \mathbb{N}^*\). \[\mathbb{P}(X=Y) = \sum_{k=1}^{+\infty} \mathbb{P}(X=k \cap Y=k) = \sum_{k=1}^{+\infty} \mathbb{P}(X=k)\mathbb{P}(Y=k)\]

**Ã‰tape 2 : Application des lois et factorisation.**
 \[\mathbb{P}(X=Y) = \sum_{k=1}^{+\infty} a^{k-1}(1-a) b^{k-1}(1-b) = (1-a)(1-b) \sum_{k=1}^{+\infty} (ab)^{k-1}\]

**Ã‰tape 3 : Calcul de la sÃ©rie gÃ©omÃ©trique.**
Par changement d'indice \(j = k-1\) :

\[
\mathbb{P}(X=Y) = (1-a)(1-b) \sum_{j=0}^{+\infty} (ab)^j
\]

Comme \(|ab|<1\), on obtient :

\[
\mathbf{\mathbb{P}(X=Y)=\frac{(1-a)(1-b)}{1-ab}}
\]
:::

**Question 3** : Calculer \(\mathbb{P}(X>k)\). En deduire \(\mathbb{P}(X>Y)\) et \(\mathbb{P}(X \ge Y)\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Calcul de \(\mathbb{P}(X>k)\).**
 Dire que l'on a besoin de plus de \(k\) lancers pour obtenir le premier "face" revient Ã  dire que les \(k\) premiers lancers ont tous donnÃ© "pile" (probabilitÃ© \(a\)). Par indÃ©pendance des lancers : \[\mathbf{\mathbb{P}(X>k) = a^k}\]

**Ã‰tape 2 : Calcul de \(\mathbb{P}(X>Y)\).**
 On utilise la formule des probabilitÃ©s totales en fixant la valeur de \(Y\) et en utilisant l'indÃ©pendance : \[\mathbb{P}(X>Y) = \sum_{k=1}^{+\infty} \mathbb{P}(Y=k) \mathbb{P}(X>k) = \sum_{k=1}^{+\infty} b^{k-1}(1-b) a^k\] \[\mathbb{P}(X>Y) = a(1-b) \sum_{k=1}^{+\infty} (ab)^{k-1} = \mathbf{\frac{a(1-b)}{1-ab}}\]

**Ã‰tape 3 : Calcul de \(\mathbb{P}(X \ge Y)\).**
 On utilise la partition \(\mathbb{P}(X \ge Y) = \mathbb{P}(X>Y) + \mathbb{P}(X=Y)\) : \[\mathbb{P}(X \ge Y) = \frac{a(1-b)}{1-ab} + \frac{(1-a)(1-b)}{1-ab} = \frac{(1-b)(a + 1 - a)}{1-ab}\] \[\mathbf{\mathbb{P}(X \ge Y) = \frac{1-b}{1-ab}}\]
:::

**Question 4** : Soit \(M = \min(X,Y)\). Calculer la probabilitÃ© \(\mathbb{P}(M \ge k)\). En dÃ©duire la loi de M.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Calcul de la fonction de survie \(\mathbb{P}(M \ge k)\).**
 Le minimum de deux variables est supÃ©rieur ou Ã©gal Ã  \(k\) si et seulement si les deux variables sont simultanÃ©ment supÃ©rieures ou Ã©gales Ã  \(k\). Pour \(k \in \mathbb{N}^*\), \(\mathbb{P}(M \ge k) = \mathbb{P}(X \ge k \cap Y \ge k) = \mathbb{P}(X \ge k)\mathbb{P}(Y \ge k)\) par indÃ©pendance. Or \(\mathbb{P}(X \ge k) = \mathbb{P}(X > k-1) = a^{k-1}\). \[\mathbf{\mathbb{P}(M \ge k) = a^{k-1}b^{k-1} = (ab)^{k-1}}\]

**Ã‰tape 2 : DÃ©duction de la loi ponctuelle.**
 On en dÃ©duit la loi ponctuelle de \(M\) par diffÃ©rence : \[\mathbb{P}(M=k) = \mathbb{P}(M \ge k) - \mathbb{P}(M \ge k+1) = (ab)^{k-1} - (ab)^k\] \[\mathbf{\mathbb{P}(M=k) = (ab)^{k-1}(1-ab)}\]

**Ã‰tape 3 : Identification de la loi.**
 On reconnaÃ®t l'expression exacte de la probabilitÃ© d'une loi gÃ©omÃ©trique oÃ¹ la probabilitÃ© de "succÃ¨s" est \((1-ab)\). \[\mathbf{M \sim \mathcal{G}(1-ab)}\]
:::
:::

:::exercise label="Exercice 4" title="Exercice 4"
**Question 1(a)** : Calculer la probabilitÃ© de l'Ã©vÃ¨nement "Robert tombe sur la piste qu'il a choisie".

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition des Ã©vÃ¨nements et extraction des donnÃ©es.**
 On note \(B, R, N\) les Ã©vÃ¨nements de choix de la piste (Bleue, Rouge, Noire) et \(T\) l'Ã©vÃ¨nement "tomber". DonnÃ©es : \(\mathbb{P}(B)=1/4\), \(\mathbb{P}(R)=1/2\), \(\mathbb{P}(N)=1/4\). Probabilites conditionnelles : \(\mathbb{P}(T|B)=1/10\), \(\mathbb{P}(T|R)=1/6\), \(\mathbb{P}(T|N)=2/5\).

**Ã‰tape 2 : Formule des probabilitÃ©s totales.**
 Les choix de piste forment un systÃ¨me complet d'Ã©vÃ¨nements. \[\mathbb{P}(T) = \mathbb{P}(T|B)\mathbb{P}(B) + \mathbb{P}(T|R)\mathbb{P}(R) + \mathbb{P}(T|N)\mathbb{P}(N)\] \[\mathbb{P}(T) = \left(\frac{1}{10} \times \frac{1}{4}\right) + \left(\frac{1}{6} \times \frac{1}{2}\right) + \left(\frac{2}{5} \times \frac{1}{4}\right)\] \[\mathbb{P}(T) = \frac{1}{40} + \frac{1}{12} + \frac{1}{10} = \frac{3 + 10 + 12}{120}\] \[\mathbf{\mathbb{P}(T) = \frac{25}{120} = \frac{5}{24}}\]
:::

**Question 1(b)** : Sachant cela, quelle est la probabilitÃ© que Robert ait choisi la piste noire ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Application de la formule de Bayes.**
 Il s'agit d'une inversion de probabilitÃ© : on cherche \(\mathbb{P}(N|T)\). \[\mathbb{P}(N|T) = \frac{\mathbb{P}(T|N)\mathbb{P}(N)}{\mathbb{P}(T)}\]

**Ã‰tape 2 : Application numÃ©rique.**
 \[\mathbb{P}(N|T) = \frac{\frac{2}{5} \times \frac{1}{4}}{\frac{5}{24}} = \frac{\frac{1}{10}}{\frac{5}{24}} = \frac{1}{10} \times \frac{24}{5}\] \[\mathbf{\mathbb{P}(N|T) = \frac{24}{50} = \frac{12}{25} = 0.48}\]
:::

**Question 2(a)** : Soit \(Z=X+Y\), dÃ©terminer la loi de Z. (Avec \(X \sim \mathcal{E}(1/5)\) et \(Y \sim \mathcal{U}[10; 15]\) indÃ©pendantes).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition du produit de convolution.**
 La loi de la somme de deux variables alÃ©atoires indÃ©pendantes continues s'obtient par la convolution de leurs densitÃ©s : \[f_Z(z) = \int_{-\infty}^{+\infty} f_X(z-y)f_Y(y) \,dy\] Avec \(f_X(x) = \frac{1}{5}e^{-x/5}\mathbb{I}_{\{x \ge 0\}}\) et \(f_Y(y) = \frac{1}{5}\mathbb{I}_{\{10 \le y \le 15\}}\).

**Ã‰tape 2 : Bornes de l'intÃ©grale.**
 \[f_Z(z) = \int_{10}^{15} \frac{1}{5}e^{-\frac{1}{5}(z-y)} \mathbb{I}_{\{z-y \ge 0\}} \times \frac{1}{5} \,dy = \frac{1}{25}e^{-\frac{z}{5}} \int_{10}^{15} e^{\frac{y}{5}} \mathbb{I}_{\{y \le z\}} \,dy\]

**Ã‰tape 3 : IntÃ©gration selon les valeurs de \(z\).**

- **Si \(\mathbf{z  15}\)** : on intÃ¨gre \(y\) de 10 Ã  15.

\[f_Z(z) = \frac{1}{25}e^{-\frac{z}{5}} \left[ 5e^{\frac{y}{5}} \right]_{10}^{15} = \mathbf{\frac{1}{5} \left( e^3 - e^2 \right) e^{-\frac{z}{5}}}\]
:::

**Question 2(b)** : DÃ©terminer la probabilitÃ© que Robert ne soit pas en retard.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Mise en place de l'intÃ©grale.**
 Entre 10h45 et 11h, Robert dispose de 15 minutes. Il ne sera pas en retard si \(Z \le 15\). On intÃ¨gre la densitÃ© \(f_Z\) sur l'intervalle utile \([10; 15]\). \[\mathbb{P}(Z \le 15) = \int_{10}^{15} f_Z(z) \,dz = \int_{10}^{15} \frac{1}{5} \left( 1 - e^{-\frac{z-10}{5}} \right) dz\]

**Ã‰tape 2 : Calcul de la primitive et Ã©valuation.**
 \[\mathbb{P}(Z \le 15) = \left[ \frac{z}{5} + e^{-\frac{z-10}{5}} \right]_{10}^{15} = \left(\frac{15}{5} + e^{-\frac{5}{5}}\right) - \left(\frac{10}{5} + e^0\right)\] \[\mathbb{P}(Z \le 15) = (3 + e^{-1}) - (2 + 1) = 3 + e^{-1} - 3\] \[\mathbf{\mathbb{P}(Z \le 15) = e^{-1} \approx 0.368}\]
:::

**Question 2(c)** : ProbabilitÃ© que StÃ©phanie arrive avant Robert (\(\mathbb{P}(T_2 < T_1)\)).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition du domaine total.**
 On cherche \(\mathbb{P}(T_2 < T_1)\). L'aire totale de la zone des temps possibles est l'aire du rectangle \([55;85] \times [65;75]\), soit \(\text{Aire}_{totale} = 30 \times 10 = 300\).

**Ã‰tape 2 : Calcul gÃ©omÃ©trique de la zone favorable.**
 On calcule gÃ©omÃ©triquement l'aire du sous-domaine oÃ¹ \(t_2 < t_1\). Ce domaine dans le rectangle est composÃ© :

- D'un triangle pour \(t_1 \in [65;75]\) : aire = \(\frac{10 \times 10}{2} = 50\).
- D'un rectangle complet pour \(t_1 \in [75;85]\) : aire = \(10 \times 10 = 100\).

L'aire favorable est donc de \(150\).

**Ã‰tape 3 : Calcul de la probabilitÃ© uniforme.**
 La probabilitÃ© est le rapport des aires (probabilitÃ© uniforme sur ce domaine) : \[\mathbb{P}(T_2 < T_1) = \frac{\text{Aire}_{favorable}}{\text{Aire}_{totale}} = \frac{150}{300}\] \[\mathbf{\mathbb{P}(T_2 < T_1) = \frac{1}{2}}\]
:::

**Question 3(a)** : Quelle est la loi exacte de \(S_n\) ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification du schÃ©ma de Bernoulli.**
 On compte le nombre de succÃ¨s (skis Castafiore de probabilitÃ© \(p\)) parmi \(n\) skieurs interrogÃ©s de maniÃ¨re indÃ©pendante.

**Ã‰tape 2 : Loi de probabilitÃ©.**
 Il s'agit donc d'un schÃ©ma binomial classique. \[\mathbf{S_n \sim \mathcal{B}(n, p)}\]
:::

**Question 3(b)** : DÃ©terminer \(n\) pour une prÃ©cision Ã  \(10^{-2}\) prÃ¨s au risque \(0.05\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Formule de la marge d'erreur.**
 La demi-amplitude de l'intervalle de confiance asymptotique au risque \(5\%\) est donnÃ©e par \(1.96 \sqrt{\frac{p(1-p)}{n}}\). On veut que cette erreur soit infÃ©rieure ou Ã©gale Ã  \(0.01\). \[1.96 \sqrt{\frac{p(1-p)}{n}} \le 0.01\]

**Ã‰tape 2 : Majoration de la variance.**
 Pour garantir cette marge d'erreur sans connaÃ®tre la vraie proportion \(p\), on se place dans le cas le plus dÃ©favorable oÃ¹ la variance est maximale, c'est-Ã -dire \(p=0.5\). \[1.96 \sqrt{\frac{0.5 \times 0.5}{n}} \le 0.01 \iff \frac{1.96}{2\sqrt{n}} \le 0.01\]

**Ã‰tape 3 : RÃ©solution.**
 \[\sqrt{n} \ge \frac{0.98}{0.01} = 98\] En Ã©levant au carrÃ© : \[n \ge 98^2 = 9604\] Il faut donc au minimum \(\mathbf{9604 \text{ skieurs}}\).
:::

**Question 3(c)** : Intervalle de confiance de \(p\) au risque \(5\%\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Estimation ponctuelle.**
 La proportion estimÃ©e \(\hat{p}\) sur l'Ã©chantillon est le rapport du nombre de succÃ¨s sur la taille de l'Ã©chantillon : \[\hat{p} = \frac{2500}{8500} = \frac{25}{85} = \frac{5}{17} \approx 0.2941\]

**Ã‰tape 2 : Calcul de la marge d'erreur empirique.**
 On applique la formule de l'intervalle de confiance avec la variance empirique : \[E = 1.96 \sqrt{\frac{\hat{p}(1-\hat{p})}{n}} = 1.96 \sqrt{\frac{\frac{5}{17} \times \frac{12}{17}}{8500}} \approx 1.96 \times 0.00494 \approx 0.0097\]

**Ã‰tape 3 : Construction de l'intervalle.**
 L'intervalle de confiance est centrÃ© sur \(\hat{p}\) avec un rayon \(E\) : \[IC_{95\%} = [\hat{p} - E ; \hat{p} + E] = [0.2941 - 0.0097 ; 0.2941 + 0.0097]\] \[\mathbf{IC_{95\%} = [0.284 ; 0.304]}\]
:::

\vfill

Ã‰quipe PÃ©dagogique Esisar Page 1/1
:::
