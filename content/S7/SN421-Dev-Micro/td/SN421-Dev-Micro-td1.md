---
title: "TD 1 corrigé - Bases de la programmation embarquée"
subject: "SN421-Dev-Micro"
type: td
target: SN421-Dev-Micro-td1.html
eyebrow: "SN421 - TD 1"
heading: "Bases et introduction à la programmation embarquée"
summary: "Conversions binaires, calculs hexadécimaux, choix d'une cible temps réel, FFT, adéquation algorithme-architecture et plan mémoire du STM32F4."
---

:::quicklinks
* [Exercice 1 : Révisions & Conversions](#exercice-1)
* [Exercice 2 : Calculs en Base 16](#exercice-2)
* [Exercice 3 : Choix d'une Cible Matérielle](#exercice-3)
* [Exercice 4 : Oscilloscope FFT](#exercice-4)
* [Exercice 5 : Adéquation Algorithme-Architecture](#exercice-5)
* [Exercice 6 : Plan Mémoire du STM32F4](#exercice-6)
:::

:::section id="exercice-1" eyebrow="Partie 1" title="Exercice 1 : Révisions — Conversions et manipulations des nombres" summary="Bases du codage des entiers, représentabilité sur 10 bits signés / non signés, conversions et complément à 2."

:::exercise label="Exercice 1" title="Énoncés"
**1)** Rappeler les bornes minimale et maximale pour le codage des nombres signés et non signés sur $n$ bits.

**2)** Pour chaque nombre suivant en base 10, indiquer si le nombre peut être représenté sur 10 bits signés et sur 10 bits non signés et effectuer la conversion : 
$$344, \quad 115, \quad -42, \quad 666, \quad -950, \quad -496, \quad 260, \quad 1515$$
Donner également leur représentation hexadécimale.

**3)** Pour chaque nombre suivant en base 2 sur 8 bits signés, donner sa valeur numérique correspondante en base 10 : 
* `0b0100 0011`
* `0b1010 0110`
* `0b0011 0000`
* `0b1111 1101`
* `0b0011 1011`

**4)** Convertir les nombres binaires suivants en base 8 (octal) et en base 16 (hexadécimal) :
* `0b11100100`
* `0b010100111`
* `0b010001000`
* `0b110000001`

**5)** Donner le complément à 1 (C1) et le complément à 2 (C2) des nombres hexadécimaux suivants (codés sur 8 bits) :
* `0xF4`
* `0xDA`
* `0x5C`
* `0x24`
:::

:::block type="method" title="Correction et Raisonnement pas-à-pas"

#### 1) Bornes minimale et maximale pour $n$ bits
* **Format non signé (Unsigned) :**
  La plus petite valeur est $0$ (tous les bits à 0) et la plus grande valeur correspond à tous les bits à 1 (soit $2^n - 1$).
  $$\text{Intervalle} = [0, \, 2^n - 1]$$
* **Format signé en complément à 2 (Signed) :**
  Le bit de poids fort (MSB) sert de bit de signe.
  La plus petite valeur négative est $-2^{n-1}$ (représentée par `1` suivi de $n-1$ zéros) et la plus grande valeur positive est $2^{n-1} - 1$ (représentée par `0` suivi de $n-1$ uns).
  $$\text{Intervalle} = [-2^{n-1}, \, 2^{n-1} - 1]$$

---

#### 2) Représentabilité et conversion sur 10 bits ($n = 10$)
Sur $10$ bits :
* Bornes non signées : $[0, \, 2^{10} - 1] = [0, \, 1023]$
* Bornes signées : $[-2^9, \, 2^9 - 1] = [-512, \, 511]$

:::grid two-col
:::block type="definition" title="Analyse des nombres positifs"
* **$344$ :**
  * *Signé (10 bits) :* **Oui** ($344 \in [-512, 511]$) $\rightarrow$ `0b0101011000` $\rightarrow$ `0x158`
  * *Non signé (10 bits) :* **Oui** ($344 \in [0, 1023]$) $\rightarrow$ `0b0101011000` $\rightarrow$ `0x158`
* **$115$ :**
  * *Signé :* **Oui** ($115 \in [-512, 511]$) $\rightarrow$ `0b0001110011` $\rightarrow$ `0x073`
  * *Non signé :* **Oui** ($115 \in [0, 1023]$) $\rightarrow$ `0b0001110011` $\rightarrow$ `0x073`
* **$666$ :**
  * *Signé :* **Non** ($666 > 511$, dépassement positif)
  * *Non signé :* **Oui** ($666 \in [0, 1023]$) $\rightarrow$ `0b1010011010` $\rightarrow$ `0x29A`
* **$260$ :**
  * *Signé :* **Oui** ($260 \in [-512, 511]$) $\rightarrow$ `0b0100000100` $\rightarrow$ `0x104`
  * *Non signé :* **Oui** ($260 \in [0, 1023]$) $\rightarrow$ `0b0100000100` $\rightarrow$ `0x104`
* **$1515$ :**
  * *Signé :* **Non** ($1515 > 511$)
  * *Non signé :* **Non** ($1515 > 1023$)
:::
:::block type="warning" title="Analyse des nombres négatifs"
* **$-42$ :**
  * *Signé :* **Oui** ($-42 \in [-512, 511]$)
    * $+42 = \text{`0b0000101010`}$
    * Complément à 1 : `0b1111010101`
    * Complément à 2 : `0b1111010110` $\rightarrow$ `0x3D6`
  * *Non signé :* **Non** (un nombre négatif ne peut pas être représenté en non signé)
* **$-950$ :**
  * *Signé :* **Non** ($-950 < -512$, dépassement négatif)
  * *Non signé :* **Non**
* **$-496$ :**
  * *Signé :* **Oui** ($-496 \in [-512, 511]$)
    * $+496 = 256 + 128 + 64 + 32 + 16 = \text{`0b0111110000`}$
    * Complément à 1 : `0b1000001111`
    * Complément à 2 : `0b1000010000` $\rightarrow$ `0x210`
  * *Non signé :* **Non**
:::
:::

---

#### 3) Conversion de binaire signé (8 bits) vers base 10
Pour chaque nombre, on regarde le MSB (bit de signe, de poids $-2^7 = -128$) :
* `0b0100 0011` : MSB = 0 (positif).
  $$\text{Valeur} = 2^6 + 2^1 + 2^0 = 64 + 2 + 1 = +67$$
* `0b1010 0110` : MSB = 1 (négatif). On applique la formule du complément à 2 :
  $$\text{Valeur} = -128 + 2^5 + 2^2 + 2^1 = -128 + 32 + 4 + 2 = -90$$
  *(Alternative : $\text{Valeur} = -(\text{inv}(\text{0b10100110}) + 1) = -(\text{0b01011001} + 1) = -(\text{0b01011010}) = -(64+16+8+2) = -90$)*
* `0b0011 0000` : MSB = 0 (positif).
  $$\text{Valeur} = 2^5 + 2^4 = 32 + 16 = +48$$
* `0b1111 1101` : MSB = 1 (négatif).
  $$\text{Valeur} = -128 + 64 + 32 + 16 + 8 + 4 + 1 = -3$$
  *(Alternative : $-(\text{inv}(\text{0b11111101}) + 1) = -(\text{0b00000010} + 1) = -3$)*
* `0b0011 1011` : MSB = 0 (positif).
  $$\text{Valeur} = 2^5 + 2^4 + 2^3 + 2^1 + 2^0 = 32 + 16 + 8 + 2 + 1 = +59$$

---

#### 4) Conversion de binaire vers octal (base 8) et hexadécimal (base 16)
*Pour l'octal, on regroupe par 3 bits en partant de la droite. Pour l'hexadécimal, on regroupe par 4 bits.*
* **`0b11100100`** :
  * Octal : `(011) (100) (100)` $\rightarrow$ $344_8$
  * Hexadécimal : `(1110) (0100)` $\rightarrow$ `0xE4`
* **`0b010100111`** :
  * Octal : `(010) (100) (111)` $\rightarrow$ $247_8$
  * Hexadécimal : `(0000) (1010) (0111)` $\rightarrow$ `0x0A7` (ou `0xA7`)
* **`0b010001000`** :
  * Octal : `(010) (001) (000)` $\rightarrow$ $210_8$
  * Hexadécimal : `(0000) (1000) (1000)` $\rightarrow$ `0x088` (ou `0x88`)
* **`0b110000001`** :
  * Octal : `(110) (000) (001)` $\rightarrow$ $601_8$
  * Hexadécimal : `(0001) (1000) (0001)` $\rightarrow$ `0x181`

---

#### 5) Complément à 1 (C1) et complément à 2 (C2) sur 8 bits
*Le Complément à 1 consiste à inverser tous les bits (`~` logique). Le Complément à 2 est obtenu en ajoutant 1 au Complément à 1 ($C2 = C1 + 1$).*
* **`0xF4` (`0b1111 0100`) :**
  * $C1 = \text{`0b0000 1011`} = \text{`0x0B`}$
  * $C2 = \text{`0b0000 1100`} = \text{`0x0C`}$
* **`0xDA` (`0b1101 1010`) :**
  * $C1 = \text{`0b0010 0101`} = \text{`0x25`}$
  * $C2 = \text{`0b0010 0110`} = \text{`0x26`}$
* **`0x5C` (`0b0101 1100`) :**
  * $C1 = \text{`0b1010 0011`} = \text{`0xA3`}$
  * $C2 = \text{`0b1010 0100`} = \text{`0xA4`}$
* **`0x24` (`0b0010 0100`) :**
  * $C1 = \text{`0b1101 1011`} = \text{`0xDB`}$
  * $C2 = \text{`0b1101 1100`} = \text{`0xDC`}$

:::

:::

:::section id="exercice-2" eyebrow="Partie 2" title="Exercice 2 : Calculs en base 16 et Registre de statut" summary="Additions signées/non signées sur 8 bits, détermination des drapeaux C, N, Z, V, et limites de la multiplication entière."

:::exercise label="Exercice 2" title="Énoncés"
**1)** Réaliser les additions suivantes, sur 8 bits et en base 16 :
$$0x5F + 0x1A, \qquad 0xFF + 0x01, \qquad 0x5F + 0x60, \qquad 0x83 + 0xAB$$

