---
title: "TD 1 corrige - Codage binaire et logique combinatoire"
subject: "SN361-VHDL"
type: "td"
target: "SN361-VHDL-td1.html"
eyebrow: "SN361 - TD 1"
heading: "Codage binaire, tables de verite et logique combinatoire"
summary: "Conversions signees/non signees, complement a 2, portes logiques, XOR/XNOR et comparateurs."
pdf: "TD1_Correction_SN361.pdf"
---
:::exercise label="Exercice 1" title="EXERCICE 1"
#### 1) Rappeler les bornes minimale et maximale pour le codage des nombres signÃ©s et non signÃ©s sur \(n\) bits.

Pour un nombre signÃ© sur \(n\) bits, les valeurs vont de \(-2^{(n-1)}\) Ã  \(2^{(n-1)}-1\).
 Pour un nombre non signÃ© sur \(n\) bits, les valeurs vont de \(0\) Ã  \(2^{n}-1\).

#### 2) et 3) Conversion des nombres en base 10 sur 10 bits et hexadÃ©cimale :

Avec 10 bits, on peut coder des nombres signÃ©s allant de \(-512\) Ã  \(511\).
 Avec 10 bits, on peut coder des nombres non signÃ©s allant de \(0\) Ã  \(1023\).

| **DÃ©cimal** | **SignÃ©** | **Non signÃ©** | **HexadÃ©cimale** |
| --- | --- | --- | --- |
| 344 | Oui, 0101011000 | Oui, 0101011000 | 158 |
| 115 | Oui, 0001110011 | Oui, 0001110011 | 73 |
| -42 | Oui, 1111010110 | Non | FD6 |
| 666 | Non (hors de la plage) | Oui, 1010011010 | 29A |
| -950 | Non (hors de la plage) | Non | X |
| -496 | Oui, 1000010000 | Non | E10 |
| 260 | Oui, 0100000100 | Oui, 0100000100 | 104 |
| 1515 | Non (hors de la plage) | Non | X |

#### 4) Pour chaque nombre suivant en base 2 sur 8 bits signÃ©s, donner sa valeur numÃ©rique correspondante en base 10 :

On utilise la mÃ©thode du complÃ©ment Ã  2:

- 0b11000011 \(= -61\)
- 0b10100110 \(= -90\)
- 0b11110000 \(= -16\)
- 0b11111101 \(= -3\)
- 0b00111011 \(= 59\)

#### 5) En VHDL et en Verilog, comment convertit-on les nombres dÃ©cimaux 293993 et -293900 en nombres binaires signÃ©s et non signÃ©s ?

**VHDL :**

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity Convertisseur is
Port (
    resultat_non_signe: out std_logic_vector(18 downto 0);
    resultat_signe: out std_logic_vector(19 downto 0)
);
end Convertisseur;

architecture Behavioral of Convertisseur is
    signal decimal_value: integer := 293993;
    signal binary_value_unsigned: std_logic_vector(18 downto 0);
    signal binary_value_signed: std_logic_vector(19 downto 0);
begin
    binary_value_unsigned <= std_logic_vector(to_unsigned(decimal_value, 19));
    binary_value_signed <= std_logic_vector(to_signed(decimal_value, 20));
    resultat_non_signe <= binary_value_unsigned;
    resultat_signe <= binary_value_signed;
end Behavioral;
```

**Verilog :**

```vhdl
module Convertisseur (
    output reg [18:0] resultat_non_signe,
    output reg [19:0] resultat_signe
);
    integer decimal_value = 293993;
    always @(*) begin
        resultat_non_signe = decimal_value[18:0];
        resultat_signe = decimal_value[19:0];
    end
