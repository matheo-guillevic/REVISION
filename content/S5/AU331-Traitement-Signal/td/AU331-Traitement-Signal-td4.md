---
title: "TD 4 corrige - Systèmes discrets, Transformée en Z et Filtres RIF"
subject: "AU331-Traitement-Signal"
type: "td"
target: "AU331-Traitement-Signal-td4.html"
eyebrow: "AU331 - TD 4"
heading: "Systèmes discrets, Transformée en Z et Filtres RIF"
summary: "Corrige maintenu en Markdown."
---

:::exercise label="Exercice de l'Examen 2014" title="Résolution par Transformée en Z monolatérale"
**Énoncé (Examen 2014 - Exercice IV) :**
Soit un système discret régi par l'équation aux différences :
$$y(n) = a \cdot x(n) + b \cdot y(n - 2)$$
avec $a$ et $b$ des constantes réelles, $x(n)$ le signal d'entrée et $y(n)$ la sortie. Les conditions initiales du système sont non nulles : $y(-1) \ne 0$ et $y(-2) \ne 0$.
1. Démontrer la formule de retard pour la transformée en Z monolatérale ($Tz^+$) :
   $$Tz^+[y(n - 2)] = z^{-2} Y^+(z) + y(-2) + z^{-1} y(-1)$$
2. Déterminer, en utilisant la transformée en Z monolatérale, l'expression de la réponse du système $Y^+(z)$ à un signal d'entrée quelconque $x(n)$ causal. Identifier la réponse libre et la réponse forcée.

:::block type="method" title="Methode de resolution"

1. **Démonstration de la propriété de retard ($Tz^+$) :**
   Appliquer la définition de la transformée en Z monolatérale :
   $$Tz^+[y(n - 2)] = \sum_{n=0}^{+\infty} y(n - 2) z^{-n}$$
   Effectuer un changement de variable d'indice $m = n - 2$ pour faire apparaître les termes temporels négatifs ($y(-1)$ et $y(-2)$).
2. **Application de la $Tz^+$ à l'équation aux différences :**
   Transformer chaque terme de l'équation, regrouper les termes en $Y^+(z)$ d'un côté et isoler $Y^+(z)$.
