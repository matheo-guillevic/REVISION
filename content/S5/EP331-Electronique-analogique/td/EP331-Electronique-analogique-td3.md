---
title: "TD III corrige - Amplification a transistors bipolaires"
subject: "EP331-Electronique-analogique"
type: "td"
target: "EP331-Electronique-analogique-td3.html"
eyebrow: "EP331 - TD 3"
heading: "Amplification a transistors bipolaires"
summary: "Correction guidee avec formules utiles et simulations CircuitJS pour les montages analogiques."
---
:::section id="ep331-td3-bjt" eyebrow="TD III" title="Amplification a transistors bipolaires" summary="Corrections guidees, formules utiles et simulations CircuitJS."

:::exercise label="TD III" title="Exercice I : Analyse de l'Étage Amplificateur 1 (Émetteur Commun)"
**Énoncé** : On étudie un amplificateur de type émetteur commun stabilisé par pont de base.
*   **Données** : $V_{cc} = 12\text{ V}$, $R_1 = 24\text{ k}\Omega$, $R_2 = 1,5\text{ k}\Omega$, $R_E = 100\ \Omega$, $R_c = 5\text{ k}\Omega$, $C_{l1} = 1\ \mu\text{F}$, $\beta = 100$, $V_{be} = 0,6\text{ V}$.

:::grid two-col
:::block type="method" title="Simulation associee"
Le schema du TD est remplace par une simulation CircuitJS equivalente pour manipuler les grandeurs du montage.
:::

:::circuitjs label="CircuitJS" title="Emetteur commun" iframeTitle="Simulation CircuitJS amplificateur BJT emetteur commun" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=ceamp.txt"
:::
:::

#### 1. Étude Statique et Point de Repos $Q(I_{C0}, V_{CE0})$
On applique le théorème de Thévenin sur le pont d'entrée pour simplifier le réseau de polarisation de base :
$$E_{th} = V_{cc} \frac{R_2}{R_1 + R_2} = 12 \times \frac{1,5}{24 + 1,5} = 12 \times \frac{1,5}{25,5} \approx 0,7059\text{ V}$$
$$R_{th} = R_1 \parallel R_2 = \frac{24 \times 1,5}{24 + 1,5} = \frac{36}{25,5} \approx 1,4118\text{ k}\Omega$$
L'équation de maille d'entrée s'écrit :
$$E_{th} = R_{th} \cdot I_{B0} + V_{be} + R_E \cdot I_{E0}$$
En utilisant la relation fondamentale du transistor linéaire $I_{E0} = (\beta + 1) I_{B0}$ :
$$E_{th} - V_{be} = [R_{th} + (\beta + 1) R_E] \cdot I_{B0}$$
$$I_{B0} = \frac{0,7059 - 0,6}{1411,8 + 101 \times 100} = \frac{0,1059}{11511,8} \approx 9,199\ \mu\text{A}$$
On calcule alors le courant de collecteur et d'émetteur de repos :
$$I_{C0} = \beta \cdot I_{B0} = 100 \times 9,199\ \mu\text{A} \approx 0,920\text{ mA}$$
$$I_{E0} = (\beta + 1) I_{B0} = 101 \times 9,199\ \mu\text{A} \approx 0,929\text{ mA}$$
La tension de repos collecteur-émetteur est :
$$V_{CE0} = V_{cc} - R_c I_{C0} - R_E I_{E0} = 12 - 5000 \times 0,920 \cdot 10^{-3} - 100 \times 0,929 \cdot 10^{-3}$$
$$V_{CE0} = 12 - 4,600 - 0,093 = 7,307\text{ V}$$
Le transistor fonctionne bien en régime linéaire puisque $V_{CE0} = 7,31\text{ V} > V_{CE,sat} \approx 0,2\text{ V}$.
La résistance dynamique d'entrée petits signaux de la jonction Base-Émetteur est :
$$r_{be} = \frac{\eta U_t}{I_{B0}} \approx \frac{26\text{ mV}}{9,199\ \mu\text{A}} \approx 2,826\text{ k}\Omega$$