**2)** Pour chaque addition, indiquer l'état des bits **C, N, Z et V** du registre de statut. 
* **C** (Carry) est mis à 1 quand le résultat non signé déborde.
* **N** (Negative) est mis à 1 quand le résultat est négatif (MSB = 1).
* **Z** (Zero) quand le résultat sur 8 bits est nul.
* **V** (oVerflow) quand le résultat signé déborde.

**3)** Donner la taille en bits du résultat d'une multiplication de 2 nombres sur $n$ bits.

**4)** Réaliser les multiplications suivantes sur 8 bits : 
$$0x03 \times 0x10, \qquad 0x5F \times 0x0A, \qquad 0x80 \times 0x80$$
Interpréter la validité du résultat.
:::

:::block type="method" title="Correction et Raisonnement pas-à-pas"

#### 1) & 2) Additions en base 16 et drapeaux de statut (ALU)

| Opération | Somme Hexadécimale (8 bits) | Somme Décimale réelle | Valeur signée (complément à 2) | **C** | **N** | **Z** | **V** |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`0x5F + 0x1A`** | **`0x79`** | $95 + 26 = 121$ | $+121$ (Valide) | **0** | **0** | **0** | **0** |
| **`0xFF + 0x01`** | **`0x00`** | $255 + 1 = 256$ | $0$ (Valide) | **1** | **0** | **1** | **0** |
| **`0x5F + 0x60`** | **`0xBF`** | $95 + 96 = 191$ | $-65$ (Invalide : $191 > 127$) | **0** | **1** | **0** | **1** |
| **`0x83 + 0xAB`** | **`0x2E`** | $131 + 171 = 302$ | $+46$ (Invalide : $-125 + -85 = -210 < -128$) | **1** | **0** | **0** | **1** |

