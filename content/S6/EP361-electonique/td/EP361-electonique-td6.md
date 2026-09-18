---
title: "TD 6 corrige - Convertisseurs"
subject: "EP361-electonique"
type: "td"
target: "EP361-electonique-td6.html"
eyebrow: "EP361 - TD 6"
heading: "Convertisseurs"
summary: "Corrections guidees et simulations CircuitJS pour les exercices d electronique."
---
:::section id="ep361-electonique-td6" eyebrow="TD 6" title="Convertisseurs" summary="Corrections guidees et simulations CircuitJS pour cette partie du TD."

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

:::
