---
title: "Controle corrige - Variables aleatoires"
subject: "MT331-Probabilites"
type: "exam"
target: "MT331-Probabilites-exam-controle-va.html"
eyebrow: "MA337 - Controle"
heading: "Variables aleatoires"
summary: "Esperance, variance, covariance, lois de reference et independance."
---
:::exercise label="Probleme 1" title="ProblÃ¨me I - Cours"
Soit \((\Omega,\mathcal{P}(\Omega),\mathbb{P})\) un espace probabilisÃ©, \(X\) et \(Y\) deux variables alÃ©atoires discrÃ¨tes sur \(\Omega\).

**Question 1 : ComplÃ©ter ces propriÃ©tÃ©s de l'espÃ©rance**

1. LinÃ©aritÃ© : \(\mathbb{E}(X+Y) = \mathbf{\mathbb{E}(X) + \mathbb{E}(Y)}\)

et pour tout rÃ©el \(a\), \(\mathbb{E}(aX) = \mathbf{a\mathbb{E}(X)}\)

- Produit : Si **\(X\) et \(Y\) sont indÃ©pendantes** alors \(\mathbb{E}(XY) = \mathbf{\mathbb{E}(X)\mathbb{E}(Y)}\)

**Question 2 : Variance et Ã©cart-type**

1. Rappeler la dÃ©finition de la variance et de l'Ã©cart-type :

\(\mathbb{V}(X) = \mathbf{\mathbb{E}\left((X - \mathbb{E}(X))^2\right)}\)
 \(\sigma(X) = \mathbf{\sqrt{\mathbb{V}(X)}}\)

- Rappeler la formule donnant \(\mathbb{V}(X)\) en fonction de \(\mathbb{E}(X^2)\) et de \(\mathbb{E}(X)^2\) (ThÃ©orÃ¨me de Koenig-Huygens) :

\(\mathbb{V}(X) = \mathbf{\mathbb{E}(X^2) - (\mathbb{E}(X))^2}\)

- DÃ©montrer la formule prÃ©cÃ©dente.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©veloppement de l'expression.**
 On utilise le dÃ©veloppement du carrÃ© \((a-b)^2 = a^2 - 2ab + b^2\) Ã  l'intÃ©rieur de l'espÃ©rance. \[\begin{aligned}\mathbb{V}(X) &= \mathbb{E}\left(X^2 - 2X\mathbb{E}(X) + (\mathbb{E}(X))^2\right)\end{aligned}\]

**Ã‰tape 2 : Utilisation de la linÃ©aritÃ©.**
 On applique la linÃ©aritÃ© de l'espÃ©rance, sachant que \(\mathbb{E}(X)\) est une constante. \[\begin{aligned}\mathbb{V}(X) &= \mathbb{E}(X^2) - 2\mathbb{E}(X)\mathbb{E}(X) + (\mathbb{E}(X))^2 \\ &= \mathbb{E}(X^2) - 2(\mathbb{E}(X))^2 + (\mathbb{E}(X))^2\end{aligned}\]

**Ã‰tape 3 : Conclusion.**
 En simplifiant les termes, on retrouve la formule de Koenig-Huygens : \[\mathbf{\mathbb{V}(X) = \mathbb{E}(X^2) - (\mathbb{E}(X))^2}\]
:::

1. Rappeler la dÃ©finition de \(cov(X,Y)\) :

\(cov(X,Y) = \mathbf{\mathbb{E}(XY) - \mathbb{E}(X)\mathbb{E}(Y)}\)

- ComplÃ©ter ces formules du cours :

\(\mathbb{V}(X+Y) = \mathbf{\mathbb{V}(X) + \mathbb{V}(Y) + 2cov(X,Y)}\)
 pour tout rÃ©el \(a\), \(\mathbb{V}(aX) = \mathbf{a^2\mathbb{V}(X)}\)
 et \(\sigma(aX) = \mathbf{|a|\sigma(X)}\)

