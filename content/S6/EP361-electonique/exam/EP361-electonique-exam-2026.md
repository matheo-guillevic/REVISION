---
title: "Examen EP361-electonique 2026"
subject: "EP361-electonique"
type: "exam"
target: "EP361-electonique-exam-2026.html"
eyebrow: "EP360 / EP361 - Examen 2026"
heading: "Correction examen EP361-electonique 2026"
summary: "Darlington, filtres actifs, filtre universel et oscillateur a reseau de retour."
---
:::exercise label="Probleme 1" title="ProblÃ¨me I"
a) Donner la reprÃ©sentation gÃ©nÃ©rale d'un transistor bipolaire en paramÃ¨tres hybrides, sous forme matricielle.
 On considÃ¨rera pour la suite \(h_{12}=0\) et \(h_{22}=0\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : ModÃ¨le gÃ©nÃ©ral du quadripÃ´le.**
 La reprÃ©sentation en paramÃ¨tres hybrides permet de lier les grandeurs d'entrÃ©e (\(v_{be}\), \(i_b\)) aux grandeurs de sortie (\(v_{ce}\), \(i_c\)) d'un transistor. La matrice gÃ©nÃ©rale s'Ã©crit : \[\begin{bmatrix} v_{be} \\ i_c \end{bmatrix} = \begin{bmatrix} h_{11} & h_{12} \\ h_{21} & h_{22} \end{bmatrix} \begin{bmatrix} i_b \\ v_{ce} \end{bmatrix}\]

**Ã‰tape 2 : Application des hypothÃ¨ses simplificatrices.**
 Le sujet nous donne \(h_{12}=0\) et \(h_{22}=0\). Les Ã©quations deviennent donc : \[v_{be} = h_{11} \cdot i_b\] \[i_c = h_{21} \cdot i_b\]

**Conclusion :**
 Le transistor se modÃ©lise par un circuit simple : une rÃ©sistance d'entrÃ©e \(h_{11}\) et une source de courant commandÃ©e \(h_{21}i_b\) (souvent notÃ©e \(\beta i_b\)).
:::

b) Donner le schÃ©ma Ã©quivalent dynamique du montage de la Fig. 1 vu entre les bornes B, C et E.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Remplacement par les modÃ¨les dynamiques.**
 Pour Ã©tablir le schÃ©ma Ã©quivalent, il faut remplacer chaque transistor (\(T_1\) et \(T_2\)) par le modÃ¨le simplifiÃ© dÃ©terminÃ© Ã  la question a).

**Ã‰tape 2 : Identification des connexions (NÅ“uds).**
 En suivant le schÃ©ma de la Fig. 1, on rÃ©alise les connexions suivantes :

- **Base globale (B) :** Elle correspond directement Ã  la base du premier transistor (\(B_1\)).
- **Liaison interne (\(E_1\) - \(B_2\)) :** L'Ã©metteur de \(T_1\) est directement connectÃ© Ã  la base de \(T_2\).
- **Collecteur global (C) :** Les collecteurs \(C_1\) et \(C_2\) sont reliÃ©s ensemble pour former le collecteur global C.
- **Ã‰metteur global (E) :** Il correspond Ã  l'Ã©metteur du deuxiÃ¨me transistor (\(E_2\)).

*Le schÃ©ma comporte donc \(h_{11,T1}\) en sÃ©rie avec \(h_{11,T2}\), et deux sources de courant (\(h_{21,T1}ib_1\) et \(h_{21,T2}ib_2\)) injectant en parallÃ¨le dans le collecteur commun C.*
:::

c) Exprimer \(ib_2\) en fonction de \(ib_1\) et de \(h_{21,T1}\) (on ne nÃ©gligera pas le terme 1 devant \(h_{21}\)).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Analyse de la liaison \(E_1\)-\(B_2\).**
 Le courant entrant dans la base \(B_2\) (\(ib_2\)) correspond exactement au courant d'Ã©metteur de \(T_1\) (\(i_{e1}\)).

**Ã‰tape 2 : Loi des nÅ“uds sur le transistor 1.**
 La somme des courants entrant dans un transistor est Ã©gale au courant sortant par l'Ã©metteur: \[i_{e1} = i_{b1} + i_{c1}\]