:::block type="neutral" title="Explications détaillées de la levée des drapeaux"
* **`0x5F + 0x1A = 0x79`** :
  * Pas de retenue au-delà du 8ème bit $\rightarrow$ **C = 0**.
  * Bit de poids fort du résultat est `0` (car `0x7` = `0b0111`) $\rightarrow$ **N = 0**.
  * Résultat non nul $\rightarrow$ **Z = 0**.
  * Somme de deux positifs donne un résultat positif ($95+26=121 \in [-128, 127]$) $\rightarrow$ pas de débordement signé $\rightarrow$ **V = 0**.
* **`0xFF + 0x01 = 0x100` (soit `0x00` sur 8 bits)** :
  * Il y a une retenue sortante de l'ALU $\rightarrow$ **C = 1**.
  * Résultat égal à `0x00` $\rightarrow$ **Z = 1** et bit de signe égal à `0` $\rightarrow$ **N = 0**.
  * Somme d'un négatif (`0xFF` = $-1$) et d'un positif (`0x01` = $+1$) donnant $0$ : impossible de déborder en signé $\rightarrow$ **V = 0**.
* **`0x5F + 0x60 = 0xBF`** :
  * Pas de retenue au-delà du 8ème bit $\rightarrow$ **C = 0**.
  * Le bit de poids fort est `1` (car `0xB` = `0b1011`) $\rightarrow$ **N = 1**.
  * Résultat non nul $\rightarrow$ **Z = 0**.
  * **Débordement signé !** L'addition de deux nombres positifs (`0x5F` et `0x60`) a produit un résultat interprété comme négatif (`0xBF` = $-65$ en signé). La valeur théorique de $191$ dépasse la borne positive $127$ $\rightarrow$ **V = 1**.
* **`0x83 + 0xAB = 0x12E` (soit `0x2E` sur 8 bits)** :
  * Retenue sortante présente $\rightarrow$ **C = 1**.
  * Le MSB de `0x2E` est `0` $\rightarrow$ **N = 0**.
  * Résultat non nul $\rightarrow$ **Z = 0**.
  * **Débordement signé !** L'addition de deux nombres négatifs (`0x83` = $-125$ et `0xAB` = $-85$) a produit un résultat positif (`0x2E` = $+46$ en signé). La valeur attendue $-210$ est inférieure à la borne minimale $-128$ $\rightarrow$ **V = 1**.
:::

---

#### 3) Taille du résultat d'une multiplication
Le produit de deux nombres représentés chacun sur $n$ bits nécessite au maximum **$2n$ bits** pour être stocké sans aucune perte d'information.

---

#### 4) Multiplications sur 8 bits et validité

* **`0x03 * 0x10`** :
  * *Calcul :* $3 \times 16 = 48 = \text{`0x30`}$. Le résultat sur 8 bits est **`0x30`**.
  * *Validité non signée :* **Valide** car $48 \le 255$.
  * *Validité signée :* **Valide** car $48 \in [-128, \, 127]$.
* **`0x5F * 0x0A`** :
  * *Calcul :* $95 \times 10 = 950 = \text{`0x3B6`}$. Tronqué sur 8 bits, le résultat conservé est **`0xB6`** (soit $182$ en non signé, ou $-74$ en signé).
  * *Validité non signée :* **Invalide** car $950 > 255$ (la valeur tronquée $182 \neq 950$).
  * *Validité signée :* **Invalide** car $950 \notin [-128, \, 127]$ (la valeur tronquée $-74 \neq 950$).
* **`0x80 * 0x80`** :
  * *Interprétation non signée :* $128 \times 128 = 16384 = \text{`0x4000`}$. Tronqué sur 8 bits, on obtient **`0x00`**. Le résultat est **invalide** car $16384 > 255$.
  * *Interprétation signée :* `0x80` représente $-128$ en signé de complément à 2.
    $-128 \times (-128) = 16384$. Tronqué sur 8 bits, le résultat est **`0x00`**. Le résultat est **invalide** car $16384 > 127$.

:::

:::

:::section id="exercice-3" eyebrow="Partie 3" title="Exercice 3 : Choix d'une cible matérielle sous contrainte temps réel" summary="Fréquence d'horloge minimale, latence matérielle et logicielle d'interruption, et impact des temps d'accès mémoire."

:::exercise label="Exercice 3" title="Énoncés"
Une entreprise réalise des contrôleurs électroniques pour des moteurs très hautes vitesses. À pleine vitesse, le contrôleur doit pouvoir piloter les broches en moins de $1 \,\mu\text{s}$ en fonction de la position du moteur.

**1)** Le calcul de la position du moteur prend entre $15$ et $24$ cycles. Quelle est la fréquence minimale du processeur pour respecter cette contrainte ?

