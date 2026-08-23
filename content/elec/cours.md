---
title: Electronique EP361 - Revision ESISAR
subject: elec
type: course
---

:::section id="elec-intro" eyebrow="EP361" title="Circuits electroniques" summary="Cette page integre les quatre supports du dossier pdf/elec/cours : quadripoles, filtres, amplificateurs et oscillateurs quasi-sinusoidaux."
:::dashboard
:::card class="progress-card" kicker="Objectif" title="EP361"
Analyser des blocs analogiques evolues et concevoir des fonctions elementaires.
:::

:::card class="priority-card" kicker="Priorites de revision"
1. Choisir la bonne matrice de quadripole selon l'association.
2. Identifier le type de filtre, son ordre, sa frequence caracteristique et son facteur de qualite.
3. Comparer classes d'amplification, rendement, distorsion et bilan thermique.
4. Appliquer Barkhausen pour trouver la condition de depart d'oscillation.
:::
:::

:::quicklinks
- [Quadripoles](#elec-quadripoles)
- [Filtres](#elec-filtres)
- [Amplificateurs](#elec-amplis)
- [Oscillateurs](#elec-oscillateurs)
- [CircuitJS](#elec-simulations)
- [TD](#elec-td)
- [Examens](#elec-exams)
- [Fiche finale](#elec-revision)
- [PDF](#elec-pdfs)
:::

:::figure src="assets/elec/ep361-synthese.svg" alt="Schema reliant quadripoles, filtres, amplificateurs et oscillateurs." label="Synthese des blocs du cours EP361" caption="Le cours se lit comme une chaine de blocs : modeliser, filtrer, amplifier, puis creer un signal stable."
:::
:::

:::section id="elec-quadripoles" eyebrow="Chapitre 1" title="Quadripoles" summary="Un quadripole est un bloc electrique a deux ports. Il permet de remplacer un montage par des relations entre tensions et courants d'entree/sortie."
:::grid two-col
:::block type="definition" title="Variables"
- Port d'entree : \(v_1, i_1\).
- Port de sortie : \(v_2, i_2\).
- Les signes des courants doivent etre gardes constants pendant tout le calcul.
:::

:::block type="theorem" title="Matrices usuelles"
- Admittance : \(I=YV\), pratique en parallele.
- Impedance : \(V=ZI\), pratique en serie.
- Transfert ou chaine : pratique en cascade.
- Hybride : utile quand entree serie et sortie parallele sont imposees.
:::
:::

:::grid two-col
:::block type="method" title="Choix rapide"
- Mise en parallele : additionner les matrices \(Y\).
- Mise en serie : additionner les matrices \(Z\).
- Mise en cascade : multiplier les matrices de chaine dans l'ordre des blocs.
- Quadripole passif reciproque : symetries de coefficients, par exemple \(y_{12}=y_{21}\).
:::

:::block type="warning" title="Piege classique"
En cascade, l'ordre du produit compte. Il faut respecter l'ordre physique des blocs traverses par le signal.
:::
:::

:::block type="neutral" title="Lecture des matrices \(Z\) et \(Y\)"
La matrice impedance exprime les tensions en fonction des courants :

\[
\begin{bmatrix}v_1\\v_2\end{bmatrix}=
\begin{bmatrix}z_{11}&z_{12}\\z_{21}&z_{22}\end{bmatrix}
\begin{bmatrix}i_1\\i_2\end{bmatrix}
\]

La matrice admittance exprime les courants en fonction des tensions :

\[
\begin{bmatrix}i_1\\i_2\end{bmatrix}=
\begin{bmatrix}y_{11}&y_{12}\\y_{21}&y_{22}\end{bmatrix}
\begin{bmatrix}v_1\\v_2\end{bmatrix}
\]

Quand les deux existent, elles sont inverses l'une de l'autre : \(Y=Z^{-1}\) et \(Z=Y^{-1}\).
:::

:::grid two-col
:::block type="theorem" title="Cellule en T"
:::figure src="assets/elec/cellule-t.svg" alt="Cellule en T avec Z1 en serie entree, Z3 en serie sortie et Z2 vers la masse." class="td-figure"
:::

On note \(Z_1\) l'impedance serie cote entree, \(Z_3\) l'impedance serie cote sortie et \(Z_2\) la branche verticale commune vers la masse.

La forme en T se traite naturellement avec la matrice impedance, car les deux ports partagent l'impedance centrale \(Z_2\).

\[
Z_T=
\begin{bmatrix}
Z_1+Z_2 & Z_2\\
Z_2 & Z_2+Z_3
\end{bmatrix}
\]

En posant \(\Delta_T=Z_1Z_2+Z_1Z_3+Z_2Z_3\), la matrice admittance vaut :

\[
Y_T=\frac{1}{\Delta_T}
\begin{bmatrix}
Z_2+Z_3 & -Z_2\\
-Z_2 & Z_1+Z_2
\end{bmatrix}
\]
:::

:::block type="theorem" title="Cellule en Pi"
:::figure src="assets/elec/cellule-pi.svg" alt="Cellule en Pi avec Y1 et Y3 vers la masse et Y2 entre les deux ports." class="td-figure"
:::

On note \(Y_1\) l'admittance verticale cote entree, \(Y_3\) l'admittance verticale cote sortie et \(Y_2\) l'admittance entre les deux ports.

En posant \(\Delta_\Pi=Y_1Y_2+Y_1Y_3+Y_2Y_3\), la matrice impedance vaut :

\[
Z_\Pi=\frac{1}{\Delta_\Pi}
\begin{bmatrix}
Y_2+Y_3 & Y_2\\
Y_2 & Y_1+Y_2
\end{bmatrix}
\]

La forme en Pi se traite naturellement avec la matrice admittance, car les lois de noeuds donnent directement les courants.

\[
Y_\Pi=
\begin{bmatrix}
Y_1+Y_2 & -Y_2\\
-Y_2 & Y_2+Y_3
\end{bmatrix}
\]
:::
:::

:::grid two-col
:::block type="method" title="Comment retrouver la cellule en T"
1. Ouvrir la sortie pour calculer \(z_{11}=v_1/i_1\) : le courant traverse \(Z_1\) puis \(Z_2\), donc \(z_{11}=Z_1+Z_2\).
2. Garder la sortie ouverte et lire \(z_{21}=v_2/i_1\) : la tension de sortie est celle de la branche commune, donc \(z_{21}=Z_2\).
3. Par reciprocite passive, \(z_{12}=z_{21}=Z_2\).
4. Ouvrir l'entree pour calculer \(z_{22}=Z_3+Z_2\).
:::

:::block type="method" title="Comment retrouver la cellule en Pi"
1. Appliquer la loi des noeuds au port 1 : \(i_1=Y_1v_1+Y_2(v_1-v_2)\).
2. On obtient \(i_1=(Y_1+Y_2)v_1-Y_2v_2\).
3. Au port 2 : \(i_2=Y_3v_2+Y_2(v_2-v_1)\).
4. On obtient \(i_2=-Y_2v_1+(Y_2+Y_3)v_2\), ce qui donne directement \(Y_\Pi\).
:::
:::
:::

:::section id="elec-filtres" eyebrow="Chapitre 2" title="Filtres analogiques" summary="Un filtre selectionne une zone du spectre. On raisonne avec la fonction de transfert \(H(j\omega)\), son module et sa phase."
:::grid two-col
:::block type="definition" title="Familles ideales"
- Passe-bas : transmet les basses frequences.
- Passe-haut : transmet les hautes frequences.
- Passe-bande : transmet une bande \([f_1,f_2]\).
- Coupe-bande : rejette une bande de frequences.
:::

:::block type="theorem" title="Premier et second ordre"
- Premier ordre : pente asymptotique de \(20\) dB/dec par pole.
- Second ordre : pulsation propre, amortissement et facteur de qualite.
- Un ordre plus eleve donne une transition plus raide.
:::
:::

:::grid two-col
:::block type="method" title="Approximations"
- Butterworth : module le plus plat possible dans la bande transmise.
- Tchebytchev : ondulation acceptee pour obtenir une coupure plus raide a ordre donne.
- Le gabarit fixe les attenuations admissibles et guide le choix de l'ordre.
:::

:::block type="remember" title="Filtres actifs"
Les structures a AOP evitent les selfs, permettent du gain et facilitent la mise en cascade, mais restent limitees par le produit gain-bande et le slew rate.
:::
:::

:::block type="neutral" title="Structures a connaitre"
Le support cite les filtres a contre-reactions multiples, Rauch, Sallen-Key, les filtres passe-tout et les filtres a capacites commutees.
:::
:::

:::section id="elec-amplis" eyebrow="Chapitre 3" title="Amplificateurs" summary="Un amplificateur fournit de la puissance utile a la charge. On surveille gain, impedances, rendement, distorsion et dissipation."
:::grid two-col
:::block type="theorem" title="Bilan de puissance"
- Puissance absorbee : \(P_{abs}\).
- Puissance utile : \(P_u\).
- Puissance dissipee : \(P_d\).
- Rendement : \(\eta=\frac{P_u}{P_{abs}}=1-\frac{P_d}{P_{abs}}\).
:::

:::block type="definition" title="Modele quadripole"
- Gain en tension a vide : \(A_v=v_s/v_e\) pour \(i_s=0\).
- Impedance d'entree : \(Z_e=v_e/i_e\).
- Impedance de sortie : \(Z_s=v_s/i_s\) avec entree annulee.
- En charge, le gain est reduit par \(Z_s\) et la charge.
:::
:::

:::grid two-col
:::block type="method" title="Classes"
- Classe A : conduction sur \(2\pi\), tres lineaire, rendement faible, petits signaux.
- Classe B/AB : conduction autour de \(\pi\), bon rendement, risque de distorsion de croisement.
- Classe C : tres bon rendement mais forte distorsion, utile avec circuit resonant.
- Classe D : commutation, tres bon rendement, commande de puissance.
:::

:::block type="warning" title="Distorsion de croisement"
En classe B, les transistors peuvent etre bloques pres de zero. La compensation par diodes ou par AOP polarise les transistors pour limiter cette zone morte.
:::
:::
:::

:::section id="elec-oscillateurs" eyebrow="Chapitre 4" title="Oscillateurs quasi-sinusoidaux" summary="Un oscillateur produit une sinusoide sans entree externe, a une frequence imposee par un reseau selectif."
:::grid two-col
:::block type="theorem" title="Critere de Barkhausen"
Pour la boucle \(A(j\omega)B(j\omega)\), l'oscillation ideale se produit si :

\[
|A(j\omega_0)B(j\omega_0)|=1
\]

\[
\arg(A(j\omega_0)B(j\omega_0))=\pm180^\circ
\]
:::

:::block type="method" title="Demarrage et regime permanent"
- Pour demarrer : gain de boucle legerement superieur a 1.
- Si le gain est inferieur a 1, l'oscillation s'eteint.
- En regime permanent, une non-linearite stabilise l'amplitude.
:::
:::

:::grid two-col
:::block type="definition" title="Montages"
- Pont de Wien : oscillateur BF, condition typique de gain \(A_0=3\).
- LC : Colpitts, Clapp, Hartley ; la frequence depend du reseau reactif.
- Quartz : tres grand facteur de qualite, excellente stabilite en frequence.
- VCO : frequence pilotee par une tension, souvent via diode varicap.
:::

:::block type="remember" title="Qualite"
Les deux criteres pratiques sont la purete spectrale et la stabilite en frequence. Le quartz est privilegie quand la stabilite domine le cahier des charges.
:::
:::
:::

:::section id="elec-simulations" eyebrow="Interactif" title="Simulations CircuitJS" summary="Ces montages permettent de relier les formules du cours aux signaux observes : tension, courant, phase, coupure et demarrage d'oscillation."
:::grid two-col
:::block type="method" title="Filtre passe-bas"
Changer la frequence d'entree et observer l'attenuation. Le point important est de retrouver la zone de coupure et la pente du premier ordre.

[Ouvrir en plein ecran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=tllopass.txt)
:::

:::block type="method" title="Filtre passe-haut RC"
Comparer la tension d'entree et la tension de sortie quand la frequence varie. A basse frequence, la sortie reste proche de zero.

[Ouvrir en plein ecran](https://www.falstad.com/circuit/circuitjs.html?startCircuit=filt-hipass.txt)
:::
:::

:::circuitgrid
:::circuitjs label="Filtre" title="Passe-bas" iframeTitle="Simulation CircuitJS d'un filtre passe-bas" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=tllopass.txt"
:::

:::circuitjs label="Oscillateur" title="Colpitts" iframeTitle="Simulation CircuitJS d'un oscillateur Colpitts" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=colpitts.txt"
:::
:::

:::grid two-col
:::block type="remember" title="Ce qu'il faut mesurer"
- Sur un filtre : rapport \(V_s/V_e\), dephasage et frequence a -3 dB.
- Sur un oscillateur : frequence, amplitude stabilisee et condition de demarrage.
- Sur un AOP : saturation, limitation de bande passante et signe de la contre-reaction.
:::

:::block type="warning" title="Limite de simulation"
CircuitJS aide a visualiser les comportements, mais la justification d'examen reste analytique : schema equivalent, equations, fonction de transfert et verification des hypotheses.
:::
:::
:::

:::section id="elec-td" eyebrow="Travaux diriges" title="TD EP361 corrige" summary="Une page dediee reprend le poly de TD ajoute dans pdf/elec/td, avec corrections guidees et simulations CircuitJS."
:::dashboard
:::card class="chapter-card" pill="TD" title="Electronique des signaux" href="elec-td.html" link="Ouvrir la correction guidee"
Quadripoles, filtres passifs et actifs, amplificateurs de puissance, oscillateurs, convertisseurs et sujets type DS.
:::

:::card class="chapter-card" pill="PDF" muted="true" title="Poly original" href="pdf/elec/td/EP361_Poly_TD.pdf" link="Ouvrir le PDF source"
Source EP360/EP361 ajoutee au dossier des supports.
:::
:::
:::

:::section id="elec-exams" eyebrow="Entrainement" title="Examen corrige" summary="Une page dediee reprend les examens ajoutes dans pdf/elec/exam, avec les schemas et la correction detaillee."
:::dashboard
:::card class="chapter-card" pill="2025" title="Examen electronique 2025" href="elec-exam-2025.html" link="Ouvrir la correction"
Quadripoles, filtre actif passe-bas, filtre universel et AOP de puissance push-pull.
:::

:::card class="chapter-card" pill="2026" title="Examen electronique 2026" href="elec-exam-2026.html" link="Ouvrir la correction"
Darlington, filtre actif, filtre universel et oscillateur avec critere de Barkhausen.
:::
:::
:::

:::section id="elec-revision" eyebrow="Revision" title="Fiche finale EP361" summary="Les reflexes a avoir devant un exercice."
:::grid two-col
:::block type="method" title="Methode d'analyse"
1. Identifier la fonction du bloc : quadripole, filtre, ampli ou oscillateur.
2. Poser clairement les grandeurs d'entree/sortie et les conventions de signe.
3. Choisir l'outil : matrice, Bode, bilan de puissance ou critere de Barkhausen.
4. Verifier la coherence physique : unites, ordre de grandeur, pertes, saturation.
:::

:::block type="remember" title="Formules qui tombent vite"
- \(H(j\omega)=V_s/V_e\), avec module et phase.
- \(t_g=-d\varphi/d\omega\), temps de propagation de groupe.
- \(\eta=P_u/P_{abs}\).
- \(|AB|=1\) et phase de boucle correcte pour l'oscillateur.
:::
:::
:::

:::section id="elec-pdfs" eyebrow="Supports" title="PDF originaux" summary="Les supports ajoutes dans pdf/elec/cours restent accessibles directement."
:::dashboard
:::card class="chapter-card" pill="I" title="Quadripoles" href="pdf/elec/cours/EP361_I_Presentation_Quadripole.pdf" link="Ouvrir le PDF"
Presentation du module, matrices et associations de quadripoles.
:::

:::card class="chapter-card" pill="II" title="Filtres" href="pdf/elec/cours/EP361_II_Filtres.pdf" link="Ouvrir le PDF"
Gabarits, approximations, filtres actifs et capacites commutees.
:::

:::card class="chapter-card" pill="III" title="Amplificateurs" href="pdf/elec/cours/EP361_III_Amplificateurs.pdf" link="Ouvrir le PDF"
Classes A/B, rendement, distorsion, transistors, AOP et dissipation.
:::

:::card class="chapter-card" pill="IV" title="Oscillateurs" href="pdf/elec/cours/EP361_IV_Oscillateurs.pdf" link="Ouvrir le PDF"
Barkhausen, pont de Wien, LC, quartz et VCO.
:::
:::
:::
