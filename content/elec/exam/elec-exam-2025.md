---
title: "Examen electronique 2025"
subject: "elec"
type: "exam"
target: "elec-exam-2025.html"
eyebrow: "EP361 - Examen 2025"
heading: "Correction examen electronique 2025"
summary: "Quadripoles, filtre actif passe-bas, filtre universel et AOP de puissance push-pull."
---
:::exercise label="Probleme 1" title="ProblÃ¨me I Filtre"
#### Partie A: QuadripÃ´les - 10 points

:::figure src="assets/elec/exam/ELEC-exam-2025-schema-1.png" alt="Fig. 1 - Cellule en T utilisee pour etablir la matrice admittance." caption="Fig. 1 - Cellule en T utilisee pour etablir la matrice admittance."
:::

a) Exprimez \(Y_{s}\) la matrice admittance d'un Ã©lÃ©ment sÃ©rie \(y_{o}\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition des tensions et courants du quadripÃ´le.**
 Un dipÃ´le d'admittance \(y_o\) est montÃ© en sÃ©rie entre le port d'entrÃ©e (1) et le port de sortie (2). Soient \(v_1, i_1\) la tension et le courant Ã  l'entrÃ©e, et \(v_2, i_2\) Ã  la sortie.

**Ã‰tape 2 : Application des lois fondamentales.**
 La diffÃ©rence de potentiel aux bornes de l'admittance \(y_o\) est \((v_1 - v_2)\). D'aprÃ¨s la loi d'Ohm, le courant entrant par le port 1 est : \[i_1 = y_o(v_1 - v_2) = y_o v_1 - y_o v_2\] Le courant \(i_2\) entrant par le port 2 est l'opposÃ© du courant traversant le composant de 1 vers 2 : \[i_2 = y_o(v_2 - v_1) = -y_o v_1 + y_o v_2\]

**Ã‰tape 3 : Ã‰criture sous forme matricielle.**
 En regroupant ces Ã©quations dans une matrice reliant les courants aux tensions, on obtient la matrice admittance \(Y_s\) : \[\begin{bmatrix} i_1 \\ i_2 \end{bmatrix} = \begin{bmatrix} y_o & -y_o \\ -y_o & y_o \end{bmatrix} \begin{bmatrix} v_1 \\ v_2 \end{bmatrix} \quad \implies \quad \mathbf{Y_s = \begin{bmatrix} y_o & -y_o \\ -y_o & y_o \end{bmatrix}}\]
:::

b) Exprimez les coefficients \(y_{ij}\) de la matrice admittance \(Y_{T}\) en fonction des admittances \(y_{1}\), \(y_2\), \(y_3\) des dipÃ´les Fig. 1.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition du nÅ“ud central.**
 Soit \(v_x\) la tension au nÅ“ud central (jonction entre \(y_1, y_2\) et \(y_3\)).

**Ã‰tape 2 : Ã‰criture de la loi des nÅ“uds en \(v_x\).**
 On Ã©crit la somme des courants sortant du nÅ“ud central. Les trois branches relient \(v_x\) Ã  \(v_1\), Ã  \(v_2\) et Ã  la masse : \[y_1(v_x-v_1)+y_2(v_x-v_2)+y_3v_x=0\] On regroupe les termes en \(v_x\) : \[(y_1+y_2+y_3)v_x = y_1v_1+y_2v_2\] Donc : \[v_x = \frac{y_1 v_1 + y_2 v_2}{y_1 + y_2 + y_3}\]

**Ã‰tape 3 : Calcul des courants d'entrÃ©e et de sortie.**
 Les courants s'Ã©crivent : \(i_1 = y_1(v_1 - v_x)\) et \(i_2 = y_2(v_2 - v_x)\). RemplaÃ§ons \(v_x\) dans l'expression de \(i_1\) : \[i_1 = y_1 v_1 - y_1 \left( \frac{y_1 v_1 + y_2 v_2}{y_1 + y_2 + y_3} \right)\] \[i_1 = \frac{y_1(y_1 + y_2 + y_3)v_1 - y_1^2 v_1 - y_1 y_2 v_2}{y_1 + y_2 + y_3} = \mathbf{\frac{y_1(y_2 + y_3)}{y_1 + y_2 + y_3} v_1 - \frac{y_1 y_2}{y_1 + y_2 + y_3} v_2}\] Par symÃ©trie, pour le courant \(i_2\) : \[i_2 = y_2 v_2 - y_2 \left( \frac{y_1 v_1 + y_2 v_2}{y_1 + y_2 + y_3} \right) = \mathbf{\frac{-y_1 y_2}{y_1 + y_2 + y_3} v_1 + \frac{y_2(y_1 + y_3)}{y_1 + y_2 + y_3} v_2}\]

