---
title: "EP425 - TD corrigé : capteurs et instrumentation"
subject: EP425-Capteur
type: td
target: EP425-Capteur-td1.html
eyebrow: "EP425 / EE-470 / EE-479"
heading: "TD corrigé — Capteurs et instrumentation"
summary: "Treize exercices corrigés : étalonnage, température, incertitudes, ponts de jauges, capteurs optiques et conditionnement."
description: "Énoncés et corrections détaillées des travaux dirigés de capteurs et instrumentation."
tags: [capteurs, instrumentation, etalonnage, temperature, pont-wheatstone, incertitudes]
---

:::quicklinks
- [1. Étalonnage et FSO](#ep425-td-etalonnage)
- [2. Pt100 et résolution](#ep425-td-pt100)
- [3. Propagation d'erreur](#ep425-td-incertitudes)
- [4. Linéarisation en pression](#ep425-td-pression)
- [5. Perturbation magnétique](#ep425-td-induction)
- [6. Thermocouple industriel](#ep425-td-four)
- [7. Jauges et dérive thermique](#ep425-td-jauges)
- [8. Compensation de soudure froide](#ep425-td-soudure-froide)
- [9. Sonde nickel](#ep425-td-nickel)
- [10. Bolomètre CTN](#ep425-td-bolometre)
- [11. Gyromètre Sagnac](#ep425-td-sagnac)
- [12. Capteur capacitif](#ep425-td-capacitif)
- [13. Linéarisation générale](#ep425-td-linearisation)
:::

:::block type="neutral" title="Utilisation du corrigé"
Chaque exercice présente d'abord l'énoncé, puis une correction structurée. Refaire les calculs avant d'ouvrir la correction permet de vérifier la méthode, les unités et les hypothèses de modélisation.
:::

---

:::exercise id="ep425-td-etalonnage" label="Exercice 1"
### Problème 1 : Problème d'étalonnage

**Énoncé :**
Un technicien est chargé d'étalonner un capteur de position magnétique dont la réponse est présumée linéaire. Pour cela, il procède à un étalonnage indirect à l'aide d'un second capteur de déplacement, optique celui-ci. La plage de mesure s'étend de $0$ à $1\text{ mm}$.
- La première mesure donne : $1{,}1 \pm 0{,}1\text{ V}$ en sortie du capteur magnétique, pour une position optique de $90 \pm 20\text{ }\mu\text{m}$.
- La seconde mesure donne : $9{,}6 \pm 0{,}1\text{ V}$ en sortie du capteur magnétique, pour une position optique de $940 \pm 20\text{ }\mu\text{m}$.

**Questions :**
1. Quelle est la courbe de réponse du capteur magnétique et sa sensibilité ?
2. Tracez le graphique de cette courbe de réponse avec les points d'étalonnage et leurs incertitudes.
3. En supposant que les seules erreurs existantes soient celles commises lors de l'étalonnage, déterminez le gabarit de la courbe de réponse.
4. Quelle est l'erreur du capteur que vous devez spécifier au client (en valeur absolue de la position) ?
5. Imaginons maintenant qu'une erreur de non-linéarité de $2\%$ de l'étendue de mesure (FS) existe en plus de l'erreur de calibration. Que devient l'erreur globale du capteur ?

---

:::solution
**Correction détaillée :**

1. **Courbe de réponse et sensibilité :**
   Le capteur est présumé linéaire, sa courbe de réponse s'écrit sous la forme $V(x) = S \cdot x + V_0$.
   - Variation de tension : $\Delta V = V_2 - V_1 = 9{,}6\text{ V} - 1{,}1\text{ V} = 8{,}5\text{ V}$.
   - Variation de position : $\Delta x = x_2 - x_1 = 940\text{ }\mu\text{m} - 90\text{ }\mu\text{m} = 850\text{ }\mu\text{m} = 0{,}85\text{ mm}$.
   - **Sensibilité $S$ :**
     $$S = \frac{\Delta V}{\Delta x} = \frac{8{,}5\text{ V}}{0{,}85\text{ mm}} = 10\text{ V/mm} = 0{,}01\text{ V/}\mu\text{m}$$
   - **Ordonnée à l'origine $V_0$ :**
     $$V_0 = V_1 - S \cdot x_1 = 1{,}1\text{ V} - (10\text{ V/mm} \times 0{,}090\text{ mm}) = 1{,}1 - 0{,}9 = 0{,}2\text{ V}$$
   - **Équation de réponse :** $V(x) = 10 \cdot x + 0{,}2$ (avec $x$ en $\text{mm}$ et $V$ en $\text{V}$).

2. **Représentation graphique :**
   Les points $P_1(0{,}090\text{ mm}, 1{,}1\text{ V})$ et $P_2(0{,}940\text{ mm}, 9{,}6\text{ V})$ sont entourés de rectangles d'incertitude de largeur $\pm 20\text{ }\mu\text{m}$ (soit $\pm 0{,}020\text{ mm}$) et de hauteur $\pm 0{,}1\text{ V}$.

3. **Gabarit et propagation d'erreur :**
   En ramenant l'incertitude sur la tension $\Delta V_{mes} = 0{,}1\text{ V}$ en une équivalence de position :
   $$\Delta x_{V} = \frac{\Delta V_{mes}}{S} = \frac{0{,}1\text{ V}}{10\text{ V/mm}} = 0{,}010\text{ mm} = 10\text{ }\mu\text{m}$$

4. **Spécification de l'erreur absolue :**
   L'incertitude maximale combinée sur la position $x$ s'obtient par la somme des incertitudes de mesure et de tension :
   $$\Delta x_{total} = \Delta x_{optique} + \Delta x_{V} = 20\text{ }\mu\text{m} + 10\text{ }\mu\text{m} = 30\text{ }\mu\text{m} \quad (0{,}030\text{ mm})$$
   L'erreur absolue à spécifier au client est donc de **$\pm 30\text{ }\mu\text{m}$** (soit $3\%$ de l'étendue de mesure de $1\text{ mm}$).

5. **Prise en compte de la non-linéarité :**
   - Erreur de non-linéarité : $2\% \text{ de FS} = 0{,}02 \times 1\text{ mm} = 0{,}020\text{ mm} = 20\text{ }\mu\text{m}$.
   - **Erreur totale maximale (pire des cas) :**
     $$\Delta x_{max} = 30\text{ }\mu\text{m} + 20\text{ }\mu\text{m} = 50\text{ }\mu\text{m} \quad (0{,}050\text{ mm})$$
   - *Alternative statistique (quadratique) :* $\Delta x_{quad} = \sqrt{30^2 + 20^2} \approx 36{,}05\text{ }\mu\text{m}$.

:::plotly id="ep425-td-etalonnage-courbe" label="Courbe d'étalonnage" title="Position et tension avec incertitudes" height="410" caption="Les barres horizontales représentent ± 20 µm et les barres verticales ± 0,1 V. La droite d'étalonnage est V(x) = 10x + 0,2, avec x en mm."
{
  "data": [
    { "type": "scatter", "mode": "lines", "x": [0, 1], "y": [0.2, 10.2], "name": "Modèle linéaire", "line": { "color": "#0077b6", "width": 3 } },
    { "type": "scatter", "mode": "markers", "x": [0.09, 0.94], "y": [1.1, 9.6], "name": "Points d'étalonnage", "marker": { "color": "#e76f51", "size": 10 }, "error_x": { "type": "data", "array": [0.02, 0.02], "visible": true }, "error_y": { "type": "data", "array": [0.1, 0.1], "visible": true } }
  ],
  "layout": { "margin": { "t": 42, "r": 32, "b": 65, "l": 74 }, "xaxis": { "title": "Position x (mm)", "range": [-0.05, 1.05] }, "yaxis": { "title": "Tension V (V)", "range": [0, 10.8] } }
}
:::
:::
:::

---

:::exercise id="ep425-td-pt100" label="Exercice 2"
### Problème 2 : Résistance de platine – Mesure thermométrique

**Énoncé :**
On souhaite asservir en température un objet dans la plage de $20$ à $25^\circ\text{C}$. On mesure sa température via une résistance de platine Pt100 dont la loi de réponse est :
$$R(T) = 100 \cdot (1 + 3{,}985 \cdot 10^{-3} \cdot T) \quad \text{avec } T \text{ en } ^\circ\text{C}$$
Le capteur est alimenté par une source de courant constant $I = 1\text{ mA}$. La tension est lue par un voltmètre de $5\frac{1}{2}$ digits ($200\text{ }000$ points, pleine échelle $199\text{ }999$).

**Partie 1 : Résolution**
1. Établir la relation entre la tension $V(T)$ lue aux bornes du voltmètre et la température $T$.
2. Quelle est la meilleure résolution en température atteignable par la chaîne de mesure sur le calibre $200\text{ mV}$ ?
3. Quel est l'intervalle de résistance correspondant à la plage $[20^\circ\text{C}, 25^\circ\text{C}]$ ?
4. Quelle fraction de la mesure totale cet intervalle représente-t-il ?

**Partie 2 : Opposition (Offset)**
Pour exploiter au mieux la dynamique du numériseur, on souhaite soustraire la tension de décalage à $20^\circ\text{C}$.

---

:::solution
**Correction détaillée :**

**Partie 1 :**
1. **Tension aux bornes de la Pt100 :**
   $$V(T) = R(T) \cdot I = I \cdot R_0 (1 + a T) = 1\text{ mA} \times 100\,\Omega \cdot (1 + 3{,}985 \cdot 10^{-3} T)$$
   $$V(T) = 100\text{ mV} + 0{,}3985 \cdot T\text{ (mV)} = 0{,}1\text{ V} + 3{,}985 \cdot 10^{-4} T\text{ (V)}$$

2. **Sensibilité et résolution minimale :**
   - Sensibilité du capteur en tension : $S = \frac{dV}{dT} = I \cdot R_0 \cdot a = 0{,}3985\text{ mV/}^\circ\text{C} = 398{,}5\text{ }\mu\text{V/}^\circ\text{C}$.
   - Sur le calibre $200\text{ mV}$, la résolution du voltmètre de $200\text{ }000$ points est de :
     $$1\text{ LSB} = \frac{200\text{ mV}}{200\text{ }000} = 1\text{ }\mu\text{V}$$
   - **Résolution en température :**
     $$\delta T = \frac{1\text{ }\mu\text{V}}{398{,}5\text{ }\mu\text{V/}^\circ\text{C}} \approx 0{,}00251^\circ\text{C} \approx 2{,}5\text{ mK}$$

3. **Intervalle de résistance $[20^\circ\text{C}, 25^\circ\text{C}]$ :**
   - $R(20^\circ\text{C}) = 100 \times (1 + 3{,}985 \cdot 10^{-3} \times 20) = 107{,}97\,\Omega$.
   - $R(25^\circ\text{C}) = 100 \times (1 + 3{,}985 \cdot 10^{-3} \times 25) = 109{,}96\,\Omega$.
   - $\Delta R = 109{,}96 - 107{,}97 = 1{,}99\,\Omega \approx 2\,\Omega$.

4. **Fraction de la mesure totale :**
   $$\frac{\Delta R}{R(20^\circ\text{C})} = \frac{1{,}99\,\Omega}{107{,}97\,\Omega} \approx 1{,}84\%$$
   La variation utile ne représente que $1{,}84\%$ du signal total, d'où l'intérêt de soustraire la composante continue à $20^\circ\text{C}$ (montage en opposition ou pont) pour amplifier uniquement le signal utile.
:::
:::

---

:::exercise id="ep425-td-incertitudes" label="Exercice 3"
### Problème 3 : Propagation d'erreur

**Énoncé :**
On mesure la valeur de la pesanteur terrestre $g$ à l'aide d'un pendule pesant de longueur $L$ et de période $T$ liées par :
$$T = 2\pi \sqrt{\frac{L}{g}} \implies g = 4\pi^2 \frac{L}{T^2}$$
Les grandeurs mesurées sont affectées d'incertitudes relatives :
- Erreur relative sur la période $T$ : $\pm 2\%$
- Erreur relative sur la longueur $L$ : $\pm 3\%$
On prend comme valeur mesurée $g = 9{,}8\text{ m/s}^2$.

**Questions :**
1. Calculer l'erreur sur $g$ en valeur relative et en valeur absolue (dans le pire des cas et de manière statistique).
2. Quelle est la grandeur physique dont l'incertitude doit être minimisée en priorité ?

---

:::solution
**Correction détaillée :**

1. **Calcul des incertitudes sur $g$ :**
   Passons par la différentielle logarithmique de $g(L, T) = 4\pi^2 L T^{-2}$ :
   $$\ln g = \ln(4\pi^2) + \ln L - 2 \ln T$$
   $$\frac{dg}{g} = \frac{dL}{L} - 2 \frac{dT}{T}$$

   - **Approche Pire des cas (Incertitude maximale) :**
     $$\left|\frac{\Delta g}{g}\right|_{max} = \left|\frac{\Delta L}{L}\right| + 2 \left|\frac{\Delta T}{T}\right| = 3\% + 2 \times 2\% = 7\%$$
     En valeur absolue :
     $$\Delta g_{max} = 0{,}07 \times 9{,}8\text{ m/s}^2 = 0{,}686\text{ m/s}^2$$

   - **Approche Statistique (Loi de propagation quadratique) :**
     $$\frac{\sigma_g}{g} = \sqrt{\left(\frac{\sigma_L}{L}\right)^2 + 4 \left(\frac{\sigma_T}{T}\right)^2} = \sqrt{(0{,}03)^2 + 4 \times (0{,}02)^2} = \sqrt{0{,}0009 + 0{,}0016} = \sqrt{0{,}0025} = 5\%$$
     En valeur absolue :
     $$\sigma_g = 0{,}05 \times 9{,}8\text{ m/s}^2 = 0{,}49\text{ m/s}^2$$

2. **Grandeur prioritaire à minimiser :**
   C's est la mesure du **temps (la période $T$)** qu'il faut améliorer en priorité. Comme $T$ intervient avec une puissance $-2$, son erreur relative est multipliée par un facteur $2$ dans la propagation d'erreur.
:::
:::

---

:::exercise id="ep425-td-pression" label="Exercice 4"
### Problème 4 : Linéarisation d'un capteur de pression

**Énoncé :**
Un capteur de pression possède une courbe de réponse non linéaire :
$$V(P) = a P^2 + b P + c$$
avec $a = 0{,}0125\text{ V/bar}^2$, $b = -0{,}05\text{ V/bar}$ et $c = -0{,}75\text{ V}$. $P$ s'exprime en $\text{bar}$. L'étendue de mesure est $10\text{ bar} < P < 20\text{ bar}$.

**Questions :**
1. Pour une application cherchant une excellente précision autour de $15\text{ bar}$ sur une petite plage, déterminer la courbe de réponse linéarisée $V_{lin}(P)$.
2. Quelle est l'erreur commise à $P = 16\text{ bar}$ avec cette approximation ?

---

:::solution
**Correction détaillée :**

1. **Linéarisation au point $P_0 = 15\text{ bar}$ (Développement de Taylor au 1er ordre) :**
   - Valeur exacte du signal à $15\text{ bar}$ :
     $$V(15) = 0{,}0125 \times (15)^2 - 0{,}05 \times 15 - 0{,}75 = 2{,}8125 - 0{,}75 - 0{,}75 = 1{,}3125\text{ V}$$
   - Pente / Sensibilité à $15\text{ bar}$ :
     $$S = \left.\frac{dV}{dP}\right|_{P=15} = 2 a P_0 + b = 2 \times 0{,}0125 \times 15 - 0{,}05 = 0{,}375 - 0{,}05 = 0{,}325\text{ V/bar}$$
   - **Équation de la droite tangente :**
     $$V_{lin}(P) = V(P_0) + S \cdot (P - P_0) = 1{,}3125 + 0{,}325 \cdot (P - 15) = 0{,}325 \cdot P - 3{,}5625\text{ V}$$

2. **Calcul de l'erreur à $P = 16\text{ bar}$ :**
   - Tension réelle théorique :
     $$V(16) = 0{,}0125 \times (16)^2 - 0{,}05 \times 16 - 0{,}75 = 3{,}20 - 0{,}80 - 0{,}75 = 1{,}65\text{ V}$$
   - Tension estimée par le modèle linéaire :
     $$V_{lin}(16) = 1{,}3125 + 0{,}325 \times (16 - 15) = 1{,}6375\text{ V}$$
   - **Erreur commise en tension :**
     $$\Delta V = V(16) - V_{lin}(16) = 1{,}65\text{ V} - 1{,}6375\text{ V} = 0{,}0125\text{ V} = 12{,}5\text{ mV}$$
   - **Erreur équivalente en pression :**
     $$\Delta P = \frac{\Delta V}{S} = \frac{0{,}0125\text{ V}}{0{,}325\text{ V/bar}} \approx 0{,}0385\text{ bar}$$

:::plotly id="ep425-td-pression-courbe" label="Linéarisation locale" title="Courbe quadratique et tangente à 15 bar" height="410" caption="La droite tangente est très proche de la courbe autour de 15 bar. À 16 bar, l'écart vertical vaut 12,5 mV."
{
  "series": [
    { "generator": "function", "range": [10, 20], "points": 180, "y": "0.0125*x*x-0.05*x-0.75", "name": "Réponse exacte V(P)", "line": { "color": "#0077b6", "width": 3 } },
    { "generator": "function", "range": [10, 20], "points": 180, "y": "0.325*x-3.5625", "name": "Tangente Vlin(P)", "line": { "color": "#e76f51", "width": 2, "dash": "dash" } },
    { "type": "scatter", "mode": "markers", "x": [15, 16], "y": [1.3125, 1.65], "name": "Points exacts", "marker": { "color": "#23845a", "size": 9 } }
  ],
  "layout": { "margin": { "t": 42, "r": 32, "b": 65, "l": 74 }, "xaxis": { "title": "Pression P (bar)" }, "yaxis": { "title": "Tension V (V)" }, "shapes": [{ "type": "line", "x0": 16, "x1": 16, "y0": 1.6375, "y1": 1.65, "line": { "color": "#495057", "dash": "dot" } }] }
}
:::
:::
:::

---

:::exercise id="ep425-td-induction" label="Exercice 5"
### Problème 5 : Couplage magnétique et tension parasite induite

**Énoncé :**
Un câble de longueur $L = 1\text{ m}$ relie un capteur passif à son électronique. La distance entre les deux conducteurs du câble est $d = 1\text{ mm}$. Un champ magnétique sinusoidal uniforme $B(t) = B_0 \sin(\omega t)$ est présent dans la région du câble avec $B_0 = 0{,}01\text{ T}$ et $f = 50\text{ Hz}$.

**Question :**
Quelle est la valeur maximale de la tension induite par le champ magnétique perturbateur ?

---

:::solution
**Correction détaillée :**

1. **Calcul de la surface de la boucle d'induction $A$ :**
   $$A = L \times d = 1\text{ m} \times 10^{-3}\text{ m} = 10^{-3}\text{ m}^2$$

2. **Loi de Faraday (Loi de l'induction électromagnétique) :**
   Le flux d'induction magnétique à travers la boucle est :
   $$\Phi(t) = B(t) \cdot A = B_0 A \sin(2\pi f t)$$
   La force électromotrice (tension induite) aux bornes du câble s'exprime par :
   $$e(t) = -\frac{d\Phi}{dt} = -B_0 A (2\pi f) \cos(2\pi f t)$$

3. **Valeur maximale de la tension induite $E_{max}$ :**
   $$E_{max} = B_0 \cdot A \cdot 2\pi f = 0{,}01\text{ T} \times 10^{-3}\text{ m}^2 \times (2\pi \times 50\text{ s}^{-1})$$
   $$E_{max} = 10^{-5} \times 100\pi = \pi \cdot 10^{-3}\text{ V} \approx 3{,}14\text{ mV}$$

   *Remarque :* Pour se prémunir contre ce bruit induit, la solution préconisée est l'utilisation de **paires torsadées** afin de réduire considérablement la surface effective $A$.
:::
:::

---

:::exercise id="ep425-td-four" label="Exercice 6"
### Problème 6 : Capteur industriel de température pour four de fonderie

**Énoncé :**
Choix et dimensionnement d'un capteur de température pour un four de diffusion dont la gamme s'étend de $400^\circ\text{C}$ à $1050^\circ\text{C}$, la régulation devant débuter dès $200^\circ\text{C}$.

---

:::solution
**Correction détaillée (d'après les sources de correction) :**

1. **Choix du capteur et du transmetteur :**
   - Gamme de température globale à couvrir : $200^\circ\text{C}$ à $1050^\circ\text{C}$.
   - **Capteur choisi :** Thermocouple de **Type K** (Chromel/Alumel), utilisable de $-200^\circ\text{C}$ à $+1100^\circ\text{C}$.
   - **Conditionneur associé :** Module transmetteur **SEM 104 K** (convertissant la mesure en boucle de courant $4-20\text{ mA}$).

2. **Plage de mesure et réglage de l'électronique :**
   - D'après la documentation du SEM 104 K, la plage réglée est de $100^\circ\text{C}$ à $1000^\circ\text{C}$ avec offset $+100^\circ\text{C}$ (permettant la couverture jusqu'à $1100^\circ\text{C}$).

3. **Boucle de courant $4-20\text{ mA}$ et sensibilité :**
   - $100^\circ\text{C} \implies 4\text{ mA}$, $1100^\circ\text{C} \implies 20\text{ mA}$.
   - Résistance de charge maximale sous $24\text{ V}$ d'alimentation :
     $$R_{max} = \frac{24\text{ V} - 10\text{ V}}{0{,}021\text{ A}} \approx 666{,}7\,\Omega$$
   - Sensibilité globale $S = \frac{20\text{ mA} - 4\text{ mA}}{1100^\circ\text{C} - 100^\circ\text{C}} \times R_{charge} \approx 10{,}7\text{ mV/}^\circ\text{C}$.

4. **Analyse de la dynamique thermique :**
   - Constante de temps thermique du capteur : pour un temps de réponse à $70\%$ de $2\text{ ms}$ :
     $$1 - e^{-t/\tau} = 0{,}7 \implies \tau = \frac{-2\text{ ms}}{\ln(0{,}3)} \approx 1{,}66\text{ ms}$$
   - Fréquence de coupure associée : $f_c = \frac{1}{2\pi \tau} \approx 96\text{ Hz}$.

5. **Précision globale de la chaîne de mesure :**
   L'erreur totale combinée (incluant l'erreur de soudure froide et la dérive de zéro) est évaluée à **$\approx 1{,}46^\circ\text{C}$**.
:::
:::

---

:::exercise id="ep425-td-jauges" label="Exercice 7"
### Problème 7 : Jauges de contrainte montées en pont push-pull et dérive thermique

**Énoncé :**
On utilise des jauges de contrainte pour suivre les déformations d'un objet soumis à des torsions. La résistance d'une jauge varie selon :
$$R = R_0 + \Delta R \quad \text{avec } \frac{\Delta R}{R_0} = K \epsilon$$
Le facteur de jauge $K$ et la résistance au repos $R_0$ dépendent de la température $T$ :
$$K(T) = K_0 (1 + \alpha_K T), \quad R_0(T) = R_1 (1 + \alpha_R T)$$
On donne : $\alpha_K = 1{,}2 \cdot 10^{-4}/^\circ\text{C}$, $\alpha_R = 2{,}0 \cdot 10^{-4}/^\circ\text{C}$, $K_0 = 2$, $R_1 = 100\,\Omega$, $V_s = 10\text{ V}$.

---

:::solution
**Correction détaillée :**

1. **Mesurande et grandeur perturbatrice :**
   - **Mesurande :** La déformation / allongement $\epsilon$ (ou contrainte $\sigma$).
   - **Grandeur perturbatrice :** La température $T$.

2. **Valeur de $R_1$ :**
   À $T = 0^\circ\text{C}$ et sans contrainte ($\epsilon = 0$), $R = R_0(0) = R_1 = 100\,\Omega$.

3. **Expression complète de $R(\epsilon, T)$ :**
   $$R(\epsilon, T) = R_1 (1 + \alpha_R T) \cdot [1 + K_0 (1 + \alpha_K T) \epsilon]$$
   En développant :
   $$R(\epsilon, T) = R_1 \left[ 1 + \alpha_R T + K_0 \epsilon + (\alpha_K + \alpha_R) K_0 \epsilon T + \alpha_R \alpha_K K_0 \epsilon T^2 \right]$$

4. **Sensibilité vis-à-vis de $\epsilon$ :**
   $$S_\epsilon = \frac{dR}{d\epsilon} = R_1 \cdot K_0 \left[ 1 + (\alpha_K + \alpha_R) T + \alpha_R \alpha_K T^2 \right]$$

5. **Sensibilité vis-à-vis de $T$ :**
   $$S_T = \frac{dR}{dT} = R_1 \left[ \alpha_R + (\alpha_K + \alpha_R) K_0 \epsilon + 2 \alpha_R \alpha_K K_0 \epsilon T \right]$$

6. **Applications numériques pour $S_\epsilon$ :**
   - À $T = 0^\circ\text{C}$ : $S_\epsilon(0^\circ\text{C}) = 100 \times 2 = 200\,\Omega$.
   - À $T = 50^\circ\text{C}$ :
     $$S_\epsilon(50^\circ\text{C}) = 100 \times 2 \left[ 1 + (1{,}2 + 2{,}0) \cdot 10^{-4} \times 50 + 1{,}2 \cdot 2{,}0 \cdot 10^{-8} \times 2500 \right] = 200{,}16\,\Omega$$

7. **Conclusion :**
   La variation de sensibilité entre $0^\circ\text{C}$ et $50^\circ\text{C}$ n'est que de $+0{,}08\%$. L'effet de la température sur le facteur de jauge est négligeable devant la variation utile. Le montage en **pont push-pull à 2 ou 4 jauges** permet de compenser totalement la dérive thermique de la résistance au repos.
:::
:::

---

:::exercise id="ep425-td-soudure-froide" label="Exercice 8"
### Problème 8 : Thermocouple avec compensation de soudure froide

**Énoncé :**
Compensation de la température ambiante de jonction froide $T_{amb}$ à l'aide d'une sonde PT100 et d'amplificateurs opérationnels. Gamme d'utilisation $0$ à $49{,}9^\circ\text{C}$.

---

:::solution
**Correction détaillée :**

1. **Linéarisation du thermocouple aux extrémités ($0$ à $49^\circ\text{C}$) :**
   - À $0^\circ\text{C}$ : $V = 0\text{ }\mu\text{V}$. À $49^\circ\text{C}$ : $V = 2984\text{ }\mu\text{V}$.
   - Sensibilité moyenne : $S_{TC} = \frac{2984\text{ }\mu\text{V}}{49^\circ\text{C}} = 60{,}9\text{ }\mu\text{V/}^\circ\text{C}$.

2. **Erreur de linéarité à $25^\circ\text{C}$ :**
   - Valeur réelle du tableau à $25^\circ\text{C}$ : $1495\text{ }\mu\text{V}$.
   - Valeur estimée : $60{,}9 \times 25 = 1522{,}5\text{ }\mu\text{V}$.
   - Écart $\Delta V = 27{,}5\text{ }\mu\text{V}$ (erreur de $1{,}8\%$ soit $\approx 0{,}4^\circ\text{C}$).

3. **Conditionnement de la tension de compensation $V_c$ :**
   Pour annuler l'effet de la température ambiante $T_{amb} = 20^\circ\text{C}$, la tension de compensation doit être :
   $$V_c = - S_{TC} \cdot T_{amb} = -60{,}9\text{ }\mu\text{V/}^\circ\text{C} \times 20^\circ\text{C} = -1{,}218\text{ mV}$$

4. **Dimensionnement du circuit d'amplification à PT100 :**
   En fixant $R_1 = 10\text{ k}\Omega$ et en utilisant la PT100 : $V_1 = -1{,}58\text{ V}$ et $V_2 = -15{,}6\text{ mV}$.
:::
:::

---

:::exercise id="ep425-td-nickel" label="Exercice 9"
### Problème 9 : Linéarisation d'une sonde de température en Nickel

**Énoncé :**
Une sonde de température en nickel a pour loi de résistance :
$$R_N(T) = R_0 (1 + a T + b T^2)$$
avec $R_0 = 50\,\Omega$, $a = 5{,}5 \cdot 10^{-3}/^\circ\text{C}$ et $b = 6{,}7 \cdot 10^{-6}/(^\circ\text{C})^2$.
On linéarise la réponse autour de $0^\circ\text{C}$ en plaçant une résistance fixe $R_1$ en parallèle avec la sonde.

**Questions :**
1. Déterminer la valeur optimale de $R_1$.
2. Calculer la sensibilité de la sonde seule à $25^\circ\text{C}$.
3. Calculer la sensibilité du capteur linéarisé à $25^\circ\text{C}$.

---

:::solution
**Correction détaillée :**

1. **Calcul de la résistance de linéarisation $R_1$ :**
   La résistance équivalente est $R_e(T) = \frac{R_1 R_N(T)}{R_1 + R_N(T)}$.
   La condition de point d'inflexion (linéarisation au 2nd ordre autour de $0^\circ\text{C}$) impose $\left.\frac{d^2 R_e}{dT^2}\right|_{T=0} = 0$.
   L'expression générale obtenue est :
   $$R_1 = \frac{2 \left(\left.\frac{dR_N}{dT}\right|_{T=0}\right)^2}{\left.\frac{d^2 R_N}{dT^2}\right|_{T=0}} - R_N(0)$$
   Calculons les dérivées à $0^\circ\text{C}$ :
   - $R_N(0) = R_0 = 50\,\Omega$.
   - $\left.\frac{dR_N}{dT}\right|_{T=0} = a R_0 = 5{,}5 \cdot 10^{-3} \times 50 = 0{,}275\,\Omega/^\circ\text{C}$.
   - $\left.\frac{d^2 R_N}{dT^2}\right|_{T=0} = 2 b R_0 = 2 \times 6{,}7 \cdot 10^{-6} \times 50 = 0{,}00067\,\Omega/(^\circ\text{C})^2$.

   Injectons ces valeurs :
   $$R_1 = \frac{2 \times (0{,}275)^2}{0{,}00067} - 50 = \frac{0{,}15125}{0{,}00067} - 50 = 225{,}7 - 50 = 175{,}7\,\Omega \approx 175\,\Omega$$

2. **Sensibilité de la sonde seule à $25^\circ\text{C}$ :**
   $$S_N(25^\circ\text{C}) = \left.\frac{dR_N}{dT}\right|_{25} = R_0 (a + 2 b \times 25)$$
   $$S_N(25^\circ\text{C}) = 50 \times (5{,}5 \cdot 10^{-3} + 2 \times 6{,}7 \cdot 10^{-6} \times 25) = 50 \times (0{,}0055 + 0{,}000335) = 0{,}2915\,\Omega/^\circ\text{C}$$

3. **Sensibilité du capteur linéarisé à $25^\circ\text{C}$ :**
   - $R_N(25^\circ\text{C}) = 50 \times (1 + 5{,}5 \cdot 10^{-3} \times 25 + 6{,}7 \cdot 10^{-6} \times 625) = 57{,}08\,\Omega$.
   - Sensibilité équivalente :
     $$S_e(25^\circ\text{C}) = \left(\frac{R_1}{R_1 + R_N(25)}\right)^2 \cdot S_N(25^\circ\text{C})$$
     $$S_e(25^\circ\text{C}) = \left(\frac{175}{175 + 57{,}08}\right)^2 \times 0{,}2915 = (0{,}754)^2 \times 0{,}2915 \approx 0{,}166\,\Omega/^\circ\text{C}$$

:::plotly id="ep425-td-nickel-courbe" label="Linéarisation" title="Sonde nickel seule et résistance équivalente" height="410" caption="La résistance en parallèle réduit la sensibilité mais diminue la courbure de la réponse autour de 0 °C."
{
  "series": [
    { "generator": "function", "range": [0, 100], "points": 180, "y": "50*(1+0.0055*x+0.0000067*x*x)", "name": "Sonde nickel RN", "line": { "color": "#0077b6", "width": 3 } },
    { "generator": "function", "range": [0, 100], "points": 180, "y": "175.7*(50*(1+0.0055*x+0.0000067*x*x))/(175.7+50*(1+0.0055*x+0.0000067*x*x))", "name": "Équivalent Re avec R1 = 175,7 Ω", "line": { "color": "#e76f51", "width": 3 } }
  ],
  "layout": { "margin": { "t": 42, "r": 32, "b": 65, "l": 74 }, "xaxis": { "title": "Température (°C)" }, "yaxis": { "title": "Résistance (Ω)" } }
}
:::
:::
:::

---

:::exercise id="ep425-td-bolometre" label="Exercice 10"
### Problème 10 : Bolomètre à thermistance CTN

**Énoncé :**
Un bolomètre utilise une thermistance CTN aux caractéristiques suivantes : $R(T_1 = 25^\circ\text{C}) = 5000\,\Omega$ et $R(T_2 = 30^\circ\text{C}) = 4135\,\Omega$.
Elle est montée dans un pont de Wheatstone équilibré à $25^\circ\text{C}$ sous $V_s = 13{,}33\text{ V}$.

---

:::solution
**Correction détaillée :**

1. **Calcul du paramètre $\beta$ de la CTN :**
   $$R(T) = R(T_1) \exp\left[ \beta \left(\frac{1}{T} - \frac{1}{T_1}\right) \right]$$
   avec $T_1 = 298{,}15\text{ K}$ et $T_2 = 303{,}15\text{ K}$.
   $$\beta = \frac{\ln\left(\frac{R(T_2)}{R(T_1)}\right)}{\frac{1}{T_2} - \frac{1}{T_1}} = \frac{\ln\left(\frac{4135}{5000}\right)}{\frac{1}{303{,}15} - \frac{1}{298{,}15}} = \frac{-0{,}18996}{-5{,}537 \cdot 10^{-5}} \approx 3430\text{ K}$$

2. **Tension mesurée sans auto-échauffement :**
   Le pont étant équilibré à $25^\circ\text{C}$ ($R(T) = R_1 = 5000\,\Omega$), la tension de déséquilibre $V$ est strictement nulle ($0\text{ V}$).

3. **Prise en compte de l'auto-échauffement (tension mesurée $V = -15\text{ mV}$) :**
   La tension du pont s'écrit $V = V_s \left( \frac{R(T)}{R_1 + R(T)} - \frac{1}{2} \right)$.
   $$V = -15\text{ mV} \implies \frac{R(T)}{R_1 + R(T)} = \frac{1}{2} - \frac{0{,}015}{13{,}33} = 0{,}49887$$
   $$R(T) = 4977{,}5\,\Omega \implies T \approx 25{,}15^\circ\text{C}$$
   L'auto-échauffement par effet Joule induit une élévation intrinsèque de température de $+0{,}15^\circ\text{C}$.

4. **Bilan de puissance en bolomètre :**
   $$\phi_{absorbée} + P_{Joule} = \alpha_a \cdot (T - T_{enceinte})$$
:::
:::

---

:::exercise id="ep425-td-sagnac" label="Exercice 11"
### Problème 11 : Gyromètre optique à effet Sagnac

**Énoncé :**
Un gyromètre optique est constitué d'une fibre optique enroulée $N = 1200$ fois autour d'une bobine de diamètre $D = 15\text{ cm}$ ($R = 7{,}5\text{ cm}$). Longueur d'onde du laser $\lambda = 0{,}67\text{ }\mu\text{m}$. Indice de la fibre $n = 1{,}5$. Signal électrique maximal en sortie $V_{max} = 1\text{ V}$.

---

:::solution
**Correction détaillée :**

1. **Effet Sagnac et déphasage :**
   Le déphasage optique induit par la rotation à la vitesse angulaire $\Omega$ est :
   $$\Delta \phi = \frac{8 \pi N A}{\lambda c} \cdot \Omega$$
   où $A = \pi R^2 = \pi (0{,}075)^2 \approx 0{,}01767\text{ m}^2$ est la surface d'une spire.

2. **Sensibilité du gyromètre :**
   Le signal de sortie varie selon $V(\Omega) = V_{max} \cos^2\left(\frac{\Delta \phi}{2}\right)$.
   La sensibilité maximale est obtenue pour un déphasage au repos de $\frac{\pi}{2}$ (fonctionnement au point d'inflexion).

3. **Résolution avec un CAN 8 bits ($256$ niveaux) :**
   La plus petite variation de tension détectable est $1\text{ LSB} = \frac{1\text{ V}}{256} \approx 3{,}9\text{ mV}$.
   En divisant par la sensibilité max, on extrait la vitesse angulaire minimale détectable $\Omega_{min}$.

:::plotly id="ep425-td-sagnac-courbe" label="Point de fonctionnement" title="Signal interferométrique du gyromètre" height="400" caption="La pente est maximale au voisinage de Δφ = π/2 : une petite rotation y produit alors la plus grande variation de tension."
{
  "series": [
    { "generator": "function", "range": [0, 6.283185], "points": 240, "y": "pow(cos(x/2),2)", "name": "V/Vmax = cos²(Δφ/2)", "line": { "color": "#0077b6", "width": 3 } }
  ],
  "layout": { "margin": { "t": 42, "r": 32, "b": 65, "l": 74 }, "xaxis": { "title": "Déphasage Δφ (rad)", "tickvals": [0, 1.5708, 3.1416, 4.7124, 6.2832], "ticktext": ["0", "π/2", "π", "3π/2", "2π"] }, "yaxis": { "title": "Tension normalisée V/Vmax", "range": [-0.05, 1.05] }, "shapes": [{ "type": "line", "x0": 1.5708, "x1": 1.5708, "y0": 0, "y1": 1, "line": { "color": "#e76f51", "dash": "dash" } }] }
}
:::
:::
:::

---

:::exercise id="ep425-td-capacitif" label="Exercice 12"
### Problème 12 : Capteur capacitif différentiel de déplacement

**Énoncé :**
Un capteur de déplacement est constitué de trois électrodes métalliques planes. Une armature centrale mobile se déplace d'une distance $x$ entre deux armatures fixes, formant deux capacités $C_1$ et $C_2$.

---

:::solution
**Correction détaillée (d'après Solution-Exo-12) :**

1. **Modélisation des capacités :**
   - $C_1 = \frac{\epsilon W}{e} \left(\frac{L}{2} - x\right)$
   - $C_2 = \frac{\epsilon W}{e} \left(\frac{L}{2} + x\right)$

2. **Tension de sortie en pont différentiel :**
   Alimenté par deux tensions opposées $V_1 = V_0$ et $V_2 = -V_0$ :
   $$V_s = \frac{C_1 - C_2}{C_1 + C_2} V_0$$
   En remplaçant $C_1$ et $C_2$ :
   $$C_1 - C_2 = -\frac{2 \epsilon W x}{e}, \quad C_1 + C_2 = \frac{\epsilon W L}{e}$$
   $$V_s(x) = - \frac{2 x}{L} \cdot V_0$$
   La réponse est **rigoureusement linéaire** par rapport au déplacement $x$ !

3. **Influence des tolérances de fabrication :**
   $$\Delta V_s = \left| \frac{\partial V_s}{\partial L} \right| \Delta L = \frac{2 x}{L^2} V_0 \Delta L$$
   L'erreur dépend uniquement de la tolérance sur la longueur $L$, et est indépendante de la largeur $W$ et de l'écartement $e$.
:::
:::

---

:::exercise id="ep425-td-linearisation" label="Exercice 13"
### Problème 13 : Démonstration générale de la linéarisation par résistance parallèle

**Énoncé :**
Démontrer l'expression générale de la résistance de linéarisation $R_1$ à placer en parallèle avec un capteur résistif $R(T)$ autour de la température $T_1$.

---

:::solution
**Démonstration théorique complète :**

Soit $R_e(T) = \frac{R_1 R(T)}{R_1 + R(T)}$ la résistance équivalente.
1. **Première dérivée (Sensibilité) :**
   $$\frac{d R_e}{dT} = R_1 \cdot \frac{R'(T) (R_1 + R(T)) - R(T) R'(T)}{(R_1 + R(T))^2} = R_1^2 \cdot \frac{R'(T)}{(R_1 + R(T))^2}$$

2. **Seconde dérivée (Courbure) :**
   $$\frac{d^2 R_e}{dT^2} = R_1^2 \cdot \frac{R''(T) (R_1 + R(T))^2 - R'(T) \cdot 2 (R_1 + R(T)) R'(T)}{(R_1 + R(T))^4}$$
   $$\frac{d^2 R_e}{dT^2} = \frac{R_1^2}{(R_1 + R(T))^3} \left[ R''(T) (R_1 + R(T)) - 2 (R'(T))^2 \right]$$

3. **Condition d'inflexion $\left.\frac{d^2 R_e}{dT^2}\right|_{T=T_1} = 0$ :**
   $$R''(T_1) (R_1 + R(T_1)) - 2 (R'(T_1))^2 = 0$$
   $$R_1 + R(T_1) = \frac{2 (R'(T_1))^2}{R''(T_1)}$$
   $$R_1 = \frac{2 \left(\left.\frac{dR}{dT}\right|_{T_1}\right)^2}{\left.\frac{d^2 R}{dT^2}\right|_{T_1}} - R(T_1)$$
   $$\blacksquare$$
:::
:::
