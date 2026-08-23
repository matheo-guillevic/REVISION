---
title: "TD 2 corrige - Filtres"
subject: "EP361-electonique"
type: "td"
target: "EP361-electonique-td2.html"
eyebrow: "EP361 - TD 2"
heading: "Filtres"
summary: "Corrections guidees et simulations CircuitJS pour les exercices d electronique."
pdfHref: "pdf/EP361-electonique/td/EP361_Poly_TD.pdf"
---
:::section id="ep361-electonique-td2" eyebrow="TD 2" title="Filtres" summary="Corrections guidees et simulations CircuitJS pour cette partie du TD."

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

:::