**Ã‰tape 4 : Identification de la matrice admittance \(Y_T\).**
 On extrait directement les coefficients des Ã©quations prÃ©cÃ©dentes : \[\mathbf{Y_T = \frac{1}{y_1 + y_2 + y_3} \begin{bmatrix} y_1(y_2 + y_3) & -y_1 y_2 \\ -y_1 y_2 & y_2(y_1 + y_3) \end{bmatrix}}\]
:::

c) Le quadripÃ´le est chargÃ© par un dipÃ´le d'admittance \(y_{u}\), exprimez \(T(p)\) en fonction des \(y_{ij}\) et de \(y_{u}\) : \(T(p) = \frac{v_2}{v_1}\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Condition imposÃ©e par la charge.**
 En connectant une charge \(y_u\) en sortie, le courant sortant du quadripÃ´le traverse cette charge. En convention quadripÃ´le (oÃ¹ \(i_2\) est dÃ©fini comme entrant), on a la relation : \[i_2 = -y_u v_2\]

**Ã‰tape 2 : Utilisation du modÃ¨le matriciel.**
 D'aprÃ¨s la dÃ©finition gÃ©nÃ©rale de la matrice admittance, le courant de sortie s'Ã©crit : \[i_2 = y_{21} v_1 + y_{22} v_2\]

**Ã‰tape 3 : RÃ©solution de la fonction de transfert.**
 En Ã©galisant les deux expressions de \(i_2\) : \[-y_u v_2 = y_{21} v_1 + y_{22} v_2\] On regroupe les termes en \(v_2\) : \[v_2 (y_{22} + y_u) = -y_{21} v_1\] Ce qui donne directement la fonction de transfert en tension : \[\mathbf{T(p) = \frac{v_2}{v_1} = \frac{-y_{21}}{y_{22} + y_u}}\]
:::

#### Partie B: Filtre Ã  quadripÃ´les - 10 pts

Le filtre ci-dessous est constituÃ© d'un AOP parfait, alimentÃ© en symÃ©trique associÃ© Ã  deux quadripÃ´les \(Q_{A}, Q_{B}\). Les quadripÃ´les A et B sont dÃ©crits par leur matrice admittance.

:::figure src="assets/elec/exam/ELEC-exam-2025-schema-2.png" alt="Fig. 2 - AOP parfait associe aux quadripoles en admittance." caption="Fig. 2 - AOP parfait associe aux quadripoles en admittance."
:::

:::circuitjs label="CircuitJS" title="AOP" iframeTitle="Simulation CircuitJS d'un montage a amplificateur operationnel" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=opamp.txt"
:::

\[Y_A = \begin{bmatrix} y_{A_{11}} & y_{A_{12}} \\ y_{A_{21}} & y_{A_{22}} \end{bmatrix}\] \[Y_B = \begin{bmatrix} y_{B_{11}} & y_{B_{12}} \\ y_{B_{21}} & y_{B_{22}} \end{bmatrix}\]

**DonnÃ©es :**
 QuadripÃ´le A - Matrice Admittance : \(Y_A = \frac{1}{y_1 + y_2 + y_3} \begin{bmatrix} y_1(y_2 + y_3) & -y_1 y_2 \\ -y_1 y_2 & y_2(y_1 + y_3) \end{bmatrix}\)
 QuadripÃ´le B - Matrice Admittance : \(Y_B = \begin{bmatrix} \frac{y_1(y_2+y_3)}{y_1+y_2+y_3} + y_4 & \frac{-y_1 y_2}{y_1+y_2+y_3} - y_4 \\[10pt] \frac{-y_1 y_2}{y_1+y_2+y_3} - y_4 & \frac{y_2(y_1+y_3)}{y_1+y_2+y_3} + y_4 \end{bmatrix}\)

