---
title: "TD 2 corrige - Stabilite et correcteurs"
subject: "auto"
type: "td"
target: "auto-td2.html"
eyebrow: "AU361 - TD 2"
heading: "Stabilite, robustesse et correcteurs"
summary: "Corrige maintenu en Markdown."
pdf: "AU361-TD2.pdf"
---
:::exercise label="Exercice 1" title="Exercice 1 - StabilitÃ© (Routh, Nyquist et Marge de gain)"
Soit la fonction de transfert en boucle ouverte (FTBO) avec le correcteur proportionnel \(K\) : \[FTBO(p) = K \cdot F(p) = \frac{K}{p(p^2+5p+6)} = \frac{K}{p^3+5p^2+6p}\]

#### 1. ThÃ©orÃ¨me de Routh

**Raisonnement :** La fonction de transfert en boucle fermÃ©e (FTBF) est : \[FTBF(p) = \frac{FTBO(p)}{1+FTBO(p)} = \frac{K}{p^3+5p^2+6p+K}\] L'Ã©quation caractÃ©ristique est : \(D(p) = p^3 + 5p^2 + 6p + K = 0\).

Dressons le tableau de Routh :

| **Puissance** | **Colonne 1** | **Colonne 2** |
| --- | --- | --- |
| \(p^3\) | 1 | 6 |
| \(p^2\) | 5 | \(K\) |
| \(p^1\) | \(\frac{30-K}{5}\) | 0 |
| \(p^0\) | \(K\) | 0 |

Pour que le systÃ¨me soit stable, tous les termes de la premiÃ¨re colonne doivent Ãªtre strictement positifs : \[5 > 0 \quad ; \quad \frac{30-K}{5} > 0 \implies K  0\]