**Ã‰tape 3 : Substitution et factorisation.**
 On sait que \(i_{c1} = h_{21,T1} \cdot i_{b1}\). En remplaÃ§ant dans l'Ã©quation : \[ib_2 = i_{b1} + h_{21,T1} \cdot i_{b1}\] \[\mathbf{ib_2 = (1 + h_{21,T1}) \cdot i_{b1}}\]
:::

d) En dÃ©duire l'expression de l'impÃ©dance d'entrÃ©e Ã©quivalente.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finir l'impÃ©dance d'entrÃ©e.**
 L'impÃ©dance d'entrÃ©e globale est dÃ©finie par \(h_{11,Teq} = \frac{v_{be}}{i_b}\).

**Ã‰tape 2 : Loi des mailles Ã  l'entrÃ©e.**
 La maille d'entrÃ©e donne : \(v_{be} = v_{be1} + v_{be2}\). En utilisant les modÃ¨les hybrides pour chaque transistor : \[v_{be} = h_{11,T1} \cdot i_{b1} + h_{11,T2} \cdot i_{b2}\]

**Ã‰tape 3 : Substitution de \(ib_2\).**
 On remplace \(ib_2\) par l'expression obtenue en c) : \[v_{be} = h_{11,T1} \cdot i_{b1} + h_{11,T2} \cdot (1 + h_{21,T1}) \cdot i_{b1}\]

**Ã‰tape 4 : Factorisation.**
 En factorisant par \(i_{b1}\) (sachant que le courant d'entrÃ©e global \(i_b = i_{b1}\)): \[\mathbf{h_{11,Teq} = h_{11,T1} + h_{11,T2}(1 + h_{21,T1})}\]
:::

e) En dÃ©duire l'expression du gain en courant Ã©quivalent.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finir le gain en courant.**
 Le gain en courant global est \(h_{21,Teq} = \frac{i_c}{i_b}\).

**Ã‰tape 2 : Loi des nÅ“uds au collecteur.**
 Le courant de collecteur total est la somme des deux courants de collecteur: \[i_c = i_{c1} + i_{c2} = h_{21,T1} \cdot i_{b1} + h_{21,T2} \cdot i_{b2}\]

**Ã‰tape 3 : Substitution et dÃ©veloppement.**
 On remplace \(ib_2\) par son expression : \[i_c = h_{21,T1} \cdot i_{b1} + h_{21,T2} \cdot (1 + h_{21,T1}) \cdot i_{b1}\] En factorisant par \(i_{b1}\) : \[\mathbf{h_{21,Teq} = h_{21,T1} + h_{21,T2} + h_{21,T1} \cdot h_{21,T2}}\]
:::

f) Dans le cas oÃ¹ les deux transistors sont identiques, simplifier les expressions de : \(h_{11,Teq}\) et \(h_{21,Teq}\)

:::block type="method" title="Correction et raisonnement"
**HypothÃ¨se :**
 Les transistors sont identiques, on pose donc \(h_{11,T1} = h_{11,T2} = h_{11}\) et \(h_{21,T1} = h_{21,T2} = \beta\).

**Simplification de \(h_{11,Teq}\) :**
 \[h_{11,Teq} = h_{11} + h_{11}(1 + \beta) = h_{11}(2 + \beta)\] Comme \(\beta \gg 1\) en gÃ©nÃ©ral, on approxime: \[\mathbf{h_{11,Teq} \approx \beta \cdot h_{11}}\]

**Simplification de \(h_{21,Teq}\) :**
 \[h_{21,Teq} = \beta + \beta + \beta^2 = 2\beta + \beta^2\] Avec \(\beta \gg 1\), le terme au carrÃ© est dominant : \[\mathbf{h_{21,Teq} \approx \beta^2}\]
:::

g) Indiquer de quel type de montage il s'agit et prÃ©ciser son principal intÃ©rÃªt.

:::block type="method" title="Correction et raisonnement"
**Type de montage :**
 Il s'agit d'un **Montage Darlington**.

**IntÃ©rÃªt principal :**
 Ce montage permet de se comporter comme un transistor unique possÃ©dant :

- Un **trÃ¨s grand gain en courant** (environ \(\beta^2\)).
- Une **trÃ¨s grande impÃ©dance d'entrÃ©e**.

