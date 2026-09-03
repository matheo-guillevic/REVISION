---
title: "TD 7 corrige - DS 2014"
subject: "EP361-electonique"
type: "td"
target: "EP361-electonique-td7.html"
eyebrow: "EP361 - TD 7"
heading: "DS 2014"
summary: "Corrections guidees et simulations CircuitJS pour les exercices d electronique."
---
:::section id="ep361-electonique-td7" eyebrow="TD 7" title="DS 2014" summary="Corrections guidees et simulations CircuitJS pour cette partie du TD."

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

:::
