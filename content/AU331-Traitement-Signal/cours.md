---
title: AU331-Traitement-Signal - Revision ESISAR
subject: AU331-Traitement-Signal
type: course
---

:::section id="au331-intro" eyebrow="Semestre 5" title="AU331-Traitement-Signal" summary="Cours de traitement du signal deterministe : modeliser, analyser, echantillonner et filtrer des signaux continus ou discrets."
:::dashboard
:::card class="progress-card" kicker="Parcours" title="4 cours"
Des signaux continus jusqu aux filtres RIF, avec exercices resolus et formules centrales.
:::

:::card class="priority-card" kicker="Priorites"

1. Comprendre la dualite temps-frequence.
2. Savoir relier convolution, filtrage et fonction de transfert.
3. Maitriser Shannon, TFD, FFT et zero padding.
4. Utiliser la transformee en Z pour analyser les systemes discrets.
5. Reconnaitre les conditions de phase lineaire des filtres RIF.
:::
:::

:::quicklinks
- [Objectifs](#au331-objectifs)
- [Signaux continus](#au331-signaux-continus)
- [Analyse spectrale](#au331-analyse-spectrale)
- [Echantillonnage](#au331-echantillonnage)
- [Systemes discrets et RIF](#au331-systemes-rif)
- [TD](#au331-td)
- [Fiche finale](#au331-revision)
:::

:::block type="remember" title="Fil rouge du cours"
Ce document propose une synthèse exhaustive et rigoureuse des cours de **Traitement du Signal Déterministe (AU331)**. Chaque chapitre intègre les définitions théoriques, les justifications physiques, les formulations mathématiques complètes (notations conformes aux cours) et des exercices types résolus en guise d'exemples d'application.
:::

:::figure src="assets/AU331-Traitement-Signal/au331-synthese.svg" alt="Chaine de traitement du signal : modelisation, analyse, echantillonnage et filtrage." label="Vue d'ensemble du cours AU331" caption="Le cours suit une progression naturelle : partir du signal physique, l'analyser, l'echantillonner, puis construire un filtrage exploitable."
:::
:::

:::section id="au331-objectifs" eyebrow="Cours 0" title="Presentation et objectifs" summary="Situer le traitement du signal, ses outils mathematiques et ses usages industriels."

Le traitement du signal est la discipline qui développe et étudie les techniques de mesure, de modélisation, d'analyse, de filtrage, de compression et de reconstruction des signaux (tensions, courants, ondes sonores ou électromagnétiques) porteurs d'information.

:::block type="method" title="Objectifs méthodologiques et techniques"

*   **Modélisation :** Traduire une grandeur physique en un modèle mathématique manipulable.
*   **Passage continu-discret :** Maîtriser l'échantillonnage, la quantification et la reconstruction (formule d'interpolation de Shannon) pour passer du monde analogique au monde numérique.
*   **Filtrage :** Concevoir des systèmes (analogiques et numériques) capables d'extraire, de rejeter ou de modifier des composantes fréquentielles spécifiques sans distorsion indésirable.
*   **Outils fondamentaux :** Maîtrise des transformations mathématiques duales (Laplace, Fourier, Fourier Discret, Z) et de l'environnement de simulation Matlab pour le traitement numérique.

:::

:::block type="definition" title="Secteurs d'application industriels"

*   **Télécommunications :** Modulation, démodulation, codage canal, correction d'erreurs (téléphonie mobile, Wi-Fi, GPS).
*   **Électronique médicale :** Filtrage du bruit biologique, FFT 2D/3D (IRM, échographie, électrocardiogramme).
*   **Acoustique et audio :** Enregistrement haute fidélité, compression (MP3), synthèse vocale, réduction active de bruit.
*   **Automobile et robotique :** Traitement des capteurs de vitesse (ABS), asservissements numériques, traitement de l'image pour la conduite autonome.


:::

:::

:::section id="au331-signaux-continus" eyebrow="Cours 1" title="Signaux deterministes continus" summary="Classifier les signaux, calculer energie et puissance, puis passer au domaine frequentiel."

Un signal déterministe (ou certain) est un signal dont l'évolution temporelle peut être parfaitement décrite par un modèle mathématique (ex. une sinusoïde ou un échelon).

:::block type="definition" title="Classification des signaux"

*   **Classification physique :** Selon la nature de la grandeur physique (optique, sonore, électrique).
*   **Classification phénoménologique :** Déterministes (périodiques ou non) et aléatoires (bruit blanc, signaux stochastiques).
*   **Classification mathématique :**
    *   *Signaux continus :* Définis sur un intervalle temporel continu $t \in \mathbb{R}$.
    *   *Signaux discrets :* Définis uniquement à des instants spécifiques $n \cdot T_e$ ($n \in \mathbb{Z}$).
    *   *Signaux quantifiés :* À valeurs discrètes (numérisées).

*   **Classification énergétique :**
    *   *Signaux à énergie finie :* Généralement de durée limitée, leur énergie totale est positive et bornée :

        $$E_x = \int_{-\infty}^{+\infty} |x(t)|^2 dt < +\infty$$

        Leur puissance moyenne temporelle est nulle.
    *   *Signaux à puissance finie :* Généralement de durée infinie (comme les signaux périodiques), leur puissance moyenne temporelle est positive et bornée :

        $$P_x = \lim_{T \to +\infty} \frac{1}{T} \int_{-T/2}^{+T/2} |x(t)|^2 dt < +\infty$$

        Pour un signal périodique de période $T_0$, le calcul se simplifie sur une seule période :

        $$P_x = \frac{1}{T_0} \int_{0}^{T_0} |x(t)|^2 dt$$

        Leur énergie totale est infinie.

:::

:::exercise label="Exercice 1" title="Classification énergétique et calculs d'énergie/puissance"

**Énoncé :**

1. Montrer que le signal causal $x(t) = e^{-at} u(t)$ avec $a > 0$ et $u(t)$ l'échelon de Heaviside est un signal à énergie finie. Calculer cette énergie.
2. Calculer la puissance moyenne du signal périodique $y(t) = A \cos(2\pi f_0 t)$ avec $A \in \mathbb{R}$.

**Solution rédigée :**

1. L'échelon de Heaviside $u(t)$ vaut $1$ pour $t \ge 0$ et $0$ ailleurs. L'énergie $E_x$ s'écrit :

   $$E_x = \int_{-\infty}^{+\infty} |x(t)|^2 dt = \int_{0}^{+\infty} \left(e^{-at}\right)^2 dt = \int_{0}^{+\infty} e^{-2at} dt$$

   La primitive de $e^{-2at}$ est $-\frac{1}{2a}e^{-2at}$. On évalue :

   $$E_x = \left[ -\frac{1}{2a} e^{-2at} \right]_{0}^{+\infty} = 0 - \left(-\frac{1}{2a}\right) = \frac{1}{2a} \text{ Joules}$$

   Puisque $a > 0$, l'énergie est finie ($E_x < +\infty$). La puissance moyenne temporelle est donc rigoureusement nulle :

   $$P_x = \lim_{T \to +\infty} \frac{1}{T} \int_{0}^{T} e^{-2at} dt = \lim_{T \to +\infty} \frac{1}{T} \left( \frac{1 - e^{-2aT}}{2a} \right) = 0 \text{ Watts}$$

2. Le signal $y(t) = A \cos(2\pi f_0 t)$ est périodique de période $T_0 = 1/f_0$. Sa puissance moyenne $P_y$ se calcule sur une période :

   $$P_y = \frac{1}{T_0} \int_{0}^{T_0} A^2 \cos^2(2\pi f_0 t) dt$$

   En utilisant la formule de linéarisation trigonométrique $\cos^2(\theta) = \frac{1 + \cos(2\theta)}{2}$ :

   $$P_y = \frac{A^2}{T_0} \int_{0}^{T_0} \frac{1 + \cos(4\pi f_0 t)}{2} dt = \frac{A^2}{2T_0} \left[ t + \frac{\sin(4\pi f_0 t)}{4\pi f_0} \right]_{0}^{T_0}$$

   Puisque $\sin(4\pi f_0 T_0) = \sin(4\pi) = 0$, on obtient :

   $$P_y = \frac{A^2}{2T_0} \cdot T_0 = \frac{A^2}{2} \text{ Watts}$$

   L'énergie de ce signal périodique est infinie, ce qui confirme qu'il s'agit bien d'un signal à puissance finie.
:::

:::block type="theorem" title="Dualité Temps-Fréquence et Transformée de Fourier"
La Transformée de Fourier (TF) permet de passer d'une description temporelle $x(t)$ (forme d'onde) à une description fréquentielle $X(f)$ (spectre d'amplitude et de phase) sans perte d'énergie (Théorème de Parseval).

:::figure src="assets/AU331-Traitement-Signal/dualite_temps_frequence.png" alt="Signal temporel et representation frequentielle par transformee de Fourier." class="td-figure" caption="La transformee de Fourier change le point de vue : on ne regarde plus la forme temporelle, mais la repartition des frequences et des phases."
:::

*   **Formule directe (Analyse) :**

    $$X(f) = \text{TF}[x(t)] = \int_{-\infty}^{+\infty} x(t) e^{-j2\pi ft} dt$$

    $X(f)$ est généralement complexe et s'écrit sous forme polaire : $X(f) = |X(f)| e^{j\varphi(f)}$.

*   **Formule inverse (Synthèse) :**

    $$x(t) = \text{TF}^{-1}[X(f)] = \int_{-\infty}^{+\infty} X(f) e^{j2\pi ft} df$$

**Propriétés mathématiques fondamentales de la TF**

Pour deux signaux $x(t)$ et $y(t)$ de transformées respectives $X(f)$ et $Y(f)$ :

| Propriété et lecture | Illustration |
| :--- | :---: |
| **Linéarité**<br>$\text{TF}[\alpha x(t) + \beta y(t)] = \alpha X(f) + \beta Y(f)$<br><br>Une combinaison de signaux devient la même combinaison de leurs spectres. | ![Illustration de la propriete de linearite de la transformee de Fourier.](assets/AU331-Traitement-Signal/tf_propriete_linearite.png) |
| **Transposition**<br>$\text{TF}[x(-t)] = X(-f)$<br><br>Inverser le temps inverse aussi l'axe fréquentiel. | ![Illustration de la propriete de transposition temporelle de la transformee de Fourier.](assets/AU331-Traitement-Signal/tf_propriete_transposition.png) |
| **Symétrie hermitienne**<br>Si $x(t)$ est réel, alors $X(-f) = X^*(f)$.<br><br>Le module $|X(f)|$ est pair, la phase $\varphi(f)$ est impaire. | ![Illustration de la symetrie hermitienne du spectre d'un signal reel.](assets/AU331-Traitement-Signal/tf_propriete_symetrie_hermitienne.png) |
| **Théorème du retard**<br>$\text{TF}[x(t-t_0)] = e^{-j2\pi f t_0} X(f)$<br><br>Le module ne change pas, mais la phase devient linéaire avec la fréquence. | ![Illustration du retard temporel et du dephasage lineaire en frequence.](assets/AU331-Traitement-Signal/tf_propriete_retard.png) |
| **Théorème de modulation**<br>$\text{TF}[x(t) e^{j2\pi f_0 t}] = X(f-f_0)$<br><br>Multiplier par une porteuse translate le spectre autour de $f_0$. | ![Illustration de la modulation et de la translation frequentielle.](assets/AU331-Traitement-Signal/tf_propriete_modulation.png) |
| **Dilatation / contraction temporelle**<br>$\text{TF}[x(at)] = \frac{1}{|a|} X\left(\frac{f}{a}\right)$<br><br>Comprimer dans le temps élargit le spectre, et inversement. | ![Illustration de la dilatation temporelle et de la contraction frequentielle.](assets/AU331-Traitement-Signal/tf_propriete_dilatation_contraction.png) |
| **Dérivation temporelle**<br>$\text{TF}\left[\frac{dx(t)}{dt}\right] = j2\pi f X(f)$<br><br>La dérivation accentue les hautes fréquences, comme un effet passe-haut. | ![Illustration de la derivation temporelle et du gain proportionnel a la frequence.](assets/AU331-Traitement-Signal/tf_propriete_derivation.png) |

:::

:::exercise label="Exercice 2" title="Calcul de la TF d'une fenêtre rectangle et d'une exponentielle causale"

**Énoncé :**

1. Déterminer la transformée de Fourier du signal porte $\text{rect}_T(t)$ défini par $\text{rect}_T(t) = 1$ pour $|t| \le T/2$ et $0$ ailleurs.
2. Déterminer la transformée de Fourier du signal $z(t) = t e^{-at} u(t)$ avec $a > 0$.

**Solution rédigée :**

1. Par définition de la TF :

   $$X(f) = \int_{-T/2}^{T/2} 1 \cdot e^{-j2\pi ft} dt = \left[ \frac{e^{-j2\pi ft}}{-j2\pi f} \right]_{-T/2}^{T/2} = \frac{e^{-j\pi fT} - e^{j\pi fT}}{-j2\pi f}$$

   En utilisant la formule d'Euler $\sin(\theta) = \frac{e^{j\theta} - e^{-j\theta}}{2j}$, on obtient :

   $$X(f) = \frac{\sin(\pi f T)}{\pi f} = T \frac{\sin(\pi f T)}{\pi f T} = T \cdot \text{sinc}(\pi f T)$$

   Le spectre d'une porte temporelle est donc un sinus cardinal en fréquence. On remarque la dualité : plus la porte est étroite (T petit), plus le spectre est large (les zéros du sinus cardinal sont situés aux multiples de $1/T$).

:::figure src="assets/AU331-Traitement-Signal/porte_vers_sinc.png" alt="Une fenetre rectangle dans le temps devient un sinus cardinal en frequence." class="td-figure" caption="Exercice 2 : la fenetre rectangulaire illustre directement la dualite largeur temporelle / largeur spectrale."
:::

2. Pour calculer la TF de $z(t) = t e^{-at} u(t)$, on utilise la propriété de dérivation par rapport à la fréquence.
   On sait que pour $g(t) = e^{-at} u(t)$, sa transformée est :

   $$G(f) = \int_{0}^{+\infty} e^{-at} e^{-j2\pi ft} dt = \int_{0}^{+\infty} e^{-(a+j2\pi f)t} dt = \left[ \frac{e^{-(a+j2\pi f)t}}{-(a+j2\pi f)} \right]_{0}^{+\infty} = \frac{1}{a + j2\pi f}$$

   La propriété de dérivation par rapport aux fréquences énonce que $\text{TF}[t \cdot g(t)] = -\frac{1}{j2\pi} \frac{dG(f)}{df} = \frac{j}{2\pi} \frac{dG(f)}{df}$. Calculons la dérivée de $G(f)$ :

   $$\frac{d}{df}\left( \frac{1}{a + j2\pi f} \right) = \frac{-j2\pi}{(a + j2\pi f)^2}$$

   On en déduit :

   $$Z(f) = \text{TF}[t \cdot e^{-at} u(t)] = \frac{j}{2\pi} \left( \frac{-j2\pi}{(a + j2\pi f)^2} \right) = \frac{1}{(a + j2\pi f)^2}$$
:::

:::block type="theorem" title="Distribution de Dirac et Peigne de Dirac"

*   **Impulsion de Dirac $\delta(t)$ :** Modélise un signal impulsionnel infiniment bref, de surface unité. Physiquement irréalisable, elle est définie sous forme de distribution par sa propriété de sélection par intégration :

    $$\int_{-\infty}^{+\infty} x(t) \delta(t-t_0) dt = x(t_0)$$

    L'élément neutre de la convolution est le Dirac : $x(t) * \delta(t) = x(t)$.
    La TF du Dirac vaut : $\text{TF}[\delta(t)] = 1$ (un choc impulsionnel contient toutes les fréquences à parts égales).
    Par dualité, la TF d'une constante vaut : $\text{TF}[1] = \delta(f)$.

*   **Peigne de Dirac $\delta_T(t)$ :** Suite périodique infinie d'impulsions de Dirac espacées de $T$ :

    $$\delta_T(t) = \sum_{n=-\infty}^{+\infty} \delta(t - nT)$$

    La transformée de Fourier d'un peigne de Dirac de période $T$ est également un peigne de Dirac dans le domaine fréquentiel, de période $F = 1/T$ (fréquence de répétition) :

    $$\text{TF}[\delta_T(t)] = \frac{1}{T} \delta_{1/T}(f) = \frac{1}{T} \sum_{n=-\infty}^{+\infty} \delta\left(f - \frac{n}{T}\right)$$

    Ce théorème est la clé de voûte de la modélisation mathématique de l'échantillonnage.

:::

:::block type="theorem" title="Produit de convolution"
Le produit de convolution traduit l'interaction physique entre un signal d'entrée $x(t)$ et un système linéaire invariant dans le temps (LIT) caractérisé par sa réponse impulsionnelle $h(t)$.

*   **Définition intégrale :**

    $$y(t) = x(t) * h(t) = \int_{-\infty}^{+\infty} x(\tau) h(t-\tau) d\tau$$

*   **Propriétés algébriques :** Commutativité ($x*h = h*x$), associativité ($x*(y*z) = (x*y)*z$) et distributivité par rapport à l'addition ($x*(y+z) = x*y + x*z$).
*   **Dualité Produit-Convolution (Théorème fondamental) :**

    $$\text{TF}[x(t) * y(t)] = X(f) \cdot Y(f)$$

    $$\text{TF}[x(t) \cdot y(t)] = X(f) * Y(f)$$

    *Justification physique :* Filtrer un signal revient à réaliser un produit de convolution temporel difficile à calculer directement, alors qu'il s'agit d'une simple multiplication algébrique de leurs spectres dans le domaine fréquentiel.

:::

:::exercise label="Exercice 3" title="Produit de convolution de deux fenêtres rectangles"

**Énoncé :**

Calculer et représenter le produit de convolution de deux fenêtres rectangles identiques : $s(t) = \text{rect}_T(t) * \text{rect}_T(t)$.

**Solution rédigée :**

Par définition, $s(t) = \int_{-\infty}^{+\infty} \text{rect}_T(\tau) \text{rect}_T(t-\tau) d\tau$.
La fonction $\text{rect}_T(\tau)$ est non nulle (égale à $1$) pour $\tau \in [-T/2, T/2]$.
La fonction translatée $\text{rect}_T(t-\tau)$ est non nulle pour $t-\tau \in [-T/2, T/2]$, c'est-à-dire pour $\tau \in [t - T/2, t + T/2]$.
L'intégrande est le produit de ces deux fonctions. Il est non nul uniquement sur l'intersection de leurs supports respectifs. Étudions les différents cas selon la valeur du décalage $t$ :

*   **Cas 1 : Support disjoint à gauche ($t < -T$)**
    L'intervalle $[t - T/2, t + T/2]$ est entièrement à gauche de $[-T/2, T/2]$ ($t + T/2 < -T/2$). L'intersection est vide.

    $$s(t) = 0$$

*   **Cas 2 : Chevauchement partiel à gauche ($-T \le t \le 0$)**
    L'intersection des supports est l'intervalle $[-T/2, t + T/2]$. L'intégrale s'écrit :

    $$s(t) = \int_{-T/2}^{t+T/2} 1 \cdot d\tau = [ \tau ]_{-T/2}^{t+T/2} = (t + T/2) - (-T/2) = t + T$$

*   **Cas 3 : Chevauchement partiel à droite ($0 < t \le T$)**
    L'intersection des supports est l'intervalle $[t - T/2, T/2]$. L'intégrale s'écrit :

    $$s(t) = \int_{t-T/2}^{T/2} 1 \cdot d\tau = [ \tau ]_{t-T/2}^{T/2} = T/2 - (t - T/2) = -t + T$$

*   **Cas 4 : Support disjoint à droite ($t > T$)**
    L'intervalle $[t - T/2, t + T/2]$ est entièrement à droite de $[-T/2, T/2]$ ($t - T/2 > T/2$). L'intersection est vide.

    $$s(t) = 0$$

**Conclusion :**

Le produit de convolution de deux rectangles de largeur $T$ donne un signal triangulaire de support $[-T, T]$ et d'amplitude maximale $T$ en $t=0$, noté $\text{tri}_T(t)$ :

:::figure src="assets/AU331-Traitement-Signal/convolution_rectangles_detail.png" alt="Deux fenetres rectangles convoluees donnent une fenetre triangulaire." class="td-figure wide-figure" caption="Exercice 3 : la convolution vaut la longueur de recouvrement entre les deux fenetres."
:::

$$\begin{cases}

s(t) = t + T & \text{pour } t \in [-T, 0] \\
s(t) = -t + T & \text{pour } t \in [0, T] \\
s(t) = 0 & \text{ailleurs}

\end{cases}$$
:::

:::block type="theorem" title="Approche du filtrage analogique"
Un filtre analogique est un système physique (généralement passif type RC, LC ou actif avec amplificateurs opérationnels) décrit par une fonction de transfert en fréquence $H(f)$ :

$$H(f) = \frac{Y(f)}{X(f)}$$

Le comportement fréquentiel est analysé graphiquement à l'aide du **diagramme de Bode**, qui représente :
*   Le gain en décibels : $G_{dB}(f) = 20 \log_{10}(|H(f)|)$
*   La phase : $\varphi(f) = \arctan\left(\frac{\text{Im}(H(f))}{\text{Re}(H(f))}\right)$

**Fonctions de transfert des filtres usuels**

*   **Passe-bas du 1er ordre (ex. circuit RC) :**

    $$H(f) = \frac{1}{1 + j \frac{f}{f_0}}$$

    *Comportement :* Pour $f \ll f_0$, $G_{dB} \approx 0 \text{ dB}$. Pour $f \gg f_0$, pente de $-20 \text{ dB/décade}$ (atténuation). À $f = f_0$, le gain vaut $-3 \text{ dB}$.

*   **Passe-haut du 1er ordre :**

    $$H(f) = \frac{j \frac{f}{f_0}}{1 + j \frac{f}{f_0}}$$

    *Comportement :* Coupe les basses fréquences (pente de $+20 \text{ dB/décade}$) et laisse passer les hautes fréquences au-delà de la fréquence de coupure $f_0$.

*   **Passe-bas du 2ème ordre :**

    $$H(f) = \frac{1}{1 + 2jm \frac{f}{f_0} - \left(\frac{f}{f_0}\right)^2}$$

    *Comportement :* $m$ désigne le coefficient d'amortissement. Si $m < 0.707$, il y a apparition d'une résonance. Pour $f \gg f_0$, pente de coupure raide de $-40 \text{ dB/décade}$.

*   **Passe-bande du 2ème ordre :**

    $$H(f) = \frac{2jm \frac{f}{f_0}}{1 + 2jm \frac{f}{f_0} - \left(\frac{f}{f_0}\right)^2} = \frac{1}{1 + jQ\left(\frac{f}{f_0} - \frac{f_0}{f}\right)}$$

    $Q = \frac{f_0}{\Delta f} = \frac{1}{2m}$ est le **facteur de qualité**. Plus $Q$ est élevé, plus le filtre est sélectif autour de la fréquence centrale $f_0$.

*   **Coupe-bande (Notch) du 2ème ordre :**

    $$H(f) = \frac{1 - \left(\frac{f}{f_0}\right)^2}{1 + 2jm \frac{f}{f_0} - \left(\frac{f}{f_0}\right)^2}$$

    Élimine spécifiquement la fréquence $f_0$ (très utilisé pour réjecter le parasite secteur à 50 Hz).

:::

:::block type="method" title="Apodisation (Filtrage temporel)"
En pratique, on ne peut pas observer un signal sur un temps infini. L'observer sur une durée $T$ revient mathématiquement à le multiplier par une fenêtre temporelle $w(t)$ (généralement rectangulaire).

$$x_{obs}(t) = x(t) \cdot w(t) \iff X_{obs}(f) = X(f) * W(f)$$

L'apodisation consiste à choisir une fenêtre de pondération adéquate pour réduire le phénomène de débordement spectral (les lobes secondaires du sinus cardinal de la fenêtre rectangulaire qui viennent polluer le spectre du signal utile).

:::figure src="assets/AU331-Traitement-Signal/fenetres_apodisation.png" alt="Comparaison de fenetres d'apodisation et de leurs effets spectraux." class="td-figure" caption="Le choix de la fenetre regle le compromis entre largeur du lobe principal et attenuation des lobes secondaires."
:::

**Comparaison des fenêtres de pondération usuelles**

| Type de fenêtre | Atténuation du 1er lobe secondaire (dB) | Largeur du lobe principal ($\Delta f$) | Justification d'usage |
| :--- | :---: | :---: | :--- |
| **Rectangulaire** | $-13$ | $\frac{2 F_e}{N}$ | Excellente résolution fréquentielle, mais forte pollution des lobes secondaires. |
| **Hanning** | $-31$ | $\frac{4 F_e}{N}$ | Bon compromis général. |
| **Hamming** | $-41$ | $\frac{4 F_e}{N}$ | Idéal pour séparer des signaux de fréquences proches mais d'amplitudes très différentes. |
| **Blackman** | $-57$ | $\frac{6 F_e}{N}$ | Très forte atténuation des lobes secondaires, au détriment de la largeur du lobe principal. |


:::

:::

:::section id="au331-analyse-spectrale" eyebrow="Cours 2" title="Analyse spectrale" summary="Relier energie, puissance, correlation et spectres pour analyser un signal observe."

L'analyse spectrale étudie la répartition de l'énergie ou de la puissance d'un signal dans le domaine des fréquences.

:::block type="theorem" title="Densité Spectrale d'Énergie (DSE)"
Pour un signal à énergie finie $x(t)$ de transformée de Fourier $X(f)$, le théorème de Parseval garantit la conservation de l'énergie :

$$E_x = \int_{-\infty}^{+\infty} |x(t)|^2 dt = \int_{-\infty}^{+\infty} |X(f)|^2 df$$

On définit la **Densité Spectrale d'Énergie (DSE)** par :

$$S_x(f) = |X(f)|^2$$

*Propriété clé :* $S_x(f)$ est une fonction réelle, positive et paire. Elle perd l'information de phase du signal, l'opération est donc non réversible.

:::

:::block type="definition" title="Fonctions de Corrélation"
La corrélation mesure le degré de similitude entre deux signaux, ou d'un signal avec lui-même, en fonction d'un décalage temporel $t$.

*   **Autocorrélation (signaux d'énergie finie) :**

    $$C_x(t) = \int_{-\infty}^{+\infty} x(\tau) x^*(\tau - t) d\tau = x(t) * x^*(-t)$$

    *Propriétés :*

    1. Valeur maximale à l'origine : $C_x(t) \le C_x(0) = E_x$ (l'énergie totale).
    2. Symétrie : $C_x(t) = C_x^*(-t)$ (paire si le signal est réel).
    3. **Théorème de Wiener-Khintchine :** La fonction d'autocorrélation et la DSE forment une paire de transformées de Fourier :

       $$\text{TF}[C_x(t)] = S_x(f) = |X(f)|^2$$

    4. Degré de self-cohérence normalisé : $\Gamma_x(t) = \frac{C_x(t)}{C_x(0)} \in [0, 1]$.

*   **Intercorrélation (signaux d'énergie finie) :**

    $$C_{xy}(t) = \int_{-\infty}^{+\infty} x(\tau) y^*(\tau - t) d\tau = x(t) * y^*(-t)$$

    Mesure la ressemblance de deux signaux distincts. Si $C_{xy}(t) = 0$ pour tout $t$, les signaux sont dits **non corrélés**.
    DSE croisée : $\text{TF}[C_{xy}(t)] = S_{xy}(f) = X(f) Y^*(f)$ (valeur complexe traduisant l'interaction et le déphasage).

:::

:::block type="theorem" title="Densité Spectrale de Puissance (DSP)"
Pour les signaux à puissance finie (ex. périodiques), l'énergie est infinie. On étudie donc la répartition de leur puissance.

*   **Autocorrélation temporelle (puissance finie) :**

    $$C_x(t) = \lim_{T \to +\infty} \frac{1}{T} \int_{-T/2}^{T/2} x(\tau) x^*(\tau - t) d\tau$$

    Pour un signal périodique de période $T_0$, la limite est inutile :

    $$C_x(t) = \frac{1}{T_0} \int_{0}^{T_0} x(\tau) x^*(\tau - t) d\tau$$

*   **Densité Spectrale de Puissance (DSP) $\gamma_x(f)$ :**

    $$\gamma_x(f) = \text{TF}[C_x(t)]$$

    Pour un signal périodique décomposé en série de Fourier $x(t) = \sum c_n e^{j2\pi n f_0 t}$, la DSP est discrète (spectre de raies) :

    $$\gamma_x(f) = \sum_{n=-\infty}^{+\infty} |c_n|^2 \delta(f - n f_0)$$

    La puissance moyenne totale est la somme des puissances de chaque raie (Théorème de Parseval pour les séries de Fourier) :

    $$P_x = C_x(0) = \int_{-\infty}^{+\infty} \gamma_x(f) df = \sum_{n=-\infty}^{+\infty} |c_n|^2$$

:::

:::block type="neutral" title="Exercices d'application industrielle de la corrélation"

:::

:::exercise label="Exercice 4" title="Détection d'une cible par écho radar en milieu fortement bruité"

**Énoncé :**

Un radar émet un signal impulsionnel gaussien bref $u(t)$. Le signal réfléchi par une cible éloignée est capté sous la forme $x(t) = a \cdot u(t - t_2) + b(t)$, où $a$ est l'atténuation physique, $t_2$ le temps d'aller-retour (temps de vol), et $b(t)$ un bruit blanc thermique additif non corrélé avec $u(t)$.

1. Montrer mathématiquement comment la fonction d'intercorrélation $C_{xu}(t)$ permet de retrouver rigoureusement le retard $t_2$.
2. Expliquer pourquoi cette méthode est extrêmement robuste, même pour des rapports signal sur bruit (SNR) très faibles (ex. $SNR = 0.4$).

**Solution rédigée :**

1. Calculons l'intercorrélation $C_{xu}(t)$ entre le signal reçu $x(t)$ et le signal émis connu $u(t)$ :

   $$C_{xu}(t) = x(t) * u^*(-t) = \left[ a \cdot u(t - t_2) + b(t) \right] * u^*(-t)$$

   Par distributivité de la convolution :

   $$C_{xu}(t) = a \cdot \left[ u(t - t_2) * u^*(-t) \right] + b(t) * u^*(-t)$$

   On sait que $u(t) * u^*(-t) = C_u(t)$ (la fonction d'autocorrélation de l'impulsion émise) et que $u(t-t_2) = \delta(t-t_2) * u(t)$. On a donc :

   $$u(t - t_2) * u^*(-t) = \delta(t-t_2) * u(t) * u^*(-t) = \delta(t-t_2) * C_u(t) = C_u(t - t_2)$$

   En introduisant l'intercorrélation entre le bruit et le signal émis $C_{bu}(t) = b(t) * u^*(-t)$, on obtient l'expression finale :

   $$C_{xu}(t) = a \cdot C_u(t - t_2) + C_{bu}(t)$$

2. **Justification de la robustesse (SNR faible) :**
   Le bruit blanc $b(t)$ et le signal utile $u(t)$ proviennent de sources physiques totalement indépendantes. Ils sont donc rigoureusement **non corrélés**. Par conséquent, pour un temps d'intégration suffisant, la fonction d'intercorrélation croisée du bruit $C_{bu}(t)$ tend vers $0$ pour tout $t$.
   L'expression se simplifie en :

   $$C_{xu}(t) \approx a \cdot C_u(t - t_2)$$

   La fonction d'autocorrélation $C_u(t)$ présente un maximum global unique et très pointu à l'origine ($t = 0$). Ainsi, la fonction d'intercorrélation $C_{xu}(t)$ présentera un pic extrêmement net à l'instant précis $t = t_2$.

:::figure src="assets/AU331-Traitement-Signal/detection_correlation.png" alt="La correlation extrait un pic de retard dans un signal bruite." class="td-figure" caption="Exercice 4 : la correlation transforme un echo peu visible dans le bruit en pic de detection localisable."
:::

   Même si dans le domaine temporel le signal utile est totalement noyé dans le bruit (impossible à distinguer à l'œil nu sur un oscilloscope à $SNR = 0.4$), l'opération d'intercorrélation accumule l'énergie cohérente du signal sur toute sa durée tout en moyennant le bruit incohérent vers zéro, faisant ressortir le pic de détection avec une grande précision.
:::

:::exercise label="Exercice 5" title="Mesure de la vitesse de défilement d'une plaque métallique"

**Énoncé :**

Pour mesurer la vitesse de défilement $v$ d'une plaque métallique laminée, on place deux capteurs optiques espacés d'une distance connue $L = 0.5 \text{ m}$ le long de la ligne. Les capteurs mesurent les micro-discontinuités (la granularité) de la surface.
Le capteur 1 délivre un signal $x(t)$. Le capteur 2 délivre un signal $y(t)$ qui est une réplique retardée de $x(t)$ d'un temps $\tau_0$ correspondant au temps de parcours entre les deux capteurs : $y(t) = x(t - \tau_0)$. Un corrélateur calcule l'intercorrélation $C_{xy}(t)$ et détecte un pic maximal pour un décalage temporel de $25 \text{ ms}$.

1. Exprimer $C_{xy}(t)$ en fonction de l'autocorrélation $C_{xx}(t)$.
2. En déduire la vitesse de défilement $v$ de la plaque.

**Solution rédigée :**

1. Exprimons l'intercorrélation $C_{xy}(t)$ :

   $$C_{xy}(t) = \int_{-\infty}^{+\infty} x(\tau) y(\tau - t) d\tau$$

   En remplaçant $y(t)$ par son expression $x(t - \tau_0)$ :

   $$C_{xy}(t) = \int_{-\infty}^{+\infty} x(\tau) x(\tau - t - \tau_0) d\tau$$

   On reconnaît la définition de la fonction d'autocorrélation du signal $x(t)$ évaluée au décalage $t + \tau_0$ :

   $$C_{xy}(t) = C_{xx}(t + \tau_0)$$

   Puisque la fonction d'autocorrélation $C_{xx}(\theta)$ d'un signal réel est maximale à l'origine ($\theta = 0$), l'intercorrélation $C_{xy}(t)$ atteint son maximum lorsque son argument est nul, soit :

   $$t + \tau_0 = 0 \implies t = -\tau_0$$

   *(En pratique, selon la convention de signe de la corrélation, le pic apparaît en $t = \tau_0$).*

2. Le pic d'intercorrélation est mesuré à $t = \tau_0 = 25 \text{ ms} = 0.025 \text{ s}$.
   La vitesse de défilement est définie par le ratio de la distance connue $L$ sur le temps de transit $\tau_0$ :

   $$v = \frac{L}{\tau_0} = \frac{0.5 \text{ m}}{0.025 \text{ s}} = 20 \text{ m/s}$$
:::

:::block type="theorem" title="Spectrogramme et Transformée de Fourier à Court Terme (STFT)"
La Transformée de Fourier classique donne une information fréquentielle globale mais perd toute localisation temporelle (on sait quelles fréquences sont présentes, mais pas *quand*).

La **Transformée de Fourier à Court Terme (STFT)** résout ce problème en faisant glisser une fenêtre temporelle $\gamma(t)$ le long du signal et en calculant la TF sur chaque portion tronquée :

$$X(f, \tau) = \int_{-\infty}^{+\infty} x(t) \gamma(t-\tau) e^{-j2\pi ft} dt$$

Le **spectrogramme** est le module au carré de la STFT, offrant une représentation 3D (Temps, Fréquence, Intensité énergétique) :

$$\text{Spectrogramme}(f, \tau) = |X(f, \tau)|^2$$

*   **Easter Egg historique (Doom/Aphex Twin) :** Le spectrogramme est parfois utilisé de manière artistique pour dissimuler des visages ou des équations mathématiques complexes au sein de pistes audio numériques (ex. morceaux d'Aphex Twin, ou le cri de Doom où le spectrogramme révèle une figure en phase/opposition de phase que l'on extrait par simple sommation des canaux gauche et droite puis retournement temporel `flipud`).


:::

:::

:::section id="au331-echantillonnage" eyebrow="Cours 3" title="Echantillonnage et transformees discretes" summary="Comprendre Shannon, le repliement spectral, la TFD, la FFT et le zero padding."

L'échantillonnage consiste à convertir un signal analogique continu $x(t)$ en une suite discrète d'échantillons $x(n) = x(n T_e)$.

:::block type="definition" title="Principe théorique de l'échantillonnage"
Pour modéliser l'échantillonnage, on multiplie le signal continu $x(t)$ par un peigne de Dirac de période $T_e$ (période d'échantillonnage) :

$$x_e(t) = x(t) \cdot \delta_{T_e}(t) = x(t) \cdot \sum_{n=-\infty}^{+\infty} \textstyle \delta(t - n T_e) = \sum_{n=-\infty}^{+\infty} \textstyle x(n T_e) \delta(t - n T_e)$$

Dans le domaine fréquentiel, cette multiplication temporelle se traduit par un produit de convolution du spectre d'origine $X(f)$ avec le spectre du peigne de Dirac :

$$X_e(f) = X(f) * \text{TF}[\delta_{T_e}(t)] = X(f) * \left( F_e \sum_{n=-\infty}^{+\infty} \delta(f - n F_e) \right)$$

$$X_e(f) = F_e \sum_{n=-\infty}^{+\infty} X(f - n F_e)$$

:::figure src="assets/AU331-Traitement-Signal/echantillonnage_shannon_temporel.png" alt="Echantillonnage temporel et periodisation du spectre sans recouvrement." class="td-figure" caption="L'echantillonnage cree des copies du spectre tous les multiples de $F_e$. Shannon impose d'eviter leur recouvrement."
:::

*   **Effet physique de l'échantillonnage :** Le spectre du signal échantillonné est composé du spectre d'origine périodisé (répété à l'infini) tous les multiples de la fréquence d'échantillonnage $F_e = 1/T_e$.

:::

:::block type="theorem" title="Théorème de Shannon et Reconstitution"
Pour pouvoir reconstruire parfaitement le signal continu $x(t)$ à partir de ses échantillons, il faut impérativement éviter le recouvrement des motifs du spectre périodisé.

*   **Condition de Shannon :** La fréquence d'échantillonnage $F_e$ doit être strictement supérieure au double de la fréquence maximale $F_{max}$ contenue dans le signal d'origine :

    $$F_e > 2 F_{max}$$

*   **Reconstitution idéale :** Si la condition de Shannon est respectée, on peut isoler le motif central ($n=0$) du spectre périodisé à l'aide d'un filtre passe-bas analogique idéal (filtre de lissage rectangulaire de gain $T_e$ et de largeur de bande $[-F_e/2, F_e/2]$).
    En reprenant la TF inverse de ce filtrage, on obtient la **formule d'interpolation de Shannon** :

    $$x(t) = \sum_{n=-\infty}^{+\infty} x(n T_e) \cdot \text{sinc}\left(\pi F_e (t - n T_e)\right)$$

:::

:::block type="method" title="Filtre anti-repliement (Anti-aliasing)"
Si le signal contient des composantes fréquentielles ou des bruits parasites au-delà de $F_e/2$, l'échantillonnage va les replier dans la bande utile sous forme d'harmoniques fantômes indésirables (aliasing).

:::figure src="assets/AU331-Traitement-Signal/repliement_spectral.png" alt="Repliement spectral d'une frequence parasite dans la bande utile." class="td-figure" caption="Le repliement spectral transforme une composante hors bande en frequence apparente dans la bande utile."
:::

*   *Exemple concret :* En téléphonie numérique, la parole est limitée à $3.4 \text{ kHz}$. On échantillonne à $F_e = 8 \text{ kHz}$. Si un parasite non audible à $27.5 \text{ kHz}$ est présent et qu'on échantillonne sans filtrage, il va se replier à :

    $$|27.5 \text{ kHz} - 3 \cdot 8 \text{ kHz}| = 3.5 \text{ kHz}$$

    Il devient alors un sifflement parfaitement audible et gênant dans la bande de communication.

*   **Préconisation :** Placer systématiquement un **filtre anti-repliement** (filtre passe-bas analogique passif ou actif) de fréquence de coupure $F_c \le F_e/2$ *avant* l'échantillonneur pour éliminer toute composante au-delà de la fréquence de Nyquist.

:::

:::block type="theorem" title="Transformées de Fourier pour signaux discrets"

*   **Transformée de Fourier à temps discret (TFd) :** S'applique à une suite discrète infinie $x(n)$. Le spectre obtenu $X(f)$ est continu et périodique de période $F_e$ :

    $$X(f) = \text{TFd}[x(n)] = \sum_{n=-\infty}^{+\infty} x(n) e^{-j2\pi f n T_e}$$

    Elle correspond à l'évaluation de la transformée en Z sur le cercle unité ($z = e^{j2\pi f T_e}$).

*   **Transformée de Fourier Discrète (TFD) :** S'applique à une suite de longueur finie de $N$ échantillons. Elle échantillonne à la fois le temps (pas $T_e$) et les fréquences (pas $\Delta f = F_e / N$) :

    $$X(k) = \text{TFD}[x(n)] = \sum_{n=0}^{N-1} x(n) e^{-j2\pi \frac{k \cdot n}{N}} = \sum_{n=0}^{N-1} x(n) W_N^{k \cdot n}$$

    avec le facteur de phase (twiddle factor) $W_N = e^{-j\frac{2\pi}{N}}$.
    *Propriété de symétrie :* Pour un signal réel, $X(N-k) = X^*(k)$.

**Le concept de Zero Padding**

Le zero padding consiste à ajouter des zéros à la fin d'un signal temporel de taille $N$ avant de calculer sa TFD sur $N' > N$ points.

:::figure src="assets/AU331-Traitement-Signal/zero_padding_effect.png" alt="Le zero padding ajoute des points de calcul sur la courbe spectrale." class="td-figure" caption="Le zero padding densifie l'affichage du spectre ; il n'augmente pas la duree d'observation du signal."
:::

*   *Effet :* Il interpole le spectre continu de la TFd en calculant des points intermédiaires. Cela améliore la **résolution visuelle** du tracé du spectre.
*   *Attention :* Il n'augmente absolument pas la **résolution physique** (le pouvoir de séparer deux fréquences très proches), qui dépend uniquement de la durée d'observation réelle du signal $T_{obs} = N \cdot T_e$.

:::

:::exercise label="Exercice 6" title="Calcul de TFD et effet du Zero Padding"

**Énoncé :**

Soit le signal discret à 2 échantillons : $x(n) = [1, 1]$.

1. Calculer la TFD d'ordre 2 de ce signal.
2. On applique un zero padding pour obtenir un signal à 6 échantillons : $x_{zp}(n) = [1, 1, 0, 0, 0, 0]$. Calculer sa TFD d'ordre 6 et montrer qu'elle correspond à l'échantillonnage de la TFd du signal d'origine.

**Solution rédigée :**

1. Pour $N=2$, la TFD s'écrit $X(k) = \sum_{n=0}^{1} x(n) e^{-j2\pi \frac{kn}{2}} = 1 + e^{-j\pi k}$ pour $k \in \{0, 1\}$.
   * Pour $k=0$ : $X(0) = 1 + e^{0} = 2$
   * Pour $k=1$ : $X(1) = 1 + e^{-j\pi} = 1 - 1 = 0$
   La TFD d'ordre 2 est donc $X(k) = [2, 0]$.

2. Calculons la TFd (spectre continu) du signal d'origine $x(n)$ :

   $$X(f) = \sum_{n=0}^{1} x(n) e^{-j2\pi f n T_e} = 1 + e^{-j2\pi f T_e}$$

   En factorisant par la demi-phase :

   $$X(f) = e^{-j\pi f T_e} \left( e^{j\pi f T_e} + e^{-j\pi f T_e} \right) = e^{-j\pi f T_e} \cdot 2\cos(\pi f T_e)$$

   En fréquence normalisée $\nu = f/F_e = f T_e$, le module vaut :

   $$|X(\nu)| = 2|\cos(\pi \nu)|$$

   Calculons maintenant la TFD d'ordre 6 du signal avec zero padding $x_{zp}(n)$ ($N'=6$) :

   $$X_{zp}(k) = \sum_{n=0}^{5} x_{zp}(n) e^{-j2\pi \frac{kn}{6}} = 1 + e^{-j\frac{2\pi k}{6}} = 1 + e^{-j\frac{\pi k}{3}}$$

   Pour $k \in \{0, 1, 2, 3, 4, 5\}$ :
   *   $k=0$ : $X_{zp}(0) = 1 + 1 = 2$
   *   $k=1$ : $X_{zp}(1) = 1 + e^{-j\pi/3} = 1 + \cos(\pi/3) - j\sin(\pi/3) = 1.5 - j\frac{\sqrt{3}}{2} \implies |X_{zp}(1)| = \sqrt{1.5^2 + 0.75} = \sqrt{3} \approx 1.732$
   *   $k=2$ : $X_{zp}(2) = 1 + e^{-j2\pi/3} = 1 - 0.5 - j\frac{\sqrt{3}}{2} = 0.5 - j\frac{\sqrt{3}}{2} \implies |X_{zp}(2)| = 1$
   *   $k=3$ : $X_{zp}(3) = 1 + e^{-j\pi} = 0$
   *   $k=4$ : Par symétrie, $X_{zp}(4) = X_{zp}^*(2) = 0.5 + j\frac{\sqrt{3}}{2} \implies |X_{zp}(4)| = 1$
   *   $k=5$ : Par symétrie, $X_{zp}(5) = X_{zp}^*(1) = 1.5 + j\frac{\sqrt{3}}{2} \implies |X_{zp}(5)| = \sqrt{3}$

   Vérifions que ces valeurs échantillonnent la TFd $X(\nu)$ aux fréquences discrètes $\nu_k = k/N' = k/6$ :
   *   Pour $k=0$ ($\nu=0$) : $|X(0)| = 2|\cos(0)| = 2$. Cohérent avec $X_{zp}(0)$.
   *   Pour $k=1$ ($\nu=1/6$) : $|X(1/6)| = 2|\cos(\pi/6)| = 2 \frac{\sqrt{3}}{2} = \sqrt{3}$. Cohérent avec $X_{zp}(1)$.
   *   Pour $k=2$ ($\nu=2/6=1/3$) : $|X(1/3)| = 2|\cos(\pi/3)| = 2 \cdot 0.5 = 1$. Cohérent avec $X_{zp}(2)$.
   *   Pour $k=3$ ($\nu=3/6=1/2$) : $|X(1/2)| = 2|\cos(\pi/2)| = 0$. Cohérent avec $X_{zp}(3)$.
   On retrouve bien les échantillons de la courbe de TFd continue. Le zero padding a permis de "densifier" le tracé fréquentiel sans changer le signal d'origine.
:::

:::block type="method" title="Algorithme de Transformée de Fourier Rapide (FFT)"
La TFD sur $N$ points nécessite théoriquement $N^2$ multiplications complexes et $N(N-1)$ additions complexes, soit une complexité algorithmique de **$\mathcal{O}(2N^2)$** opérations.

L'algorithme de la **FFT (Fast Fourier Transform)** de Cooley-Tukey (à décimation temporelle) réduit cette complexité à **$\mathcal{O}(N \log_2 N)$** en exploitant les symétries et périodicités des twiddle factors $W_N^{kn}$.

*   **Principe de séparation pair/impair :** On sépare la somme de la TFD en deux TFD d'ordre $N/2$, l'une sur les indices pairs, l'autre sur les indices impairs :

    $$X(k) = \sum_{n=0}^{N/2-1} x(2n) W_{N/2}^{kn} + W_N^k \sum_{n=0}^{N/2-1} x(2n+1) W_{N/2}^{kn} = A(k) + W_N^k B(k)$$

*   **Structure en papillon (Cooley-Tukey) :** Grâce à la propriété $W_N^{k+N/2} = -W_N^k$, on calcule simultanément deux points du spectre à partir d'une seule multiplication :

    $$X(k) = A(k) + W_N^k B(k)$$

    $$X\left(k + \frac{N}{2}\right) = A(k) - W_N^k B(k)$$

*   **Bit Reversal :** Pour appliquer l'entrelacement temporel récursif, les échantillons d'entrée doivent être triés selon l'ordre binaire inversé (ex. l'échantillon $x(1)$ d'indice binaire `001` est placé à l'adresse `100` soit l'indice $4$).


:::

:::

:::section id="au331-systemes-rif" eyebrow="Cours 4" title="Systemes discrets et filtres RIF" summary="Analyser les systemes discrets avec la transformee en Z et synthetiser des filtres RIF."

Les filtres RIF (Réponse Impulsionnelle Finie) sont les structures de filtrage numérique les plus utilisées pour leur stabilité inconditionnelle et leur capacité à présenter une phase rigoureusement linéaire.

:::block type="theorem" title="La Transformée en Z (Tz)"
La transformée en Z est l'homologue discret de la transformée de Laplace. Elle convertit les équations aux différences temporelles en polynômes algébriques simples de la variable complexe $z = e^{p T_e}$.

*   **Formule de définition :**

    $$X(z) = \text{Tz}[x(n)] = \sum_{n=-\infty}^{+\infty} x(n) z^{-n}$$

*   **Région de convergence (ROC) :** Domaine du plan complexe $z$ où la somme converge absolument. On la détermine en appliquant la règle de d'Alembert sur la suite $a(n) = x(n)z^{-n}$.
*   **Propriété du retard (Translation temporelle) :**

    $$\text{Tz}[x(n-k)] = z^{-k} X(z)$$

**Transformée en Z inverse par décomposition en éléments simples**

Pour inverser une fonction rationnelle $X(z)$, la méthode la plus robuste consiste à décomposer la fraction $\frac{X(z)}{z}$ en éléments simples :

$$\frac{X(z)}{z} = \sum_{i} \frac{C_i}{z - z_i} \implies X(z) = \sum_{i} \frac{C_i \cdot z}{z - z_i}$$

Les résidus $C_i$ sont calculés par : $C_i = \left[ (z - z_i) \frac{X(z)}{z} \right]_{z=z_i}$.
On utilise ensuite le dictionnaire des transformées usuelles de signaux causaux :

$$\text{Tz}^{-1}\left[ \frac{z}{z-z_i} \right] = (z_i)^n u(n)$$

:::

:::exercise label="Exercice 7" title="Résolution d'une équation aux différences par Tz et étude du régime transitoire/permanent"

**Énoncé :**

Soit un système discret récursif du premier ordre décrit par l'équation aux différences :

$$y(n) = x(n) + b \cdot y(n-1) \quad \text{avec } y(-1) = a \text{ (condition initiale)}$$

On pose $b = -0.8$.

1. Calculer la réponse $y(n)$ à une entrée échelon unité $x(n) = u(n)$ pour une condition initiale nulle ($a=0$).
2. Déterminer la fonction de transfert $H(z)$ du système, ses pôles et zéros, et étudier sa stabilité.
3. Déterminer la réponse en fréquence $H(f)$ du système, exprimer son module et sa phase, et en déduire la nature du filtre.

**Solution rédigée :**

1. Appliquons la transformée en Z unilatérale ($\text{Tz}^+$) à l'équation aux différences pour prendre en compte les conditions initiales. On rappelle la formule du retard pour la transformée unilatérale :

   $$\text{Tz}^+[y(n-1)] = z^{-1} Y(z) + y(-1)$$

   En appliquant la transformée à l'équation :

   $$Y(z) = X(z) + b \left[ z^{-1}Y(z) + y(-1) \right] = X(z) + b z^{-1}Y(z) + a \cdot b$$

   En regroupant les termes en $Y(z)$ :

   $$Y(z) (1 - b z^{-1}) = X(z) + a \cdot b \implies Y(z) = \frac{X(z)}{1 - b z^{-1}} + \frac{a \cdot b}{1 - b z^{-1}}$$

   Pour $a=0$ (condition initiale nulle) et une entrée échelon $x(n) = u(n) \implies X(z) = \frac{z}{z-1} = \frac{1}{1-z^{-1}}$, on a :

   $$Y(z) = \frac{1}{(1 - b z^{-1})(1 - z^{-1})} = \frac{z^2}{(z - b)(z - 1)}$$

   Décomposons $\frac{Y(z)}{z}$ en éléments simples :

   $$\frac{Y(z)}{z} = \frac{z}{(z-b)(z-1)} = \frac{C_1}{z-b} + \frac{C_2}{z-1}$$

   Calculons les résidus $C_1$ et $C_2$ :

   $$C_1 = \left[ (z-b) \frac{z}{(z-b)(z-1)} \right]_{z=b} = \frac{b}{b-1}$$

   $$C_2 = \left[ (z-1) \frac{z}{(z-b)(z-1)} \right]_{z=1} = \frac{1}{1-b}$$

   On a donc :

   $$Y(z) = \frac{b}{b-1} \frac{z}{z-b} + \frac{1}{1-b} \frac{z}{z-1}$$

   En inversant terme à terme :

   $$y(n) = \left[ \frac{b}{b-1} b^n + \frac{1}{1-b} (1)^n \right] u(n) = \frac{1}{1-b} \left[ 1 - b^{n+1} \right] u(n)$$

   En faisant l'application numérique avec $b = -0.8$ :

   $$y(n) = \frac{1}{1 - (-0.8)} \left[ 1 - (-0.8)^{n+1} \right] u(n) = \frac{1}{1.8} \left[ 1 - (-0.8)^{n+1} \right] u(n)$$

   *Analyse du régime :*
   * Le terme $\frac{1}{1.8} \approx 0.556$ représente la réponse en **régime permanent**.
   * Le terme oscillant alterné $-\frac{1}{1.8} (-0.8)^{n+1}$ s'amortit et tend vers $0$ quand $n \to +\infty$ : il s'agit du **régime transitoire**.

2. **Fonction de transfert $H(z)$ :**
   Pour une condition initiale nulle ($a=0$), on a :

   $$H(z) = \frac{Y(z)}{X(z)} = \frac{1}{1 - b z^{-1}} = \frac{z}{z - b} = \frac{z}{z + 0.8}$$

   *   **Zéro :** $z_0 = 0$ (origine du plan complexe).
   *   **Pôle :** $p_0 = b = -0.8$.
   *   **Stabilité :** Un système discret est stable si et seulement si tous les pôles de sa fonction de transfert sont situés strictement **à l'intérieur du cercle unité** du plan complexe $z$ ($|p_i| < 1$). Ici, $|p_0| = |-0.8| = 0.8 < 1$. Le système est donc inconditionnellement **stable**.

3. **Réponse en fréquence $H(f)$ :**
   On l'obtient en évaluant $H(z)$ sur le cercle unité ($z = e^{j2\pi f T_e}$) :

   $$H(f) = \frac{1}{1 - b e^{-j2\pi f T_e}} = \frac{1}{1 + 0.8 e^{-j2\pi f T_e}}$$

   Le module au carré vaut :

   $$|H(f)|^2 = H(f) H^*(f) = \frac{1}{(1 + 0.8 \cos(2\pi f T_e))^2 + (0.8 \sin(2\pi f T_e))^2} = \frac{1}{1.64 + 1.6\cos(2\pi f T_e)}$$

   *   Pour $f = 0$ (basses fréquences) : $\cos(0) = 1 \implies |H(0)| = \frac{1}{\sqrt{3.24}} = \frac{1}{1.8} \approx 0.556$.
   *   Pour $f = F_e/2$ (fréquence de Nyquist, hautes fréquences) : $\cos(\pi) = -1 \implies |H(F_e/2)| = \frac{1}{\sqrt{0.04}} = \frac{1}{0.2} = 5$.
   *   *Conclusion :* Le filtre atténue les basses fréquences et amplifie fortement les hautes fréquences. Il s'agit d'un **filtre passe-haut**.
:::

:::block type="theorem" title="Filtres à Réponse Impulsionnelle Finie (RIF)"
Un filtre RIF est caractérisé par une réponse impulsionnelle $h(n)$ de durée finie $N$ échantillons.

*   **Équation aux différences :**

    $$y(n) = \sum_{k=0}^{N-1} b_k x(n-k)$$

*   **Fonction de transfert en Z :**

    $$H(z) = \sum_{n=0}^{N-1} b_n z^{-n}$$

    Puisque $H(z)$ est un simple polynôme en $z^{-1}$, le système ne possède **aucun pôle** (hormis à l'origine $z=0$). En l'absence de pôles, les filtres RIF sont **inconditionnellement stables**.

**Structure de réalisation directe d'un RIF**

Le calcul de la sortie nécessite uniquement des opérations d'addition, de multiplication par les coefficients $b_k$ (qui sont les valeurs mêmes de la réponse impulsionnelle $h(k)$) et des retards élémentaires $z^{-1}$ :

:::figure src="assets/AU331-Traitement-Signal/structure_directe_rif.png" alt="Structure directe d'un filtre RIF avec retards, coefficients et sommateur." class="td-figure" caption="Un filtre RIF est une somme ponderee de versions retardees de l'entree."
:::

:::

:::block type="theorem" title="Filtres RIF à phase linéaire"
Pour éviter toute distorsion de phase (qui déformerait les signaux non sinusoïdaux composites comme les signaux carrés ou de données), un filtre doit présenter un retard de groupe $\tau$ constant pour toutes les fréquences. Cela impose une phase linéaire :

$$\varphi(f) = -2\pi \cdot \tau \cdot f$$

**Conditions de phase linéaire**
Pour obtenir une phase linéaire, la réponse impulsionnelle $h(n)$ doit être symétrique ou antisymétrique par rapport à son milieu $\frac{N-1}{2}$ :

*   **Symétrie (Filtre de type I ou II) :** $h(n) = h(N-1-n)$
*   **Antisymétrie (Filtre de type III ou IV) :** $h(n) = -h(N-1-n)$

Le retard de groupe (temps de propagation à travers le filtre) est alors fixe et égal à :

$$\tau = \frac{N-1}{2} \text{ échantillons}$$

:::

:::exercise label="Exercice 8" title="Analyse d'un filtre RIF élémentaire à phase linéaire"

**Énoncé :**

Soit le système discret décrit par l'équation aux différences : $y(n) = \frac{1}{4} \left( x(n) + 2x(n-1) + x(n-2) \right)$.

1. Déterminer sa réponse impulsionnelle $h(n)$. Vérifier qu'il s'agit d'un filtre RIF à phase linéaire.
2. Calculer sa réponse fréquentielle $H(f)$ et exprimer de manière explicite son module et sa phase.

**Solution rédigée :**

1. La réponse impulsionnelle s'obtient en injectant une impulsion de Dirac $\delta(n)$ en entrée :

   $$h(n) = \frac{1}{4} \left( \delta(n) + 2\delta(n-1) + \delta(n-2) \right)$$

   On identifie les coefficients : $h(0) = 1/4$, $h(1) = 1/2$, $h(2) = 1/4$, et $h(n) = 0$ ailleurs.
   La longueur du filtre est $N=3$ (ordre $2$).
   On vérifie la condition de symétrie : $h(0) = h(2) = 1/4$. La réponse impulsionnelle est symétrique par rapport à $n=1$. Le filtre présente donc une phase rigoureusement linéaire, avec un retard constant de $\tau = (N-1)/2 = 1$ échantillon.

2. Calculons la réponse fréquentielle $H(f)$ :

   $$H(f) = \sum_{n=0}^{2} h(n) e^{-j2\pi f n T_e} = \frac{1}{4} + \frac{1}{2}e^{-j2\pi f T_e} + \frac{1}{4}e^{-j4\pi f T_e}$$

   Factorisons par le terme central correspondant au retard $e^{-j2\pi f T_e}$ :

   $$H(f) = e^{-j2\pi f T_e} \left( \frac{1}{4} e^{j2\pi f T_e} + \frac{1}{2} + \frac{1}{4} e^{-j2\pi f T_e} \right)$$

   En utilisant la formule d'Euler pour le cosinus :

   $$H(f) = e^{-j2\pi f T_e} \left( \frac{1}{2} \cos(2\pi f T_e) + \frac{1}{2} \right) = e^{-j2\pi f T_e} \cdot \frac{1}{2} \left( 1 + \cos(2\pi f T_e) \right)$$

   En utilisant l'identité trigonométrique $1 + \cos(2\theta) = 2\cos^2(\theta)$ :

   $$H(f) = e^{-j2\pi f T_e} \cdot \cos^2(\pi f T_e)$$

   On peut séparer le module et la phase :
   *   **Module :** $|H(f)| = \cos^2(\pi f T_e)$
   *   **Phase :** $\varphi(f) = -2\pi f T_e$ (qui est bien une fonction linéaire de la fréquence).
:::

:::block type="neutral" title="Méthode de synthèse par la fenêtre"
La synthèse par fenêtre permet de concevoir un filtre RIF causal à phase linéaire approchant un gabarit idéal.

1.  **Réponse idéale :** On définit le filtre idéal non causal (déphasage nul) de fréquence de coupure $f_c$ :

    $$H_{ideal}(f) = 1 \text{ pour } |f| \le f_c \quad \text{et } 0 \text{ pour } f \in [-F_e/2, F_e/2]$$

2.  **Réponse impulsionnelle idéale (infinie) :** Par TF inverse de $H_{ideal}(f)$ :

    $$h_{ideal}(n) = \frac{1}{F_e} \int_{-f_c}^{f_c} e^{j2\pi f n T_e} df = 2 \frac{f_c}{F_e} \text{sinc}\left(2\pi \frac{f_c}{F_e} n\right)$$

3.  **Troncature et Apodisation :** Pour limiter la réponse à $N$ échantillons, on multiplie $h_{ideal}(n)$ par une fenêtre de pondération $w_N(n)$ :

    $$h_T(n) = h_{ideal}(n) \cdot w_N(n) \quad \text{pour } n \in \left[ -\frac{N-1}{2}, \frac{N-1}{2} \right]$$

4.  **Causalisation :** On décale temporellement la réponse de $\frac{N-1}{2}$ échantillons vers la droite pour rendre le système causal :

    $$h_{causal}(n) = h_T\left(n - \frac{N-1}{2}\right) \quad \text{pour } n \in [0, N-1]$$

**Calcul empirique de l'ordre du filtre**

Pour satisfaire un gabarit avec des ondulations maximales de $\delta_p$ en bande passante, $\delta_a$ en bande atténuée, et une bande de transition $\Delta f$, on estime la longueur $N$ minimale par la **relation empirique** :

$$N \approx \frac{2}{3} \log_{10}\left( \frac{1}{10 \cdot \delta_p \cdot \delta_a} \right) \frac{F_e}{\Delta f}$$

:::

:::exercise label="Exercice 9" title="Synthèse complète d'un filtre RIF passe-bas de type &quot;Half-Band&quot;"

**Énoncé :**

On souhaite concevoir un filtre passe-bas numérique RIF de longueur $N = 17$ coefficients (ordre $16$), à phase linéaire. La fréquence de coupure souhaitée est $f_c = F_e/4$.

1. Déterminer la réponse impulsionnelle du filtre idéal non causal.
2. Appliquer une troncature par fenêtre rectangulaire pour obtenir les coefficients du filtre causal.
3. Analyser la valeur de certains coefficients. Quelle est la particularité de cette structure ?
4. Donner l'expression de la fonction de transfert $H(z)$ et l'équation aux différences finale du filtre causal synthétisé.

**Solution rédigée :**

1. Le filtre idéal a une fréquence de coupure normalisée $\nu_c = f_c/F_e = 1/4$.
   Sa réponse impulsionnelle idéale est :

   $$h_{ideal}(n) = 2\nu_c \cdot \text{sinc}(2\pi \nu_c n) = 2 \left(\frac{1}{4}\right) \text{sinc}\left(2\pi \frac{1}{4} n\right) = 0.5 \cdot \text{sinc}\left(\frac{\pi n}{2}\right)$$

   En explicitant le sinus cardinal :

   $$h_{ideal}(n) = 0.5 \frac{\sin(\pi n / 2)}{\pi n / 2} = \frac{\sin(\pi n / 2)}{\pi n}$$

2. On applique une troncature rectangulaire sur $N = 17$ points (pour $n \in [-8, 8]$) puis on décale de $8$ échantillons pour rendre le filtre causal (coefficients $h_c(n)$ pour $n \in [0, 16]$) :

   $$h_c(n) = h_{ideal}(n-8) = \frac{\sin\left(\frac{\pi (n-8)}{2}\right)}{\pi (n-8)}$$

   Calculons les coefficients un par un :
   *   **Échantillon central (n=8) :** Par prolongement par continuité, $h_c(8) = h_{ideal}(0) = 0.5$.
   *   **Pour n impair (retards impairs par rapport au centre) :**
       *   $n=7, 9 \implies n-8 = \pm 1 \implies h_c(7) = h_c(9) = \frac{\sin(\pm \pi/2)}{\pm \pi} = \frac{1}{\pi} \approx 0.3183$
       *   $n=5, 11 \implies n-8 = \pm 3 \implies h_c(5) = h_c(11) = \frac{\sin(\pm 3\pi/2)}{\pm 3\pi} = -\frac{1}{3\pi} \approx -0.1061$
       *   $n=3, 13 \implies n-8 = \pm 5 \implies h_c(3) = h_c(13) = \frac{\sin(\pm 5\pi/2)}{\pm 5\pi} = \frac{1}{5\pi} \approx 0.0637$
       *   $n=1, 15 \implies n-8 = \pm 7 \implies h_c(1) = h_c(15) = \frac{\sin(\pm 7\pi/2)}{\pm 7\pi} = -\frac{1}{7\pi} \approx -0.0455$
   *   **Pour n pair différent de 8 (retards pairs par rapport au centre) :**
       *   $n-8$ est un entier pair non nul $\pm 2, \pm 4, \pm 6, \pm 8$.
       *   $\sin\left(\frac{\pi (n-8)}{2}\right) = \sin(\pm k\pi) = 0$ (avec $k \in \mathbb{E}^*$).
       *   Par conséquent : $h_c(0) = h_c(2) = h_c(4) = h_c(6) = h_c(10) = h_c(12) = h_c(14) = h_c(16) = 0$.

3. **Particularité de la structure ("Half-Band Filter") :**
   Le choix d'une fréquence de coupure $f_c = F_e/4$ (pile au milieu de la bande de Nyquist $[0, F_e/2]$) annule un échantillon sur deux de la réponse impulsionnelle (tous les coefficients pairs sauf le centre).
   *Intérêt d'implémentation :* Sur les 17 coefficients théoriques du filtre, 8 coefficients sont nuls. Lors du codage dans un processeur de signal (DSP) ou un FPGA, cela permet d'économiser près de 50 % des opérations de multiplication-accumulation, rendant le traitement extrêmement rapide et économique en ressources matérielles.

4. **Fonction de transfert $H(z)$ et équation aux différences :**

   $$H(z) = \sum_{n=0}^{16} h_c(n) z^{-n}$$

   $$H(z) = -\frac{1}{7\pi} z^{-1} + \frac{1}{5\pi} z^{-3} - \frac{1}{3\pi} z^{-5} + \frac{1}{\pi} z^{-7} + 0.5 z^{-8} + \frac{1}{\pi} z^{-9} - \frac{1}{3\pi} z^{-11} + \frac{1}{5\pi} z^{-13} - \frac{1}{7\pi} z^{-15}$$

   L'équation aux différences temporelle du filtre s'écrit :

   $$\begin{aligned}

y(n) ={}& -0.0455 \left[ x(n-1) + x(n-15) \right] + 0.0637 \left[ x(n-3) + x(n-13) \right] \\
& -0.1061 \left[ x(n-5) + x(n-11) \right] + 0.3183 \left[ x(n-7) + x(n-9) \right] + 0.5 x(n-8)

\end{aligned}$$

   *(Note : la factorisation des termes symétriques met en évidence la simplification matérielle permise par la phase linéaire).*
:::

:::
:::

:::section id="au331-td" eyebrow="Travaux diriges" title="TD AU331-Traitement-Signal corriges" summary="Les TD de traitement du signal sont accessibles separement pour travailler chaque bloc du cours."
:::dashboard
:::card class="chapter-card" pill="TD 1" title="Signaux deterministes a temps continu et convolution" href="AU331-Traitement-Signal-td1.html" link="Ouvrir la page corrigee"
Energie, transformee de Fourier, brouillage spectral et convolution.
:::

:::card class="chapter-card" pill="TD 2" title="Analyse spectrale et correlation" href="AU331-Traitement-Signal-td2.html" link="Ouvrir la page corrigee"
Intercorrelation, autocorrelation et theoreme de Parseval.
:::

:::card class="chapter-card" pill="TD 3" title="Echantillonnage, repliement et transformees discretes" href="AU331-Traitement-Signal-td3.html" link="Ouvrir la page corrigee"
Repliement spectral, TFD, etalonnage de spectre et zero padding.
:::

:::card class="chapter-card" pill="TD 4" title="Systemes discrets, transformee en Z et filtres RIF" href="AU331-Traitement-Signal-td4.html" link="Ouvrir la page corrigee"
Transformee en Z monolaterale et synthese de filtres RIF.
:::
:::
:::

:::section id="au331-revision" eyebrow="Revision" title="Fiche finale AU331" summary="Les reflexes a garder pour traiter rapidement un exercice de signal."

:::grid two-col
:::block type="remember" title="Formules a verrouiller"
- Energie : $E_x = \int_{-\infty}^{+\infty} |x(t)|^2 dt$.
- Puissance periodique : $P_x = \frac{1}{T_0} \int_0^{T_0} |x(t)|^2 dt$.
- Fourier : $X(f) = \int x(t)e^{-j2\pi ft}dt$.
- Convolution : $\text{TF}[x*h] = X(f)H(f)$.
- Shannon : $F_e > 2f_{max}$.
- RIF : $y(n)=\sum_{k=0}^{N-1} h(k)x(n-k)$.
:::

:::block type="method" title="Reflexe exercice"

1. Identifier si le signal est continu ou discret, fini ou periodique.
2. Choisir le bon domaine : temps, frequence, Z ou discret.
3. Controler les unites : secondes, hertz, radians, echantillons.
4. Verifier la symetrie du resultat et les cas limites.
5. Conclure physiquement : filtrage, retard, energie, stabilite ou repliement.
:::
:::
:::
