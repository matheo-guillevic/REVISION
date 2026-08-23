---
title: math - Revision ESISAR
subject: math
type: course
---

:::section id="probabilites" eyebrow="Objectif" title="Retracer le cours dans l'ordre des PDF, puis s'entrainer." summary="Cette version suit les chapitres extraits des PDF : denombrement, espaces probabilises, variables aleatoires discretes, variables aleatoires continues, couples discrets. Les blocs ajoutent aussi des aides de lecture pour reconnaitre les methodes en exercice."
:::dashboard
:::card class="progress-card" kicker="Progression exercices" title="0%"
La progression evolue quand les exercices sont marques comme faits.
:::

:::card class="priority-card" kicker="Priorites"
1.  Connaitre les definitions et hypotheses exactes.
2.  Savoir choisir la bonne formule avant de calculer.
3.  Savoir justifier l'independance ou le conditionnement.
4.  Maitriser esperance, variance, covariance et lois usuelles.
5.  Savoir passer d'une densite a une fonction de repartition, et inversement.
:::
:::

:::quicklinks
- [Programme](#probabilites-programme)
- [Methodes](#probabilites-methodes)
- [Couples discrets](#probabilites-chap5-discret)
- [TD](#probabilites-td)
- [Fiche finale](#probabilites-revision)
:::
:::

:::section id="probabilites-programme" eyebrow="Programme" title="Parcours du semestre" summary="Les chapitres sont ranges dans l'ordre ou ils se soutiennent mutuellement."
01

### Denombrement

Ensembles finis, cardinaux, produits cartesiens, p-listes, arrangements, permutations, combinaisons, binome de Newton, parties de \(E\).

02

### Espaces probabilises

Vocabulaire, probabilites finies, equiprobabilite, tribus, systemes complets, probabilites conditionnelles, Bayes, independance.

03

### Variables aleatoires discretes

Loi, fonction de repartition, independance, esperance, transfert, variance, covariance, lois uniforme, Bernoulli, binomiale, geometrique, Poisson.

04

### Variables aleatoires continues

Fonction de repartition, densite, esperance, transfert, variance, lois uniforme, exponentielle, normale, standardisation et sommes de normales.

05

### Couples discrets

Loi conjointe, lois marginales, independance, covariance et sommes de variables aleatoires independantes.
:::

:::section id="probabilites-chap1" eyebrow="Chapitre 1" title="Denombrement" summary="Le chapitre sert a compter des issues avant de passer aux probabilites uniformes."
:::block type="neutral" title="Plan du cours"
*   Notions sur les ensembles : ensembles finis, denombrables, cardinaux.
*   p-listes : suites avec ordre et repetition possible.
*   Arrangements : p-listes sans repetition, permutations.
*   Parties d'un ensemble : combinaisons et cardinal de \(\mathcal P(E)\).
:::

:::grid
:::block type="definition" title="Ensemble fini et denombrable"
*   **Ensemble fini** : \(E\) est de cardinal \(n\) s'il existe une bijection de \(\llbracket 1,n\rrbracket\) vers \(E\), ou si \(E=\varnothing\) pour \(n=0\).
*   **Ensemble denombrable** : il existe une bijection de \(\mathbb N\) vers \(E\).
*   **Exemples classiques** : \(\mathbb Z\), \(\mathbb N^2\), \(\mathbb Q\) sont denombrables ; \(\mathbb R\) et \(\mathcal P(\mathbb N)\) ne le sont pas.
:::

:::block type="theorem" title="Cardinaux"
*   **Cas disjoint** : si \(A\cap B=\varnothing\), alors \( |A\cup B|=|A|+|B| \).
*   **Inclusion-exclusion** : \( |A\cup B|=|A|+|B|-|A\cap B| \).
*   **Difference** : \( |A\setminus B|=|A|-|A\cap B| \).
*   **Complementaire** : \( |\overline A|=|E|-|A| \).
*   **Produit cartesien** : \( |A\times B|=|A||B| \).
:::

:::block type="method" title="Principe multiplicatif"
Si une construction se fait en plusieurs choix successifs independants en nombre \(n_1,\ldots,n_p\), le nombre total est \(n_1\cdots n_p\).

Exemple du cours : lancer un de et une piece donne \(6\times2=12\) issues.
:::

:::block type="remember" title="Question reflexe"
Avant toute formule : ordre ? repetition ? tirage successif ou simultane ? remise ou sans remise ?
:::
:::

:::grid
:::block type="definition" title="p-liste"
*   **Objet compte** : une suite de \(p\) elements de \(E\), donc un element de \(E^p\).
*   **Ordre** : il compte.
*   **Repetition** : elle est autorisee.
*   **Nombre** : \(n^p\).
:::

:::block type="definition" title="Arrangement et permutation"
*   **Objet compte** : une p-liste d'elements distincts.
*   **Formule** : \(A_n^p=n(n-1)\cdots(n-p+1)=\frac{n!}{(n-p)!}\).
*   **Permutation** : arrangement de \(n\) elements, donc \(n!\).
:::

:::block type="definition" title="Combinaison"
*   **Objet compte** : une partie de \(E\) a \(p\) elements.
*   **Ordre** : il ne compte pas.
*   **Formule** : \(\binom np=\frac{A_n^p}{p!}=\frac{n!}{p!(n-p)!}\).
:::

:::block type="theorem" title="Coefficients binomiaux"
*   **Symetrie** : \(\binom np=\binom n{n-p}\).
*   **Bords** : \(\binom n0=\binom nn=1\).
*   **Un seul choix** : \(\binom n1=n\).
*   **Pascal** : \(\binom np=\binom{n-1}{p-1}+\binom{n-1}{p}\).
:::
:::

:::grid
:::block type="theorem" title="Binome de Newton"
*   **Formule** : \((a+b)^n=\sum_{k=0}^n \binom nk a^k b^{n-k}\).
*   **Condition importante** : pour des matrices, on ne developpe ainsi que si elles commutent.
:::

:::block type="theorem" title="Parties d'un ensemble"
*   **Resultat a retenir** : si \(|E|=n\), alors \(|\mathcal P(E)|=2^n\).
*   **Justification** : \(|\mathcal P(E)|=\sum_{k=0}^n \binom nk=(1+1)^n=2^n\).
:::
:::

:::annotation title="Erreur frequente"
Ne pas confondre tirage simultane et tirage successif sans remise : les deux ne modelisent pas les memes objets, meme si les probabilites finales peuvent parfois coincider.
:::

Cours

### Cartes et choix de formule

A refaire

Objectif : distinguer p-liste, arrangement, combinaison Difficulte : 2/3 Temps : 12 min

Dans un jeu de 32 cartes, compter les tirages de 5 cartes avec remise, sans remise successivement, puis simultanement.

Afficher l'indice Afficher la correction Marquer comme fait

**Indice**

Avec remise : repetitions possibles. Sans remise successif : ordre et pas de repetition. Simultane : pas d'ordre.

**Correction**

Avec remise : \(32^5\). Sans remise successivement : \(A_{32}^5=\frac{32!}{27!}\). Simultanement : \(\binom{32}{5}\).

**Methode**

Ecris toujours le type d'objet compte avant la formule : suite avec repetition, suite sans repetition, ou partie.
:::

:::section id="probabilites-chap2" eyebrow="Chapitre 2" title="Espaces probabilises" summary="Le chapitre fixe le vocabulaire et les outils de calcul : probabilite, conditionnement, Bayes, independance."
:::block type="neutral" title="Plan du cours"
*   Vocabulaire : experience aleatoire, univers, evenement, evenement elementaire, incompatibilite, contraire.
*   Espace probabilise fini : definition, proprietes, caracterisation, equiprobabilite.
*   Cas general : tribu, espace probabilisable, espace probabilise, systeme complet.
*   Outils de calcul : probabilites conditionnelles, probabilites totales, Bayes, independance.
:::

:::grid
:::block type="definition" title="Vocabulaire"
*   **Experience aleatoire** : experience dont le resultat depend du hasard.
*   **Univers** : ensemble \(\Omega\) de toutes les issues possibles.
*   **Evenement** : partie de \(\Omega\).
*   **Incompatibilite** : \(A\cap B=\varnothing\).
*   **Contraire** : \(\overline A=\Omega\setminus A\).
:::

:::block type="definition" title="Probabilite finie"
Si \(\Omega\) est fini, une probabilite sur \(\mathcal P(\Omega)\) est une application \(P:\mathcal P(\Omega)\to[0,1]\) telle que \(P(\Omega)=1\) et, si \(A\cap B=\varnothing\), \(P(A\cup B)=P(A)+P(B)\).
:::

:::block type="theorem" title="Proprietes de base"
*   **Impossible** : \(P(\varnothing)=0\).
*   **Contraire** : \(P(\overline A)=1-P(A)\).
*   **Difference** : \(P(A\setminus B)=P(A)-P(A\cap B)\).
*   **Croissance** : si \(A\subset B\), alors \(P(A)\le P(B)\).
*   **Union** : \(P(A\cup B)=P(A)+P(B)-P(A\cap B)\).
:::

:::block type="theorem" title="Caracterisation finie"
*   **Poids elementaires** : \(p_i=P({\omega_i})\).
*   **Conditions** : \(p_i\ge0\) et \(\sum_i p_i=1\).
*   **Probabilite d'un evenement** : \(P(A)=\sum_{\omega_i\in A}p_i\).
:::
:::

:::grid
:::block type="method" title="Equiprobabilite"
*   **Hypothese** : toutes les issues elementaires ont la meme probabilite.
*   **Formule** : \(P(A)=\frac{|A|}{|\Omega|}\).
*   **Lecture** : nombre de cas favorables divise par nombre de cas possibles.
*   **Lien** : le chapitre 1 sert a calculer ces cardinaux.
:::

:::block type="definition" title="Tribu"
*   **Contient** : \(\Omega\in\mathcal A\).
*   **Stable par contraire** : si \(B\in\mathcal A\), alors \(\overline B\in\mathcal A\).
*   **Stable par reunion** : une reunion finie ou denombrable d'evenements reste un evenement.
*   **Cas fini** : \(\mathcal P(\Omega)\) est une tribu.
:::

:::block type="definition" title="Systeme complet d'evenements"
Une famille \((A_i)_{i\in I}\) est un systeme complet si les \(A_i\) sont des evenements, deux a deux incompatibles, et si \(\bigcup_i A_i=\Omega\).
:::

:::block type="theorem" title="Continuite des probabilites"
Si \((A_n)\) est croissante, \(P(\bigcup_n A_n)=\lim P(A_n)\). Si elle est decroissante, \(P(\bigcap_n A_n)=\lim P(A_n)\).
:::
:::

:::grid
:::block type="definition" title="Probabilite conditionnelle"
*   **Hypothese** : \(P(A)>0\).
*   **Formule** : \(P_A(B)=P(B\mid A)=\frac{P(A\cap B)}{P(A)}\).
*   **Point important** : \(B\mapsto P_A(B)\) est encore une probabilite.
:::

:::block type="theorem" title="Probabilites totales"
*   **Hypothese** : \(A_1,\ldots,A_n\) forment un systeme complet et \(P(A_k)>0\).
*   **Formule** : \(P(B)=\sum_{k=1}^n P(A_k)P(B\mid A_k)\).
*   **Cas general** : meme idee pour un systeme complet denombrable.
:::

:::block type="theorem" title="Bayes"
*   **But** : inverser une probabilite conditionnelle.
*   **Formule** : \(P(A_k\mid B)=\frac{P(A_k)P(B\mid A_k)}{\sum_{i=1}^nP(A_i)P(B\mid A_i)}\).
*   **Denominateur** : c'est \(P(B)\), obtenu par probabilites totales.
:::

:::block type="definition" title="Independance"
*   **Deux evenements** : \(P(A\cap B)=P(A)P(B)\).
*   **Famille** : verifier l'independance pour toute intersection finie de sous-famille.
*   **Piege** : independance n'est pas incompatibilite.
:::
:::

:::annotation title="Attention"
Incompatibilite signifie \(A\cap B=\varnothing\). Independance signifie \(P(A\cap B)=P(A)P(B)\). Deux evenements incompatibles non impossibles ne sont pas independants.
:::

TD / Bayes

### Controle antidopage

A refaire

Objectif : conditionner et inverser une probabilite Difficulte : 2/3 Temps : 15 min

En competition, \(P(P)=0,02\). Le medicament \(M\) est utilise par 25% des sportifs et \(P(P\mid M)=0,05\). Calculer \(P(M\cap P)\), puis discuter \(P(M\mid P)\).

Afficher l'indice Afficher la correction Marquer comme fait

**Indice**

Commence par \(P(M\cap P)=P(M)P(P\mid M)\), puis utilise Bayes.

**Correction**

\(P(M\cap P)=0,25\times0,05=0,0125\).

Comme \(P(P)=0,02\), \(P(M\mid P)=\frac{P(M\cap P)}{P(P)}=\frac{0,0125}{0,02}=0,625\).

**Redaction attendue**

Ne pas ecrire \(P(M\mid P)=P(P\mid M)\). Le sens de la condition est l'un des pieges principaux du chapitre.
:::

:::section id="probabilites-chap3" eyebrow="Chapitre 3" title="Variables aleatoires discretes" summary="Le cours passe d'evenements a des grandeurs numeriques : loi, repartition, moments et lois usuelles."
:::block type="neutral" title="Plan du cours"
*   Definitions : variable aleatoire reelle discrete, loi, fonction de repartition, variables independantes.
*   Moments : esperance, transfert, variance, ecart-type, centrage-reduction, covariance.
*   Cas denombrable : convergence absolue des series definissant les moments.
*   Lois usuelles : uniforme, Bernoulli, binomiale, geometrique, Poisson et approximation de Poisson.
:::

:::grid
:::block type="definition" title="Variable aleatoire discrete"
Sur \((\Omega,\mathcal A,P)\), une variable aleatoire reelle discrete est une application \(X:\Omega\to\mathbb R\) dont l'ensemble de valeurs \(X(\Omega)\) est fini ou denombrable.
:::

:::block type="definition" title="Loi de probabilite"
La loi de \(X\) est l'ensemble des couples \((x_k,p_k)\) ou \(x_k\in X(\Omega)\) et \(p_k=P(X=x_k)\). En cas fini, on la presente souvent sous forme de tableau.

Verification obligatoire : \(\sum_k p_k=1\).
:::

:::block type="definition" title="Fonction de repartition"
*   **Definition** : \(F_X(x)=P(X\le x)\).
*   **Forme discrete** : \(F_X\) est en escalier.
*   **Sauts** : le saut en \(x_k\) vaut \(P(X=x_k)\).
:::

:::block type="definition" title="Variables independantes"
\(X\) et \(Y\) sont independantes si, pour tous \(a\in X(\Omega)\), \(b\in Y(\Omega)\), les evenements \((X=a)\) et \((Y=b)\) sont independants.

Pour montrer qu'elles ne le sont pas, il suffit de trouver \((a,b)\) tel que \(P(X=a,Y=b)\ne P(X=a)P(Y=b)\).
:::
:::

:::grid
:::block type="theorem" title="Esperance"
*   **Formule** : \(E(X)=\sum_i x_iP(X=x_i)=\sum_i x_ip_i\).
*   **Interpretation** : valeur moyenne theorique de \(X\).
*   **Variable centree** : \(E(X)=0\).
:::

:::block type="theorem" title="Theoreme de transfert"
*   **Une variable** : \(E(g(X))=\sum_i g(x_i)P(X=x_i)\).
*   **Deux variables** : \(E(g(X,Y))=\sum_i\sum_j g(x_i,y_j)P(X=x_i,Y=y_j)\).
*   **Usage** : calculer \(E(X^2)\), \(E(XY)\), ou une fonction d'une variable sans redeterminer toute la loi.
:::

:::block type="theorem" title="Lineairite et produit"
*   **Constante** : \(E(a)=a\).
*   **Somme** : \(E(X+Y)=E(X)+E(Y)\).
*   **Affine** : \(E(aX+b)=aE(X)+b\).
*   **Produit independant** : \(E(XY)=E(X)E(Y)\) si \(X,Y\) sont independantes.
:::

:::block type="theorem" title="Variance et ecart-type"
*   **Definition** : \(V(X)=E((X-E(X))^2)\).
*   **Formule de Koenig-Huygens** : \(V(X)=E(X^2)-E(X)^2\).
*   **Ecart-type** : \(\sigma(X)=\sqrt{V(X)}\).
*   **Transformation affine** : \(V(aX+b)=a^2V(X)\), \(\sigma(aX+b)=|a|\sigma(X)\).
:::
:::

:::grid
:::block type="definition" title="Variable centree reduite"
*   **Condition** : \(\sigma(X)\ne0\).
*   **Definition** : \(X^\*=\frac{X-E(X)}{\sigma(X)}\).
*   **Resultat** : \(E(X^\*)=0\) et \(\sigma(X^\*)=1\).
:::

:::block type="theorem" title="Covariance"
*   **Definition** : \(\operatorname{Cov}(X,Y)=E((X-E(X))(Y-E(Y)))\).
*   **Formule utile** : \(\operatorname{Cov}(X,Y)=E(XY)-E(X)E(Y)\).
*   **Variance d'une somme** : \(V(X+Y)=V(X)+V(Y)+2\operatorname{Cov}(X,Y)\).
*   **Si independance** : \(\operatorname{Cov}(X,Y)=0\) et \(V(X+Y)=V(X)+V(Y)\).
:::

:::block type="definition" title="Cas denombrable"
Si \(X(\Omega)={x_i,\\ i\in\mathbb N}\), le moment d'ordre \(\alpha\) existe lorsque la serie \(\sum_i x_i^\alpha P(X=x_i)\) converge absolument.

Le moment d'ordre 1 est l'esperance, celui d'ordre 2 permet de definir la variance.
:::

:::block type="remember" title="Series a connaitre"
*   **Exponentielle** : \(\sum_{n=0}^{+\infty}\frac{x^n}{n!}=e^x\).
*   **Geometrique** : si \(|x|<1\), alors \(\sum_{n=0}^{+\infty}x^n=\frac1{1-x}\).
*   **Utilite** : preuves des lois geometrique et de Poisson.
:::
:::

:::grid
:::block type="method" title="Loi uniforme discrete"
*   **Notation** : \(X\sim\mathcal U(\llbracket 1,n\rrbracket)\).
*   **Loi** : \(P(X=i)=1/n\).
*   **Esperance** : \(E(X)=\frac{n+1}{2}\).
*   **Variance** : \(V(X)=\frac{n^2-1}{12}\).
:::

:::block type="method" title="Loi de Bernoulli"
*   **Notation** : \(X\sim\mathcal B(p)\).
*   **Loi** : \(P(X=1)=p\), \(P(X=0)=1-p\).
*   **Esperance** : \(E(X)=p\).
*   **Variance** : \(V(X)=p(1-p)\).
:::

:::block type="method" title="Loi binomiale"
*   **Reconnaissance** : \(X\) compte les succes dans \(n\) epreuves de Bernoulli independantes.
*   **Loi** : \(P(X=k)=\binom nkp^k(1-p)^{n-k}\).
*   **Esperance** : \(E(X)=np\).
*   **Variance** : \(V(X)=np(1-p)\).
:::

:::block type="method" title="Loi geometrique"
*   **Reconnaissance** : \(X\) est le rang du premier succes.
*   **Support** : \(X\in\mathbb N^\*\).
*   **Loi** : \(P(X=k)=(1-p)^{k-1}p\).
*   **Moments** : \(E(X)=\frac1p\), \(V(X)=\frac{1-p}{p^2}\).
:::

:::block type="method" title="Loi de Poisson"
*   **Notation** : \(X\sim\mathcal P(\lambda)\), avec \(\lambda>0\).
*   **Support** : \(X\in\mathbb N\).
*   **Loi** : \(P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!}\).
*   **Moments** : \(E(X)=\lambda\), \(V(X)=\lambda\).
*   **Somme** : si \(X_1,X_2\) sont independantes, \(X_1+X_2\sim\mathcal P(\lambda_1+\lambda_2)\).
:::

:::block type="warning" title="Approximation de Poisson"
*   **Depart** : \(X\sim\mathcal B(n,p)\).
*   **Conditions pratiques** : \(n\ge30\), \(p\le0,1\), \(np<15\).
*   **Approximation** : \(X\approx Y\sim\mathcal P(np)\).
:::
:::

Lois usuelles

### Orchestre et loi binomiale

A refaire

Objectif : modeliser avec une binomiale Difficulte : 3/3 Temps : 20 min

Deux orchestres A et B ont 4 et 6 musiciens. Chaque musicien est present avec probabilite \(p\), independamment. Un orchestre joue si strictement plus de la moitie est presente. Comparer les probabilites.

Afficher l'indice Afficher la correction Marquer comme fait

**Indice**

Pour A, il faut au moins 3 presents sur 4. Pour B, au moins 4 presents sur 6.

**Correction**

Si \(X_A\sim\mathcal B(4,p)\), \(P(A)=P(X_A\ge3)=\binom43p^3(1-p)+p^4=4p^3-3p^4\).

Si \(X_B\sim\mathcal B(6,p)\), \(P(B)=P(X_B\ge4)=15p^4(1-p)^2+6p^5(1-p)+p^6=15p^4-24p^5+10p^6\).

**Examen**

La modelisation vaut autant que le calcul : il faut ecrire clairement la loi suivie par chaque variable.
:::

:::section id="probabilites-chap4" eyebrow="Chapitre 4" title="Variables aleatoires continues" summary="Le cours remplace les sommes par des integrales et introduit les lois continues de reference."
:::block type="neutral" title="Plan du cours"
*   Variable continue et fonction de repartition.
*   Densite : proprietes, probabilites d'intervalles.
*   Moments : esperance, transfert, variance et ecart-type par integrales.
*   Lois de reference : uniforme, exponentielle, normale centree reduite et normale generale.
:::

:::grid
:::block type="definition" title="Variable continue"
Une variable aleatoire continue \(X:\Omega\to\mathbb R\) prend ses valeurs dans un ensemble non denombrable et les evenements \({X\le x}\) sont mesurables.
:::

:::block type="definition" title="Fonction de repartition"
*   **Definition** : \(F_X(x)=P(X\le x)\).
*   **Variations** : \(F_X\) est croissante.
*   **Limites** : \(F_X(x)\to0\) en \(-\infty\), \(F_X(x)\to1\) en \(+\infty\).
*   **Intervalle** : \\(P(a
:::

:::block type="definition" title="Densite"
*   **Definition** : \(X\) est a densite s'il existe \(f_X:\mathbb R\to\mathbb R_+\), integrable.
*   **Lien avec \(F_X\)** : \(F_X(x)=\int_{-\infty}^x f_X(t)\\,dt\).
*   **Aire totale** : \(\int_{-\infty}^{+\infty}f_X(t)\\,dt=1\).
*   **Probabilite d'intervalle** : \(P(a\le X\le b)=\int_a^b f_X(t)\\,dt\).
:::

:::block type="warning" title="Point cle"
Pour une variable continue a densite, \(P(X=a)=0\). Les bornes strictes ou larges ne changent pas une probabilite d'intervalle.
:::
:::

:::grid
:::block type="theorem" title="Esperance"
*   **Condition** : l'integrale doit etre absolument convergente.
*   **Formule** : \(E(X)=\int_{-\infty}^{+\infty}t f_X(t)\\,dt\).
:::

:::block type="theorem" title="Theoreme de transfert"
*   **Condition** : \(|g(t)|f_X(t)\) est integrable.
*   **Formule** : \(E(g(X))=\int_{-\infty}^{+\infty}g(t)f_X(t)\\,dt\).
:::

:::block type="theorem" title="Variance"
*   **Definition** : \(V(X)=E((X-E(X))^2)\).
*   **Formule utile** : \(V(X)=E(X^2)-E(X)^2\).
*   **Affine** : \(V(aX+b)=a^2V(X)\).
*   **Independance** : si \(X,Y\) sont independantes, \(V(X+Y)=V(X)+V(Y)\).
:::

:::block type="method" title="Donner une loi continue"
On peut donner soit sa densite, soit sa fonction de repartition. Pour passer de \(F\) a \(f\), on derive \(F\) la ou elle est derivable.
:::
:::

:::grid
:::block type="method" title="Loi uniforme sur \([a,b]\)"
*   **Densite** : \(f(t)=\frac1{b-a}\) sur \([a,b]\), et \(0\) sinon.
*   **Repartition** : pour \(x\in[a,b]\), \(F_X(x)=\frac{x-a}{b-a}\).
*   **Intervalle** : si \([c,d]\subset[a,b]\), \(P(c\le X\le d)=\frac{d-c}{b-a}\).
*   **Moments** : \(E(X)=\frac{a+b}{2}\), \(V(X)=\frac{(b-a)^2}{12}\).
:::

:::block type="method" title="Loi exponentielle"
*   **Notation** : \(X\sim\mathcal E(\lambda)\), \(\lambda>0\).
*   **Densite** : \(f(t)=\lambda e^{-\lambda t}\) pour \(t\ge0\), et \(0\) sinon.
*   **Repartition** : \(F_X(x)=1-e^{-\lambda x}\) pour \(x\ge0\).
*   **Moments** : \(E(X)=\frac1\lambda\), \(V(X)=\frac1{\lambda^2}\).
:::

:::block type="theorem" title="Sans memoire"
*   **Hypothese** : \(X\sim\mathcal E(\lambda)\), \(a,b\ge0\).
*   **Propriete** : \(P(X>a+b\mid X>a)=P(X>b)\).
*   **Interpretation** : le temps deja attendu ne change pas la loi du temps restant.
:::

:::block type="method" title="Loi normale centree reduite"
*   **Notation** : \(X\sim\mathcal N(0,1)\).
*   **Densite** : \(f(x)=\frac1{\sqrt{2\pi}}e^{-x^2/2}\).
*   **Moments** : \(E(X)=0\), \(V(X)=1\).
*   **Calculs** : sa fonction de repartition se lit avec une table ou un outil.
:::

:::block type="theorem" title="Symetrie normale"
*   **Queue gauche/droite** : \(P(X<-a)=P(X>a)=1-P(X
*   **Intervalle centre** : \\(P(-a.
*   **Reperes** : environ 0,68 dans \\([-1,1]\), 0,95 dans \([-2,2]\), 0,997 dans \([-3,3]\).
:::

:::block type="method" title="Loi normale \(\mathcal N(\mu,\sigma)\)"
*   **Notation** : \(X\sim\mathcal N(\mu,\sigma)\), \(\sigma>0\).
*   **Densite** : \(f(x)=\frac1{\sigma\sqrt{2\pi}}e^{-\frac12\left(\frac{x-\mu}{\sigma}\right)^2}\).
*   **Standardisation** : \(X^\*=\frac{X-\mu}{\sigma}\sim\mathcal N(0,1)\).
*   **Moments** : \(E(X)=\mu\), \(V(X)=\sigma^2\).
:::
:::

:::block type="theorem" title="Somme de lois normales"
*   **Hypotheses** : \(X_1\) et \(X_2\) independantes, \(X_1\sim\mathcal N(m_1,\sigma_1)\), \(X_2\sim\mathcal N(m_2,\sigma_2)\).
*   **Somme** : \(X_1+X_2\sim\mathcal N\left(m_1+m_2,\sqrt{\sigma_1^2+\sigma_2^2}\right)\).
*   **Sans independance** : ajouter \(2\operatorname{Cov}(X_1,X_2)\) dans la variance.
:::

Normale

### Standardisation

A refaire

Objectif : utiliser la table normale Difficulte : 2/3 Temps : 15 min

Soit \(X\sim\mathcal N(5,2)\). Calculer \(P(X<3)\), \(P(X\ge2)\) et \(P(1\le X\le6)\).

Afficher l'indice Afficher la correction Marquer comme fait

**Indice**

Pose \(X^\*=\frac{X-5}{2}\), puis utilise la symetrie de la loi normale centree reduite.

**Correction**

\(P(X<3)=P(X^\*<-1)=1-\Phi(1)\approx1-0,8413=0,1587\).

\(P(X\ge2)=P(X^\*\ge-1,5)=P(X^\*<1,5)\approx0,9332\).

\(P(1\le X\le6)=P(-2\le X^\*\le0,5)=\Phi(0,5)-\Phi(-2)\approx0,6915-(1-0,9772)=0,6687\).
:::

:::section id="probabilites-chap5-discret" eyebrow="Chapitre 5" title="Couples de variables aleatoires discretes" summary="Extrait cible du cours 5 : loi conjointe, marginales, independance, covariance et sommes de variables independantes."
:::block type="neutral" title="Plan du cours"
*   Couple discret : application \((X,Y):\Omega\to\mathbb R^2\).
*   Loi conjointe : probabilites \(p_{ij}=P(X=x_i,Y=y_j)\).
*   Lois marginales : lois de \(X\) et de \(Y\), obtenues en sommant la loi conjointe.
*   Independance : la loi conjointe se factorise en produit des marginales.
*   Covariance et somme : mesurer la dependance lineaire et reconnaitre les sommes binomiale/Poisson.
:::

:::grid
:::block type="definition" title="Couple de variables discretes"
Si \((\Omega,\mathcal A,P)\) modelise une experience aleatoire discrete, un couple de variables aleatoires reelles est une application \((X,Y):\Omega\to\mathbb R^2\), definie par \(\omega\mapsto(X(\omega),Y(\omega))\).

On note \(X(\Omega)=(x_i)_{i\in I}\) et \(Y(\Omega)=(y_j)_{j\in J}\).
:::

:::block type="definition" title="Loi conjointe"
*   **Definition** : \(p_{ij}=P(X=x_i,Y=y_j)\).
*   **Notation equivalente** : \(P((X,Y)=(x_i,y_j))=P((X=x_i)\cap(Y=y_j))\).
*   **Verification** : toutes les probabilites sont positives et \(\sum_i\sum_j p_{ij}=1\).
:::

:::block type="theorem" title="Lois marginales"
*   **Loi de \(X\)** : \(P(X=x_i)=\sum_{j\in J}P(X=x_i,Y=y_j)\).
*   **Loi de \(Y\)** : \(P(Y=y_j)=\sum_{i\in I}P(X=x_i,Y=y_j)\).
*   **Idee** : c'est la formule des probabilites totales appliquee aux valeurs possibles de l'autre variable.
:::

:::block type="warning" title="Attention"
Les lois marginales ne suffisent pas, en general, a reconstruire la loi conjointe. Elles suffisent seulement dans le cas d'independance.
:::
:::

:::grid
:::block type="theorem" title="Cas independant"
*   **Critere** : \(X\) et \(Y\) sont independantes si, pour tout \((i,j)\in I\times J\), \(P(X=x_i,Y=y_j)=P(X=x_i)P(Y=y_j)\).
*   **Consequence** : les marginales determinent alors toute la loi conjointe.
*   **Pour refuter** : un seul couple \((x_i,y_j)\) qui ne verifie pas l'egalite suffit.
:::

:::block type="theorem" title="Covariance"
*   **Definition** : \(\operatorname{Cov}(X,Y)=E((X-E(X))(Y-E(Y)))\).
*   **Formule utile** : \(\operatorname{Cov}(X,Y)=E(XY)-E(X)E(Y)\).
*   **Variance d'une somme** : \(V(X+Y)=V(X)+V(Y)+2\operatorname{Cov}(X,Y)\).
*   **Independance** : \(X,Y\) independantes implique \(\operatorname{Cov}(X,Y)=0\), mais la reciproque est fausse en general.
:::

:::block type="method" title="Somme de variables independantes"
*   **Binomiales** : si \(X\sim\mathcal B(n,p)\), \(Y\sim\mathcal B(m,p)\) et \(X,Y\) independantes, alors \(X+Y\sim\mathcal B(n+m,p)\).
*   **Poisson** : si \(X\sim\mathcal P(\lambda_1)\), \(Y\sim\mathcal P(\lambda_2)\) et \(X,Y\) independantes, alors \(X+Y\sim\mathcal P(\lambda_1+\lambda_2)\).
*   **Principe** : parcourir les antecedents de l'application \((X,Y)\mapsto X+Y\), puis utiliser la loi conjointe deduite des marginales par independance.
:::

:::block type="remember" title="Question reflexe"
Quand un tableau conjoint est donne ou demande, toujours calculer les sommes de lignes et de colonnes : elles donnent les marginales et servent au test d'independance.
:::
:::

:::block type="method" title="Exemple guide : construire un tableau de loi conjointe"
On considere deux variables aleatoires discretes independantes \(X\) et \(Y\), avec \(X\sim\mathcal B(2,\frac12)\) et \(Y\sim\mathcal B(\frac13)\). Le but est de construire le tableau de la loi conjointe du couple \((X,Y)\).

Les supports sont \(X(\Omega)={0,1,2}\) et \(Y(\Omega)={0,1}\). Comme les variables sont independantes, chaque case du tableau se calcule par :

\(P(X=i,Y=j)=P(X=i)P(Y=j)\)
:::

:::grid
:::block type="definition" title="Etape 1 : lois marginales"
*   **Loi de \(X\)** : \(P(X=0)=\binom20(\frac12)^0(\frac12)^2=\frac14\), \(P(X=1)=\binom21(\frac12)^1(\frac12)^1=\frac12\), \(P(X=2)=\binom22(\frac12)^2=\frac14\).
*   **Loi de \(Y\)** : \(P(Y=0)=1-\frac13=\frac23\), \(P(Y=1)=\frac13\).
:::

:::block type="theorem" title="Etape 2 : calcul des cases"
*   \(p_{00}=P(X=0,Y=0)=\frac14\times\frac23=\frac16\).
*   \(p_{01}=P(X=0,Y=1)=\frac14\times\frac13=\frac1{12}\).
*   \(p_{10}=P(X=1,Y=0)=\frac12\times\frac23=\frac13\).
*   \(p_{11}=P(X=1,Y=1)=\frac12\times\frac13=\frac16\).
*   \(p_{20}=P(X=2,Y=0)=\frac14\times\frac23=\frac16\).
*   \(p_{21}=P(X=2,Y=1)=\frac14\times\frac13=\frac1{12}\).
:::
:::

:::block type="theorem" title="Etape 3 : tableau conjoint avec marginales"
**\(X\backslash Y\)**

**\(0\)**

**\(1\)**

**\(P(X=i)\)**

**\(0\)**

\(\frac16\)

\(\frac1{12}\)

\(\frac14\)

**\(1\)**

\(\frac13\)

\(\frac16\)

\(\frac12\)

**\(2\)**

\(\frac16\)

\(\frac1{12}\)

\(\frac14\)

**\(P(Y=j)\)**

\(\frac23\)

\(\frac13\)

\(1\)

Lecture du tableau : les cases internes sont les probabilites conjointes \(p_{ij}\). La derniere colonne redonne la loi marginale de \(X\), obtenue en sommant chaque ligne. La derniere ligne redonne la loi marginale de \(Y\), obtenue en sommant chaque colonne.
:::

:::annotation title="Point important"
Si on donne seulement les lois de \(X\) et de \(Y\), on ne peut pas remplir le tableau conjoint sans information supplementaire. Ici, l'information supplementaire est l'independance, qui autorise le produit \(P(X=i)P(Y=j)\).
:::

Couple discret

### Urne rouge, verte, bleue

A refaire

Objectif : loi conjointe et marginales Difficulte : 2/3 Temps : 15 min

Une urne contient 2 boules rouges, 3 vertes et 4 bleues. On tire 2 boules au hasard. \(X\) compte le nombre de boules rouges tirees et \(Y\) le nombre de boules vertes tirees. Donner la loi conjointe, puis les lois marginales.

Afficher l'indice Afficher la correction Marquer comme fait

**Indice**

Le denominateur est \(\binom92=36\). Pour \((X,Y)=(x,y)\), il faut choisir \(x\) rouges, \(y\) vertes et \(2-x-y\) bleues.

**Correction**

Pour \(x,y\ge0\) et \(x+y\le2\), \(P(X=x,Y=y)=\frac{\binom2x\binom3y\binom4{2-x-y}}{\binom92}\), avec une probabilite nulle hors support.

*   **Loi conjointe** : \(P(0,0)=\frac16\), \(P(0,1)=\frac13\), \(P(0,2)=\frac1{12}\), \(P(1,0)=\frac29\), \(P(1,1)=\frac16\), \(P(2,0)=\frac1{36}\).
*   **Loi de \(X\)** : \(P(X=0)=\frac7{12}\), \(P(X=1)=\frac7{18}\), \(P(X=2)=\frac1{36}\).
*   **Loi de \(Y\)** : \(P(Y=0)=\frac5{12}\), \(P(Y=1)=\frac12\), \(P(Y=2)=\frac1{12}\).

**Test rapide**

\(X\) et \(Y\) ne sont pas independantes : \(P(X=0,Y=0)=\frac16\), alors que \(P(X=0)P(Y=0)=\frac7{12}\times\frac5{12}=\frac{35}{144}\).
:::

:::section id="probabilites-methodes" eyebrow="Methodes obligatoires" title="Automatismes de resolution"
:::layout class="method-list"
:::card class="method-card" title="Choisir une formule de denombrement"
Quand l'utiliser

Avant une probabilite uniforme ou une question "combien".

Plan standard

Identifier l'objet, tester ordre/repetition, choisir \(n^p\), \(A_n^p\), \(n!\) ou \(\binom np\).

Erreur frequente

Compter des groupes comme des suites.
:::

:::card class="method-card" title="Utiliser un systeme complet"
Quand l'utiliser

Quand plusieurs cas exclusifs expliquent un evenement.

Plan standard

Nommer \(A_i\), verifier partition et probabilites non nulles, appliquer les probabilites totales.

Erreur frequente

Oublier un cas ou prendre des cas non disjoints.
:::

:::card class="method-card" title="Reconnaitre une loi discrete"
Quand l'utiliser

Quand une variable compte un nombre de succes, un rang, ou un nombre d'occurrences rares.

Plan standard

Identifier support, parametres, formule de \(P(X=k)\), esperance et variance.

Erreur frequente

Confondre binomiale et geometrique : nombre de succes fixe vs rang du premier succes.
:::

:::card class="method-card" title="Travailler avec une densite"
Quand l'utiliser

Quand une fonction \(f\) est donnee ou quand la variable est continue.

Plan standard

Verifier \(f\ge0\), normaliser, integrer sur le bon support, calculer \(F\), \(E\), \(V\).

Erreur frequente

Integrer hors support ou oublier la constante de normalisation.
:::

:::card class="method-card" title="Exploiter une loi conjointe discrete"
Quand l'utiliser

Quand deux variables sont etudiees ensemble ou quand un tableau \(P(X=x_i,Y=y_j)\) apparait.

Plan standard

Verifier que la somme vaut 1, sommer lignes/colonnes pour obtenir les marginales, tester \(p_{ij}=p_iq_j\) si l'independance est demandee.

Erreur frequente

Croire que les marginales suffisent toujours a retrouver la loi conjointe.
:::
:::
:::

:::section id="probabilites-td" eyebrow="TD" title="Documents d'entrainement disponibles" summary="Les PDF de TD sont repertories pour relier le cours aux exercices."
:::layout class="chapter-layout"
:::card class="chapter-card" pill="TD1" title="Denombrement"
Exercices de comptage, tirages, arrangements et combinaisons, avec corrections detaillees.

[Ouvrir la page corrigee](math-td1.html)
:::

:::card class="chapter-card" pill="TD2" title="Espaces probabilises" href="math-td2.html" link="Ouvrir la page corrigee"
Exercices de probabilites, conditionnement, totales, Bayes et independance, avec corrections detaillees.

[Ouvrir la page corrigee](math-td2.html)
:::

:::card class="chapter-card" pill="TD3" title="Variables aleatoires"
Exercices de lois discretes, esperance, variance et lois usuelles, avec corrections detaillees.

[Ouvrir la page corrigee](math-td3.html)
:::

:::card class="chapter-card" pill="TD4" title="Variables aleatoires continues"
Exercices de lois uniformes, normales, exponentielles, transformations et temps d'attente, avec corrections detaillees.

[Ouvrir la page corrigee](math-td4.html)
:::

:::card class="chapter-card" pill="TD5" title="Couples de variables aleatoires"
Exercices de lois conjointes, marginales, covariance, independance et transformations de couples, avec corrections detaillees.

[Ouvrir la page corrigee](math-td5.html)
:::
:::
:::

:::section id="probabilites-sujets" eyebrow="Examens" title="Sujets et corriges disponibles" summary="Les pages reprennent les sujets/corriges du dossier PDF avec la meme presentation que les TD."
:::layout class="chapter-layout"
:::card class="chapter-card" pill="Controle" title="Denombrement"
Interrogation sur cardinaux, arrangements, anagrammes et probabilites de tirage.

[Ouvrir la page corrigee](math-exam-controle-denombrement.html)
:::

:::card class="chapter-card" pill="Controle" title="Variables aleatoires"
Controle de cours et exercices sur esperance, variance, covariance et lois usuelles.

[Ouvrir la page corrigee](math-exam-controle-va.html)
:::

:::card class="chapter-card" pill="Partiel 1" title="Probabilites discretes"
Corrige de partiel autour des lois discretes, tableaux conjoints et esperances.

[Ouvrir la page corrigee](math-exam-partiel-1.html)
:::

:::card class="chapter-card" pill="Partiel 2" title="Variables continues"
Corrige de partiel avec loi normale, densites et calculs d'integrales.

[Ouvrir la page corrigee](math-exam-partiel-2.html)
:::

:::card class="chapter-card" pill="Partiel 3" title="Examen MT330"
QCM, densites, transformations de variables et exercices de synthese.

[Ouvrir la page corrigee](math-exam-partiel-3.html)
:::
:::
:::

:::section id="probabilites-revision" eyebrow="Revision finale" title="Liste de controle avant examen"
:::layout class="revision-grid"
:::card class="checklist" title="Definitions"
Ensemble fini/denombrable, p-liste, arrangement, combinaison, tribu, systeme complet, probabilite conditionnelle, independance, loi, densite.
:::

:::card class="checklist" title="Formules"
\(n^p\), \(A_n^p\), \(\binom np\), Newton, probabilites totales, Bayes, \(E\), \(V\), covariance, transfert.
:::

:::card class="checklist" title="Lois discretes"
Uniforme, Bernoulli, binomiale, geometrique, Poisson : support, probabilites, esperance, variance.
:::

:::card class="checklist" title="Lois continues"
Uniforme, exponentielle, normale centree reduite, normale generale : densite, repartition, esperance, variance, standardisation.
:::

:::card class="checklist" title="Couples discrets"
Loi conjointe, marginales par sommes, test d'independance, covariance et lois de sommes independantes binomiale/Poisson.
:::

:::card class="checklist" title="Erreurs frequentes"
Inverser une condition, confondre independance/incompatibilite, oublier de sommer a 1, mal choisir le support, confondre marginale et conjointe, appliquer Newton a des matrices non commutatives.
:::

:::card class="checklist" title="Mini-plan"
Jour 1 : chap. 1-2. Jour 2 : chap. 3. Jour 3 : chap. 4 + TD. Derniere session : sujet blanc en temps limite.
:::
:::
:::
