---
title: "TD 4 corrige - Synthese RST"
subject: "auto"
type: "td"
target: "auto-td4.html"
eyebrow: "AU361 - TD 4"
heading: "Synthese RST"
summary: "Corrige maintenu en Markdown."
pdf: "AU361-TD4.pdf"
---
:::exercise label="Exercice 1" title="Exercice 1 - SynthÃ¨se RST pour un systÃ¨me du 1er ordre"
#### 1. ModÃ©lisation et cahier des charges

**Raisonnement :** La fonction de transfert du processus est \(H(p) = \frac{1}{1+p}\). On identifie les polynÃ´mes du systÃ¨me : \(A(p) = p+1\) (degrÃ© \(n_A=1\)) et \(B(p) = 1\) (degrÃ© \(n_B=0\)).

Le cahier des charges impose :

- **Rejet asymptotique des perturbations constantes en sortie :** La fonction de sensibilitÃ© \(S_{yp}(p) = \frac{A(p)S(p)}{A(p)S(p)+B(p)R(p)}\) doit s'annuler pour \(p=0\). Puisque \(A(0) = 1 \neq 0\), il faut impÃ©rativement imposer \(S(0)=0\). On fixe donc une partie de \(S(p)\) : \(S(p) = p \cdot S'(p)\).
- **PÃ´le de poursuite :** \(p_c = -4 \implies P_c(p) = p+4\).
- **PÃ´les de filtrage :** \(p_f = -2 \implies P_f(p) = (p+2)^{n_f}\).

#### 2. DegrÃ© des polynÃ´mes

**Raisonnement :** L'Ã©quation de Bezout est \(A(p)S(p) + B(p)R(p) = P(p)\). Pour avoir un rÃ©gulateur propre (ou strictement causal), on pose \(n_R = n_S\). Le polynÃ´me \(S(p)\) s'Ã©crit \(S(p) = p\) (pour avoir le moins de degrÃ©s possibles, \(n_S=1\)). On a donc \(n_R = 1 \implies R(p) = r_1 p + r_0\). Le polynÃ´me caractÃ©ristique \(P(p)\) a pour degrÃ© \(\deg(P) = n_A + n_S = 1+1=2\). Ainsi, le polynÃ´me de filtrage sera de degrÃ© 1 : \(P_f(p) = p+2\).

**Reponse :** Le polynÃ´me cible est donc : \[\mathbf{P(p) = (p+4)(p+2) = p^2 + 6p + 8}\]

#### 3. Calcul des polynÃ´mes \(R\), \(S\) et \(T\)

**Raisonnement :** On rÃ©sout l'Ã©quation de Bezout : \[(p+1)(p) + 1 \cdot (r_1 p + r_0) = p^2 + 6p + 8\] \[p^2 + p + r_1 p + r_0 = p^2 + (1+r_1)p + r_0\] Par identification avec \(P(p)\) :

- \(1+r_1 = 6 \implies r_1 = 5\)
- \(r_0 = 8\)

**Reponse :** Les polynÃ´mes du correcteur sont donc : \[\mathbf{S(p) = p}\] \[\mathbf{R(p) = 5p + 8}\] Pour obtenir un gain statique unitaire sans modifier la dynamique de poursuite, on annule les pÃ´les de filtrage via : \[\mathbf{T(p) = \frac{P_c(0)P_f(p)}{B(0)} = 4(p+2) = 4p+8}\] *(Note : le choix \(T(p) = \frac{P(0)}{B(0)} = 8\) est Ã©galement valide mais ne compense pas le pÃ´le de filtrage dans la poursuite).*

#### 4. Transfert en boucle fermÃ©e et sensibilitÃ©

**Reponse :**

- **Transfert BF :** \(\mathbf{\frac{Y(p)}{C(p)} = \frac{B(p)T(p)}{P(p)} = \frac{4(p+2)}{(p+4)(p+2)} = \frac{4}{p+4}}\).
- **Fonction de sensibilitÃ© :** \(\mathbf{S_{yp}(p) = \frac{A(p)S(p)}{P(p)} = \frac{p(p+1)}{p^2+6p+8}}\).

---
:::

:::exercise label="Exercice 2" title="Exercice 2 - Structure du correcteur pour un 2nd ordre"
#### 1. ModÃ©lisation

**Reponse :** Le systÃ¨me est \(\mathbf{H(p) = \frac{K}{\frac{p^2}{\omega_n^2} + \frac{2\zeta}{\omega_n}p + 1} = \frac{B(p)}{A(p)}}\). Le degrÃ© de \(A(p)\) est \(\mathbf{n_A = 2}\).

