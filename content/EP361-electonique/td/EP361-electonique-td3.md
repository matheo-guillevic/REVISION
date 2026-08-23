---
title: "TD 3 corrige - Filtres actifs"
subject: "EP361-electonique"
type: "td"
target: "EP361-electonique-td3.html"
eyebrow: "EP361 - TD 3"
heading: "Filtres actifs"
summary: "Corrections guidees et simulations CircuitJS pour les exercices d electronique."
pdfHref: "pdf/EP361-electonique/td/EP361_Poly_TD.pdf"
---
:::section id="ep361-electonique-td3" eyebrow="TD 3" title="Filtres actifs" summary="Corrections guidees et simulations CircuitJS pour cette partie du TD."

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

:::
