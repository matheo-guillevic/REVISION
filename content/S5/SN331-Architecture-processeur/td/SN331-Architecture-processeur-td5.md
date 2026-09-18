---
title: "TD 5 corrige - Microarchitecture Pipeline - Performance et Calibrage"
subject: "SN331-Architecture-processeur"
type: "td"
target: "SN331-Architecture-processeur-td5.html"
eyebrow: "SN331 - TD 5"
heading: "Microarchitecture Pipeline - Performance et Calibrage"
summary: "Correction guidee avec methodes, calculs et points de vigilance."
withPrism: true
---
:::section id="sn331-td5" eyebrow="TD 5" title="Microarchitecture Pipeline - Performance et Calibrage" summary="Correction guidee avec methodes, calculs et points de vigilance."


:::exercise label="TD 5" title="Exercice 1 : Calculs autour de l'exécution pipelinée"

* Latence logique globale d'une instruction (hors registres) : **300 ps**.
* Temps de stabilisation d'un registre intermédiaire : **20 ps**.

**1. Pipeline symétrique à 3 étages (100 ps / étage)**
* **Temps de cycle** ($t_{cycle}$) :
$$t_{cycle} = \max(\text{durée\_étage}) + t_{reg} = 100\text{ ps} + 20\text{ ps} = 120\text{ ps}$$
* **Débit maximal** :
$$\text{Débit} = \frac{1}{t_{cycle}} = \frac{1}{120 \times 10^{-12}\text{ s}} \approx 8.33\text{ Gop/s}$$
* **Latence** (Temps d'exécution total d'une instruction) :
$$\text{Latence} = k \times t_{cycle} = 3 \times 120\text{ ps} = 360\text{ ps}$$

**2. Pipeline asymétrique à 3 étages (50 ps, 150 ps, 100 ps)**
* **Temps de cycle** : C'est l'étage le plus lent (le goulot d'étranglement) qui impose le rythme de l'horloge globale.
$$t_{cycle} = \max(50, 150, 100) + 20\text{ ps} = 150\text{ ps} + 20\text{ ps} = 170\text{ ps}$$
* **Débit maximal** :
$$\text{Débit} = \frac{1}{170 \times 10^{-12}\text{ s}} \approx 5.88\text{ Gop/s}$$
* **Latence** :
$$\text{Latence} = 3 \times 170\text{ ps} = 510\text{ ps}$$

**3. Division par deux des étages (6 étages symétriques de 50 ps)**
* **Temps de cycle** : $50\text{ ps} + 20\text{ ps} = 70\text{ ps}$.
* **Débit** : $\frac{1}{70 \times 10^{-12}\text{ s}} \approx 14.28\text{ Gop/s}$.
* **Latence** : $6 \times 70\text{ ps} = 420\text{ ps}$.
* **Analyse** : Le débit a augmenté (de 8.33 à 14.28 Gop/s), mais la latence d'une instruction individuelle s'est dégradée (passant de 360 ps à 420 ps) en raison de l'accumulation du surcoût temporel des registres ($6 \times 20\text{ ps} = 120\text{ ps}$).

**4. Débit physique limite insurmontable**
Si le nombre d'étages $k$ tend vers l'infini, la fraction logique par étage $\frac{300}{k}$ tend vers 0. Le temps de cycle tend alors vers la limite physique incompressible imposée par la traversée des registres de pipeline :
$$t_{cycle} \rightarrow t_{reg} = 20\text{ ps}$$
$$\text{Débit\_max} = \frac{1}{20 \times 10^{-12}\text{ s}} = 50\text{ Gop/s}$$
:::

:::exercise label="TD 5" title="Exercice 2 : Calibrage d'un pipeline"

* Latence logique totale : **10 ns**.
* Temps de stabilisation d'un registre de pipeline : **500 ps (0.5 ns)**.

**1. Temps de cycle d'un pipeline à $k$ étages**
Formule du temps de cycle d'un étage symétrique : $t_{cycle}(k) = \frac{10}{k} + 0.5\text{ ns}$.
* **$k = 2$** : $\frac{10}{2} + 0.5 = $ **5.5 ns**
* **$k = 4$** : $\frac{10}{4} + 0.5 = $ **3.0 ns**
* **$k = 8$** : $\frac{10}{8} + 0.5 = $ **1.75 ns**
* **$k = 16$** : $\frac{10}{16} + 0.5 = $ **1.125 ns**

**2. Nombre d'étages requis pour atteindre des cibles de performance**
* **Pour un cycle de 2 ns** :
$$2\text{ ns} = \frac{10}{k} + 0.5 \Rightarrow 1.5 = \frac{10}{k} \Rightarrow k = \frac{10}{1.5} \approx 6.67 \Rightarrow \mathbf{7\text{ étages}}$$
* **Pour une fréquence de 1 GHz ($t_{cycle} = 1\text{ ns}$)** :
$$1\text{ ns} = \frac{10}{k} + 0.5 \Rightarrow 0.5 = \frac{10}{k} \Rightarrow k = \frac{10}{0.5} = \mathbf{20\text{ étages}}$$
:::

:::exercise label="TD 5" title="Exercice 3 : Pipeline à 4 étages (FE, DE, EX, SR)"


#### 1. Cycle de complétion d'une instruction
Une instruction débutant au cycle $i$ traverse les 4 étages en l'absence de conflit. Elle achève son exécution (phase SR terminée) au cycle **$i + 3$**.

#### 2. Détection des conflits (aléa de données) dans le code initial
Une instruction ne peut lire une donnée dans la phase EX que si celle-ci a été préalablement sauvegardée en registre par l'instruction précédente (fin de l'étape SR).