a/ Exprimez en dÃ©montrant \(H(p)\) en fonction de certains Ã©lÃ©ments \(y_{x_{ij}} : H(p)=\frac{v_s}{v_e}\)

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : HypothÃ¨ses liÃ©es Ã  l'AOP parfait.**
 L'AOP est supposÃ© parfait et possÃ¨de une boucle de rÃ©troaction sur son entrÃ©e inverseuse (\(V^-\)), il fonctionne donc en rÃ©gime linÃ©aire. Son entrÃ©e non-inverseuse Ã©tant Ã  la masse (\(V^+ = 0\)), on obtient une **masse virtuelle** : \(V^- = 0\). De plus, le courant entrant dans l'AOP est nul : \(i^- = 0\).

**Ã‰tape 2 : Analyse des courants aux bornes des quadripÃ´les.**

- **QuadripÃ´le A** : Son port de sortie (2) est connectÃ© Ã  \(V^-\). Le courant de sortie est \(i_{A2} = y_{A21}v_e + y_{A22}V^-\). Puisque \(V^-=0\), on a simplement \(i_{A2} = y_{A21}v_e\).
- **QuadripÃ´le B** : Son port d'entrÃ©e (1) est connectÃ© Ã  \(V^-\) et sa sortie (2) Ã  \(v_s\). Le courant d'entrÃ©e est \(i_{B1} = y_{B11}V^- + y_{B12}v_s\). Puisque \(V^-=0\), on a \(i_{B1} = y_{B12}v_s\).

**Ã‰tape 3 : Loi des nÅ“uds et dÃ©duction de H(p).**
 En appliquant la loi des nÅ“uds Ã  l'entrÃ©e inverseuse de l'AOP, on a \(i_{A2} + i_{B1} = i^- = 0\). \[y_{A21} v_e + y_{B12} v_s = 0 \implies y_{B12} v_s = -y_{A21} v_e\] \[\mathbf{H(p) = \frac{v_s}{v_e} = -\frac{y_{A21}}{y_{B12}}}\]
:::

b/ Exprimez \(H(p)\) la fonction de transfert du filtre Fig. 3 :
 \(y_1\) : rÃ©sistance R \(y_3\) : capacitÃ© C
 \(y_2\) : rÃ©sistance R \(y_4\) : capacitÃ© C

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Extraction des paramÃ¨tres nÃ©cessaires.**
 D'aprÃ¨s les matrices fournies dans les donnÃ©es et le rÃ©sultat de la question prÃ©cÃ©dente, on a besoin de : \[y_{A21} = \frac{-y_1 y_2}{y_1 + y_2 + y_3} \quad \text{et} \quad y_{B12} = \frac{-y_1 y_2}{y_1 + y_2 + y_3} - y_4\]

**Ã‰tape 2 : Simplification littÃ©rale de H(p).**
 \[H(p) = -\frac{\frac{-y_1 y_2}{y_1 + y_2 + y_3}}{\frac{-y_1 y_2}{y_1 + y_2 + y_3} - y_4}\] En multipliant le numÃ©rateur et le dÃ©nominateur par \((y_1 + y_2 + y_3)\) pour retirer les fractions Ã©tagÃ©es : \[H(p) = \frac{y_1 y_2}{-y_1 y_2 - y_4(y_1 + y_2 + y_3)}\]

**Ã‰tape 3 : Remplacement par les composants rÃ©els.**
 On remplace par les admittances complexes (\(y_1 = y_2 = 1/R\) et \(y_3 = y_4 = Cp\)) : \[H(p) = \frac{(1/R)(1/R)}{-(1/R)(1/R) - Cp(1/R + 1/R + Cp)} = \frac{1/R^2}{-1/R^2 - \frac{2Cp}{R} - C^2 p^2}\]

**Ã‰tape 4 : Mise sous forme canonique.**
 On multiplie en haut et en bas par \(-R^2\) pour avoir "1" au numÃ©rateur et en premier terme du dÃ©nominateur : \[H(p) = \frac{-1}{1 + 2RCp + R^2C^2p^2} = \mathbf{-\frac{1}{(1 + RCp)^2}}\]
:::

c/ DÃ©finissez l'ordre et le type de filtre.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©termination de l'ordre.**
 Le dÃ©nominateur de la fonction de transfert \(H(p) = -\frac{1}{(1 + RCp)^2}\) est un polynÃ´me de degrÃ© 2 en \(p\). Il s'agit donc d'un filtre du **2Ã¨me ordre** (avec deux pÃ´les rÃ©els identiques).