La position est mise à jour à travers une interruption. 
* Un **$\mu$C A** fonctionnant à $32 \,\text{MHz}$ ne sauvegarde automatiquement que le `PC` en cas d'interruption.
* Un **$\mu$C B** fonctionnant à $64 \,\text{MHz}$ sauvegarde automatiquement $8$ registres en plus du `PC`.
* Un **$\mu$C C** fonctionnant à $80 \,\text{MHz}$ sauvegarde automatiquement $4$ registres en plus du `PC`.

Le calcul dans l'interruption dure $20$ instructions et utilise $3$ registres de travail. Les trois microcontrôleurs utilisent une table d'interruption.

**2)** Rappeler le nombre de cycles nécessaires pour une interruption dans le cas général.

**3)** On suppose que les accès mémoires d'instructions et de données prennent **1 cycle**. Quel microcontrôleur est le plus adapté ? Justifier votre réponse par le calcul du temps de réponse complet.

**4)** On suppose désormais que les accès mémoires prennent **2 cycles**. Quel microcontrôleur devient alors le plus adapté ? Justifier.
:::

:::block type="method" title="Correction et Raisonnement pas-à-pas"

#### 1) Fréquence minimale d'horloge ($F_{\text{min}}$)
Pour garantir la contrainte de temps réel strict, on doit dimensionner le système pour le pire des cas (l'exécution la plus longue, soit $24$ cycles).
$$T_{\text{calcul}} = 24 \times T_{\text{cycle}} \le 1 \,\mu\text{s} = 1000 \,\text{ns}$$
$$T_{\text{cycle}} \le \frac{1000 \,\text{ns}}{24} \approx 41.67 \,\text{ns}$$
$$F_{\text{min}} = \frac{1}{T_{\text{cycle}}} = \frac{24}{1 \,\mu\text{s}} = 24 \,\text{MHz}$$
La fréquence minimale de fonctionnement de notre cible doit être de **$24 \,\text{MHz}$**.

---

#### 2) Latence d'interruption matérielle standard
Dans le cas général (comme sur une architecture ARM Cortex-M), la prise en compte d'une interruption comporte :
1. La fin d'exécution de l'instruction courante ($1$ à plusieurs cycles).
2. L'empilement matériel (*stacking*) du contexte (sauvegarde des registres essentiels : `PC`, `xPSR`, et certains registres généraux sur la pile).
3. Le chargement du vecteur d'interruption depuis la table des vecteurs.
4. Le saut à l'ISR et la recharge du pipeline.
Matériellement, cela demande généralement de **$10$ à $20$ cycles d'horloge** avant d'exécuter la première ligne de code de l'ISR.

---

#### 3) Cas d'accès mémoires en 1 cycle ($T_{\text{accès}} = 1$)
Analysons le comportement de chaque cible. Le calcul dans l'interruption prend $20$ instructions et a besoin de $3$ registres.
* **µC A (32 MHz, $T_{\text{cycle}} = 31.25 \,\text{ns}$)** :
  * *Sauvegarde matérielle :* Uniquement le `PC` ($1$ écriture) $\rightarrow 1$ cycle.
  * *Sauvegarde logicielle additionnelle :* L'ISR utilise $3$ registres de travail. Le matériel ne les ayant pas sauvés, le compilateur doit générer un `PUSH` de ces $3$ registres en entrée d'ISR, et un `POP` en sortie.
    * $3$ écritures de sauvegarde (`PUSH`) $\rightarrow 3$ cycles.
    * $3$ lectures de restauration (`POP`) $\rightarrow 3$ cycles.
  * *Calcul :* $20$ instructions (accès de 1 cycle) $\rightarrow 20$ cycles.
  * *Retour matériel :* Restauration du `PC` $\rightarrow 1$ cycle.
  * *Total de cycles µC A :* $1 \, (\text{mat}) + 3 \, (\text{PUSH}) + 20 \, (\text{calc}) + 3 \, (\text{POP}) + 1 \, (\text{mat}) = 28$ cycles.
  * *Temps total de réponse :* $T_A = 28 \times 31.25 \,\text{ns} = \mathbf{875 \,\text{ns}}$.

* **µC B (64 MHz, $T_{\text{cycle}} = 15.625 \,\text{ns}$)** :
  * *Sauvegarde matérielle :* Sauve le `PC` + $8$ registres d'usage général ($9$ écritures) $\rightarrow 9$ cycles.
  * *Sauvegarde logicielle additionnelle :* Aucune! Les $3$ registres utilisés par le calcul font partie des $8$ déjà sauvegardés par le matériel $\rightarrow 0$ cycle.
  * *Calcul :* $20$ instructions $\rightarrow 20$ cycles.
  * *Retour matériel :* Restauration des $9$ registres $\rightarrow 9$ cycles.
  * *Total de cycles µC B :* $9 + 20 + 9 = 38$ cycles.
  * *Temps total de réponse :* $T_B = 38 \times 15.625 \,\text{ns} = \mathbf{593.75 \,\text{ns}}$.

* **µC C (80 MHz, $T_{\text{cycle}} = 12.5 \,\text{ns}$)** :
  * *Sauvegarde matérielle :* Sauve le `PC` + $4$ registres d'usage général ($5$ écritures) $\rightarrow 5$ cycles.
  * *Sauvegarde logicielle additionnelle :* Aucune (les $3$ registres requis sont inclus dans les $4$ de la sauvegarde automatique) $\rightarrow 0$ cycle.
  * *Calcul :* $20$ instructions $\rightarrow 20$ cycles.
  * *Retour matériel :* Restauration des $5$ registres $\rightarrow 5$ cycles.
  * *Total de cycles µC C :* $5 + 20 + 5 = 30$ cycles.
  * *Temps total de réponse :* $T_C = 30 \times 12.5 \,\text{ns} = \mathbf{375 \,\text{ns}}$.

:::block type="remember" title="Décision pour le cas 1 cycle"
Les trois microcontrôleurs respectent la contrainte temps réel ($T < 1000 \,\text{ns}$). Le **microcontrôleur C** est le plus performant et le plus adapté car son temps de réponse de **$375 \,\text{ns}$** est le plus faible (grâce à sa haute fréquence et à sa latence matérielle équilibrée).
:::

---

#### 4) Cas d'accès mémoires en 2 cycles ($T_{\text{accès}} = 2$)
Chaque accès à la mémoire (données sur la pile et lecture d'instructions en mémoire Flash) prend désormais $2$ cycles.

* **µC A (32 MHz)** :
  * Sauvegarde matérielle `PC` : $1 \times 2 = 2$ cycles.
  * Sauvegarde logicielle (`PUSH`) : $3 \times 2 = 6$ cycles.
  * Calcul (20 fetch d'instructions) : $20 \times 2 = 40$ cycles.
  * Restauration logicielle (`POP`) : $3 \times 2 = 6$ cycles.
  * Retour matériel : $1 \times 2 = 2$ cycles.
  * *Total :* $2 + 6 + 40 + 6 + 2 = 56$ cycles.
  * *Temps de réponse :* $T_A = 56 \times 31.25 \,\text{ns} = \mathbf{1750 \,\text{ns}} \quad (1.75 \,\mu\text{s} > 1 \,\mu\text{s} \rightarrow \mathbf{Invalide})$.

* **µC B (64 MHz)** :
  * Sauvegarde matérielle ($9$ accès) : $9 \times 2 = 18$ cycles.
  * Calcul ($20$ fetch d'instructions) : $20 \times 2 = 40$ cycles.
  * Retour matériel ($9$ accès) : $9 \times 2 = 18$ cycles.
  * *Total :* $18 + 40 + 18 = 76$ cycles.
  * *Temps de réponse :* $T_B = 76 \times 15.625 \,\text{ns} = \mathbf{1187.5 \,\text{ns}} \quad (1.19 \,\mu\text{s} > 1 \,\mu\text{s} \rightarrow \mathbf{Invalide})$.

* **µC C (80 MHz)** :
  * Sauvegarde matérielle ($5$ accès) : $5 \times 2 = 10$ cycles.
  * Calcul ($20$ fetch d'instructions) : $20 \times 2 = 40$ cycles.
  * Retour matériel ($5$ accès) : $5 \times 2 = 10$ cycles.
  * *Total :* $10 + 40 + 10 = 60$ cycles.
  * *Temps de réponse :* $T_C = 60 \times 12.5 \,\text{ns} = \mathbf{750 \,\text{ns}} \quad (0.75 \,\mu\text{s} \le 1 \,\mu\text{s} \rightarrow \mathbf{Valide})$.

:::block type="warning" title="Décision critique pour le cas 2 cycles"
Dès que la mémoire ralentit, les µC A et µC B violent la contrainte temps réel. Le **microcontrôleur C** reste **le seul et unique choix adapté** avec un temps de réponse de **$750 \,\text{ns}$**. Cela illustre parfaitement la nécessité d'étudier l'adéquation matérielle/logicielle complète (et non la seule fréquence d'horloge) pour les systèmes critiques.
:::

:::

:::

:::section id="exercice-4" eyebrow="Partie 4" title="Exercice 4 : Oscilloscope numérique avec FFT" summary="Calcul du temps d'exécution d'une FFT en complexité O(n log2 n), faisabilité en échantillonnage continu à 1 MHz et estimation du besoin mémoire."

:::exercise label="Exercice 4" title="Énoncés"
Une entreprise réalise des oscilloscopes numériques d’entrée de gamme et utilise pour cela un microcontrôleur cadencé à $100 \,\text{MHz}$. La bande passante de l’oscilloscope va de $0.1 \,\text{Hz}$ à $100 \,\text{kHz}$. L’entreprise souhaite rajouter une fonctionnalité de calcul de transformée de Fourier rapide (FFT) dont la complexité algorithmique est $O(n) = n \log_2(n)$ calculs (c'est-à-dire que pour $n$ échantillons, il faut au moins $n \times \log_2(n)$ calculs).

**1)** On garde $4096$ échantillons en mémoire. Combien de calculs pour la FFT sont nécessaires au minimum ? En comptant $10$ cycles par itération (par calcul), combien de temps prend le calcul de la FFT ?

**2)** On échantillonne à $1 \,\text{MHz}$ en continu. A-t-on le temps de faire un calcul complet avant de remplir les $4096$ échantillons suivants en mémoire ? Conclure sur la faisabilité du calcul.

**3)** Quelles solutions d'ingénierie peuvent être mises en place pour surmonter les limitations détectées ?

**4)** La FFT transforme un signal réel en un signal complexe de même taille. Combien faut-il de mémoire vive pour conserver le signal d’origine et sa FFT avec des échantillons sur $8$ bits ?
:::

:::block type="method" title="Correction et Raisonnement pas-à-pas"

#### 1) Nombre de calculs minimum et temps d'exécution de la FFT
Pour $n = 4096 = 2^{12}$ échantillons :
* Nombre de calculs minimum :
  $$N_{\text{calculs}} = n \log_2(n) = 4096 \times \log_2(2^{12}) = 4096 \times 12 = 49\,152 \text{ calculs}$$
* Nombre de cycles requis (à $10$ cycles par calcul) :
  $$\text{Cycles} = 49\,152 \times 10 = 491\,520 \text{ cycles}$$
* Temps de calcul de la FFT (à $100 \,\text{MHz}$, un cycle dure $T_{\text{cycle}} = 10 \,\text{ns}$) :
  $$T_{\text{FFT}} = 491\,520 \times 10 \,\text{ns} = 4\,915\,200 \,\text{ns} = \mathbf{4.9152 \,\text{ms}}$$

---

#### 2) Échantillonnage à 1 MHz en continu et faisabilité
* À $1 \,\text{MHz}$, la période d'échantillonnage est $T_e = \frac{1}{1 \,\text{MHz}} = 1 \,\mu\text{s}$.
* Le temps nécessaire pour remplir le tampon de $4096$ échantillons est :
  $$T_{\text{collecte}} = 4096 \times 1 \,\mu\text{s} = \mathbf{4.096 \,\text{ms}}$$
* **Comparaison :**
  $$T_{\text{FFT}} \, (4.9152 \,\text{ms}) > T_{\text{collecte}} \, (4.096 \,\text{ms})$$
* **Conclusion :**
  **Non**, nous n'avons pas le temps de calculer la FFT en continu. Le processeur sature car le calcul d'une FFT prend plus de temps que l'acquisition des données associées. En mode continu classique, la mémoire va déborder.

---

#### 3) Solutions d'ingénierie envisageables
Pour résoudre ce goulot d'étranglement, plusieurs stratégies industrielles s'offrent à nous :
* **Acquisition par rafales (Trigger / Burst mode) :** Au lieu d'un flux continu, l'acquisition est stoppée une fois le buffer de 4096 points rempli. On effectue le calcul de la FFT et son affichage, puis on réarme l'acquisition. C'est le fonctionnement standard des oscilloscopes numériques d'entrée de gamme.
* **Intégration d'un accélérateur matériel ou d'un DSP :** Choisir une cible matérielle équipée d'instructions de traitement du signal (SIMD, MAC en 1 cycle) ou d'un bloc matériel dédié au calcul de FFT (comme dans certains STM32 avec accélérateur FMAC).
* **Usage intensif du contrôleur DMA :** Utiliser deux buffers mémoires en ping-pong (*double buffering*) gérés par le DMA. Le DMA remplit le buffer B pendant que le CPU traite le buffer A.
* **Optimisation de la taille du tampon :** Si la résolution fréquentielle le permet, descendre à $1024$ échantillons ($1024 \times 10 = 10\,240$ calculs $\approx 1.02 \,\text{ms}$ pour un temps d'acquisition de $1.024 \,\text{ms}$ : cela devient théoriquement possible mais ne laisse que peu de marge au CPU).

---

#### 4) Estimation de l'empreinte mémoire vive (RAM)
* **Signal d'origine (réel) :**
  Chaque échantillon est codé sur $8$ bits ($1$ octet).
  $$\text{RAM}_{\text{signal}} = 4096 \times 1 \text{ octet} = \mathbf{4 \,\text{Ko}}$$
* **Signal transformé (FFT complexe) :**
  Un échantillon complexe se compose d'une partie réelle (8 bits = 1 octet) et d'une partie imaginaire (8 bits = 1 octet), soit $2$ octets par point.
  $$\text{RAM}_{\text{FFT}} = 4096 \times 2 \text{ octets} = \mathbf{8 \,\text{Ko}}$$
* **Total requis pour l'application :**
  $$\text{RAM}_{\text{total}} = 4 \,\text{Ko} + 8 \,\text{Ko} = \mathbf{12 \,\text{Ko}}$$
  *(Note : C'est une valeur très faible, facilement intégrable dans la SRAM interne de la plupart des microcontrôleurs généraux).*

:::

:::

:::section id="exercice-5" eyebrow="Partie 5" title="Exercice 5 : Adéquation algorithme — architecture" summary="Estimation des registres d'un filtre moyenne glissante, itérations de boucles imbriquées, calcul de performances temporelles et règle du 90/10."

:::exercise label="Exercice 5" title="Énoncés"
On cherche à choisir une cible matérielle pour y implémenter un algorithme de traitement du signal de type convolution, ici, une moyenne glissante de taille $10$ pour filtrer du bruit. On utilise l’algorithme classique avec le signal à filtrer de longueur $N$ et le filtre de longueur $10$, le résultat de l’opération s'écrit également sur $N$ échantillons.

```c
void moving_average10(int* signal, int* res, int N) {
    int i, j ;
    for(i = 0 ; i < N ; ++i) {
        int sum = 0 ;
        for(j = 0 ; j < 10 ; ++j) {
            // ignore out-of-bound access
            sum += signal[i-5+j]*filtre[j] ;
        }
        res[i] = sum ;
    }
}
```

| Opération | µC A ($32 \,\text{MHz}$) | µC B ($64 \,\text{MHz}$) | µC C ($120 \,\text{MHz}$) |
| :--- | :---: | :---: | :---: |
| **Addition** | 1 cycle | 1 cycle | 1 cycle |
| **Multiplication** | 1 cycle | 1 cycle | 2 cycles |
| **Accès mémoire** | 2 cycles | 1 cycle | 2 cycles |
| **Branchement** | 3 cycles | 3 cycles | 3 cycles |

**1)** Estimer le nombre de registres nécessaires pour la boucle interne, en séparant les registres utilisés pour l’algorithme en lui-même et ceux utilisés pour la gestion des adresses et de la boucle.

**2)** Combien y a-t-il d’itérations de la boucle interne au total ? En déduire le nombre de multiplications et d’additions, ainsi que d’accès à la mémoire.

**3)** En utilisant la table de cycles ci-dessus, calculer le nombre de cycles de la boucle interne pour les 3 microcontrôleurs.

**4)** En déduire la fréquence maximale d’exécution de ce filtre complet sur un signal de $1024$ échantillons.

**5)** Pour une fréquence d'exécution de $250 \,\text{Hz}$ de la tâche globale, en déduire la taille maximale $N_{\text{max}}$ du signal pour chacun des processeurs.

