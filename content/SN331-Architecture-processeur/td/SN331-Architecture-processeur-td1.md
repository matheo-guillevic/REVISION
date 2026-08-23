---
title: "TD 1 corrige - Vue d'ensemble d'un Ordinateur et Interconnexions"
subject: "SN331-Architecture-processeur"
type: "td"
target: "SN331-Architecture-processeur-td1.html"
eyebrow: "SN331 - TD 1"
heading: "Vue d'ensemble d'un Ordinateur et Interconnexions"
summary: "Correction guidee avec methodes, calculs et points de vigilance."
withPrism: true
---
:::section id="sn331-td1" eyebrow="TD 1" title="Vue d'ensemble d'un Ordinateur et Interconnexions" summary="Correction guidee avec methodes, calculs et points de vigilance."


:::exercise label="TD 1" title="Exercice 1 : Petits calculs autour d'une carte mère"


#### Énoncé
On étudie la carte mère d'un PC reliant le processeur au contrôleur mémoire par le bus système (Front Side Bus - FSB).
* **FSB** : capable de transférer **8 octets** en parallèle à une fréquence de **400 MHz**.
* **Bus Mémoire Centrale** : capable de transférer des mots de **32 bits** (4 octets) à une fréquence de **266 MHz**.

#### Questions et Solutions

**1. Quelle est la bande passante du bus FSB exprimée en Go/s ? ($1\text{ Go} = 10^9\text{ octets}$)**
La bande passante ($BP$) d'un bus est définie comme le produit de sa largeur en octets par sa fréquence de fonctionnement :
$$BP_{FSB} = \text{Largeur} \times \text{Fréquence} = 8\text{ octets} \times 400 \times 10^6\text{ Hz}$$
$$BP_{FSB} = 3.2 \times 10^9\text{ octets/s} = 3.2\text{ Go/s}$$

**2. Quelle est la bande passante du bus FSB exprimée en Gio/s ? ($1\text{ Gio} = 2^{30}\text{ octets}$)**
Nous convertissons les octets par seconde en Gibioctets par seconde en divisant par $2^{30}$ ($1\text{ }073\text{ }741\text{ }824$) :
$$BP_{FSB} = \frac{3.2 \times 10^9\text{ o/s}}{2^{30}} \approx 2.98\text{ Gio/s}$$

**3. Si le bus de la mémoire centrale permet le transfert de mots de 32 bits à 266 MHz, quelle est sa bande passante en Go/s ?**
32 bits correspondent à $32 / 8 = 4\text{ octets}$.
$$BP_{\text{mémoire}} = 4\text{ octets} \times 266 \times 10^6\text{ Hz} = 1.064 \times 10^9\text{ octets/s} = 1.064\text{ Go/s}$$

**4. Que penser de la différence de bande passante entre le bus de la mémoire centrale et celle du FSB ?**
* $BP_{FSB} = 3.2\text{ Go/s}$ alors que $BP_{\text{mémoire}} = 1.064\text{ Go/s}$.
* Le bus mémoire est près de **3 fois plus lent** que le FSB.
* **Analyse** : C'est le problème classique du **goulot d'étranglement mémoire** (Memory Wall). Même si le FSB et le processeur peuvent absorber des débits élevés, le système global est freiné par l'accès physique à la DRAM. L'utilisation d'une mémoire cache est indispensable pour réduire la latence et masquer cette asymétrie.


#### Partie : Lecture d'un film
Un film non-compressé, constitué d'images de **512 × 384 pixels** en **256 couleurs** (soit 1 octet par pixel, car $2^8 = 256$), défile à un rythme de **24 images par seconde**.

**1. Quels sont les bus utilisés pour le transfert ?**
Les données transitent depuis le Disque Dur vers la Mémoire Vidéo (carte graphique) :
1. Du Disque dur au Contrôleur d'E/S via le **Bus de masse (IDE/SATA)**.
2. Du Contrôleur d'E/S au Contrôleur Mémoire via le **Bus système / d'extension**.
3. Du Contrôleur Mémoire vers la Mémoire Centrale via le **Bus mémoire centrale**.
4. De la Mémoire Centrale vers la Mémoire Vidéo (Carte Graphique) via le **Bus mémoire graphique** (géré par le Contrôleur Mémoire, souvent en DMA).

**2. Quel est le débit (en Mo/s) requis pour le transfert du film ?**
* Taille d'une image : $512 \times 384 \times 1\text{ octet} = 196\text{ }608\text{ octets}$
* Débit nécessaire par seconde :
$$\text{Débit} = 196\text{ }608\text{ octets/image} \times 24\text{ images/s} = 4\text{ }718\text{ }592\text{ octets/s}$$
* En décimal ($10^6$ o) : $\text{Débit} = 4.718\text{ Mo/s}$
* En binaire ($2^{20}$ o) : $\text{Débit} = \frac{4\text{ }718\text{ }592}{1\text{ }048\text{ }576} \approx 4.50\text{ Mio/s}$

