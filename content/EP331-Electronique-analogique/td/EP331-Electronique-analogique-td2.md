---
title: "TD II corrige - Redressement de puissance et regulation Zener"
subject: "EP331-Electronique-analogique"
type: "td"
target: "EP331-Electronique-analogique-td2.html"
eyebrow: "EP331 - TD 2"
heading: "Redressement de puissance et regulation Zener"
summary: "Correction guidee avec formules utiles et simulations CircuitJS pour les montages analogiques."
---
:::section id="ep331-td2-redressement-zener" eyebrow="TD II" title="Redressement de puissance et regulation Zener" summary="Corrections guidees, formules utiles et simulations CircuitJS."

:::exercise label="TD II" title="Exercice I : Redressement simple alternance sur charge inductive RL"
**Énoncé** : On étudie un redresseur simple alternance alimenté par une tension carrée $v(t) = \pm E = \pm 200\text{ V}$ de période $T = 20\text{ ms}$ ($50\text{ Hz}$) débitant dans une charge inductive $R = 10\ \Omega$, $L = 10\text{ H}$. La diode est parfaite.

:::grid two-col
:::block type="method" title="Simulation associee"
Le schema du TD est remplace par une simulation CircuitJS equivalente pour manipuler les grandeurs du montage.
:::

:::circuitjs label="CircuitJS" title="Redresseur RL" iframeTitle="Simulation CircuitJS redresseur simple alternance" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=rectify.txt"
:::
:::

#### 1. Équation différentielle du système
Lorsque la diode $D$ est conductrice (passante, ON), la tension aux bornes de la charge est égale à la tension d'entrée $v(t)$. L'équation différentielle s'écrit  :
$$v(t) = R \cdot i(t) + L \frac{di(t)}{dt}$$
La constante de temps de la charge RL est :
$$\tau = \frac{L}{R} = \frac{10}{10} = 1\text{ s}$$
Puisque $T = 20\text{ ms}$, nous sommes dans le cas d'une constante de temps extrêmement grande devant la période du signal : $\tau \gg T$.

#### 2. Cas $\tau \ll T$ (Rappels de cours pour comparaison : $L = 10\ \mu\text{H}$) 
Dans ce cas limite, la constante de temps est de $\tau = 1\ \mu\text{s}$. Le transitoire est quasi instantané devant la demi-période ($T/2 = 10\text{ ms}$).
*   **Alternance positive $0 \leq t < T/2$** : $v(t) = E = 200\text{ V}$. La diode conduit, $i(t) = \frac{E}{R} (1 - e^{-t/\tau}) \approx \frac{E}{R} = 20\text{ A}$. La tension aux bornes de la charge est $u_c(t) = v(t) = 200\text{ V}$.
*   **Alternance négative $T/2 \leq t < T$** : $v(t) = -E = -200\text{ V}$. Le courant s'annule quasi instantanément en $t \approx T/2$. La diode se bloque immédiatement. Le courant reste nul : $i(t) = 0\text{ A}$, la tension aux bornes de la charge est nulle : $u_c(t) = 0\text{ V}$.
*   **Valeurs moyennes** :
    $$\langle u_c \rangle = \frac{E}{2} = 100\text{ V}$$
    $$\langle i \rangle = \frac{\langle u_c \rangle}{R} = 10\text{ A}$$

#### 3. Cas $\tau \gg T$ : Montage sans diode de roue libre (Défaut du montage)
On étudie la mise en route avec la condition initiale $i(0) = 0$ et les composants réels du TD : $R = 10\ \Omega$, $L = 10\text{ H}$ ($\tau = 1\text{ s}$).
*   **Sur la première alternance positive $0 \leq t < T/2$ ($10\text{ ms}$)** :
    La solution de l'équation différentielle s'écrit  :
    $$i(t) = \frac{E}{R} \left( 1 - e^{-\frac{t}{\tau}} \right) = 20 \times \left( 1 - e^{-t} \right)$$
    À $t = T/2 = 10\text{ ms}$, la valeur du courant atteint est :
    $$i(T/2) = 20 \times \left( 1 - e^{-0,01} \right) \approx 20 \times 0,00995 \approx 0,199\text{ A}$$
