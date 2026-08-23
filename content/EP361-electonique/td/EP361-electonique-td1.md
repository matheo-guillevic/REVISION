---
title: "TD 1 corrige - Quadripoles"
subject: "EP361-electonique"
type: "td"
target: "EP361-electonique-td1.html"
eyebrow: "EP361 - TD 1"
heading: "Quadripoles"
summary: "Corrections guidees et simulations CircuitJS pour les exercices d electronique."
pdfHref: "pdf/EP361-electonique/td/EP361_Poly_TD.pdf"
---
:::section id="ep361-electonique-td1" eyebrow="TD 1" title="Quadripoles" summary="Corrections guidees et simulations CircuitJS pour cette partie du TD."

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

:::
