---
title: "TD 3 corrige - Programmation Assembleur - Gestion de la Pile et Fonctions"
subject: "SN331-Architecture-processeur"
type: "td"
target: "SN331-Architecture-processeur-td3.html"
eyebrow: "SN331 - TD 3"
heading: "Programmation Assembleur - Gestion de la Pile et Fonctions"
summary: "Correction guidee avec methodes, calculs et points de vigilance."
withPrism: true
---
:::section id="sn331-td3" eyebrow="TD 3" title="Programmation Assembleur - Gestion de la Pile et Fonctions" summary="Correction guidee avec methodes, calculs et points de vigilance."


:::exercise label="TD 3" title="Exercice 1 : Renversement de chaîne via la pile (`rev`)"


#### Explication de l'algorithme
1. Empiler la valeur de garde `0` (caractère `\0`) dans la pile d'exécution.
2. Parcourir la chaîne d'entrée et empiler ses caractères un à un (alignés sur 8 octets pour respecter les contraintes d'alignement de la pile).
3. Dépiler les caractères un à un : en raison de la nature LIFO (Last In, First Out) de la pile, les caractères ressortent dans l'ordre inverse.
4. Enregistrer ces caractères dans la zone mémoire de destination.
5. S'arrêter de dépiler lorsque la valeur de garde `0` est extraite. Ajouter le `\0` terminal à la chaîne de destination.

#### Code du Programme Principal (main)
```asm
.text
.globl main
main:
    addi sp, sp, -16     # Réserve l'espace de pile
    sd ra, 8(sp)         # Sauvegarde de ra (adresse de retour)

    la a0, machaine      # Paramètre 1 : adresse chaîne source
    la a1, chaineresu    # Paramètre 2 : adresse chaîne dest
    jal ra, rev          # Appel de la fonction de renversement

    la a0, chaineresu    # Préparation impression chaîne renversée
    jal ra, println_string

    ld ra, 8(sp)         # Restauration ra
    addi sp, sp, 16      # Libération pile
    ret                  # Fin du programme principal

.section .data
machaine:
    .string "saper"
chaineresu:
    .space 64
```

#### Code de la Routine `rev`
```asm
rev:
    # Sauvegarde des registres callee-saved utilisés
    addi sp, sp, -24
    sd ra, 16(sp)
    sd s0, 8(sp)
    sd s1, 0(sp)

    mv s0, a0            # s0 = adresse de départ chaîne source
    mv s1, a1            # s1 = adresse de départ chaîne de sortie

    # Étape 1 : Empilement du caractère de garde '\0' (0)
    addi sp, sp, -8
    sd zero, 0(sp)       # sp décroît, on écrit 0

    # Étape 2 : Boucle de lecture et d'empilement
loop1:
    lbu t1, 0(s0)        # Lecture d'un caractère non signé
    beqz t1, endloop1    # Si '\0' détecté, fin d'empilement
    addi sp, sp, -8      # Alloue 8 octets sur la pile
    sd t1, 0(sp)         # Empile le caractère
    addi s0, s0, 1       # Avancer au caractère suivant de la source
    j loop1

endloop1:
    # Étape 3 : Boucle de dépilement et d'écriture
loop2:
    ld t1, 0(sp)         # Récupère le caractère du sommet de pile
    addi sp, sp, 8       # Dépile (sp incrémenté)
    beqz t1, endloop2    # Si c'est notre marqueur '0', fin
    sb t1, 0(s1)         # Écrit le caractère dans le buffer de sortie
    addi s1, s1, 1       # Avancer le pointeur d'écriture
    j loop2

endloop2:
    sb zero, 0(s1)       # Ajout du '\0' terminal dans la chaîne renversée

    # Restauration des registres d'appel
    ld s1, 0(sp)
    ld s0, 8(sp)
    ld ra, 16(sp)
    addi sp, sp, 24      # Restaure l'état de la pile initial
    ret                  # Retour à l'appelant
```
:::

:::exercise label="TD 3" title="Exercice 3 : Countdown récursif (`affn0` et `aff0n`)"


#### 1. Routine Décroissante : `affn0` (de $n$ à 0)
* **Algorithme** : On affiche $n$ immédiatement, puis on appelle récursivement `affn0(n - 1)`.
* **RISC-V** :
```asm
affn0:
    addi sp, sp, -16     # Sauvegarde du contexte d'appel récursif
    sd ra, 8(sp)
    sd a0, 0(sp)         # Sauvegarde du paramètre local n

    blt a0, zero, fin_affn0 # Condition d'arrêt : si n < 0, fin

    # Affichage de n (ASCII : n + 48)
    addi a0, a0, 48
    jal ra, print_char   # Affiche le caractère

    # Appel récursif : affn0(n - 1)
    ld a0, 0(sp)         # Restaure la valeur de n
    addi a0, a0, -1      # n = n - 1
    jal ra, affn0        # Récursion

fin_affn0:
    ld ra, 8(sp)
    addi sp, sp, 16      # Restaure la pile
    ret
```

#### 2. Routine Croissante : `aff0n` (de 0 à $n$)
* **Algorithme** : On appelle récursivement d'abord `aff0n(n - 1)`, puis on affiche $n$ lors de la phase de remontée de la récursion.
* **RISC-V** :
```asm
aff0n:
    addi sp, sp, -16
    sd ra, 8(sp)
    sd a0, 0(sp)         # Sauvegarde de n

    blt a0, zero, fin_aff0n # Condition d'arrêt : n < 0

    # Appel récursif d'abord : aff0n(n - 1)
    addi a0, a0, -1      # Passage du paramètre n-1
    jal ra, aff0n

    # Affichage après récursion (remontée de pile)
    ld a0, 0(sp)         # Restaure n local
    addi a0, a0, 48      # Passage en code ASCII
    jal ra, print_char   # Affiche n

fin_aff0n:
    ld ra, 8(sp)
    addi sp, sp, 16
    ret
```
:::

:::exercise label="TD 3" title="Exercice 4 (Bonus) : Suite de Fibonacci récursive"

Calcul de $F(n) = F(n-1) + F(n-2)$ avec $F(0)=0$ et $F(1)=1$.
```asm
fib_recursive:
    addi sp, sp, -24
    sd ra, 16(sp)
    sd s0, 8(sp)         # s0 contiendra 'a' (le paramètre n d'origine)
    sd s1, 0(sp)         # s1 contiendra le résultat partiel de fib(a-1)

    mv s0, a0            # s0 = n
    li a0, 0             # Valeur par défaut de retour
    beqz s0, fib_exit    # Si n == 0, return 0
    li a0, 1
    li t0, 1
    beq s0, t0, fib_exit # Si n == 1, return 1

    # 1. Calcul de fib_recursive(n - 1)
    addi a0, s0, -1
    jal ra, fib_recursive
    mv s1, a0            # s1 = fib(n - 1)

    # 2. Calcul de fib_recursive(n - 2)
    addi a0, s0, -2
    jal ra, fib_recursive # a0 = fib(n - 2)

    add a0, s1, a0       # a0 = fib(n - 1) + fib(n - 2)

fib_exit:
    ld s1, 0(sp)         # Restauration du contexte d'exécution
    ld s0, 8(sp)
    ld ra, 16(sp)
    addi sp, sp, 24
    ret
```
:::
:::
