---
title: "TD IV corrige - AOP parfaits et circuits lineaires"
subject: "EP331-Electronique-analogique"
type: "td"
target: "EP331-Electronique-analogique-td4.html"
eyebrow: "EP331 - TD 4"
heading: "AOP parfaits et circuits lineaires"
summary: "Correction guidee avec formules utiles et simulations CircuitJS pour les montages analogiques."
---
:::section id="ep331-td4-aop-parfaits" eyebrow="TD IV" title="AOP parfaits et circuits lineaires" summary="Corrections guidees, formules utiles et simulations CircuitJS."

:::exercise label="TD IV" title="Exercice I : Linéarisation d'un Pont de Wheatstone"
**Énoncé** : On étudie la linéarisation de la mesure d'un capteur résistif placé dans un pont de Wheatstone connecté à un AOP parfait fonctionnant en mode linéaire.

:::grid two-col
:::block type="method" title="Simulation associee"
Le schema du TD est remplace par une simulation CircuitJS equivalente pour manipuler les grandeurs du montage.
:::

:::circuitjs label="CircuitJS" title="Pont et AOP" iframeTitle="Simulation CircuitJS montage AOP pour pont de mesure" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=opamp.txt"
:::
:::

#### 1. Expression de la tension différentielle d'entrée
L'AOP étant parfait et fonctionnant en régime linéaire avec contre-réaction négative, nous appliquons le principe d'équipotentialité des entrées  :
$$\varepsilon = V_+ - V_- = 0 \implies V_+ = V_-$$
En utilisant le théorème de Millman aux nœuds $V_+$ (entrée non-inverseuse) et $V_-$ (entrée inverseuse) du pont de Wheatstone :
$$V_- = \frac{\frac{E}{R_1} + \frac{v_s}{R_3}}{\frac{1}{R_1} + \frac{1}{R_3}} = \frac{E \cdot R_3 + v_s \cdot R_1}{R_1 + R_3}$$
$$V_+ = \frac{\frac{E}{R_2} + \frac{0}{R_4}}{\frac{1}{R_2} + \frac{1}{R_4}} = E \cdot \frac{R_4}{R_2 + R_4}$$
L'égalité $V_+ = V_-$ permet d'établir :
$$\frac{E \cdot R_3 + v_s \cdot R_1}{R_1 + R_3} = E \cdot \frac{R_4}{R_2 + R_4} \implies v_s \cdot R_1 = (R_1 + R_3) E \frac{R_4}{R_2 + R_4} - E \cdot R_3$$
$$v_s(x) = E \cdot \left[ \left( 1 + \frac{R_3}{R_1} \right) \frac{R_4}{R_2 + R_4} - \frac{R_3}{R_1} \right]$$

#### 2. Linéarisation avec capteur résistif
On simplifie en prenant trois résistances identiques : $R_1 = R_2 = R_3 = R_0$. La quatrième résistance $R_4$ est le capteur de mesure dont la variation relative est modélisée par le paramètre $x$ ($-0,5 < x < 0,5$)  :
$$R_4 = R_0 (1 + x)$$
En insérant ces valeurs simplifiées dans la fonction de transfert générale :
$$v_s(x) = E \cdot \left[ \left( 1 + 1 \right) \frac{R_0(1+x)}{R_0 + R_0(1+x)} - 1 \right] = E \cdot \left[ 2 \cdot \frac{1+x}{2+x} - 1 \right]$$
$$v_s(x) = E \cdot \left[ \frac{2(1+x) - (2+x)}{2+x} \right] = E \cdot \frac{x}{2+x}$$
*   **Calcul de l'écart à la linéarité** :
    Pour de faibles variations de la grandeur physique mesurée ($x \ll 2$), la tension de sortie s'écrit de façon quasi linéaire :
    $$v_s(x) \approx \frac{E}{2} \cdot x$$
    Cette méthode de conditionnement d'un pont de Wheatstone actif par AOP fournit un signal d'amplitude linéaire par rapport aux petites variations d'impédance du capteur.

:::
:::exercise label="TD IV" title="Exercice II : Montage Universel Inconnu (Analyse Harmonique 20 pts)"
**Énoncé** : On étudie un filtre actif à structure complexe comprenant un AOP parfait et des composants passifs.
- **Composants** : $R_1 = 10\text{ k}\Omega$, $R_2 = 100\ \Omega$, $R_3 = 1\text{ M}\Omega$, $C = 317\text{ nF}$.

