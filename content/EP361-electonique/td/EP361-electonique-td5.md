---
title: "TD 5 corrige - Oscillateurs"
subject: "EP361-electonique"
type: "td"
target: "EP361-electonique-td5.html"
eyebrow: "EP361 - TD 5"
heading: "Oscillateurs"
summary: "Corrections guidees et simulations CircuitJS pour les exercices d electronique."
pdfHref: "pdf/EP361-electonique/td/EP361_Poly_TD.pdf"
---
:::section id="ep361-electonique-td5" eyebrow="TD 5" title="Oscillateurs" summary="Corrections guidees et simulations CircuitJS pour cette partie du TD."

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

:::
