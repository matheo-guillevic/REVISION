---
title: OUTILS-Automatique - Revision ESISAR
subject: OUTILS-Automatique
type: course
---

:::section id="outils-auto-intro" eyebrow="Outils" title="Methodes d'automatique transverses" summary="Fiches hors semestre pour les methodes reutilisees en AU361, AU425 et dans les TD."
:::dashboard
:::card class="progress-card" kicker="But" title="Revenir aux gestes"
Ces outils explicitent les gestes recurrents : modeliser, lire une dynamique, tracer un Bode, verifier les marges, passer en espace d'etat et synthetiser une commande.
:::

:::card class="priority-card" kicker="Reflexe"
Quand un cours utilise une methode sans la redemontrer, ouvrir l'outil, refaire le mini-protocole, puis revenir au calcul du cours.
:::
:::

:::quicklinks
- [Modelisation](#outils-auto-modelisation)
- [Laplace](#outils-auto-laplace)
- [Schemas blocs](#outils-auto-schemas-blocs)
- [Analyse](#outils-auto-analyse)
- [Commande](#outils-auto-commande)
- [Espace d'etat](#outils-auto-etat)
:::
:::

:::section id="outils-auto-modelisation" eyebrow="Methodes" title="Modeliser un systeme" summary="Fonction de transfert, premiers ordres et seconds ordres."
:::grid variant="two-col"
:::block type="definition" title="Fonction de transfert"
La fonction de transfert relie entree et sortie dans le domaine de Laplace :

\[
H(p)=\frac{Y(p)}{U(p)}
\]

Elle suppose un systeme lineaire invariant et, en general, des conditions initiales nulles.
:::

:::block type="method" title="Construire une fonction de transfert"
1. Choisir entree \(u\) et sortie \(y\).
2. Ecrire la loi physique.
3. Lineariser si necessaire autour du point de fonctionnement.
4. Appliquer Laplace.
5. Isoler \(Y(p)/U(p)\).
6. Lire gain, poles, zeros et ordre.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Premier ordre"
Un premier ordre s'ecrit :

\[
H(p)=\frac{K}{1+Tp}
\]

Il est caracterise par son gain \(K\) et sa constante de temps \(T\). Apres un echelon, il atteint environ 95 % de sa valeur finale en \(3T\).
:::

:::block type="definition" title="Second ordre"
Un second ordre canonique s'ecrit :

\[
H(p)=\frac{K\omega_n^2}{p^2+2\xi\omega_np+\omega_n^2}
\]

Le coefficient \(\xi\) regle l'amortissement : faible \(\xi\), reponse oscillante ; grand \(\xi\), reponse plus lente et amortie.
:::
:::
:::

:::section id="outils-auto-laplace" eyebrow="Prerequis" title="Transformee de Laplace pour l'automatique" summary="Passer proprement du temps vers le domaine de Laplace, lire les poles et revenir au sens physique."
:::grid variant="two-col"
:::block type="definition" title="Pourquoi Laplace en automatique"
Les systemes physiques donnent souvent des equations differentielles :

\[
a_2\ddot y(t)+a_1\dot y(t)+a_0y(t)=b_0u(t)
\]

Laplace transforme les derivees en multiplications par \(p\). Le probleme devient algebrique :

\[
\dot y(t)\longrightarrow pY(p),\qquad \ddot y(t)\longrightarrow p^2Y(p)
\]

Avec conditions initiales nulles, on peut isoler directement le rapport \(Y(p)/U(p)\).
:::

:::block type="method" title="Table minimale de Laplace"
Les correspondances les plus utiles en automatique :

\[
1 \longleftrightarrow \frac1p,\qquad e^{-at}\longleftrightarrow \frac1{p+a}
\]

\[
\dot y(t)\longleftrightarrow pY(p)-y(0^+)
\]

\[
\int_0^t u(\tau)d\tau \longleftrightarrow \frac{U(p)}p
\]

En fonction de transfert, on met souvent les conditions initiales a zero pour ne garder que le lien entree-sortie.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple complet : systeme masse amortisseur"
On considere :

\[
M\ddot x(t)+f\dot x(t)=F(t)
\]

Entree : force \(F\). Sortie : position \(x\). Avec conditions initiales nulles :

\[
Mp^2X(p)+fpX(p)=F(p)
\]

On factorise :

\[
X(p)(Mp^2+fp)=F(p)
\]

Donc :

\[
H(p)=\frac{X(p)}{F(p)}=\frac1{Mp^2+fp}=\frac1{p(Mp+f)}
\]

Lecture : un integrateur vient de la position, l'autre dynamique vient de l'inertie et du frottement.
:::

:::block type="method" title="Exemple : circuit RC"
Pour un circuit RC passe-bas :

\[
RC\dot v_s(t)+v_s(t)=v_e(t)
\]

Laplace donne :

\[
RCpV_s(p)+V_s(p)=V_e(p)
\]

Donc :

\[
H(p)=\frac{V_s(p)}{V_e(p)}=\frac1{1+RCp}
\]

Le pole est \(p=-1/RC\), la constante de temps est \(T=RC\).
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Poles, zeros et stabilite"
Pour :

\[
H(p)=\frac{N(p)}{D(p)}
\]

- les zeros sont les racines de \(N(p)\) ;
- les poles sont les racines de \(D(p)\) ;
- la stabilite continue depend des poles : ils doivent etre dans le demi-plan gauche.

Un pole proche de l'axe imaginaire donne une dynamique lente. Un pole a partie reelle positive donne une divergence.
:::

:::block type="warning" title="Conditions initiales non nulles"
Si \(y(0^+)\ne0\), alors :

\[
\mathcal L(\dot y)=pY(p)-y(0^+)
\]

Ces termes representent la reponse libre du systeme. Ils ne doivent pas etre inclus dans la fonction de transfert, qui decrit seulement le lien entree-sortie avec conditions initiales nulles.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Retrouver l'equation temporelle"
Si :

\[
H(p)=\frac{Y(p)}{U(p)}=\frac{2}{p^2+3p+2}
\]

alors :

\[
(p^2+3p+2)Y(p)=2U(p)
\]

Retour au temps :

\[
\ddot y(t)+3\dot y(t)+2y(t)=2u(t)
\]

Ce sens inverse est utile pour verifier qu'une fonction de transfert correspond bien a un modele physique.
:::

:::block type="remember" title="Cas particuliers a reconnaitre"
- \(1/p\) : integrateur, memoire, phase \(-90^\circ\).
- \(K/(1+Tp)\) : premier ordre stable si \(T>0\).
- \(e^{-\tau p}\) : retard pur, module inchange mais phase degradee.
- pole en zero : erreur statique reduite, mais stabilite plus delicate.
:::
:::
:::

:::section id="outils-auto-schemas-blocs" eyebrow="Prerequis" title="Lire et construire des schemas blocs" summary="Identifier les signaux, reduire les boucles et traduire un modele en schema."
:::grid variant="two-col"
:::block type="definition" title="Elements d'un schema bloc"
Un schema bloc represente les relations entre signaux.

- Une fleche porte un signal.
- Un bloc transforme son entree : \(Y(p)=G(p)U(p)\).
- Un sommateur additionne ou soustrait des signaux.
- Un point de prelevement copie un signal sans le modifier.
- Une boucle de retour compare souvent la consigne a la sortie.

Le schema bloc est donc une ecriture graphique d'equations algebriques dans le domaine de Laplace.
:::

:::block type="method" title="Lire un schema bloc"
1. Nommer chaque signal important : \(R\), \(E\), \(U\), \(Y\), \(B\).
2. Ecrire l'equation de chaque sommateur.
3. Ecrire l'equation de chaque bloc.
4. Remonter progressivement vers le signal demande.
5. Isoler le rapport voulu, par exemple \(Y/R\), \(Y/D\) ou \(E/R\).
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Boucle fermee negative"
Pour une chaine directe \(G(p)\) et un retour \(H(p)\) negatif :

\[
E(p)=R(p)-H(p)Y(p)
\]

\[
Y(p)=G(p)E(p)
\]

Donc :

\[
\frac{Y(p)}{R(p)}=\frac{G(p)}{1+G(p)H(p)}
\]

Si le retour est unitaire, \(H(p)=1\).
:::

:::block type="warning" title="Signe du retour"
Le signe dans le denominateur depend du sommateur. Retour negatif :

\[
1+GH
\]

Retour positif :

\[
1-GH
\]

Une erreur de signe change totalement la stabilite.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple : asservissement unitaire"
On a un correcteur \(C(p)\), un procede \(P(p)\), un retour unitaire.

\[
E=R-Y,\qquad U=CE,\qquad Y=PU
\]

Donc :

\[
Y=PC(R-Y)
\]

\[
Y(1+PC)=PCR
\]

\[
\frac{Y}{R}=\frac{PC}{1+PC}
\]

Le transfert de boucle est \(L(p)=C(p)P(p)\).
:::

:::block type="method" title="Erreur et sensibilite"
Dans le meme schema :

\[
E=R-Y
\]

Comme \(Y/R=L/(1+L)\), on obtient :

\[
\frac{E}{R}=1-\frac{L}{1+L}=\frac1{1+L}
\]

Cette fonction \(S(p)=1/(1+L(p))\) est la sensibilite. Elle dit comment l'erreur reagit aux consignes et perturbations.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Blocs en serie et en parallele"
Deux blocs en serie se multiplient :

\[
G_1 \rightarrow G_2 \quad \Rightarrow \quad G_{\mathrm{eq}}=G_1G_2
\]

Deux blocs en parallele s'additionnent :

\[
G_{\mathrm{eq}}=G_1+G_2
\]

Attention : les blocs doivent avoir la meme entree et leurs sorties doivent etre additionnees au meme sommateur.
:::

:::block type="method" title="Reduire un schema complexe"
1. Simplifier d'abord les blocs en serie evidents.
2. Simplifier les paralleles evidents.
3. Reduire les petites boucles internes.
4. Recommencer jusqu'a obtenir une seule chaine ou une seule boucle.
5. Si le schema devient confus, revenir aux equations de signaux.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Construire un schema bloc depuis une equation"
Pour :

\[
\dot x=-ax+bu,\qquad y=cx
\]

On isole la derivee :

\[
\dot x=bu-ax
\]

Construction :

1. Un sommateur calcule \(bu-ax\).
2. Un integrateur \(1/p\) transforme \(\dot x\) en \(x\).
3. Un gain \(b\) multiplie l'entree \(u\).
4. Un gain \(-a\) retourne l'etat \(x\) vers le sommateur.
5. Un gain \(c\) donne la sortie \(y\).
:::

:::block type="remember" title="Lire la memoire"
Dans un schema bloc d'etat, les integrateurs \(1/p\) portent la memoire. Leur sortie est l'etat \(x\), leur entree est \(\dot x\). Si le schema ne contient aucun integrateur, il ne decrit pas une dynamique continue autonome.
:::
:::

:::grid variant="two-col"
:::block type="warning" title="Pieges classiques"
- Confondre signal et transfert : \(Y\) est un signal, \(G\) est un bloc.
- Oublier le signe du sommateur.
- Deplacer un prelevement a travers un bloc sans compenser par ce bloc.
- Melanger \(Y/R\), \(Y/D\), \(E/R\) : ce ne sont pas les memes transferts.
- Simplifier un pole et un zero sans se demander si le mode cache reste interne.
:::

:::block type="method" title="Question reflexe devant un schema"
Demande-toi toujours :

1. Quelle est l'entree et quelle est la sortie ?
2. Quel signal est compare au sommateur ?
3. Quelle est la chaine directe ?
4. Quelle est la chaine de retour ?
5. Quelle fonction de transfert cherche-t-on vraiment ?
:::
:::
:::

:::section id="outils-auto-analyse" eyebrow="Methodes" title="Analyser une boucle" summary="Bode, Nyquist, marges, precision et stabilite."
:::grid variant="two-col"
:::block type="definition" title="Diagramme de Bode"
Bode separe module et phase en fonction de la pulsation. C'est l'outil le plus rapide pour voir bande passante, resonance, retard de phase et marges.
:::

:::block type="method" title="Tracer un Bode a la main"
1. Factoriser la fonction de transfert.
2. Identifier gain, integrateurs, poles, zeros et retard.
3. Tracer les asymptotes de module.
4. Additionner les contributions de phase.
5. Corriger autour des pulsations de cassure.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Marges de stabilite"
La marge de phase mesure la distance angulaire au point critique lorsque le module vaut 1. La marge de gain mesure le facteur de gain restant avant instabilite lorsque la phase vaut \(-180^\circ\).
:::

:::block type="method" title="Lire les marges"
1. Tracer ou lire le transfert de boucle \(L(p)\).
2. Trouver \(\omega_c\) tel que \(|L(j\omega_c)|=1\).
3. Lire la phase a cette pulsation.
4. Calculer la marge de phase.
5. Trouver la pulsation ou la phase vaut \(-180^\circ\).
6. Lire la marge de gain.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Precision statique"
La precision statique decrit l'erreur en regime permanent. Elle depend du gain de boucle a basse frequence et du nombre d'integrateurs.
:::

:::block type="warning" title="Compromis classique"
Augmenter le gain ameliore souvent la precision, mais reduit les marges et peut rendre la boucle oscillante.
:::
:::
:::

:::section id="outils-auto-commande" eyebrow="Methodes" title="Synthese de commande" summary="PID, effet integral, modele interne et placement de poles."
:::grid variant="two-col"
:::block type="definition" title="Correcteur PID"
Un PID combine action proportionnelle, integrale et derivee :

\[
C(p)=K_p+\frac{K_i}{p}+K_dp
\]

Le proportionnel agit sur la rapidite, l'integral annule certaines erreurs statiques, le derive anticipe mais amplifie le bruit.
:::

:::block type="method" title="Regler qualitativement un PID"
1. Ajuster \(K_p\) pour obtenir une reponse suffisamment vive.
2. Ajouter \(K_i\) pour reduire l'erreur statique.
3. Ajouter prudemment \(K_d\) pour amortir.
4. Verifier depassement, temps de reponse et marge de phase.
5. Filtrer l'action derivee si le bruit est important.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Modele interne"
Pour rejeter une perturbation ou suivre une reference, la boucle doit contenir le modele du signal a annuler : integrateur pour une constante, double integrateur pour une rampe, oscillateur pour une sinusoide.
:::

:::block type="definition" title="Placement de poles"
Le placement de poles choisit la dynamique de boucle fermee en imposant les valeurs propres de la matrice fermee. Il demande que le systeme soit commandable.
:::
:::
:::

:::section id="outils-auto-etat" eyebrow="Methodes" title="Espace d'etat" summary="Representation interne, commandabilite, observabilite, observateur et LQR."
:::grid variant="two-col"
:::block type="definition" title="Representation d etat"
Une representation d'etat continue s'ecrit :

\[
\dot x=Ax+Bu,\qquad y=Cx+Du
\]

Le vecteur \(x\) rassemble les variables internes necessaires pour prevoir l'evolution future.
:::

:::block type="method" title="Choisir les etats"
1. Prendre les grandeurs stockees : position, vitesse, courant, tension de condensateur.
2. Ecrire une equation differentielle du premier ordre pour chaque etat.
3. Ranger les coefficients dans \(A\), \(B\), \(C\), \(D\).
4. Verifier les dimensions.
5. Comparer avec la fonction de transfert si elle est connue.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Commandabilite"
Un systeme est commandable si l'entree permet d'amener l'etat ou l'on veut. Le critere de Kalman utilise :

\[
\mathcal C=[B\ AB\ A^2B\ \cdots\ A^{n-1}B]
\]

Il faut que cette matrice soit de rang \(n\).
:::

:::block type="definition" title="Observabilite"
Un systeme est observable si la sortie permet de reconstruire l'etat. Le critere de Kalman utilise :

\[
\mathcal O=\begin{bmatrix}C\\CA\\CA^2\\\vdots\\CA^{n-1}\end{bmatrix}
\]

Il faut aussi un rang \(n\).
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Observateur de Luenberger"
Un observateur reconstruit l'etat a partir du modele et de l'erreur de sortie :

\[
\dot{\hat x}=A\hat x+Bu+L(y-C\hat x)
\]

Le gain \(L\) se choisit pour rendre l'erreur d'estimation rapide et stable.
:::

:::block type="definition" title="Commande LQR"
La commande LQR choisit un retour d'etat qui minimise un compromis entre performance et effort :

\[
J=\int_0^\infty (x^TQx+u^TRu)\,dt
\]

Augmenter \(Q\) penalise les ecarts d'etat ; augmenter \(R\) penalise l'energie de commande.
:::
:::
:::