- DÃ©montrer la premiÃ¨re formule de l'item prÃ©cÃ©dent.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Utilisation du thÃ©orÃ¨me de Koenig-Huygens.**
 On applique la formule dÃ©montrÃ©e prÃ©cÃ©demment Ã  la somme \((X+Y)\). \[\begin{aligned}\mathbb{V}(X+Y) &= \mathbb{E}\left((X+Y)^2\right) - (\mathbb{E}(X+Y))^2\end{aligned}\]

**Ã‰tape 2 : DÃ©veloppement et linÃ©aritÃ©.**
 On dÃ©veloppe les carrÃ©s et on sÃ©pare les termes grÃ¢ce Ã  la linÃ©aritÃ© de l'espÃ©rance. \[\begin{aligned}\mathbb{V}(X+Y) &= \mathbb{E}(X^2 + 2XY + Y^2) - (\mathbb{E}(X) + \mathbb{E}(Y))^2 \\ &= \mathbb{E}(X^2) + 2\mathbb{E}(XY) + \mathbb{E}(Y^2) - \left((\mathbb{E}(X))^2 + 2\mathbb{E}(X)\mathbb{E}(Y) + (\mathbb{E}(Y))^2\right)\end{aligned}\]

**Ã‰tape 3 : Regroupement et conclusion.**
 On regroupe les termes correspondant aux variances de \(X\) et \(Y\), ainsi que ceux formant la covariance : \[\begin{aligned}\mathbb{V}(X+Y) &= \left(\mathbb{E}(X^2) - (\mathbb{E}(X))^2\right) + \left(\mathbb{E}(Y^2) - (\mathbb{E}(Y))^2\right) + 2\left(\mathbb{E}(XY) - \mathbb{E}(X)\mathbb{E}(Y)\right)\end{aligned}\] \[\mathbf{\mathbb{V}(X+Y) = \mathbb{V}(X) + \mathbb{V}(Y) + 2cov(X,Y)}\]
:::

**Question 3 : Lois de rÃ©fÃ©rence**

1. Si \(X\) suit la loi de Bernoulli de paramÃ¨tre \(p\), alors \(\mathbb{E}(X) = \mathbf{p}\) et \(\mathbb{V}(X) = \mathbf{p(1-p)}\).
2. Si \(X\) suit la loi binomiale de paramÃ¨tres \(n\) et \(p\), alors \(\mathbb{E}(X) = \mathbf{np}\) et \(\mathbb{V}(X) = \mathbf{np(1-p)}\).
3. Si \(X\) suit la loi gÃ©omÃ©trique de paramÃ¨tre \(p\), alors pour \(k \in \mathbb{N}^*\),  \(\mathbb{P}(X=k) = \mathbf{(1-p)^{k-1}p}\) et \(\mathbb{E}(X) = \mathbf{\frac{1}{p}}\).
:::

:::exercise label="Probleme 2" title="ProblÃ¨me II - Tirages et IndÃ©pendance"
Une urne contient \(n\) boules numÃ©rotÃ©es de \(1\) Ã  \(n\). On en tire une au hasard, et on considÃ¨re les Ã©vÃ©nements :

- \(A\) : "la boule tirÃ©e porte un numÃ©ro pair"
- \(B\) : "la boule tirÃ©e porte un numÃ©ro multiple de 3"

**Question 1** : On suppose que \(n=6\). Montrer que les Ã©vÃ©nements \(A\) et \(B\) sont indÃ©pendants.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition de l'indÃ©pendance.**
 Pour prouver l'indÃ©pendance de deux Ã©vÃ©nements \(A\) et \(B\), il faut vÃ©rifier l'Ã©galitÃ© fondamentale : \(\mathbb{P}(A \cap B) = \mathbb{P}(A) \times \mathbb{P}(B)\). L'univers est ici \(\Omega = \{1, 2, 3, 4, 5, 6\}\) et le tirage Ã©tant au hasard, la probabilitÃ© est Ã©quirÃ©partie.

