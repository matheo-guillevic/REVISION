---
title: "TD 4 corrige - Puissance"
subject: "EP361-electonique"
type: "td"
target: "EP361-electonique-td4.html"
eyebrow: "EP361 - TD 4"
heading: "Puissance"
summary: "Corrections guidees et simulations CircuitJS pour les exercices d electronique."
pdfHref: "pdf/EP361-electonique/td/EP361_Poly_TD.pdf"
---
:::section id="ep361-electonique-td4" eyebrow="TD 4" title="Puissance" summary="Corrections guidees et simulations CircuitJS pour cette partie du TD."

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

:::
