---
title: "TD I corrige - Physique, modelisation et commutation de la diode"
subject: "EP331-Electronique-analogique"
type: "td"
target: "EP331-Electronique-analogique-td1.html"
eyebrow: "EP331 - TD 1"
heading: "Physique, modelisation et commutation de la diode"
summary: "Correction guidee avec formules utiles et simulations CircuitJS pour les montages analogiques."
---
:::section id="ep331-td1-diodes" eyebrow="TD I" title="Physique, modelisation et commutation de la diode" summary="Corrections guidees, formules utiles et simulations CircuitJS."

:::exercise label="TD I" title="Exercice I : Diode Parfaite vs Diode Réelle (Régime Statique)"
**Énoncé** : On considère un circuit élémentaire composé d'une source de tension rectangulaire $e(t)$ alternativement égale à $E_1 = 5\text{ V}$ (durant $T/2$) et $-E_2 = -10\text{ V}$ (durant $T/2$), débitant dans une résistance $R = 1\text{ k}\Omega$ en série avec une diode $D$.

#### 1. Étude avec le modèle de la Diode Parfaite (Idéale)
*   **Hypothèse $e(t) = E_1 = 5\text{ V} > 0$** : 
    On suppose la diode passante (ON). Dans ce cas, sa tension aux bornes est nulle : $v_{AK}(t) = 0\text{ V}$. 
    Le courant s'écrit alors en appliquant la loi des mailles :
    $$i(t) = \frac{E_1 - v_{AK}}{R} = \frac{5 - 0}{1000} = 5\text{ mA}$$
    Puisque $i(t) = 5\text{ mA} > 0$, l'hypothèse d'une diode passante est validée.
*   **Hypothèse $e(t) = -E_2 = -10\text{ V} < 0$** :
    On suppose la diode bloquée (OFF). Le courant est donc nul : $i(t) = 0\text{ A}$. 
    La tension aux bornes de la résistance est nulle ($u_R = R \cdot i = 0\text{ V}$). En appliquant la loi des mailles :
    $$v_{AK}(t) = e(t) - u_R = -10\text{ V}$$
    Puisque $v_{AK}(t) = -10\text{ V} < 0$, la jonction est bien polarisée en inverse, ce qui valide l'hypothèse de blocage.

#### 2. Étude avec le modèle de la Diode Réelle (Statique)
On prend en compte les paramètres physiques réels de la diode : tension de seuil $U_0 = 0,62\text{ V}$ et résistance dynamique directe $r_d = 25\ \Omega$.

:::block type="definition"
**Modèle linéaire de la Diode Passante** : Lorsque la diode est passante ($U_{AK} \geq U_0$), elle est équivalente à une force contre-électromotrice $U_0$ en série avec la résistance dynamique $r_d$  :
$$v_{AK}(t) = U_0 + r_d \cdot i(t)$$
:::

*   **Calcul du courant $i_{on}$ et de la tension $v_{AK,on}$ lorsque $e(t) = E_1 = 5\text{ V}$** :
    La diode est passante. La loi des mailles donne :
    $$E_1 = R \cdot i(t) + v_{AK}(t) = R \cdot i(t) + U_0 + r_d \cdot i(t)$$
    En isolant le courant $i(t)$ :
    $$i_{on} = \frac{E_1 - U_0}{R + r_d} = \frac{5 - 0,62}{1000 + 25} = \frac{4,38}{1025} \approx 4,273\text{ mA}$$
    On en déduit la tension exacte aux bornes de la diode en direct :
    $$v_{AK,on} = U_0 + r_d \cdot i_{on} = 0,62 + 25 \times 4,273 \cdot 10^{-3} \approx 0,727\text{ V}$$

:::
:::exercise label="TD I" title="Exercice II : Diode Réelle en Commutation (Étude Dynamique)"
**Énoncé** : On étudie les phases transitoires rapides de mise en conduction (ON) et de blocage (OFF) de la diode réelle précédente ($U_0 = 0,62\text{ V}$, $r_d = 25\ \Omega$). On prend en compte les capacités internes parasites de la jonction PN : capacité de transition (jonction polarisée en inverse) $C_t = 400\text{ pF}$ et capacité de diffusion (due aux charges stockées en direct) $C_d = 100\text{ pF}$.