**3. Si le bus mémoire vidéo a une bande passante de 1.064 Go/s, quelle est la part (en %) consommée par ce film ?**
$$\text{Pourcentage} = \frac{\text{Débit requis}}{\text{Bande Passante}} = \frac{4.718 \times 10^6\text{ o/s}}{1.064 \times 10^9\text{ o/s}} \approx 0.44\%$$
Le film ne consomme qu'une infime fraction (0.44%) de la bande passante, ce qui laisse le bus libre pour d'autres transferts du processeur ou d'affichage.
:::

:::exercise label="TD 1" title="Exercice 2 : Taille du bus et volume de mémoire centrale"

On dispose d'un bus comportant **32 fils d'adresse**.

**Cas 1 : Adressage par octet (Chaque adresse pointe sur 1 octet)**
* **(a) Nombre d'octets adressables** : $2^{32} = 4\text{ }294\text{ }967\text{ }296\text{ octets}$.
* **(b) Taille maximale de la mémoire** : $4\text{ }294\text{ }967\text{ }296\text{ o} = 4\text{ Gio}$.
* **(c) Nombre de fils de données** : **8 fils** (1 octet à la fois).

**Cas 2 : Adressage par mot de 32 bits (4 octets)**
* **(a) Nombre de mots adressables** : $2^{32} = 4\text{ }294\text{ }967\text{ }296\text{ mots}$.
* **(b) Taille maximale de la mémoire** :
$$\text{Taille} = 2^{32}\text{ mots} \times 4\text{ octets/mot} = 16\text{ Gio}$$.
* **(c) Nombre de fils de données** : **32 fils** (pour transférer un mot complet de 32 bits en parallèle).
:::

:::exercise label="TD 1" title="Exercice 3 : Processeur hypothétique et jeu d'instructions"

Une case mémoire fait **2 octets** (16 bits). Les registres sont **PC**, **IR** et **A** (Accumulateur).
L'instruction est codée sur 16 bits : **opcode (4 bits, 15-12)** | **adresse (12 bits, 11-0)**.

**1. Combien d'instructions peut compter ce jeu d'instructions ?**
L'opcode est codé sur 4 bits, donc nous avons au maximum : $2^4 = 16$ instructions distinctes.

**2. Quel est le nombre maximal d'adresses mémoires référençables ?**
Le champ adresse est codé sur 12 bits, ce qui autorise : $2^{12} = 4096$ cases mémoires adressables.

**3. Que fait ce programme assembleur ?**
```asm
LOAD (130)H   # Charge A avec le contenu de l'adresse 130H
ADD (131)H    # Ajoute le contenu de l'adresse 131H à A
ADD (132)H    # Ajoute le contenu de l'adresse 132H à A
STORE (133)H  # Stocke le contenu de A à l'adresse 133H
```
**Description** : Ce programme additionne les valeurs contenues dans les cases mémoires `0x130`, `0x131` et `0x132`, puis enregistre le résultat dans `0x133`.

**4. Traduction en langage machine (Hexadécimal)**
Opcodes : `LOAD = 1`, `STORE = 2`, `ADD = 5`.
* `LOAD (130)H`   $\rightarrow$ opcode `1`, adresse `130` $\rightarrow$ `0x1130`
* `ADD (131)H`    $\rightarrow$ opcode `5`, adresse `131` $\rightarrow$ `0x5131`
* `ADD (132)H`    $\rightarrow$ opcode `5`, adresse `132` $\rightarrow$ `0x5132`
* `STORE (133)H`  $\rightarrow$ opcode `2`, adresse `133` $\rightarrow$ `0x2133`

*Représentation en mémoire centrale à partir de l'adresse `100H`* :
* Adresse `0x100` : `1130H`
* Adresse `0x101` : `5131H`
* Adresse `0x102` : `5132H`
* Adresse `0x103` : `2133H`

**5. Évolution des mémoires et du registre A**
*Données initiales* : `Mem[130H]=0002H`, `Mem[131H]=0003H`, `Mem[132H]=0001H`, `Mem[133H]=0022H`.
1. Après `LOAD (130)H` : $A = 0002H$.
2. Après `ADD (131)H` : $A = 0002H + 0003H = 0005H$.
3. After `ADD (132)H` : $A = 0005H + 0001H = 0006H$.
4. Après `STORE (133)H` : $Mem[133H] = 0006H$ (le registre $A$ conserve sa valeur $0006H$).

**6. Échange du contenu de deux cases mémoires (130H) et (131H)**
Puisqu'on ne dispose que d'un seul registre temporaire ($A$), on doit s'appuyer sur une case mémoire libre (par exemple `133H`) pour stocker temporairement une donnée :
```asm
LOAD (130)H   # A = Mem
STORE (133)H  # Sauvegarde temporaire : Mem = Mem
LOAD (131)H   # A = Mem
STORE (130)H  # Transfert : Mem = Mem
LOAD (133)H   # A = valeur initiale de Mem
STORE (131)H  # Finalisation de l'échange : Mem = Mem d'origine
```
:::
:::
