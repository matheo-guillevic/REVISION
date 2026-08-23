---
title: "TD 2 corrige - Éléments d'analyse spectrale & Corrélation"
subject: "AU331-Traitement-Signal"
type: "td"
target: "AU331-Traitement-Signal-td2.html"
eyebrow: "AU331 - TD 2"
heading: "Éléments d'analyse spectrale & Corrélation"
summary: "Corrige maintenu en Markdown."
---

:::exercise label="Exercice 1" title="Détection des discontinuités par intercorrélation"
**Énoncé :**

On considère un signal de mesure bruité ou discontinu $x(t)$ :
$$x(t) = \begin{cases} 1 & \text{si } t \in [0, 4] \\ -1 & \text{si } t \in ]4, 6] \\ 0 & \text{ailleurs} \end{cases}$$
On cherche à détecter la transition franche (discontinuité en $t=4$) à l'aide de deux fonctions de corrélation différentes :
1. Avec un signal court $y(t) = \text{rect}_1(t - 0.5) \cdot \sin(2\pi F t)$ avec $F=1$ Hz (largeur 1).
2. Avec un signal dilaté $z(t) = y(t/4)$ (largeur 4).
Calculer les deux fonctions d'intercorrélation $C_{xy}(t)$ et $C_{xz}(t)$. Laquelle révèle le mieux la transition ?

:::block type="method" title="Methode de resolution"

1. **Rappel de la formule de l'intercorrélation :**
   $$C_{xy}(t) = \int_{-\infty}^{+\infty} x(\tau) y(\tau - t) d\tau$$
2. **Interprétation physique :** L'intercorrélation fait glisser la fonction de test ($y$ ou $z$) le long du signal à analyser $x$.
3. **Analyse de la discontinuité :** Au passage de la discontinuité (en $t = 4$), le signal $x(t)$ bascule instantanément de $+1$ à $-1$.
   * La fonction $y(t)$ étant très étroite (largeur 1), elle va réagir de manière extrêmement brusque à ce changement, provoquant une transition très raide (forte pente) de l'intercorrélation $C_{xy}(t)$ centrée autour du point de transition.
   * La fonction $z(t)$ étant large (largeur 4), elle va réaliser un lissage (effet moyenneur) de la discontinuité sur un large intervalle, rendant le pic ou la transition de $C_{xz}(t)$ très floue et étalée.

:::

:::block type="theorem" title="Correction detaillee et conclusion"

L'intercorrélation $C_{xy}(t)$ avec la fenêtre étroite de largeur 1 donne un signal qui présente une variation extrêmement rapide (pente maximale) exactement à l'instant où la fenêtre chevauche la transition $t = 4$.

En revanche, avec $z(t) = y(t/4)$ de largeur 4, la transition est étalée sur un intervalle temporel de 4 secondes.

**Conclusion :** C'est le signal **$y(t)$ (le plus court)** qui révèle le mieux, par l'intermédiaire de sa fonction d'intercorrélation $C_{xy}(t)$, la discontinuité contenue dans $x(t)$. En traitement du signal, cela illustre le **compromis de résolution temporelle** : plus la fenêtre d'analyse est courte, meilleure est la localisation temporelle des événements transitoires ou des discontinuités.

:::

:::block type="warning" title="Warning d'examen"

Ne confondez pas le produit de convolution et l'intercorrélation. Pour deux signaux réels, la convolution implique un retournement temporel ($y(t-\tau)$) alors que l'intercorrélation n'en comporte pas ($y(\tau-t)$). Si la fonction de test n'est pas paire, les résultats seront différents !
:::
:::

:::exercise label="Exercice 2" title="Autocorrélation d'une fonction rectangle &amp; Théorème de Parseval"
**Énoncé :**

1. Établir le théorème de Parseval pour un signal d'énergie finie.
2. Calculer la fonction d'autocorrélation d'une fonction porte réelle et paire $x(t) = \text{rect}_T(t)$ et montrer que la valeur en $t=0$ est égale à l'énergie totale du signal.

:::block type="method" title="Methode de resolution"

1. **Théorème de Parseval :** Partir de l'expression de l'énergie temporelle, remplacer l'un des signaux par sa transformée de Fourier inverse et inverser les intégrales.
2. **Autocorrélation :** Appliquer la définition pour un signal réel et pair :
   $$C_x(t) = \int_{-\infty}^{+\infty} x(\tau) x(\tau - t) d\tau = x(t) * x(-t)$$
   Puisque $x(t)$ est réelle et paire, $x(-t) = x(t)$, donc l'autocorrélation est rigoureusement identique au produit de convolution de la porte avec elle-même.

:::

:::block type="theorem" title="Correction analytique detaillee"

**1. Démonstration du Théorème de Parseval :**
Soit $x(t)$ et $y(t)$ deux signaux complexes d'énergie finie.
$$\int_{-\infty}^{+\infty} x(t) y^*(t) dt = \int_{-\infty}^{+\infty} \left[ \int_{-\infty}^{+\infty} X(f) e^{j2\pi f t} df \right] y^*(t) dt$$
En inversant l'ordre des intégrations (Fubini) :
$$\int_{-\infty}^{+\infty} X(f) \left[ \int_{-\infty}^{+\infty} y^*(t) e^{j2\pi f t} dt \right] df = \int_{-\infty}^{+\infty} X(f) \left[ \int_{-\infty}^{+\infty} y(t) e^{-j2\pi f t} dt \right]^* df$$
On reconnaît l'expression de la transformée de Fourier de $y(t)$ sous le conjugué :
$$\int_{-\infty}^{+\infty} x(t) y^*(t) dt = \int_{-\infty}^{+\infty} X(f) Y^*(f) df$$
Pour $y(t) = x(t)$, on obtient la forme classique de Parseval :
$$E_x = \int_{-\infty}^{+\infty} |x(t)|^2 dt = \int_{-\infty}^{+\infty} |X(f)|^2 df$$

**2. Autocorrélation d'une fonction porte $x(t) = \text{rect}_T(t)$ :**
Le signal est nul en dehors de $[-T/2, T/2]$.
L'autocorrélation s'écrit :
$$C_x(t) = \int_{-\infty}^{+\infty} \text{rect}_T(\tau) \text{rect}_T(\tau - t) d\tau$$
La fonction mobile est non nulle pour $\tau \in [t - T/2, t + T/2]$.
L'intersection de $[-T/2, T/2]$ et $[t - T/2, t + T/2]$ est non nulle uniquement si $|t| < T$.
*   **Si $t \in [0, T]$ :** L'intersection est $[\tau_{start}, \tau_{end}] = [t - T/2, T/2]$.
    $$C_x(t) = \int_{t - T/2}^{T/2} 1 \cdot d\tau = \frac{T}{2} - \left( t - \frac{T}{2} \right) = T - t$$
*   **Si $t \in [-T, 0]$ :** Par parité de l'autocorrélation, $C_x(t) = C_x(-t) = T + t$.

On obtient une fonction triangle d'amplitude $T$ et de support $[-T, T]$ :
$$C_x(t) = T \cdot \text{tri}_T(t)$$

**Évaluation en $t = 0$ :**
$$C_x(0) = T$$
Calculons l'énergie totale du signal directement dans le domaine temporel :
$$E_x = \int_{-\infty}^{+\infty} |\text{rect}_T(t)|^2 dt = \int_{-T/2}^{T/2} 1^2 \cdot dt = T$$
On a bien $C_x(0) = E_x$.
:::
:::