**6)** Justifier rigoureusement le fait que l’on ne prenne en compte que la boucle interne pour ces calculs.
:::

:::block type="method" title="Correction et Raisonnement pas-à-pas"

#### 1) Estimation du nombre de registres requis
Pour exécuter efficacement la boucle interne, le processeur doit allouer des registres d'usage général (GPR) :
* **Registres pour l'algorithme (données) :**
  1. `sum` : l'accumulateur (1 registre)
  2. `signal[i-5+j]` : la donnée lue en RAM (1 registre)
  3. `filtre[j]` : le coefficient constant lu (1 registre)
  4. Registre intermédiaire pour le résultat de la multiplication (1 registre, ou $0$ si l'architecture propose une instruction d'accumulation-multiplication matérielle `MAC` en direct).
* **Registres pour le contrôle et l'adressage (pointeurs & compteurs) :**
  5. `i` : compteur de la boucle externe (1 registre)
  6. `j` : compteur de la boucle interne (1 registre)
  7. `signal` : pointeur d'adresse de base du signal d'entrée (1 registre)
  8. `filtre` : pointeur d'adresse de base des coefficients (1 registre)
  9. `res` : pointeur d'adresse de base du résultat de sortie (1 registre)
  10. Adresse effective calculée pour l'élément du signal (`signal + i - 5 + j`) (1 registre)
