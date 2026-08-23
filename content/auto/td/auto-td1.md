---
title: "TD 1 corrige - Modelisation des systemes"
subject: "auto"
type: "td"
target: "auto-td1.html"
eyebrow: "AU361 - TD 1"
heading: "Modelisation des systemes lineaires"
summary: "Corrige maintenu en Markdown."
pdf: "AU361-TD1.pdf"
---
:::exercise label="Exercice 1" title="Exercice 1 - RÃ©gulation de niveau d'un rÃ©servoir d'eau"
#### 1. Variables et paramÃ¨tres du systÃ¨me

*ParamÃ¨tre :* La section du rÃ©servoir \(S\) (en \(m^2\)).

*Variables :*

- L'entrÃ©e (ou commande) \(u(t)\) : Le dÃ©bit entrant \(q_e(t)\).
- La sortie Ã  piloter \(y(t)\) : Le niveau d'eau \(n(t)\).
- La perturbation \(\delta_1(t)\) : Le dÃ©bit de fuite ou de consommation \(q_s(t)\).

#### 2. Ã‰quation diffÃ©rentielle

**Raisonnement :** La variation du volume d'eau dans le rÃ©servoir est Ã©gale Ã  la diffÃ©rence entre le dÃ©bit entrant et le dÃ©bit sortant. Le volume Ã©tant \(V(t) = S \cdot n(t)\).

**Reponse :** L'Ã©quation diffÃ©rentielle s'Ã©crit : \[\mathbf{\frac{dV(t)}{dt} = S \frac{dn(t)}{dt} = q_e(t) - q_s(t)}\]

#### 3. SchÃ©ma fonctionnel du systÃ¨me asservi

Le rÃ©gulateur proportionnel \(R\) produit la commande telle que \(q_e(t) = K(cn(t) - n(t))\). Le comparateur fait la diffÃ©rence entre \(cn(t)\) (consigne) et \(n(t)\) (mesure). La perturbation \(q_s(t)\) est soustraite au dÃ©bit \(q_e(t)\) avant d'attaquer le processus \(H\).

#### 4. Ã‰quation diffÃ©rentielle en boucle fermÃ©e

**Raisonnement :** On remplace \(q_e(t)\) par son expression dans l'Ã©quation du systÃ¨me : \[S \frac{dn(t)}{dt} = K(cn(t) - n(t)) - q_s(t)\]

**Reponse :** En rÃ©organisant les termes : \[\mathbf{S \frac{dn(t)}{dt} + K n(t) = K cn(t) - q_s(t)}\]

#### 5. Fonctions de transfert \(R(p)\) et \(H(p)\)

- **RÃ©gulateur proportionnel :** \(R(p) = K\).
- **Processus :** En appliquant la transformÃ©e de Laplace avec conditions initiales nulles sur l'Ã©quation du rÃ©servoir, on obtient \(S p N(p) = Q_e(p) - Q_s(p)\).

**Reponse :** Si l'on ne considÃ¨re que l'entrÃ©e \(Q_e(p)\) (donc \(Q_s=0\)), on obtient : \[\mathbf{H(p) = \frac{N(p)}{Q_e(p)} = \frac{1}{S p}}\]

#### 6. Diagramme de Bode de \(H(p)\)

La fonction \(H(p) = \frac{1}{Sp}\) est un intÃ©grateur pur.

- **Gain :** Droite de pente -20 dB/dÃ©cade, passant par 0 dB Ã  la pulsation \(\omega = 1/S\).
- **Phase :** Constante et Ã©gale Ã  \(-90^\circ\).

#### 7. Fonctions de transfert en boucle fermÃ©e

**Raisonnement :** A partir du schÃ©ma fonctionnel, on Ã©crit \(N(p) = H(p) [R(p)(CN(p) - N(p)) - \Delta_1(p)]\). \[N(p) = \frac{1}{Sp} [K(CN(p) - N(p)) - \Delta_1(p)] \implies N(p) \left(1 + \frac{K}{Sp}\right) = \frac{K}{Sp} CN(p) - \frac{1}{Sp} \Delta_1(p)\]

