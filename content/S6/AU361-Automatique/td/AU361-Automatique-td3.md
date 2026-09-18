---
title: "TD 3 corrige - Asservissement de position"
subject: "AU361-Automatique"
type: "td"
target: "AU361-Automatique-td3.html"
eyebrow: "AU361 - TD 3"
heading: "Asservissement de position"
summary: "Corrige maintenu en Markdown."
---
:::exercise label="Partie I" title="Partie I - Analyse du processus Ã  piloter"
Le systÃ¨me mÃ©canique relie la commande \(u\) Ã  la vitesse \(vit\) par un premier ordre de gain statique \(G=5\) et de constante de temps \(\tau=0.1\) s.

:::figure src="assets/AU361-Automatique/TD/AU361-TD3-Ex1.svg" alt="Boucle d'asservissement de position avec perturbation." caption="Boucle d'asservissement de position avec perturbation."
:::

#### I.1. Expression de la fonction de transfert \(H(p)\)

**Raisonnement :** La position \(pos(t)\) est l'intÃ©grale de la vitesse \(vit(t)\). Dans le domaine de Laplace, on a \(POS(p) = \frac{VIT(p)}{p}\). La fonction de transfert entre \(U(p)\) et \(VIT(p)\) est \(\frac{5}{1+0.1p}\).

**Reponse :** Ainsi, la fonction de transfert du processus \(H(p)\) est : \[\mathbf{H(p) = \frac{POS(p)}{U(p)} = \frac{5}{p(1+0.1p)}}\]

#### I.2. Valeur des pÃ´les du processus

**Raisonnement :** Les pÃ´les annulent le dÃ©nominateur de \(H(p)\) : \[p(1+0.1p) = 0\]

**Reponse :** \[\mathbf{p_1 = 0 \quad \text{et} \quad p_2 = -10 \text{ rad/s}}\]

#### I.3. StabilitÃ© asymptotique

**Raisonnement :** Le systÃ¨me possÃ¨de un pÃ´le nul (Ã  la limite de la stabilitÃ©), traduisant un comportement intÃ©grateur pur.

**Reponse :** Le systÃ¨me n'est **pas asymptotiquement stable**.

#### I.4. Expressions temporelles des rÃ©ponses indicielles

**Raisonnement :** Pour un Ã©chelon de commande \(U(p) = \frac{1}{p}\), on a :

- Vitesse : \(VIT(p) = \frac{5}{p(1+0.1p)} = 5 \left( \frac{1}{p} - \frac{0.1}{1+0.1p} \right) = \frac{5}{p} - \frac{5}{p+10}\).
- Position : \(POS(p) = \frac{5}{p^2(1+0.1p)} = \frac{5}{p^2} - \frac{0.5}{p} + \frac{0.5}{p+10}\).

**Reponse :** En passant dans le domaine temporel :

- Vitesse : \(\mathbf{vit(t) = 5(1 - e^{-10t}) \cdot \Gamma(t)}\)
- Position : \(\mathbf{pos(t) = (5t - 0.5 + 0.5e^{-10t}) \cdot \Gamma(t)}\)

---
:::

:::exercise label="Partie II" title="Partie II - Analyse du systÃ¨me asservi"
#### II.1. Fonction de transfert du rÃ©gulateur

**Reponse :** Pour un rÃ©gulateur proportionnel de gain K : \[\mathbf{R(p) = K}\]

#### II.2. Fonction de transfert en boucle fermÃ©e (FTBF)

**Raisonnement :** On applique la formule de la boucle fermÃ©e : \[FTBF(p) = \frac{R(p)H(p)}{1 + R(p)H(p)} = \frac{\frac{5K}{p(1+0.1p)}}{1 + \frac{5K}{p(1+0.1p)}} = \frac{5K}{0.1p^2 + p + 5K}\] En mettant sous forme canonique du second ordre \(\frac{1}{\frac{p^2}{\omega_n^2} + \frac{2\zeta}{\omega_n}p + 1}\) : \[FTBF(p) = \frac{1}{\frac{0.1}{5K}p^2 + \frac{1}{5K}p + 1}\]

**Reponse :** Par identification : \[\mathbf{\omega_n = \sqrt{50K} \quad \text{et} \quad \zeta = \frac{1}{\sqrt{2K}}}\]

#### II.3. Position en rÃ©gime permanent (consigne Ã©chelon)