* **Total estimé :** Environ **9 à 10 registres**. Une architecture RISC classique comme ARM Cortex-M (qui dispose de 16 registres généraux) est parfaitement taillée pour ce code.

---

#### 2) Analyse algorithmique quantitative (pour un signal de taille $N$)
* **Itérations totales de la boucle interne :** $10 \times N$ itérations.
* **Multiplications totales :** $1$ multiplication par itération interne $\rightarrow \mathbf{10 \times N}$ multiplications.
* **Additions totales (dans la boucle interne) :** $1$ addition par itération interne $\rightarrow \mathbf{10 \times N}$ additions.
* **Accès mémoire (Lectures/Écritures) :**
  * *Lectures (boucle interne) :* $2$ lectures par itération (`signal[...]` et `filtre[...]`) $\rightarrow 20 \times N$ lectures.
  * *Écritures (boucle externe) :* $1$ écriture par échantillon final (`res[i] = sum`) $\rightarrow N$ écritures.
  * *Total accès :* $20 \times N + N = \mathbf{21 \times N}$ accès mémoire.

---

#### 3) Nombre de cycles d'horloge de la boucle interne ($C_{\text{boucle}}$)
L'opération élémentaire répétée dans la boucle interne s'écrit : `sum += signal[i-5+j] * filtre[j];`
Chaque itération de cette boucle effectue : **2 accès mémoire** (lectures) + **1 multiplication** + **1 addition** + **1 branchement** (saut conditionnel de fin de boucle `for(j...)`).

