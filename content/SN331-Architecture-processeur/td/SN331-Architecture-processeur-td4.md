---
title: "TD 4 corrige - Fonctionnement et Analyse de la Mémoire Cache"
subject: "SN331-Architecture-processeur"
type: "td"
target: "SN331-Architecture-processeur-td4.html"
eyebrow: "SN331 - TD 4"
heading: "Fonctionnement et Analyse de la Mémoire Cache"
summary: "Correction guidee avec methodes, calculs et points de vigilance."
withPrism: true
---
:::section id="sn331-td4" eyebrow="TD 4" title="Fonctionnement et Analyse de la Mémoire Cache" summary="Correction guidee avec methodes, calculs et points de vigilance."


:::exercise label="TD 4" title="Exercice 1 : Cache direct-mapped de 8 lignes x 32 octets"

* Capacité mémoire centrale : $64\text{ kio} = 2^{16}\text{ octets}$ (adresses codées sur 16 bits).
* Cache : 8 entrées ($2^3$), chaque entrée contient $32\text{ octets} = 2^{5}\text{ octets}$.

**1. Pourquoi le champ OCTET comporte-t-il 5 bits et le champ ENTREE 3 bits ?**
* **OFFSET (OCTET)** : Chaque ligne de cache contient 32 octets. Pour pouvoir adresser de façon unique chacun de ces 32 octets, il faut $\log_2(32) = 5\text{ bits}$.
* **INDEX (ENTREE)** : Le cache comporte 8 entrées. Pour désigner l'une de ces 8 entrées, il faut $\log_2(8) = 3\text{ bits}$.
* **TAG (INDICATEUR)** : Les bits restants de l'adresse de 16 bits servent d'identifiant unique : $16 - 5 - 3 = 8\text{ bits}$.

