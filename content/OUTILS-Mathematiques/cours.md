---
title: OUTILS-Mathematiques - Revision ESISAR
subject: OUTILS-Mathematiques
type: course
---

:::section id="outils-maths-intro" eyebrow="Outils" title="Methodes mathematiques transverses" summary="Fiches hors semestre pour reprendre lentement les outils mathematiques utilises dans les cours techniques."
:::dashboard
:::card class="progress-card" kicker="Role" title="Boite a outils"
Ces pages ne remplacent pas les cours de semestre : elles expliquent les methodes que les cours utilisent souvent sans les reinstaller depuis le debut.
:::

:::card class="priority-card" kicker="Utilisation"
1. Partir du bouton `?` dans un cours.
2. Lire la methode generale.
3. Revenir a l'exemple du cours ou du TD.
4. Verifier que les hypotheses sont les memes.
:::
:::

:::quicklinks
- [Derivation](#outils-maths-derivation)
- [Integrales](#outils-maths-integrales)
- [Calcul matriciel](#outils-maths-matrices)
- [Transformees](#outils-maths-transformees)
- [Algebre lineaire](#outils-maths-algebre)
- [Calcul numerique](#outils-maths-calcul)
- [Probabilites](#outils-maths-probas)
:::
:::

:::section id="outils-maths-derivation" eyebrow="Prerequis" title="Derivation : variations, pentes et linearisation" summary="Comprendre ce que mesure une derivee, comment la calculer et comment elle sert dans les cours techniques."
:::grid variant="two-col"
:::block type="definition" title="Derivee comme pente locale"
La derivee de \(f\) en \(x\) mesure la pente instantanee de la courbe :

\[
f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}
\]

Interpretations utiles :

- en physique : vitesse si \(f\) est une position ;
- en electronique : sensibilite locale d'une sortie a une entree ;
- en automatique : evolution instantanee d'un etat ;
- en optimisation : direction de montee ou de descente.
:::

:::block type="method" title="Calculer une derivee sans se perdre"
1. Identifier la variable de derivation.
2. Reconnaitre les blocs : somme, produit, quotient, composition.
3. Appliquer les regles une par une.
4. Simplifier seulement a la fin.
5. Verifier l'unite ou l'ordre de grandeur.

Regles de base :

\[
(u+v)'=u'+v',\quad (uv)'=u'v+uv',\quad \left(\frac uv\right)'=\frac{u'v-uv'}{v^2}
\]

\[
(u\circ v)'=(u'\circ v)\,v'
\]
:::
:::

:::block type="remember" title="Table de derivation courante"
| Fonction \(f(x)\) | Derivee \(f'(x)\) | Remarque |
|---|---:|---|
| \(c\) | \(0\) | Une constante ne varie pas. |
| \(x\) | \(1\) | Pente unitaire. |
| \(x^n\) | \(nx^{n-1}\) | Valable pour les puissances reelles la ou la fonction est definie. |
| \(\frac1x\) | \(-\frac1{x^2}\) | Definie pour \(x\ne0\). |
| \(\sqrt{x}\) | \(\frac1{2\sqrt{x}}\) | Definie pour \(x>0\). |
| \(e^x\) | \(e^x\) | L'exponentielle est sa propre derivee. |
| \(e^{ax}\) | \(ae^{ax}\) | La constante \(a\) vient de la composition. |
| \(\ln(x)\) | \(\frac1x\) | Definie pour \(x>0\). |
| \(\sin(x)\) | \(\cos(x)\) | Attention aux radians. |
| \(\cos(x)\) | \(-\sin(x)\) | Le signe moins est frequent dans les erreurs. |
| \(\tan(x)\) | \(1+\tan^2(x)=\frac1{\cos^2(x)}\) | Definie quand \(\cos(x)\ne0\). |
:::

:::block type="method" title="Lire la table avec une composition"
Si l'argument n'est pas seulement \(x\), il faut multiplier par la derivee de l'argument.

\[
\frac{d}{dt}\sin(3t)=3\cos(3t),\qquad
\frac{d}{dt}e^{-2t}=-2e^{-2t}
\]

Reflexe : entourer mentalement l'interieur. Dans \(\sin(3t)\), la fonction exterieure est \(\sin\), l'interieur est \(3t\).
:::

:::grid variant="two-col"
:::block type="method" title="Exemple guide : derivee composee"
Soit :

\[
f(t)=e^{-2t}\sin(3t)
\]

C'est un produit \(u(t)v(t)\), avec \(u=e^{-2t}\) et \(v=\sin(3t)\).

\[
u'=-2e^{-2t},\qquad v'=3\cos(3t)
\]

Donc :

\[
f'(t)=u'v+uv'=e^{-2t}\left(-2\sin(3t)+3\cos(3t)\right)
\]

Lecture physique : l'exponentielle amortit l'oscillation, la derivee combine donc amortissement et variation sinusoidale.
:::

:::block type="definition" title="Linearisation locale"
Pres d'un point \(a\), une fonction reguliere peut etre approximee par sa tangente :

\[
f(a+\Delta x)\approx f(a)+f'(a)\Delta x
\]

C'est le principe utilise pour lineariser un capteur, un systeme non lineaire ou une equation autour d'un point de fonctionnement.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : lineariser un capteur resistif"
Supposons :

\[
V_s(R)=V_e\frac{R}{R_p+R}
\]

Autour de \(R=R_0\), on pose \(R=R_0+\Delta R\).

\[
\frac{dV_s}{dR}=V_e\frac{R_p}{(R_p+R)^2}
\]

Donc :

\[
V_s(R_0+\Delta R)\approx V_s(R_0)+V_e\frac{R_p}{(R_p+R_0)^2}\Delta R
\]

La pente est la sensibilite locale du conditionneur.
:::

:::block type="warning" title="Cas particuliers a reconnaitre"
- Derivee nulle : plateau local, gain local nul ou extremum possible.
- Derivee infinie ou non definie : rupture de pente, saturation, valeur absolue, seuil.
- Fonction paire : derivee impaire.
- Fonction impaire : derivee paire.
- Petite variation : on garde souvent seulement le premier ordre.
:::
:::
:::

:::section id="outils-maths-integrales" eyebrow="Prerequis" title="Integrales : aire, accumulation et moyenne" summary="Comprendre les integrales comme accumulation, primitive, moyenne et energie."
:::grid variant="two-col"
:::block type="definition" title="Integrale comme accumulation"
L'integrale additionne une grandeur continument :

\[
\int_a^b f(t)\,dt
\]

Selon le contexte, elle represente une aire, une charge, une energie, une quantite cumulee ou une moyenne apres division par la duree.
:::

:::block type="definition" title="Primitive"
Une primitive \(F\) de \(f\) verifie :

\[
F'(x)=f(x)
\]

Alors :

\[
\int_a^b f(x)\,dx=F(b)-F(a)
\]

Le calcul d'integrale revient souvent a reconnaitre la fonction qui a ete derivee.
:::
:::

:::block type="remember" title="Table d'integration courante"
| Fonction a integrer \(f(x)\) | Primitive \(F(x)\) | Condition / remarque |
|---|---:|---|
| \(0\) | \(C\) | Toute constante convient. |
| \(1\) | \(x+C\) | Aire d'un rectangle de hauteur 1. |
| \(x^n\) | \(\frac{x^{n+1}}{n+1}+C\) | Valable si \(n\ne -1\). |
| \(\frac1x\) | \(\ln|x|+C\) | Sur un intervalle qui ne traverse pas 0. |
| \(e^x\) | \(e^x+C\) | Meme forme que la derivee. |
| \(e^{ax}\) | \(\frac1a e^{ax}+C\) | Si \(a\ne0\). |
| \(\sin(x)\) | \(-\cos(x)+C\) | Car \((-\cos)'=\sin\). |
| \(\cos(x)\) | \(\sin(x)+C\) | Cas le plus direct. |
| \(\frac1{1+x^2}\) | \(\arctan(x)+C\) | Apparait dans certains calculs de phase. |
| \(\cos^2(x)\) | \(\frac{x}{2}+\frac{\sin(2x)}{4}+C\) | Utiliser \(\cos^2(x)=\frac{1+\cos(2x)}2\). |
| \(\sin^2(x)\) | \(\frac{x}{2}-\frac{\sin(2x)}{4}+C\) | Utile pour les valeurs efficaces. |
:::

:::block type="method" title="Lire la table avec un coefficient"
Quand l'argument est \(ax+b\), on compense par \(\frac1a\) :

\[
\int \cos(3t)\,dt=\frac13\sin(3t)+C
\]

Verification rapide :

\[
\left(\frac13\sin(3t)\right)'=\cos(3t)
\]
:::

:::grid variant="two-col"
:::block type="method" title="Exemple guide : integrale polynomiale"
Calculer :

\[
\int_0^2 (3t^2-4t+1)\,dt
\]

Une primitive est :

\[
F(t)=t^3-2t^2+t
\]

Donc :

\[
F(2)-F(0)=8-8+2=2
\]

Cas particulier : une aire algebrique peut etre positive, nulle ou negative selon le signe de la fonction.
:::

:::block type="method" title="Integration par parties"
Quand on integre un produit, on peut utiliser :

\[
\int u'v = uv-\int uv'
\]

Exemple :

\[
\int_0^1 te^t\,dt
\]

Prendre \(u'=e^t\), \(v=t\), donc \(u=e^t\), \(v'=1\).

\[
\int_0^1 te^t\,dt=[te^t]_0^1-\int_0^1 e^t\,dt=e-(e-1)=1
\]
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Valeur moyenne"
La moyenne d'une fonction sur \([a,b]\) vaut :

\[
\bar f=\frac{1}{b-a}\int_a^b f(t)\,dt
\]

Pour un signal periodique de periode \(T\) :

\[
\bar f=\frac1T\int_0^T f(t)\,dt
\]
:::

:::block type="remember" title="Cas particuliers utiles"
- Integrale d'une fonction impaire sur \([-a,a]\) : zero.
- Integrale d'une fonction paire sur \([-a,a]\) : deux fois l'integrale sur \([0,a]\).
- Integrale de \(\sin(k\omega t)\) sur une periode entiere : zero.
- Integrale de \(\cos^2(\omega t)\) sur une periode : \(T/2\).
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : valeur efficace"
Pour \(u(t)=U_m\sin(\omega t)\), la valeur efficace est :

\[
U_{\mathrm{eff}}=\sqrt{\frac1T\int_0^T u^2(t)\,dt}
\]

Or la moyenne de \(\sin^2\) sur une periode vaut \(1/2\), donc :

\[
U_{\mathrm{eff}}=\frac{U_m}{\sqrt2}
\]
:::

:::block type="warning" title="Piege classique"
Ne pas confondre moyenne et valeur efficace. Une sinusoide centree a une moyenne nulle, mais une valeur efficace non nulle.
:::
:::
:::

:::section id="outils-maths-matrices" eyebrow="Prerequis" title="Calcul matriciel : systemes, produits et determinants" summary="Reprendre les gestes de calcul matriciel avant rang, diagonalisation et espace d'etat."
:::grid variant="two-col"
:::block type="definition" title="Produit matrice vecteur"
Une matrice transforme un vecteur en combinant ses composantes. Si :

\[
A=\begin{bmatrix}1&2\\3&4\end{bmatrix},\qquad x=\begin{bmatrix}5\\6\end{bmatrix}
\]

alors :

\[
Ax=\begin{bmatrix}1\cdot5+2\cdot6\\3\cdot5+4\cdot6\end{bmatrix}
=\begin{bmatrix}17\\39\end{bmatrix}
\]
:::

:::block type="method" title="Multiplier deux matrices"
Pour calculer \(C=AB\), l'element \(c_{ij}\) est le produit ligne \(i\) de \(A\) par colonne \(j\) de \(B\).

\[
c_{ij}=\sum_k a_{ik}b_{kj}
\]

Reflexe : verifier les dimensions avant tout calcul. Si \(A\) est \(m\times n\), alors \(B\) doit avoir \(n\) lignes.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : produit non commutatif"
Soit :

\[
A=\begin{bmatrix}1&1\\0&1\end{bmatrix},\qquad B=\begin{bmatrix}1&0\\1&1\end{bmatrix}
\]

\[
AB=\begin{bmatrix}2&1\\1&1\end{bmatrix},\qquad BA=\begin{bmatrix}1&1\\1&2\end{bmatrix}
\]

Donc en general \(AB\ne BA\). Cet ordre est crucial dans les changements de base et les representations d'etat.
:::

:::block type="definition" title="Matrice inverse"
Une matrice carree \(A\) est inversible s'il existe \(A^{-1}\) telle que :

\[
AA^{-1}=A^{-1}A=I
\]

Pour une matrice \(2\times2\) :

\[
\begin{bmatrix}a&b\\c&d\end{bmatrix}^{-1}
=\frac1{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}
\]

si \(ad-bc\ne0\).
:::
:::

:::grid variant="two-col"
:::block type="method" title="Resoudre un systeme lineaire"
Pour resoudre \(Ax=b\) :

1. Ecrire la matrice augmentee \([A|b]\).
2. Faire un pivot de Gauss.
3. Chercher les pivots.
4. Lire les inconnues.
5. Interpreter si une ligne devient impossible ou libre.

Cas possibles : solution unique, aucune solution, infinite de solutions.
:::

:::block type="warning" title="Cas particuliers"
- Determinant nul : matrice non inversible.
- Deux lignes proportionnelles : rang deficient.
- Colonne nulle dans une matrice de commandabilite : entree inefficace sur une direction.
- Ligne nulle dans une matrice d'observabilite : sortie aveugle a une direction.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : determinant et inverse"
Soit :

\[
A=\begin{bmatrix}2&1\\5&3\end{bmatrix}
\]

\[
\det A=2\cdot3-1\cdot5=1
\]

La matrice est inversible et :

\[
A^{-1}=\begin{bmatrix}3&-1\\-5&2\end{bmatrix}
\]

Verification rapide :

\[
AA^{-1}=I
\]
:::

:::block type="remember" title="Lecture geometrique"
Une matrice \(2\times2\) transforme le plan. Le determinant mesure le facteur d'aire oriente. S'il vaut zero, le plan est ecrase sur une droite ou un point.
:::
:::
:::

:::section id="outils-maths-transformees" eyebrow="Methodes" title="Transformees et lecture frequentielle" summary="Fourier, Laplace, convolution et passage temps-frequence."
:::grid variant="two-col"
:::block type="definition" title="Transformee de Fourier"
La transformee de Fourier decrit un signal par ses frequences. Elle repond a la question : quelles sinusoides faut-il additionner pour reconstruire ce signal ?

\[
X(f)=\int_{-\infty}^{+\infty}x(t)e^{-j2\pi ft}\,dt
\]

Lecture pratique :

- un signal lent occupe les basses frequences ;
- une discontinuité ou une variation rapide ajoute des hautes frequences ;
- un filtrage revient a attenuer certaines zones du spectre.
:::

:::block type="method" title="Utiliser Fourier dans un exercice"
1. Identifier si le signal est periodique ou non.
2. Pour un signal periodique, raisonner en serie de Fourier.
3. Pour un signal non periodique, raisonner en transformee de Fourier.
4. Repérer les symetries : pair, impair, reel, imaginaire.
5. Traduire le resultat physiquement : largeur de bande, energie, periodicite.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : creneau pair"
Un signal carre pair de periode \(2\pi\) contient seulement des cosinus dans sa serie de Fourier. On gagne du temps avant meme de calculer :

\[
b_n=0
\]

car le produit d'une fonction paire par \(\sin(nx)\), impair, s'integre a zero sur \([-\pi,\pi]\).

Cas particulier utile : si le signal est impair, ce sont les coefficients \(a_n\) qui disparaissent.
:::

:::block type="remember" title="Lire les symetries avant de calculer"
Avant une integrale de Fourier, regarder :

- pair : cosinus seulement ;
- impair : sinus seulement ;
- moyenne nulle : coefficient constant nul ;
- discontinuite : convergence vers la demi-somme des limites gauche et droite.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Transformee de Laplace"
La transformee de Laplace transforme une equation differentielle en equation algebrique. En automatique, on l'utilise surtout avec conditions initiales nulles pour former une fonction de transfert.

\[
H(p)=\frac{Y(p)}{U(p)}
\]

Le parametre \(p\) porte a la fois une croissance/decroissance et une oscillation. Les poles de \(H(p)\) donnent la dynamique.
:::

:::block type="method" title="Passer d'une equation differentielle a Laplace"
1. Placer tous les termes de sortie d'un cote, tous les termes d'entree de l'autre.
2. Remplacer \(\dot y\) par \(pY(p)\), \(\ddot y\) par \(p^2Y(p)\).
3. Factoriser \(Y(p)\) et \(U(p)\).
4. Former \(H(p)=Y(p)/U(p)\).
5. Lire ordre, gain statique, poles et zeros.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : premier ordre physique"
On part de l'equation :

\[
T\dot y(t)+y(t)=Ku(t)
\]

Avec conditions initiales nulles :

\[
TpY(p)+Y(p)=KU(p)
\]

Donc :

\[
H(p)=\frac{Y(p)}{U(p)}=\frac{K}{1+Tp}
\]

Cas particuliers :

- \(T\) grand : systeme lent ;
- \(K\) grand : sortie amplifiee ;
- \(T<0\) dans ce modele : pole instable.
:::

:::block type="warning" title="Conditions initiales"
Une fonction de transfert se calcule en general avec conditions initiales nulles. Si les conditions initiales ne sont pas nulles, elles ajoutent des termes propres a la reponse libre.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Convolution"
La convolution mesure l'effet cumule d'une entree passee a travers la reponse impulsionnelle d'un systeme.

\[
y(t)=(h*x)(t)=\int_{-\infty}^{+\infty}h(\tau)x(t-\tau)\,d\tau
\]

En frequence, elle devient un produit :

\[
Y(f)=H(f)X(f)
\]
:::

:::block type="remember" title="Reflexe temps frequence"
Si une expression est lourde dans le temps, regarder si elle devient simple en frequence. Convolution dans le temps signifie multiplication des spectres ; produit dans le temps signifie convolution des spectres.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : moyenne glissante"
Une moyenne glissante de duree \(T\) peut s'ecrire comme une convolution avec :

\[
h(t)=\frac1T \quad \text{sur } [0,T]
\]

La sortie est :

\[
y(t)=\frac1T\int_{t-T}^{t}x(\tau)\,d\tau
\]

Elle lisse le signal : les variations rapides sont attenuees.
:::

:::block type="remember" title="Cas particulier : Dirac"
Convoluer par une impulsion de Dirac ne change pas le signal :

\[
x*\delta=x
\]

Convoluer par un Dirac decale decale le signal :

\[
x*\delta(t-\tau)=x(t-\tau)
\]
:::
:::
:::

:::section id="outils-maths-algebre" eyebrow="Methodes" title="Algebre lineaire pour systemes" summary="Rang, noyau, image, valeurs propres et changements de base."
:::grid variant="two-col"
:::block type="definition" title="Rang, noyau et image"
Pour une matrice \(A\), l'image regroupe ce que \(A\) peut produire, le noyau regroupe ce que \(A\) annule.

\[
\ker A=\{x\mid Ax=0\}
\]

Le rang mesure le nombre de directions independantes produites par la matrice.
:::

:::block type="method" title="Tester un rang"
1. Construire la matrice a tester.
2. Effectuer un pivot de Gauss.
3. Compter les pivots non nuls.
4. Comparer au nombre de lignes ou de colonnes attendu.
5. Interpreter : direction manquante, redondance ou degre de liberte.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : rang par pivot"
Soit :

\[
A=\begin{bmatrix}
1&2&3\\
2&4&6\\
0&1&1
\end{bmatrix}
\]

La deuxieme ligne vaut deux fois la premiere. Elle n'apporte pas de nouvelle direction. Les lignes 1 et 3 sont independantes, donc :

\[
\mathrm{rang}(A)=2
\]

Cas particulier : une matrice \(3\times3\) de rang 2 n'est pas inversible.
:::

:::block type="remember" title="Lire noyau et image"
Si \(A\) a \(n\) colonnes :

\[
\dim(\ker A)+\mathrm{rang}(A)=n
\]

Une perte de rang signifie qu'au moins une direction est invisible, inaccessible ou redondante selon le contexte.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Valeurs propres et diagonalisation"
Une valeur propre \(\lambda\) de \(A\) verifie :

\[
Av=\lambda v
\]

Le vecteur \(v\) garde sa direction ; seule son amplitude est multipliee par \(\lambda\). En dynamique lineaire, ces valeurs propres deviennent des modes naturels.
:::

:::block type="method" title="Diagonaliser une matrice"
1. Calculer \(P_A(\lambda)=\det(A-\lambda I)\).
2. Trouver les valeurs propres.
3. Chercher une base de vecteurs propres.
4. Verifier qu'il y a assez de vecteurs independants.
5. Former \(A=PDP^{-1}\) si la matrice est diagonalisable.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : valeurs propres simples"
Soit :

\[
A=\begin{bmatrix}2&0\\0&-1\end{bmatrix}
\]

La matrice est deja diagonale. Ses valeurs propres sont \(2\) et \(-1\), avec les directions des axes.

Pour le systeme \(\dot x=Ax\), une composante croit comme \(e^{2t}\), l'autre decroit comme \(e^{-t}\). Le systeme est donc instable a cause de la valeur propre positive.
:::

:::block type="warning" title="Cas particulier : valeur propre multiple"
Une valeur propre double ne garantit pas deux vecteurs propres independants. Exemple classique :

\[
A=\begin{bmatrix}1&1\\0&1\end{bmatrix}
\]

La seule valeur propre est \(1\), mais il n'y a qu'une direction propre. La matrice n'est pas diagonalisable.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Changement de base"
Changer de base ne change pas le systeme, seulement ses coordonnees. Si \(x=Tz\), alors :

\[
\dot z=T^{-1}ATz+T^{-1}Bu
\]

Les matrices changent, mais les valeurs propres et la dynamique physique restent les memes.
:::

:::block type="warning" title="Piege classique"
Une base plus pratique ne rend pas un systeme plus stable ou plus commandable. Elle rend seulement certaines proprietes plus visibles.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : changement de base diagonal"
Si :

\[
A=PDP^{-1}
\]

alors dans la base des vecteurs propres, la dynamique devient :

\[
\dot z=Dz
\]

Les equations sont decouplees : chaque composante evolue selon sa valeur propre. C'est la raison pour laquelle la diagonalisation est si utile en automatique.
:::

:::block type="remember" title="Ce qui reste invariant"
Un changement de base conserve :

- les valeurs propres ;
- le determinant ;
- la trace ;
- la commandabilite et l'observabilite, si la transformation est inversible.
:::
:::
:::

:::section id="outils-maths-calcul" eyebrow="Methodes" title="Calcul numerique et equations" summary="Erreurs, conditionnement, point fixe, Newton et schemas d'EDO."
:::grid variant="two-col"
:::block type="definition" title="Erreurs et conditionnement"
Un calcul numerique manipule des nombres arrondis. L'erreur finale vient a la fois des donnees, des arrondis et de la sensibilite du probleme.

Un probleme est mal conditionne si une petite erreur d'entree peut provoquer une grande erreur de sortie.
:::

:::block type="method" title="Lire une erreur numerique"
1. Se demander si l'erreur vient du modele, des donnees ou du calcul.
2. Repérer les soustractions de nombres proches.
3. Surveiller les divisions par des petites quantites.
4. Comparer erreur absolue et erreur relative.
5. Ne pas confondre algorithme stable et probleme bien conditionne.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Point fixe"
Resoudre \(f(x)=0\) peut se transformer en recherche de \(x=g(x)\). On itere :

\[
x_{n+1}=g(x_n)
\]

La convergence depend de la contraction : si \(|g'(x)|<1\) autour de la solution, l'iteration a de bonnes chances de converger.
:::

:::block type="definition" title="Newton-Raphson"
Newton remplace localement la fonction par sa tangente :

\[
x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}
\]

C'est rapide pres de la solution, mais fragile si le point initial est mauvais ou si \(f'(x_n)\) est petit.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : point fixe convergent"
Pour resoudre \(x=\cos x\), on pose :

\[
x_{n+1}=\cos(x_n)
\]

En partant de \(x_0=1\), la suite se rapproche d'environ \(0{,}739\). Localement, \(|-\sin(0{,}739)|<1\), donc l'iteration est contractante pres de la solution.
:::

:::block type="warning" title="Cas divergent"
La forme choisie compte. Pour la meme equation, une transformation equivalente peut diverger si \(|g'(x^\*)|>1\). Le point fixe n'est pas seulement une equation, c'est aussi un algorithme.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : Newton sur x^2-2"
On cherche \(\sqrt2\) comme racine de \(f(x)=x^2-2\).

\[
x_{n+1}=x_n-\frac{x_n^2-2}{2x_n}
=\frac12\left(x_n+\frac2{x_n}\right)
\]

Avec \(x_0=1\) :

\[
x_1=1{,}5,\quad x_2=1{,}4167,\quad x_3\approx1{,}4142
\]

La convergence devient tres rapide pres de la solution.
:::

:::block type="remember" title="Quand Newton est fragile"
Newton peut echouer si :

- \(f'(x_n)\) est proche de zero ;
- le point initial est trop loin ;
- la fonction a plusieurs racines proches ;
- la tangente envoie hors du domaine utile.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Euler et Runge-Kutta"
Pour une EDO \(\dot y=f(t,y)\), Euler explicite utilise :

\[
y_{n+1}=y_n+hf(t_n,y_n)
\]

Runge-Kutta ameliore l'estimation de la pente en plusieurs evaluations intermediaires. Plus l'ordre est eleve, plus le pas peut etre efficace, mais la stabilite reste a verifier.
:::

:::block type="warning" title="Stabilite numerique"
Un schema peut diverger meme si la solution exacte est stable. Quand le probleme est raide, les methodes explicites imposent souvent un pas tres petit.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : Euler sur une décroissance"
Pour :

\[
\dot y=-ay,\qquad a>0
\]

Euler explicite donne :

\[
y_{n+1}=y_n+h(-ay_n)=(1-ah)y_n
\]

La solution numerique decroit seulement si \(|1-ah|<1\), donc :

\[
0<h<\frac2a
\]

Cas particulier : si \(a\) est grand, le pas stable doit etre tres petit.
:::

:::block type="remember" title="Ordre et pas"
Diviser le pas par 2 reduit typiquement l'erreur globale :

- d'environ 2 pour Euler ordre 1 ;
- d'environ 4 pour RK2 ;
- d'environ 16 pour RK4.

Cette regle suppose que le schema est dans sa zone de stabilite.
:::
:::
:::

:::section id="outils-maths-probas" eyebrow="Methodes" title="Probabilites utiles" summary="Lois discretes, lois continues et standardisation."
:::grid variant="two-col"
:::block type="definition" title="Variable aleatoire discrete"
Une variable discrete prend des valeurs isolees. Sa loi est donnee par des probabilites \(P(X=x_i)\), qui doivent toutes etre positives et sommer a 1.
:::

:::block type="definition" title="Variable aleatoire continue"
Une variable continue se decrit par une densite \(f_X\). On calcule une probabilite par une aire :

\[
P(a\le X\le b)=\int_a^b f_X(x)\,dx
\]
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : loi binomiale"
On lance 10 fois une experience qui reussit avec probabilite \(p=0{,}2\). Le nombre de succes \(X\) suit :

\[
X\sim\mathcal B(10,0{,}2)
\]

La probabilite d'obtenir exactement 3 succes vaut :

\[
P(X=3)=\binom{10}{3}0{,}2^3\,0{,}8^7
\]

Cas particulier : si \(n\) est grand et \(p\) petit, une approximation de Poisson peut etre pertinente.
:::

:::block type="method" title="Exemple : densite uniforme"
Si \(X\sim\mathcal U([a,b])\), alors :

\[
f_X(x)=\frac1{b-a}\quad \text{sur }[a,b]
\]

Donc :

\[
P(c\le X\le d)=\frac{d-c}{b-a}
\]

si \(a\le c\le d\le b\).
:::
:::

:::grid variant="two-col"
:::block type="method" title="Standardiser une normale"
Si \(X\sim\mathcal N(\mu,\sigma)\), alors :

\[
Z=\frac{X-\mu}{\sigma}
\]

permet d'utiliser la table de la loi normale centree reduite.
:::

:::block type="remember" title="Choisir la bonne loi"
Binomiale : nombre de succes dans \(n\) essais. Poisson : comptage rare sur un intervalle. Exponentielle : temps d'attente sans memoire. Normale : fluctuations cumulatives autour d'une moyenne.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : standardisation"
Si \(X\sim\mathcal N(100,15)\), calculer \(P(X\le130)\) revient a poser :

\[
Z=\frac{X-100}{15}
\]

Donc :

\[
P(X\le130)=P\left(Z\le\frac{30}{15}\right)=P(Z\le2)
\]

On lit ensuite la table de la loi normale centree reduite.
:::

:::block type="warning" title="Continu vs discret"
Pour une variable continue :

\[
P(X=a)=0
\]

Donc \(P(a\le X\le b)=P(a<X<b)\). Ce n'est pas vrai pour une variable discrete.
:::
:::
:::