**Ã‰tape 2 : DÃ©termination du type de filtre.**
 On analyse le comportement asymptotique du gain :

- Ã€ trÃ¨s basse frÃ©quence (\(p \rightarrow 0\)) : Le numÃ©rateur est constant et le dÃ©nominateur tend vers 1. Le gain tend vers \(-1\) (module 1).
- Ã€ trÃ¨s haute frÃ©quence (\(p \rightarrow \infty\)) : Le dÃ©nominateur tend vers l'infini, donc le gain \(H(p) \rightarrow 0\).

Ce filtre laisse passer les basses frÃ©quences et attÃ©nue les hautes frÃ©quences, c'est donc un filtre **passe-bas**.
:::
:::

:::exercise label="Probleme 2" title="ProblÃ¨me II Filtre"
:::figure src="assets/elec/exam/ELEC-exam-2025-schema-3.png" alt="Fig. 3 - Filtre universel realise avec plusieurs AOP." caption="Fig. 3 - Filtre universel realise avec plusieurs AOP."
:::

:::circuitjs label="CircuitJS" title="Filtre actif" iframeTitle="Simulation CircuitJS d'un filtre actif" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=filt-hipass.txt"
:::

Les AOP sont parfaits alimentÃ©s symÃ©triques \(+/-V_{cc}\).

- Exprimez la tension \(v_2\) en fonction de \(v_e\) et \(v_1\).
- Exprimez la tension \(v_s\) en fonction de \(v_2\).
- Exprimez la tension \(v_1\) en fonction de \(v_s\).
- Exprimez \(T(p)\) la fonction de transfert sous forme canonique en exprimant la pulsation propre, le coefficient d'amortissement et le gain statique : \(T(p) = \frac{v_s}{v_e}\).
- Quel est le type et l'ordre du filtre ?
- Pourquoi tant de composants pour ce filtre ?

:::block type="method" title="Correction et raisonnement"
**1. Expression de la tension \(v_2\) en fonction de \(v_e\) et \(v_1\)**
 **Ã‰tape 1 : Analyse de l'AOP \(A_1\).**
 L'AOP \(A_1\) fonctionne en rÃ©gime linÃ©aire (prÃ©sence d'une boucle de contre-rÃ©action via la rÃ©sistance R). Son entrÃ©e non-inverseuse Ã©tant reliÃ©e Ã  la masse, on caractÃ©rise une masse virtuelle sur l'entrÃ©e inverseuse : \(V^- = 0\). Les courants d'entrÃ©e de l'AOP Ã©tant nuls, on peut appliquer la loi des nÅ“uds.
 **Ã‰tape 2 : Loi des nÅ“uds sur l'entrÃ©e inverseuse.**
 On somme les courants sortant du nÅ“ud inverseur, dont la tension vaut \(0\) grÃ¢ce Ã  la masse virtuelle. Les deux entrÃ©es arrivent par des capacitÃ©s d'admittance \(Cp\) et la contre-rÃ©action arrive par la rÃ©sistance \(R\) : \[Cp(0-v_e)+Cp(0-v_1)+\frac{0-v_2}{R}=0\] **Ã‰tape 3 : RÃ©solution de l'Ã©quation.**
 On obtient : \[-Cp\,v_e-Cp\,v_1-\frac{v_2}{R}=0\] \[\frac{v_2}{R}=-Cp(v_e+v_1) \implies \mathbf{v_2 = -RCp(v_e + v_1)}\]

**2. Expression de la tension \(v_s\) en fonction de \(v_2\)**
 **Ã‰tape 1 : Analyse de l'AOP \(A_2\).**
 L'AOP \(A_2\) est Ã©galement montÃ© en amplificateur inverseur fonctionnant en rÃ©gime linÃ©aire avec \(V^- = 0\). Il agit spÃ©cifiquement comme un intÃ©grateur Ã  fuite.
 **Ã‰tape 2 : Identification des admittances de boucle.**
 L'admittance de la branche d'entrÃ©e est \(Y_{in} = Cp\). L'admittance de la boucle de rÃ©troaction (composÃ©e de R en parallÃ¨le avec \(C_3\)) est \(Y_{ret} = \frac{1}{R} + C_3 p\).
 **Ã‰tape 3 : Expression de la tension de sortie.**
 La formule canonique du montage inverseur donne : \[v_s = - \frac{Y_{in}}{Y_{ret}} v_2 = - \frac{Cp}{\frac{1}{R} + C_3 p} v_2\] En multipliant par \(R\) au numÃ©rateur et au dÃ©nominateur pour simplifier : \[\mathbf{v_s = - v_2 \frac{RCp}{1 + R C_3 p}}\]