*   **Sur la première alternance négative $T/2 \leq t < T$ ($20\text{ ms}$)** :
    La tension de source s'inverse : $v(t) = -E = -200\text{ V}$. Cependant, l'inductance s'oppose à la décroissance du courant et force la diode à rester passante. Le courant est régi par la nouvelle équation différentielle :
    $$-E = R \cdot i(t) + L \frac{di(t)}{dt} \implies i(t) = A e^{-\frac{t - T/2}{\tau}} - \frac{E}{R}$$
    Par continuité du courant en $t = T/2$, on détermine la constante $A$ :
    $$i(T/2) = A - 20 \implies A = 20,199\text{ A}$$
    Le courant s'écrit alors pour $t \geq T/2$ :
    $$i(t) = 20,199 \cdot e^{-(t - 0,01)} - 20$$
    Le courant décroît lentement et s'annule à un instant $t_{ext}$ appelé instant d'extinction :
    $$0 = 20,199 \cdot e^{-(t_{ext} - 0,01)} - 20 \implies e^{-(t_{ext} - 0,01)} = 0,9901 \implies t_{ext} = 0,01 - \ln(0,9901) \approx 19,95\text{ ms}$$
    La diode reste donc passante sur la quasi-totalité de l'alternance négative ($19,95\text{ ms}$ sur $20\text{ ms}$ de période globale) ! 
    Durant toute cette phase, la tension aux bornes de la charge est négative : $u_c(t) = v(t) = -200\text{ V}$.
*   **Commentaires sur les valeurs moyennes** :
    Puisque la diode conduit durant presque toute la période, la tension moyenne aux bornes de la charge est presque nulle :
    $$\langle u_c \rangle \approx \frac{1}{T} \left( \int_{0}^{T/2} E dt + \int_{T/2}^{T} -E dt \right) = 0\text{ V}$$
    $$\langle i \rangle \approx 0\text{ A}$$
    L'inductance a stocké de l'énergie réactive durant l'alternance positive pour la restituer intégralement à la source durant l'alternance négative. Le montage est totalement inefficace pour effectuer un redressement de puissance.

:::
:::exercise label="TD II" title="Exercice II : Montage Fonctionnel avec Diode de Roue Libre"
**Énoncé** : Pour corriger ce défaut, on ajoute une diode de roue libre $D_{rl}$ en antiparallèle aux bornes de la charge RL.

#### 1. Régime permanent
Le dispositif est en fonctionnement stabilisé depuis plusieurs minutes (régime permanent établi).
*   **Propriété fondamentale** : La valeur moyenne de la tension aux bornes de l'inductance sur une période complète est rigoureusement nulle  :
    $$\langle u_L(t) \rangle = L \left\langle \frac{di}{dt} \right\rangle = \frac{L}{T} \int_{0}^{T} \frac{di}{dt} dt = \frac{L}{T} [i(T) - i(0)] = 0\text{ V}$$
    car en régime permanent, le courant est périodique : $i(T) = i(0)$.
*   **Calcul de la tension moyenne $\langle u_c \rangle$ et du courant moyen $\langle i_{ch} \rangle$ dans la charge** :
    - Durant l'alternance positive $0 \leq t < T/2$ : la diode de redressement $D$ conduit, ce qui applique la tension $u_c(t) = E = 200\text{ V}$ à la charge. La diode de roue libre $D_{rl}$ est bloquée car soumise à une tension inverse.
    - Durant l'alternance négative $T/2 \leq t < T$ : la diode $D$ se bloque. Le courant dans la charge RL commute instantanément dans la diode de roue libre $D_{rl}$. La tension aux bornes de la charge est fixée par la diode conductrice à $u_c(t) = -v_{D_{rl}} \approx 0\text{ V}$.
    La tension moyenne redressée est donc :
    $$\langle u_c \rangle = \frac{1}{T} \left( \int_{0}^{T/2} E dt + \int_{T/2}^{T} 0 dt \right) = \frac{E}{2} = \frac{200}{2} = 100\text{ V}$$
    En appliquant la loi des mailles moyenne :
    $$\langle u_c \rangle = R \langle i_{ch} \rangle + \langle u_L \rangle \implies \langle i_{ch} \rangle = \frac{\langle u_c \rangle}{R} = \frac{100\text{ V}}{10\ \Omega} = 10\text{ A}$$
    La diode de roue libre a complètement supprimé la tension négative aux bornes de la charge et a permis d'obtenir un courant moyen parfaitement stable et lissé de $10\text{ A}$.