Cela le rend idÃ©al pour des Ã©tages de puissance ou d'amplification nÃ©cessitant un trÃ¨s faible courant de commande.
:::

:::figure src="assets/EP361-electonique/exam/ELEC-exam-2026-schema-1.png" alt="Fig. 1 - Les deux transistors forment un montage Darlington." caption="Fig. 1 - Les deux transistors forment un montage Darlington."
:::
:::

:::exercise label="Probleme 2" title="ProblÃ¨me II"
Le filtre ci-dessous est constituÃ© d'un AOP parfait, alimentÃ© en symÃ©trique associÃ© Ã  deux quadripÃ´les \(\text{Q}_\text{A}\), \(\text{Q}_\text{B}\). Les quadripÃ´les A et B sont dÃ©crits par leur matrice admittance.

:::figure src="assets/EP361-electonique/exam/ELEC-exam-2026-schema-2.png" alt="Fig. 2 et 3 - AOP inverseur avec quadripoles QA et QB." caption="Fig. 2 et 3 - AOP inverseur avec quadripoles QA et QB."
:::

:::circuitjs label="CircuitJS" title="AOP inverseur" iframeTitle="Simulation CircuitJS d'un amplificateur inverseur" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=opamp.txt"
:::

\[\text{Y}_\text{A} = \begin{bmatrix} y_{A_{11}} & y_{A_{12}} \\ y_{A_{21}} & y_{A_{22}} \end{bmatrix} \qquad \text{Y}_\text{B} = \begin{bmatrix} y_{B_{11}} & y_{B_{12}} \\ y_{B_{21}} & y_{B_{22}} \end{bmatrix}\]

a/ Exprimer en dÃ©montrant H(p) en fonction de certains Ã©lÃ©ments \(y_{x\;ij}\) : \(\text{H(p)} = \frac{v_S}{v_E}\) avec (x = A ou B).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : PropriÃ©tÃ©s de l'AOP parfait en rÃ©gime linÃ©aire.**
 L'AOP possÃ¨de une boucle de rÃ©troaction sur son entrÃ©e inverseuse (via \(Q_B\)), il fonctionne donc en rÃ©gime linÃ©aire. Par consÃ©quent, la tension diffÃ©rentielle est nulle : \(V^+ = V^-\). Puisque l'entrÃ©e non-inverseuse est Ã  la masse (\(V^+ = 0\)), on obtient une **masse virtuelle** : \(V^- = 0\). De plus, les courants d'entrÃ©e d'un AOP parfait sont nuls : \(i^- = 0\).

**Ã‰tape 2 : Ã‰quations de transfert des quadripÃ´les.**

- **Pour le quadripÃ´le A** (connectÃ© entre \(V_e\) et \(V^-\)) : le courant de sortie \(I_{A2}\) s'Ã©crit, d'aprÃ¨s la matrice admittance :

\[I_{A2} = y_{A21} V_e + y_{A22} V^-\] Comme \(V^- = 0\), cela se simplifie en : \(I_{A2} = y_{A21} V_e\).

- **Pour le quadripÃ´le B** (connectÃ© entre \(V^-\) et \(V_s\)) : le courant d'entrÃ©e \(I_{B1}\) s'Ã©crit :

\[I_{B1} = y_{B11} V^- + y_{B12} V_s\] Comme \(V^- = 0\), cela se simplifie en : \(I_{B1} = y_{B12} V_s\).

**Ã‰tape 3 : Loi des nÅ“uds Ã  l'entrÃ©e inverseuse.**
 Le courant sortant de \(Q_A\) s'additionne au courant entrant dans \(Q_B\), et la somme doit Ãªtre Ã©gale au courant \(i^-\) de l'AOP : \[I_{A2} + I_{B1} = i^- = 0\]

**Ã‰tape 4 : DÃ©duction de la fonction de transfert.**
 En remplaÃ§ant les courants par les expressions trouvÃ©es Ã  l'Ã©tape 2 : \[y_{A21} V_e + y_{B12} V_s = 0\] \[y_{B12} V_s = - y_{A21} V_e\] \[\mathbf{H(p) = \frac{V_s}{V_e} = -\frac{y_{A21}}{y_{B12}}}\]
:::

b/ Exprimez H(p) la fonction de transfert du filtre en considÃ©rant :

