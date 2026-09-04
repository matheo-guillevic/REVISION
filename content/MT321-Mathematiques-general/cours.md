---
title: MT321 - Mathématiques générales
subject: MT321-Mathematiques-general
type: course
---

:::section id="mt321-intro" eyebrow="Semestre 5" title="Mathématiques générales" summary="Nombres complexes, algèbre linéaire, espaces préhilbertiens et séries de Fourier, avec des méthodes de calcul détaillées."

:::quicklinks
- [Chapitre 1 : nombres complexes](#mt321-chap1-complexes)
- [Chapitre 2 : espaces vectoriels](#mt321-chap2-espaces-vectoriels)
- [Chapitre 3 : applications linéaires et matrices](#mt321-chap3-applications-lineaires-matrices)
- [Chapitre 4 : déterminants et diagonalisation](#mt321-chap4-determinants-diagonalisation)
- [Chapitre 5 : espaces préhilbertiens](#mt321-chap5-espaces-prehilbertiens)
- [Chapitre 6 : séries de Fourier](#mt321-chap6-series-fourier)
:::

:::dashboard
:::card class="chapter-card" pill="Cours" title="Synthèse et méthodes de calcul" href="#mt321-chap1-complexes" link="Commencer"
Ce cours complet rassemble toutes les notions fondamentales de l'algèbre linéaire, des espaces préhilbertiens et de l'analyse harmonique (séries de Fourier). L'accent est mis sur les algorithmes et méthodes de calcul détaillés étape par étape.
:::
:::

:::block type="remember" title="Fil directeur"
Pour chaque notion, distinguer la définition, le critère utilisable en exercice et la méthode de calcul. Toujours vérifier les hypothèses d'un théorème avant de l'appliquer.
:::
:::

---

:::section id="mt321-chap1-complexes" eyebrow="Chapitre 1" title="Les nombres complexes" summary="Fondations d'analyse et d'algèbre : formes d'écriture, formules d'Euler, linéarisation, factorisation par l'arc moitié et résolution d'équations polynomiales."
:::grid two-col
:::block type="definition" title="Formes d'écritures"
Un nombre complexe \(z\) s'écrit sous deux formes principales :
*   **Forme algébrique (ou cartésienne) :** \(z = a + ib\) avec \(a, b \in \mathbb{R}\) et \(i^2 = -1\).
    *   Partie réelle : \(\text{Re}(z) = a\)
    *   Partie imaginaire : \(\text{Im}(z) = b\)
*   **Forme exponentielle (ou polaire) :** \(z = r e^{i\theta}\) avec \(r = |z| \in \mathbb{R}_+^*\) et \(\theta = \arg(z) \in \mathbb{R}\).
    *   Module : \(r = \sqrt{a^2 + b^2}\)
    *   Argument : \(\theta\) tel que \(\cos(\theta) = \frac{a}{r}\) et \(\sin(\theta) = \frac{b}{r}\)

**Opérations privilégiées :**
*   **Addition :** Utiliser la forme algébrique. \((a + ib) + (a' + ib') = (a+a') + i(b+b')\).
*   **Multiplication & Puissance :** Utiliser la forme exponentielle. \((r e^{i\theta}) \cdot (r' e^{i\theta'}) = r r' e^{i(\theta + \theta')}\).
:::

:::block type="theorem" title="Formules fondamentales"
*   **Formules d'Euler :** Permettent d'exprimer \(\cos(x)\) et \(\sin(x)\) à l'aide d'exponentielles complexes :
    \[ \cos(x) = \frac{e^{ix} + e^{-ix}}{2} \quad \text{et} \quad \sin(x) = \frac{e^{ix} - e^{-ix}}{2i} \]
*   **Formule de Moivre :** \((\cos(x) + i\sin(x))^n = \cos(nx) + i\sin(nx)\), ou encore \((e^{ix})^n = e^{inx}\).
*   **Factorisation par l'arc moitié (pour \(Z = e^{i\alpha} + e^{i\beta}\)) :**
    \[ Z = e^{i\frac{\alpha+\beta}{2}} \left( e^{i\frac{\alpha-\beta}{2}} + e^{-i\frac{\alpha-\beta}{2}} \right) = 2 \cos\left(\frac{\alpha-\beta}{2}\right) e^{i\frac{\alpha+\beta}{2}} \]
    *   Module : \(|Z| = 2 \left| \cos\left(\frac{\alpha-\beta}{2}\right) \right|\)
    *   Argument : \(\frac{\alpha+\beta}{2} \pmod{2\pi}\) si \(\cos\left(\frac{\alpha-\beta}{2}\right) > 0\), et \(\frac{\alpha+\beta}{2} + \pi \pmod{2\pi}\) sinon.
:::
:::

:::plotly id="mt321-plan-complexe" label="Plan complexe" title="Module, argument et conjugaison" height="440" caption="Le point z = 3 + 2i est repéré par ses coordonnées cartésiennes ; son module est la longueur du segment depuis l'origine et son conjugué est son symétrique par rapport à l'axe réel."
{
  "data": [
    {
      "type": "scatter",
      "mode": "lines+markers+text",
      "x": [0, 3],
      "y": [0, 2],
      "text": ["O", "z = 3 + 2i"],
      "textposition": ["bottom left", "top right"],
      "name": "z",
      "line": { "width": 3 }
    },
    {
      "type": "scatter",
      "mode": "lines+markers+text",
      "x": [0, 3],
      "y": [0, -2],
      "text": ["", "conjugué de z"],
      "textposition": "bottom right",
      "name": "Conjugué",
      "line": { "width": 3, "dash": "dash" }
    }
  ],
  "layout": {
    "xaxis": { "title": "Partie réelle", "range": [-1, 4], "zeroline": true },
    "yaxis": { "title": "Partie imaginaire", "range": [-3, 3], "scaleanchor": "x", "scaleratio": 1, "zeroline": true },
    "legend": { "orientation": "h", "y": 1.12 },
    "margin": { "l": 60, "r": 25, "t": 55, "b": 55 }
  },
  "config": { "responsive": true, "displaylogo": false }
}
:::

:::block type="method" title="Méthode de calcul 1.1 : Linéarisation de cos^n(x) et sin^n(x)"
La linéarisation consiste à transformer un produit de fonctions trigonométriques en une somme linéaire de cosinus et sinus de multiples de \(x\) (essentiel pour le calcul d'intégrales).

**Algorithme pas-à-pas :**
1.  **Substituer :** Remplacer \(\cos(x)\) ou \(\sin(x)\) par sa formule d'Euler.
2.  **Développer :** Appliquer la formule du binôme de Newton pour développer le numérateur.
3.  **Regrouper :** Associer les termes conjugués deux à deux (par exemple, regrouper \(e^{ikx}\) et \(e^{-ikx}\)).
4.  **Ré-exprimer :** Utiliser à nouveau les formules d'Euler dans le sens inverse pour faire réapparaître des \(\cos(kx)\) ou \(\sin(kx)\).

**Exemple détaillé : Linéariser \(\cos^5(x)\)**
\[ \cos^5(x) = \left( \frac{e^{ix} + e^{-ix}}{2} \right)^5 = \frac{1}{32} (e^{ix} + e^{-ix})^5 \]
Le développement du binôme donne :
\[ (e^{ix} + e^{-ix})^5 = e^{5ix} + 5e^{3ix} + 10e^{ix} + 10e^{-ix} + 5e^{-3ix} + e^{-5ix} \]
Regroupons les termes :
\[ (e^{5ix} + e^{-5ix}) + 5(e^{3ix} + e^{-3ix}) + 10(e^{ix} + e^{-ix}) \]
Puisque \(e^{ikx} + e^{-ikx} = 2 \cos(kx)\), on obtient :
\[ \cos^5(x) = \frac{1}{32} [ 2 \cos(5x) + 10 \cos(3x) + 20 \cos(x) ] = \frac{1}{16} \cos(5x) + \frac{5}{16} \cos(3x) + \frac{5}{8} \cos(x) \]
:::

:::block type="method" title="Méthode de calcul 1.2 : Résolution d'équations du second degré complexes"
On cherche à résoudre dans \(\mathbb{C}\) l'équation \(Az^2 + Bz + C = 0\) où \(A, B, C \in \mathbb{C}\).

**Algorithme pas-à-pas :**
1.  **Calculer le discriminant :** \(\Delta = B^2 - 4AC \in \mathbb{C}\).
2.  **Rechercher les racines carrées de \(\Delta\) :** Trouver \(\delta = a + ib\) tel que \(\delta^2 = \Delta\).
    *   Résoudre le système réel suivant (en utilisant \(|\delta|^2 = |\Delta|\)) :
        \[ \begin{cases} a^2 - b^2 = \text{Re}(\Delta) \\ a^2 + b^2 = |\Delta| = \sqrt{\text{Re}(\Delta)^2 + \text{Im}(\Delta)^2} \\ 2ab = \text{Im}(\Delta) \end{cases} \]
    *   Additionner les deux premières équations pour obtenir \(2a^2\), soustraire pour obtenir \(2b^2\).
    *   Déterminer le signe du produit \(ab\) via la troisième équation pour choisir les couples \((a,b)\) cohérents. On obtient deux racines opposées : \(\delta\) et \(-\delta\).
3.  **Formuler les solutions :** Les deux solutions de l'équation initiale sont :
    \[ z_1 = \frac{-B + \delta}{2A} \quad \text{et} \quad z_2 = \frac{-B - \delta}{2A} \]

**Exercice résolu issu du DS :**
Résoudre \(z^2 + (3i-3)z + 2 - 3i = 0\).
1.  **Calcul de \(\Delta\) :**
    \[ \Delta = (3i-3)^2 - 4(1)(2-3i) = 9(i^2 - 2i + 1) - 8 + 12i = -18i - 8 + 12i = -8 - 6i \]
2.  **Recherche de \(\delta = a + ib\) tel que \(\delta^2 = -8 - 6i\) :**
    Le système est :
    \[ \begin{cases} a^2 - b^2 = -8 \quad (1) \\ a^2 + b^2 = |-8-6i| = \sqrt{(-8)^2 + (-6)^2} = 10 \quad (2) \\ 2ab = -6 \quad (3) \end{cases} \]
    *   \((1) + (2) \implies 2a^2 = 2 \implies a^2 = 1 \implies a = \pm 1\).
    *   \((2) - (1) \implies 2b^2 = 18 \implies b^2 = 9 \implies b = \pm 3\).
    *   D'après \((3)\), \(ab = -3 < 0\), donc \(a\) et \(b\) sont de signes opposés.
    *   On choisit \(\delta = 1 - 3i\) (l'autre possibilité étant \(-1 + 3i\)).
3.  **Calcul des solutions complexes :**
    \[ z_1 = \frac{-(3i-3) + (1-3i)}{2} = \frac{3 - 3i + 1 - 3i}{2} = \frac{4 - 6i}{2} = 2 - 3i \]
    \[ z_2 = \frac{-(3i-3) - (1-3i)}{2} = \frac{3 - 3i - 1 + 3i}{2} = \frac{2}{2} = 1 \]
    L'ensemble des solutions est donc \(S = \{1, 2-3i\}\).
:::

:::block type="method" title="Méthode de calcul 1.3 : Équations de type z^n = a et racines de l'unité"
On cherche à résoudre \(z^n = a\) avec \(a \in \mathbb{C}^*\).

**Algorithme pas-à-pas :**
1.  **Exprimer \(a\) sous forme exponentielle :** \(a = \rho e^{i\phi}\) avec \(\rho = |a|\) et \(\phi = \arg(a)\).
2.  **Poser la forme générale de la solution \(z = r e^{i\theta}\) :**
    \[ z^n = a \implies r^n e^{in\theta} = \rho e^{i\phi} \implies \begin{cases} r = \sqrt[n]{\rho} \\ n\theta = \phi + 2k\pi, \quad k \in \mathbb{Z} \end{cases} \]
3.  **Lister les \(n\) solutions distinctes :**
    \[ z_k = \sqrt[n]{|a|} e^{i\left(\frac{\arg(a)}{n} + \frac{2k\pi}{n}\right)}, \quad k \in \{0, 1, \dots, n-1\} \]

**Cas particulier : Racines \(n\)-ièmes de l'unité (\(z^n = 1\))**
Les solutions sont notées \(w_k = e^{i\frac{2k\pi}{n}}\) pour \(k \in \{0, \dots, n-1\}\).
*   **Propriété cruciale (somme des racines) :** Si \(w_0 = e^{i\frac{2\pi}{n}} \ne 1\), alors la somme de toutes les racines vaut :
    \[ \sum_{k=0}^{n-1} w_0^k = \frac{w_0^n - 1}{w_0 - 1} = 0 \]

**Exercice résolu d'examen (ESISAR) :**
Soit \(w_0 = e^{i\frac{2\pi}{7}}\) la racine \(7\)-ième fondamentale de l'unité (donc \(w_0^7 = 1\) et \(\sum_{k=0}^{6} w_0^k = 0\)). On pose \(u = w_0 + w_0^2 + w_0^4\). Démontrer que \(u^2 + u + 2 = 0\) et déterminer la valeur exacte de \(u\).
1.  **Calcul de \(u^2\) :**
    \[ u^2 = (w_0 + w_0^2 + w_0^4)^2 = w_0^2 + w_0^4 + w_0^8 + 2(w_0^3 + w_0^5 + w_0^6) \]
    Puisque \(w_0^7 = 1\), on a \(w_0^8 = w_0\). Donc :
    \[ u^2 = (w_0 + w_0^2 + w_0^4) + 2(w_0^3 + w_0^5 + w_0^6) = u + 2(w_0^3 + w_0^5 + w_0^6) \]
2.  **Étude de la somme :**
    On sait que \(1 + u + (w_0^3 + w_0^5 + w_0^6) = \sum_{k=0}^{6} w_0^k = 0\), d'où \(w_0^3 + w_0^5 + w_0^6 = -1 - u\).
    En remplaçant cette expression dans \(u^2\) :
    \[ u^2 = u + 2(-1-u) = u - 2 - 2u = -u - 2 \implies u^2 + u + 2 = 0 \]
3.  **Résolution de l'équation \(x^2 + x + 2 = 0\) :**
    Le discriminant est \(\Delta = 1^2 - 4(1)(2) = -7 = (i\sqrt{7})^2\).
    Les solutions sont \(u = \frac{-1 \pm i\sqrt{7}}{2}\).
4.  **Détermination du signe de la partie imaginaire :**
    Par définition, \(\text{Im}(u) = \sin\left(\frac{2\pi}{7}\right) + \sin\left(\frac{4\pi}{7}\right) + \sin\left(\frac{8\pi}{7}\right)\).
    Puisque \(\sin\left(\frac{8\pi}{7}\right) = -\sin\left(\frac{\pi}{7}\right)\), on a :
    \[ \text{Im}(u) = \sin\left(\frac{2\pi}{7}\right) + \sin\left(\frac{4\pi}{7}\right) - \sin\left(\frac{\pi}{7}\right) \]
    Comme \(\sin\left(\frac{4\pi}{7}\right) > \sin\left(\frac{\pi}{7}\right)\) (car \(\frac{4\pi}{7}\) est plus proche de \(\frac{\pi}{2}\)) et que \(\sin\left(\frac{2\pi}{7}\right) > 0\), on en déduit que \(\text{Im}(u) > 0\).
    La solution correcte est donc :
    \[ u = -\frac{1}{2} + i\frac{\sqrt{7}}{2} \]
:::

:::block type="warning" title="Piège classique"
*   **Ne pas additionner les modules :** En général, \(|z+z'| \le |z| + |z'|\) (inégalité triangulaire) et non \(|z+z'| = |z|+|z'|\).
*   **Les arguments sont définis modulo \(2\pi\) :** Ne jamais oublier de spécifier le modulo \([2\pi]\) lors des calculs d'arguments.
:::
:::
:::section id="mt321-chap2-espaces-vectoriels" eyebrow="Chapitre 2" title="Espaces vectoriels" summary="Structures fondamentales d'algèbre linéaire : sous-espaces vectoriels, sommes directes, familles libres et génératrices, théorème de la base incomplète et formule de Grassmann."
:::grid two-col
:::block type="definition" title="Structures de base"
*   **Groupe :** Un ensemble \(G\) muni d’une loi de composition interne (l.c.i) \(\top\) est un groupe si \(\top\) est associative, possède un élément neutre \(e\) et si tout élément de \(G\) a un symétrique dans \(G\).
*   **Espace vectoriel sur \(\mathbb{K}\) (\(\mathbb{K}\) étant \(\mathbb{R}\) ou \(\mathbb{C}\)) :** Un ensemble \(E\) muni d'une l.c.i (notée \(+\)) et d'une loi de composition externe (l.c.e, notée \(.\)) sur \(\mathbb{K}\) si \((E, +)\) est un groupe commutatif et si la l.c.e vérifie la distributivité par rapport à l'addition des vecteurs, des scalaires, l'associativité des scalaires, et \(1.x = x\).
*   **Sous-espace vectoriel (ssev) :** Une partie non vide \(F\) d'un \(\mathbb{K}\)-espace vectoriel \(E\) stable par combinaisons linéaires :
    \[ \forall (\alpha, \beta) \in \mathbb{K}^2, \forall (x, y) \in F^2, \quad \alpha x + \beta y \in F \]
:::

:::block type="theorem" title="Bases, dimension et sommes"
*   **Théorème de la base incomplète :** Toute famille libre de vecteurs d'un e.v. de dimension finie peut être complétée pour former une base de cet e.v..
*   **Formule de Grassmann :** Pour deux ssev \(F\) et \(G\) de dimension finie, on a :
    \[ \dim(F + G) = \dim F + \dim G - \dim(F \cap G) \]
*   **Somme directe & Supplémentaires :** \(F\) et \(G\) sont en somme directe (noté \(F \oplus G\)) ssi \(F \cap G = \{\vec{0}_E\}\). Ils sont supplémentaires dans \(E\) ssi :
    \[ E = F \oplus G \iff \begin{cases} F \cap G = \{\vec{0}_E\} \\ F + G = E \end{cases} \]
    En dimension finie, cela équivaut à \(F \cap G = \{\vec{0}_E\}\) et \(\dim F + \dim G = \dim E\).
:::
:::

:::plotly id="mt321-combinaison-lineaire" label="Géométrie vectorielle" title="Combinaison linéaire et parallélogramme" height="440" caption="La somme v₁ + v₂ est la diagonale du parallélogramme construit sur les deux vecteurs. Faire varier mentalement les coefficients revient à parcourir Vect(v₁,v₂)."
{
  "data": [
    { "type": "scatter", "mode": "lines+markers", "x": [0, 2], "y": [0, 1], "name": "v₁ = (2,1)", "line": { "width": 4 } },
    { "type": "scatter", "mode": "lines+markers", "x": [0, 1], "y": [0, 2], "name": "v₂ = (1,2)", "line": { "width": 4 } },
    { "type": "scatter", "mode": "lines+markers", "x": [0, 3], "y": [0, 3], "name": "v₁ + v₂", "line": { "width": 4 } },
    { "type": "scatter", "mode": "lines", "x": [2, 3, 1], "y": [1, 3, 2], "name": "Parallélogramme", "line": { "width": 2, "dash": "dot" } }
  ],
  "layout": {
    "xaxis": { "title": "x", "range": [-0.3, 3.5], "zeroline": true },
    "yaxis": { "title": "y", "range": [-0.3, 3.5], "scaleanchor": "x", "scaleratio": 1, "zeroline": true },
    "legend": { "orientation": "h", "y": 1.16 },
    "margin": { "l": 55, "r": 20, "t": 65, "b": 50 }
  },
  "config": { "responsive": true, "displaylogo": false }
}
:::

:::block type="method" title="Méthode de calcul 2.1 : Démontrer qu'une partie F est un ssev et trouver sa base"
Soit à étudier une partie \(F\) de \(E = \mathbb{R}^3\).

**Algorithme pas-à-pas :**
1.  **Vérifier que \(F\) est non vide :** Vérifier si \(\vec{0}_E = (0,0,0) \in F\). Si ce n'est pas le cas, \(F\) n'est pas un ssev.
2.  **Montrer la stabilité par combinaison linéaire :** Prendre deux scalaires \(\alpha, \beta \in \mathbb{R}\) et deux vecteurs \(u = (x,y,z)\) et \(u' = (x',y',z')\) de \(F\), puis démontrer que \(\alpha u + \beta u' \in F\).
    *   *Alternative plus rapide :* Exprimer \(F\) comme l'ensemble des combinaisons linéaires d'une famille de vecteurs (\(F = \text{Vect}(v_1, \dots, v_p)\)). Un tel ensemble est d'office un ssev.
3.  **Déterminer une base de \(F\) :**
    *   Remplacer une ou plusieurs variables dans l'écriture générale d'un vecteur de \(F\) en utilisant les équations de définition.
    *   Isoler chaque variable restante pour faire apparaître une combinaison linéaire de vecteurs fixes.
    *   Ces vecteurs forment une famille génératrice de \(F\).
    *   Vérifier si cette famille est libre (toujours vrai si l'écriture a été décomposée proprement variable par variable). Elle forme alors une base de \(F\), et le nombre de vecteurs donne \(\dim F\).

**Exemple d'exercice résolu (HA - Exercice 6) :**
Soit \(F = \{(x, y, z) \in \mathbb{R}^3 \, / \, x + y - z = 0\}\).
1.  **Vérification de \(\vec{0}\) :** \(0 + 0 - 0 = 0 \implies (0,0,0) \in F\), donc \(F \ne \emptyset\).
2.  **Stabilité :** Soient \(\alpha, \beta \in \mathbb{R}\) et \(u = (x,y,z), u' = (x',y',z') \in F\). On a donc \(z = x + y\) et \(z' = x' + y'\). Le vecteur combiné est :
    \[ w = \alpha u + \beta u' = (\alpha x + \beta x', \, \alpha y + \beta y', \, \alpha z + \beta z') \]
    Vérifions si \(w \in F\) :
    \[ (\alpha x + \beta x') + (\alpha y + \beta y') - (\alpha z + \beta z') = \alpha (x+y-z) + \beta (x'+y'-z') = \alpha(0) + \beta(0) = 0 \]
    La relation est vérifiée, donc \(F\) est bien un ssev de \(\mathbb{R}^3\).
3.  **Base et Dimension :**
    Soit \(u = (x,y,z) \in F\). On a \(z = x + y\). Donc :
    \[ u = (x, y, x+y) = (x, 0, x) + (0, y, y) = x(1, 0, 1) + y(0, 1, 1) \]
    Tous les vecteurs de \(F\) se décomposent de manière unique comme combinaison linéaire de \(v_1 = (1,0,1)\) et \(v_2 = (0,1,1)\).
    Comme \(v_1\) et \(v_2\) ne sont pas colinéaires (coordonnées non proportionnelles), la famille \(\{v_1, v_2\}\) est libre.
    La famille \(\{v_1, v_2\}\) est donc une base de \(F\), et \(\dim F = 2\).
:::

:::block type="method" title="Méthode de calcul 2.2 : Prouver que deux ssev F et G sont supplémentaires"
On souhaite prouver que \(E = F \oplus G\) en dimension finie.

**Algorithme pas-à-pas :**
1.  **Déterminer les bases de \(F\) et \(G\)** et en déduire leurs dimensions.
2.  **Vérifier la condition sur les dimensions :** Démontrer que \(\dim F + \dim G = \dim E\).
    *   Si cette égalité n'est pas vérifiée, les espaces ne peuvent pas être supplémentaires.
3.  **Vérifier l'intersection :** Démontrer que \(F \cap G = \{\vec{0}_E\}\).
    *   Prendre un vecteur \(u \in F \cap G\). Il doit vérifier simultanément les équations de \(F\) et de \(G\).
    *   Résoudre le système d'équations qui en résulte. Si la seule solution est \(u = \vec{0}_E\), alors \(F \cap G = \{\vec{0}_E\}\).
4.  **Conclure :** Les deux conditions \(\dim F + \dim G = \dim E\) et \(F \cap G = \{\vec{0}_E\}\) suffisent à affirmer que \(E = F \oplus G\).
:::
:::
:::section id="mt321-chap3-applications-lineaires-matrices" eyebrow="Chapitre 3" title="Applications linéaires et matrices" summary="Représentations géométriques et matricielles : noyaux, images, théorème du rang, opérations matricielles et changements de base."
:::grid two-col
:::block type="definition" title="Applications linéaires"
Soient \(E\) et \(F\) deux \(\mathbb{K}\)-espaces vectoriels. Une application \(f : E \to F\) est linéaire ssi :
\[ \forall (u, v) \in E^2, \forall \lambda \in \mathbb{K}, \quad f(\lambda u + v) = \lambda f(u) + f(v) \]
*   **Noyau (Ker f) :** Le ssev de \(E\) contenant les vecteurs dont l'image par \(f\) est le vecteur nul de \(F\) :
    \[ \ker f = \{ u \in E \, / \, f(u) = \vec{0}_F \} \]
*   **Image (Im f) :** Le ssev de \(F\) contenant toutes les images possibles des vecteurs de \(E\) par \(f\) :
    \[ \text{Im } f = \{ f(u) \, / \, u \in E \} = \text{Vect}(f(e_1), \dots, f(e_n)) \]
    où \(\{e_1, \dots, e_n\}\) est une base de \(E\).
*   **Bijectivité :** \(f\) est injective ssi \(\ker f = \{\vec{0}_E\}\). Elle est surjective ssi \(\text{Im } f = F\). Un endomorphisme (\(E=F\)) de dimension finie est bijectif (isomorphisme) ssi il est injectif ou surjectif.
:::

:::block type="theorem" title="Matrice et changement de base"
*   **Théorème du Rang :** Relie la dimension du noyau et de l'image :
    \[ \dim(\ker f) + \text{rg}(f) = \dim E \quad (\text{où } \text{rg}(f) = \dim(\text{Im } f)) \]
*   **Matrice d'un endomorphisme :** Si \(A\) est la matrice de \(f\) dans une base \(\mathcal{B}\), et \(B\) sa matrice dans une base \(\mathcal{B}'\), alors :
    \[ B = P^{-1} A P \]
    où \(P\) est la **matrice de passage** de \(\mathcal{B}\) à \(\mathcal{B}'\), obtenue en écrivant en colonnes les coordonnées des vecteurs de \(\mathcal{B}'\) exprimés dans la base \(\mathcal{B}\).
:::
:::

:::block type="method" title="Méthode de calcul 3.1 : Déterminer le noyau et l'image d'une application linéaire"
Soit \(f \in \mathcal{L}(\mathbb{R}^3)\) définie par \(f(x, y, z) = (x+y+z, \, x+2y+3z, \, 2x+3y+4z)\).

**Algorithme pour le noyau (Ker f) :**
1.  **Poser le système :** Résoudre \(f(x,y,z) = (0,0,0)\).
    \[ \begin{cases} x + y + z = 0 \quad (L_1) \\ x + 2y + 3z = 0 \quad (L_2) \\ 2x + 3y + 4z = 0 \quad (L_3) \end{cases} \]
2.  **Résoudre par pivot de Gauss :**
    *   \(L_2 \leftarrow L_2 - L_1 \implies y + 2z = 0 \implies y = -2z\).
    *   \(L_3 \leftarrow L_3 - 2L_1 \implies y + 2z = 0\) (équation redondante).
    *   En remplaçant dans \(L_1\) : \(x - 2z + z = 0 \implies x = z\).
3.  **Écrire la base :** Les vecteurs du noyau s'écrivent \((z, -2z, z) = z(1, -2, 1)\).
    Une base de \(\ker f\) est donc constituée du seul vecteur \(v = (1, -2, 1)\). Ainsi, \(\dim(\ker f) = 1\).
    *Comme \(\ker f \ne \{(0,0,0)\}\), \(f\) n'est pas injective.*

**Algorithme pour l'image (Im f) :**
1.  **Utiliser la base canonique :** On sait que \(\text{Im } f = \text{Vect}(f(e_1), f(e_2), f(e_3))\) où \(e_1, e_2, e_3\) est la base canonique de \(\mathbb{R}^3\).
    *   \(f(e_1) = f(1,0,0) = (1, 1, 2)\)
    *   \(f(e_2) = f(0,1,0) = (1, 2, 3)\)
    *   \(f(e_3) = f(0,0,1) = (1, 3, 4)\)
2.  **Appliquer le Théorème du Rang :** \(\dim(\text{Im } f) = \dim E - \dim(\ker f) = 3 - 1 = 2\). Le rang de \(f\) vaut 2.
3.  **Extraire une base libre :** Puisque la dimension vaut 2, il suffit de sélectionner deux vecteurs non colinéaires parmi les trois images. Par exemple, \(w_1 = (1,1,2)\) et \(w_2 = (1,2,3)\) sont libres car non proportionnels.
    La famille \(\{(1,1,2), (1,2,3)\}\) est donc une base de \(\text{Im } f\).
    *Comme \(\dim(\text{Im } f) = 2 \ne 3\), \(f\) n'est pas surjective.*
:::

:::block type="method" title="Méthode de calcul 3.2 : Calcul de l'inverse d'une matrice (Gauss-Jordan / Système)"
On cherche l'inverse d'une matrice carrée \(A\) d'ordre \(n\).

**Algorithme par la méthode du système :**
1.  **Poser l'équation matricielle :** \(A X = Y\) où \(X = (x_1, \dots, x_n)^T\) et \(Y = (y_1, \dots, y_n)^T\).
2.  **Résoudre le système linéaire :** Exprimer chaque coordonnée \(x_i\) en fonction de \(y_j\) par substitutions successives ou pivot de Gauss.
3.  **Identifier \(A^{-1}\) :** L'écriture finale sous la forme \(X = B Y\) permet d'identifier directement \(A^{-1} = B\).

**Exemple d'exercice résolu (HA - Exercice 27) :**
Soit \(A = \begin{pmatrix} 2 & -1 & -1 \\ 1 & -1 & 2 \\ 1 & 2 & -1 \end{pmatrix}\). On pose le système \(AX = Y\) :
\[ \begin{cases} 2x - y - z = y_1 \quad (1) \\ x - y + 2z = y_2 \quad (2) \\ x + 2y - z = y_3 \quad (3) \end{cases} \]
*   \((2) \implies x = y - 2z + y_2\). En remplaçant dans \((1)\) et \((3)\) :
    *   \(2(y-2z+y_2) - y - z = y_1 \implies y - 5z = y_1 - 2y_2 \quad (4)\)
    *   \((y-2z+y_2) + 2y - z = y_3 \implies 3y - 3z = -y_2 + y_3 \quad (5) \implies y - z = \frac{-y_2 + y_3}{3}\).
*   Soustrayons \((4)\) de \((5)\) :
    \[ (y-z) - (y-5z) = \frac{-y_2+y_3}{3} - (y_1-2y_2) \implies 4z = -y_1 + \frac{5}{3}y_2 + \frac{1}{3}y_3 \implies z = -\frac{3}{12}y_1 + \frac{5}{12}y_2 + \frac{1}{12}y_3 \]
    Soit \(z = \frac{-3y_1 + 5y_2 + y_3}{12}\).
*   En remplaçant \(z\) dans \((4)\) :
    \[ y = 5z + y_1 - 2y_2 = 5\left(\frac{-3y_1 + 5y_2 + y_3}{12}\right) + \frac{12y_1 - 24y_2}{12} = \frac{-3y_1 + y_2 + 5y_3}{12} \]
*   Enfin, calculons \(x\) :
    \[ x = y - 2z + y_2 = \frac{-3y_1 + y_2 + 5y_3}{12} - 2\left(\frac{-3y_1 + 5y_2 + y_3}{12}\right) + \frac{12y_2}{12} = \frac{3y_1 + 3y_2 + 3y_3}{12} = \frac{3(y_1 + y_2 + y_3)}{12} \]
La matrice inverse est donc obtenue en lisant les coefficients des variables \(y_j\) :
\[ A^{-1} = \frac{1}{12} \begin{pmatrix} 3 & 3 & 3 \\ -3 & 1 & 5 \\ -3 & 5 & 1 \end{pmatrix} \]
:::
:::
:::section id="mt321-chap4-determinants-diagonalisation" eyebrow="Chapitre 4" title="Déterminants et diagonalisation" summary="Réduction d'endomorphismes : calcul de déterminants, polynôme caractéristique, valeurs et vecteurs propres, diagonalisation d'une matrice d'ordre 3."
:::grid two-col
:::block type="definition" title="Éléments propres et déterminant"
*   **Déterminant d'une matrice \(3\times3\) :** Se calcule par rapport à une ligne/colonne ou par la méthode de Sarrus. Une matrice \(A\) est inversible ssi \(\det A \ne 0\).
*   **Valeur propre (\(\lambda\)) et Vecteur propre (\(X\)) :** \(\lambda \in \mathbb{K}\) est une valeur propre de \(A\) ssi il existe un vecteur non nul \(X\) tel que :
    \[ A X = \lambda X \iff (A - \lambda I_n) X = \vec{0} \]
*   **Polynôme caractéristique :** Défini par \(\chi_A(\lambda) = \det(A - \lambda I_n)\). Les valeurs propres de \(A\) sont exactement les racines de \(\chi_A\).
*   **Sous-espace propre (SEP) :** Le ssev associé à \(\lambda\), défini par \(E_\lambda = \ker(A - \lambda I_n)\).
:::

:::block type="theorem" title="Diagonalisabilité"
Une matrice \(A \in \mathcal{M}_n(\mathbb{K})\) est diagonalisable ssi :
1.  Son polynôme caractéristique \(\chi_A\) est **scindé** dans \(\mathbb{K}\) (toutes ses racines appartiennent à \(\mathbb{K}\)).
2.  Pour chaque valeur propre \(\lambda_i\) de multiplicité algébrique \(\alpha_i\), on a l'égalité :
    \[ \dim(E_{\lambda_i}) = \alpha_i \]
*   *Condition suffisante :* Si \(A\) possède \(n\) valeurs propres distinctes, alors elle est diagonalisable d'office.

**Relation de diagonalisation :**
S'il existe une base de vecteurs propres, la matrice de passage \(P\) permet de diagonaliser \(A\) :
\[ D = P^{-1} A P \iff A = P D P^{-1} \]
D'où le calcul de puissance directe : \(A^n = P D^n P^{-1}\).
:::
:::

:::block type="method" title="Méthode de calcul 4.1 : Diagonaliser pas-à-pas une matrice d'ordre 3"
Soit à diagonaliser la matrice \(A = \begin{pmatrix} 3 & -1 & 1 \\ 2 & 0 & 1 \\ 1 & -1 & 2 \end{pmatrix}\).

**Algorithme pas-à-pas :**
1.  **Calculer le polynôme caractéristique :** \(\chi_A(\lambda) = \det(A - \lambda I_3)\).
    \[ \chi_A(\lambda) = \begin{vmatrix} 3-\lambda & -1 & 1 \\ 2 & -\lambda & 1 \\ 1 & -1 & 2-\lambda \end{vmatrix} \]
    En effectuant des opérations sur les colonnes, notamment \(C_1 \leftarrow C_1 + C_2\) :
    \[ \chi_A(\lambda) = \begin{vmatrix} 2-\lambda & -1 & 1 \\ 2-\lambda & -\lambda & 1 \\ 0 & -1 & 2-\lambda \end{vmatrix} = (2-\lambda) \begin{vmatrix} 1 & -1 & 1 \\ 1 & -\lambda & 1 \\ 0 & -1 & 2-\lambda \end{vmatrix} \]
    Puis \(L_2 \leftarrow L_2 - L_1\) :
    \[ \chi_A(\lambda) = (2-\lambda) \begin{vmatrix} 1 & -1 & 1 \\ 0 & 1-\lambda & 0 \\ 0 & -1 & 2-\lambda \end{vmatrix} = (2-\lambda)(1-\lambda)(2-\lambda) = (1-\lambda)(2-\lambda)^2 \]
2.  **Déterminer les valeurs propres :**
    *   \(\lambda_1 = 1\) (simple, multiplicité \(\alpha_1 = 1\))
    *   \(\lambda_2 = 2\) (double, multiplicité \(\alpha_2 = 2\))
3.  **Déterminer les sous-espaces propres associés :**
    *   **Pour \(\lambda_1 = 1\) :** Résoudre \((A - I_3)X = 0\).
        \[ \begin{pmatrix} 2 & -1 & 1 \\ 2 & -1 & 1 \\ 1 & -1 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} \implies \begin{cases} 2x - y + z = 0 \\ x - y + z = 0 \end{cases} \implies \begin{cases} x = 0 \\ y = z \end{cases} \]
        Un vecteur propre associé est \(\varepsilon_1 = (0, 1, 1)\). \(E_1 = \text{Vect}(\varepsilon_1)\), \(\dim E_1 = 1\).
    *   **Pour \(\lambda_2 = 2\) :** Résoudre \((A - 2I_3)X = 0\).
        \[ \begin{pmatrix} 1 & -1 & 1 \\ 2 & -2 & 1 \\ 1 & -1 & 0 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} \implies \begin{cases} x - y + z = 0 \\ 2x - 2y + z = 0 \\ x - y = 0 \end{cases} \implies \begin{cases} z = 0 \\ x = y \end{cases} \]
        Un vecteur propre associé est \(\varepsilon_2 = (1, 1, 0)\). \(E_2 = \text{Vect}(\varepsilon_2)\), \(\dim E_2 = 1\).
4.  **Vérifier la diagonalisabilité :**
    Ici, \(\dim E_2 = 1 < \alpha_2 = 2\). La matrice n'est donc **pas diagonalisable** dans \(\mathbb{R}\).
    *Remarque (Trigonalisation) :* Cependant, on peut l'amener sous forme de Jordan (trigonalisation) en cherchant un troisième vecteur \(\varepsilon_3\) libre tel que \(f(\varepsilon_3) = \varepsilon_2 + 2\varepsilon_3\). Si on choisit \(\varepsilon_3 = (1,1,1)\), on obtient :
    \[ f(\varepsilon_3) = A \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 3 \\ 2 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix} + 2 \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \varepsilon_2 + 2\varepsilon_3 \]
    Dans la base \(\mathcal{B}' = (\varepsilon_1, \varepsilon_2, \varepsilon_3)\), la matrice de l'endomorphisme s'écrit :
    \[ T = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 1 \\ 0 & 0 & 2 \end{pmatrix} \]
:::
:::
:::section id="mt321-chap5-espaces-prehilbertiens" eyebrow="Chapitre 5" title="Espaces préhilbertiens" summary="Géométrie et orthogonalité dans les espaces vectoriels réels et complexes : produits scalaires, normes, projection orthogonale et orthonormalisation de Gram-Schmidt."
:::grid two-col
:::block type="definition" title="Produit scalaire et Normes"
*   **Espace préhilbertien réel :** Un \(\mathbb{R}\)-e.v. muni d'une application bilinéaire, symétrique, définie positive, notée \(\langle u, v \rangle\).
*   **Espace préhilbertien complexe (Hermitien) :** Un \(\mathbb{C}\)-e.v. muni d'une forme sesquilinéaire hermitienne définie positive.
*   **Inégalité de Cauchy-Schwarz :**
    \[ |\langle u, v \rangle| \le \|u\| \|v\| \quad (\text{où } \|u\| = \sqrt{\langle u, u \rangle}) \]
    Il y a égalité si et seulement si \(u\) et \(v\) sont colinéaires.
*   **Orthogonalité :** \(u \perp v \iff \langle u, v \rangle = 0\).
:::

:::block type="theorem" title="Projection et distance"
*   **Théorème de Pythagore :** Si \(\{x_1, \dots, x_p\}\) est une famille orthogonale, alors :
    \[ \| x_1 + \dots + x_p \|^2 = \|x_1\|^2 + \dots + \|x_p\|^2 \]
*   **Projection orthogonale :** Si \(F\) est un ssev de dimension finie et \(\{e_1, \dots, e_p\}\) est une base **orthonormée** de \(F\), alors le projeté orthogonal de \(x\) sur \(F\) est :
    \[ p_F(x) = \sum_{i=1}^p \langle x, e_i \rangle e_i \]
*   **Distance minimale :** La distance minimale de \(x\) au ssev \(F\) vaut :
    \[ d(x, F) = \inf_{f \in F} \|x-f\| = \|x - p_F(x)\| \]
:::
:::

:::block type="method" title="Méthode de calcul 5.1 : Algorithme d'orthonormalisation de Gram-Schmidt"
Permet de transformer une base quelconque \((u_1, \dots, u_p)\) en une base orthonormée \((e_1, \dots, e_p)\).

**Algorithme pas-à-pas :**
1.  **Construire le premier vecteur unitaire :**
    \[ v_1 = u_1 \quad \implies \quad e_1 = \frac{v_1}{\|v_1\|} \]
2.  **Construire le deuxième vecteur orthogonal, puis le normaliser :**
    *   Soustrait la projection sur \(e_1\) :
        \[ v_2 = u_2 - \langle u_2, e_1 \rangle e_1 \]
    *   Normaliser :
        \[ e_2 = \frac{v_2}{\|v_2\|} \]
3.  **Construire le troisième vecteur orthogonal, puis le normaliser :**
    *   Soustrait les projections sur \(e_1\) et \(e_2\) :
        \[ v_3 = u_3 - \langle u_3, e_1 \rangle e_1 - \langle u_3, e_2 \rangle e_2 \]
    *   Normaliser :
        \[ e_3 = \frac{v_3}{\|v_3\|} \]
4.  **Généraliser pour le terme \(k\) :**
    \[ v_k = u_k - \sum_{i=1}^{k-1} \langle u_k, e_i \rangle e_i \quad \implies \quad e_k = \frac{v_k}{\|v_k\|} \]
:::
:::
:::section id="mt321-chap6-series-fourier" eyebrow="Chapitre 6" title="Séries de Fourier" summary="Analyse harmonique : décomposition spectrale des signaux périodiques, coefficients de Fourier, théorèmes de convergence et calcul de sommes de séries par l'égalité de Parseval."
:::grid two-col
:::block type="definition" title="Structure et Coefficients"
Soit \(D_T\) l'espace des fonctions complexes \(T\)-périodiques et continues par morceaux sur \(\mathbb{R}\). On le munit du produit scalaire hermitien :
\[ \langle f, g \rangle = \frac{1}{T} \int_{[T]} f(t) \overline{g(t)} \, dt \]
*   **Coefficients complexes (\(c_n\)) :**
    \[ c_n = \frac{1}{T} \int_{[T]} f(t) e^{-in\omega t} \, dt \quad (\text{avec } \omega = \frac{2\pi}{T}) \]
*   **Coefficients réels (\(a_n, b_n\)) :**
    \[ a_n = \frac{2}{T} \int_{[T]} f(t) \cos(n\omega t) \, dt \quad \text{et} \quad b_n = \frac{2}{T} \int_{[T]} f(t) \sin(n\omega t) \, dt \]
    *   \(a_0 = \frac{2}{T} \int_{[T]} f(t) dt\) (valeur moyenne double).
*   **Relations réels-complexes :**
    \[ c_n = \frac{a_n - i b_n}{2}, \quad c_{-n} = \frac{a_n + i b_n}{2}, \quad b_0 = 0 \]
*   **Parité :** Si \(f\) est paire, \(b_n = 0\). Si \(f\) est impaire, \(a_n = 0\).
:::

:::block type="theorem" title="Théorèmes de Convergence"
*   **Série de Fourier de f :**
    \[ S_f(t) = \frac{a_0}{2} + \sum_{n=1}^\infty [a_n \cos(n\omega t) + b_n \sin(n\omega t)] = \sum_{n=-\infty}^{+\infty} c_n e^{in\omega t} \]
*   **Théorème de Dirichlet :** Si \(f\) est \(C^1\) par morceaux, alors sa série de Fourier converge simplement vers sa régularisée :
    \[ S_f(t) = \frac{f(t^+) + f(t^-)}{2} \]
    En particulier, si \(f\) est continue en \(t\), la série converge vers \(f(t)\).
*   **Théorème de Parseval :** Équivalence de l'énergie moyenne :
    *   *Cas réel :* \( \frac{1}{T} \int_{[T]} (f(t))^2 \, dt = \frac{a_0^2}{4} + \frac{1}{2} \sum_{n=1}^\infty (a_n^2 + b_n^2) \)
    *   *Cas complexe :* \( \frac{1}{T} \int_{[T]} |f(t)|^2 \, dt = \sum_{n=-\infty}^{+\infty} |c_n|^2 \)
:::
:::

:::plotly id="mt321-fourier-triangle" label="Séries de Fourier" title="Convergence de la Série de Fourier - Fonction Triangle" height="420" caption="Approximation de la fonction triangle f(x) par les harmoniques successives (S0, S1, S3, S5)."
{
  "series": [
    {
      "generator": "function",
      "range": [-3.14159, 3.14159],
      "points": 200,
      "y": "abs(x)",
      "name": "f(x) = |x|"
    },
    {
      "generator": "function",
      "range": [-3.14159, 3.14159],
      "points": 200,
      "y": "3.14159/2",
      "name": "S0(x) = PI/2"
    },
    {
      "generator": "function",
      "range": [-3.14159, 3.14159],
      "points": 200,
      "y": "3.14159/2 - (4/3.14159)*cos(x)",
      "name": "S1(x)"
    },
    {
      "generator": "function",
      "range": [-3.14159, 3.14159],
      "points": 200,
      "y": "3.14159/2 - (4/3.14159)*(cos(x) + cos(3*x)/9)",
      "name": "S3(x)"
    },
    {
      "generator": "function",
      "range": [-3.14159, 3.14159],
      "points": 200,
      "y": "3.14159/2 - (4/3.14159)*(cos(x) + cos(3*x)/9 + cos(5*x)/25)",
      "name": "S5(x)"
    }
  ],
  "layout": {
    "xaxis": { "title": "x (rad)" },
    "yaxis": { "title": "y" }
  },
  "config": {
    "responsive": true
  }
}
:::

:::block type="method" title="Méthode de calcul 6.1 : Calcul complet du développement de la fonction triangle"
Soit la fonction \(f\) périodique de période \(T = 2\pi\) (donc \(\omega = 1\)), définie sur \([-\pi, \pi]\) par \(f(t) = |t|\).

**Algorithme pas-à-pas de calcul des coefficients :**
1.  **Analyser la parité :** \(f\) est paire car \(f(-t) = |-t| = |t| = f(t)\). Ainsi, \(b_n = 0\) pour tout \(n \ge 1\).
2.  **Calculer \(a_0\) :**
    \[ a_0 = \frac{2}{2\pi} \int_{-\pi}^{\pi} f(t) \, dt = \frac{2}{\pi} \int_0^\pi t \, dt = \frac{2}{\pi} \left[ \frac{t^2}{2} \right]_0^\pi = \frac{2}{\pi} \frac{\pi^2}{2} = \pi \]
3.  **Calculer \(a_n\) pour \(n \ge 1\) (IPP) :**
    \[ a_n = \frac{2}{\pi} \int_0^\pi t \cos(nt) \, dt \]
    Posons : \(\begin{cases} u(t) = t \implies u'(t) = 1 \\ v'(t) = \cos(nt) \implies v(t) = \frac{\sin(nt)}{n} \end{cases}\)
    En appliquant l'intégration par parties :
    \[ a_n = \frac{2}{\pi} \left( \left[ t \frac{\sin(nt)}{n} \right]_0^\pi - \int_0^\pi \frac{\sin(nt)}{n} \, dt \right) = \frac{2}{\pi} \left( 0 - \left[ -\frac{\cos(nt)}{n^2} \right]_0^\pi \right) = \frac{2}{\pi} \left( \frac{\cos(n\pi) - 1}{n^2} \right) \]
    Comme \(\cos(n\pi) = (-1)^n\) :
    \[ a_n = \frac{2}{\pi \, n^2} ((-1)^n - 1) \]
    *   Si \(n\) est pair : \(a_{2k} = 0\).
    *   Si \(n\) est impair : \(a_{2k+1} = \frac{2}{\pi (2k+1)^2} (-2) = -\frac{4}{\pi} \frac{1}{(2k+1)^2}\).
4.  **Établir la Série de Fourier :**
    \[ S_f(t) = \frac{\pi}{2} - \frac{4}{\pi} \sum_{k=0}^\infty \frac{\cos((2k+1)t)}{(2k+1)^2} \]
:::

:::block type="method" title="Méthode de calcul 6.2 : Calcul de sommes de séries numériques infinies"
Permet de sommer des séries complexes à l'aide de Dirichlet et Parseval.

**1. Calcul de \(\sum_{n=1}^\infty \frac{1}{n^2}\) via le théorème de Dirichlet :**
*   \(f\) est \(C^1\) par morceaux et continue sur \(\mathbb{R}\). D'après le théorème de Dirichlet, pour \(t=0\), la série converge vers \(f(0) = 0\).
    \[ 0 = S_f(0) = \frac{\pi}{2} - \frac{4}{\pi} \sum_{k=0}^\infty \frac{\cos(0)}{(2k+1)^2} \implies \sum_{k=0}^\infty \frac{1}{(2k+1)^2} = \frac{\pi^2}{8} \]
*   On décompose la somme complète sur les pairs et impairs :
    \[ \sum_{n=1}^\infty \frac{1}{n^2} = \sum_{k=0}^\infty \frac{1}{(2k+1)^2} + \sum_{k=1}^\infty \frac{1}{(2k)^2} = \frac{\pi^2}{8} + \frac{1}{4} \sum_{n=1}^\infty \frac{1}{n^2} \]
    En posant \(S = \sum_{n=1}^\infty \frac{1}{n^2}\) :
    \[ S - \frac{1}{4} S = \frac{\pi^2}{8} \implies \frac{3}{4} S = \frac{\pi^2}{8} \implies S = \frac{\pi^2}{6} \]

**2. Calcul de \(\sum_{n=1}^\infty \frac{1}{n^4}\) via le théorème de Parseval :**
*   Calculons l'énergie moyenne de \(f\) :
    \[ \frac{1}{2\pi} \int_{-\pi}^{\pi} (f(t))^2 \, dt = \frac{1}{\pi} \int_0^\pi t^2 \, dt = \frac{1}{\pi} \left[ \frac{t^3}{3} \right]_0^\pi = \frac{\pi^2}{3} \]
*   D'après l'égalité de Parseval :
    \[ \frac{\pi^2}{3} = \frac{a_0^2}{4} + \frac{1}{2} \sum_{n=1}^\infty a_n^2 = \frac{\pi^2}{4} + \frac{1}{2} \sum_{k=0}^\infty \left( -\frac{4}{\pi (2k+1)^2} \right)^2 = \frac{\pi^2}{4} + \frac{8}{\pi^2} \sum_{k=0}^\infty \frac{1}{(2k+1)^4} \]
*   D'où :
    \[ \frac{\pi^2}{3} - \frac{\pi^2}{4} = \frac{8}{\pi^2} \sum_{k=0}^\infty \frac{1}{(2k+1)^4} \implies \frac{\pi^2}{12} = \frac{8}{\pi^2} \sum_{k=0}^\infty \frac{1}{(2k+1)^4} \implies \sum_{k=0}^\infty \frac{1}{(2k+1)^4} = \frac{\pi^4}{96} \]
*   Pour la somme totale \(T = \sum_{n=1}^\infty \frac{1}{n^4}\) :
    \[ T = \sum_{k=0}^\infty \frac{1}{(2k+1)^4} + \sum_{k=1}^\infty \frac{1}{(2k)^4} = \frac{\pi^4}{96} + \frac{1}{16} T \implies \frac{15}{16} T = \frac{\pi^4}{96} \implies T = \frac{\pi^4}{90} \]
:::
:::