:::grid two-col
:::block type="method" title="Simulation associee"
Visualisez en temps réel l'effet d'une diode de roue libre connectée en parallèle avec une charge fortement inductive RL ($10\text{ H}$). Observez la conduction alternée de la diode principale et de la diode de roue libre, maintenant la tension de charge toujours positive ou nulle.
:::

:::circuitjs label="CircuitJS" title="Redresseur simple alternance RL avec diode de roue libre" iframeTitle="Simulation CircuitJS Redresseur simple alternance RL avec diode de roue libre" src="https://www.falstad.com/circuit/circuitjs.html?cct=$+1+0.000005+10.24+50+5+50%0Ar+160+80+160+160+0+10%0Al+160+160+160+240+0+10+0.01%0Ad+160+240+160+300+0+0.8%0Aw+160+300+320+300+0%0Aw+160+80+320+80+0%0Av+320+300+320+80+0+1+50+200+0+0+0.5%0Ad+160+80+160+240+1+0.8%0A"
:::
:::

:::
:::exercise label="TD II" title="Exercice III : Régulation de tension par Diode Zener"
**Énoncé** : On applique la méthode de superposition statique/dynamique pour analyser un régulateur de tension à diode Zener. La source de tension est imparfaite et présente une ondulation alternative superposée sur sa composante continue  :
$$e(t) = E_{dc} + \tilde{e}(t) = 8 + 2 \sin(\omega t)\text{ V} \quad (f = 1\text{ kHz})$$
La diode Zener $D_z$ est caractérisée par  :
- Tension de seuil direct : $U_{0} = 0,62\text{ V}$ (résistance dynamique $r_d = 0,2\ \Omega$)
- Tension de Zener (stabilisation inverse) : $U_{z0} = 5,4\text{ V}$ (résistance dynamique inverse $r_z = 0,8\ \Omega$).
On souhaite concevoir le régulateur pour obtenir un point de repos statique stable caractérisé par un courant de polarisation inverse permanent de $I_{z0} = 0,5\text{ A}$ dans la diode Zener.

#### 1. Étude en Régime Statique (Composante Continue)
En régime statique, on éteint l'ondulation alternative ($\tilde{e} = 0$). La source se réduit à sa composante continue $E_{dc} = 8\text{ V}$.
La diode Zener fonctionne dans sa zone d'avalanche inverse stable. Elle est donc équivalente à sa tension Zener nominale $U_{z0}$ en série avec sa résistance dynamique inverse $r_z$  :
$$U_{z} = U_{z0} + r_z \cdot I_{z0} = 5,4 + 0,8 \times 0,5 = 5,8\text{ V}$$
*   **Calcul de la résistance de protection $R$** :
    En appliquant la loi des mailles statique :
    $$E_{dc} = R \cdot I_{z0} + U_z \implies R = \frac{E_{dc} - U_z}{I_{z0}} = \frac{8 - 5,8}{0,5} = \frac{2,2}{0,5} = 4,4\ \Omega$$
*   **Calcul de la puissance dissipée dans la résistance $R$** :
    $$P_R = R \cdot I_{z0}^2 = 4,4 \times 0,5^2 = 1,1\text{ W}$$
    Il faudra donc choisir une résistance de puissance nominale d'au moins $2\text{ W}$ pour éviter une surchauffe destructive.

