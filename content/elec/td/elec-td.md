---
title: "TD EP361 corrige"
subject: "elec"
type: "td"
target: "elec-td.html"
eyebrow: "EP361 - TD"
heading: "TD electronique corrige"
summary: "Corrections guidees et simulations CircuitJS pour les exercices d'electronique."
pdfHref: "pdf/elec/td/EP361_Poly_TD.pdf"
---
:::exercise label="Quadripoles" title="Cellule en L et cascade RC"
:::block type="method" title="Correction"
Pour une cellule serie \(Z_1\) suivie d'une admittance de sortie \(Z_2\) vers la masse, les equations sont \(v_1=v_2+Z_1 i_1\) et \(i_1=i_2+v_2/Z_2\), avec la convention de matrice chaine \(\begin{bmatrix}v_1\\i_1\end{bmatrix}=K\begin{bmatrix}v_2\\-i_2\end{bmatrix}\).

On obtient une matrice du type :

\[\mathbf{K=\begin{bmatrix}1+\frac{Z_1}{Z_2}&Z_1\\\frac{1}{Z_2}&1\end{bmatrix}}\]

Son determinant vaut \(1\), ce qui traduit la reciprocite du reseau passif.

A vide, \(i_2=0\), donc \(H(p)=v_2/v_1=1/A\). Avec \(Z_1=R\) et \(Z_2=1/(Cp)\) :

\[\mathbf{H_1(p)=\frac{1}{1+RCp}}\]

Deux cellules en cascade ne donnent pas simplement \(H_1^2\) si la seconde charge la premiere. Il faut multiplier les matrices chaine puis prendre \(H=1/A_{tot}\) a vide.
:::

:::circuitjs label="CircuitJS" title="Filtre RC" iframeTitle="Simulation CircuitJS d'une cellule RC" src="https://www.falstad.com/afilter/circuitjs.html?hideMenu=true&startCircuit=filt-lopass.txt"
:::
:::

:::exercise label="Quadripoles" title="RLC passif non charge"
:::block type="method" title="Correction"
Le reseau se traite naturellement avec \(Z_1=R+Lp\) en serie et \(Y_2=Cp\) en derivation. La matrice impedance du T symetrique s'obtient en ecrivant les tensions de port par loi des mailles :

\[\mathbf{Z=\begin{bmatrix}Z_1+Z_2&Z_2\\Z_2&Z_1+Z_2\end{bmatrix}}\]

Si la sortie n'est pas chargee, \(i_2=0\). La fonction de transfert est alors le diviseur forme par l'impedance serie et l'impedance shunt :

\[\mathbf{T(p)=\frac{1/(Cp)}{R+Lp+1/(Cp)}=\frac{1}{LCp^2+RCp+1}}\]

En posant \(\omega_0=1/\sqrt{LC}\) et \(u=\omega/\omega_0\), on lit un passe-bas du second ordre :

\[\mathbf{T(j\omega)=\frac{1}{1-u^2+jRC\omega}}\]
:::
:::

:::exercise label="Filtres" title="Diagrammes de Bode et identification"
:::block type="method" title="Methode"
1. Factoriser la fonction sous forme \(K\prod(1+p/\omega_z)/\prod(1+p/\omega_p)\).
2. Classer chaque terme : zero = +20 dB/dec et +90 deg, pole = -20 dB/dec et -90 deg.
3. Repeter les ruptures dans l'ordre croissant de pulsation.
4. Verifier le type du filtre par les limites \(H(0)\) et \(H(\infty)\).

Un second ordre du type \(\omega_0^2/(p^2+2m\omega_0p+\omega_0^2)\) est passe-bas. Si le numerateur est \(p^2\), il est passe-haut ; s'il est proportionnel a \(p\), il est passe-bande.
:::

:::circuitjs label="CircuitJS" title="Passe-haut RC" iframeTitle="Simulation CircuitJS d'un filtre passe-haut RC" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=filt-hipass.txt"
:::
:::

:::exercise label="Filtres" title="Filtre passif theorique puis reel"
:::block type="method" title="Correction guidee"
Le filtre theorique avec \(L\) et \(C_2\) realise un filtre du second ordre. L'ordre vient du nombre de composants reactifs independants. La nature se lit par les limites : si la sortie est prise sur le condensateur, \(H(0)=1\) et \(H(\infty)=0\), donc passe-bas.

La forme canonique est :

\[\mathbf{H_1(p)=\frac{1}{LC_2p^2+1}}\]

Dans le montage reel, la bobine ajoute une resistance serie \(R\) et une capacite parasite \(C_1\). Le denominateur gagne un terme d'amortissement et un pole/zero parasite. Le Bode reel conserve l'allure du passe-bas autour de \(f_0\), mais la resonance est amortie et la tres haute frequence n'est plus celle du modele ideal.
:::
:::