**Ã‰tape 2 : Calcul des probabilitÃ©s simples.**
 Pour l'Ã©vÃ©nement \(A\) (numÃ©ros pairs) : \(A = \{2, 4, 6\} \implies \mathbb{P}(A) = \frac{3}{6} = \frac{1}{2}\).
 Pour l'Ã©vÃ©nement \(B\) (multiples de 3) : \(B = \{3, 6\} \implies \mathbb{P}(B) = \frac{2}{6} = \frac{1}{3}\).

**Ã‰tape 3 : Calcul de la probabilitÃ© de l'intersection et vÃ©rification.**
 L'intersection \(A \cap B\) correspond aux boules Ã  la fois paires et multiples de 3 : \(A \cap B = \{6\} \implies \mathbb{P}(A \cap B) = \frac{1}{6}\).
 On vÃ©rifie le produit des probabilitÃ©s marginales : \[\mathbb{P}(A) \times \mathbb{P}(B) = \frac{1}{2} \times \frac{1}{3} = \frac{1}{6}\] L'Ã©galitÃ© est bien vÃ©rifiÃ©e : \[\mathbf{\mathbb{P}(A \cap B) = \mathbb{P}(A)\mathbb{P}(B)}\] Les Ã©vÃ©nements \(A\) et \(B\) sont donc indÃ©pendants pour \(n=6\).
:::

**Question 2** : Donner une valeur de \(n\) pour laquelle \(A\) et \(B\) ne sont pas indÃ©pendants. Justifier.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Choix d'un contre-exemple.**
 L'indÃ©pendance dÃ©pend fortement du nombre total \(n\) qui modifie la proportion des multiples communs. Testons avec \(n=3\). L'univers est rÃ©duit Ã  \(\Omega = \{1,2,3\}\).

**Ã‰tape 2 : Calcul des probabilitÃ©s.**
 Pour \(A\) (pairs) : \(A = \{2\} \implies \mathbb{P}(A) = \frac{1}{3}\).
 Pour \(B\) (multiples de 3) : \(B = \{3\} \implies \mathbb{P}(B) = \frac{1}{3}\).
 Pour \(A \cap B\) : il n'y a aucun nombre Ã  la fois pair et multiple de 3 dans cet ensemble. Donc \(A \cap B = \emptyset \implies \mathbb{P}(A \cap B) = 0\).

**Ã‰tape 3 : VÃ©rification de la condition d'indÃ©pendance.**
 Le produit des probabilitÃ©s donne : \[\mathbb{P}(A) \times \mathbb{P}(B) = \frac{1}{3} \times \frac{1}{3} = \frac{1}{9}\] Puisque \(0 \neq \frac{1}{9}\), la relation d'indÃ©pendance n'est pas vÃ©rifiÃ©e : \[\mathbf{\text{Pour } n=3 \text{, les Ã©vÃ©nements ne sont pas indÃ©pendants.}}\]
:::
:::

:::exercise label="Probleme 3" title="ProblÃ¨me III - Inversion de probabilitÃ©s"
On dispose de 100 dÃ©s dont 25 sont pipÃ©s. Pour chaque dÃ© pipÃ©, la probabilitÃ© d'obtenir le chiffre 6 lors d'un lancer vaut \(\frac{1}{2}\).

**Question 1** : On tire un dÃ© au hasard parmi les 100 dÃ©s. On lance ce dÃ© et on obtient 6. Quelle est la probabilitÃ© que ce dÃ© soit pipÃ© ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : ModÃ©lisation et Ã©vÃ©nements.**
 Il s'agit d'un problÃ¨me d'inversion des probabilitÃ©s (Formule de Bayes). On note \(S\) : "on obtient 6" et \(T\) : "le dÃ© est pipÃ©". La proportion de dÃ©s pipÃ©s est de \(25/100 = 0.25\), on a donc \(\mathbb{P}(T) = 0.25\) et \(\mathbb{P}(\overline{T}) = 0.75\). On connaÃ®t \(\mathbb{P}_T(S) = \frac{1}{2}\) et \(\mathbb{P}_{\overline{T}}(S) = \frac{1}{6}\).