**Reponse :** En multipliant par \(\frac{Sp}{K}\), on identifie les deux fonctions de transfert : \[\mathbf{T(p) = \frac{N(p)}{CN(p)} = \frac{1}{1 + \frac{S}{K}p}} \quad \text{et} \quad \mathbf{T_{\delta 1}(p) = \frac{N(p)}{\Delta_1(p)} = \frac{-1/K}{1 + \frac{S}{K}p}}\]

#### 8. PÃ´les et stabilitÃ©

**Raisonnement :** Les deux fonctions de transfert ont le mÃªme dÃ©nominateur. Le pÃ´le est solution de \(1 + \frac{S}{K}p = 0\), soit \(p = -\frac{K}{S}\).

**Reponse :** Puisque \(S > 0\) et \(K > 0\), le pÃ´le est strictement nÃ©gatif. Le systÃ¨me asservi est donc **stable**.

#### 9. Diagrammes de Bode (comparaison)

- **Boucle ouverte** \(bH(p) = R(p)H(p) = \frac{K}{Sp}\) : intÃ©grateur pur (pente -20dB/dÃ©cade, phase \(-90^\circ\)).
- **Boucle fermÃ©e** \(T(p) = \frac{1}{1 + \frac{S}{K}p}\) : systÃ¨me du premier ordre (gain 0 dB en BF, puis cassure Ã  \(\omega_c = K/S\) avec pente -20 dB/dÃ©cade ; phase de \(0^\circ\) Ã  \(-90^\circ\)).

#### 10. RÃ©gime permanent face Ã  un Ã©chelon de perturbation

**Raisonnement :** Ici, \(CN(p) = 0\) et \(q_s(t)\) est un Ã©chelon unitaire \(\implies Q_s(p) = \frac{1}{p}\). \[N(p) = T_{\delta 1}(p) Q_s(p) = \frac{-1/K}{1 + \frac{S}{K}p} \cdot \frac{1}{p}\] En appliquant le thÃ©orÃ¨me de la valeur finale : \[\lim_{t \to \infty} n(t) = \lim_{p \to 0} p N(p)\]

**Reponse :** \[\mathbf{\lim_{t \to \infty} n(t) = -\frac{1}{K}}\] Le niveau baisse de \(1/K\) en rÃ©gime permanent pour compenser la fuite.

---
:::

:::exercise label="Exercice 2" title="Exercice 2 - Asservissement de vitesse d'une scie"
#### 1. Variables et paramÃ¨tres

- **EntrÃ©e :** Tension de commande \(u(t)\).
- **Sortie :** Vitesse angulaire \(w(t)\).
- **Perturbation :** Couple rÃ©sistant \(Cr(t)\).
- **ParamÃ¨tres :** \(J, K_1, K_2, R\).

#### 2. Ã‰quation diffÃ©rentielle du systÃ¨me

**Etape 1 : Ã‰quation Ã©lectrique**
 On a \(u(t) = R i(t) + e(t) \implies i(t) = \frac{u(t) - K_2 w(t)}{R}\).

**Etape 2 : Ã‰quation mÃ©canique**
 On a \(J \frac{dw(t)}{dt} = C_m(t) - Cr(t) = K_1 i(t) - Cr(t)\).

**Reponse :** En combinant les deux relations : \[\mathbf{J \frac{dw(t)}{dt} + \frac{K_1 K_2}{R} w(t) = \frac{K_1}{R} u(t) - Cr(t)}\]

#### 3. ReprÃ©sentation d'Ã©tat

**Raisonnement :** On choisit la variable d'Ã©tat \(x(t) = w(t)\) et le vecteur d'entrÃ©e \(V(t) = \begin{bmatrix} u(t) \\ Cr(t) \end{bmatrix}\).

**Reponse :** \[\mathbf{\dot{x}(t) = -\frac{K_1 K_2}{R J} x(t) + \begin{bmatrix} \frac{K_1}{R J} & -\frac{1}{J} \end{bmatrix} \begin{bmatrix} u(t) \\ Cr(t) \end{bmatrix}}\] \[\mathbf{y(t) = x(t)}\]

#### 4. Fonction de transfert \(T(p)\)

**Raisonnement :** Si \(Cr(t) = 0\), la transformÃ©e de Laplace donne \((J p + \frac{K_1 K_2}{R}) W(p) = \frac{K_1}{R} U(p)\).