:::exercise label="Filtres actifs" title="Correcteur d'avance de phase"
:::block type="method" title="Correction"
Le montage se ramene a une fonction du premier ordre avec un zero avant un pole :

\[\mathbf{H(p)=\frac{1+p/\omega_1}{1+p/\omega_2}},\qquad \omega_2=10\omega_1\]

Le gain vaut \(|H|=\sqrt{(1+(\omega/\omega_1)^2)/(1+(\omega/\omega_2)^2)}\) et la phase :

\[\mathbf{\varphi(\omega)=\arctan(\omega/\omega_1)-\arctan(\omega/\omega_2)}\]

Le maximum de phase est atteint pour \(\omega_m=\sqrt{\omega_1\omega_2}\). Pour \(\omega_2=10\omega_1\), \(\omega_m=\sqrt{10}\omega_1\).
:::

:::circuitjs label="CircuitJS" title="AOP" iframeTitle="Simulation CircuitJS d'un montage a amplificateur operationnel" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=opamp.txt"
:::
:::

:::exercise label="Filtres actifs" title="Sallen-Key passe-bas du second ordre"
:::block type="method" title="Correction"
La structure Sallen-Key se met sous la forme :

\[\mathbf{T(p)=\frac{K\omega_0^2}{p^2+2m\omega_0p+\omega_0^2}}\]

Avec \(R_1=R_2=R\), la pulsation propre est principalement fixee par \(\omega_0=1/(R\sqrt{C_1C_2})\). La surtension existe si \(m<1/\sqrt{2}\). Le cas Butterworth correspond a \(m=1/\sqrt{2}\), donc pas de surtension et coupure a \(\omega_0\).

Pour une ondulation de Chebyshev de 1 dB, \(m\) est plus faible que Butterworth : la transition devient plus raide mais le module depasse le gain statique dans la bande passante.
:::
:::

:::exercise label="Puissance" title="Effet Miller"
:::block type="method" title="Correction"
Pour une capacite \(C\) entre entree \(v_1\) et sortie \(v_2=Av_1\), le courant d'entree vaut \(i=Cp(v_1-v_2)=Cp(1-A)v_1\). La capacite equivalente d'entree est donc :

\[\mathbf{C_{in}=C(1-A)}\]

Cote sortie, l'equivalent s'ecrit en divisant le meme courant par \(v_2\) :

\[\mathbf{C_{out}=C\left(1-\frac{1}{A}\right)}\]

Si le gain de l'amplificateur est inverseur et note \(-A\), alors \(C_{in}=C(1+A)\). Exemple : avec \(A=20\) et \(C=1\,nF\), on obtient \(C_{in}=21\,nF\) et \(C_{out}=1{,}05\,nF\).
:::
:::

:::exercise label="Puissance" title="Amplificateur classe B / AB"
:::block type="method" title="Correction"
Pour une puissance moyenne \(P_L\) dans \(R_L\), les grandeurs sinusoidales utiles sont :

\[\mathbf{V_{s,eff}=\sqrt{P_LR_L}},\qquad \mathbf{V_{s,crete}=\sqrt{2P_LR_L}},\qquad \mathbf{I_{s,crete}=V_{s,crete}/R_L}\]

En classe B ideale, chaque transistor conduit une demi-periode. La puissance fournie par les alimentations vaut approximativement :

\[\mathbf{P_{alim}=\frac{2V_{cc}V_{s,crete}}{\pi R_L}}\]

Le rendement est donc \(\eta=P_L/P_{alim}\), avec une limite theorique \(\pi/4\) lorsque \(V_{s,crete}\) approche \(V_{cc}\). Les diodes de la classe AB prepolarisent les bases pour reduire la distorsion de croisement.
:::

:::circuitjs label="CircuitJS" title="Push-pull" iframeTitle="Simulation CircuitJS d'un amplificateur push-pull" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=pushpull.txt"
:::
:::

:::exercise label="Oscillateurs" title="Colpitts et critere de Barkhausen"
:::block type="method" title="Correction"
Le Colpitts se decompose en une chaine directe amplificatrice et un reseau de retour selectif \(LC\). Les deux condensateurs en serie donnent une capacite equivalente :

\[\mathbf{C_{eq}=\frac{C_1C_2}{C_1+C_2}}\]

La pulsation d'oscillation ideale est :

\[\mathbf{\omega_0=\frac{1}{\sqrt{LC_{eq}}}},\qquad \mathbf{f_0=\frac{1}{2\pi\sqrt{LC_{eq}}}}\]