#### 1. Modèles Dynamiques Équivalents
*   **Diode à l'état bloqué (OFF)** : Équivalente à la capacité de transition $C_t$ seule (circuit ouvert en DC, mais laisse passer les courants transitoires haute fréquence)  :
    $$\text{Schéma équivalent OFF : } A \circ-||\ C_t \ -\circ K$$
*   **Diode à l'état passant (ON)** : Équivalente à la maille statique ($U_0$ et $r_d$) branchée en parallèle avec la capacité de diffusion $C_d$ qui modélise l'accumulation de porteurs minoritaires dans la zone neutre  :
    $$\text{Schéma équivalent ON : } A \circ-\left( r_d \text{ en série avec } U_0 \parallel C_d \right)-\circ K$$

#### 2. Étude de la mise en conduction (Transition OFF $\to$ ON)
La diode est initialement bloquée sous la tension de repos inverse $u_{cd}(0^-) = -E_2 = -10\text{ V}$. À $t=0$, la source passe brusquement à $E_1 = 5\text{ V}$.
La diode ne peut pas devenir conductrice instantanément. Elle doit d'abord décharger sa capacité de transition $C_t$ de $-10\text{ V}$ jusqu'à la tension de seuil $U_0 = 0,62\text{ V}$.
Durant cette première phase transitoire de mise en conduction, le circuit est régi par l'équation différentielle de charge à travers $R$ :
$$E_1 = R \cdot C_t \frac{du_{ak}(t)}{dt} + u_{ak}(t) \implies u_{ak}(t) = E_1 - (E_1 + E_2) e^{-\frac{t}{\tau_t}}$$
avec la constante de temps de transition :
$$\tau_t = R \cdot C_t = 1000 \times 400 \cdot 10^{-12} = 400\text{ ns}$$
*   **Calcul du temps nécessaire $t_{on}$ pour atteindre le seuil de conduction $u_{ak}(t_{on}) = U_0 = 0,62\text{ V}$** :
    $$0,62 = 5 - (5 + 10) e^{-\frac{t_{on}}{\tau_t}} \implies 15 e^{-\frac{t_{on}}{\tau_t}} = 4,38 \implies e^{-\frac{t_{on}}{\tau_t}} = 0,292$$
    $$t_{on} = -\tau_t \ln(0,292) = 400 \cdot 10^{-9} \times 1,231 \approx 492,4\text{ ns}$$

#### 3. Étude du blocage et temps de recouvrement inverse (Transition ON $\to$ OFF)
La diode est initialement passante et parcourue par le courant direct $I_{d1} \approx 4,27\text{ mA}$. À $t=0$, la source passe brusquement à $-E_2 = -10\text{ V}$.
La présence de charges minoritaires stockées dans la jonction (capacité $C_d$ chargée à la tension directe $Eth_1$) maintient la diode à l'état conducteur temporairement.

:::block type="warning"
**Le phénomène de stockage des charges** : Tant que la capacité de diffusion $C_d$ n'est pas complètement déchargée, la tension aux bornes de la diode reste positive ($u_{ak} \approx U_0$). Le courant s'inverse brutalement et devient fortement négatif, limité uniquement par la résistance externe $R$  :
$$I_{dr} = -\frac{E_2 + U_0}{R} = -\frac{10 + 0,62}{1000} = -10,62\text{ mA}$$
:::