```asm
I1: ADD R4, R1, R2   # Écrit dans R4 au cycle 4
I2: NOT R4, R4       # Lit R4 au cycle 3 -> ALÉA DE DONNÉES !
I3: ADD R3, R3, R4   # Lit R4 au cycle 4 (pendant l'écriture de I2) -> ALÉA !
I4: ADD R4, R5, R1   # Écrit dans R4 au cycle 7
I5: ADD R5, R5, R2   # Pas de conflit direct
```

#### 3. Résolution par l'insertion de bulles d'attente (Stalls)
Pour laisser le temps à l'étage SR d'une instruction d'écrire son résultat avant que la suivante n'en ait besoin en EX, il faut insérer des cycles d'attente $S$ :

| Instruction | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **ADD R4,R1,R2** | FE | DE | EX | SR | | | | | | | | | | |
| **NOT R4,R4** | | FE | DE | **S** | **S** | EX | SR | | | | | | | |
| **ADD R3,R3,R4** | | | FE | **S** | **S** | DE | **S** | **S** | EX | SR | | | | |
| **ADD R4,R5,R1** | | | | | | FE | **S** | **S** | DE | EX | SR | | | |
| **ADD R5,R5,R2** | | | | | | | | | FE | DE | EX | SR | | |

* **Total** : l'exécution prend **12 cycles**.

#### 4. Résolution optimale par réordonnancement du code
Pour éliminer les cycles perdus, on réordonne les instructions indépendantes de façon à intercaler du traitement utile entre la production d'un registre et sa consommation :
```asm
I1: ADD R4, R1, R2   # Écrit R4
I4: ADD R4, R5, R1   # Intercalé : Écrit une autre valeur dans R4 (neutralise I1)
I2: NOT R4, R4       # Lit le nouveau R4 produit par I4
I5: ADD R5, R5, R2   # Intercalé
I3: ADD R3, R3, R4   # Lit R4
```
Ce réordonnancement judicieux permet de réduire à seulement **8 cycles** le temps total d'exécution, soit un gain net de **4 cycles d'horloge** sans aucune modification matérielle !
:::
:::