| \(y_1\) : capacitÃ© C | \(y_2\) : capacitÃ© C |
| --- | --- |
| \(y_3\) : rÃ©sistance R | \(y_4\) : rÃ©sistance R |

c/ Donner la fonction de transfert sous forme canonique en fonction des composants.

d/ DÃ©finissez l'ordre et le type de filtre.

DonnÃ©es
 \(\cdot\) Matrice Admittance -- QuadripÃ´le A \[\text{Y}_\text{A} = \frac{1}{y_1+y_2+y_3} \begin{bmatrix} y_1(y_2+y_3) & -y_1 y_2 \\ -y_1 y_2 & y_2(y_1+y_3) \end{bmatrix}\]

\(\cdot\) Matrice Admittance -- QuadripÃ´le B \[\text{Y}_\text{B} = \begin{bmatrix} \dots & \frac{-y_1 y_2}{y_1+y_2+y_3} - y_4 \\[10pt] \dots & \dots \end{bmatrix}\]

:::block type="method" title="Correction et raisonnement"
**Questions b/ et c/ :**
 **Ã‰tape 1 : Identification des paramÃ¨tres des matrices.**
 En observant les matrices \(Y_A\) et \(Y_B\) fournies, on repÃ¨re les coefficients nÃ©cessaires : \[y_{A21} = \frac{-y_1 y_2}{y_1+y_2+y_3} \quad \text{et} \quad y_{B12} = \frac{-y_1 y_2}{y_1+y_2+y_3} - y_4\]

**Ã‰tape 2 : Remplacement dans H(p).**
 D'aprÃ¨s la question a/ : \[H(p) = -\frac{\frac{-y_1 y_2}{y_1+y_2+y_3}}{\frac{-y_1 y_2}{y_1+y_2+y_3} - y_4}\] En multipliant numÃ©rateur et dÃ©nominateur par \((y_1+y_2+y_3)\) pour Ã©liminer les fractions Ã©tagÃ©es : \[H(p) = \frac{y_1 y_2}{y_1 y_2 + y_4(y_1+y_2+y_3)}\]

**Ã‰tape 3 : Remplacement par les admittances des composants complexes.**
 L'admittance d'un condensateur est \(Cp\) et celle d'une rÃ©sistance est \(1/R\). Ainsi, \(y_1 = y_2 = Cp\) et \(y_3 = y_4 = \frac{1}{R}\). \[H(p) = \frac{(Cp)(Cp)}{(Cp)(Cp) + \frac{1}{R}\left(Cp + Cp + \frac{1}{R}\right)}\] \[H(p) = \frac{C^2p^2}{C^2p^2 + \frac{1}{R}\left(2Cp + \frac{1}{R}\right)} = \frac{C^2p^2}{C^2p^2 + \frac{2C}{R}p + \frac{1}{R^2}}\]

**Ã‰tape 4 : Mise sous forme canonique.**
 Pour identifier une forme canonique standard, on cherche Ã  obtenir "1" comme terme de degrÃ© 0 au dÃ©nominateur. On multiplie numÃ©rateur et dÃ©nominateur par \(R^2\) : \[\mathbf{H(p) = \frac{(RCp)^2}{1 + 2RCp + (RCp)^2}}\]

**Question d/ :**
 **Ã‰tape 1 : Identification avec la forme gÃ©nÃ©rale.**
 La fonction de transfert correspond Ã  la forme canonique : \[H(p) = \frac{A_0 \cdot \left(\frac{p}{\omega_0}\right)^2}{1 + 2m\left(\frac{p}{\omega_0}\right) + \left(\frac{p}{\omega_0}\right)^2}\] Avec \(\omega_0 = \frac{1}{RC}\), \(A_0 = 1\) et \(m = 1\).

**Ã‰tape 2 : Conclusion sur le filtre.**

- **Ordre :** La puissance maximale de \(p\) au dÃ©nominateur est 2. C'est un filtre du **2Ã¨me ordre**.
- **Type :** Ã€ trÃ¨s basse frÃ©quence (\(p \to 0\)), \(H(p) \to 0\). Ã€ trÃ¨s haute frÃ©quence (\(p \to \infty\)), \(H(p) \to \frac{(RCp)^2}{(RCp)^2} = 1\). Il laisse donc passer les hautes frÃ©quences, c'est un filtre **passe-haut**.
:::
:::