**Reponse :** \[\mathbf{T(p) = \frac{W(p)}{U(p)} = \frac{1/K_2}{1 + \frac{RJ}{K_1 K_2}p}}\]

#### 5. StabilitÃ©

**Raisonnement :** Le pÃ´le est \(p = -\frac{K_1 K_2}{R J}\). Comme toutes les grandeurs physiques sont positives, le pÃ´le est rÃ©el strictement nÃ©gatif.

**Reponse :** Le systÃ¨me est **stable**.

#### 6. Application d'un Ã©chelon \(u(t)=10V\)

- **En rÃ©gime permanent (\(t \to \infty\))** : \(\lim_{t \to \infty} w(t) = \lim_{p \to 0} p \cdot T(p) \frac{10}{p} = \mathbf{\frac{10}{K_2}}\).
- **A \(t=0^+\)** : La variable d'Ã©tat \(w(t)\) est continue. Ã‰tant initialement nulle, \(\mathbf{w(0^+) = 0}\).
- **AccÃ©lÃ©ration Ã  \(t=0^+\)** : Ã€ partir de l'Ã©quation diffÃ©rentielle, Ã  \(t=0^+\), \(w(0^+)=0\) donc \(J \cdot acc(0^+) + 0 = \frac{K_1}{R} \cdot 10 \implies \mathbf{acc(0^+) = \frac{10 K_1}{R J}}\).

#### 7. Prise en compte de la perturbation

**Raisonnement :** L'Ã©quation diffÃ©rentielle complÃ¨te dans le domaine de Laplace est : \[(J p + \frac{K_1 K_2}{R}) W(p) = \frac{K_1}{R} U(p) - CR(p)\] \[W(p) = \frac{1/K_2}{1 + \frac{R J}{K_1 K_2} p} U(p) - \frac{R/(K_1 K_2)}{1 + \frac{R J}{K_1 K_2} p} CR(p)\]

**Reponse :** On identifie la fonction de transfert en perturbation : \[\mathbf{T_\delta(p) = \frac{-R/(K_1 K_2)}{1 + \frac{R J}{K_1 K_2} p}}\]

---
:::

:::exercise label="Exercice 3" title="Exercice 3 - RÃ©gulation de tempÃ©rature d'une enceinte"
#### 1. ModÃ©lisation

- **ParamÃ¨tres :** \(\alpha_1, \alpha_2, \alpha_3\).
- **Variables :** \(Tint(t), Text(t), Tpar(t), Puis(t)\).
- **Signaux :** Commande = \(Puis(t)\) ; Sortie = \(Tint(t)\) ; Perturbation = \(Text(t)\).

#### 2. ReprÃ©sentation externe

**Etape 1 : Passage dans le domaine de Laplace**
 (1) \(p \cdot Tpar = \alpha_1(Tint - Tpar) + \alpha_2(Text - Tpar) + Puis \implies (p + \alpha_1 + \alpha_2)Tpar = \alpha_1 Tint + \alpha_2 Text + Puis\)
 (2) \(p \cdot Tint = \alpha_3(Tpar - Tint) \implies Tpar = \frac{p+\alpha_3}{\alpha_3} Tint\).

**Etape 2 : Substitution**
 En injectant (2) dans (1), on trouve : \[[p^2 + p(\alpha_1 + \alpha_2 + \alpha_3) + \alpha_2 \alpha_3] Tint = \alpha_3 Puis + \alpha_2 \alpha_3 Text\]

**Reponse :** \[\mathbf{H(p) = \frac{\alpha_3}{p^2 + p(\alpha_1+\alpha_2+\alpha_3) + \alpha_2 \alpha_3}} \quad \text{et} \quad \mathbf{Hd(p) = \frac{\alpha_2 \alpha_3}{p^2 + p(\alpha_1+\alpha_2+\alpha_3) + \alpha_2 \alpha_3}}\] Le gain statique de \(Hd(p)\) (pour \(p=0\)) est : \(\mathbf{K_{Hd} = \frac{\alpha_2 \alpha_3}{\alpha_2 \alpha_3} = 1}\).

#### 3. Enceinte parfaitement isolÃ©e (\(\alpha_2 = 0\))