#### 2. Étude Dynamique petits signaux à basse fréquence
Le transistor est modélisé par sa résistance dynamique $r_{be} \approx 2,83\text{ k}\Omega$ et son générateur de courant commandé $\beta \cdot i_b$. La résistance $R_E$ n'est pas découplée.
*   **Expression de l'amplification en tension à vide $A_1 = \frac{v_{s1}}{v_{e1}}$** :
    - Équation d'entrée : $v_{e1} = r_{be} \cdot i_b + R_E (i_b + \beta i_b) = [r_{be} + (\beta + 1) R_E] \cdot i_b$
    - Équation de sortie : $v_{s1} = -R_c \cdot i_c = -\beta R_c \cdot i_b$
    $$A_1 = \frac{v_{s1}}{v_{e1}} = -\frac{\beta R_c}{r_{be} + (\beta + 1) R_E}$$
    $$A_1 = -\frac{100 \times 5000}{2826 + 101 \times 100} = -\frac{500000}{12926} \approx -38,68$$
*   **Calcul de la résistance d'entrée du montage $R_{in1}$** :
    La résistance dynamique équivalente vue par la base du transistor est :
    $$R_{in,base} = \frac{v_{e1}}{i_b} = r_{be} + (\beta + 1) R_E = 2,826 + 10,1 = 12,926\text{ k}\Omega$$
    La résistance d'entrée globale inclut le pont de polarisation en parallèle :
    $$R_{in1} = R_1 \parallel R_2 \parallel R_{in,base} = R_{th} \parallel R_{in,base} = \frac{1,4118 \times 12,926}{1,4118 + 12,926} \approx 1,273\text{ k}\Omega$$
*   **Calcul de la résistance de sortie $R_{out1}$** :
    En éteignant la source d'entrée ($i_b = 0$), le générateur de courant interne s'ouvre, on obtient :
    $$R_{out1} = R_c = 5\text{ k}\Omega$$
*   **Fréquence de coupure basse à $-3\text{ dB}$ due à $C_{l1}$** :
    Le condensateur de liaison d'entrée $C_{l1} = 1\ \mu\text{F}$ forme un filtre passe-haut avec la résistance d'entrée du montage $R_{in1}$  :
    $$f_{c1} = \frac{1}{2\pi R_{in1} C_{l1}} = \frac{1}{2\pi \times 1273 \times 1 \cdot 10^{-6}} \approx 125,02\text{ Hz}$$

:::
:::exercise label="TD III" title="Exercice II : Liaison Capacitive vs Liaison Continue entre les Étages"
**Énoncé** : On associe l'étage amplificateur d'entrée précédent (Étage 1 : Émetteur commun) à un étage suiveur (Étage 2 : Collecteur commun) pour abaisser l'impédance de sortie et adapter la puissance de charge.
*   **Caractéristiques de l'Étage 2 ( CC )** : $R'_1 = 4,7\text{ k}\Omega$, $R'_2 = 7,5\text{ k}\Omega$, $R'_E = 6,5\text{ k}\Omega$, $R_u = 600\ \Omega$, $C'_l = 2,2\ \mu\text{F}$.

#### 1. Liaison Capacitive (AC Coupling)
Les deux étages sont découplés en continu par un condensateur de liaison $C_{l} = 1\ \mu\text{F}$.
*   **Calcul du gain en tension total de la cascade $A_{total} = \frac{v_{s2}}{v_{e1}}$** :
    En dynamique petits signaux, la résistance de charge équivalente vue par le premier collecteur n'est plus $R_c$ seule, mais $R_c$ branchée en parallèle avec la résistance d'entrée globale du second étage $R_{in2}$  :
    $$R_{in2} = R'_1 \parallel R'_2 \parallel [r'_{be} + (\beta + 1) (R'_E \parallel R_u)]$$
    - Calcul du point de repos de l'étage 2 suiveur pour déterminer $r'_{be}$ :
      $$E'_{th} = V_{cc} \frac{R'_2}{R'_1 + R'_2} = 12 \times \frac{7,5}{12,2} \approx 7,377\text{ V}$$
      $$R'_{th} = R'_1 \parallel R'_2 = \frac{4,7 \times 7,5}{12,2} \approx 2,889\text{ k}\Omega$$
      $$I'_{B0} = \frac{E'_{th} - V_{be}}{R'_{th} + (\beta + 1) R'_E} = \frac{7,377 - 0,6}{2889 + 101 \times 6500} = \frac{6,777}{659389} \approx 10,28\ \mu\text{A}$$
      $$r'_{be} = \frac{26\text{ mV}}{10,28\ \mu\text{A}} \approx 2,529\text{ k}\Omega$$
      La résistance d'émetteur équivalente en alternatif est : $R'_{E,eq} = R'_E \parallel R_u = 6500 \parallel 600 \approx 549,3\ \Omega$.
      $$R_{in,cc} = r'_{be} + (\beta + 1) R'_{E,eq} = 2,529 + 101 \times 0,5493 \approx 58,01\text{ k}\Omega$$
      La résistance d'entrée globale du second étage CC est :
      $$R_{in2} = R'_{th} \parallel R_{in,cc} = 2,889 \parallel 58,01 \approx 2,752\text{ k}\Omega$$
