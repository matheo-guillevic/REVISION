---
title: "TD 3 corrige - Échantillonnage, repliement et transformées discrètes"
subject: "AU331-Traitement-Signal"
type: "td"
target: "AU331-Traitement-Signal-td3.html"
eyebrow: "AU331 - TD 3"
heading: "Échantillonnage, repliement et transformées discrètes"
summary: "Corrige maintenu en Markdown."
---

:::exercise label="Exercice de l'Examen 2014" title="Effet pratique de l'échantillonnage &amp; Repliement"
**Énoncé (Examen 2014 - Exercice I) :**
Tracer proprement en justifiant le module des spectres suivants :
1. $X(f) = TF[ \sin(2\pi \cdot 2000 \cdot t) ]$
2. $X_e(f) = TFD[ \sin(2\pi \cdot 2000 \cdot n \cdot T_e) ]$ avec $F_e = 1/T_e = 5000$ Hz et $N = 5000$ points.
3. $X_{e2}(f) = TFD[ \sin(2\pi \cdot 2000 \cdot n \cdot T_e) ]$ avec $F_e = 1/T_e = 3000$ Hz et $N = 3000$ points.

:::block type="method" title="Methode de resolution"

1. **TF continue d'un sinus :** Un sinus pur à la fréquence $f_0 = 2000$ Hz génère deux impulsions de Dirac à $+2000$ Hz (phase $-j/2$) et à $-2000$ Hz (phase $+j/2$).
2. **Théorème de Shannon ($F_e = 5000$ Hz) :** La fréquence maximale du signal est $F_{max} = 2000$ Hz. On vérifie la condition :
   $$F_e \ge 2 F_{max} \iff 5000 \ge 4000 \quad \text{(Respecté !)}$$
   Il n'y a **aucun repliement**. Le spectre de la TFD correspond aux raies du signal d'origine.
3. **Cas de sous-échantillonnage ($F_e = 3000$ Hz) :** On a $F_e < 2 F_{max}$ ($3000 < 4000$). Il y a **repliement de spectre (aliasing)**.
   La fréquence de $2000$ Hz se replie dans la bande fondamentale $[-F_e/2, F_e/2] = [-1500, 1500]$ Hz selon la formule :
   $$f_{replie} = f_0 - k \cdot F_e \quad \text{avec } k \in \mathbb{Z}$$
   Ici, pour $k=1$, $f_{replie} = 2000 - 3000 = -1000$ Hz.

:::

:::block type="theorem" title="Correction analytique detaillee"

**1. Spectre du signal continu $x(t) = \sin(2\pi \cdot 2000 \cdot t)$ :**
En utilisant Euler : $x(t) = \frac{e^{j2\pi \cdot 2000 \cdot t} - e^{-j2\pi \cdot 2000 \cdot t}}{2j}$.
$$X(f) = \frac{1}{2j} \delta(f - 2000) - \frac{1}{2j} \delta(f + 2000)$$
Le module $|X(f)|$ présente deux pics de hauteur $1/2$ situés à **$-2000$ Hz** et **$+2000$ Hz**.

**2. Spectre discret avec $F_e = 5000$ Hz ($N=5000$ points) :**
Le spectre est périodique de période $F_e = 5000$ Hz. Dans l'intervalle principal $[-2500, 2500]$ Hz, la condition de Shannon est respectée.
Les raies spectrales se situent exactement à **$-2000$ Hz** et **$+2000$ Hz** avec un module proportionnel à $N/2$ (soit une amplitude de $2500$ sous forme non normalisée).
*Étalonnage fréquentiel :* L'indice $k$ correspond à la fréquence $f_k = k \frac{F_e}{N} = k \cdot 1$ Hz. Les pics sont aux indices $k = 2000$ et $k = N - 2000 = 3000$.

**3. Spectre discret avec $F_e = 3000$ Hz ($N=3000$ points) :**
La bande principale est $[-1500, 1500]$ Hz.
La raie à $+2000$ Hz glisse par périodicité : $2000 - 3000 = -1000$ Hz.
La raie à $-2000$ Hz glisse par périodicité : $-2000 + 3000 = +1000$ Hz.
Le spectre replié présente donc ses pics de module à **$-1000$ Hz** et **$+1000$ Hz** (indices de la TFD : $k = 1000$ et $k = N - 1000 = 2000$).

:::

:::block type="warning" title="Warning d'examen"

C'est un classique absolu de l'examen de Romain Siragusa. Dessinez toujours les axes gradués avec les valeurs numériques précises ($F_e$, $F_e/2$, et la position des pics). Pour calculer la fréquence repliée, ramenez toujours la fréquence d'origine dans l'intervalle $[-F_e/2, F_e/2]$ en lui retranchant ou en lui ajoutant des multiples de $F_e$.
:::
:::

:::exercise label="Exercice de l'Examen 2012" title="TFD, étalonnage de spectre &amp; Zero-Padding"
**Énoncé (Examen 2012 - Exercice 1) :**
Un signal discret $S_1(n)$ composé de $N=6$ points échantillonnés à $F_e = 1200$ Hz est défini par : $S_1 = [1, 1, 0, 0, 0, 0]$.
1. Calculer analytiquement le module de sa TFD. Montrer qu'il se met sous la forme d'un cosinus.
2. Étalonner en fréquence l'axe du graphique de la TFD.
3. On effectue un *Zero-Padding* sur $S_1$ pour obtenir un signal $S_2$ de $12$ points. Quel est le lien entre la TFD de $S_2$ et celle de $S_1$ ? Étalonner l'axe des fréquences de $S_2$. Quel est l'intérêt pratique de cette manipulation ?