endmodule
```
:::

:::exercise label="Exercice 2" title="EXERCICE 2"
#### 1) Rappeler la table de vÃ©ritÃ© de la fonction NAND.

| \(a\) | \(b\) | \(a \text{ NAND } b\) |
| --- | --- | --- |
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

#### 2) DÃ©montrer par les tables de vÃ©ritÃ© l'Ã©galitÃ© suivante : \(b = \overline{a}\cdot b + a\cdot\overline{b}\)

| \(a\) | \(b\) | \(\overline{a}\) | \(\overline{b}\) | \(\overline{a}\cdot b\) | \(a\cdot\overline{b}\) | \(\overline{a}\cdot b + a\cdot\overline{b}\) | \(a \text{ XOR } b\) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 | 1 | 1 | 1 |
| 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |

#### 3) En dÃ©duire l'expression et un circuit Ã  base de AND, OR et NOT de la fonction XNOR

En utilisant le tableau de Karnaugh basÃ© sur la table de vÃ©ritÃ© de l'opÃ©ration XNOR : \((a\cdot b)+(\overline{a}\cdot\overline{b})\).
 Remarque : Il est Ã©galement possible d'appliquer la loi de Morgan Ã  l'Ã©quation logique de l'opÃ©ration XOR : \((a+b)\cdot(\overline{a}+\overline{b})\).

Pour le circuit, on peut rÃ©aliser l'Ã©quation dÃ©rivÃ©e du tableau de Karnaugh.

#### 4) Donner les tables de vÃ©ritÃ©s des fonctions suivantes : \(a+a\cdot b\), \(a+\overline{a}\cdot b\), multiplexeur 4 vers 1.

| \(a\) | \(b\) | \(a+a\cdot b\) |
| --- | --- | --- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

| \(a\) | \(b\) | \(\overline{a}\) | \(\overline{a}\cdot b\) | \(a+\overline{a}\cdot b\) |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |

| Sel1 | Sel0 | Sortie |
| --- | --- | --- |
| 0 | 0 | In0 |
| 0 | 1 | In1 |
| 1 | 0 | In2 |
| 1 | 1 | In3 |
:::

:::exercise label="Exercice 3" title="EXERCICE 3"
#### 1) Quelle fonction logique boolÃ©enne retourne 0 lorsque les entrÃ©es sont diffÃ©rentes et 1 sinon.

La fonction est XNOR.

#### 2) Combien de lignes comporte la table de vÃ©ritÃ© complÃ¨te ?

ConsidÃ©rons les valeurs suivantes qui sont sur 4 bits : \(A = A_3A_2A_1A_0\) et \(B = B_3B_2B_1B_0\). La taille de la table de vÃ©ritÃ© aura donc \(2^{4+4}=256\) lignes.

#### 3) Donner la fonction logique correspondante Ã  la comparaison sur 4 bits.

Pour que les deux valeurs soient similaires, il faut que chaque bit Ã  l'indice \(n\) de A soit Ã©gal au bit Ã  l'indice \(n\) de B.
 La fonction logique est : \(\text{Comparateur} = (A_3 \text{ XNOR } B_3) \text{ AND } (A_2 \text{ XNOR } B_2) \text{ AND } (A_1 \text{ XNOR } B_1) \text{ AND } (A_0 \text{ XNOR } B_0)\).

#### 4) Faire le schÃ©ma de cÃ¢blage

#### 5) Ecrire cette fonction en VHDL et Verilog comportemental.

**VHDL :**

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity Comparateur_4bits is
Port (
    A: in STD_LOGIC_VECTOR(3 downto 0);
    B: in STD_LOGIC_VECTOR(3 downto 0);
    Equal: out STD_LOGIC
);
end Comparateur_4bits;

architecture Behavioral of Comparateur_4bits is
begin
    Equal <= (A(3) xnor B(3)) and (A(2) xnor B(2)) and (A(1) xnor B(1)) and (A(0) xnor B(0));
end Behavioral;
```

**Verilog :**

```vhdl
module Comparateur_4bits (
    input [3:0] A,
    input [3:0] B,
    output Equal
);
    assign Equal = (A[3] ~^ B[3]) & (A[2] ~^ B[2]) & (A[1] ~^ B[1]) & (A[0] ~^ B[0]);
endmodule
```
:::

:::exercise label="Exercice 4" title="EXERCICE 4"
Eq1 : \(a\cdot b + \overline{a}\cdot\overline{b}\)
 Eq2 : \((a+b)\cdot c\)
 Eq3 : \(\overline{a\cdot b}+c\)

#### 1) ReprÃ©sentez avec des portes logiques les trois Ã©quations.

#### 2) Codez en VHDL et Verilog les Ã©quations en comportemental.

On le fait pour l'Ã©quation 1:

**VHDL :**

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity Eq1 is
Port (
    a: in STD_LOGIC;
    b: in STD_LOGIC;
    result: out STD_LOGIC
);
end Eq1;

architecture Behavioral of Eq1 is
begin
    result <= (a AND b) OR (NOT a AND NOT b);
end Behavioral;
```

**Verilog :**

```vhdl
module Eq1 (
    input wire a,
    input wire b,
    output wire result
);
    assign result = (a & b) | (~a & ~b);
endmodule
```
:::

:::exercise label="Exercice 5" title="EXERCICE 5"
#### 1) ComplÃ©ter la table de vÃ©ritÃ© de l'afficheur 7 segments.

| **Decimal Digit** | **Input lines (ABCD)** | **Output lines (abcdefg)** |
| --- | --- | --- |
| 0 | 0000 | 1111110 |
| 1 | 0001 | 0110000 |
| 2 | 0010 | 1101101 |
| 3 | 0011 | 1111001 |
| 4 | 0100 | 0110011 |
| 5 | 0101 | 1011011 |
| 6 | 0110 | 1011111 |
| 7 | 0111 | 1110000 |
| 8 | 1000 | 1111111 |
| 9 | 1001 | 1111011 |

#### 2) En utilisant les tableaux de Karnaugh, simplifier les fonctions des segments \(a\), \(b\) et \(g\).

\[\begin{aligned}a &= A + C + B\cdot D + \overline{B}\cdot\overline{D} \\ b &= \overline{B} + \overline{C}\cdot\overline{D} + C\cdot D \\ g &= A + B\cdot\overline{C} + \overline{B}\cdot C + C\cdot\overline{D}\end{aligned}\]
:::