#### 2. Étude en Régime Dynamique Petits Signaux (Ondulation)
En régime dynamique, on éteint les sources de tension continues ($E_{dc} \to 0$ et $U_{z0} \to 0$). La diode Zener est alors modélisée uniquement par sa résistance dynamique petits signaux inverse $r_z = 0,8\ \Omega$.
Le circuit dynamique équivalent est un simple diviseur de tension alimenté par la source d'ondulation $\tilde{e}(t) = 2 \sin(\omega t)\text{ V}$  :
*   **Calcul de l'ondulation du courant $\tilde{i}(t)$** :
    $$\tilde{i}(t) = \frac{\tilde{e}(t)}{R + r_z} = \frac{2 \sin(\omega t)}{4,4 + 0,8} = \frac{2}{5,2} \sin(\omega t) \approx 0,385 \sin(\omega t)\text{ A}$$
*   **Calcul de l'ondulation de la tension de sortie $\tilde{u}_z(t)$** :
    $$\tilde{u}_z(t) = r_z \cdot \tilde{i}(t) = 0,8 \times 0,385 \sin(\omega t) \approx 0,308 \sin(\omega t)\text{ V}$$
    L'ondulation de tension de la source est ainsi réduite de $2\text{ V}$ crête à seulement $0,308\text{ V}$ crête sur la charge stabilisée, ce qui représente un taux d'atténuation (réjection de l'ondulation) de :
    $$\alpha = \frac{r_z}{R + r_z} = \frac{0,8}{5,2} \approx 15,38\% \quad (\text{soit } -16,25\text{ dB})$$

#### 3. Synthèse Temporelle et Bilan Thermique
*   **Expression complète temporelle du courant $i(t)$** :
    $$i(t) = I_{z0} + \tilde{i}(t) = 0,5 + 0,385 \sin(\omega t)\text{ A}$$
*   **Expression complète temporelle de la tension régulée $u_z(t)$** :
    $$u_z(t) = U_{z} + \tilde{u}_z(t) = 5,8 + 0,308 \sin(\omega t)\text{ V}$$
*   **Puissance active moyenne dissipée par la diode Zener** :
    La puissance instantanée est $p_z(t) = u_z(t) \cdot i(t)$. La puissance moyenne est :
    $$P_z = \langle u_z(t) \cdot i(t) \rangle = \langle (U_{z0} + r_z \cdot i(t)) \cdot i(t) \rangle = U_{z0} \langle i(t) \rangle + r_z \langle i(t)^2 \rangle$$
    En régime sinusoïdal, la valeur quadratique moyenne du courant est :
    $$\langle i(t)^2 \rangle = I_{z0}^2 + I_{eff,ac}^2 = I_{z0}^2 + \frac{\tilde{I}_{max}^2}{2} = 0,5^2 + \frac{0,385^2}{2} = 0,25 + 0,0741 = 0,3241\text{ A}^2$$
    On en déduit la puissance thermique moyenne totale :
    $$P_z = 5,4 \times 0,5 + 0,8 \times 0,3241 = 2,7 + 0,259 \approx 2,959\text{ W}$$
    La diode Zener dissipe environ $2,96\text{ W}$, ce qui nécessite obligatoirement l'utilisation d'un radiateur de refroidissement thermique dimensionné.

:::grid two-col
:::block type="method" title="Simulation associee"
Observez la superposition dynamique de l'ondulation alternative sur la composante continue de la source. Visualisez comment la diode Zener écrête et stabilise la tension de sortie à $5,8\text{ V}$ malgré une oscillation importante à l'entrée.
:::

:::circuitjs label="CircuitJS" title="Régulateur de tension à Diode Zener" iframeTitle="Simulation CircuitJS Régulateur de tension à Diode Zener" src="https://www.falstad.com/circuit/circuitjs.html?cct=$+1+0.000005+10.24+50+5+50%0Ar+160+80+240+80+0+4.4%0Az+240+80+240+200+1+0.8+5.4%0Av+160+200+160+80+0+4+1000+2+8+0+0.5%0Aw+160+200+240+200+0%0Ao+3+64+0+35+10+0.5+0+-1%0A"
:::
:::

:::
:::