:::exercise label="Probleme 3" title="ProblÃ¨me III"
:::figure src="assets/EP361-electonique/exam/ELEC-exam-2026-schema-3.png" alt="Fig. 4 - Filtre universel a trois AOP." caption="Fig. 4 - Filtre universel a trois AOP."
:::

:::circuitjs label="CircuitJS" title="Filtre actif" iframeTitle="Simulation CircuitJS d'un filtre actif" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=filt-hipass.txt"
:::

Les AOP sont parfaits alimentÃ©s symÃ©triques +/- \(\text{V}_{\text{cc}}\).

- Exprimez la tension \(v_2\) en fonction de \(V_e\) et \(V_1\).
- Exprimez la tension \(v_s\) en fonction de \(V_2\).
- Exprimez la tension \(v_1\) en fonction de \(V_s\).
- Exprimez T(p) la fonction de transfert sous forme canonique en exprimant la pulsation propre, le coefficient d'amortissement et le gain statique : \(\text{T(p)} = \frac{v_s}{v_e}\)
- Quel est le type et l'ordre du filtre
- Pourquoi tant de composants pour ce filtre ?

:::block type="method" title="Correction et raisonnement"
**1. Expression de la tension \(v_2\) en fonction de \(V_e\) et \(V_1\)**
 **Ã‰tape 1 : Analyse du rÃ©gime de fonctionnement de \(A_1\).**
 L'AOP \(A_1\) possÃ¨de une boucle de rÃ©troaction nÃ©gative via la rÃ©sistance \(R\), il fonctionne donc en rÃ©gime linÃ©aire. Comme son entrÃ©e non-inverseuse est Ã  la masse (\(V^+ = 0\)), on en dÃ©duit une masse virtuelle sur l'entrÃ©e inverseuse : \(V^- = 0\). Les courants d'entrÃ©e de l'AOP Ã©tant nuls, on peut appliquer la loi des nÅ“uds en ce point.
 **Ã‰tape 2 : Application de la loi des nÅ“uds.**
 Trois branches de composants arrivent au nÅ“ud \(V^-\). Comme \(V^- = 0\), on somme les courants sortant de ce nÅ“ud vers \(V_e\), vers \(V_1\) et vers \(v_2\) : \[Cp(0 - V_e) + Cp(0 - V_1) + \frac{0 - v_2}{R} = 0\] **Ã‰tape 3 : RÃ©solution algÃ©brique.**
 \[-CpV_e - CpV_1 - \frac{v_2}{R} = 0\] \[\frac{v_2}{R} = -Cp(V_e + V_1) \implies \mathbf{v_2 = -RCp(V_e + V_1)}\]

**2. Expression de la tension \(v_s\) en fonction de \(V_2\)**
 **Ã‰tape 1 : Analyse du nÅ“ud inverseur de \(A_2\).**
 De la mÃªme maniÃ¨re, \(A_2\) fonctionne en rÃ©gime linÃ©aire avec \(V^+ = 0\), donc son entrÃ©e inverseuse est Ã©galement Ã  un potentiel nul (\(V^- = 0\)).
 **Ã‰tape 2 : DÃ©termination de l'admittance de la boucle de rÃ©troaction.**
 La rÃ©troaction de \(A_2\) est composÃ©e d'une rÃ©sistance \(R\) en parallÃ¨le avec un condensateur \(C_3\). L'admittance globale de cette branche parallÃ¨le est : \(Y_f = \frac{1}{R} + C_3p\).
 **Ã‰tape 3 : Application de la loi des nÅ“uds au point \(V^- = 0\).**
 Le courant arrivant de \(v_2\) Ã  travers le condensateur \(C\) est Ã©gal au courant repartant vers \(v_s\) Ã  travers la branche parallÃ¨le : \[(v_2 - 0)\cdot Cp + (v_s - 0)\cdot \left(\frac{1}{R} + C_3p\right) = 0\] \[v_s \cdot \left(\frac{1 + RC_3p}{R}\right) = -v_2 \cdot Cp \implies \mathbf{v_s = -v_2 \frac{RCp}{1 + RC_3p}}\]