* **Pour le µC A (32 MHz) :**
  $$C_{\text{A}} = (2 \times 2 \, [\text{mem}]) + 1 \, [\text{mul}] + 1 \, [\text{add}] + 3 \, [\text{branchement}] = \mathbf{9 \text{ cycles}}$$
* **Pour le µC B (64 MHz) :**
  $$C_{\text{B}} = (2 \times 1 \, [\text{mem}]) + 1 \, [\text{mul}] + 1 \, [\text{add}] + 3 \, [\text{branchement}] = \mathbf{7 \text{ cycles}}$$
* **Pour le µC C (120 MHz) :**
  $$C_{\text{C}} = (2 \times 2 \, [\text{mem}]) + 2 \, [\text{mul}] + 1 \, [\text{add}] + 3 \, [\text{branchement}] = \mathbf{10 \text{ cycles}}$$

---

#### 4) Fréquence maximale de filtrage ($F_{\text{max}}$) pour $N = 1024$ échantillons
Nombre d'itérations totales de boucle interne : $10240$ itérations.

* **µC A (32 MHz) :**
  * Cycles totaux : $10240 \times 9 = 92\,160$ cycles.
  * Temps de calcul : $T_A = \frac{92\,160}{32 \,\text{MHz}} = 2.88 \,\text{ms}$.
  * Fréquence max de traitement : $F_{\text{max, A}} = \frac{1}{2.88 \,\text{ms}} = \mathbf{347.2 \,\text{Hz}}$.
* **µC B (64 MHz) :**
  * Cycles totaux : $10240 \times 7 = 71\,680$ cycles.
  * Temps de calcul : $T_B = \frac{71\,680}{64 \,\text{MHz}} = 1.12 \,\text{ms}$.
  * Fréquence max : $F_{\text{max, B}} = \frac{1}{1.12 \,\text{ms}} = \mathbf{892.8 \,\text{Hz}}$.
* **µC C (120 MHz) :**
  * Cycles totaux : $10240 \times 10 = 102\,400$ cycles.
  * Temps de calcul : $T_C = \frac{102\,400}{120 \,\text{MHz}} = 0.8533 \,\text{ms}$.
  * Fréquence max : $F_{\text{max, C}} = \frac{1}{0.8533 \,\text{ms}} = \mathbf{1171.9 \,\text{Hz}}$.

---