**Raisonnement :** Sans perturbation (\(\delta=0\)) et pour une consigne Ã©chelon \(cons = 1/p\), on applique le thÃ©orÃ¨me de la valeur finale : \[pos(\infty) = \lim_{p \to 0} p \cdot FTBF(p) \frac{1}{p} = FTBF(0) = 1\]

**Reponse :** Le systÃ¨me suit parfaitement la consigne, **l'erreur de position est nulle**.

#### II.4. Erreur statique due Ã  la perturbation

**Raisonnement :** Avec \(cons=0\) et \(\delta=1/p\), le transfert entre la perturbation et la sortie est \(T_\delta(p) = \frac{H(p)}{1+R(p)H(p)} = \frac{5}{0.1p^2 + p + 5K}\). \[pos(\infty) = \lim_{p \to 0} p \cdot T_\delta(p) \frac{1}{p} = T_\delta(0) = \frac{5}{5K} = \frac{1}{K}\]

**Reponse :** L'erreur statique due Ã  cette perturbation est donc \(\mathbf{\frac{1}{K}}\).

#### II.5. Minimisation de l'erreur statique sans dÃ©passement

**Raisonnement :** Pour minimiser l'erreur (\(\frac{1}{K}\)), il faut maximiser \(K\). Cependant, pour garantir une rÃ©ponse sans dÃ©passement, il faut un amortissement \(\zeta \ge 1\). \[\frac{1}{\sqrt{2K}} \ge 1 \implies 2K \le 1 \implies K \le 0.5\] On choisit la valeur maximale \(K = 0.5\).

**Reponse :** L'erreur statique due Ã  la perturbation vaut alors : \[\mathbf{pos(\infty) = \frac{1}{0.5} = 2}\]

#### II.6. Diagramme de Bode de \(T_\delta(p)\) pour \(K=2\)

**Raisonnement :** Pour \(K=2\), \(T_\delta(p) = \frac{5}{0.1p^2 + p + 10}\). Les paramÃ¨tres deviennent \(\omega_n = \sqrt{100} = 10\) rad/s et \(\zeta = 0.5\). La pulsation de rÃ©sonance est donnÃ©e par \(\omega_r = \omega_n \sqrt{1 - 2\zeta^2}\).

**Reponse :** \[\mathbf{\omega_r = 10 \sqrt{1 - 0.5} = \frac{10}{\sqrt{2}} \approx 7.07 \text{ rad/s}}\]

#### II.7. RÃ©ponse Ã  une perturbation sinusoÃ¯dale

**Raisonnement :** FrÃ©quence \(f = 50\) Hz \(\implies \omega = 314\) rad/s. Amplitude \(= 0.1\). En rÃ©gime permanent, la position a l'allure d'une sinusoÃ¯de de mÃªme pulsation. L'amplitude \(A\) de ces variations est \(A = 0.1 \times |T_\delta(j\omega)|\).

**Reponse :** \[\mathbf{A = \frac{0.5}{\sqrt{(5K - 0.1\omega^2)^2 + \omega^2}}}\]

---
:::

:::exercise label="Partie III" title="Partie III - Moteur asservi en position"
Le systÃ¨me intÃ¨gre un correcteur \(C(s)\), un transfert \(\frac{K}{1+Ts}\) et un intÃ©grateur \(\frac{1}{s}\).

:::figure src="assets/AU361-Automatique/TD/AU361-TD3-Ex2.svg" alt="Moteur asservi en position." caption="Moteur asservi en position."
:::

#### 1. Expressions de \(T_1(s)\) et \(T_2(s)\)

**Raisonnement :** D'aprÃ¨s le schÃ©ma, \(V(s) = \frac{K}{1+Ts}[C(s)(CY(s) - Y(s)) - \Gamma_r(s)]\) et \(Y(s) = \frac{V(s)}{s}\). En rÃ©organisant : \[Y(s) \left[ 1 + \frac{K C(s)}{s(1+Ts)} \right] = \frac{K C(s)}{s(1+Ts)} CY(s) - \frac{K}{s(1+Ts)} \Gamma_r(s)\]

**Reponse :** On identifie les deux fonctions de transfert : \[\mathbf{T_1(s) = \frac{K C(s)}{s(1+Ts) + K C(s)} \quad \text{et} \quad T_2(s) = \frac{-K}{s(1+Ts) + K C(s)}}\]