#### 2. Condition de rejet de perturbation

**Raisonnement :** On veut rejeter une perturbation de pulsation \(\omega = 1\) rad/s. La fonction de sensibilitÃ© \(S_{yp}(p)\) doit Ãªtre nulle en \(p = \pm j\). Il faut donc que \(S(p)\) contienne le facteur \((p-j)(p+j) = p^2+1\). On pose \(S(p) = (p^2+1)S'(p)\).

**Reponse :** Le degrÃ© minimal de \(S(p)\) est donc augmentÃ© de **2**.

#### 3. DÃ©termination des degrÃ©s

**Raisonnement :** On cherche un correcteur causal (\(n_R = n_S\)). L'Ã©quation de Bezout est de degrÃ© \(\deg(P) = n_A + n_S = 2 + n_S\). Le nombre d'inconnues est \(n_{S'}\) (pour \(S'\) unitaire) \(+ n_R + 1\). Or \(n_S = n_{S'} + 2\), donc \(n_R = n_{S'} + 2\). Le nombre total d'inconnues est \(n_{S'} + n_{S'} + 2 + 1 = 2n_{S'} + 3\). En Ã©galisant le nombre d'Ã©quations et d'inconnues : \[\deg(P) = 2 + n_S = 2 + (n_{S'} + 2) = n_{S'} + 4\] \[n_{S'} + 4 = 2n_{S'} + 3 \implies n_{S'} = 1\]

**Reponse :** Conclusion sur la structure :

- Le polynÃ´me \(S(p)\) est de degrÃ© \(1 + 2 = \mathbf{3}\).
- Le polynÃ´me \(R(p)\) est de degrÃ© \(\mathbf{3}\).
- Le polynÃ´me caractÃ©ristique \(P(p)\) sera de degrÃ© \(\mathbf{5}\).

---
:::

:::exercise label="Exercice 3" title="Exercice 3 - Moteur asservi en position (RÃ©gulateur RST)"
#### 1. ModÃ©lisation

**Reponse :** \(\mathbf{H(p) = \frac{K}{p(1+Tp)} = \frac{B(p)}{A(p)}}\) avec \(\mathbf{n_A = 2}\) et \(\mathbf{n_B = 0}\).

#### 2. SynthÃ¨se sans erreur statique et rejet perturbation sur mesure

**Raisonnement :**

- **Suivi consigne constante :** Implique un gain statique unitaire, obtenu par un choix appropriÃ© de \(T(p)\) (\(T(0) = P(0)/B(0)\)).
- **Rejet perturbation constante additive sur la position :** C'est une perturbation de sortie. Il faut \(S_{yp}(0) = 0 \implies A(0)S(0) = 0\). Puisque \(A(p)\) contient dÃ©jÃ  un intÃ©grateur (\(A(0)=0\)), la condition est naturellement remplie. Aucune partie fixe n'est requise pour \(S(p)\).
- **Structure :** On pose \(n_R = n_S\). \(\deg(P) = 2 + n_S\). Inconnues : \(n_S + n_R + 1 = 2n_S + 1\).

\[2 + n_S = 2n_S + 1 \implies n_S = 1\]

**Reponse :** Les polynÃ´mes \(R(p)\) et \(S(p)\) sont de **degrÃ© 1**, \(P(p)\) est de **degrÃ© 3**.

#### 3. Rejet asymptotique des couples rÃ©sistants

**Raisonnement :**

- La perturbation \(\Gamma_r\) agit sur l'entrÃ©e du systÃ¨me. L'annulation de l'erreur nÃ©cessite \(B(0)S(0) = 0\).
- Puisque \(B(0) = K \neq 0\), on doit imposer \(S(0)=0\). Le polynÃ´me \(S\) doit contenir un intÃ©grateur : \(S(p) = p S'(p)\).
- **ConsÃ©quence sur les degrÃ©s :** \(n_S = n_{S'} + 1\). Inconnues : \(n_{S'} + n_R + 1\).

Pour \(n_R = n_S = n_{S'} + 1\), on a \(2n_{S'} + 2\) inconnues. Ã‰quations : \(\deg(P) = 2 + n_S = 3 + n_{S'}\). \[3 + n_{S'} = 2n_{S'} + 2 \implies n_{S'} = 1\]

**Reponse :** Les polynÃ´mes \(R(p)\) et \(S(p)\) sont de **degrÃ© 2**, \(P(p)\) de **degrÃ© 4**.

---
:::

:::exercise label="Exercice 4" title="Exercice 4 - SynthÃ¨se RST stricte"
#### 1. ModÃ©lisation et contraintes

**Raisonnement :** \(A(p) = p(1+Tp) \implies n_A = 2\). \(B(p) = G \implies n_B = 0\).

- **Strictement causal :** \(n_R \le n_S - 1\).
- **Rejet \(d_1\) (sortie) :** Naturellement rejetÃ© car \(A(0)=0\).
- **Rejet \(d_2\) (entrÃ©e) :** Impose \(S(0)=0 \implies S(p) = p S'(p)\).
- **Poursuite :** \(P_c(p) = p^2 + 1.4p + 1\) (\(\omega_n=1\), \(\zeta=0.7\)).
- **Filtrage :** PÃ´les Ã  -1.

#### 2. DÃ©termination des degrÃ©s

**Raisonnement :** On pose \(n_R = n_S - 1\). Le nombre d'inconnues est \(n_{S'} + n_R + 1 = n_{S'} + (n_S - 1) + 1 = 2n_{S'} + 1\). Le nombre d'Ã©quations est \(\deg(P) = n_A + n_S = 2 + n_{S'} + 1 = n_{S'} + 3\). \[2n_{S'} + 1 = n_{S'} + 3 \implies n_{S'} = 2\] Si \(n_{S'} = 2\), alors \(n_S = 3\) et \(n_R = 2\). La condition de stricte causalitÃ© est bien respectÃ©e.

**Reponse :**

- \(\deg(S) = \mathbf{3}\)
- \(\deg(R) = \mathbf{2}\)
- \(\deg(P) = \mathbf{5}\)

Ainsi \(\mathbf{P_f(p) = (p+1)^3}\). Les polynÃ´mes se dÃ©duisent par identification de Bezout : \(\mathbf{A(p)S(p) + B(p)R(p) = P_c(p)P_f(p)}\).

---
:::

:::exercise label="Exercice 5" title="Exercice 5 - RÃ©gulation de tempÃ©rature d'une enceinte thermique"
#### 1.a - Liste des variables et des paramÃ¨tres

:::figure src="assets/auto/TD/AU361-TD4-Ex5.svg" alt="Modele thermique de l'enceinte." caption="Modele thermique de l'enceinte."
:::

**Reponse :**

- **Variables (qui Ã©voluent avec le temps) :**

- \(Tint(t)\) : TempÃ©rature dans l'enceinte thermique.
- \(Text(t)\) : TempÃ©rature extÃ©rieure.
- \(Tpar(t)\) : TempÃ©rature dans la paroi.
- \(Puis(t)\) : Puissance de chauffe.

- **ParamÃ¨tres (constants) :**

- \(\alpha_1\), \(\alpha_2\), et \(\alpha_3\) (constantes positives).

#### 1.b - Identification des rÃ´les des variables

**Reponse :** Dans un systÃ¨me asservi :

- **Variable Ã  piloter (ou grandeur rÃ©glÃ©e) :** C'est ce que l'on souhaite contrÃ´ler. Ici, c'est la tempÃ©rature interne \(Tint(t)\).
- **Variable de commande :** C'est le moyen d'action pour modifier la grandeur rÃ©glÃ©e. Ici, c'est la puissance de chauffe \(Puis(t)\).
- **Perturbation :** C'est un phÃ©nomÃ¨ne extÃ©rieur non contrÃ´lÃ© qui influence le systÃ¨me. Ici, c'est la tempÃ©rature extÃ©rieure \(Text(t)\).

#### 2.a - Expressions de \(H(p)\) et \(Hd(p)\)

**Raisonnement :** Pour exprimer les fonctions de transfert, nous devons passer dans le domaine de Laplace en supposant les conditions initiales nulles. Les Ã©quations diffÃ©rentielles deviennent :

1. \(p \cdot Tpar(p) = \alpha_1(Tint(p) - Tpar(p)) + \alpha_2(Text(p) - Tpar(p)) + Puis(p)\)
2. \(p \cdot Tint(p) = \alpha_3(Tpar(p) - Tint(p))\)

Isolons \(Tpar(p)\) dans la deuxiÃ¨me Ã©quation : \[Tpar(p) = \frac{p + \alpha_3}{\alpha_3} Tint(p)\]

Substituons \(Tpar(p)\) dans la premiÃ¨re Ã©quation : \[p \frac{p + \alpha_3}{\alpha_3} Tint(p) = \alpha_1 Tint(p) - (\alpha_1 + \alpha_2) \frac{p + \alpha_3}{\alpha_3} Tint(p) + \alpha_2 Text(p) + Puis(p)\]

Multiplions tout par \(\alpha_3\) pour simplifier et regroupons les termes en \(Tint(p)\) : \[[p^2 + (\alpha_1 + \alpha_2 + \alpha_3)p + \alpha_2 \alpha_3] Tint(p) = \alpha_2 \alpha_3 Text(p) + \alpha_3 Puis(p)\]

Par principe de superposition :

- **Pour \(H(p)\)**, on considÃ¨re que la perturbation est nulle (\(Text(p) = 0\)).
- **Pour \(Hd(p)\)**, on considÃ¨re que la commande est nulle (\(Puis(p) = 0\)).

**Reponse :** \[\mathbf{H(p) = \frac{Tint(p)}{Puis(p)} = \frac{\alpha_3}{p^2 + (\alpha_1 + \alpha_2 + \alpha_3)p + \alpha_2 \alpha_3}}\] \[\mathbf{Hd(p) = \frac{Tint(p)}{Text(p)} = \frac{\alpha_2 \alpha_3}{p^2 + (\alpha_1 + \alpha_2 + \alpha_3)p + \alpha_2 \alpha_3}}\]

#### 2.b - Gain statique de \(Hd(p)\)

**Raisonnement :** Le gain statique s'obtient en posant \(p = 0\) (rÃ©gime permanent) : \[Hd(0) = \frac{\alpha_2 \alpha_3}{\alpha_2 \alpha_3} = 1\]

**Reponse :** \(\mathbf{Hd(0) = 1}\). *Sens physique : Si on ne chauffe pas, Ã  terme, la tempÃ©rature intÃ©rieure sera exactement Ã©gale Ã  la tempÃ©rature extÃ©rieure.*

#### 3.a - Conclusion sur \(Hd(p)\) si enceinte parfaitement isolÃ©e

**Raisonnement :** "Parfaitement isolÃ©e" signifie qu'il n'y a pas d'Ã©changes avec l'extÃ©rieur, donc \(\alpha_2 = 0\).

**Reponse :** Si \(\alpha_2 = 0\), alors d'aprÃ¨s l'expression calculÃ©e prÃ©cÃ©demment, \(\mathbf{Hd(p) = 0}\). La tempÃ©rature extÃ©rieure n'a plus d'influence sur le systÃ¨me.

#### 3.b - Forme de la fonction de transfert \(H(p)\)

**Raisonnement :** En remplaÃ§ant \(\alpha_2 = 0\) dans \(H(p)\) : \[H(p) = \frac{\alpha_3}{p^2 + (\alpha_1 + \alpha_3)p} = \frac{\alpha_3}{p(p + \alpha_1 + \alpha_3)}\] Pour l'identifier Ã  la forme canonique \(\frac{G}{p(1+Tp)}\), on factorise par \((\alpha_1 + \alpha_3)\) au dÃ©nominateur : \[H(p) = \frac{\frac{\alpha_3}{\alpha_1 + \alpha_3}}{p\left(1 + \frac{1}{\alpha_1 + \alpha_3}p\right)}\]

**Reponse :** Par identification, on trouve : \[\mathbf{G = \frac{\alpha_3}{\alpha_1 + \alpha_3} \quad \text{et} \quad T = \frac{1}{\alpha_1 + \alpha_3}}\]

#### 3.c - RÃ©ponse indicielle de \(H(p)\)

**Raisonnement :** Une rÃ©ponse indicielle correspond Ã  une entrÃ©e en Ã©chelon, \(Puis(p) = \frac{1}{p}\). La sortie est donc \(Tint(p) = \frac{G}{p^2(1+Tp)}\). C'est un systÃ¨me avec un pÃ´le Ã  l'origine (comportement intÃ©grateur) et un pÃ´le en \(-1/T\). Sa rÃ©ponse temporelle combine une rampe et une exponentielle.

**Reponse :** L'allure de la courbe sera une **tangente horizontale Ã  l'origine** qui va tendre asymptotiquement vers une **droite de pente \(G\)**.

#### 3.d - Fonction de transfert en boucle fermÃ©e (FTBF)

**Raisonnement :** Avec un rÃ©gulateur proportionnel de gain \(K\), la FTBF s'Ã©crit : \[FTBF(p) = \frac{K \cdot H(p)}{1 + K \cdot H(p)} = \frac{\frac{K \cdot G}{p(1+Tp)}}{1 + \frac{K \cdot G}{p(1+Tp)}} = \frac{K \cdot G}{Tp^2 + p + K \cdot G}\]

**Reponse :** En divisant par \(K \cdot G\) pour avoir un gain unitaire au numÃ©rateur : \[\mathbf{FTBF(p) = \frac{1}{\frac{T}{K \cdot G}p^2 + \frac{1}{K \cdot G}p + 1}}\]

#### 3.e - Erreur statique en suivi de consigne Ã©chelon

**Raisonnement :** Le systÃ¨me en boucle ouverte (\(K \cdot H(p)\)) possÃ¨de un intÃ©grateur pur (le \(p\) au dÃ©nominateur). Or, la thÃ©orie stipule qu'un systÃ¨me de classe 1 prÃ©sente une erreur statique nulle pour une entrÃ©e en Ã©chelon.

**Reponse :** **L'erreur statique est nulle**.

#### 3.f - RÃ©glage pour une rÃ©ponse sans dÃ©passement la plus rapide

**Raisonnement :** On identifie la FTBF au modÃ¨le du second ordre : \(\frac{1}{\frac{p^2}{\omega_n^2} + \frac{2\zeta}{\omega_n}p + 1}\). On obtient \(\omega_n = \sqrt{\frac{K \cdot G}{T}}\) et \(\frac{2\zeta}{\omega_n} = \frac{1}{K \cdot G}\). Ce qui donne \(\zeta = \frac{1}{2\sqrt{K \cdot G \cdot T}}\). La rÃ©ponse est la plus rapide sans dÃ©passement (amortissement critique) pour \(\zeta = 1\). \[\frac{1}{2\sqrt{K \cdot G \cdot T}} = 1 \implies 4 \cdot K \cdot G \cdot T = 1 \implies K = \frac{1}{4 \cdot G \cdot T}\]

**Reponse :** En substituant \(G\) et \(T\) : \[\mathbf{K = \frac{(\alpha_1 + \alpha_3)^2}{4\alpha_3}}\]

#### 3.g - Marge de phase de 45 degrÃ©s

**Raisonnement :** La fonction de transfert en boucle ouverte est \(FTBO(j\omega) = \frac{K \cdot G}{j\omega(1 + jT\omega)}\). La marge de phase est \(\Delta\phi = 180^\circ + \arg(FTBO(j\omega_c)) = 45^\circ\). L'argument est \(\arg(FTBO(j\omega)) = -90^\circ - \arctan(T\omega)\). \[-90^\circ - \arctan(T\omega_c) = -135^\circ \implies \arctan(T\omega_c) = 45^\circ \implies T\omega_c = 1 \implies \omega_c = \frac{1}{T}\] Ã€ la pulsation de coupure \(\omega_c\), le gain vaut 1 : \[|FTBO(j\omega_c)| = \frac{K \cdot G}{\omega_c \sqrt{1 + (T\omega_c)^2}} = 1\]

**Reponse :** En remplaÃ§ant \(\omega_c\) par \(1/T\) : \[\mathbf{K = \frac{\sqrt{2}}{G \cdot T} = \sqrt{2} \frac{(\alpha_1 + \alpha_3)^2}{\alpha_3}}\]

#### 4.a - Approximations du 1er ordre (Enceinte avec pertes)

**Raisonnement :** Valeurs : \(\alpha_1=0.9\), \(\alpha_2=0.01\), \(\alpha_3=0.1\). Sur les courbes indicielles :

- \(H(p)\) tend vers 100 en rÃ©gime permanent. Ã€ \(63\%\) de la valeur finale, on lit un temps \(\tau \approx 1000\)s.
- \(Hd(p)\) tend vers 1 en rÃ©gime permanent avec la mÃªme dynamique.

**Reponse :** \[\mathbf{H(p) \approx \frac{100}{1 + 1000p}} \quad \text{et} \quad \mathbf{Hd(p) \approx \frac{1}{1 + 1000p}}\]

#### 4.c - SynthÃ¨se du rÃ©gulateur RST

**Etape 1 : PÃ´les dÃ©sirÃ©s \(P(p)\)**
 On veut un comportement du 1er ordre avec \(tr_{95\%} = 900\)s. Or \(tr_{95\%} \approx 3\tau_{BF}\), donc \(\tau_{BF} = 300\)s. Le pÃ´le de poursuite est \(P_c(p) = 1 + 300p\). Tous les pÃ´les doivent Ãªtre Ã©gaux, donc les pÃ´les de filtrage seront aussi sous la forme \(1 + 300p\).

**Etape 2 : Structure de R(p) et S(p)**
 Rejet asymptotique d'un Ã©chelon de perturbation sur \(Text\). Le rÃ©gulateur doit contenir le modÃ¨le de la perturbation (un intÃ©grateur). Donc \(R(p)\) doit contenir le facteur \(p\). Pour assurer la stricte causalitÃ© \(\deg(R) > \deg(S)\) et pouvoir rÃ©soudre l'Ã©quation de BÃ©zout, on choisit : \[R(p) = p(r_1 p + r_0) \implies \deg(R)=2\] \[S(p) = s_1 p + s_0 \implies \deg(S)=1\] L'Ã©quation \(A(p)R(p) + B(p)S(p)\) sera de degrÃ© 3. Le polynÃ´me dÃ©sirÃ© \(P(p)\) doit donc Ãªtre de degrÃ© 3 : \[P(p) = (1 + 300p)^3 = 27\,000\,000 p^3 + 270\,000 p^2 + 900 p + 1\]

**Etape 3 : RÃ©solution de l'Ã©quation de Diophante (BÃ©zout)**
 \[(1000p + 1)(r_1 p^2 + r_0 p) + 100(s_1 p + s_0) = 27\,000\,000 p^3 + 270\,000 p^2 + 900 p + 1\] En identifiant les coefficients :

- \(p^3\) : \(1000 r_1 = 27\,000\,000 \implies r_1 = 27\,000\)
- \(p^2\) : \(1000 r_0 + r_1 = 270\,000 \implies r_0 = 243\)
- \(p^1\) : \(r_0 + 100 s_1 = 900 \implies s_1 = 6.57\)
- \(p^0\) : \(100 s_0 = 1 \implies s_0 = 0.01\)

**Reponse :** Les polynÃ´mes du rÃ©gulateur sont : \[\mathbf{R(p) = p(27000p + 243)} \quad \text{et} \quad \mathbf{S(p) = 6.57p + 0.01}\]

**Etape 4 : DÃ©termination de T(p)**
 On veut \(FTBF = \frac{B(p)T(p)}{P(p)} \equiv \frac{1}{1+300p}\). \[\frac{100 \cdot T(p)}{(1+300p)^3} = \frac{1}{1+300p} \implies 100 \cdot T(p) = (1+300p)^2 = 90000p^2 + 600p + 1\]

**Reponse (suite) :** \[\mathbf{T(p) = 900p^2 + 6p + 0.01}\]

#### 4.d - Fonction de sensibilitÃ©

:::figure src="assets/auto/TD/AU361-TD4-Ex5-q4.svg" alt="Boucle RST pour la regulation de temperature." caption="Boucle RST pour la regulation de temperature."
:::

**Raisonnement :** La fonction de sensibilitÃ© par rapport Ã  une perturbation en sortie se dÃ©finit par : \[S(p) = \frac{A(p)R(p)}{P(p)} = \frac{(1+1000p) \cdot 243p \cdot (1 + \frac{27000}{243}p)}{(1+300p)^3} \approx \frac{243p \cdot (1+1000p) \cdot (1+111.11p)}{(1+300p)^3}\]

Analyse asymptotique pour le diagramme de Bode :

- **Basses frÃ©quences :** Le terme \(243p\) domine (+20 dB/dÃ©cade). Garantit le rejet asymptotique d'un Ã©chelon (gain \(\to -\infty\) dB quand \(\omega \to 0\)).
- **Cassures :**

1. ZÃ©ro Ã  \(\omega_1 = 0.001\) rad/s \(\implies\) Pente +40 dB/dÃ©c.
2. PÃ´le triple Ã  \(\omega_2 \approx 0.0033\) rad/s \(\implies\) Pente -20 dB/dÃ©c.
3. ZÃ©ro Ã  \(\omega_3 \approx 0.009\) rad/s \(\implies\) Pente 0 dB/dÃ©c.

- **Hautes frÃ©quences :** Le gain tend vers \(\frac{1000 \cdot 27000}{300^3} = 1\), soit 0 dB.

**Reponse :** Le tracÃ© prÃ©sentera un rejet parfait en statique et terminera Ã  **0 dB** en hautes frÃ©quences.
:::