**3. Expression de la tension \(v_1\) en fonction de \(v_s\)**
 **Ã‰tape 1 : Analyse de l'AOP \(A_3\).**
 Ce montage est un amplificateur inverseur classique.
 **Ã‰tape 2 : Application de la formule du gain.**
 Les rÃ©sistances d'entrÃ©e et de contre-rÃ©action sont identiques et valent \(R_1\). Le gain est donc unitaire et inversÃ© : \[v_1 = -\frac{R_1}{R_1} v_s \implies \mathbf{v_1 = -v_s}\]

**4. Fonction de transfert \(T(p)\) et paramÃ¨tres canoniques**
 **Ã‰tape 1 : Substitution itÃ©rative des variables intermÃ©diaires.**
 On remplace tout d'abord \(v_1\) par \(-v_s\) dans l'Ã©quation initiale de \(v_2\) : \[v_2 = -RCp(v_e - v_s)\] **Ã‰tape 2 : Injection dans l'Ã©quation liant \(v_s\) et \(v_2\).**
 \[v_s = - \left[ -RCp(v_e - v_s) \right] \frac{RCp}{1 + R C_3 p} = (v_e - v_s) \frac{(RCp)^2}{1 + R C_3 p}\]
 **Ã‰tape 3 : Regroupement et isolation de \(v_s\).**
 On dÃ©veloppe puis on passe tous les termes en \(v_s\) Ã  gauche de l'Ã©galitÃ© : \[v_s \left[ 1 + \frac{(RCp)^2}{1 + R C_3 p} \right] = v_e \frac{(RCp)^2}{1 + R C_3 p}\] En mettant le crochet sous un dÃ©nominateur commun : \[v_s \left[ \frac{1 + R C_3 p + (RCp)^2}{1 + R C_3 p} \right] = v_e \frac{(RCp)^2}{1 + R C_3 p}\] Les dÃ©nominateurs se simplifient mutuellement, donnant \(T(p)\) : \[\mathbf{T(p) = \frac{v_s}{v_e} = \frac{(RCp)^2}{1 + R C_3 p + (RCp)^2}}\] **Ã‰tape 4 : Identification des paramÃ¨tres canoniques.**
 La forme canonique attendue est \(T(p) = \frac{A_0 \cdot (p/\omega_0)^2}{1 + 2m(p/\omega_0) + (p/\omega_0)^2}\). Par analogie avec notre rÃ©sultat en posant \(\frac{p}{\omega_0} = RCp\) :

- **Pulsation propre :** \(\mathbf{\omega_0 = \frac{1}{RC}}\).
- **Gain statique en haute frÃ©quence :** \(\mathbf{A_0 = 1}\).
- **Coefficient d'amortissement (\(m\)) :** Le terme du premier degrÃ© est \(2m\frac{p}{\omega_0} = R C_3 p\). En isolant \(m\), on a \(\frac{2m}{1/(RC)} = R C_3 \implies 2m RC = R C_3 \implies \mathbf{m = \frac{C_3}{2C}}\).

**5. Type et ordre du filtre**
 **Ã‰tape 1 : DÃ©termination de l'ordre.**
 Le dÃ©nominateur de \(T(p)\) est un polynÃ´me dont la puissance maximale est 2. Il s'agit de maniÃ¨re Ã©vidente d'un filtre du **2Ã¨me ordre**.
 **Ã‰tape 2 : DÃ©termination du comportement asymptotique.**
 Ã€ basse frÃ©quence (\(p \to 0\)), le terme \((RCp)^2\) au numÃ©rateur tend vers zÃ©ro, donc \(T(p) \to 0\). Ã€ haute frÃ©quence (\(p \to \infty\)), les termes en \(p^2\) dominent au numÃ©rateur et au dÃ©nominateur, donc \(T(p) \to 1\). Ce filtre bloque les basses frÃ©quences et laisse passer les hautes : c'est un filtre **passe-haut**.