**Ã‰tape 2 : Application de la formule de Bayes.**
 D'aprÃ¨s la formule de Bayes, comme \(\{T, \overline{T}\}\) forme un systÃ¨me complet d'Ã©vÃ©nements, on exprime la probabilitÃ© cherchÃ©e : \[\mathbb{P}_S(T) = \frac{\mathbb{P}(S \cap T)}{\mathbb{P}(S)} = \frac{\mathbb{P}(T)\mathbb{P}_T(S)}{\mathbb{P}(T \cap S) + \mathbb{P}(\overline{T} \cap S)}\]

**Ã‰tape 3 : Calcul numÃ©rique.**
 En remplaÃ§ant par les probabilitÃ©s connues : \[\mathbb{P}_S(T) = \frac{0.25 \times \frac{1}{2}}{0.25 \times \frac{1}{2} + 0.75 \times \frac{1}{6}} = \frac{\frac{1}{4} \times \frac{1}{2}}{\frac{1}{4} \times \frac{1}{2} + \frac{3}{4} \times \frac{1}{6}}\] \[\mathbb{P}_S(T) = \frac{\frac{1}{8}}{\frac{1}{8} + \frac{1}{8}} = \frac{\frac{1}{8}}{\frac{2}{8}}\] \[\mathbf{\mathbb{P}_S(T) = \frac{1}{2}}\]
:::

**Question 2** : Soit \(n \in \mathbb{N}^*\). On tire un dÃ© au hasard parmi 100 dÃ©s. On lance ce dÃ© \(n\) fois et on obtient \(n\) fois le chiffre 6. Quelle est la probabilitÃ© \(p_n\) pour que ce dÃ© soit pipÃ© ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Adaptation du modÃ¨le pour \(n\) lancers.**
 L'expÃ©rience consiste en \(n\) tirages successifs et indÃ©pendants. Notons \(S_n\) : "on obtient 6 aux \(n\) lancers". Les probabilitÃ©s conditionnelles s'Ã©lÃ¨vent Ã  la puissance \(n\) : \(\mathbb{P}_T(S_n) = \left(\frac{1}{2}\right)^n\) et \(\mathbb{P}_{\overline{T}}(S_n) = \left(\frac{1}{6}\right)^n\).

**Ã‰tape 2 : Application de la formule de Bayes.**
 \[p_n = \mathbb{P}_{S_n}(T) = \frac{\mathbb{P}(T)\mathbb{P}_T(S_n)}{\mathbb{P}(T \cap S_n) + \mathbb{P}(\overline{T} \cap S_n)}\] \[p_n = \frac{0.25 \times \left(\frac{1}{2}\right)^n}{0.25 \times \left(\frac{1}{2}\right)^n + 0.75 \times \left(\frac{1}{6}\right)^n}\]

