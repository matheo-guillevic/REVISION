---
title: "TD V corrige - AOP reels et limites dynamiques"
subject: "EP331-Electronique-analogique"
type: "td"
target: "EP331-Electronique-analogique-td5.html"
eyebrow: "EP331 - TD 5"
heading: "AOP reels et limites dynamiques"
summary: "Correction guidee avec formules utiles et simulations CircuitJS pour les montages analogiques."
---
:::section id="ep331-td5-aop-reels" eyebrow="TD V" title="AOP reels et limites dynamiques" summary="Corrections guidees, formules utiles et simulations CircuitJS."

:::exercise label="TD V" title="Exercice I : Dérive Temporelle d'un Intégrateur Actif par Courant de Polarisation"
**Énoncé** : On étudie l'effet des courants de polarisation sur le montage intégrateur classique. L'AOP réel est de vieille génération avec des courants de polarisation d'entrée : $I_b^- = 100\text{ nA}$ et $I_b^+ = 80\text{ nA}$. La capacité d'intégration est $C = 100\text{ nF}$ et la résistance d'entrée est $R = 100\text{ k}\Omega$. La tension d'entrée nominale de mesure est prise nulle : $v_e = 0\text{ V}$.

:::grid two-col
:::block type="method" title="Simulation associee"
Le schema du TD est remplace par une simulation CircuitJS equivalente pour manipuler les grandeurs du montage.
:::

:::circuitjs label="CircuitJS" title="Integrateur AOP" iframeTitle="Simulation CircuitJS integrateur a AOP" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=amp-integ.txt"
:::
:::

#### 1. Modélisation du signal de dérive d'offset
En l'absence de signal d'entrée ($v_e = 0$), l'AOP parfait donnerait une sortie rigoureusement nulle ($v_s(t) = 0\text{ V}$). 
Dans l'AOP réel, le courant de polarisation $I_b^-$ ne peut pas circuler à travers l'entrée de l'AOP (dont l'impédance est infinie). Il est donc contraint de s'écouler à travers la boucle de contre-réaction, chargeant continuellement le condensateur d'intégration $C$.
L'équation du courant de charge du condensateur s'écrit :
$$i_C(t) = I_b^- = C \frac{dv_s(t)}{dt}$$
En intégrant par rapport au temps avec un condensateur initialement déchargé ($v_s(0) = 0\text{ V}$)  :
$$v_s(t) = \frac{I_b^-}{C} \cdot t$$
*   **Calcul de la rampe de dérive pour un AOP de vieille génération ($I_b^- = 100\text{ nA}$)**  :
    $$v_s(t) = \frac{100 \cdot 10^{-9}}{100 \cdot 10^{-9}} \cdot t = 1,0 \cdot t\text{ V/s}$$
    La tension de sortie dérive à la vitesse de $1\text{ V}$ par seconde. Si l'AOP est alimenté sous $V_{cc} = \pm 15\text{ V}$ (avec une tension de saturation de $V_{sat} = \pm 13\text{ V}$), l'intégrateur va saturer complètement en seulement :
    $$t_{sat} = \frac{V_{sat}}{1,0} = 13\text{ secondes}$$
    Ce montage est inutilisable en pratique sans correction.
*   **Calcul pour un AOP de dernière génération (BiFET à entrées JFET : $I_b^- = 10\text{ pA}$)**  :
    $$v_s(t) = \frac{10 \cdot 10^{-12}}{100 \cdot 10^{-9}} \cdot t = 10^{-4} \cdot t\text{ V/s} = 0,1\text{ mV/s}$$
    Le temps de saturation est repoussé à :
    $$t_{sat} = \frac{13}{10^{-4}} = 130\ 000\text{ secondes} \approx 36\text{ heures}$$
    La dérive devient tout à fait négligeable sur les échelles de temps de mesure usuelles.