#### 1. Compréhension qualitative ("avec les mains")
*   **À très basse fréquence ($f \to 0$, condensateur équivalent à un circuit ouvert)** :
    Le condensateur $C$ bloque tout passage de courant alternatif dans le réseau de boucle. L'impédance équivalente $Z_{DM}$ tend vers $R_3 = 1\text{ M}\Omega$.
    Le montage se comporte comme un amplificateur inverseur classique :
    $$v_s \approx -\frac{Z_{DM}}{R_1} \cdot v_e = -\frac{R_3}{R_1} \cdot v_e = -100 \cdot v_e \implies G_{dB,BF} = 40\text{ dB}$$
*   **À très haute fréquence ($f \to \infty$, condensateur équivalent à un court-circuit)** :
    Le condensateur $C$ court-circuite le signal dynamique vers la masse. L'impédance équivalente $Z_{DM} \to 0$.
    Le gain s'effondre :
    $$v_s \approx 0\text{ V}$$
    Il s'agit donc qualitativement d'un **filtre actif passe-bas du second ordre**.

#### 2. Fonction de Transfert Harmonique Générale $T(p)$
L'impédance équivalente de boucle donnée par l'énoncé est  :
$$Z_{DM}(p) = R_3 \cdot \frac{1 + 2 R_2 C p + R_2 R_3 C^2 p^2}{1 + (2 R_2 + R_3) C p + R_2 R_3 C^2 p^2}$$
Le gain global du montage filtre s'écrit :
$$T(p) = \frac{v_s}{v_e} = -\frac{Z_{DM}(p)}{R_1} = -\frac{R_3}{R_1} \cdot \frac{1 + 2 R_2 C p + R_2 R_3 C^2 p^2}{1 + (2 R_2 + R_3) C p + R_2 R_3 C^2 p^2}$$
*   **Identification des pulsations propres et coefficients d'amortissement** :
    L'expression est normalisée sous la forme :
    $$T(p) = -A_0 \cdot \frac{1 + \frac{2 m_1}{\omega_1} p + \frac{p^2}{\omega_1^2}}{1 + \frac{2 m_0}{\omega_0} p + \frac{p^2}{\omega_0^2}}$$
    Par identification rigoureuse des coefficients :
    - Gain statique (basse fréquence) : $A_0 = \frac{R_3}{R_1} = \frac{10^6}{10^4} = 100$.
    - Pulsation propre du numérateur : $\omega_1 = \frac{1}{C \sqrt{R_2 R_3}} = \frac{1}{317 \cdot 10^{-9} \times \sqrt{100 \times 10^6}} = \frac{1}{317 \cdot 10^{-9} \times 10^4} \approx 315,46\text{ rd/s}$.
    - Pulsation propre du dénominateur : $\omega_0 = \omega_1 \approx 315,46\text{ rd/s}$ (pulsations identiques).
    - Coefficient d'amortissement du numérateur :
      $$2 m_1 = 2 R_2 C \omega_1 \implies m_1 = R_2 C \omega_1 = 100 \times 317 \cdot 10^{-9} \times 315,46 \approx 0,010 \quad (\text{très faiblement amorti}) $$
    - Coefficient d'amortissement du dénominateur :
      $$2 m_0 = (2 R_2 + R_3) C \omega_0 \approx R_3 C \omega_0 = 10^6 \times 317 \cdot 10^{-9} \times 315,46 \approx 100 \quad (\text{suramorti}) $$
*   **Tracé asymptotique et comportement à la résonance** :
    Puisque $m_1 = 0,01 \ll 1$, le filtre présente une résonance inverse extrêmement pointue (un "notch" ou filtre réjecteur de bande) centrée précisément sur la pulsation $\omega_{r} = 315,5\text{ rd/s}$ ($f_0 \approx 50,2\text{ Hz}$).
    Ce montage est un **filtre réjecteur de bande (filtre Notch)** ultra-sélectif, spécifiquement dimensionné pour éliminer les parasites d'alimentation du secteur électrique alternatif ($50\text{ Hz}$).

:::
:::