**Reponse :** Le systÃ¨me est stable pour \(\mathbf{0  -1 \implies K < 30\]

**Reponse :** On retrouve bien \(\mathbf{0 < K < 30}\).

#### 3. Marge de gain pour \(K=15\)

**Raisonnement :** La marge de gain (MG) se calcule Ã  la pulsation \(\omega_{180} = \sqrt{6}\) rad/s : \[MG = -20 \log_{10} |FTBO(j\omega_{180})| = -20 \log_{10} \left( \frac{15}{30} \right) = -20 \log_{10}(0.5)\]

**Reponse :** \[\mathbf{MG = 20 \log_{10}(2) \approx 6.02 \text{ dB}}\]

---
:::

:::exercise label="Exercice 2" title="Exercice 2 - RÃ©gulateur PI"
Le processus est \(F(p) = \frac{1-2p}{(1+p)(1+5p)}\). Ses pÃ´les sont \(-1\) et \(-1/5\). Le pÃ´le le plus lent est \(-1/5\), correspondant Ã  une constante de temps de \(5\) s. On choisit donc \(T_i = 5\) s.

#### 1. Fonction de transfert en boucle ouverte

**Raisonnement :** On multiplie le correcteur \(R(p)\) par le processus \(F(p)\). \[R(p) = K \left( 1 + \frac{1}{5p} \right) = K \frac{1+5p}{5p}\]

**Reponse :** \[\mathbf{FBO(p) = R(p)F(p) = K \frac{1+5p}{5p} \frac{1-2p}{(1+p)(1+5p)} = \frac{K(1-2p)}{5p(1+p)}}\]

#### 2. Diagramme de Bode pour \(K=1\) (Description asymptotique)

Le transfert est composÃ© de :

- Un intÃ©grateur \(1/(5p)\) : droite de pente \(-20\) dB/dÃ©c, coupant 0 dB Ã  \(\omega = 0.2\) rad/s. Phase constante de \(-90^\circ\).
- Un zÃ©ro Ã  partie rÃ©elle positive (dÃ©phasage non minimal) \((1-2p)\) : Cassure Ã  \(\omega_1 = 0.5\) rad/s. Ajoute une pente de \(+20\) dB/dÃ©c au gain. Ajoute un retard de phase allant de \(0^\circ\) Ã  \(-90^\circ\).
- Un pÃ´le \((1+p)\) : Cassure Ã  \(\omega_2 = 1\) rad/s. Ajoute une pente de \(-20\) dB/dÃ©c au gain. Ajoute un retard de phase allant de \(0^\circ\) Ã  \(-90^\circ\).

**Reponse :** En basses frÃ©quences, la phase part de \(-90^\circ\). En hautes frÃ©quences, la phase tend vers \(-90^\circ - 90^\circ - 90^\circ = \mathbf{-270^\circ}\).

#### 3. Valeur de \(K\) pour une marge de gain de 6 dB

**Raisonnement :** Cherchons \(\omega_{180}\) telle que \(\arg(FBO(j\omega)) = -180^\circ\). \[-90^\circ - \arctan(2\omega) - \arctan(\omega) = -180^\circ \implies \arctan(2\omega) + \arctan(\omega) = 90^\circ\] En appliquant la fonction tangente : \[\frac{2\omega + \omega}{1 - 2\omega^2} = \infty \implies 1 - 2\omega^2 = 0 \implies \omega_{180} = \frac{1}{\sqrt{2}} \text{ rad/s}\] Le module Ã  cette pulsation pour \(K=1\) est : \[|FBO(j\omega_{180})|_{K=1} = \frac{\sqrt{1+4\omega^2}}{5\omega\sqrt{1+\omega^2}} = \frac{\sqrt{1+2}}{5\frac{1}{\sqrt{2}}\sqrt{1+0.5}} = \frac{\sqrt{3}}{\frac{5}{2}\sqrt{3}} = \frac{2}{5} = 0.4\] On veut \(MG = 6\) dB \(\approx\) un facteur \(2\). \[20\log_{10}\left(\frac{1}{K \times 0.4}\right) = 6 \implies \frac{1}{0.4 K} \approx 2\]

**Reponse :** \[\mathbf{K = \frac{1}{0.8} = 1.25}\]

---
:::

:::exercise label="Exercice 3" title="Exercice 3 - RÃ©ponse et rÃ©gulation d'un systÃ¨me du 3Ã¨me ordre"
Soit \(F(p) = \frac{A}{(1+Tp)^3}\) et \(R(p) = k\). On a \(FTBO(p) = \frac{kA}{(1+Tp)^3}\).

#### 2. Valeur de \(k\) pour limite de stabilitÃ©

**Raisonnement :** Phase : \(-3\arctan(T\omega) = -180^\circ \implies \arctan(T\omega) = 60^\circ \implies \omega_{180} = \frac{\sqrt{3}}{T}\). Module Ã  cette pulsation : \[|FTBO(j\omega_{180})| = \frac{kA}{(\sqrt{1+3})^3} = \frac{kA}{8}\] Limite de stabilitÃ© si gain = 1 \(\implies \frac{kA}{8} = 1\).

**Reponse :** \[\mathbf{k = \frac{8}{A}}\]

#### 3. Marge de gain et de phase

**Reponse :** \[\mathbf{MG = 20\log_{10}\left(\frac{8}{kA}\right)}\] Pour la marge de phase, soit \(\omega_c\) telle que \(|FTBO(j\omega_c)| = 1 \implies 1+T^2\omega_c^2 = (kA)^{2/3} \implies \omega_c = \frac{\sqrt{(kA)^{2/3}-1}}{T}\). \[\mathbf{M\varphi = 180^\circ - 3\arctan(T\omega_c) = 180^\circ - 3\arctan\left(\sqrt{(kA)^{2/3}-1}\right)}\]

#### 4. Fonction de transfert en boucle fermÃ©e (FTBF)

**Raisonnement :** \[FTBF(p) = \frac{kA}{(1+Tp)^3+kA} = \frac{kA}{T^3p^3+3T^2p^2+3Tp+1+kA}\] *Gain statique :* \(FTBF(0) = \frac{kA}{1+kA}\). L'erreur de position est \(1 - \frac{kA}{1+kA} = \frac{1}{1+kA}\). Pour une bonne prÃ©cision, \(k\) doit Ãªtre grand, mais \(k\) est limitÃ© Ã  \(8/A\) pour la stabilitÃ©.

**Reponse :** Le systÃ¨me prÃ©sente un **conflit direct entre prÃ©cision et stabilitÃ©**.

#### 7. RÃ©ponse Ã  l'Ã©chelon pour \(k = 8/A\)

**Raisonnement :** Pour \(k = 8/A\), le systÃ¨me est Ã  la limite de stabilitÃ©. \[FTBF(p) = \frac{8}{(1+Tp)^3+8}\] Les pÃ´les annulent le dÃ©nominateur : \((1+Tp)^3 = -8 \implies 1+Tp = 2e^{j(\pi+2n\pi)/3}\). Les pÃ´les sont \(p_1 = -3/T\) et \(p_{2,3} = \pm j\sqrt{3}/T\).

**Reponse :** Puisque le systÃ¨me possÃ¨de des pÃ´les purement imaginaires, sa rÃ©ponse temporelle Ã  un Ã©chelon ne convergera pas et sera le siÃ¨ge d'**oscillations entretenues** (non amorties) Ã  la pulsation \(\mathbf{\sqrt{3}/T}\).

---
:::

:::exercise label="Exercice 4" title="Exercice 4 - Rejet de perturbation"
\(H(p) = \frac{G}{p(1+Tp)}\) et \(Hd(p) = \frac{1}{1+Tp}\).

#### Partie I - RÃ©gulateur Proportionnel \(R(p)=K\)

#### I.1.a - Erreur statique en consigne Ã©chelon

**Raisonnement :** \(FTBO(p)\) contient un intÃ©grateur pur (\(1/p\)). Le systÃ¨me est de classe 1.

**Reponse :** L'erreur statique de position est **nulle**.

#### I.1.b - Valeur maximale de \(K\) sans dÃ©passement

**Raisonnement :** \[FTBF(p) = \frac{KG}{Tp^2+p+KG} = \frac{1}{\frac{T}{KG}p^2 + \frac{1}{KG}p + 1}\] On identifie \(\omega_n = \sqrt{\frac{KG}{T}}\) et \(\frac{2\zeta}{\omega_n} = \frac{1}{KG} \implies \zeta = \frac{1}{2\sqrt{KGT}}\). Pour ne pas avoir de dÃ©passement, il faut \(\zeta \ge 1\).

**Reponse :** \[\frac{1}{2\sqrt{KGT}} \ge 1 \implies \mathbf{K \le \frac{1}{4GT}}\]

#### I.2.a - Bande passante maximale sans rÃ©sonance

**Raisonnement :** La limite de rÃ©sonance correspond Ã  \(\zeta = \frac{1}{\sqrt{2}}\).

**Reponse :** \[\frac{1}{2\sqrt{KGT}} = \frac{1}{\sqrt{2}} \implies 4KGT = 2 \implies \mathbf{K = \frac{1}{2GT}}\]

#### I.3.a - Erreur statique due Ã  \(d_2\) Ã©chelon unitaire

**Raisonnement :** \[Y_{d2}(p) = \frac{H(p)}{1+KH(p)} \frac{1}{p} = \frac{G}{Tp^2+p+KG} \frac{1}{p}\] En rÃ©gime permanent (thÃ©orÃ¨me de la valeur finale) : \(y(\infty) = \frac{G}{KG} = \frac{1}{K}\). Puisque la consigne \(c=0\), l'erreur est \(\epsilon = c - y\).

**Reponse :** \[\mathbf{\epsilon = -1/K}\]

#### I.3.b - Erreur statique due Ã  \(d_1\) Ã©chelon unitaire

**Raisonnement :** \[Y_{d1}(p) = \frac{Hd(p)}{1+KH(p)} \frac{1}{p} = \frac{\frac{1}{1+Tp}}{1+\frac{KG}{p(1+Tp)}} \frac{1}{p} = \frac{p}{Tp^2+p+KG} \frac{1}{p}\]

**Reponse :** \[\mathbf{y(\infty) = \lim_{p\to0} p Y_{d1}(p) = 0}\]

#### I.3.c - \(d_1\) en rampe

**Raisonnement :** \[D_1(p) = \frac{1}{p^2} \implies Y_{d1}(p) = \frac{p}{Tp^2+p+KG} \frac{1}{p^2}\]

**Reponse :** \[\mathbf{y(\infty) = \lim_{p\to0} p \frac{1}{p(Tp^2+p+KG)} = \frac{1}{KG}}\]

#### I.3.d - Minimisation de l'erreur sans dÃ©passement

**Raisonnement :** L'erreur est proportionnelle Ã  \(1/K\), il faut maximiser \(K\). Pour rester sans dÃ©passement, \(K = \frac{1}{4GT}\).

**Reponse :** L'erreur en rÃ©gime permanent vaut alors \(\mathbf{y(\infty) = 4T}\).

#### Partie II - RÃ©gulateur PI \(R(p)=K(1+\frac{1}{T_ip})\)

#### II.2. \(T_i = T\)

**Raisonnement :** \[FTBO(p) = K\frac{1+Tp}{Tp} \frac{G}{p(1+Tp)} = \frac{KG}{Tp^2}\] Le diagramme de Black est une droite verticale Ã  \(-180^\circ\). La marge de phase est toujours de \(0^\circ\).

**Reponse :** Le systÃ¨me est Ã  la limite de l'instabilitÃ© (**oscillateur pur**).

#### II.4. \(T_i = 2T\), erreur due Ã  \(d_2\) Ã©chelon

**Raisonnement :** \[Y(p) = \frac{H(p)}{1+FTBO(p)} \frac{1}{p} = \frac{2TGp}{2Tp^2(1+Tp)+KG(1+2Tp)}\frac{1}{p}\] En appliquant la limite \(p \to 0\), \(y(\infty) = 0\).

**Reponse :** Le rÃ©gulateur PI annule l'erreur statique d'une perturbation constante appliquÃ©e en entrÃ©e du processus grÃ¢ce Ã  son **action intÃ©grale**.

---
:::

:::exercise label="Exercice 5" title="Exercice 5 - Asservissement de position"
Processus vitesse : \(\frac{VIT(p)}{U(p)} = \frac{5}{1+0.1p}\). La position est l'intÃ©grale de la vitesse, donc \(POS(p) = \frac{VIT(p)}{p}\).

#### I. Analyse du processus

1. **Reponse :** \(H(p) = \frac{POS(p)}{U(p)} = \mathbf{\frac{5}{p(1+0.1p)}}\).
2. **Reponse :** PÃ´les : \(p_1 = \mathbf{0}\) et \(p_2 = \mathbf{-10}\).
3. **Raisonnement :** Le systÃ¨me possÃ¨de un pÃ´le nul (intÃ©grateur).

**Reponse :** Il n'est donc **pas asymptotiquement stable**.

- **Raisonnement :** RÃ©ponses indicielles (\(U(p) = 1/p\)) :

\[VIT(p) = \frac{5}{p(1+0.1p)}\] **Reponse :** \[\mathbf{vit(t) = 5(1-e^{-10t})}\] \[pos(t) = \int_0^t vit(\tau)d\tau = \left[ 5\tau + 0.5e^{-10\tau} \right]_0^t = \mathbf{5t + 0.5e^{-10t} - 0.5}\]

#### II. Analyse du systÃ¨me asservi (\(R(p)=K\))

1. **Reponse :** \(R(p) = K\).
2. **Raisonnement :**

\[FTBF(p) = \frac{\frac{5K}{p(1+0.1p)}}{1+\frac{5K}{p(1+0.1p)}} = \frac{5K}{0.1p^2+p+5K} = \frac{1}{\frac{0.1}{5K}p^2 + \frac{1}{5K}p + 1}\] Par identification avec la forme canonique :
 **Reponse :** \[\mathbf{\omega_n = \sqrt{50K} \quad \text{et} \quad \zeta = \frac{1}{\sqrt{2K}}}\]

- **Raisonnement :** Erreur pour consigne Ã©chelon (sans perturbation) : La FTBF a un gain statique de 1.

**Reponse :** L'erreur est nulle, la position atteint la consigne.

- **Raisonnement :** Erreur due Ã  \(\delta\) Ã©chelon (\(C=0\), \(D=1/p\)) :

\[POS(p) = \frac{H(p)}{1+KH(p)} \delta(p) = \frac{5}{0.1p^2+p+5K} \frac{1}{p}\] ThÃ©orÃ¨me de la valeur finale :
 **Reponse :** \(pos(\infty) = \mathbf{\frac{1}{K}}\).

- **Raisonnement :** Pour minimiser l'erreur \(1/K\), il faut maximiser \(K\). Pour n'avoir aucun dÃ©passement, il faut \(\zeta \ge 1 \implies \frac{1}{\sqrt{2K}} \ge 1 \implies K \le 0.5\).

**Reponse :** La valeur de \(K\) choisie est \(\mathbf{K=0.5}\). Avec \(K=0.5\), l'erreur en rÃ©gime permanent vaut \(\mathbf{pos(\infty) = 2}\).

- **Raisonnement :** Pour \(K=2\), le transfert de la perturbation est \(T_d(p) = \frac{5}{0.1p^2+p+10}\).

ParamÃ¨tres : \(\omega_n = 10\) rad/s, \(\zeta = 0.5\). La pulsation de rÃ©sonance est \(\omega_r = \omega_n\sqrt{1-2\zeta^2} = 10\sqrt{1-2(0.25)}\).
 **Reponse :** \(\mathbf{\omega_r = 7.07 \text{ rad/s}}\).

- **Raisonnement :** Pour une perturbation sinusoÃ¯dale de frÃ©quence 50 Hz (\(\omega \approx 314\) rad/s), on se situe trÃ¨s loin au-delÃ  de la bande passante du systÃ¨me (10 rad/s). L'amplitude du signal de sortie en rÃ©gime permanent sera trÃ¨s fortement attÃ©nuÃ©e (pente asymptotique de -40 dB/dÃ©c au-delÃ  de \(\omega_n\)). L'allure de la position sera une trÃ¨s faible oscillation sinusoÃ¯dale centrÃ©e sur 0.

**Reponse :** L'amplitude est donnÃ©e par \(0.1 \times |T_d(j\omega)| = \mathbf{\frac{0.5}{\sqrt{(5K - 0.1\omega^2)^2 + \omega^2}}}\).
:::