1. La fonction \(Hd(p)\) devient nulle, l'extÃ©rieur n'a plus d'influence.
2. **Calcul de \(H(p)\) :**

\[H(p) = \frac{\alpha_3}{p^2 + p(\alpha_1+\alpha_3)} = \frac{\alpha_3}{p(p + \alpha_1 + \alpha_3)} = \frac{\frac{\alpha_3}{\alpha_1+\alpha_3}}{p(1 + \frac{1}{\alpha_1+\alpha_3} p)}\] On a bien la forme demandÃ©e avec \(\mathbf{G = \frac{\alpha_3}{\alpha_1+\alpha_3}}\) et \(\mathbf{T = \frac{1}{\alpha_1+\alpha_3}}\).

- La rÃ©ponse indicielle s'obtient en intÃ©grant un systÃ¨me du 1er ordre. C'est une rampe amortie :

\[\mathbf{Tint(t) = G \cdot [t - T(1 - e^{-t/T})]}\]

#### 4. Enceinte avec pertes thermiques

- On calcule le dÃ©nominateur avec \(\alpha_1=0.9, \alpha_2=0.01, \alpha_3=0.1\) : \(p^2 + 1.01 p + 0.001\).
- Ce polynÃ´me admet deux racines : \(p_1 \approx -0.001\) et \(p_2 \approx -1\). Le pÃ´le \(p_1\) est dominant (constante de temps trÃ¨s grande), ce qui explique le comportement apparent du premier ordre.
- Sur la Figure 2, on atteint \(63\%\) de la valeur finale vers \(t = 1000\)s, d'oÃ¹ \(\tau = 1000\)s.
- Le gain statique de \(H(p)\) est \(\mathbf{K_H = \frac{0.1}{0.001} = 100}\).
- Le gain statique de \(Hd(p)\) est **1**.

---
:::

:::exercise label="Exercice 4" title="Exercice 4 - RÃ©gulation de tempÃ©rature d'un cryostat"
#### Identification des paramÃ¨tres du modÃ¨le

**Etape 1 : Analyse de l'Ã©tat initial**
 L'essai indique que \(Text(t) = 300K\) constant. Le systÃ¨me est Ã  l'Ã©quilibre avant \(t=100s\) (oÃ¹ \(U=0\)). \[Temp(t<100) = Hd(0) \cdot 300 = 300 K\] Cela correspond au graphe (puisque \(den(0)=1\)).

**Etape 2 : Analyse du gain \(G\)**
 Ã€ \(t=100s\), un Ã©chelon de consigne de vitesse est appliquÃ© : passage Ã  1000 tr/min. Sachant que 30V correspond Ã  un rapport cyclique unitaire \(U=1\) et Ã  3000 tr/min, la vitesse est \(3000 \cdot U(t)\). Pour 1000 tr/min, l'Ã©chelon de commande est donc \(\Delta U = \frac{1000}{3000} = \frac{1}{3}\).
 Sur le graphe, la tempÃ©rature passe de 300 K Ã  200 K en rÃ©gime permanent. L'amplitude de la variation de la sortie est \(\Delta Temp = -100 K\).
 L'Ã©quation en rÃ©gime permanent pour cette variation donne : \[\Delta Temp = H(0) \cdot \Delta U = \frac{G}{den(0)} \cdot \Delta U\] Ainsi, \(-100 = G \cdot \frac{1}{3} \implies G = -300\).

**Etape 3 : Analyse de la constante de temps \(\tau\)**
 Pour le dÃ©nominateur, la rÃ©ponse a l'allure d'un premier ordre. La valeur finale de la variation est 200K. Ã€ \(63\%\) de la transition (soit une chute de 63K, donc \(Temp=237K\)), on lit sur le graphe un temps d'environ \(300s\).
 Sachant que l'Ã©chelon a dÃ©marrÃ© Ã  \(100s\), la constante de temps est \(\tau = 300 - 100 = 200s\).
 Finalement, \(den(p)\) pour un systÃ¨me du 1er ordre s'Ã©crit \(1 + \tau p\).

**Reponse :** Les paramÃ¨tres du modÃ¨le sont : \[\mathbf{G = -300 \quad \text{et} \quad den(p) = 1 + 200p}\]
:::