**2. En combien de lignes de cache se décompose la mémoire centrale ?**
$$\text{Nombre de lignes} = \frac{\text{Taille Mémoire Centrale}}{\text{Taille d'une Ligne}} = \frac{64\text{ kio}}{32\text{ o}} = \frac{2^{16}}{2^5} = 2^{11} = 2048\text{ lignes}$$

**3. Décomposition et calculs des adresses**
Chaque adresse de 16 bits se structure en : `Tag (15-8)` | `Index (7-5)` | `Offset (4-0)`.
* Le numéro de ligne de la mémoire centrale est : $\ell = \text{Adresse} / 32$.
* L'entrée de cache associée est : $e = \ell \bmod 8$ (ou la valeur représentée par les bits 7-5).

| Adresse (Hexa.) | Adresse (Binaire) | Ligne $\ell$ (déc.) | Entrée $e$ (déc.) | Tag (Hexa) |
|---|---|---|---|---|
| `0BBFH` | `0000 1011 1011 1111` | $3007 / 32 = 93$ | $93 \bmod 8 = 5$ | `0BH` |
| `0BC0H` | `0000 1011 1100 0000` | $3008 / 32 = 94$ | $94 \bmod 8 = 6$ | `0BH` |
| `0BC1H` | `0000 1011 1100 0001` | $3009 / 32 = 94$ | $94 \bmod 8 = 6$ | `0BH` |
| `05AEH` | `0000 0101 1010 1110` | $1454 / 32 = 45$ | $45 \bmod 8 = 5$ | `05H` |
| `05BFH` | `0000 0101 1011 1111` | $1471 / 32 = 45$ | $45 \bmod 8 = 5$ | `05H` |
| `05C0H` | `0000 0101 1100 0000` | $1472 / 32 = 46$ | $46 \bmod 8 = 6$ | `05H` |

**4. Simulation d'accès (Cache initialement vide)**

1. **Accès à `0BBFH`** (Ligne $\ell_{93}$, Entrée $e_5$) : **MISS** (Défaut). $\ell_{93}$ est chargée dans l'entrée $e_5$.
2. **Accès à `0BC0H`** (Ligne $\ell_{94}$, Entrée $e_6$) : **MISS** (Défaut). $\ell_{94}$ est chargée dans l'entrée $e_6$.
3. **Accès à `0BC1H`** (Ligne $\ell_{94}$, Entrée $e_6$) : **HIT** (Succès). La ligne $\ell_{94}$ est déjà présente dans l'entrée $e_6$.
4. **Accès à `05AEH`** (Ligne $\ell_{45}$, Entrée $e_5$) : **MISS** (Défaut). Conflit d'index ! La ligne $\ell_{45}$ évince $\ell_{93}$ de l'entrée $e_5$.
5. **Accès à `05BFH`** (Ligne $\ell_{45}$, Entrée $e_5$) : **HIT** (Succès). La ligne $\ell_{45}$ est présente dans $e_5$.
6. **Accès à `05C0H`** (Ligne $\ell_{46}$, Entrée $e_6$) : **MISS** (Défaut). Conflit d'index ! La ligne $\ell_{46}$ évince $\ell_{94}$ de l'entrée $e_6$.

**Bilan de la simulation** : 4 défauts de cache (miss) pour 6 requêtes d'accès.
:::

:::exercise label="TD 4" title="Exercice 2 : Somme de deux vecteurs `C[i] = A[i] + B[i]`"

* Vecteurs : `A`, `B`, `C` d'entiers signés (32 bits = 4 octets).
* Cache direct : 4 entrées de 32 octets. Tableaux alloués de manière contiguë en mémoire centrale, avec `A` aligné au début de la ligne $\ell_0$.

**1. Combien de variables de type `int` par ligne de cache ?**
$$\text{Capacité d'une ligne} = \frac{32\text{ octets}}{4\text{ octets/int}} = 8\text{ entiers}$$

**2. Combien de lignes de cache consécutives occupe chaque tableau ?**
Chaque tableau contient 16 entiers signés, soit un volume de $16 \times 4 = 64\text{ octets}$.
$$\text{Lignes de cache} = \frac{64\text{ octets}}{32\text{ octets/ligne}} = 2\text{ lignes de cache par tableau}$$

**3. Répartition en mémoire et correspondance dans le cache**
Les tableaux étant disposés consécutivement :
* **Tableau A** : occupe les lignes $\ell_0$ (`A[0..7]`) et $\ell_1$ (`A[8..15]`).
* **Tableau B** : occupe les lignes $\ell_2$ (`B[0..7]`) et $\ell_3$ (`B[8..15]`).
* **Tableau C** : occupe les lignes $\ell_4$ (`C[0..7]`) et $\ell_5$ (`C[8..15]`).

*Mappage de ces lignes de mémoire dans le cache ($e = \ell \bmod 4$)* :
* $\ell_0$ (A[0..7]) $\rightarrow$ entrée **$e_0$**
* $\ell_1$ (A[8..15]) $\rightarrow$ entrée **$e_1$**
* $\ell_2$ (B[0..7]) $\rightarrow$ entrée **$e_2$**
* $\ell_3$ (B[8..15]) $\rightarrow$ entrée **$e_3$**
* $\ell_4$ (C[0..7]) $\rightarrow$ entrée **$e_0$** (Conflit structurel avec $\ell_0$ !)
* $\ell_5$ (C[8..15]) $\rightarrow$ entrée **$e_1$** (Conflit structurel avec $\ell_1$ !)

**4. Analyse des échecs de cache par itération de la boucle**

* **Pour $i = 0$** :
  * Lecture `A` (ligne $\ell_0$, mappée en $e_0$) $\rightarrow$ **MISS**. Chargement de $\ell_0$ en $e_0$.
  * Lecture `B` (ligne $\ell_2$, mappée en $e_2$) $\rightarrow$ **MISS**. Chargement de $\ell_2$ en $e_2$.
  * Écriture `C` (ligne $\ell_4$, mappée en $e_0$) $\rightarrow$ **MISS**. Conflit ! $\ell_4$ écrase $\ell_0$ en $e_0$.
  * **Nombre d'échecs = 3**.
* **Pour $i = 1$** :
  * Lecture `A` (ligne $\ell_0$, mappée en $e_0$) $\rightarrow$ **MISS**. Conflit ! $\ell_0$ écrase $\ell_4$ en $e_0$.
  * Lecture `B` (ligne $\ell_2$, mappée en $e_2$) $\rightarrow$ **HIT**. $\ell_2$ est déjà en $e_2$.
  * Écriture `C` (ligne $\ell_4$, mappée en $e_0$) $\rightarrow$ **MISS**. Conflit ! $\ell_4$ écrase $\ell_0$ en $e_0$.
  * **Nombre d'échecs = 2**.
* **Pour $i = 2$ à $7$** :
  * Ce cycle d'alternance destructif en entrée $e_0$ se poursuit identiquement à $i=1$.
  * Pour chaque itération de 2 à 7 : **2 MISS** (Lecture de A et Écriture de C sont des échecs de conflit).
* **Pour $i = 8$** :
  * On bascule sur la seconde moitié des tableaux (lignes $\ell_1$, $\ell_3$ et $\ell_5$).
  * Lecture `A` (ligne $\ell_1$ en $e_1$) $\rightarrow$ **MISS**.
  * Lecture `B` (ligne $\ell_3$ en $e_3$) $\rightarrow$ **MISS**.
  * Écriture `C` (ligne $\ell_5$ en $e_1$) $\rightarrow$ **MISS** (écrase $\ell_1$).
  * **Nombre d'échecs = 3**.
* **Pour $i = 9$ à $15$** :
  * Même dynamique de conflit récurrent sur $e_1$.
  * Chaque itération provoque **2 MISS** (Lecture de A et Écriture de C).

#### Résumé Global
* **Total des échecs (cache misses)** :
  * $i = 0$ : 3 échecs
  * $i = 1..7$ : 7 itérations $\times 2 = 14$ échecs
  * $i = 8$ : 3 échecs
  * $i = 9..15$ : 7 itérations $\times 2 = 14$ échecs
  * **Total = 34 échecs** de cache sur l'ensemble de la boucle.
:::

:::exercise label="TD 4" title="Exercice 4 : Mémoire cache - petits calculs"

* Mots de 1 octet. Adresses codées sur 32 bits.
* Cache direct de **4 kio** ($2^{12}$ o) avec des lignes de **128 octets** ($2^7$ o).

**1. Nombre de bits codant les différents champs**
* **OFFSET (OCTET)** : Taille ligne = 128 o = $2^7$ o $\rightarrow$ **7 bits**.
* **INDEX (ENTREE)** : Nombre de lignes de cache = $\frac{\text{Taille Cache}}{\text{Taille Ligne}} = \frac{4096}{128} = 32\text{ lignes} = 2^5$ $\rightarrow$ **5 bits**.
* **TAG (INDICATEUR)** : Bits restants = $32 - 7 - 5 = $ **20 bits**.

**2. Analyse des adresses hexadécimales**
Pour décomposer les adresses, on convertit la fin de l'adresse en binaire :
* Les bits 0 à 6 représentent l'Offset (7 bits).
* Les bits 7 à 11 représentent l'Index (5 bits).
* Les bits 12 à 31 représentent le Tag (20 bits).

* **Adresse 1 : `0xA23847EF`**
  * Les 3 derniers chiffres hexa (`7EF`) décodent les champs bas : `7EF` = `0111 1110 1111`
  * Les 7 bits d'Offset (bits 6-0) : `110 1111` = `0x6F` (111 en décimal).
  * Les 5 bits d'Index (bits 11-7) : `0111 1` = `01111` = **15** (soit l'entrée $e_{15}$).
  * Le Tag (bits 31-12) : `0xA2384`.

* **Adresse 2 : `0x7245E824`**
  * Fin de l'adresse : `824` = `1000 0010 0100`
  * Les 7 bits d'Offset (bits 6-0) : `010 0100` = `0x24` (36 en décimal).
  * Les 5 bits d'Index (bits 11-7) : `1000 0` = `10000` = **16** (soit l'entrée $e_{16}$).
  * Le Tag (bits 31-12) : `0x7245E`.

**3. Adresses stockées simultanément dans la même ligne que `0xA23847EF`**
Toutes les adresses qui partagent le même Tag (`0xA2384`) et le même Index (`15`) sont localisées dans la même ligne physique. L'offset variant de `0x00` à `0x7F` (0 à 127), l'intervalle d'adresses stockées dans cette ligne est :
$$\text{De } 0x\text{A2384780} \quad \text{à} \quad 0x\text{A23847FF}$$
:::
:::
