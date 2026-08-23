---
title: "TD 1 corrige - Signaux déterministes à temps continu & Convolution"
subject: "AU331-Traitement-Signal"
type: "td"
target: "AU331-Traitement-Signal-td1.html"
eyebrow: "AU331 - TD 1"
heading: "Signaux déterministes à temps continu & Convolution"
summary: "Corrige maintenu en Markdown."
---

:::exercise label="Exercice 1" title="Étude de l'énergie d'une exponentielle décroissante"
**Énoncé :**

Montrer que le signal causal défini par $x(t) = e^{-at} u(t)$ avec $a > 0$ et $u(t)$ l'échelon de Heaviside est à énergie finie. Calculer cette énergie.

:::block type="method" title="Methode de resolution"

1. **Rappel de la définition de l'énergie totale d'un signal continu :**
   $$E_x = \int_{-\infty}^{+\infty} |x(t)|^2 dt$$
2. **Prise en compte de la causalité :** L'échelon de Heaviside $u(t)$ restreint le domaine d'intégration à $[0, +\infty[$, intervalle sur lequel $u(t) = 1$. Sur $]-\infty, 0[$, $x(t) = 0$.
3. **Calcul de l'intégrale :** Intégrer l'exponentielle élevée au carré, c'est-à-dire $e^{-2at}$.
4. **Vérification de la convergence :** Comme $a > 0$, l'intégrale converge vers une valeur finie.

:::

:::block type="theorem" title="Correction analytique detaillee"

Par définition, l'énergie totale s'écrit :
$$E_x = \int_{-\infty}^{+\infty} |e^{-at} u(t)|^2 dt = \int_{0}^{+\infty} (e^{-at})^2 \cdot 1^2 \cdot dt = \int_{0}^{+\infty} e^{-2at} dt$$

Calculons la primitive de cette fonction exponentielle :
$$E_x = \left[ \frac{e^{-2at}}{-2a} \right]_{0}^{+\infty} = \lim_{t \to +\infty} \left( \frac{e^{-2at}}{-2a} \right) - \left( \frac{e^{0}}{-2a} \right)$$

Puisque $a > 0$, on a $\lim_{t \to +\infty} e^{-2at} = 0$. Ainsi :
$$E_x = 0 - \left( -\frac{1}{2a} \right) = \frac{1}{2a}$$

Le paramètre $a$ étant strictement positif, l'énergie $E_x = \frac{1}{2a}$ est bien finie. Le signal est dit **à énergie finie** (et par conséquent, sa puissance moyenne temporelle est nulle).

:::

:::block type="warning" title="Warning d'examen"

N'oubliez jamais d'élever le signal au carré *avant* d'intégrer. Une erreur classique consiste à calculer $\int x(t) dt$ (qui donne $\frac{1}{a}$) au lieu de $\int |x(t)|^2 dt$. De plus, la condition $a > 0$ est impérative : si $a \le 0$, l'intégrale diverge vers l'infini, et le signal n'est plus à énergie finie.
:::
:::

:::exercise label="Exercice 2" title="Calcul de transformées de Fourier fondamentales"
**Énoncé :**

Déterminer la transformée de Fourier (TF) des signaux continus suivants :
1. $x(t) = \cos(2\pi f_0 t) \cdot \text{rect}_T(t)$ avec $\text{rect}_T(t) = 1$ pour $|t| \le T/2$, et $0$ ailleurs.
2. $z(t) = t \cdot e^{-at} u(t)$ avec $a > 0$.

:::block type="method" title="Methode de resolution"

* **Pour la question 1 (Modulation d'une porte) :**
  Utiliser la formule d'Euler pour décomposer le cosinus en deux exponentielles complexes $\frac{e^{j2\pi f_0 t} + e^{-j2\pi f_0 t}}{2}$. Appliquer ensuite le **théorème de modulation** (retard fréquentiel) à la transformée connue de la porte.
  *Rappel :* $TF[\text{rect}_T(t)] = T \cdot \text{sinc}(\pi f T)$ où $\text{sinc}(u) = \frac{\sin(u)}{u}$.
* **Pour la question 2 (Signal rampe pondéré) :**
  Utiliser la propriété de **dérivation dans le domaine fréquentiel** :
  $$TF[t \cdot g(t)] = \frac{j}{2\pi} \frac{d G(f)}{df}$$
  où $G(f)$ est la transformée de $g(t) = e^{-at} u(t)$.

:::

:::block type="theorem" title="Correction analytique detaillee"

**1. Calcul de la TF de $x(t) = \cos(2\pi f_0 t) \cdot \text{rect}_T(t)$ :**
Posons $g(t) = \text{rect}_T(t)$, de transformée de Fourier $G(f) = T \cdot \text{sinc}(\pi f T)$.
En exprimant le cosinus via Euler :
$$x(t) = g(t) \cdot \frac{e^{j2\pi f_0 t} + e^{-j2\pi f_0 t}}{2} = \frac{1}{2} g(t) e^{j2\pi f_0 t} + \frac{1}{2} g(t) e^{-j2\pi f_0 t}$$

Par linéarité et par propriété de translation fréquentielle ($TF[g(t)e^{j2\pi f_0 t}] = G(f - f_0)$), on obtient directement :
$$X(f) = \frac{1}{2} G(f - f_0) + \frac{1}{2} G(f + f_0)$$
$$X(f) = \frac{T}{2} \text{sinc}(\pi(f - f_0)T) + \frac{T}{2} \text{sinc}(\pi(f + f_0)T)$$

**2. Calcul de la TF de $z(t) = t \cdot e^{-at} u(t)$ :**
Posons $y(t) = e^{-at} u(t)$. Sa transformée de Fourier est :
$$Y(f) = \int_{0}^{+\infty} e^{-at} e^{-j2\pi f t} dt = \int_{0}^{+\infty} e^{-(a + j2\pi f)t} dt = \left[ \frac{e^{-(a + j2\pi f)t}}{-(a + j2\pi f)} \right]_{0}^{+\infty} = \frac{1}{a + j2\pi f}$$

Appliquons le théorème de dérivation fréquentielle :
$$Z(f) = \frac{j}{2\pi} \frac{d}{df} [Y(f)] = \frac{j}{2\pi} \frac{d}{df} \left( \frac{1}{a + j2\pi f} \right)$$

Calculons la dérivée par rapport à $f$ :
$$\frac{d}{df} \left( (a + j2\pi f)^{-1} \right) = -1 \cdot (a + j2\pi f)^{-2} \cdot (j2\pi) = -\frac{j2\pi}{(a + j2\pi f)^2}$$

En multipliant par la constante $\frac{j}{2\pi}$ devant la dérivée :
$$Z(f) = \frac{j}{2\pi} \left( -\frac{j2\pi}{(a + j2\pi f)^2} \right) = \frac{-j^2}{(a + j2\pi f)^2} = \frac{1}{(a + j2\pi f)^2}$$

:::

:::block type="warning" title="Warning d'examen"

Une erreur fréquente lors de la dérivation fréquentielle est l'oubli du facteur multiplicatif $\frac{j}{2\pi}$ ou une mauvaise application de la dérivation d'une fonction complexe. Pour vous vérifier, remarquez que la puissance de l'ordre du pôle au dénominateur augmente de 1 à chaque multiplication par $t$ au niveau temporel ($t^k e^{-at} u(t) \leftrightarrow \frac{k!}{(a + j2\pi f)^{k+1}}$).
:::
:::

:::exercise label="Exercice 3" title="Système de cryptage analogique (Le Brouilleur secret)"
**Énoncé :**

Pour assurer la confidentialité des communications analogiques, on utilise le système de cryptage appelé "brouilleur de spectre" modélisé ci-dessous :

```
             s_A(t)          s_B(t)                 s_C(t)
 m(t) ---> [ X ] -----------> [ PH ] ---------------> [ X ] ---> [ PB ] ---> s_out(t)
             ^                  ^                       ^          ^
             |                  |                       |          |
         cos(w_0 t)      Filtre Passe-Haut          cos(w_1 t)  Filtre Passe-Bas
                         fc = w_0                   w_1=w_0+W   fc = w_0
```

On donne le spectre $M(\omega)$ du signal d'entrée $m(t)$ : spectre triangulaire, symétrique, s'étendant de $-\Omega$ à $+\Omega$.
On suppose que la porteuse vérifie $\omega_0 \gg \Omega$.
1. Analyser le système en exprimant les spectres aux points intermédiaires A, B, C et Sortie.
2. Dessiner les spectres correspondants.
3. Quelles sont les opérations inverses à réaliser au récepteur pour retrouver le signal d'origine $m(t)$ ?

:::block type="method" title="Methode de resolution"

1. **Étape A (Modulation d'amplitude classique) :** La multiplication de $m(t)$ par $\cos(\omega_0 t)$ décale le spectre $M(\omega)$ de $\pm \omega_0$.
2. **Étape B (Filtrage Passe-Haut) :** Le filtre passe-haut ayant une fréquence de coupure à $\omega_0$ élimine toutes les fréquences spectrales $|\omega| < \omega_0$. Cela réalise une modulation à **Bande Latérale Unique (BLU)** en ne conservant que les composantes haute fréquence ($|\omega| > \omega_0$).
3. **Étape C (Seconde modulation) :** La multiplication par $\cos(\omega_1 t)$ (avec $\omega_1 = \omega_0 + \Omega$) re-décale les bandes conservées vers les basses fréquences et vers des fréquences encore plus hautes.
4. **Étape de Sortie (Filtrage Passe-Bas) :** Le filtre passe-bas à la coupure $\omega_0$ élimine les composantes centrées à haute fréquence pour ne garder que le spectre en bande de base.

:::

:::block type="theorem" title="Correction analytique detaillee"

**1. Analyse spectrale pas-à-pas :**

*   **Point A :** Le signal s'écrit $s_A(t) = m(t) \cdot \cos(\omega_0 t)$.
    Dans le domaine fréquentiel (en utilisant les pulsations), la multiplication temporelle devient une convolution de spectres :
    $$S_A(\omega) = \frac{1}{2} M(\omega - \omega_0) + \frac{1}{2} M(\omega + \omega_0)$$
    *Allure physique :* Le triangle d'origine centré en $0$ de largeur $2\Omega$ se retrouve dupliqué à moitié d'amplitude, centré en $+\omega_0$ (s'étendant de $\omega_0 - \Omega$ à $\omega_0 + \Omega$) et en $-\omega_0$ (s'étendant de $-\omega_0 - \Omega$ à $-\omega_0 + \Omega$).

*   **Point B :** Le filtre passe-haut coupe à $\omega_c = \omega_0$.
    Il élimine la moitié gauche du spectre positif (fréquences inférieures à $\omega_0$) et la moitié droite du spectre négatif (fréquences supérieures à $-\omega_0$).
    Pour les fréquences positives, on ne garde que l'intervalle $[\omega_0, \omega_0 + \Omega]$. Pour les fréquences négatives, on ne garde que $[-\omega_0 - \Omega, -\omega_0]$.
    $$S_B(\omega) = \begin{cases} \frac{1}{2} M(\omega - \omega_0) & \text{pour } \omega \in [\omega_0, \omega_0 + \Omega] \\ \frac{1}{2} M(\omega + \omega_0) & \text{pour } \omega \in [-\omega_0 - \Omega, -\omega_0] \\ 0 & \text{ailleurs} \end{cases}$$

*   **Point C :** Le signal est multiplié par $\cos(\omega_1 t)$ avec $\omega_1 = \omega_0 + \Omega$.
    $$S_C(\omega) = \frac{1}{2} S_B(\omega - \omega_1) + \frac{1}{2} S_B(\omega + \omega_1)$$
    Cette translation de $\pm \omega_1$ ramène la bande haute de $S_B$ (située autour de $\omega_0 + \Omega$) vers la bande de base.
    Calculons la translation de la composante positive de $S_B(\omega)$ par $-\omega_1$ :
    $$[\omega_0, \omega_0 + \Omega] - (\omega_0 + \Omega) = [-\Omega, 0]$$
    De même, la translation de la composante négative de $S_B(\omega)$ par $+\omega_1$ :
    $$[-\omega_0 - \Omega, -\omega_0] + (\omega_0 + \Omega) = [0, \Omega]$$
    Ces deux moitiés se rejoignent en bande de base pour former un triangle s'étendant de $-\Omega$ à $+\Omega$. Cependant, **le spectre est inversé spectralement !** La pointe du triangle qui était au centre (en $0$) se retrouve sur les côtés ($\pm\Omega$) et les bords extérieurs se retrouvent au centre.
    Les autres composantes de la convolution se retrouvent centrées à haute fréquence ($\pm(2\omega_0 + \Omega)$).

*   **Point Sortie :** Le filtre passe-bas de coupure $\omega_0$ supprime les composantes haute fréquence centrées à $\pm(2\omega_0 + \Omega)$ et ne laisse passer que la bande de base $[-\Omega, \Omega]$.
    Le spectre de sortie $S_{out}(\omega)$ est donc égal au triangle inversé spectralement. Le signal est rendu inaudible / crypté (les basses fréquences sont devenues des hautes fréquences et inversement).

**2. Schéma des spectres :**

```
M(w) :              /\
                 -W  0  W     (Spectre d'origine)

S_A(w) :       /\        /\
            -w0  -w0+W  w0-W w0   (Double modulation)

S_B(w) :        /          \
            -w0-W -w0      w0  w0+W (Filtrage Passe-Haut)

S_out(w) :          \  /
                  -W  0  W    (Spectre inversé / brouillé !)
```

**3. Opération de décryptage :**
Puisque le brouillage repose sur une inversion spectrale dans la même bande de fréquence $[-\Omega, \Omega]$, **le système est auto-inverse !** Pour retrouver $m(t)$ à partir de $s_{out}(t)$, il suffit de lui appliquer exactement le même traitement : modulation par $\cos(\omega_0 t)$, filtrage passe-haut à $\omega_0$, modulation par $\cos(\omega_1 t)$ et filtrage passe-bas à $\omega_0$.

:::

:::block type="warning" title="Warning d'examen"

L'erreur classique est de penser qu'une simple démodulation classique par $\cos(\omega_0 t)$ suffit à décrypter. Or, la suppression d'une partie du spectre (BLU) empêche la démodulation standard. Il faut bien manipuler graphiquement les supports $[a, b]$ translatés de $\pm \omega_1$ pour voir comment les deux morceaux de triangle s'assemblent à l'envers.
:::
:::

:::exercise label="Exercice 4" title="Dualité temps-fréquence &amp; Intégration mathématique"
**Énoncé :**

1. Déterminer la fonction temporelle $x(t)$ dont la transformée de Fourier vaut $X(f) = 1$ dans la bande $[-B, B]$ et $0$ ailleurs.
2. En déduire la valeur numérique des intégrales mathématiques suivantes :
   $$I_1 = \int_{-\infty}^{+\infty} \frac{\sin(\pi t)}{\pi t} dt \quad \text{et} \quad I_2 = \int_{-\infty}^{+\infty} \left( \frac{\sin(\pi t)}{\pi t} \right)^2 dt$$

:::block type="method" title="Methode de resolution"

1. **Étape 1 :** Calculer la transformée de Fourier inverse d'un spectre porte :
   $$x(t) = \int_{-B}^{B} 1 \cdot e^{j2\pi f t} df$$
2. **Étape 2 (Pour $I_1$) :** Identifier $I_1$ comme la valeur en $t=0$ de la transformée de Fourier ou par dualité de la formule de Fourier inverse en posant des valeurs de $B$ adéquates.
3. **Étape 3 (Pour $I_2$) :** Appliquer le **théorème de Parseval** qui stipule la conservation de l'énergie entre le domaine temporel et le domaine fréquentiel :
   $$\int_{-\infty}^{+\infty} |x(t)|^2 dt = \int_{-\infty}^{+\infty} |X(f)|^2 df$$

:::

:::block type="theorem" title="Correction analytique detaillee"

**1. Calcul de la TF inverse de la porte fréquentielle :**
$$x(t) = \int_{-B}^{B} 1 \cdot e^{j2\pi f t} df = \left[ \frac{e^{j2\pi f t}}{j2\pi t} \right]_{-B}^{B} = \frac{e^{j2\pi B t} - e^{-j2\pi B t}}{j2\pi t}$$
En utilisant la formule d'Euler pour le sinus ($\sin(\theta) = \frac{e^{j\theta} - e^{-j\theta}}{2j}$) :
$$x(t) = \frac{2j \sin(2\pi B t)}{j2\pi t} = \frac{\sin(2\pi B t)}{\pi t} = 2B \cdot \text{sinc}(2\pi B t)$$

**2. Calcul des intégrales $I_1$ et $I_2$ :**

*   **Pour $I_1$ :** Posons $B = 1/2$. Notre couple de Fourier devient :
    $$x(t) = \text{sinc}(\pi t) = \frac{\sin(\pi t)}{\pi t} \quad \longleftrightarrow \quad X(f) = \text{rect}_{1}(f) = \begin{cases} 1 & \text{si } f \in [-1/2, 1/2] \\ 0 & \text{sinon} \end{cases}$$
    Par définition de la transformée de Fourier directe évaluée en $f = 0$ :
    $$X(0) = \int_{-\infty}^{+\infty} x(t) e^{-j2\pi (0) t} dt = \int_{-\infty}^{+\infty} x(t) dt$$
    Or, nous savons que $X(0) = 1$ (car $0 \in [-1/2, 1/2]$). Donc :
    $$I_1 = \int_{-\infty}^{+\infty} \frac{\sin(\pi t)}{\pi t} dt = 1$$

*   **Pour $I_2$ :** Appliquons le théorème de Parseval au même signal $x(t) = \text{sinc}(\pi t)$ :
    $$\int_{-\infty}^{+\infty} |x(t)|^2 dt = \int_{-\infty}^{+\infty} |X(f)|^2 df$$
    $$\int_{-\infty}^{+\infty} \left( \frac{\sin(\pi t)}{\pi t} \right)^2 dt = \int_{-1/2}^{1/2} |1|^2 df = [f]_{-1/2}^{1/2} = \frac{1}{2} - \left(-\frac{1}{2}\right) = 1$$
    Ainsi, $I_2 = 1$.

:::

:::block type="warning" title="Warning d'examen"

Cet exercice montre la puissance du traitement du signal pour résoudre des problèmes purement mathématiques complexes (calcul d'intégrales impropres sans passer par les résidus ou l'intégration dans le plan complexe). Retenez bien le réflexe : **intégrale d'un produit ou d'un carré de fonction $\to$ Parseval immédiat**.
:::
:::

:::exercise label="Exercice 7" title="Produit de convolution analytique de deux rectangles asymétriques"
**Énoncé :**

Calculer et représenter graphiquement le produit de convolution $z(t) = x(t) * y(t)$ des deux signaux définis par :
$$x(t) = \text{rect}_1(t - 0.5) = \begin{cases} 1 & \text{si } t \in [0, 1] \\ 0 & \text{sinon} \end{cases}$$
$$y(t) = \text{rect}_2(t - 2) = \begin{cases} 1 & \text{si } t \in [1, 3] \\ 0 & \text{sinon} \end{cases}$$

:::block type="method" title="Methode de resolution"

1. **Détermination du support théorique de la sortie :**
   Si $x(t)$ a pour support $[a, b]$ et $y(t)$ a pour support $[c, d]$, alors le produit de convolution $x * y$ a pour support $[a+c, b+d]$. Ici, le support de $z(t)$ sera $[0+1, 1+3] = [1, 4]$.
2. **Formulation intégrale :**
   $$z(t) = \int_{-\infty}^{+\infty} x(\tau) y(t - \tau) d\tau$$
3. **Analyse graphique par translation d'intervalles :**
   Faire glisser la fenêtre $y(t - \tau)$ (qui est non nulle pour $\tau \in [t - 3, t - 1]$) par rapport à la fenêtre fixe $x(\tau)$ (non nulle pour $\tau \in [0, 1]$).
4. **Calcul analytique par disjonction de cas (intersections des deux supports) :**
   Identifier les 5 phases temporelles (avant l'intersection, entrée progressive, recouvrement total, sortie progressive, après l'intersection).

:::

:::block type="theorem" title="Correction analytique detaillee"

Le signal fixe est $x(\tau)$ défini sur $[0, 1]$.
Le signal mobile est $y(t - \tau)$, non nul pour $1 \le t - \tau \le 3 \iff \tau \in [t - 3, t - 1]$.

Calculons le recouvrement des deux supports $\tau \in [0, 1]$ et $\tau \in [t - 3, t - 1]$ :

*   **Cas 1 : Pas d'intersection à gauche ($t - 1 < 0 \iff t < 1$)**
    Les deux fonctions ne se chevauchent pas.
    $$z(t) = 0$$

*   **Cas 2 : Entrée progressive du rectangle mobile ($t - 1 \in [0, 1]$ et $t - 3 < 0 \iff 1 \le t \le 2$)**
    L'intersection se fait sur l'intervalle $\tau \in [0, t - 1]$.
    $$z(t) = \int_{0}^{t - 1} (1) \cdot (1) \cdot d\tau = [ \tau ]_{0}^{t - 1} = t - 1$$
    *(Vérification : en $t=1$, $z(1)=0$ ; en $t=2$, $z(2)=1$)*

*   **Cas 3 : Recouvrement total du petit rectangle fixe ($t - 3 \ge 0$ et $t - 1 \ge 1 \iff 2 \le t \le 3$)**
    Le rectangle fixe de largeur 1 est entièrement situé à l'intérieur du rectangle mobile de largeur 2. L'intersection est donc constante et égale au support de $x(\tau)$, soit $\tau \in [0, 1]$.
    $$z(t) = \int_{0}^{1} (1) \cdot (1) \cdot d\tau = 1$$

*   **Cas 4 : Sortie progressive du rectangle mobile ($t - 3 \in [0, 1]$ et $t - 1 > 1 \iff 3 \le t \le 4$)**
    L'intersection se fait sur l'intervalle $\tau \in [t - 3, 1]$.
    $$z(t) = \int_{t - 3}^{1} (1) \cdot (1) \cdot d\tau = [ \tau ]_{t - 3}^{1} = 1 - (t - 3) = 4 - t$$
    *(Vérification : en $t=3$, $z(3)=1$ ; en $t=4$, $z(4)=0$)*

*   **Cas 5 : Pas d'intersection à droite ($t - 3 > 1 \iff t > 4$)**
    $$z(t) = 0$$

**Synthèse du résultat $z(t)$ :**
C'est un trapèze asymétrique :
$$z(t) = \begin{cases} 0 & \text{si } t < 1 \\ t - 1 & \text{si } 1 \le t < 2 \\ 1 & \text{si } 2 \le t < 3 \\ 4 - t & \text{si } 3 \le t \le 4 \\ 0 & \text{si } t > 4 \end{cases}$$

:::

:::block type="warning" title="Warning d'examen"

L'erreur classique est de se tromper sur les bornes du signal mobile renversé $y(t - \tau)$. Écrivez toujours explicitement l'inéquation définissant le support de $y(\tau)$ puis remplacez $\tau$ par $t - \tau$ pour isoler $\tau$. Vérifiez impérativement la continuité de votre fonction finale aux points de raccordement ($t = 1, 2, 3, 4$) !
:::
:::