**3. Expression de la tension \(v_1\) en fonction de \(V_s\)**
 **Ã‰tape 1 : Identification du montage \(A_3\).**
 L'AOP \(A_3\) est cÃ¢blÃ© selon une structure classique d'amplificateur inverseur.
 **Ã‰tape 2 : Ã‰quation du montage.**
 Le signal d'entrÃ©e est \(v_s\) (appliquÃ© sur la rÃ©sistance d'entrÃ©e \(R_1\)) et la sortie est \(v_1\) (liÃ©e par la rÃ©sistance de rÃ©troaction \(R_1\)). La formule du gain de l'inverseur donne directement : \[v_1 = -\frac{R_1}{R_1} \cdot v_s \implies \mathbf{v_1 = -v_s}\]

**4. Expression de la fonction de transfert globale \(T(p) = \frac{v_s}{v_e}\)**
 **Ã‰tape 1 : Substitution des variables intermÃ©diaires.**
 RemplaÃ§ons d'abord \(V_1\) par \(-v_s\) (trouvÃ© Ã  la question 3) dans l'expression de \(v_2\) (question 1) : \[v_2 = -RCp(V_e - v_s) = RCp(v_s - V_e)\] **Ã‰tape 2 : Injection dans l'Ã©quation de la tension de sortie.**
 Introduisons cette expression de \(v_2\) dans la relation de la question 2 : \[v_s = - \left[ RCp(v_s - V_e) \right] \cdot \frac{RCp}{1 + RC_3p} = (V_e - v_s) \frac{(RCp)^2}{1 + RC_3p}\] **Ã‰tape 3 : Isolation de la variable de sortie \(v_s\).**
 Multiplions toute l'Ã©quation par \((1 + RC_3p)\) : \[v_s(1 + RC_3p) = V_e(RCp)^2 - v_s(RCp)^2 \implies v_s \left[1 + RC_3p + (RCp)^2\right] = V_e(RCp)^2\] On obtient la fonction de transfert globale : \[\mathbf{T(p) = \frac{v_s}{V_e} = \frac{(RCp)^2}{1 + RC_3p + (RCp)^2}}\] **Ã‰tape 4 : Identification des paramÃ¨tres de la forme canonique.**
 La forme gÃ©nÃ©rale standard d'un filtre du second ordre passe-haut est : \(T(p) = \frac{T_0 \left(\frac{p}{\omega_0}\right)^2}{1 + 2m\left(\frac{p}{\omega_0}\right) + \left(\frac{p}{\omega_0}\right)^2}\). En posant \(\frac{p}{\omega_0} = RCp\), on en dÃ©duit par identification :

- Pulsation propre : \(\mathbf{\omega_0 = \frac{1}{RC}}\)
- Gain statique : \(\mathbf{T_0 = 1}\)
- Coefficient d'amortissement (\(m\)) : le terme du premier degrÃ© donne \(2m\frac{p}{\omega_0} = 2mRCp\). En Ã©galisant avec notre terme \(RC_3p\), on obtient \(2mRC = RC_3 \implies \mathbf{m = \frac{C_3}{2C}}\).

**5. Type et ordre du filtre**
 **Ã‰tape 1 : DÃ©termination de l'ordre.**
 Le dÃ©nominateur de la fonction de transfert est un polynÃ´me en \(p\) dont le degrÃ© maximal est de 2. Il s'agit donc d'un filtre du **2Ã¨me ordre**.
 **Ã‰tape 2 : DÃ©termination du comportement frÃ©quentiel.**

- Ã€ basse frÃ©quence (\(p \to 0\)) : Le numÃ©rateur tend vers 0, donc \(T(p) \to 0\).
- Ã€ haute frÃ©quence (\(p \to \infty\)) : Les termes de plus haut degrÃ© l'emportent, \(T(p) \to \frac{(RCp)^2}{(RCp)^2} = 1\).

Le filtre bloque les basses frÃ©quences et laisse passer les hautes frÃ©quences, c'est un filtre **passe-haut**.

