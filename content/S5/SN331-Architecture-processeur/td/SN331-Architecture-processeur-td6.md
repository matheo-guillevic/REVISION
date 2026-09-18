---
title: "TD 6 corrige - Hiérarchie Mémoire et Pagination (Mémoire Virtuelle)"
subject: "SN331-Architecture-processeur"
type: "td"
target: "SN331-Architecture-processeur-td6.html"
eyebrow: "SN331 - TD 6"
heading: "Hiérarchie Mémoire et Pagination (Mémoire Virtuelle)"
summary: "Correction guidee avec methodes, calculs et points de vigilance."
withPrism: true
---
:::section id="sn331-td6" eyebrow="TD 6" title="Hiérarchie Mémoire et Pagination (Mémoire Virtuelle)" summary="Correction guidee avec methodes, calculs et points de vigilance."


:::exercise label="TD 6" title="Exercice 1 : Étude d'une hiérarchie mémoire à trois niveaux"


#### 1. Formule de calcul du temps d'accès moyen $t_i$
Le temps moyen d'accès à un niveau de cache $i$ dépend de son taux de succès ($T_i$). S'il y a succès (hit), on accède directement à la donnée en un temps $t_{s,i}$. S'il y a échec (miss), on subit un temps d'attente $t_{e,i}$ lié à la recherche infructueuse, auquel s'ajoute le temps d'accès moyen au niveau inférieur $t_{i+1}$ :
$$t_i = T_i \times t_{s,i} + (1 - T_i) \times (t_{e,i} + t_{i+1})$$

#### 2. Calcul du temps d'accès moyen pour les différentes configurations

* **Configuration A : Mémoire centrale seule**
$$t_{glob} = t_{\text{mémoire}} = 40\text{ cycles}$$

* **Configuration B : Mémoire centrale + Cache L1**
$$t_{glob} = t_1 = T_1 \times t_{s,1} + (1 - T_1) \times (t_{e,1} + t_{\text{mémoire}})$$
$$t_1 = 0.80 \times 3 + (1 - 0.80) \times (1 + 40) = 2.4 + 0.20 \times 41 = 10.6\text{ cycles}$$

* **Configuration C : Mémoire centrale + L1 + L2**
On résout de bas en haut. On calcule d'abord l'accès moyen au cache L2 raccordé à la mémoire :
$$t_2 = T_2 \times t_{s,2} + (1 - T_2) \times (t_{e,2} + t_{\text{mémoire}})$$
$$t_2 = 0.90 \times 5 + 0.10 \times (2 + 40) = 4.5 + 4.2 = 8.7\text{ cycles}$$
Puis, on injecte $t_2$ dans le calcul de $t_1$ :
$$t_1 = 0.80 \times 3 + 0.20 \times (1 + t_2) = 2.4 + 0.20 \times (1 + 8.7) = 4.34\text{ cycles}$$

* **Configuration D : Mémoire centrale + L1 + L2 + L3**
Calcul de $t_3$ :
$$t_3 = T_3 \times t_{s,3} + (1 - T_3) \times (t_{e,3} + t_{\text{mémoire}})$$
$$t_3 = 0.95 \times 12 + 0.05 \times (4 + 40) = 11.4 + 0.05 \times 44 = 11.4 + 2.2 = 13.6\text{ cycles}$$
Calcul de $t_2$ intégrant $t_3$ :
$$t_2 = 0.90 \times 5 + 0.10 \times (2 + 13.6) = 4.5 + 1.56 = 6.06\text{ cycles}$$
Calcul de $t_1$ intégrant $t_2$ :
$$t_1 = 0.80 \times 3 + 0.20 \times (1 + 6.06) = 2.4 + 1.412 = 3.812\text{ cycles}$$

#### Conclusion sur l'apport des caches
* **Sans cache** : l'accès prend 40 cycles.
* **Avec L1** : on descend à 10.6 cycles (un gain massif de **73.5%**).
* **Avec L1/L2** : on atteint 4.34 cycles (**89%** de réduction du temps d'accès initial).
* **Avec L1/L2/L3** : on atteint 3.812 cycles (**90.5%** d'amélioration).
* **Bilan** : Le premier niveau de cache (L1) offre le gain de performance le plus déterminant. L'ajout d'un cache L2 et L3 permet de consolider l'édifice en limitant de façon drastique l'impact d'un échec de L1, évitant de payer trop fréquemment la lourde pénalité d'accès à la mémoire physique (40 cycles).
:::

:::exercise label="TD 6" title="Exercice 2 : Traduction d'adresses et Pagination de Mémoire Virtuelle"


* **Spécifications du système** :
  * Adresse logique : **9 bits** (décomposés de gauche à droite : 3 bits pour le Répertoire de Pages, 3 bits pour la Table des Pages, et 3 bits pour le Déplacement (Offset) dans la page).
  * Chaque page contient **8 mots** de 32 bits ($2^3 = 8$).
  * Les adresses physiques pointent vers un mot de 32 bits en mémoire centrale.

#### 1. Capacité d'adressage
L'adresse logique étant codée sur 9 bits, l'espace d'adressage virtuel de chaque processus est de :
$$2^9 = 512\text{ mots}$$.

#### 2. Traduction de l'adresse virtuelle `0b101111001`
* **Décomposition de l'adresse virtuelle** :
  * Répertoire de pages (3 bits de poids fort) : `101` = **5**
  * Table de pages (3 bits du milieu) : `111` = **7**
  * Déplacement (3 bits de poids faible) : `001` = **1**

* **Pour le Processus 1 (Base Répertoire de Pages à l'adresse 0o01)** :
  1. On va chercher l'entrée 5 dans la table de répertoires du Processus 1 (située à l'adresse 1 en mémoire).
  2. Cette entrée pointe vers la Table des Pages associée.
  3. L'entrée 7 de cette Table des Pages fournit le Numéro de Page Physique ($PPN$).
  4. On concatène ce $PPN$ avec le déplacement (`001`) pour obtenir l'adresse physique finale du mot en mémoire centrale.

* **Pour le Processus 2 (Base Répertoire de Pages à l'adresse 0o17)** :
  Le mécanisme est identique mais débute à l'adresse de base du répertoire du Processus 2 (adresse `0o17` en octal), garantissant ainsi un cloisonnement parfait des espaces mémoires de chaque processus.
:::

:::