**6. Pourquoi utiliser tant de composants pour ce filtre ?**
 **Ã‰tape 1 : Identification de l'architecture.**
 Cette topologie de circuit est connue sous le nom de filtre Ã  variables d'Ã©tat (ou filtre universel).
 **Ã‰tape 2 : Avantage industriel et technique.**
 Son utilitÃ© principale rÃ©side dans la **dÃ©corrÃ©lation totale des rÃ©glages**. Contrairement aux structures simples comme celles de Sallen-Key:

- L'ajustement de la rÃ©sistance \(R\) permet de rÃ©gler prÃ©cisÃ©ment la frÃ©quence de coupure \(\omega_0\).
- L'ajustement de la capacitÃ© \(C_3\) permet de modifier le facteur d'amortissement \(m\) indÃ©pendamment, sans jamais dÃ©rÃ©gler \(\omega_0\).

Cette caractÃ©ristique offre une fiabilitÃ© et une souplesse de conception inÃ©galables.
:::
:::

:::exercise label="Probleme 3" title="ProblÃ¨me III AOP de puissance"
:::figure src="assets/elec/exam/ELEC-exam-2025-schema-4.png" alt="Fig. 4 - Etage de puissance push-pull place dans la contre-reaction." caption="Fig. 4 - Etage de puissance push-pull place dans la contre-reaction."
:::

:::circuitjs label="CircuitJS" title="Push-pull" iframeTitle="Simulation CircuitJS d'un amplificateur push-pull" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=pushpull.txt"
:::

La tension \(v_1(t)\) est un signal triangulaire symÃ©trique, imposÃ© par l'extÃ©rieur, d'amplitude crÃªte \(\hat{v}_1\) de 0,3 V de frÃ©quence 1 kHz, centrÃ© en zÃ©ro.

- AOP parfait. Transistors \(T_1\) et \(T_2\) : \(\beta = 100 \gg 1\), \(|v_{be}| = 0.7 V\).
- RÃ©sistances : \(R_1 = 1 k\Omega\), \(R_2 = 9 k\Omega\), \(R_u = 8 \Omega\).
- Alim \(\pm V_{cc} = \pm 15 V\).

Exprimez l'amplification en tension \(A=v_2/v_1\). Calculez A.
 Calculez \(\hat{v}_2\) la tension crÃªte aux bornes de \(R_u\).
 Calculez les valeurs crÃªtes de \(I_u\) et \(I_{out}\).
 TracÃ© \(v_2(t)\), \(V_{BM}(t)\) sur la grille prÃ©vue.
 Exprimez la puissance active (moyenne) \(P_u\) dans \(R_u\) en fonction de \(\hat{v}_2\). Calculez \(P_u\).

:::block type="method" title="Correction et raisonnement"
**1. Amplification en tension (\(A\)) et tension crÃªte (\(\hat{v}_2\))**
 **Ã‰tape 1 : Analyse du montage.**
 L'AOP est montÃ© en **amplificateur non-inverseur**. L'Ã©tage de puissance "push-pull" (formÃ© par \(T_1\) et \(T_2\)) est inclus *Ã  l'intÃ©rieur* de la boucle de contre-rÃ©action. GrÃ¢ce Ã  son gain infini, l'AOP parfait va automatiquement compenser la chute de tension \(V_{be}\) des transistors. On peut donc analyser le gain global comme si les transistors Ã©taient de simples fils.
 **Ã‰tape 2 : Ã‰quations de l'AOP parfait.**
 En rÃ©gime linÃ©aire, la tension diffÃ©rentielle est nulle : \(V^+ = V^-\). Ici, \(V^+ = v_1\). La tension \(V^-\) est fixÃ©e par le pont diviseur formÃ© par \(R_1\) et \(R_2\) alimentÃ© par \(v_2\) : \[V^- = v_2 \frac{R_1}{R_1 + R_2}\] **Ã‰tape 3 : Calcul de \(A\) et \(\hat{v}_2\).**
 En Ã©galisant \(V^+\) et \(V^-\) : \[v_1 = v_2 \frac{R_1}{R_1 + R_2} \implies \mathbf{A = \frac{v_2}{v_1} = \frac{R_1 + R_2}{R_1} = 1 + \frac{9k}{1k} = 10}\] La tension de sortie crÃªte est simplement amplifiÃ©e par A : \[\mathbf{\hat{v}_2 = A \times \hat{v}_1 = 10 \times 0.3V = 3\,V}\]