#### 2. Compensation du défaut par Résistance d'Équilibrage
Pour annuler l'effet des courants de polarisation, on insère une résistance de compensation $R_{comp}$ sur l'entrée non-inverseuse ($V_+$) de l'AOP reliée à la masse.
La valeur optimale de cette résistance doit être égale à la résistance équivalente vue de l'entrée inverseuse en statique (avec les sources éteintes) :
$$R_{comp} = R = 100\text{ k}\Omega$$
Dans ce cas, la dérive ne dépend plus des courants de polarisation individuels, mais uniquement du courant de décalage d'offset $I_d = I_b^- - I_b^+ = 20\text{ nA}$. La vitesse de dérive est alors divisée par un facteur de 5.

:::
:::exercise label="TD V" title="Exercice II : Limites d'un AOP Réel (Slew Rate et Bande Passante)"
**Énoncé** : On injecte un signal sinusoïdal $v_e(t) = V_e \cdot \sin(2\pi f \cdot t)$ dans un amplificateur non-inverseur à AOP présentant un gain en boucle fermée de $G = 10$. L'AOP présente les limites dynamiques suivantes :
- Produit Gain-Bande : $PGB = 1\text{ MHz}$
- Vitesse de balayage limite : $Slew\ Rate\ (SR) = 0,5\text{ V/\mu s}$.

#### 1. Calcul de la Bande Passante en boucle fermée
Le produit gain-bande d'un AOP compensé en fréquence est constant en boucle fermée :
$$G \cdot f_{cb} = PGB \implies f_{cb} = \frac{PGB}{G} = \frac{10^6\text{ Hz}}{10} = 100\text{ kHz}$$
Le montage pourra amplifier linéairement des signaux de faible amplitude jusqu'à la fréquence de coupure de $100\text{ kHz}$.

#### 2. Distorsion non linéaire par Slew Rate (Limitation en puissance)
Dès que l'amplitude du signal de sortie est importante, l'AOP ne peut pas suivre les variations trop rapides de la pente du signal.
La tension de sortie attendue est :
$$v_s(t) = G \cdot v_e(t) = V_s \cdot \sin(2\pi f \cdot t) \quad \text{avec } V_s = 10 \cdot V_e$$
La pente maximale de cette tension de sortie intervient au passage par zéro du signal :
$$\left. \frac{dv_s(t)}{dt} \right|_{max} = V_s \cdot 2\pi f$$
Pour éviter toute distorsion non linéaire majeure (distorsion dynamique de Slew Rate), la pente maximale du signal ne doit jamais excéder la vitesse limite d'écriture de l'AOP :
$$\left. \frac{dv_s(t)}{dt} \right|_{max} \leq SR \implies V_s \cdot 2\pi f \leq SR$$
*   **Calcul de la tension de sortie maximale admissible à la fréquence de coupure $f_{cb} = 100\text{ kHz}$** :
    $$V_{s,max} = \frac{SR}{2\pi f_{cb}} = \frac{0,5 \cdot 10^6\text{ V/s}}{2\pi \times 100 \cdot 10^3\text{ Hz}} = \frac{500\ 000}{628\ 318} \approx 0,795\text{ V}$$
    À $100\text{ kHz}$, la tension de sortie maximale sans distorsion n'est que de $0,795\text{ V}$ (soit un signal d'entrée de $79,5\text{ mV}$). Si on injecte un signal plus fort, la sortie sera distordue et prendra une forme triangulaire de pente constante $\pm SR$ [slew_rate_limitation.png].
*   **Calcul de la fréquence maximale de pleine puissance $f_{p}$ pour une tension de sortie nominale de $V_s = 10\text{ V}$** :
    $$f_{p} = \frac{SR}{2\pi V_s} = \frac{0,5 \cdot 10^6}{2\pi \times 10} = \frac{500\ 000}{62,83} \approx 7,957\text{ kHz}$$
    Pour exploiter la pleine échelle dynamique de l'AOP ($10\text{ V}$), la fréquence du signal de sortie doit être limitée à seulement $7,96\text{ kHz}$ sous peine de distorsion sévère par Slew Rate.

:::
:::