**6. IntÃ©rÃªt de cette structure (Filtre universel / Variable d'Ã©tat)**
 Bien que ce circuit nÃ©cessite 3 AOP et de nombreux composants passifs, il offre un avantage industriel majeur par rapport aux structures plus simples (Sallen-Key ou Rauch) : **l'indÃ©pendance des rÃ©glages**.
 En effet, l'Ã©quation montre que :

- On peut modifier la frÃ©quence de coupure \(\omega_0\) en faisant varier la rÃ©sistance \(R\) sans perturber le facteur d'amortissement \(m\).
- On peut ajuster le facteur d'amortissement \(m\) uniquement en modifiant la capacitÃ© \(C_3\), sans impacter la frÃ©quence de coupure \(\omega_0\).

Cette dÃ©corrÃ©lation rend le filtre extrÃªmement stable, prÃ©cis et facile Ã  calibrer.
:::
:::

:::exercise label="Probleme 4" title="ProblÃ¨me IV"
La fonction de transfert en boucle fermÃ©e du systÃ¨me prÃ©sentÃ© Ã  la Fig. 5 s'Ã©crit : \[T(j\omega) = \frac{A(j\omega)}{1 - A(j\omega).B(j\omega)}\]

:::figure src="assets/EP361-electonique/exam/ELEC-exam-2026-schema-4.png" alt="Fig. 5 - Boucle d'oscillateur avec amplificateur inverseur et reseau de retour." caption="Fig. 5 - Boucle d'oscillateur avec amplificateur inverseur et reseau de retour."
:::

:::circuitjs label="CircuitJS" title="Oscillateur Colpitts" iframeTitle="Simulation CircuitJS d'un oscillateur Colpitts" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=colpitts.txt"
:::

On veut rÃ©aliser un oscillateur avec ce systÃ¨me qui est constituÃ© :
 d'un ampli inverseur de gain \(A = -K\)
 et d'un rÃ©seau de retour ayant comme fonction de transfert : \[B(j\omega) = \frac{1}{\left(1+j\frac{\omega}{\omega_0}\right)^3} \qquad \text{avec } \omega_0 = 10^4 \text{ rad/s}\]

1. Tracer le diagramme de Bode (module et phase) de \(B(j\omega)\).
 2. Determiner graphiquement et par calcul la pulsation d'oscillation \(\omega_{osc}\). Justifier.
 3. Quel est le gain minimal K permettant l'oscillation ?

:::block type="method" title="Correction et raisonnement"
**1. Ã‰tablissement du diagramme de Bode de \(B(j\omega)\)**
 **Ã‰tape 1 : Analyse du module et du gain en dB.**
 Le module de la fonction de transfert s'exprime par : \[|B(j\omega)| = \frac{1}{\left(\sqrt{1 + \left(\frac{\omega}{\omega_0}\right)^2}\right)^3} = \left(1 + \left(\frac{\omega}{\omega_0}\right)^2\right)^{-3/2}\] Le gain en dÃ©cibels est donc : \(G_{dB}(\omega) = 20\log|B(j\omega)| = -30\log\left(1 + \left(\frac{\omega}{\omega_0}\right)^2\right)\).

- **Ã€ basse frÃ©quence** (\(\omega \ll \omega_0\)) : \(G_{dB}(\omega) \approx 0 \text{ dB}\) (asymptote horizontale).
- **Ã€ haute frÃ©quence** (\(\omega \gg \omega_0\)) : \(G_{dB}(\omega) \approx -60\log\left(\frac{\omega}{\omega_0}\right)\), ce qui donne une droite de pente **\(-60 \text{ dB/dÃ©cade}\)** (comportement d'un systÃ¨me d'ordre 3).
- **Ã€ la pulsation propre** (\(\omega = \omega_0\)) : \(G_{dB}(\omega_0) = -30\log(2) \approx -9 \text{ dB}\).

**Ã‰tape 2 : Analyse de la phase.**
 L'argument de \(B(j\omega)\) est donnÃ© par la somme des arguments (le dÃ©nominateur apporte un signe moins) : \[\phi(\omega) = \arg(B(j\omega)) = -3 \arctan\left(\frac{\omega}{\omega_0}\right)\]

- **Ã€ basse frÃ©quence** (\(\omega \to 0\)) : \(\phi \to -3 \times 0^\circ = 0^\circ\).
- **Ã€ la pulsation propre** (\(\omega = \omega_0\)) : \(\phi = -3 \times \arctan(1) = -3 \times 45^\circ = -135^\circ\).
- **Ã€ haute frÃ©quence** (\(\omega \to \infty\)) : \(\phi \to -3 \times 90^\circ = -270^\circ\).

**2. DÃ©termination de la pulsation d'oscillation \(\omega_{osc}\)**
 **Ã‰tape 1 : Condition thÃ©orique d'oscillation (CritÃ¨re de Barkhausen).**
 Pour qu'un circuit oscille de faÃ§on autonome (sans signal d'entrÃ©e), le systÃ¨me en boucle fermÃ©e doit avoir un pÃ´le sur l'axe imaginaire, ce qui se traduit par un dÃ©nominateur nul : \(1 - A\cdot B = 0 \implies A\cdot B(j\omega_{osc}) = 1\).
 En remplaÃ§ant l'amplificateur par son gain \(A = -K\), on obtient : \[-K \cdot B(j\omega_{osc}) = 1 \implies B(j\omega_{osc}) = -\frac{1}{K}\]

