---
title: "TD 2 corrige - Programmation Assembleur RISC-V - Niveau 1"
subject: "SN331-Architecture-processeur"
type: "td"
target: "SN331-Architecture-processeur-td2.html"
eyebrow: "SN331 - TD 2"
heading: "Programmation Assembleur RISC-V - Niveau 1"
summary: "Correction guidee avec methodes, calculs et points de vigilance."
withPrism: true
---
:::section id="sn331-td2" eyebrow="TD 2" title="Programmation Assembleur RISC-V - Niveau 1" summary="Correction guidee avec methodes, calculs et points de vigilance."


:::exercise label="TD 2" title="Exercice 1 : Assemblage de `mv t1, s1`"

* La pseudo-instruction `mv rd, rs` est assemblée sous la forme standard de `addi rd, rs, 0`.
* Registres : `t1` est `x6` (`00110`), `s1` est `x9` (`01001`).
* Format d'instruction I (addi) : `imm[11:0]` (12 bits) | `rs1` (5 bits) | `funct3` (3 bits) | `rd` (5 bits) | `opcode` (7 bits).
  * `imm` = `000000000000` (0)
  * `rs1` = `s1` = `01001` (9)
  * `funct3` = `000`
  * `rd` = `t1` = `00110` (6)
  * `opcode` = `0010011` (`OP-IMM` = 0x13)
* Assemblage binaire : `000000000000 01001 000 00110 0010011`
* En Hexadécimal : `0x00048313`
:::

:::exercise label="TD 2" title="Exercice 2 : Désassemblage de `0x00810383`"

* Conversion binaire : `0000 0000 1000 0001 0000 0011 1000 0011`
* Analyse de l'opcode (bits 6-0) : `0000011` (Type LOAD).
* Format I : `imm[11:0]` | `rs1` | `funct3` | `rd` | `opcode`.
  * `opcode` = `0000011` (LOAD)
  * `rd` = `00111` (Registre 7, soit `t2`).
  * `funct3` = `000` (Load Byte, `lb`).
  * `rs1` = `00010` (Registre 2, soit le pointeur de pile `sp`).
  * `imm` = `000000001000` (valeur immédiate 8).
* **Résultat désassemblé** : `lb t2, 8(sp)`.
:::

:::exercise label="TD 2" title="Exercice 3 : Boucle d'incrémentation (t0 de 1 à 8)"

```asm
    li t0, 1         # t0 = 1 (initialisation)
    li t1, 8         # t1 = 8 (valeur limite de comparaison)
loop:
    beq t0, t1, exit # Si t0 == 8, on sort de la boucle
    addi t0, t0, 1   # Sinon, t0 = t0 + 1
    j loop           # Jump inconditionnel vers loop
exit:
```
:::

:::exercise label="TD 2" title="Exercice 4 : Somme des 10 premiers entiers positifs"

Calcul de $S = 0 + 1 + 2 + ... + 9$.
```asm
    li t0, 0         # i = 0 (compteur)
    li t1, 10        # Limite = 10 (non incluse)
    li t2, 0         # Somme = 0
loop_sum:
    bge t0, t1, exit_sum # Si i >= 10, fin
    add t2, t2, t0   # Somme = Somme + i
    addi t0, t0, 1   # i = i + 1
    j loop_sum       # Répéter
exit_sum:
```
:::

:::exercise label="TD 2" title="Exercice 5 : Affichage d'un carré d'étoiles ($n \times n$)"

Nous utilisons deux boucles imbriquées pour afficher $n$ lignes de $n$ caractères `'*'` (ASCII 42), suivis de retours à la ligne `'\n'` (ASCII 10). On suppose que $n$ est dans le registre `s0`.
```asm
    li s1, 0         # ligne_idx = 0
loop_l:
    bge s1, s0, fin_l # Si ligne_idx >= n, on s'arrête
    li s2, 0         # col_idx = 0
loop_c:
    bge s2, s0, fin_c # Si col_idx >= n, fin de ligne
    li a0, 42        # Code ASCII de '*'
    jal ra, print_char # Afficher '*'
    addi s2, s2, 1   # col_idx++
    j loop_c
fin_c:
    li a0, 10        # Code ASCII de '\n'
    jal ra, print_char # Aller à la ligne suivante
    addi s1, s1, 1   # ligne_idx++
    j loop_l
fin_l:
```
:::

:::exercise label="TD 2" title="Exercice 6 : Nombre de bits non-nuls (Entier 64 bits)"

* **Analyse de l'expression `n & 4`** : Le nombre 4 s'écrit `0b100` en binaire (seul le bit d'indice 2 de poids $2^2 = 4$ est à 1). L'opération $n \& 4$ isole ce bit. Si le résultat est $4$, le bit est à 1, sinon il est à 0.

* **Implémentation RISC-V du décompte** :
```asm
# n dans a0, t2 initialisé à 1 (masque glissant), c dans t3 (compteur de bits à 1)
    li t3, 0         # c = 0
    li t2, 1         # t2 = 1 (masque)
loop_bits:
    blt t2, zero, exit_bits # Si t2 est négatif (débordement bit de signe), fin
    and t4, a0, t2   # t4 = n & t2
    beqz t4, no_inc  # Si t4 == 0 (bit à 0), pas d'incrémentation
    addi t3, t3, 1   # Sinon c++
no_inc:
    slli t2, t2, 1   # t2 = t2 * 2 (décalage à gauche du masque)
    j loop_bits
exit_bits:
```
:::

:::exercise label="TD 2" title="Exercice 7 : Ajout de 1 à un tableau d'entiers 64 bits"

* Entiers 64 bits $\rightarrow$ chaque élément occupe **8 octets**.
* `a0` = adresse de début du tableau, `a1` = nombre d'éléments.
```asm
    li t0, 0         # i = 0
loop_tab:
    bge t0, a1, fin_tab # Si i >= taille, fin
    slli t1, t0, 3   # t1 = i * 8 (calcul de l'offset en octets)
    add t2, a0, t1   # t2 = adresse de tab[i]
    ld t3, 0(t2)     # t3 = tab[i] (Load Doubleword, 64 bits)
    addi t3, t3, 1   # t3 = t3 + 1
    sd t3, 0(t2)     # tab[i] = t3 (Store Doubleword)
    addi t0, t0, 1   # i++
    j loop_tab
fin_tab:
```
:::
:::