#### 2. Erreur en suivi de consigne Ã©chelon (\(C(s) = K_p\))

**Raisonnement :** Le transfert en boucle ouverte comporte un intÃ©grateur pur (\(\frac{1}{s}\)). Le systÃ¨me est donc de classe 1.

**Reponse :** Ce qui garantit une erreur statique de position **nulle** pour une consigne Ã©chelon.

#### 3. Erreur en rÃ©ponse Ã  une perturbation unitaire

**Raisonnement :** L'erreur est \(\epsilon = -y\) (puisque \(cy=0\)). \[\lim_{s \to 0} s \cdot T_2(s) \frac{1}{s} = T_2(0) = \frac{-K}{K K_p} = -\frac{1}{K_p}\]

**Reponse :** L'erreur statique est donc \(\mathbf{\frac{1}{K_p}}\).

#### 4. Erreur de traÃ®nage (consigne rampe)

**Raisonnement :** Pour \(CY(s) = 1/s^2\), l'erreur est \(\epsilon(s) = CY(s)(1 - T_1(s)) = \frac{1+Ts}{s[s(1+Ts)+K K_p]}\).

**Reponse :** \[\mathbf{\epsilon(\infty) = \lim_{s \to 0} s \epsilon(s) = \frac{1}{K K_p}}\]

#### 5. Pas de surtension de gain (\(K=4, T=0.25\))

**Raisonnement :** \(T_1(s)\) est un second ordre avec \(\omega_n^2 = \frac{4K_p}{0.25} = 16K_p\) et \(\frac{2\zeta}{\omega_n} = \frac{1}{4K_p}\), d'oÃ¹ \(\zeta = \frac{1}{2\sqrt{K_p}}\). Il n'y a pas de rÃ©sonance si \(\zeta \ge \frac{1}{\sqrt{2}}\).

**Reponse :** \[\mathbf{\frac{1}{2\sqrt{K_p}} \ge \frac{1}{\sqrt{2}} \implies \sqrt{K_p} \le \frac{\sqrt{2}}{2} \implies K_p \le 0.5}\]

#### 6. Marge de phase de 45Â°

**Raisonnement :** La FTBO est \(L(j\omega) = \frac{4K_p}{j\omega(1+0.25j\omega)}\). Phase : \(\phi = -90^\circ - \arctan(0.25\omega)\). Pour \(M_\phi = 45^\circ\), on a \(\phi = -135^\circ \implies \arctan(0.25\omega) = 45^\circ \implies \omega = 4\) rad/s. Le gain doit valoir 1 Ã  cette pulsation : \[|L(j4)| = \frac{4K_p}{4\sqrt{1+1}} = \frac{K_p}{\sqrt{2}} = 1\]

**Reponse :** \[\mathbf{K_p = \sqrt{2} \approx 1.41}\] Puisque la phase ne dÃ©passe jamais \(-180^\circ\), la marge de gain est **infinie**.

#### 7. Marge de module pour \(K_p=1\)

**Raisonnement :** La marge de module \(\Delta M\) est la distance minimale entre le lieu de Nyquist de \(L(j\omega)\) et le point critique \(-1\). \[\Delta M = \min_{\omega} |1 + L(j\omega)| = \min_{\omega} |S(j\omega)|^{-1}\]

**Reponse :** En trouvant le minimum numÃ©rique, on obtient \(\mathbf{\Delta M \approx 0.68}\).

#### 8. StabilitÃ© avec correcteur PI

**Raisonnement :** Pour \(C(s) = \frac{1+sT_a}{sT_b}\), l'Ã©quation caractÃ©ristique de la boucle fermÃ©e est : \[D(s) = T T_b s^3 + T_b s^2 + K T_a s + K = 0\] Dressons le tableau de Routh :

| **Puissance** | **Colonne 1** | **Colonne 2** |
| --- | --- | --- |
| \(s^3\) | \(T T_b\) | \(K T_a\) |
| \(s^2\) | \(T_b\) | \(K\) |
| \(s^1\) | \(K(T_a - T)\) | 0 |
| \(s^0\) | \(K\) | 0 |

Pour que le systÃ¨me soit stable (en supposant \(K>0\) et \(T_b>0\)), tous les Ã©lÃ©ments de la premiÃ¨re colonne doivent Ãªtre positifs.

**Reponse :** La condition de stabilitÃ© est donc \(\mathbf{T_a > T}\).
:::
