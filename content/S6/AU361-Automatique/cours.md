---
title: AU361-Automatique - Revision ESISAR
subject: AU361-Automatique
type: course
---

:::section id="AU361-Automatique-intro" eyebrow="AU361-Automatique" title="Analyse et commande des systemes lineaires" summary="Ce cours rassemble les notions essentielles d'automatique : representation entree-sortie, transformee de Laplace, fonctions de transfert, analyse temporelle et frequentielle, stabilite, robustesse, precision, PID et RST."
:::dashboard
:::card class="progress-card" kicker="Objectif" title="AU361"
Comprendre un systeme lineaire, analyser ses performances, puis choisir ou synthetiser un correcteur.
:::

:::card class="priority-card" kicker="Priorites de revision"
1.  Savoir passer d'une equation differentielle a une fonction de transfert.
2.  Identifier gain, poles, zeros, stabilite et regime permanent.
3.  Lire Bode, Nyquist et Black pour juger rapidite, resonance et marges.
4.  Relier cahier des charges, PID/RST et performances obtenues.
:::
:::

:::quicklinks
- [Modelisation](#AU361-Automatique-modelisation)
- [Analyse](#AU361-Automatique-analyse)
- [Commande](#AU361-Automatique-commande)
- [Fiche finale](#AU361-Automatique-revision)
:::

:::figure src="assets/AU361-Automatique/cours/systeme-entree-sortie.svg" alt="Schema entree-sortie avec commande, processus, perturbation et sortie." caption="Lecture de base : une commande agit sur le processus, une perturbation peut le modifier, et la sortie est la grandeur que l'on veut controler." label="Representation generale d'un systeme automatique"

:::
:::

:::section id="AU361-Automatique-modelisation" eyebrow="Chapitre 1" title="Systeme, variables et representation externe" summary="Un systeme automatique se lit d'abord comme un ensemble entrees, sorties, perturbations et parametres."
:::figure src="assets/AU361-Automatique/cours/modelisation-laplace.svg" alt="Schema du passage loi physique, transformee de Laplace, fonction de transfert." caption="Le passage au domaine de Laplace remplace une equation differentielle par une fraction rationnelle plus facile a analyser." label="Passage de l'equation physique a la fonction de transfert"

:::

:::grid variant="two-col"
:::block type="definition" title="Vocabulaire minimal"
*   **Entree de commande** : grandeur imposee par l'actionneur ou le regulateur.
*   **Sortie** : grandeur que l'on mesure ou que l'on veut piloter.
*   **Consigne** : valeur souhaitee de la sortie.
*   **Perturbation** : action exterieure non choisie qui modifie la sortie.
*   **Parametre** : constante physique du modele, par exemple une masse, une resistance, une section ou une constante de temps.
:::

:::block type="method" title="Methode de modelisation"
1.  Choisir les variables et leurs unites.
2.  Ecrire une loi physique : bilan de debit, loi de Newton, bilan thermique, loi electrique.
3.  Isoler l'equation differentielle reliant entree et sortie.
4.  Appliquer Laplace avec conditions initiales nulles.
5.  Former la fonction de transfert \(H(p)=Y(p)/U(p)\).
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Fonction de transfert"
Pour un systeme lineaire invariant causal, la representation externe s'ecrit souvent :

\(H(p)=\frac{Y(p)}{U(p)}=\frac{N(p)}{D(p)}\)

*   Les racines de \(D(p)\) sont les **poles**.
*   Les racines de \(N(p)\) sont les **zeros**.
*   Le degre de \(D\) donne l'ordre du systeme.
*   La stabilite depend d'abord des poles.
:::

:::block type="remember" title="Lecture physique"
Un pole lent proche de l'origine domine souvent la dynamique : il impose une reponse longue. Un zero peut accelerer, freiner ou deformer la reponse selon sa position.
:::
:::

:::annotation title="Exemple type TD"
Pour un reservoir de section \(S\), le bilan donne \(S\dot n(t)=q_e(t)-q_s(t)\). Si \(q_e\) est la commande et \(n\) la sortie, alors \(H(p)=N(p)/Q_e(p)=1/(Sp)\) : c'est un integrateur.
:::
:::

:::section id="AU361-Automatique-analyse" eyebrow="Chapitre 2" title="Laplace, reponses temporelles et systemes elementaires" summary="La transformee de Laplace transforme les equations differentielles en calculs algebriques."
:::figure src="assets/AU361-Automatique/cours/reponses-temporelles.svg" alt="Courbes de reponse temporelle pour echelon, premier ordre et second ordre." caption="Un premier ordre rejoint progressivement sa valeur finale ; un second ordre peu amorti peut depasser puis osciller avant de se stabiliser." label="Reponses temporelles d'un premier ordre et d'un second ordre"

:::

:::grid variant="two-col"
:::block type="definition" title="Signaux usuels"
*   Impulsion : utile pour caracteriser directement la dynamique.
*   Echelon : test de consigne constante, precision statique et depassement.
*   Rampe : test de poursuite d'une grandeur qui varie lineairement.
*   Sinusoide : base de l'analyse frequentielle.
:::

:::block type="method" title="Regime permanent et transitoire"
La reponse d'un systeme se separe en deux lectures : le transitoire, lie aux poles, et le permanent, lie au gain statique et au type d'entree.

\(K_s=\lim_{p\to0}H(p)\) donne le gain statique quand cette limite existe.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Premier ordre"
\(H(p)=\frac{K}{1+Tp}\)

*   Pole : \(p=-1/T\), stable si \(T>0\).
*   Reponse a un echelon : pas de depassement.
*   Temps de reponse a 5 % : environ \(3T\).
*   Bode : pente de \(-20\) dB/dec apres \(\omega=1/T\).
:::

:::block type="theorem" title="Integrateur et retard"
*   Integrateur : \(H(p)=K/p\), gain infini a basse frequence, phase \(-90^\circ\).
*   Retard pur : \(H(p)=e^{-\tau p}\), module inchange mais phase diminuee de \(-\omega\tau\).
*   Le retard est dangereux pour la stabilite car il reduit la marge de phase.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Second ordre"
\(H(p)=\frac{K\omega_n^2}{p^2+2\xi\omega_n p+\omega_n^2}\)

*   \(\omega_n\) : pulsation propre non amortie.
*   \(\xi\) : coefficient d'amortissement.
*   \(\xi<1\) : poles complexes, possible depassement et resonance.
*   \(\xi\ge1\) : reponse non oscillante, souvent plus lente.
:::

:::block type="warning" title="Erreur frequente"
Un systeme stable n'est pas forcement performant. Stabilite signifie que la sortie reste maitrisee ; rapidite, precision, depassement et robustesse sont des criteres supplementaires.
:::
:::
:::

:::section id="AU361-Automatique-commande" eyebrow="Chapitre 3" title="Analyse frequentielle, stabilite et robustesse" summary="Les diagrammes de Bode, Nyquist et Black servent a lire les performances et les risques d'instabilite."
:::figure src="assets/AU361-Automatique/cours/boucle-fermee.svg" alt="Schema de boucle fermee avec regulateur, processus, perturbation et retour unitaire." caption="La boucle fermee corrige l'ecart entre consigne et sortie. La stabilite depend du denominateur \(1+R(p)P(p)\)." label="Boucle fermee avec retour unitaire et perturbation"

:::

:::grid variant="two-col"
:::block type="definition" title="Bode, Nyquist, Black"
*   **Bode** : module en dB et phase en fonction de la pulsation.
*   **Nyquist** : lieu complexe de \(H(j\omega)\).
*   **Black-Nichols** : module en fonction de la phase.
*   Ces representations sont equivalentes mais ne donnent pas le meme confort de lecture.
:::

:::block type="theorem" title="Boucle fermee"
Avec un regulateur \(R(p)\), un processus \(P(p)\) et un retour unitaire :

\(F(p)=\frac{R(p)P(p)}{1+R(p)P(p)}\)

Le denominateur \(1+R(p)P(p)\) est le polynome caracteristique : c'est lui qui fixe la stabilite de la boucle fermee.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Criteres de stabilite"
*   **Routh** : methode algebrique sur le polynome caracteristique.
*   **Nyquist** : methode graphique autour du point critique \(-1\).
*   **Critere du revers** : forme simplifiee si la boucle ouverte n'a pas de pole instable.
:::

:::block type="remember" title="Point critique"
Dans Nyquist, le point critique est \(-1\). Dans Black, il correspond a \(0\) dB et \(-180^\circ\). Plus le lieu passe pres de ce point, plus la boucle fermee est fragile.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Marges de robustesse"
*   **Marge de gain** : gain que l'on peut encore ajouter avant l'instabilite.
*   **Marge de phase** : retard de phase admissible avant d'atteindre \(-180^\circ\) au gain unitaire.
*   **Marge de retard** : retard pur maximum acceptable.
*   **Marge de module** : distance minimale au point critique.
:::

:::block type="method" title="Precision"
La precision se lit sur l'erreur \(e(t)=c(t)-y(t)\). Plus le gain basse frequence de la boucle est grand, meilleure est la precision statique, mais un gain trop grand peut degrader les marges.
:::
:::

:::figure src="assets/AU361-Automatique/cours/marges-bode.svg" alt="Diagramme de Bode simplifie montrant marge de phase et marge de gain." caption="Les marges indiquent combien de gain ou de retard de phase on peut encore accepter avant de s'approcher du point critique." label="Marge de phase et marge de gain sur un diagramme de Bode simplifie"

:::
:::

:::section id="AU361-Automatique-marges" eyebrow="Methode" title="Calculer les marges de stabilite" summary="Les marges se calculent sur la fonction de transfert en boucle ouverte \(L(p)\), en posant \(p=j\omega\). Elles mesurent la distance a la limite d'instabilite : le point critique \(-1\), soit \(0\) dB et \(-180^\circ\)."
:::grid variant="two-col"
:::block type="method" title="Marge de phase \(M_\phi\)"
1.  Trouver la pulsation de coupure en gain \(\omega_0\), definie par \(|L(j\omega_0)|=1\), donc \(20\log_{10}|L(j\omega_0)|=0\) dB.
2.  Calculer la phase de la boucle ouverte a cette pulsation : \(\arg(L(j\omega_0))\).
3.  En deduire la marge : \(M_\phi=180^\circ+\arg(L(j\omega_0))\).

Repere courant : une marge de phase entre \(45^\circ\) et \(60^\circ\) donne souvent un compromis correct entre rapidite, amortissement et robustesse.
:::

:::block type="theorem" title="Marge de gain \(M_G\)"
1.  Trouver la pulsation de coupure en phase \(\omega_\pi\), definie par \(\arg(L(j\omega_\pi))=-180^\circ\).
2.  Calculer le module de la boucle ouverte a cette pulsation : \(|L(j\omega_\pi)|\).
3.  En deduire la marge en decibels : \(M_G=-20\log_{10}|L(j\omega_\pi)|\).

Repere courant : on cherche souvent \(M_G\ge10\) dB pour garder une reserve de robustesse suffisante.
:::
:::

:::grid variant="two-col"
:::block type="remember" title="Marge de module \(M_M\)"
La marge de module est plus globale : elle mesure la distance minimale entre le lieu de Nyquist de \(L(j\omega)\) et le point critique \(-1\).

\(M_M=\min_\omega |1+L(j\omega)|\)

Avec la sensibilite \(S(j\omega)=\frac{1}{1+L(j\omega)}\), on obtient :

\(M_M=\frac{1}{\max_\omega |S(j\omega)|}=\frac{1}{\\|S\\|_\infty}\)
:::

:::block type="warning" title="Lecture pratique"
*   Si \(M_\phi\) est faible, un petit retard supplementaire peut rendre la boucle instable.
*   Si \(M_G\) est faible, une augmentation de gain peut suffire a destabiliser le systeme.
*   Si \(M_M\) est faible, le lieu de Nyquist passe trop pres de \(-1\), meme si les marges separees semblent acceptables.
*   Une conception robuste vise souvent \(M_M\ge0.5\), soit un pic de sensibilite d'environ 6 dB.
:::
:::

:::block type="theorem" title="Exemple complet : \(L(p)=\frac{1}{p(p+1)^2}\)"
On etudie la FTBO d'un systeme integrateur du troisieme ordre :

\(L(j\omega)=\frac{1}{j\omega(1+j\omega)^2}\)

Avant de calculer les marges, on separe module et phase :

*   **Module** : \(|L(j\omega)|=\frac{1}{\omega(1+\omega^2)}\).
*   **Phase** : \(\arg(L(j\omega))=-90^\circ-2\arctan(\omega)\).
:::

:::grid variant="two-col"
:::block type="method" title="Application : marge de gain"
1.  On cherche \(\omega_\pi\) tel que \(-90^\circ-2\arctan(\omega_\pi)=-180^\circ\).
2.  Donc \(\arctan(\omega_\pi)=45^\circ\), d'ou \(\omega_\pi=1\) rad/s.
3.  Le module vaut \(|L(j1)|=\frac{1}{1(1+1^2)}=\frac{1}{2}=0.5\).
4.  La marge vaut alors \(M_G=20\log_{10}(2)\approx6.02\) dB.

Conclusion : le gain peut etre double avant instabilite, mais \(6.02\) dB reste faible par rapport au repere usuel de \(10\) dB.
:::

:::block type="method" title="Application : marge de phase"
1.  On cherche \(\omega_0\) tel que \(|L(j\omega_0)|=1\), donc \(\frac{1}{\omega_0(1+\omega_0^2)}=1\).
2.  On obtient \(\omega_0^3+\omega_0-1=0\), soit numeriquement \(\omega_0\approx0.682\) rad/s.
3.  La phase vaut \(\arg(L(j0.682))\approx-90^\circ-2(34.3^\circ)=-158.6^\circ\).
4.  La marge vaut alors \(M_\phi=180^\circ-158.6^\circ=21.4^\circ\).

Conclusion : la boucle est theoriquement stable, mais la marge de phase est faible ; on attend un amortissement mediocre et des oscillations importantes.
:::
:::

:::grid variant="two-col"
:::block type="remember" title="Application : marge de module"
On cherche la distance minimale au point critique :

\(M_M=\min_\omega\left|1+\frac{1}{j\omega(1+j\omega)^2}\right|\)

Le minimum se lit en pratique avec un calcul numerique, un Nyquist ou un Black. Pour cet exemple, il est atteint autour de \(\omega\approx0.85\) rad/s.

\(M_M\approx0.38\)
:::

:::block type="warning" title="Bilan de l'exemple"
*   \(M_G\approx6.02\) dB : reserve de gain faible.
*   \(M_\phi\approx21.4^\circ\) : amortissement insuffisant.
*   \(M_M\approx0.38\) : robustesse globale trop faible par rapport au repere \(0.5\).
*   Les trois lectures racontent la meme chose : le systeme est proche de l'instabilite et demande un correcteur plus robuste.
:::
:::

:::

:::section id="AU361-Automatique-pid-rst" eyebrow="Chapitre 4" title="Correcteurs PID et RST" summary="Le PID est un correcteur industriel simple ; le RST est une synthese polynomiale plus structuree."
:::figure src="assets/AU361-Automatique/cours/structure-rst.svg" alt="Schema de structure d un correcteur RST avec les blocs T, R, S et le processus." caption="La synthese RST se ramene a choisir les polynomes \(R\), \(S\) et \(T\) pour imposer les poles et les proprietes de suivi/rejet." label="Structure d'un correcteur RST"

:::

:::grid variant="two-col"
:::block type="definition" title="Correcteur PID"
\(R(p)=K_p+\frac{K_i}{p}+K_d p\)

*   **P** : augmente la rapidite et reduit l'erreur, mais peut diminuer la robustesse.
*   **I** : annule l'erreur statique sur consigne constante ou perturbation constante, mais ajoute du retard de phase.
*   **D** : anticipe les variations et ajoute de l'amortissement, mais amplifie le bruit si non filtre.
:::

:::block type="method" title="Choix PI courant"
Dans les TD, un choix classique consiste a placer le zero du PI sur le pole lent du processus pour le compenser :

\(R(p)=K\left(1+\frac{1}{T_i p}\right)\)

Ce reglage simplifie la dynamique apparente, mais il doit rester compatible avec les marges de stabilite.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Structure RST"
Le regulateur RST se decrit avec trois polynomes :

*   \(R(p)\) agit sur la sortie mesuree ou l'erreur selon le schema.
*   \(S(p)\) agit sur la commande et intervient dans l'equation de Bezout.
*   \(T(p)\) filtre la consigne et fixe le gain de poursuite.
:::

:::block type="theorem" title="Idee de Bezout"
Si le processus s'ecrit \(H(p)=B(p)/A(p)\), la synthese RST cherche souvent :

\(A(p)S(p)+B(p)R(p)=D(p)\)

Le polynome \(D(p)\) est choisi pour imposer les poles de boucle fermee : poles dominants pour la poursuite et poles de filtrage pour rendre le correcteur realisable.
:::
:::

:::annotation title="Lecture pratique"
PID : rapide a regler et tres industriel. RST : plus calculatoire, mais permet d'imposer explicitement des poles, le suivi de consigne et le rejet de perturbations.
:::
:::

:::section id="AU361-Automatique-td" eyebrow="Entrainement" title="TD et exercices types" summary="Les TD couvrent la modelisation, l'analyse de stabilite, les PID et la synthese RST."
:::layout class="chapter-layout"
:::card class="chapter-card" pill="TD 1" title="Representation des processus" href="AU361-Automatique-td1.html" link="Ouvrir la page corrigee"
Variables, perturbations, schemas fonctionnels, mise en equation et fonction de transfert.
:::

:::card class="chapter-card" pill="TD 2" title="Stabilite, robustesse, PID" href="AU361-Automatique-td2.html" link="Ouvrir la page corrigee"
Routh, Nyquist, marge de gain, PI et compromis precision/robustesse.
:::

:::card class="chapter-card" pill="TD 3" title="Asservissement de position" href="AU361-Automatique-td3.html" link="Ouvrir la page corrigee"
Systeme mecanique, premier ordre plus integrateur, boucle fermee du second ordre.
:::

:::card class="chapter-card" pill="TD 4" title="RST" href="AU361-Automatique-td4.html" link="Ouvrir la page corrigee"
Synthese RST, equation de Bezout, suivi sans erreur statique et rejet de perturbations.
:::
:::

:::grid variant="two-col"
:::block type="neutral" title="Sources integrees"
Les supports bruts ont ete retires du site public. Les notions utiles sont reprises dans le cours Markdown et les pages de TD.
:::

:::block type="remember" title="Ordre conseille"
Refaire TD1 pour la modelisation, TD2 pour stabilite/PID, TD3 pour les systemes mecaniques, puis TD4 pour RST.
:::
:::
:::

:::section id="AU361-Automatique-revision" eyebrow="Fiche finale" title="Ce qu'il faut savoir refaire sans le cours" summary="Une fiche courte pour controler les automatismes avant examen."
:::layout class="revision-grid"
:::card class="checklist" title="Modeliser"
Identifier entree, sortie, perturbation, parametres, equation differentielle et fonction de transfert.
:::

:::card class="checklist" title="Analyser"
Trouver poles, zeros, gain statique, stabilite, ordre, type et reponse a un echelon.
:::

:::card class="checklist" title="Lire Bode"
RepÃ©rer coupures, pentes, phase, resonance, bande passante et marges.
:::

:::card class="checklist" title="Stabiliser"
Former le polynome caracteristique, appliquer Routh ou raisonner via Nyquist/Black.
:::

:::card class="checklist" title="Regler PID"
Comprendre l'effet de P, I, D sur rapidite, precision, depassement, bruit et robustesse.
:::

:::card class="checklist" title="Synthetiser RST"
Choisir les poles voulus, ecrire Bezout, fixer les degres et verifier suivi/rejet.
:::
:::
:::
