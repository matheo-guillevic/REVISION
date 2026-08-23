---
title: SN331-Architecture-processeur - Revision ESISAR
subject: SN331-Architecture-processeur
type: course
---

:::section id="sn331-intro" eyebrow="SN331-Architecture-processeur" title="Architecture des processeurs et assembleur RISC-V" summary="Cours de revision sur les abstractions systeme, l'ISA RISC-V, le pipeline, les caches et la memoire virtuelle."
:::dashboard
:::card class="progress-card" kicker="Objectif" title="SN331"
Comprendre comment une instruction passe du code assembleur au materiel : registres, ALU, pipeline, memoire, caches, MMU et systeme d'exploitation.
:::

:::card class="priority-card" kicker="Priorites de revision"
1. Relier langage de haut niveau, assembleur, ISA et microarchitecture.
2. Lire les registres RISC-V, les formats d'instructions et les acces memoire.
3. Savoir utiliser la pile et la convention d'appel.
4. Identifier les aleas de pipeline et les solutions classiques.
5. Decomposer une adresse pour un cache ou une traduction virtuelle.
:::
:::

:::quicklinks
- [Abstractions](#sn331-abstractions)
- [Donnees](#sn331-donnees)
- [ISA RISC-V](#sn331-isa)
- [Assembleur](#sn331-assembleur)
- [Pipeline](#sn331-pipeline)
- [Caches](#sn331-caches)
- [Memoire virtuelle](#sn331-memoire-virtuelle)
- [Exercices](#sn331-exercices)
- [TD](#sn331-td)
- [Revision](#sn331-revision)
- [PDF](#sn331-pdfs)
:::
:::

:::section id="sn331-abstractions" eyebrow="Chapitre 1" title="Introduction et abstractions systeme" summary="Situer le processeur entre logiciel, ISA, microarchitecture et circuits logiques."
:::grid variant="two-col"
:::block type="definition" title="Role du processeur"
Un processeur execute des instructions codees en binaire. Il transforme une suite d'instructions machine en actions materielles : lecture de registres, calcul ALU, acces memoire, branchement et ecriture de resultat.

Le point important du cours est la separation entre **ce que voit le logiciel** et **comment le materiel le realise**.
:::

:::block type="theorem" title="Niveaux d'abstraction"
1. Langage de haut niveau : C, Java, Python.
2. Assembleur : representation lisible des instructions machine.
3. Langage machine : bits interpretes par le processeur.
4. ISA : contrat visible par le programmeur.
5. Microarchitecture : datapath, controle, pipeline, caches.
6. Circuits logiques : portes, bascules, multiplexeurs.
:::
:::

:::block type="neutral" title="Chaine de transformation"
```text
Langage haut niveau
        |
        v
Assembleur RISC-V
        |
        v
Langage machine
        |
        v
Microarchitecture
        |
        v
Circuits logiques
```
:::

:::annotation title="A retenir"
L'ISA est le contrat ; la microarchitecture est une implementation possible de ce contrat. Deux processeurs peuvent executer la meme ISA avec des microarchitectures tres differentes.
:::
:::

:::section id="sn331-donnees" eyebrow="Chapitre 2" title="Donnees, memoire et modele de Von Neumann" summary="Comprendre le stockage des donnees, le cycle d'instruction et l'adressage."
:::grid variant="two-col"
:::block type="definition" title="Modele de Von Neumann"
Le programme et les donnees sont stockes dans la meme memoire. Le processeur contient :

* une unite de controle ;
* une unite de traitement avec ALU et registres ;
* un compteur de programme `PC` ;
* des bus d'adresses, de donnees et de controle.
:::

:::block type="method" title="Cycle d'instruction"
1. **Fetch** : lire l'instruction a l'adresse du `PC`.
2. **Decode** : identifier l'operation et les registres.
3. **Read operands** : lire registres ou immediats.
4. **Execute** : calcul ALU ou calcul d'adresse.
5. **Memory / Write-back** : acces memoire puis ecriture du resultat.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Representations"
* 1 octet = 8 bits.
* 1 mot RV32 = 32 bits = 4 octets.
* En non signe avec \(N\) bits : valeurs de \(0\) a \(2^N-1\).
* En complement a 2 avec \(N\) bits : valeurs de \(-2^{N-1}\) a \(2^{N-1}-1\).
:::

:::block type="remember" title="Little endian"
RISC-V est little endian : l'octet de poids faible est stocke a la plus petite adresse.

| Adresse | 0x00 | 0x01 | 0x02 | 0x03 |
|---|---:|---:|---:|---:|
| Octet pour `0x12345678` | 0x78 | 0x56 | 0x34 | 0x12 |
:::
:::
:::

:::section id="sn331-isa" eyebrow="Chapitre 3" title="Architecture du jeu d'instructions et RISC-V" summary="Lire le contrat logiciel/materiel : registres, instructions et formats binaires."
:::grid variant="two-col"
:::block type="definition" title="ISA"
L'ISA definit ce que le logiciel peut demander au processeur :

* registres visibles ;
* instructions disponibles ;
* formats binaires ;
* modes d'adressage ;
* exceptions et comportement attendu.
:::

:::block type="theorem" title="RISC-V"
RISC-V est une ISA de type **load/store** : les calculs se font dans les registres, et seules les instructions `load` et `store` accedent a la memoire.

Les instructions de base ont une taille fixe de 32 bits, ce qui simplifie le decodage materiel.
:::
:::

:::block type="neutral" title="Registres ABI principaux"
| Registre | Nom | Role |
|---:|---|---|
| `x0` | `zero` | vaut toujours 0 |
| `x1` | `ra` | adresse de retour |
| `x2` | `sp` | pointeur de pile |
| `x5-x7`, `x28-x31` | `t0-t6` | temporaires |
| `x8-x9`, `x18-x27` | `s0-s11` | sauvegardes |
| `x10-x17` | `a0-a7` | arguments et retours |
:::

:::block type="neutral" title="Formats d'instructions"
```text
Format R : funct7 | rs2 | rs1 | funct3 | rd | opcode
Format I : immediate[11:0] | rs1 | funct3 | rd | opcode
Format S : imm[11:5] | rs2 | rs1 | funct3 | imm[4:0] | opcode
```
:::
:::

:::section id="sn331-assembleur" eyebrow="Chapitre 4" title="Programmation assembleur RISC-V" summary="Manipuler registres, memoire, branchements, fonctions et pile."
:::grid variant="two-col"
:::block type="method" title="Operations de base"
```asm
add  x1, x2, x3      # x1 = x2 + x3
sub  x4, x5, x6      # x4 = x5 - x6
addi x10, x10, 5     # x10 = x10 + 5
and  x9, x10, x11
or   x9, x10, x11
xor  x9, x10, x11
```
:::

:::block type="method" title="Load / Store"
```asm
lw  rd, offset(base)  # lit un mot 32 bits
lb  rd, offset(base)  # lit un octet signe
lbu rd, offset(base)  # lit un octet non signe
sw  rs2, offset(base) # ecrit un mot
sb  rs2, offset(base) # ecrit un octet
```

L'adresse calculee vaut :

\[
\text{adresse}=\text{base}+\text{offset}
\]
:::
:::

:::grid variant="two-col"
:::block type="method" title="Branchements"
```asm
beq  rs1, rs2, label  # branche si egal
bne  rs1, rs2, label  # branche si different
blt  rs1, rs2, label  # inferieur signe
bge  rs1, rs2, label  # superieur ou egal signe
jal  ra, fonction     # appel avec sauvegarde de retour
jalr x0, 0(ra)        # retour de fonction
```
:::

:::block type="warning" title="Pile et convention d'appel"
La pile est descendante : reserver de l'espace revient a diminuer `sp`.

Une fonction non feuille doit sauvegarder `ra` si elle appelle une autre fonction, sinon l'adresse de retour est ecrasee par le nouvel appel.
:::
:::

:::block type="method" title="Exemple push / pop"
```asm
# PUSH
addi sp, sp, -12
sw   x5, 8(sp)
sw   x6, 4(sp)
sw   x20, 0(sp)

# POP
lw   x20, 0(sp)
lw   x6, 4(sp)
lw   x5, 8(sp)
addi sp, sp, 12
```
:::
:::

:::section id="sn331-pipeline" eyebrow="Chapitre 5" title="Microarchitecture et pipeline" summary="Comprendre les etages du processeur, les gains de debit et les aleas."
:::grid variant="two-col"
:::block type="definition" title="Pipeline 5 etages"
```text
IF -> ID -> EX -> MEM -> WB
```

* **IF** : lecture instruction.
* **ID** : decodage et lecture registres.
* **EX** : ALU ou calcul d'adresse.
* **MEM** : acces memoire.
* **WB** : ecriture registre.
:::

:::block type="theorem" title="Performance"
Le pipeline n'accelere pas forcement la latence d'une instruction, mais augmente le debit : plusieurs instructions sont traitees en parallele dans des etages differents.

\[
T_{cycle}=\max(T_{etage})+T_{registre}
\]
:::
:::

:::grid variant="two-col"
:::block type="warning" title="Aleas"
* **Structurels** : deux instructions veulent la meme ressource.
* **Donnees** : une instruction lit un resultat pas encore ecrit.
* **Controle** : branchement ou saut qui modifie le `PC`.
:::

:::block type="method" title="Solutions classiques"
* Forwarding : transmettre un resultat directement d'un etage a un autre.
* Stall : inserer une bulle quand le forwarding ne suffit pas.
* Reordonnancement : deplacer une instruction independante pour cacher un delai.
* Prediction de branchement : continuer a fetcher sur une hypothese.
:::
:::

:::block type="neutral" title="Load-use hazard"
```asm
lw  x1, 0(x2)
add x3, x1, x4   # utilise x1 trop tot : stall necessaire
```
:::
:::

:::section id="sn331-caches" eyebrow="Chapitre 6" title="Hierarchie memoire et caches" summary="Analyser les caches avec localite, lignes, tag, index, offset et politiques d'ecriture."
:::grid variant="two-col"
:::block type="definition" title="Pourquoi un cache ?"
Les registres sont tres rapides mais petits. La DRAM est grande mais lente. Le cache est une memoire SRAM intermediaire qui garde les blocs recemment utilises.
:::

:::block type="theorem" title="Localite"
* **Temporelle** : une donnee utilisee maintenant risque d'etre reutilisee bientot.
* **Spatiale** : les adresses voisines ont de fortes chances d'etre lues bientot.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Adresse de cache"
Une adresse est decomposee en :

```text
TAG | INDEX | OFFSET
```

* `offset` : position dans la ligne.
* `index` : ligne ou ensemble vise.
* `tag` : identifie le bloc exact.
:::

:::block type="remember" title="Types de caches"
* **Direct mapped** : un bloc n'a qu'un emplacement possible.
* **Fully associative** : un bloc peut aller partout.
* **N-way set associative** : compromis par ensembles de N voies.
:::
:::

:::grid variant="two-col"
:::block type="warning" title="Ecritures"
* **Write-through** : ecrit dans le cache et en memoire.
* **Write-back** : ecrit dans le cache, puis en memoire seulement a l'eviction.
* **Dirty bit** : indique qu'une ligne a ete modifiee.
:::

:::block type="method" title="Question type"
Pour un cache direct de 8 lignes de 32 octets avec adresses 16 bits :

* offset : \(32=2^5\), donc 5 bits ;
* index : \(8=2^3\), donc 3 bits ;
* tag : \(16-5-3=8\) bits.
:::
:::
:::

:::section id="sn331-memoire-virtuelle" eyebrow="Chapitre 7" title="Memoire virtuelle et pagination" summary="Relier adresses virtuelles, adresses physiques, table des pages, defauts de page et TLB."
:::grid variant="two-col"
:::block type="definition" title="Memoire virtuelle"
La memoire virtuelle donne a chaque programme l'illusion d'un espace d'adressage prive, continu et protege.

La traduction est assuree par la MMU avec l'aide du systeme d'exploitation.
:::

:::block type="method" title="Adresse paginee"
```text
Adresse virtuelle = VPN | offset
Adresse physique  = PPN | offset
```

L'offset ne change pas : seule la page virtuelle `VPN` est traduite en page physique `PPN`.
:::
:::

:::grid variant="two-col"
:::block type="warning" title="Defaut de page"
Si la page demandee n'est pas presente en RAM :

1. le processeur declenche une exception ;
2. l'OS localise la page sur disque ;
3. l'OS charge la page en RAM ;
4. la table des pages est mise a jour ;
5. l'instruction fautive est relancee.
:::

:::block type="remember" title="TLB"
Le TLB est un cache de traductions virtuel -> physique. Sans TLB, chaque acces memoire demanderait d'abord un acces a la table des pages, ce qui doublerait le cout des acces.
:::
:::
:::

:::section id="sn331-exercices" eyebrow="Exercices" title="Exercices corriges synthetiques" summary="Appliquer les methodes sur l'adressage, la pile RISC-V et les caches."
:::exercise label="SN331" title="Capacite adressable"
**Enonce.** Le bus d'adresses contient 32 fils.

1. Si chaque adresse pointe vers un octet, la capacite vaut :

\[
2^{32}\ \text{octets}=4\ \text{Gio}
\]

2. Si chaque adresse pointe vers un mot de 32 bits, donc 4 octets :

\[
2^{32}\times 4=2^{34}\ \text{octets}=16\ \text{Gio}
\]
:::

:::exercise label="SN331" title="Renversement de chaine avec la pile"
**Idee.** On empile les caracteres de la chaine source, puis on les depile dans la destination.

```asm
rev:
    addi sp, sp, -16
    sw   ra, 12(sp)
    sw   s0, 8(sp)
    sw   s1, 4(sp)

    mv   s0, a0       # source
    mv   s1, a1       # destination

loop_push:
    lbu  t0, 0(s0)
    beq  t0, zero, loop_pop
    addi sp, sp, -4
    sw   t0, 0(sp)
    addi s0, s0, 1
    j    loop_push

loop_pop:
    lw   t0, 0(sp)
    addi sp, sp, 4
    beq  t0, zero, done
    sb   t0, 0(s1)
    addi s1, s1, 1
    j    loop_pop

done:
    sb   zero, 0(s1)
    lw   s1, 4(sp)
    lw   s0, 8(sp)
    lw   ra, 12(sp)
    addi sp, sp, 16
    ret
```
:::

:::exercise label="SN331" title="Conflits dans un cache direct"
Un cache direct de 4 lignes de 32 octets contient 128 octets. Une ligne contient :

\[
32/4=8\ \text{entiers}
\]

Pour trois tableaux `A[16]`, `B[16]`, `C[16]` contigus, chaque tableau occupe deux lignes. Si `A` et `C` tombent sur les memes index, les acces alternes provoquent un conflit permanent : `A` charge une ligne, puis `C` l'ejecte.

Le reflexe consiste a lister les lignes memoire, appliquer le modulo du nombre de lignes de cache, puis compter les hits/misses dans l'ordre reel des acces.
:::
:::

:::section id="sn331-td" eyebrow="Travaux diriges" title="TD SN331-Architecture-processeur corriges" summary="Les corrections sont separees par TD pour reviser directement microarchitecture, RISC-V, caches, pipeline et memoire virtuelle."
:::dashboard
:::card class="chapter-card" pill="TD 1" title="Vue d'ensemble d'un Ordinateur et Interconnexions" href="SN331-Architecture-processeur-td1.html" link="Ouvrir la page corrigee"
Correction guidee avec methodes, calculs et points de vigilance.
:::

:::card class="chapter-card" pill="TD 2" title="Programmation Assembleur RISC-V - Niveau 1" href="SN331-Architecture-processeur-td2.html" link="Ouvrir la page corrigee"
Correction guidee avec methodes, calculs et points de vigilance.
:::

:::card class="chapter-card" pill="TD 3" title="Programmation Assembleur - Gestion de la Pile et Fonctions" href="SN331-Architecture-processeur-td3.html" link="Ouvrir la page corrigee"
Correction guidee avec methodes, calculs et points de vigilance.
:::

:::card class="chapter-card" pill="TD 4" title="Fonctionnement et Analyse de la Mémoire Cache" href="SN331-Architecture-processeur-td4.html" link="Ouvrir la page corrigee"
Correction guidee avec methodes, calculs et points de vigilance.
:::

:::card class="chapter-card" pill="TD 5" title="Microarchitecture Pipeline - Performance et Calibrage" href="SN331-Architecture-processeur-td5.html" link="Ouvrir la page corrigee"
Correction guidee avec methodes, calculs et points de vigilance.
:::

:::card class="chapter-card" pill="TD 6" title="Hiérarchie Mémoire et Pagination (Mémoire Virtuelle)" href="SN331-Architecture-processeur-td6.html" link="Ouvrir la page corrigee"
Correction guidee avec methodes, calculs et points de vigilance.
:::
:::
:::

:::section id="sn331-revision" eyebrow="Revision" title="Fiche finale SN331" summary="Les reflexes rapides pour traiter un exercice d'architecture processeur."
:::grid variant="two-col"
:::block type="remember" title="RISC-V"
* Les calculs se font dans les registres.
* La memoire est atteinte par `load` et `store`.
* Les offsets sont en octets.
* `x0` vaut toujours zero.
* `ra` doit etre sauvegarde dans une fonction non feuille.
:::

:::block type="method" title="Pipeline et memoire"
1. Identifier les etages de chaque instruction.
2. Rechercher les dependances et les branchements.
3. Pour un cache, separer tag, index et offset.
4. Pour la memoire virtuelle, separer VPN et offset.
5. Verifier si le TLB ou la table des pages contient la traduction.
:::
:::
:::