**2. Courants crÃªtes \(I_u\) et \(I_{out}\)**
 **Ã‰tape 1 : Courant dans la charge (\(I_u\)).**
 On applique la loi d'Ohm sur la rÃ©sistance de charge \(R_u\) : \[\mathbf{\hat{I}_u = \frac{\hat{v}_2}{R_u} = \frac{3V}{8\Omega} = 0.375\,A \quad \text{(soit } 375\,mA)}\] **Ã‰tape 2 : Courant sortant de l'AOP (\(I_{out}\)).**
 L'AOP fournit uniquement le courant de base (\(I_B\)) aux transistors. Les transistors fournissent quant Ã  eux le courant d'Ã©metteur (\(I_E\)), qui se divise en deux : le courant utile \(I_u\) et le trÃ¨s faible courant de retour \(I_{ret}\) traversant \(R_1+R_2\). \[\hat{I}_{ret} = \frac{\hat{v}_2}{R_1 + R_2} = \frac{3V}{10k\Omega} = 0.3\,mA\] Le courant d'Ã©metteur total est \(\hat{I}_E = 375 + 0.3 = 375.3\,mA\).
 Sachant que \(I_B = I_E / \beta\) : \[\mathbf{\hat{I}_{out} = \hat{I}_B = \frac{375.3\,mA}{100} \approx 3.75\,mA}\] *(Note : La correction d'origine affiche \(4.05\,mA\) en additionnant directement \(\hat{I}_B = 3.75\) et \(\hat{I}_{ret} = 0.3\). Cela supposerait que la rÃ©sistance \(R_2\) soit branchÃ©e sur la sortie de l'AOP (nÅ“ud B), alors qu'elle est sur l'Ã©metteur (nÅ“ud E). Le rÃ©sultat rigoureux est bien \(3.75\,mA\), ce qui reste largement dans la limite des \(20\,mA\) qu'un AOP classique peut fournir).*

**3. TracÃ© de \(v_2(t)\) et \(V_{BM}(t)\)**
 **Ã‰tape 1 : Allure de \(v_2(t)\).**
 \(v_2(t)\) est une copie parfaite de \(v_1(t)\) amplifiÃ©e par 10. C'est donc un triangle symÃ©trique d'amplitude \(\pm 3\,V\).
 **Ã‰tape 2 : Allure de \(V_{BM}(t)\) (sortie de l'AOP).**
 Pour que la tension sur l'Ã©metteur (\(v_2\)) soit un beau triangle sans distorsion, l'AOP doit forcer sur la base (nÅ“ud B) une tension supÃ©rieure ou infÃ©rieure pour compenser le seuil des jonctions P-N :

- Quand \(v_2 > 0\) : T1 conduit, \(V_{BM} = v_2 + V_{be} = v_2 + 0.7\,V\).
- Quand \(v_2 < 0\) : T2 conduit, \(V_{BM} = v_2 - V_{be} = v_2 - 0.7\,V\).

*Graphiquement, \(V_{BM}\) a la mÃªme forme triangulaire que \(v_2\), mais prÃ©sente un saut vertical instantanÃ© de \(-0.7\,V\) Ã  \(+0.7\,V\) Ã  chaque passage par zÃ©ro de la tension.*

**4. Puissance active moyenne \(P_u\)**
 **Ã‰tape 1 : Valeur efficace d'un signal triangulaire.**
 Pour un signal triangulaire d'amplitude crÃªte \(\hat{v}_2\), la tension efficace est : \(V_{eff} = \frac{\hat{v}_2}{\sqrt{3}}\).
 **Ã‰tape 2 : Calcul de la puissance.**
 La puissance moyenne dissipÃ©e dans la rÃ©sistance \(R_u\) s'Ã©crit \(P_u = \frac{V_{eff}^2}{R_u}\). En remplaÃ§ant par l'expression de la tension efficace : \[\mathbf{P_u = \frac{\left( \hat{v}_2 / \sqrt{3} \right)^2}{R_u} = \frac{\hat{v}_2^2}{3 R_u}}\] Application numÃ©rique : \[\mathbf{P_u = \frac{3^2}{3 \times 8} = \frac{9}{24} = \frac{3}{8} = 0.375\,W \quad \text{(soit } 375\,mW)}\]
:::

\vfill

Dehay Esisar 1/2
:::