*   **Effet de charge sur l'étage 1** :
    La résistance de collecteur totale équivalente du premier étage devient :
    $$R_{c,eq} = R_c \parallel R_{in2} = 5\text{ k}\Omega \parallel 2,752\text{ k}\Omega \approx 1,775\text{ k}\Omega$$
    Le gain réel chargé du premier étage chute à :
    $$A'_1 = -\frac{\beta R_{c,eq}}{r_{be} + (\beta + 1) R_E} = -\frac{100 \times 1775}{12926} \approx -13,73$$
    Le gain du suiveur CC (proche de 1) est :
    $$A_2 = \frac{v_{s2}}{v_{e2}} = \frac{(\beta + 1) R'_{E,eq}}{r'_{be} + (\beta + 1) R'_{E,eq}} = \frac{101 \times 549,3}{2529 + 101 \times 549,3} = \frac{55479}{58008} \approx 0,956$$
    Le gain en tension global cumulé de la cascade est :
    $$A_{total} = A'_1 \cdot A_2 = -13,73 \times 0,956 \approx -13,13$$

#### 2. Liaison Continue (Direct DC Coupling) 
Les deux étages sont reliés directement en continu sans condensateur.
*   **Analyse du couplage DC** :
    Le potentiel de repos du collecteur du premier transistor $V_{C10}$ fixe directement le potentiel de repos de la base du second transistor :
    $$V_{B20} = V_{C10} = V_{cc} - R_c I_{C10} = 12 - 5000 \times 0,920 \cdot 10^{-3} = 7,4\text{ V}$$
    Ce couplage direct élimine le pont de base résistif de l'étage 2 ($R'_1$ et $R'_2$), ce qui augmente de manière importante la résistance d'entrée dynamique $R_{in2}$ du second étage :
    $$R_{in2,DC} = r'_{be} + (\beta + 1) (R'_E \parallel R_u) \approx 58,01\text{ k}\Omega$$
    La résistance de collecteur équivalente du premier étage est désormais bien plus élevée :
    $$R_{c,eq,DC} = R_c \parallel R_{in2,DC} = 5\text{ k}\Omega \parallel 58,01\text{ k}\Omega \approx 4,603\text{ k}\Omega$$
    Le gain du premier étage s'améliore grandement pour atteindre :
    $$A'_{1,DC} = -\frac{100 \times 4603}{12926} \approx -35,61$$
    Le gain global total de la structure en couplage continu est de :
    $$A_{total,DC} = A'_{1,DC} \cdot A_2 = -35,61 \times 0,956 \approx -34,04$$
*   **Comparaison physique importante** :
    1.  **Gain** : Le couplage direct permet un gain 2,5 fois supérieur ($-34$ contre $-13$) car il supprime l'effet de shunt résistif du pont de base du second étage.
    2.  **Bande passante** : La liaison directe élimine le condensateur de liaison, permettant un fonctionnement parfait jusqu'aux fréquences ultra-basses (continu, $f = 0\text{ Hz}$).
    3.  **Stabilité thermique (Mise en garde)** : C'est le point faible du couplage direct. Toute fluctuation de température modifiant le courant de repos du premier transistor sera directement transmise au second étage et fortement amplifiée, risquant de saturer le suiveur.

:::
:::