#### 5) Taille maximale du signal ($N_{\text{max}}$) pour une tâche à $250 \,\text{Hz}$ ($T = 4 \,\text{ms}$)
Le temps alloué pour le calcul sur $N$ points est de $4 \,\text{ms} = 4\,000\,000 \,\text{ns}$.
* **µC A :**
  * Temps consommé par point de signal : $10 \text{ itérations} \times 9 \text{ cycles} \times 31.25 \,\text{ns} = 2812.5 \,\text{ns} / \text{point}$.
  * $N_{\text{max, A}} = \frac{4\,000\,000 \,\text{ns}}{2812.5 \,\text{ns}} \approx \mathbf{1422 \text{ échantillons}}$.
* **µC B :**
  * Temps consommé par point : $10 \times 7 \times 15.625 \,\text{ns} = 1093.75 \,\text{ns} / \text{point}$.
  * $N_{\text{max, B}} = \frac{4\,000\,000 \,\text{ns}}{1093.75 \,\text{ns}} \approx \mathbf{3657 \text{ échantillons}}$.
* **µC C :**
  * Temps consommé par point : $10 \times 10 \times 8.333 \,\text{ns} = 833.3 \,\text{ns} / \text{point}$.
  * $N_{\text{max, C}} = \frac{4\,000\,000 \,\text{ns}}{833.3 \,\text{ns}} \approx \mathbf{4800 \text{ échantillons}}$.

---

#### 6) Justification de la focalisation exclusive sur la boucle interne
C'est l'application de la célèbre **loi de Pareto ou règle empirique du 90/10 en informatique** : un processeur passe $90\%$ de son temps d'exécution dans seulement $10\%$ du code (les structures de boucles imbriquées).
Ici, les instructions hors de la boucle interne (l'initialisation `sum = 0`, l'écriture en RAM externe `res[i] = sum`, et l'incrémentation de l'indice de boucle externe `i`) ne s'exécutent qu'**une seule fois** toutes les $10$ itérations internes. Leur poids dans le nombre de cycles total est donc absolument marginal ($< 5\%$) et n'impacte pas l'analyse d'adéquation.

:::

:::

:::section id="exercice-6" eyebrow="Partie 6" title="Exercice 6 : Plan mémoire d'un système 32 bits" summary="Analyse d'une cartographie mémoire STM32F4, calculs de tailles d'espaces Code/Données/Périphériques et définition du bit-banding."

:::exercise label="Exercice 6" title="Énoncés"
À partir du plan mémoire (*memory map*) fourni du STM32F4 :

**1)** Quelle est la taille totale de l’espace mémoire ? Combien de bits sont utilisés pour l'adressage ?

**2)** Quelle quantité de mémoire est réservée pour le code ?

**3)** Même question pour les données (SRAM).

**4)** Combien de RAM peut-on rajouter avec un circuit de mémoire externe ?

**5)** Expliquer précisément à quoi correspondent les régions dites de « **bit band** » et leur intérêt.
:::

:::block type="method" title="Correction et Raisonnement pas-à-pas"

#### 1) Taille totale de l'espace mémoire et largeur d'adresse
Le plan mémoire débute à l'adresse `0x00000000` et se termine à l'adresse `0xFFFFFFFF`.
* **Largeur d'adressage :** Les adresses sont représentées sur $8$ chiffres hexadécimaux, soit $8 \times 4 \text{ bits} = \mathbf{32 \text{ bits}}$.
* **Taille totale de l'espace d'adressage linéaire :** 
  $$2^{32} \text{ octets} = 4\,294\,967\,296 \text{ octets} = \mathbf{4 \text{ Go}}$$

---

#### 2) Espace réservé pour le Code
Sur l'architecture ARM Cortex-M / STM32F4 :
* La région de **Code** s'étend de `0x0000 0000` à `0x1FFF FFFF`.
* **Taille :** 
  $$\text{Taille} = \text{`0x1FFF FFFF`} - \text{`0x0000 0000`} + 1 = \text{`0x2000 0000`} = 2^{29} \text{ octets} = \mathbf{512 \text{ Mo}}$$

---

#### 3) Espace réservé pour les Données (SRAM)
* La région **SRAM** s'étend de `0x2000 0000` à `0x3FFF FFFF`.
* **Taille :** 
  $$\text{Taille} = \text{`0x3FFF FFFF`} - \text{`0x2000 0000`} + 1 = \text{`0x2000 0000`} = 2^{29} \text{ octets} = \mathbf{512 \text{ Mo}}$$

---

#### 4) Extension de RAM externe
* La région **External RAM** s'étend de `0x6000 0000` à `0x9FFF FFFF`.
* **Taille d'extension possible :** 
  $$\text{Taille} = \text{`0x9FFF FFFF`} - \text{`0x6000 0000`} + 1 = \text{`0x4000 0000`} = 2^{30} \text{ octets} = \mathbf{1 \text{ Go}}$$

---

#### 5) Les régions « bit band »
Le **Bit-Banding** est une astuce matérielle d'accès direct au bit disponible sur les cœurs ARM Cortex-M3 et M4.

:::grid two-col
:::block type="definition" title="Principe technique"
* Il associe une région mémoire classique de 1 Mo (appelée **Bit-band region**) à une région virtuelle de 32 Mo (appelée **Bit-band alias**).
* Chaque bit individuel de la région d'origine est mappé sur un mot de 32 bits complet (un mot alias) dans la zone d'alias.
:::
:::block type="remember" title="Avantages & Intérêts majeurs"
* **Opération atomique matérielle :** Modifier le mot d'alias à l'adresse correspondante modifie directement et de façon atomique le bit ciblé.
* **Sécurité & Rapidité :** Évite les opérations logiques d'écriture/lecture (`OR`, `AND`) du logiciel, qui prennent plusieurs cycles et risquent de corrompre les données si une interruption survient au milieu de la modification.
:::
:::

:::

:::