Avec \(L=1\,mH\), \(C_1=C_2=1\,nF\), on a \(C_{eq}=0{,}5\,nF\), donc \(f_0\approx225\,kHz\), coherent avec l'ordre de grandeur annonce dans le TD.

La condition de demarrage est \(|A(j\omega_0)B(j\omega_0)|>1\), puis l'amplitude se stabilise lorsque les non-linearites ramene le gain de boucle a 1.
:::

:::circuitjs label="CircuitJS" title="Colpitts" iframeTitle="Simulation CircuitJS d'un oscillateur Colpitts" src="https://www.falstad.com/circuit/circuitjs.html?hideMenu=true&startCircuit=colpitts.txt"
:::
:::

:::exercise label="Oscillateurs" title="Oscillateur RLC"
:::block type="method" title="Correction"
On isole la chaine directe \(A(p)\) de l'amplificateur et la chaine de retour \(B(p)\) du reseau RLC. En boucle fermee, le denominateur est \(1-A(p)B(p)\) selon le signe de retour.

Pour une oscillation sinusoidale, Barkhausen impose :

\[\mathbf{|A(j\omega_0)B(j\omega_0)|=1},\qquad \mathbf{\arg(A(j\omega_0)B(j\omega_0))=0\ [2\pi]}\]

Le reseau RLC impose la frequence \(\omega_0=1/\sqrt{LC}\). La resistance \(\rho\) regle les pertes : au demarrage, elle doit rendre le gain de boucle legerement superieur a 1.
:::
:::

:::exercise label="Convertisseurs" title="CNA R2R et pesees successives"
:::block type="method" title="Correction"
Dans un reseau R2R ideal attaque par un AOP inverseur, chaque bit apporte un poids binaire. Pour 4 bits \(a_3a_2a_1a_0\), la sortie s'ecrit :

\[\mathbf{V_s=-V_{ref}\left(\frac{a_3}{2}+\frac{a_2}{4}+\frac{a_1}{8}+\frac{a_0}{16}\right)}\]

Le LSB vaut \(V_{ref}/16\) pour 4 bits. Avec \(V_{ref}=10V\), le pas vaut \(0{,}625V\). Le temps d'etablissement minimal lie au slew rate se calcule par \(t=\Delta V/SR\).

Pour le convertisseur a pesees successives, le registre teste successivement MSB puis bits de poids plus faible : le bit reste a 1 si la tension CNA ne depasse pas la tension analogique a convertir.
:::

:::block type="method" title="Schema CircuitJS"
Le poly demande surtout le calcul des poids binaires. Pour refaire le schema dans CircuitJS, partir d'un circuit vierge, placer quatre interrupteurs logiques, puis construire l'echelle avec les resistances \(R\) et \(2R\).

Ouvrir CircuitJS

:::circuitjs label="CircuitJS" title="Circuit vierge" iframeTitle="CircuitJS pour construire le R2R" src="https://www.falstad.com/circuit/circuitjs.html"
:::
:::
:::

:::exercise label="DS 2014" title="Quadripoles en parallele"
:::block type="method" title="Correction issue du poly"
Deux quadripoles en parallele s'additionnent en matrice admittance :

\[\mathbf{Y_{eq}=Y_A+Y_B}\]

Pour une cellule en T symetrique :

\[\mathbf{Z=\begin{bmatrix}z_1+z_2&z_2\\z_2&z_1+z_2\end{bmatrix}}\]

et donc :

\[\mathbf{Y=\frac{1}{z_1(z_1+2z_2)}\begin{bmatrix}z_1+z_2&-z_2\\-z_2&z_1+z_2\end{bmatrix}}\]

La structure complete etant non chargee, \(i_2=0\), d'ou :

\[\mathbf{T(p)=\frac{v_2}{v_1}=-\frac{y_{eq21}}{y_{eq22}}=-\frac{1+(RCp)^2}{1+4RCp+(RCp)^2}}\]
:::
:::

:::exercise label="DS 2014" title="Filtre a AOP"
:::block type="method" title="Correction issue du poly"
A basse frequence, les capacites sont ouvertes et le montage est inverseur :

\[\mathbf{H_0=-\frac{R_3+R_4}{R_1+R_2}}\]

A haute frequence, les capacites sont assimilables a des courts-circuits :

\[\mathbf{H_\infty=-\frac{R_3}{R_1}}\]

La fonction de transfert complete se factorise :

\[\mathbf{H=H_0\frac{1+R_2C_1p}{1+\frac{R_1R_2}{R_1+R_2}C_1p}\frac{1+\frac{R_3R_4}{R_3+R_4}C_2p}{1+R_4C_2p}}\]

On identifie alors deux zeros et deux poles, ce qui permet de tracer directement le Bode asymptotique.
:::
:::