**Ã‰tape 2 : Extraction de la condition de phase.**
 Le gain \(K\) Ã©tant un rÃ©el positif, le terme \(-\frac{1}{K}\) est un nombre rÃ©el purement nÃ©gatif. Son argument est donc Ã©gal Ã  \(\pm 180^\circ\) (ou \(\pi\) radians). On cherche la pulsation \(\omega_{osc}\) telle que : \[\arg(B(j\omega_{osc})) = -180^\circ\]

**Ã‰tape 3 : Calcul mathÃ©matique de \(\omega_{osc}\).**
 Utilisons l'expression de la phase trouvÃ©e Ã  la question 1 : \[-3 \arctan\left(\frac{\omega_{osc}}{\omega_0}\right) = -180^\circ \implies \arctan\left(\frac{\omega_{osc}}{\omega_0}\right) = 60^\circ \quad \left(\text{ou } \frac{\pi}{3} \text{ rad}\right)\] En appliquant la fonction tangente des deux cÃ´tÃ©s : \[\frac{\omega_{osc}}{\omega_0} = \tan(60^\circ) = \sqrt{3} \implies \mathbf{\omega_{osc} = \omega_0\sqrt{3}}\] En effectuant l'application numÃ©rique avec \(\omega_0 = 10^4 \text{ rad/s}\) : \[\mathbf{\omega_{osc} = 10^4 \times \sqrt{3} \approx 17\,320 \text{ rad/s}}\]

**Ã‰tape 4 : Justification graphique.**
 Sur le diagramme de Bode de phase, la pulsation \(\omega_{osc}\) correspond prÃ©cisÃ©ment au point d'intersection oÃ¹ la courbe de phase croise la ligne horizontale d'ordonnÃ©e \(-180^\circ\).

**3. Calcul du gain minimal \(K\) permettant le dÃ©marrage de l'oscillation**
 **Ã‰tape 1 : Application de la condition de module.**
 D'aprÃ¨s le critÃ¨re de Barkhausen (\(A \cdot B = 1\)), la condition sur les modules impose : \(|A| \cdot |B(j\omega_{osc})| = 1 \implies K \cdot |B(j\omega_{osc})| = 1\). Pour assurer le dÃ©marrage des oscillations face aux pertes du circuit, le gain rÃ©el doit Ãªtre supÃ©rieur ou Ã©gal Ã  cette limite : \[K \ge \frac{1}{|B(j\omega_{osc})|}\]

**Ã‰tape 2 : Calcul de la valeur du module de retour Ã  \(\omega_{osc}\).**
 Ã€ la pulsation d'oscillation, nous avons Ã©tabli que \(\frac{\omega_{osc}}{\omega_0} = \sqrt{3}\). RemplaÃ§ons ce rapport dans la formule du module de \(B\) : \[|B(j\omega_{osc})| = \frac{1}{\left(\sqrt{1 + (\sqrt{3})^2}\right)^3} = \frac{1}{\left(\sqrt{1 + 3}\right)^3} = \frac{1}{(\sqrt{4})^3} = \frac{1}{2^3} = \frac{1}{8}\]

**Ã‰tape 3 : DÃ©duction du gain limite.**
 \[K \ge \frac{1}{1/8} \implies \mathbf{K_{min} = 8}\] Il faut donc un gain d'amplification d'au moins **8** pour compenser l'attÃ©nuation d'un facteur 8 subie par le signal lors de son passage dans le rÃ©seau de retour Ã  la frÃ©quence d'oscillation.
:::

\vfill

Allane Esisar 1/2
:::
