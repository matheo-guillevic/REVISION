---
title: "EP331-Electronique-analogique"
subject: "EP331-Electronique-analogique"
summary: "Composants electroniques, diodes, redressement, transistors bipolaires, AOP et thermique."
---

:::section id="ep331-intro" eyebrow="Semestre 5" title="EP331-Electronique-analogique" summary="Composants electroniques, circuits analogiques, petits signaux et simulations CircuitJS."
:::dashboard
:::card class="progress-card" kicker="Objectif" title="EP331"
Ce cours est structuré de manière rigoureuse pour couvrir l'intégralité du programme d'Électronique Analogique.
:::

:::card class="priority-card" kicker="Priorites de revision"
1. Séparer systématiquement le régime statique et le régime dynamique.
2. Identifier le modèle du composant : diode idéale, seuil, résistance dynamique, BJT actif ou saturé, AOP parfait ou réel.
3. Vérifier les hypothèses avant d'utiliser une formule : petits signaux, contre-réaction, bande passante, slew rate.
4. Relier chaque simulation CircuitJS aux grandeurs mesurées : tension, courant, point de repos, gain et déphasage.
:::
:::

:::quicklinks
- [Fondations](#ep331-fondations)
- [Diodes](#ep331-diodes)
- [Redressement et Zener](#ep331-redressement-zener)
- [Transistors bipolaires](#ep331-bjt)
- [AOP](#ep331-aop)
- [Thermique](#ep331-thermique)
- [CircuitJS](#ep331-circuitjs)
- [Revision](#ep331-revision)
:::
:::

:::section id="ep331-fondations" eyebrow="Chapitre 0" title="Fondations et methodologie statique / dynamique" summary="Reprendre les lois d electrocinétique et poser la methode petits signaux."

L'électronique analogique repose sur des lois physiques simples, mais l'analyse de circuits non-linéaires complexes nécessite une méthodologie systématique de découplage de signaux : la **méthode de superposition statique/dynamique**.

:::figure src="assets/EP331-Electronique-analogique/methode_statique_dynamique.png" alt="Méthode d'analyse statique et dynamique en électronique analogique." class="td-figure" caption="La méthode centrale du cours : fixer le point de repos en statique, puis linéariser le montage pour étudier les petits signaux."
:::

### 1. Rappels des Lois Fondamentales de l'Électrocinétique

Avant d'aborder les semi-conducteurs, il est impératif de maîtriser les outils fondamentaux de l'analyse des réseaux :
*   **Lois de Kirchhoff** :
    *   **Loi des nœuds** : La somme des courants entrant dans un nœud est égale à la somme des courants sortant ($\sum I_{entrant} = \sum I_{sortant}$).
    *   **Loi des mailles** : La somme algébrique des tensions le long d'une maille fermée est nulle ($\sum V_k = 0$).
*   **Théorème de Superposition** : Dans un circuit linéaire comprenant plusieurs sources indépendantes, la grandeur (tension ou courant) en tout point du circuit est la somme des grandeurs produites par chaque source agissant seule.
*   **Théorème de Thévenin** : Tout réseau dipolaire linéaire peut être modélisé par une source de tension idéale $E_{th}$ en série avec une résistance $R_{th}$.
    *   $E_{th}$ est la tension à vide aux bornes du dipôle.
    *   $R_{th}$ est la résistance équivalente du réseau vue depuis les bornes du dipôle, calculée en éteignant toutes les sources indépendantes (les sources de tension sont remplacées par des courts-circuits, les sources de courant par des circuits ouverts).
*   **Théorème de Norton** : Tout réseau dipolaire linéaire peut être modélisé par une source de courant idéale $I_n$ en parallèle avec une résistance $R_n$ (où $R_n = R_{th}$ et $I_n = E_{th}/R_{th}$).
*   **Théorème de Millman** : Formule découlant directement de la loi des nœuds exprimée en termes de potentiels. Pour un nœud $M$ relié à $N$ branches contenant des potentiels de référence $V_k$ à travers des résistances $R_k$ :
    $$V_M = \frac{\sum_{k=1}^N \frac{V_k}{R_k}}{\sum_{k=1}^N \frac{1}{R_k}}$$

### 2. Le Principe de Superposition Statique et Dynamique

En présence de composants non-linéaires (diodes, transistors), l'application directe des théorèmes de réseaux est impossible. Cependant, si le circuit est excité par une composante continue (DC) sur laquelle se superpose une faible variation temporelle (AC), on peut linéariser le comportement des composants autour du **point de repos**.

:::block type="definition" title="Décomposition temporelle d'une grandeur"
Toute grandeur temporelle $x(t)$ (tension ou courant) peut être modélisée comme la superposition de deux composantes distinctes :
$$x(t) = X_0 + \tilde{x}(t)$$
*   **$X_0$** : Composante continue ou moyenne, dite **statique** (Point de repos).
*   **$\tilde{x}(t)$** : Composante variable à valeur moyenne nulle, dite **dynamique** (faible ondulation ou petits signaux).
:::

:::block type="method" title="Méthodologie d'Analyse en Deux Étapes"
L'étude de tout circuit d'électronique analogique s'effectue obligatoirement selon les deux étapes découplées suivantes :

1.  **Analyse Statique (Étude du point de repos $Q$)** :
    *   On cherche à déterminer les courants et tensions continus ($I_{D0}$, $V_{D0}$ pour une diode, ou $I_{C0}$, $V_{CE0}$ pour un transistor).
    *   **Règle d'extinction** : On éteint toutes les sources alternatives (remplacées par leur résistance interne, soit un fil pour une tension alternative).
    *   **Traitement des capacités** : Les capacités bloquent le continu en régime permanent. Elles ont une impédance infinie ($Z_C \to \infty$) et sont remplacées par des **circuits ouverts**.
    *   **Traitement des inductances** : En continu, les inductances se comportent comme des conducteurs parfaits. Elles ont une impédance nulle ($Z_L \to 0$) et sont remplacées par des **courts-circuits**.

2.  **Analyse Dynamique (Étude en petits signaux)** :
    *   On étudie la réponse du circuit aux signaux variables (ex: amplification de tension alternative $\tilde{v}_e$).
    *   **Règle d'extinction** : On éteint toutes les sources d'alimentation continues (DC) car la masse dynamique est le potentiel de référence AC. Les sources de tension continue stables deviennent des **masses dynamiques** (court-circuit AC).
    *   **Traitement des capacités** : Les capacités d'accouplement ou de découplage sont dimensionnées pour avoir une impédance négligeable à la fréquence de travail ($\frac{1}{C\omega} \approx 0$). Elles sont remplacées par des **courts-circuits**.
    *   **Modélisation linéaire** : Les composants non-linéaires sont remplacés par leurs schémas équivalents linéarisés pour de faibles variations (petits signaux) autour du point de repos déterminé lors de l'étape statique.
:::

:::

:::section id="ep331-diodes" eyebrow="Chapitre I" title="Physique et modelisation de la diode" summary="Comprendre la jonction PN, la loi de Shockley et les modeles lineaires."

La diode est le composant semi-conducteur de base. Sa compréhension physique est indispensable pour appréhender les composants plus complexes (transistors, AOP).

### 1. Physique de la Jonction PN

La jonction PN est constituée par l'association d'un monocristal de Silicium dopé différemment dans deux zones adjacentes :
*   **La zone P (Anode)** : Dopée par des atomes accepteurs (ex: Bore) créant un excès de trous (porteurs majoritaires) et laissant des ions accepteurs fixes négatifs.
*   **La zone N (Cathode)** : Dopée par des atomes donneurs (ex: Phosphore) créant un excès d'électrons (porteurs majoritaires) et laissant des ions donneurs fixes positifs.

#### La Zone de Charge d'Espace (ZCE)
À la frontière de la jonction, un phénomène de **diffusion** se produit : les électrons de la zone N traversent la jonction pour se recombiner avec les trous de la zone P. Cette diffusion laisse derrière elle des charges fixes non compensées : des ions positifs du côté N et des ions négatifs du côté P. 
Ce double feuillet de charges fixes crée un **champ électrique interne** $\vec{E}$ dirigé de N vers P. Ce champ s'oppose à la diffusion des porteurs majoritaires et favorise un courant de dérive des porteurs minoritaires. À l'équilibre, un état stationnaire est atteint, formant une région vide de porteurs mobiles appelée **Zone de Charge d'Espace (ZCE)** ou zone de transition. Elle engendre une barrière de potentiel interne $V_0$ (environ $0.7\text{ V}$ pour le Silicium).

:::figure src="assets/EP331-Electronique-analogique/jonction_pn.png" alt="Jonction PN avec zone de charge d'espace, champ électrique interne et porteurs." class="td-figure" caption="La ZCE explique pourquoi une diode ne se comporte pas comme un simple fil : elle crée une barrière interne que la polarisation directe ou inverse modifie."
:::

### 2. Équation de Shockley et Caractéristique Réelle

Lorsqu'une tension externe $U_{ak}$ est appliquée aux bornes de la diode, la barrière de potentiel est modifiée :
*   **Polarisation Directe ($U_{ak} > 0$)** : Le champ externe s'oppose au champ interne. La ZCE se rétrécit, la barrière de potentiel s'abaisse et un courant important de porteurs majoritaires traverse facilement la jonction.
*   **Polarisation Inverse ($U_{ak} < 0$)** : Le champ externe renforce le champ interne. La ZCE s'élargit et le courant est quasi-nul (limité à un courant de fuite de porteurs minoritaires extrêmement faible $I_s$).

L'expression analytique reliant le courant d'anode $I_{ak}$ à la tension d'anode-cathode $U_{ak}$ est donnée par l'**Équation de Shockley** :

$$I_{ak} = I_s \left( e^{\frac{U_{ak}}{\eta U_t}} - 1 \right)$$

Où :
*   **$I_s$** : Courant de saturation inverse (courant thermique de fuite, de l'ordre de quelques pA à quelques nA pour le Silicium à $25^\circ\text{C}$).
*   **$\eta$** : Facteur d'idéalité du matériau (typiquement compris entre $1$ et $2$ pour le Silicium).
*   **$U_t$** : Tension thermique définie par la constante de Boltzmann $k$, la température absolue $T$ en Kelvin et la charge de l'électron $q$ :
    $$U_t = \frac{k T}{q}$$
    À la température ambiante de $T = 298\text{ K}$ ($25^\circ\text{C}$), la constante physique vaut :
    $$U_t \approx 25.8\text{ mV} \approx 26\text{ mV}$$

:::figure src="assets/EP331-Electronique-analogique/caracteristique_diode.png" alt="Caractéristique courant-tension d'une diode avec modèles idéal, seuil et résistance dynamique." class="td-figure" caption="La caractéristique réelle est non linéaire ; les modèles par morceaux permettent de faire les calculs de circuit sans résoudre Shockley à chaque fois."
:::

#### Phénomène d'Avalanche
En polarisation inverse élevée ($U_{ak} \ll 0$), si la tension inverse dépasse un certain seuil critique appelé **tension d'avalanche** ($U_{av}$ ou $V_{BR}$), le champ électrique dans la ZCE devient si intense qu'il arrache des électrons de valence (ionisation par impact). Ces porteurs libérés sont accélérés et provoquent d'autres collisions en cascade. Le courant inverse croît alors de façon exponentielle sans limite externe. Ce phénomène est destructeur par échauffement pour une diode normale, mais exploité de façon réversible pour les diodes Zener.

### 3. Modélisations Linéaires de la Diode

Pour analyser simplement les circuits réels, on substitue la courbe continue non-linéaire de Shockley par des modèles linéaires par morceaux :

1.  **Modèle Idéal (Diode Parfaite)** :
    *   Si $U_{ak} < 0$ : Diode bloquée (OFF), assimilée à un **interrupteur ouvert** ($I_{ak} = 0$).
    *   Si $I_{ak} > 0$ : Diode passante (ON), assimilée à un **interrupteur fermé** ($U_{ak} = 0$).
2.  **Modèle avec Tension de Seuil** :
    *   Si $U_{ak} < V_0$ : Diode bloquée (OFF), assimilée à un interrupteur ouvert ($I_{ak} = 0$).
    *   Si $I_{ak} > 0$ : Diode passante (ON), assimilée à une **source de tension idéale de valeur $V_0$** ($U_{ak} = V_0 \approx 0.6\text{ V} - 0.7\text{ V}$).
3.  **Modèle Linéaire Réel (avec Résistance Dynamique)** :
    *   Si $U_{ak} < V_0$ : Diode bloquée (OFF), assimilée à un interrupteur ouvert ($I_{ak} = 0$).
    *   Si $I_{ak} > 0$ : Diode passante (ON), modélisée par une **force contre-électromotrice $V_0$ en série avec une résistance dynamique $r_d$** :
        $$U_{ak} = V_0 + r_d \cdot I_{ak}$$
        La résistance dynamique $r_d$ est l'inverse de la pente locale de la caractéristique :
        $$r_d = \left( \frac{d I_{ak}}{d U_{ak}} \right)^{-1} = \frac{\eta U_t}{I_{ak}}$$

### 4. Étude Temporelle en Commutation

Le passage d'une diode de l'état passant à l'état bloqué (ou inversement) n'est pas instantané en raison des capacités internes parasites de la jonction :
*   **La capacité de transition $C_t$** : Liée aux charges fixes dans la ZCE en polarisation inverse. Sa valeur dépend de la tension inverse appliquée.
*   **La capacité de diffusion $C_d$** : Liée au stockage des charges mobiles minoritaires à proximité de la jonction en polarisation directe.

#### Le Blocage (Reverse Recovery) et Temps de Recouvrement Inverse $t_{rr}$
Lorsqu'un échelon de tension inverse ($E_2$) est brusquement appliqué à une diode conductrice :

:::block type="method" title="Les 2 Phases Temporelles du Blocage d'une Diode"
*   **Phase 1 : Le temps de stockage ($t_s$)**
    *   La jonction reste fortement enrichie en porteurs minoritaires. La tension $U_{ak}$ reste voisine de $V_0$.
    *   Le courant s'inverse brutalement et prend une valeur négative limitée uniquement par la résistance série externe $R$ : $I_{dr} \approx -\frac{E_2 - V_0}{R}$.
    *   Le courant reste constant ou décroît lentement tant que la capacité de diffusion $C_d$ n'a pas évacué la totalité de sa charge stockée $Q_{rr}$.
*   **Phase 2 : Le temps de transition ($t_T$)**
    *   Une fois la charge de diffusion éliminée, la barrière de potentiel se reforme. La diode commence à bloquer la tension.
    *   Le courant décroît de façon exponentielle de sa valeur négative maximale $I_{dr}$ vers $0$ tandis que la capacité de transition $C_t$ se charge sous la tension inverse $-E_2$.
    *   La constante de temps régissant cette décroissance exponentielle vaut $\tau_t \approx R \cdot C_t$.
:::

Le temps total nécessaire au blocage complet est appelé **temps de recouvrement inverse** :
$$t_{rr} = t_s + t_T$$

:::figure src="assets/EP331-Electronique-analogique/recouvrement_inverse.png" alt="Chronogramme du courant de diode pendant le recouvrement inverse." class="td-figure" caption="Le courant inverse transitoire rappelle qu'une diode réelle ne passe pas instantanément de l'état passant à l'état bloqué."
:::

### 5. Technologie de la Diode Schottky

La diode **Schottky** n'utilise pas une jonction PN classique, mais une jonction **métal-semi-conducteur** (généralement du métal déposé sur un silicium dopé N).

:::block type="warning" title="Propriétés fondamentales de la Diode Schottky"
1.  **Seuil de conduction réduit** : Sa tension de seuil $V_{0\_Schottky}$ est typiquement de $0.25\text{ V} - 0.4\text{ V}$ contre $0.7\text{ V}$ pour une jonction PN au Silicium. Cela réduit considérablement les pertes par conduction ($P = V_0 \cdot I$).
2.  **Commutation ultra-rapide ($t_{rr} \approx 0$)** : Le transport du courant dans une diode Schottky est assuré exclusivement par des porteurs majoritaires (les électrons du semi-conducteur N entrant dans le métal). Il n'y a **aucun stockage de porteurs minoritaires**, de sorte que la capacité de diffusion $C_d$ est inexistante. Le temps de stockage $t_s$ est rigoureusement nul. La vitesse de commutation n'est limitée que par la faible capacité de transition électrostatique $C_t$.
3.  **Inconvénient** : Tension inverse maximale admissible généralement plus faible et courants de fuite inverse plus élevés que les jonctions PN classiques.
:::

:::

:::section id="ep331-redressement-zener" eyebrow="Chapitre II" title="Redressement et diode Zener" summary="Analyser les montages de redressement, la roue libre et la regulation Zener."

### 1. Redressement simple alternance sur charge inductive (RL)

Le redressement consiste à convertir une tension alternative sinusoïdale en une tension unidirectionnelle. L'étude d'un récepteur inductif (charge RL) met en évidence l'effet de stockage d'énergie magnétique.

En appliquant un signal d'entrée carré ou sinusoïdal $v(t)$, la diode conduit durant l'alternance positive. Le courant dans la charge RL est imposé par une équation différentielle du premier ordre : les formules utiles sont regroupées dans le bloc associé à la simulation.

#### Phénomène d'extinction de la diode et rôle de la Diode de Roue Libre ($D_{rl}$)
En raison de la présence de l'inductance $L$, le courant ne peut s'annuler instantanément. Lorsque la tension d'entrée $v(t)$ devient négative (après $t = T/2$), l'inductance libère son énergie magnétique stockée pour maintenir la circulation du courant. La diode reste conductrice ($v_d = 0$) et la tension aux bornes de la charge $u_c(t) = v(t)$ prend des valeurs négatives. La diode ne bloque que lorsque le courant s'annule naturellement à un instant $t_e > T/2$. Cela dégrade l'efficacité du redressement (la valeur moyenne de la tension redressée chute).

:::block type="remember" title="Rôle de la Diode de Roue Libre ($D_{rl}$)"
Pour éviter que la tension de charge $u_c(t)$ ne devienne négative et pour assurer la continuité du courant dans l'inductance, on place une diode $D_{rl}$ en antiparallèle aux bornes de la charge RL.
*   **De $0$ à $T/2$** : La diode de redressement $D$ est ON. $D_{rl}$ est polarisée en inverse (OFF). La source fournit de l'énergie à la charge et magnétise l'inductance.
*   **De $T/2$ à $T$** : La tension de source devient négative. $D$ se bloque. L'inductance force la conduction de $D_{rl}$ (phénomène de roue libre). Le courant de charge circule en boucle fermée à travers $D_{rl}$ et décroît de façon exponentielle sans jamais que la tension aux bornes de la charge ne devienne négative ($u_c(t) \approx 0\text{ V}$ durant cette phase).
:::

:::grid two-col
:::block type="method" title="Redresseur RL avec roue libre"
**Notion.** La charge inductive impose la continuité du courant. Sans chemin de roue libre, l'inductance force la diode principale à rester conductrice plus longtemps.

**Formules à relier au montage :**
\[
v(t)=R i(t)+L\frac{di(t)}{dt}+v_d(t)
\]
\[
L\frac{di(t)}{dt}+R i(t)=V_m\sin(\omega t)
\]
\[
\tau=\frac{L}{R}
\qquad
\phi=\arctan\left(\frac{L\omega}{R}\right)
\]
\[
i(t)=K e^{-\frac{t}{\tau}}+\frac{V_m}{\sqrt{R^2+(L\omega)^2}}\sin(\omega t-\phi)
\]
\[
i(t)=\frac{V_m}{Z}\left[\sin(\omega t-\phi)+\sin(\phi)e^{-\frac{t}{\tau}}\right]
\quad
Z=\sqrt{R^2+(L\omega)^2}
\]

**Manipulation.** Faire varier la charge et observer la continuité du courant dans l'inductance. La diode de roue libre doit empêcher la tension de charge de devenir fortement négative.

[Ouvrir en plein écran](https://www.falstad.com/circuit/circuitjs.html?cct=$+1+0.000005+10.24+50+5+50%0Ar+160+80+160+160+0+10%0Al+160+160+160+240+0+0.1+0.01%0Ad+160+240+160+300+0+0.8000000000000002%0Aw+160+300+320+300+0%0Aw+160+80+320+80+0%0Av+320+300+320+80+0+1+50+10+0+0+0.5%0Ad+160+80+160+240+1+0.8000000000000002%0A)
:::

:::circuitjs label="Redressement" title="RL + roue libre" iframeTitle="Simulation CircuitJS d'un redresseur RL avec diode de roue libre" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&cct=$+1+0.000005+10.24+50+5+50%0Ar+160+80+160+160+0+10%0Al+160+160+160+240+0+0.1+0.01%0Ad+160+240+160+300+0+0.8000000000000002%0Aw+160+300+320+300+0%0Aw+160+80+320+80+0%0Av+320+300+320+80+0+1+50+10+0+0+0.5%0Ad+160+80+160+240+1+0.8000000000000002%0A"
:::
:::

### 2. La Diode Zener et Régulation de Tension

La diode Zener est spécialement conçue pour fonctionner de manière réversible dans sa zone de claquage inverse (claquage Zener ou d'avalanche).

#### Caractéristique et Schémas Équivalents

*   **En polarisation directe ($U_{ak} > 0$)** : Elle se comporte comme une diode normale ($U_{ak} = V_0 + r_d \cdot I_{ak}$).
*   **En polarisation inverse ($U_{ak} < 0$)** :
    *   Tant que $|U_{ak}| < U_{z0}$ : Le courant inverse est quasi-nul (diode bloquée).
    *   Dès que le claquage est atteint ($U_{ka} \ge U_{z0}$) : La diode maintient une tension presque constante à ses bornes. Le modèle et les équations utiles sont donnés dans le bloc du régulateur.

#### Application de la Méthode Statique/Dynamique à la Régulation de Tension

Considérons une source de tension non-stabilisée $e(t) = E + \tilde{e}(t)$ alimentant à travers une résistance série $R$ une diode Zener délivrant une tension stabilisée $u_z(t) = U_{z0} + \tilde{u}_z(t)$ à une charge.

##### Étape 1 : Régime Statique (Calcul du point de repos)
On éteint la composante alternative $\tilde{e}(t) = 0$. Le circuit équivalent continu est une maille série qui fixe le courant de polarisation et la tension stabilisée.

##### Étape 2 : Régime Dynamique (Atténuation de l'ondulation)
On éteint la composante continue $E = 0$ et la tension Zener de seuil $U_{z0} = 0$. Le schéma dynamique équivalent devient un pont diviseur entre $R$ et la résistance dynamique $r_z$. L'ondulation de sortie $\tilde{u}_z$ est fortement atténuée car $r_z \ll R$.

:::grid two-col
:::block type="method" title="Régulateur Zener"
**Notion.** La diode Zener maintient une tension quasi constante en zone de claquage, à condition de rester suffisamment polarisée.

**Formules à relier au montage :**
\[
U_z=U_{z0}+r_z I_z
\]
\[
E=R I_{z0}+U_{z0}+r_z I_{z0}
\]
\[
I_{z0}=\frac{E-U_{z0}}{R+r_z}
\]
\[
\tilde{u}_z(t)=\tilde{e}(t)\frac{r_z}{R+r_z}
\]
\[
K_{reg}=\frac{\tilde{u}_z}{\tilde{e}}=\frac{r_z}{R+r_z}
\]

**Manipulation.** Modifier la charge et observer que la tension de sortie reste proche de la tension Zener tant que le courant de polarisation reste suffisant.

[Ouvrir en plein écran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=zenerref.txt)
:::

:::circuitjs label="Zener" title="Régulateur" iframeTitle="Simulation CircuitJS d'un régulateur par diode Zener" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=zenerref.txt"
:::
:::

:::

:::section id="ep331-bjt" eyebrow="Chapitre III" title="Transistors bipolaires" summary="Identifier les regimes du BJT, le point de repos et les modeles petits signaux."

Le transistor bipolaire est un composant actif à trois bornes (Émetteur, Base, Collecteur) permettant de commander un courant fort de sortie ($I_c$) par un courant faible d'entrée ($I_b$).

### 1. Régimes de Fonctionnement du BJT

Pour un transistor de type NPN, nous définissons ses états en fonction des polarisations de ses jonctions :

:::block type="theorem" title="Les Trois Régimes Fondamentaux du Transistor Bipolaire"
1.  **Régime Bloqué (OFF)** :
    *   Conditions : Jonction Base-Émetteur (BE) polarisée en inverse ($V_{be} < V_{be\_seuil} \approx 0.6\text{ V}$).
    *   Courants : $I_b = 0 \implies I_c \approx 0$.
    *   Modèle : Interrupteur ouvert entre Collecteur et Émetteur.
2.  **Régime Linéaire (Actif)** :
    *   Conditions : BE polarisée en direct ($V_{be} \approx 0.6\text{ V} - 0.7\text{ V}$) et Base-Collecteur (BC) polarisée en inverse ($V_{ce} > V_{ce\_sat}$).
    *   **Loi de commande (Effet Transistor)** : Le courant de collecteur est directement proportionnel au courant de base :
        $$I_c = \beta \cdot I_b$$
        Où $\beta$ (ou $h_{fe}$) désigne le gain statique en courant du transistor (typiquement compris entre $100$ et $500$).
    *   Modèle : Une source de courant commandée $\beta I_b$ placée entre Collecteur et Émetteur.
3.  **Régime Saturé (ON)** :
    *   Conditions : BE polarisée en direct et BC polarisée en direct ($V_{ce}$ s'abaisse à sa limite physique).
    *   Caractéristiques : La relation de proportionnalité $I_c = \beta I_b$ n'est plus valable. Le courant collecteur est limité par le circuit extérieur ($I_c < \beta I_b$). La tension collecteur-émetteur reste constante et minimale :
        $$V_{ce} = V_{ce\_sat} \approx 0.1\text{ V} - 0.2\text{ V}$$
    *   Modèle : Interrupteur fermé (avec une tension de déchet $V_{ce\_sat}$) entre Collecteur et Émetteur.
:::

#### Droites de Charge et Point de Fonctionnement Statique
Pour un montage amplificateur à émetteur commun simple muni d'une résistance de collecteur $R_c$ et alimenté sous $V_{cc}$ :
*   L'équation de maille de sortie impose la **droite de charge statique** :
    $$V_{ce} = V_{cc} - R_c \cdot I_c$$
*   L'intersection de cette droite de charge avec la caractéristique d'entrée/sortie du transistor pour un courant $I_{b0}$ imposé fixe le **point de repos** $Q(I_{C0}, V_{CE0})$. Pour assurer une excursion symétrique maximale du signal alternatif sans distorsion (écrêtage), le point de repos $Q$ doit être positionné rigoureusement au milieu de la droite de charge statique ($V_{CE0} \approx V_{cc}/2$).

:::figure src="assets/EP331-Electronique-analogique/droite_de_charge_bjt.png" alt="Droite de charge d'un transistor BJT avec blocage, saturation et point de repos." class="td-figure" caption="Le point de repos fixe la marge disponible avant saturation ou blocage lorsque le signal alternatif arrive."
:::

### 2. Modèle Équivalent Petits Signaux (Dynamique LF)

En petits signaux et à basse fréquence (les capacités internes parasites du transistor sont alors considérées comme des circuits ouverts), le schéma équivalent du transistor NPN autour de son point de repos se déduit par linéarisation :

:::figure src="assets/EP331-Electronique-analogique/bjt_petits_signaux.png" alt="Modèle petits signaux du transistor BJT avec résistance rbe et source de courant commandée." class="td-figure" caption="Le transistor non linéaire est remplacé par un modèle linéaire local autour du point de repos."
:::

Où :
*   **$r_{be}$** (ou $h_{11}$) représente la résistance dynamique de la jonction BE polarisée en direct :
    $$r_{be} = \left( \frac{\partial I_b}{\partial V_{be}} \right)^{-1} = \frac{\eta U_t}{I_{B0}} = \beta \frac{\eta U_t}{I_{C0}}$$
    Pour un courant collecteur $I_{C0} = 1\text{ mA}$ et $\beta = 100$, sa valeur type vaut :
    $$r_{be} \approx 100 \cdot \frac{26\text{ mV}}{1\text{ mA}} \approx 2.6\text{ k}\Omega$$
*   **$\beta \cdot i_b$** (ou $g_m \cdot v_{be}$) est la source de courant commandée dynamique traduisant l'effet transistor. La transconductance dynamique du transistor vaut :
    $$g_m = \frac{\beta}{r_{be}} = \frac{I_{C0}}{\eta U_t} \approx 38\text{ mA/V} \text{ (pour } I_{C0}=1\text{ mA)}$$

### 3. Amplificateurs Fondamentaux et Topologies

#### A. Montage Émetteur Commun (Amplificateur de Tension)
Le signal d'entrée $\tilde{v}_e$ est appliqué sur la base, le signal de sortie $\tilde{v}_s$ est prélevé sur le collecteur, l'émetteur est relié à la masse dynamique. C'est le montage de référence pour amplifier une tension avec inversion de phase.

:::grid two-col
:::block type="method" title="Montage émetteur commun"
**Notion.** L'émetteur commun est un amplificateur de tension inverseur. Le point de repos doit rester dans la zone active pour éviter l'écrêtage.

**Formules à relier au montage :**
\[
A_{v0}=\frac{\tilde{v}_s}{\tilde{v}_e}=-\frac{\beta R_c}{r_{be}}=-g_mR_c
\]
\[
R_{in}\approx R_1\parallel R_2\parallel r_{be},
\qquad
R_{out}\approx R_c
\]

**Manipulation.** Comparer la sinusoïde d'entrée et la tension de sortie. Vérifier l'inversion de phase de \(180^\circ\), puis augmenter l'amplitude pour voir apparaître la saturation.

[Ouvrir en plein écran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=ceamp.txt)
:::

:::circuitjs label="BJT" title="Émetteur commun" iframeTitle="Simulation CircuitJS d'un amplificateur BJT à émetteur commun" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=ceamp.txt"
:::
:::

#### B. Montage Collecteur Commun (Suiveur)
Le signal d'entrée $\tilde{v}_e$ est appliqué sur la base, la sortie $\tilde{v}_s$ est prélevée sur l'émetteur, le collecteur est à la masse dynamique. Ce montage est surtout utilisé comme adaptateur d'impédance, ou buffer.

:::grid two-col
:::block type="method" title="Montage collecteur commun"
**Notion.** Le collecteur commun, ou suiveur d'émetteur, sert surtout d'adaptateur d'impédance : il copie la tension avec un gain proche de 1.

**Formules à relier au montage :**
\[
A_v=\frac{\tilde{v}_s}{\tilde{v}_e}
=\frac{(\beta+1)R_e}{r_{be}+(\beta+1)R_e}
\approx 1
\]
\[
R_{in}\approx R_1\parallel R_2\parallel\left[r_{be}+(\beta+1)R_e\right]
\]
\[
R_{out}\approx R_e\parallel\left[\frac{r_{be}+R_g}{\beta+1}\right]
\]

**Manipulation.** Observer que la sortie suit l'entrée avec un gain proche de 1. Diminuer la charge pour voir que le montage pilote mieux la sortie qu'un étage à forte impédance.

[Ouvrir en plein écran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=follower.txt)
:::

:::circuitjs label="BJT" title="Collecteur commun" iframeTitle="Simulation CircuitJS d'un suiveur d'émetteur BJT" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=follower.txt"
:::
:::

#### C. Mise en Cascade d'Amplificateurs et Liaisons
Pour obtenir un gain total important, on associe plusieurs étages. Deux types de liaisons sont possibles :
1.  **Liaison capacitive (liaison AC)** : On insère un condensateur de liaison $C_l$ entre le collecteur du premier étage et la base du second.
    *   *Avantage* : Les points de repos continus de chaque étage sont rigoureusement isolés et s'étudient de manière indépendante.
    *   *Inconvénient* : Le condensateur introduit un filtre passe-haut limitant la bande passante vers les basses fréquences (fréquence de coupure basse $f_{cb} = \frac{1}{2\pi (R_{out1} + R_{in2})C_l}$).
2.  **Liaison continue (liaison directe DC)** : Le collecteur du 1er transistor est directement soudé à la base du second.
    *   *Avantage* : Fonctionne jusqu'en continu ($f = 0\text{ Hz}$). Idéal pour l'intégration sur puce silicium (absence de condensateurs encombrants).
    *   *Inconvénient* : Le point de repos du second étage dépend entièrement de celui du premier. Toute dérive thermique du premier étage est amplifiée par le second.

:::

:::section id="ep331-aop" eyebrow="Chapitre IV" title="Amplificateurs operationnels" summary="Utiliser le modele ideal puis tenir compte des defauts statiques et dynamiques."

Anciennement dénommé amplificateur différentiel à fort gain, l'Amplificateur Opérationnel est aujourd'hui un circuit intégré analogique incontournable.

### 1. Modèle Idéal et Configurations de Base

:::block type="definition" title="L'AOP Parfait"
Un AOP est considéré comme parfait ou idéal si ses caractéristiques internes vérifient :
*   **Impédance d'entrée infinie** : $R_e \to \infty$. Par conséquent, les courants absorbés sur les entrées inverseuse et non-inverseuse sont nuls :
    $$i^+ = i^- = 0\text{ A}$$
*   **Impédance de sortie nulle** : $R_s = 0\ \Omega$. La tension de sortie vs ne dépend pas de la charge connectée.
*   **Gain différentiel en boucle ouverte infini** : $A_d \to \infty$.
*   **Bande passante infinie** : Le gain reste infini quelle que soit la fréquence du signal.
:::

#### Règle de la Contre-Réaction Négative (Régime Linéaire)
Dès qu'une liaison externe relie la sortie $v_s$ à l'entrée inverseuse $v^-$ (boucle de rétroaction négative ou contre-réaction), l'AOP fonctionne en **régime linéaire**. Le gain différentiel infini force la tension différentielle d'entrée $\varepsilon$ à s'annuler :
$$\varepsilon = v^+ - v^- = 0 \implies v^+ = v^-$$

#### Montages Fondamentaux Linéaires

Les montages fondamentaux se lisent directement à partir de la contre-réaction. Chaque bloc ci-dessous regroupe la formule du montage, l'idée physique et la manipulation à effectuer dans CircuitJS.

:::grid two-col
:::block type="method" title="AOP inverseur"
**Notion.** Le montage inverseur impose une masse virtuelle sur l'entrée inverseuse et donne une sortie en opposition de phase.

**Formule à relier au montage :**
\[
v_s=-\frac{R_2}{R_1}v_e
\]

**Manipulation.** Comparer l'entrée et la sortie : le signe doit être inversé. Modifier le rapport des résistances pour voir le gain changer.

[Ouvrir en plein écran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=amp-invert.txt)
:::

:::circuitjs label="AOP" title="Inverseur" iframeTitle="Simulation CircuitJS d'un amplificateur inverseur à AOP" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=amp-invert.txt"
:::
:::

:::grid two-col
:::block type="method" title="AOP non-inverseur"
**Notion.** Le montage non-inverseur conserve la phase du signal et présente une très forte impédance d'entrée.

**Formule à relier au montage :**
\[
v_s=\left(1+\frac{R_2}{R_1}\right)v_e
\]

**Manipulation.** Comparer avec l'inverseur : la sortie reste en phase avec l'entrée. Modifier le pont de retour pour vérifier le terme \(1+R_2/R_1\).

[Ouvrir en plein écran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=amp-noninvert.txt)
:::

:::circuitjs label="AOP" title="Non-inverseur" iframeTitle="Simulation CircuitJS d'un amplificateur non-inverseur à AOP" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=amp-noninvert.txt"
:::
:::

:::grid two-col
:::block type="method" title="Sommateur inverseur"
**Notion.** Plusieurs courants d'entrée se somment au noeud de masse virtuelle, puis la résistance de retour convertit cette somme en tension de sortie.

**Formule à relier au montage :**
\[
v_s=-R_f\left(\frac{v_1}{R_1}+\frac{v_2}{R_2}+\cdots\right)
\]

**Manipulation.** Modifier une entrée puis l'autre : chaque entrée contribue avec son poids \(R_f/R_k\). Vérifier que la sortie reste inversée.

[Ouvrir en plein écran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=amp-sum.txt)
:::

:::circuitjs label="AOP" title="Sommateur" iframeTitle="Simulation CircuitJS d'un sommateur inverseur à AOP" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=amp-sum.txt"
:::
:::

:::grid two-col
:::block type="method" title="Soustracteur différentiel"
**Notion.** Le montage différentiel amplifie une différence de tension et rejette idéalement la partie commune aux deux entrées.

**Formule à relier au montage :**
\[
v_s=(v_2-v_1)\frac{R_2}{R_1}
\quad \text{si} \quad
\frac{R_4}{R_3}=\frac{R_2}{R_1}
\]

**Manipulation.** Appliquer deux signaux proches : la sortie doit suivre la différence. Ajouter une composante commune pour observer la réjection de mode commun.

[Ouvrir en plein écran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=amp-diff.txt)
:::

:::circuitjs label="AOP" title="Différentiel" iframeTitle="Simulation CircuitJS d'un amplificateur différentiel à AOP" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=amp-diff.txt"
:::
:::

:::grid two-col
:::block type="method" title="Intégrateur AOP"
**Notion.** Le condensateur en contre-réaction accumule le courant d'entrée : la sortie est proportionnelle à l'intégrale temporelle de l'entrée.

**Formule à relier au montage :**
\[
v_s(t)=-\frac{1}{RC}\int_0^t v_e(\tau)d\tau+v_s(0)
\]

**Manipulation.** Injecter un signal carré et observer la rampe en sortie. Modifier \(R\) ou \(C\) pour changer la pente.

[Ouvrir en plein écran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=amp-integ.txt)
:::

:::circuitjs label="AOP" title="Intégrateur" iframeTitle="Simulation CircuitJS d'un intégrateur inverseur à AOP" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=amp-integ.txt"
:::
:::

### 2. Modélisation et Défauts de l'AOP Réel

Un AOP réel s'écarte du modèle parfait par divers défauts physiques que l'on peut regrouper en deux familles : les défauts statiques (DC) et les défauts dynamiques (AC).

:::figure src="assets/EP331-Electronique-analogique/aop_reel_schema.png" alt="Schéma équivalent d'un AOP réel avec offset, courants de polarisation, gain fini et résistance de sortie." class="td-figure" caption="L'AOP réel ajoute des défauts qui deviennent visibles dès que le gain, la précision ou la fréquence augmentent."
:::

#### A. Les Défauts Statiques (Courant continu)

##### 1. Tension de décalage d'entrée (Offset Voltage $V_{io}$ ou $V_d$)
Due à la dissymétrie physique inévitable des transistors constituant l'étage différentiel d'entrée. Même si $v^+ = v^- = 0$, la tension de sortie réelle n'est pas nulle ($v_s \neq 0$).
*   **Modélisation** : On modélise ce défaut en insérant en série avec l'entrée non-inverseuse d'un AOP parfait une source de tension continue parasite de valeur $V_d$ (typiquement de $0.5\text{ mV}$ à quelques $\text{mV}$).
*   **Calcul de la dérive d'offset en sortie** : Pour un montage inverseur classique, la tension d'offset est amplifiée par le gain en continu du montage :
    $$V_{s\_offset} = V_d \cdot \left( 1 + \frac{R_2}{R_1} \right)$$
    Ce défaut peut provoquer la saturation continue de l'AOP, notamment dans les montages intégrateurs à fort gain en basse fréquence.

##### 2. Courants de polarisation d'entrée ($I_p^+$, $I_p^-$) et Courant de décalage ($I_d$)
Pour que les transistors d'entrée de l'AOP fonctionnent, un courant de polarisation continu doit entrer (ou sortir) par les bornes d'entrée.
*   **Courant moyen de polarisation** : $I_p = \frac{I_p^+ + I_p^-}{2}$ (de $100\text{ nA}$ pour des bipolaires à quelques $\text{pA}$ pour des entrées FET).
*   **Courant d'offset d'entrée** : $I_d = |I_p^+ - I_p^-|$ (représente l'asymétrie de courant, environ $10\%$ de $I_p$).
*   **Effet sur la tension de sortie** : Ces courants traversent les résistances externes du circuit, créant des chutes de tension parasites continues qui s'ajoutent à la sortie.
*   **Méthode de compensation** : Pour annuler l'effet du courant moyen de polarisation $I_p$, on insère une résistance de compensation de valeur exacte $R_p = R_1 \parallel R_2$ sur l'entrée non-inverseuse. Les chutes de tension sur les deux entrées se compensent alors mutuellement par soustraction différentielle.


#### B. Les Défauts Dynamiques (Alternatif)

##### 1. Gain fini en Boucle Ouverte et sa dépendance fréquentielle $A(p)$
Le gain différentiel en boucle ouverte $A_0$ n'est pas infini ($A_0 \approx 10^5 - 10^6$) et chute dès les très basses fréquences en raison de la présence d'une capacité de compensation interne (filtre passe-bas interne destiné à stabiliser l'amplificateur contre les oscillations).
La fonction de transfert du gain en boucle ouverte est modélisée par un premier ordre :

$$A(p) = \frac{A_0}{1 + \frac{p}{\omega_0}}$$

Où $\omega_0$ est la pulsation de cassure de l'AOP (très faible, de l'ordre de quelques $\text{rad/s}$ à quelques $\text{Hz}$).

*   **Le Produit Gain-Bande Passante (PGB ou $f_u$)** :
    Pour des fréquences supérieures à $f_0$, le gain décroît de $-20\text{ dB/décade}$. Le produit du gain en tension en boucle fermée $A_{BF}$ par sa fréquence de coupure à $-3\text{ dB}$ ($f_c$) est constant et égal à la fréquence de transition unité $f_u$ (fréquence pour laquelle le gain en BO de l'AOP tombe à $0\text{ dB}$ ou $1$) :
    $$PGB = A_{BF} \cdot f_c = f_u$$
    *Conséquence* : Plus on demande de gain à un montage, plus sa bande passante utile se réduit.

:::figure src="assets/EP331-Electronique-analogique/gain_bande_bode.png" alt="Diagramme de Bode du gain en boucle ouverte d'un AOP et produit gain-bande." class="td-figure" caption="Le produit gain-bande traduit le compromis fondamental d'un AOP réel : plus le gain en boucle fermée est élevé, plus la bande passante disponible diminue."
:::

##### 2. Vitesse de balayage ou Slew Rate (SR)
Le Slew Rate est la vitesse maximale de variation que peut reproduire la tension de sortie de l'AOP. Il est exprimé en $\text{V/}\mu\text{s}$ :
$$SR = \max\left(\left| \frac{d v_s(t)}{dt} \right|\right)$$
Il est lié physiquement au courant maximal que peut délivrer l'étage différentiel d'entrée pour charger la capacité de compensation interne.

*   **Condition de non-distorsion pour un signal sinusoïdal** :
    Pour un signal de sortie sinusoïdal d'amplitude maximale $V_m$ et de fréquence $f$ : $v_s(t) = V_m \sin(2\pi f t)$.
    La pente maximale du signal vaut :
    $$\max\left(\left| \frac{d v_s}{dt} \right|\right) = 2\pi f \cdot V_m$$
    Pour éviter toute distorsion harmonique sévère (transformation de la sinusoïde en un signal triangulaire), la fréquence et l'amplitude doivent impérativement respecter la limite du Slew Rate :
    $$2\pi f \cdot V_m < SR \implies f_{max\_lineaire} = \frac{SR}{2\pi V_m}$$

:::figure src="assets/EP331-Electronique-analogique/slew_rate_limitation.png" alt="Limitation de slew rate sur une sortie d'AOP : sinusoïde idéale comparée à une sortie limitée en pente." class="td-figure" caption="Le slew rate limite la pente maximale de sortie : à forte amplitude ou haute fréquence, la sinusoïde se déforme."
:::

##### 3. Taux de Réjection de Mode Commun (TRMC ou CMRR)
Un AOP réel n'amplifie pas uniquement la tension différentielle $v_d = v^+ - v^-$. Il amplifie également de façon parasite la tension moyenne des entrées appelée **tension de mode commun** $v_{mc} = \frac{v^+ + v^-}{2}$. La tension de sortie réelle s'exprime par :
$$v_s = A_d \cdot v_d + A_{mc} \cdot v_{mc}$$
Où $A_d$ est le gain différentiel et $A_{mc}$ le gain de mode commun.

*   **Taux de Réjection de Mode Commun (TRMC)** : Traduit l'aptitude de l'amplificateur à rejeter le bruit ou les signaux parasites présents simultanément sur les deux entrées :
    $$TRMC = \left| \frac{A_d}{A_{mc}} \right|$$
    Exprimé en décibels, le taux de réjection vaut :
    $$CMR = 20 \log_{10} TRMC$$
    *(Pour un bon AOP, $CMR$ est typiquement compris entre $80\text{ dB}$ et $110\text{ dB}$).*

:::

:::section id="ep331-thermique" eyebrow="Chapitre V" title="Dissipation thermique et radiateurs" summary="Dimensionner l evacuation thermique et verifier la zone de fonctionnement sure."

Lorsqu'un composant électronique (transistor de puissance, diode de redressement, AOP de puissance) fonctionne, il dissipe une puissance active $P$ sous forme de chaleur par effet Joule. Cette puissance thermique doit être évacuée vers le milieu ambiant pour éviter que la température interne de la puce de silicium, appelée **température de jonction $T_j$**, ne dépasse une limite critique destructive (généralement $T_{jmax} \approx 150^\circ\text{C}$).

### 1. Analogie Électrique-Thermique

Pour modéliser les transferts de chaleur en régime permanent, on utilise une analogie rigoureuse avec la loi d'Ohm électrique.

:::block type="neutral"
| Grandeur Électrique | Unité | Grandeur Thermique | Unité |
| :--- | :--- | :--- | :--- |
| **Potentiel Électrique $V$** | Volt ($\text{V}$) | **Température $T$** | Degré Celsius ($^\circ\text{C}$) ou Kelvin ($\text{K}$) |
| **Différence de potentiel $\Delta V$** | Volt ($\text{V}$) | **Différence de température $\Delta T$** | Degré Celsius ($^\circ\text{C}$) ou Kelvin ($\text{K}$) |
| **Courant Électrique $I$** | Ampère ($\text{A}$) | **Flux thermique (Puissance dissipée) $P$** | Watt ($\text{W}$) |
| **Résistance Électrique $R$** | Ohm ($\Omega$) | **Résistance Thermique $R_{th}$** | Degré par Watt ($^\circ\text{C/W}$ ou $\text{K/W}$) |
| **Loi d'Ohm** : $\Delta V = R \cdot I$ | | **Loi d'Ohm thermique** : $\Delta T = R_{th} \cdot P$ | |
:::

:::figure src="assets/EP331-Electronique-analogique/analogie_thermique.png" alt="Analogie thermique entre jonction, boîtier, radiateur et air ambiant." class="td-figure" caption="La chaleur se traite comme un courant traversant des résistances thermiques en série : jonction, boîtier, radiateur, air ambiant."
:::

### 2. Équation de Transfert Thermique en Régime Permanent

Dans un montage physique, la chaleur traverse successivement plusieurs milieux pour aller de la puce vers l'air extérieur. Ce cheminement s'apparente à un circuit série composé de trois résistances thermiques :
1.  **$R_{th\_jc}$ (Jonction-Boîtier / Junction-to-Case)** : Résistance interne propre au composant (donnée par le fabricant dans la datasheet). Elle caractérise la vitesse à laquelle les calories vont du silicium vers la semelle métallique du boîtier (ex: TO-220).
2.  **$R_{th\_cs}$ (Boîtier-Dissipateur / Case-to-Sink)** : Résistance d'interface de contact. Elle dépend du montage (utilisation de graisse thermique silicone, de feuille de mica isolante).
3.  **$R_{th\_sa}$ (Dissipateur-Ambiant / Sink-to-Ambient)** : Résistance thermique du radiateur lui-même. Elle caractérise l'aptitude des ailettes à céder la chaleur à l'air ambiant.

En appliquant la loi d'Ohm thermique à ce circuit série, l'écart de température entre la jonction et l'air ambiant s'écrit :

$$T_j - T_a = \left( R_{th\_jc} + R_{th\_cs} + R_{th\_sa} \right) \cdot P$$

D'où l'expression fondamentale de la température de jonction :
$$T_j = T_a + P \cdot R_{th\_total}$$

### 3. Calcul et Choix d'un Dissipateur (Radiateur)

L'objectif de l'ingénieur est de calculer la valeur maximale de la résistance thermique du radiateur à acheter ($R_{th\_sa}$) pour garantir la sécurité du composant sous une dissipation $P$ donnée.

:::block type="method" title="Formule de Dimensionnement d'un Radiateur"
À partir de l'équation de transfert thermique, on isole la résistance thermique radiateur-ambiant maximale tolérée :
$$R_{th\_sa} \le \frac{T_{jmax} - T_a}{P} - \left( R_{th\_jc} + R_{th\_cs} \right)$$

*   Si la valeur calculée $R_{th\_sa}$ est **négative**, cela signifie que même sans radiateur (boîtier nu exposé à l'air), le composant va surchauffer. Il est impératif d'utiliser un boîtier plus performant (plus faible $R_{th\_jc}$) ou de réduire la puissance dissipée.
*   Si la valeur est **positive**, on choisit dans le catalogue du constructeur un radiateur dont la résistance thermique nominale est **inférieure ou égale** à la valeur calculée ($R_{radiateur} \le R_{th\_sa}$).
:::

### 4. Améliorations Technologiques de l'Évacuation Thermique

Lorsque la puissance à évacuer est très élevée (cas des alimentations de puissance ou des processeurs), le refroidissement passif par convection naturelle ne suffit plus. On emploie alors deux technologies :
*   **La ventilation forcée (convection forcée)** : L'utilisation d'un ventilateur soufflant de l'air à grande vitesse à travers les ailettes du dissipateur réduit drastiquement la résistance thermique effective $R_{th\_sa}$ (parfois divisée par 5 selon la vitesse de l'air en feet/minute, cf. courbes de transfert thermique).
*   **Le Caloduct (Heat Pipe)** : Tube de cuivre scellé contenant un fluide caloporteur biphasique sous vide partiel. Le fluide s'évapore au contact du composant chaud (zone d'évaporation, absorption massive de chaleur par chaleur latente de vaporisation), se déplace à grande vitesse vers la zone froide munie d'ailettes, s'y condense (zone de condensation, libération des calories) puis retourne par capillarité vers la zone chaude. La conductivité thermique équivalente d'un caloduct est des centaines de fois supérieure à celle du cuivre massif.

### 5. Aire de Sécurité (Safe Operating Area - SOA)

La datasheet d'un composant de puissance définit une zone appelée **SOA** (Safe Operating Area) délimitée par trois limites physiques inviolables :
1.  **La limite de courant maximal ($I_{max}$)** : Liée au diamètre des fils de connexion internes (bonding) qui fondent en cas de surintensité.
2.  **La limite de tension maximale ($V_{max}$)** : Tension de claquage des jonctions PN sous champ électrique trop intense.
3.  **La limite thermique (puissance maximale dissipée $P_{max}$)** : Définie par l'hyperbole de dissipation $V \cdot I = P_{max}$. En régime impulsionnel transitoire (ex: largeur d'impulsion $t = 200\text{ ms}$), la SOA est élargie car l'inertie thermique (capacité thermique) empêche l'échauffement instantané de la jonction.

:::figure src="assets/EP331-Electronique-analogique/soa_transistor.png" alt="Zone de fonctionnement sûre d'un transistor avec limites de courant, tension et puissance." class="td-figure" caption="La SOA rappelle qu'un composant peut respecter séparément courant et tension maximaux tout en dépasser la puissance admissible."
:::

:::

:::section id="ep331-circuitjs" eyebrow="Interactif" title="Utiliser les simulations CircuitJS" summary="Les circuits interactifs sont intégrés directement dans les chapitres concernés."
:::grid two-col
:::block type="remember" title="Où retrouver les circuits"
- Redressement RL : chapitre II, partie diode de roue libre.
- Régulateur Zener : chapitre II, partie régulation de tension.
- BJT émetteur commun et collecteur commun : chapitre III, topologies d'amplification.
- AOP inverseur, non-inverseur, sommateur, différentiel et intégrateur : chapitre IV, montages fondamentaux.
:::

:::block type="warning" title="Limite de simulation"
CircuitJS aide à visualiser les phénomènes, mais la justification d'examen reste analytique : schéma équivalent, hypothèses, équations, unités et ordre de grandeur.
:::
:::
:::

:::section id="ep331-revision" eyebrow="Revision" title="Fiche finale EP331" summary="Les reflexes rapides pour traiter un exercice d electronique analogique."

:::block type="remember" title="Methode d analyse"
1. Isoler le regime statique : sources alternatives eteintes, capacites ouvertes, inductances court-circuitees.
2. Fixer le point de repos du composant non lineaire.
3. Passer au modele petits signaux autour de ce point.
4. Verifier le domaine de validite : diode passante ou bloquee, BJT actif ou sature, AOP lineaire ou sature.
5. Controler les ordres de grandeur : puissance dissipee, bande passante, slew rate et contraintes thermiques.
:::
:::