:::block type="method" title="Methode de resolution"

1. **Formule de la TFD à $N$ points :**
   $$X(k) = \sum_{n=0}^{N-1} x(n) e^{-j2\pi \frac{n k}{N}}$$
2. **Astuce de factorisation (angle moitié) :** Pour exprimer le module sous forme de cosinus, factoriser l'expression complexe par l'exponentielle ayant la moitié de l'angle total.
3. **Étalonnage fréquentiel :** Chaque pas élémentaire d'indice $k$ correspond à une fréquence physique de :
   $$\Delta f = \frac{F_e}{N}$$
4. **Analyse du Zero-Padding :** Ajouter des zéros à la fin d'un signal temporel n'apporte aucune nouvelle information physique (le spectre continu de la TFd reste inchangé). Cependant, cela échantillonne ce même spectre continu avec un pas fréquentiel plus serré ($\Delta f_2 = F_e / N_2$). Cela réalise une **interpolation spectrale** (meilleur confort visuel).

:::

:::block type="theorem" title="Correction analytique detaillee"

**1. Calcul de la TFD de $S_1(n)$ :**
Le signal a $N=6$ points, avec $x(0) = 1$, $x(1) = 1$, et $x(2)=\dots=x(5)=0$.
$$X_1(k) = \sum_{n=0}^{5} x(n) e^{-j2\pi \frac{n k}{6}} = x(0) e^0 + x(1) e^{-j \frac{2\pi k}{6}} = 1 + e^{-j \frac{\pi k}{3}}$$

Factorisons par l'exponentielle de l'angle moitié, soit $e^{-j \frac{\pi k}{6}}$ :
$$X_1(k) = e^{-j \frac{\pi k}{6}} \left( e^{j \frac{\pi k}{6}} + e^{-j \frac{\pi k}{6}} \right)$$

En utilisant la formule d'Euler pour le cosinus ($\cos(\theta) = \frac{e^{j\theta} + e^{-j\theta}}{2}$) :
$$X_1(k) = 2 \cos\left( \frac{\pi k}{6} \right) e^{-j \frac{\pi k}{6}}$$

Le module du spectre s'écrit donc :
$$|X_1(k)| = 2 \left| \cos\left( \frac{\pi k}{6} \right) \right| \quad \text{pour } k \in [0, 5]$$

**2. Étalonnement de la TFD de $S_1$ :**
La résolution fréquentielle est $\Delta f_1 = \frac{F_e}{N_1} = \frac{1200}{6} = 200$ Hz.
Les indices de fréquence sur l'axe des abscisses correspondent aux valeurs suivantes :
*   $k=0 \to 0$ Hz (composante continue, module $|X_1(0)| = 2 |\cos(0)| = 2$)
*   $k=1 \to 200$ Hz ($|X_1(1)| = 2 |\cos(\pi/6)| = \sqrt{3} \approx 1,73$)
*   $k=2 \to 400$ Hz ($|X_1(2)| = 2 |\cos(\pi/3)| = 1$)
*   $k=3 \to 600$ Hz (fréquence de Shannon $F_e/2$, $|X_1(3)| = 2 |\cos(\pi/2)| = 0$)
*   $k=4 \to 800$ Hz (symétrique, $|X_1(4)| = 1$)
*   $k=5 \to 1000$ Hz (symétrique, $|X_1(5)| = 1,73$)

**3. TFD après Zero-Padding ($S_2$ de 12 points) :**
Le signal $S_2$ s'écrit $S_2 = [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]$ ($N_2 = 12$).
La transformée de Fourier discrète de $S_2$ est :
$$X_2(k) = \sum_{n=0}^{11} S_2(n) e^{-j2\pi \frac{n k}{12}} = 1 + e^{-j \frac{2\pi k}{12}} = 1 + e^{-j \frac{\pi k}{6}}$$
De la même manière, par factorisation d'angle moitié :
$$|X_2(k)| = 2 \left| \cos\left( \frac{\pi k}{12} \right) \right| \quad \text{pour } k \in [0, 11]$$

*   **Lien entre $X_2$ et $X_1$ :** Les points de la TFD à 6 points ($X_1$) se retrouvent exactement dans la TFD à 12 points ($X_2$) pour les indices pairs : $X_1(k) = X_2(2k)$. La TFD de $S_2$ est une version **interpolée** de la TFD de $S_1$.
*   **Nouvel étalonnage :** La résolution fréquentielle devient $\Delta f_2 = \frac{1200}{12} = 100$ Hz. Les pas de l'axe des abscisses sont désormais espacés de 100 Hz au lieu de 200 Hz.
*   **Intérêt pratique :** Cette manipulation permet d'augmenter la densité d'échantillonnage du spectre. Elle facilite la lecture visuelle du spectre continu sous-jacent et permet de mieux localiser la position des extremums (pics de fréquence) sans pour autant augmenter la durée d'enregistrement réelle du signal.

:::

:::block type="warning" title="Warning d'examen"

Une erreur conceptuelle majeure est de croire que le *Zero-Padding* améliore la **résolution fréquentielle physique** (le pouvoir de séparer deux fréquences très proches). C'est faux ! Seule l'augmentation de la durée d'acquisition temporelle réelle du signal ($T_{acq} = N \cdot T_e$) permet d'augmenter la résolution physique. Le Zero-Padding n'est qu'une interpolation mathématique (un "zoom" graphique).
:::
:::