**Ã‰tape 3 : Simplification de l'expression.**
 En divisant le numÃ©rateur et le dÃ©nominateur par le terme du numÃ©rateur \(0.25 \times \left(\frac{1}{2}\right)^n\), on obtient : \[p_n = \frac{1}{1 + 3 \times \frac{\left(\frac{1}{6}\right)^n}{\left(\frac{1}{2}\right)^n}} = \frac{1}{1 + 3 \times \left(\frac{1}{3}\right)^n}\] \[\mathbf{p_n = \frac{1}{1 + 3 \left(\frac{1}{3}\right)^n}}\] *(Note : Plus le nombre de "6" consÃ©cutifs augmente, plus on s'approche de la certitude que le dÃ© est pipÃ© car \(\lim_{n \to +\infty} p_n = 1\)).*
:::
:::

:::exercise label="Probleme 4" title="ProblÃ¨me IV - Loi Binomiale"
Une entreprise pharmaceutique dÃ©cide d'affranchir, au hasard, une proportion de 3 lettres sur 5 au tarif urgent, les autres au tarif normal.

**Question 1** : Quatre lettres sont envoyÃ©es dans un cabinet mÃ©dical de quatre mÃ©decins. Quelle est la probabilitÃ© des Ã©vÃ©nements \(A\) et \(B\) suivants :

- \(A\) : "Au moins l'un d'entre eux reÃ§oit une lettre au tarif urgent".
- \(B\) : "Exactement 2 mÃ©decins sur les quatre reÃ§oivent une lettre au tarif urgent".

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification de la loi de probabilitÃ©.**
 L'affranchissement se faisant au hasard pour une proportion fixe, les envois sont considÃ©rÃ©s comme des Ã©preuves de Bernoulli indÃ©pendantes (succÃ¨s = "tarif urgent", probabilitÃ© \(p=\frac{3}{5}\)). Soit \(X\) le nombre de mÃ©decins parmi les 4 qui reÃ§oivent une lettre urgente. \(X\) suit une loi binomiale de paramÃ¨tres \(n=4\) et \(p=\frac{3}{5}\). \[X \sim \mathcal{B}\left(4, \frac{3}{5}\right)\]

**Ã‰tape 2 : Calcul de la probabilitÃ© de l'Ã©vÃ©nement A.**
 L'Ã©vÃ©nement \(A\) correspond Ã  \(X \ge 1\). On passe par l'Ã©vÃ©nement contraire : \[\mathbb{P}(A) = \mathbb{P}(X \ge 1) = 1 - \mathbb{P}(X=0)\] \[\mathbb{P}(A) = 1 - \binom{4}{0}\left(\frac{3}{5}\right)^0\left(\frac{2}{5}\right)^4 = 1 - 1 \times 1 \times \left(\frac{2}{5}\right)^4 = 1 - \frac{16}{625}\] \[\mathbf{\mathbb{P}(A) = \frac{609}{625}}\]

**Ã‰tape 3 : Calcul de la probabilitÃ© de l'Ã©vÃ©nement B.**
 L'Ã©vÃ©nement \(B\) correspond exactement Ã  \(X = 2\). \[\mathbb{P}(B) = \mathbb{P}(X=2) = \binom{4}{2}\left(\frac{3}{5}\right)^2\left(\frac{2}{5}\right)^2\] \[\mathbb{P}(B) = 6 \times \frac{9}{25} \times \frac{4}{25} = 6 \times \frac{36}{625}\] \[\mathbf{\mathbb{P}(B) = \frac{216}{625}}\]
:::

**Question 2** : Soit \(X\) la variable alÃ©atoire : "nombre de lettres affranchies au tarif urgent parmi 10 lettres". Quelle est la loi de probabilitÃ© de \(X\), son espÃ©rance, sa variance et son Ã©cart-type ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification de la nouvelle loi.**
 Le nombre d'essais passe de 4 Ã  10. Ainsi, la nouvelle variable \(X\) suit une loi binomiale de paramÃ¨tres \(n=10\) et \(p=\frac{3}{5}\). \[\mathbf{X \sim \mathcal{B}\left(10, \frac{3}{5}\right)}\]

**Ã‰tape 2 : Calcul de l'espÃ©rance.**
 L'espÃ©rance mathÃ©matique d'une loi binomiale est donnÃ©e par \(\mathbb{E}(X) = n \times p\). \[\mathbb{E}(X) = 10 \times \frac{3}{5} = \mathbf{6}\]

**Ã‰tape 3 : Calcul de la variance.**
 La variance d'une loi binomiale est donnÃ©e par \(\mathbb{V}(X) = n \times p \times (1-p)\). \[\mathbb{V}(X) = 10 \times \frac{3}{5} \times \frac{2}{5} = \frac{60}{25} = \mathbf{\frac{12}{5}} \quad (\text{soit } 2.4)\]

**Ã‰tape 4 : Calcul de l'Ã©cart-type.**
 L'Ã©cart-type est par dÃ©finition la racine carrÃ©e de la variance : \(\sigma(X) = \sqrt{\mathbb{V}(X)}\). \[\sigma(X) = \sqrt{\frac{12}{5}} = \mathbf{\frac{2\sqrt{15}}{5}} \quad (\approx 1.55)\]
:::

\vfill

Ã‰quipe PÃ©dagogique Esisar Page 1/1
:::