Ce temps d'évacuation des charges est le **temps de stockage (ou de déstockage) $t_s$**. Le circuit équivalent de Thévenin vu par la capacité $C_d$ a pour caractéristiques  :
$$Eth_2 = \frac{r_d E_2 - R U_0}{R + r_d} = \frac{25 \times 10 - 1000 \times 0,62}{1025} = -0,361\text{ V}$$
$$R_{th} = \frac{R \cdot r_d}{R + r_d} = \frac{1000 \times 25}{1025} \approx 24,39\ \Omega$$
La constante de temps de déstockage est $\tau_d = R_{th} \cdot C_d = 24,39 \times 100 \cdot 10^{-12} = 2,439\text{ ns}$.
Le temps de stockage $t_s$ nécessaire pour que la tension de la capacité s'annule ($u_{cd}(t_s) = 0\text{ V}$) s'exprime par  :
$$t_s = \tau_d \ln\left(1 + \frac{Eth_1}{-Eth_2}\right)$$
Avec $Eth_1 = v_{AK,on} \approx 0,727\text{ V}$ , on obtient :
$$t_s = 2,439 \cdot 10^{-9} \times \ln\left(1 + \frac{0,727}{0,361}\right) = 2,439 \cdot 10^{-9} \times \ln(3,014) \approx 2,69\text{ ns}$$

Une fois les charges évacuées ($u_{cd} = 0$), la diode commence effectivement à se bloquer. C'est la **phase de transition** où la capacité de transition $C_t$ se charge de $0\text{ V}$ à $-E_2 = -10\text{ V}$ avec une constante de temps $\tau_t = R \cdot C_t = 400\text{ ns}$.
Le temps de transition à 95% est :
$$t_T = 3 \cdot \tau_t = 3 \times 400\text{ ns} = 1200\text{ ns} = 1,2\ \mu\text{s}$$
Le **temps de recouvrement inverse total $t_{rr}$** est la somme des deux phases :
$$t_{rr} = t_s + t_T \approx 2,69\text{ ns} + 1200\text{ ns} \approx 1202,7\text{ ns}$$

#### 4. Fréquence maximum de fonctionnement et Bilans de Puissance
*   **Fréquence maximale $f_{max}$** : Si on limite les phases de commutation à un maximum de $10\%$ de la période $T$ du signal de contrôle pour éviter les pertes thermiques excessives :
    $$0,10 \cdot T \geq t_{rr} \implies T \geq 10 \cdot t_{rr} = 12,027\ \mu\text{s} \implies f_{max} = \frac{1}{T} \approx 83,14\text{ kHz}$$
*   **Bilan de puissance en conduction** :
    Sous un courant constant de $E_1$ ($i(t) \approx 4,27\text{ mA}$ durant la phase passante avec un rapport cyclique de $\alpha = 0,5$) :
    $$P_{cond} = \alpha \cdot \left( U_0 \cdot i_{on} + r_d \cdot i_{on}^2 \right) = 0,5 \times \left( 0,62 \times 4,27 \cdot 10^{-3} + 25 \times (4,27 \cdot 10^{-3})^2 \right)$$
    $$P_{cond} = 0,5 \times \left( 2,647\text{ mW} + 0,456\text{ mW} \right) \approx 1,55\text{ mW}$$
*   **Pertes en commutation au blocage** :
    Pendant le temps de transition $t_T$, la tension de la diode passe de $0$ à $-E_2 = -10\text{ V}$ pendant que le courant remonte de $I_{dr} = -10,62\text{ mA}$ à $0\text{ A}$. L'énergie perdue par cycle au blocage peut être approximée de façon classique par l'intégration du produit $u_{ak}(t) \cdot i(t)$ :
    $$E_{off} \approx \frac{1}{6} \cdot E_2 \cdot |I_{dr}| \cdot t_T = \frac{1}{6} \times 10 \times 10,62 \cdot 10^{-3} \times 1200 \cdot 10^{-9} \approx 21,24\text{ nJ}$$
    À la fréquence maximale $f_{max} = 83,14\text{ kHz}$, la puissance de commutation dissipée est :
    $$P_{sw} = E_{off} \cdot f_{max} = 21,24 \cdot 10^{-9} \times 83,14 \cdot 10^3 \approx 1,76\text{ mW}$$
    On remarque que la puissance perdue en commutation à haute fréquence ($1,76\text{ mW}$) dépasse la puissance active dissipée en conduction statique ($1,55\text{ mW}$), justifiant la limitation de la fréquence de travail pour protéger le composant d'une destruction thermique.

:::
:::