3. **Identification des réponses :**
   * La **réponse forcée** (ou réponse d'état nul) est la partie de l'équation qui dépend exclusivement de l'entrée $x(n)$.
   * La **réponse libre** (ou réponse d'entrée nulle) est la partie qui dépend exclusivement des conditions initiales $y(-1)$ et $y(-2)$.

:::

:::block type="theorem" title="Correction analytique detaillee"

**1. Démonstration de la formule de retard :**
Par définition :
$$Tz^+[y(n - 2)] = \sum_{n=0}^{+\infty} y(n - 2) z^{-n}$$
Développons les premiers termes de cette somme :
$$Tz^+[y(n - 2)] = y(-2) z^{0} + y(-1) z^{-1} + y(0) z^{-2} + y(1) z^{-3} + y(2) z^{-4} + \dots$$
$$Tz^+[y(n - 2)] = y(-2) + z^{-1} y(-1) + z^{-2} \sum_{n=2}^{+\infty} y(n - 2) z^{-(n-2)}$$

Posons le changement d'indice $m = n - 2$ dans la somme restante (quand $n=2$, $m=0$) :
$$\sum_{n=2}^{+\infty} y(n - 2) z^{-(n-2)} = \sum_{m=0}^{+\infty} y(m) z^{-m} = Y^+(z)$$

En remplaçant cette somme, on obtient la relation recherchée :
$$Tz^+[y(n - 2)] = z^{-2} Y^+(z) + y(-2) + z^{-1} y(-1)$$

**2. Résolution du système discret :**
Appliquons la $Tz^+$ monolatérale à notre équation aux différences $y(n) = a \cdot x(n) + b \cdot y(n - 2)$ :
$$Y^+(z) = a \cdot X^+(z) + b \cdot Tz^+[y(n - 2)]$$
$$Y^+(z) = a \cdot X^+(z) + b \cdot \left[ z^{-2} Y^+(z) + y(-2) + z^{-1} y(-1) \right]$$

Regroupons les termes contenant $Y^+(z)$ à gauche de l'égalité :
$$Y^+(z) - b z^{-2} Y^+(z) = a \cdot X^+(z) + b \cdot y(-2) + b z^{-1} y(-1)$$
$$Y^+(z) (1 - b z^{-2}) = a \cdot X^+(z) + b \cdot y(-2) + b y(-1) z^{-1}$$

Isolons la sortie $Y^+(z)$ en divisant par $(1 - b z^{-2})$ :
$$Y^+(z) = \frac{a \cdot X^+(z)}{1 - b z^{-2}} + \frac{b \cdot y(-2) + b y(-1) z^{-1}}{1 - b z^{-2}}$$

**Identification des composantes :**
*   **Réponse forcée (due à l'entrée) :**
    $$Y_{forcee}(z) = \frac{a \cdot X^+(z)}{1 - b z^{-2}}$$
*   **Réponse libre (due aux conditions initiales) :**
    $$Y_{libre}(z) = \frac{b \cdot y(-2) + b y(-1) z^{-1}}{1 - b z^{-2}}$$

:::

:::block type="warning" title="Warning d'examen"

En examen, faites extrêmement attention à la distinction entre transformée en Z **bilatérale** (somme de $-\infty$ à $+\infty$) et **monolatérale** (somme de $0$ à $+\infty$). La transformée bilatérale ne permet pas d'intégrer directement les conditions initiales temporelles négatives de cette manière. La formule de retard de la transformée monolatérale est donc indispensable dès qu'il y a des conditions initiales non nulles.
:::
:::

:::exercise label="Exercice 3" title="Synthèse de filtre passe-bas RIF par la méthode de la fenêtre"
**Énoncé :**

On souhaite concevoir un filtre numérique passe-bas de type RIF (Réponse Impulsionnelle Finie) à phase linéaire. La fréquence de coupure normalisée souhaitée est $f_c = 0,25$ (soit $F_c = F_e / 4$).
1. Déterminer la réponse impulsionnelle idéale et infinie $h_{id}(n)$ de ce filtre.
2. Appliquer une troncature temporelle (fenêtre rectangulaire) pour obtenir un filtre causal d'ordre $M = 4$ (comportant $N = 2M + 1 = 9$ coefficients). Donner la valeur numérique de ces 9 coefficients.

:::block type="method" title="Methode de resolution"

1. **Réponse idéale (Filtre de Fourier) :** Le filtre passe-bas idéal a un spectre $H_{id}(f) = 1$ pour $f \in [-f_c, f_c]$ (périodisé). Sa réponse impulsionnelle idéale est obtenue par TF inverse de ce gabarit rectangulaire :
   $$h_{id}(n) = 2 f_c \cdot \text{sinc}(2\pi f_c n)$$
2. **Troncature et causalisation :**
   * Pour un filtre causal d'ordre $2M$, on tronque $h_{id}(n)$ sur l'intervalle $[-M, M]$ puis on applique un décalage temporel de $M$ échantillons vers la droite pour rendre le filtre causal.
   * Les coefficients du filtre synthétisé $h(n)$ sont alors définis par :
     $$h(n) = h_{id}(n - M) \cdot w(n - M) \quad \text{pour } n \in [0, 2M]$$
     où $w(n)$ est la fenêtre d'apodisation choisie (ici, rectangulaire).

:::

:::block type="theorem" title="Correction analytique detaillee"

**1. Calcul de la réponse impulsionnelle idéale $h_{id}(n)$ :**
La fréquence de coupure normalisée est $f_c = 0,25$.
$$h_{id}(n) = 2 \cdot (0,25) \cdot \text{sinc}(2\pi \cdot 0,25 \cdot n) = 0,5 \cdot \text{sinc}\left( \frac{\pi n}{2} \right) = \frac{\sin\left(\frac{\pi n}{2}\right)}{\pi n}$$

Analysons les valeurs de $h_{id}(n)$ pour les différentes valeurs de $n$ :
*   Pour $n = 0$ (par prolongement par continuité de la fonction sinc) : $h_{id}(0) = 0,5$.
*   Pour $n$ pair non nul ($n = \pm 2, \pm 4, \dots$) : $\sin(\pi n / 2) = \sin(\pi k) = 0 \implies h_{id}(n) = 0$.
*   Pour $n$ impair :
    *   $n = \pm 1 \implies \sin(\pm \pi/2) = \pm 1 \implies h_{id}(\pm 1) = \frac{1}{\pi} \approx 0,3183$.
    *   $n = \pm 3 \implies \sin(\pm 3\pi/2) = \mp 1 \implies h_{id}(\pm 3) = -\frac{1}{3\pi} \approx -0,1061$.
    *   $n = \pm 5 \implies \sin(\pm 5\pi/2) = \pm 1 \implies h_{id}(\pm 5) = \frac{1}{5\pi} \approx 0,0637$.

**2. Troncature et causalisation pour un ordre 8 ($N = 9$ coefficients, $M = 4$) :**
Pour rendre le filtre causal, on décale l'indice de $M = 4$ échantillons. Les coefficients du filtre réel $h(n)$ pour $n \in [0, 8]$ s'écrivent :
$$h(n) = h_{id}(n - 4)$$

Calculons explicitement les 9 coefficients du filtre passe-bas RIF :
*   $h(0) = h_{id}(-4) = 0$
*   $h(1) = h_{id}(-3) = -\frac{1}{3\pi} \approx -0,1061$
*   $h(2) = h_{id}(-2) = 0$
*   $h(3) = h_{id}(-1) = \frac{1}{\pi} \approx 0,3183$
*   $h(4) = h_{id}(0) = 0,5$ (coefficient central)
*   $h(5) = h_{id}(1) = \frac{1}{\pi} \approx 0,3183$
*   $h(6) = h_{id}(2) = 0$
*   $h(7) = h_{id}(3) = -\frac{1}{3\pi} \approx -0,1061$
*   $h(8) = h_{id}(4) = 0$

**Propriété remarquable :**
Le filtre obtenu est parfaitement **symétrique** par rapport à son coefficient central $h(4)$, ce qui garantit une **phase rigoureusement linéaire** (déphasage pur sans distorsion de phase). De plus, on remarque qu'un coefficient sur deux s'annule (hormis le centre), ce qui réduit par deux le nombre de multiplications physiques nécessaires lors de l'implémentation matérielle du filtre (filtre de type *Half-Band*).

:::

:::block type="warning" title="Warning d'examen"

Une erreur classique lors du calcul de la TFD ou de la réponse impulsionnelle est de confondre la fréquence de coupure normalisée $f_c \in [0, 0,5]$ avec la pulsation ou d'oublier la division par $\pi n$ dans le calcul du sinus cardinal. Pensez également à toujours vérifier la symétrie de vos coefficients : si $h(n) \ne h(2M - n)$, votre filtre n'est plus à phase linéaire !
:::
:::

:::block type="remember" title="Résumé des astuces indispensables pour réussir l'examen"
1.  **Vérification de la cohérence dimensionnelle :** Un résultat physique sans unité est considéré comme faux. Exprimez toujours les fréquences en Hz, les périodes en secondes, et les pulsations en rad/s.
2.  **Soin de la rédaction et schémas :** L'enseignant accorde une importance capitale aux explications physiques textuelles et aux schémas clairs. Ne donnez jamais un résultat brut sans en expliquer la provenance (justifiez par le théorème du retard, de Parseval, ou de modulation).
3.  **Le peigne de Dirac comme passerelle :** Pour modéliser l'échantillonnage ou la périodisation, utilisez toujours le peigne de Dirac $\delta_{T_e}(t)$. Retenez sa propriété duale : $TF[\delta_T(t)] = \frac{1}{T} \delta_{1/T}(f)$.
:::
