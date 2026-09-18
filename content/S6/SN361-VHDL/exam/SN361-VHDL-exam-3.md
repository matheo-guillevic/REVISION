---
title: "Examen SN361-VHDL 3"
subject: "SN361-VHDL"
type: "exam"
target: "SN361-VHDL-exam-3.html"
eyebrow: "SN361 - Examen 3"
heading: "Questions de cours et registre a decalage SIPO"
summary: "Virgule fixe, Karnaugh, numeric_std, processus concurrents, registre SIPO RTL/structurel et chronogrammes."
---
:::exercise label="Partie 1" title="ProblÃ¨me I - Partie cours"
**1.1** Codez en virgule fixe avec le minimum de bits 511,75 [6].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Conversion de la partie entiÃ¨re.**
 On convertit la valeur entiÃ¨re 511 en binaire. Sachant que \(2^9 = 512\), on a \(511 = 2^9 - 1\). En binaire, cela correspond Ã  9 bits tous Ã  '1' : \[511_{10} = 111111111_2\]

**Ã‰tape 2 : Conversion de la partie dÃ©cimale.**
 On convertit 0,75 en sommes de puissances nÃ©gatives de 2 : \(0,75 = 0,5 + 0,25 = 2^{-1} + 2^{-2}\). \[0,75_{10} = 0,11_2\]

**Ã‰tape 3 : Format non signÃ©.**
 En combinant les deux parties, on obtient le code en virgule fixe non signÃ©. Il nÃ©cessite au minimum 11 bits : \[\mathbf{111111111,11_2}\]

**Ã‰tape 4 : Format signÃ© (complÃ©ment Ã  2).**
 Pour une reprÃ©sentation signÃ©e, un bit de signe doit Ãªtre ajoutÃ© en position de poids fort. Le nombre Ã©tant strictement positif, le bit de signe est '0'. Cela requiert au minimum 12 bits : \[\mathbf{0111111111,11_2}\]
:::

**1.2** Simplifiez en utilisant un tableau de Karnaugh la fonction \(F = \overline{A}\overline{B}C + \overline{A}BC + A\overline{B}C + AB\overline{C} + ABC\) [12].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Remplissage du tableau de Karnaugh.**
 Pour la fonction donnÃ©e, on place les '1' dans les cases correspondant aux mintermes :

| \(A \backslash BC\) | 00 | 01 | 11 | 10 |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 (\(\overline{A}\overline{B}C\)) | 1 (\(\overline{A}BC\)) | 0 |
| 1 | 0 | 1 (\(A\overline{B}C\)) | 1 (\(ABC\)) | 1 (\(AB\overline{C}\)) |

**Ã‰tape 2 : Regroupement des mintermes.**
 On cherche Ã  faire les plus grands groupements adjacents possibles (tailles en puissances de 2) :

- Un groupe de 4 cases (colonnes 01 et 11) qui isole la variable \(C\).
- Un groupe de 2 cases (ligne \(A=1\), colonnes 11 et 10) qui isole \(AB\).

**Ã‰tape 3 : Expression simplifiÃ©e.**
 La fonction finale est la somme logique de ces groupements : \[\mathbf{F = C + AB}\]
:::

**1.3** En VHDL, quel type normalisÃ© doit Ãªtre utilisÃ© pour rÃ©aliser des opÃ©rations arithmÃ©tiques sur des vecteurs binaires non signÃ©s [2] ? Quels bibliothÃ¨ques et paquetages dÃ©clarer [2] ? Montrez comment \(-5 - 7\) est obtenu en complÃ©ment Ã  2.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Type normalisÃ© et bibliothÃ¨ques.**
 Pour rÃ©aliser des opÃ©rations arithmÃ©tiques sur des vecteurs non signÃ©s, le type normalisÃ© Ã  utiliser est `unsigned`. Il faut dÃ©clarer la bibliothÃ¨que IEEE et son paquetage mathÃ©matique officiel : \[\mathbf{\texttt{library IEEE; use IEEE.numeric\_std.all;}}\]

**Ã‰tape 2 : PrÃ©paration des opÃ©randes sur 5 bits.**
 Pour que le rÃ©sultat (\(-12\)) puisse Ãªtre codÃ© sans dÃ©bordement, il faut au minimum 5 bits (plage de \(-16\) Ã  \(+15\)).

- \(+5 = 00101_2 \implies \text{Inversion} = 11010_2 \implies \text{Ajout de 1} \implies \mathbf{-5 = 11011_2}\)
- \(+7 = 00111_2 \implies \text{Inversion} = 11000_2 \implies \text{Ajout de 1} \implies \mathbf{-7 = 11001_2}\)

**Ã‰tape 3 : Addition en complÃ©ment Ã  2.**
 On effectue l'addition binaire standard de ces deux nombres nÃ©gatifs et on ignore la retenue sortante du bit de poids fort : \[11011_2 + 11001_2 = (1) 10100_2\]

**Ã‰tape 4 : RÃ©sultat final.**
 Le rÃ©sultat est : \[\mathbf{10100_2}\] *(VÃ©rification : l'inverse est \(01011_2\), plus 1 donne \(01100_2 = 12_{10}\). Le rÃ©sultat est donc bien \(-12\)).*
:::

**1.4** En VHDL est-ce que l'ordre des processus a une importance ? Si non, dans quel ordre sont-ils exÃ©cutÃ©s ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Importance de l'ordre structurel.**
 **Non**, l'ordre physique d'Ã©criture des processus dans l'architecture n'a absolument aucune importance. Le VHDL modÃ©lise des composants matÃ©riels.

**Ã‰tape 2 : MÃ©canisme d'exÃ©cution rÃ©el.**
 Les processus s'exÃ©cutent de maniÃ¨re **concurrente** (parallÃ¨le). Leur exÃ©cution est purement **Ã©vÃ©nementielle** : un processus est Ã©valuÃ© uniquement lorsqu'un changement d'Ã©tat (Ã©vÃ©nement) se produit sur l'un des signaux inscrits dans sa **liste de sensibilitÃ©**.
:::
:::

:::exercise label="Probleme 2" title="ProblÃ¨me II - Conception d'un registre Ã  dÃ©calage SIPO"
**2.1** Dessinez le schÃ©ma d'un registre SIPO de \(n\) bits en utilisant \(n\) bascules D. EntrÃ©es : `din`, `clk`, `enable`, `reset`. Sortie : `dout` (n bits).

:::figure src="assets/SN361-VHDL/exam/exam3-sipo-2.1.svg" alt="Schema du registre a decalage SIPO de l'examen 3." caption="Schema du registre a decalage SIPO de l'examen 3."
:::

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Structure gÃ©nÃ©rale.**
 Un registre Ã  dÃ©calage SIPO (Serial In, Parallel Out) de \(n\) bits est constituÃ© de \(n\) bascules D identiques, connectÃ©es en cascade pour faire transiter l'information bit par bit.

**Ã‰tape 2 : Connexions.**

- L'entrÃ©e de donnÃ©es sÃ©rie `din` attaque l'entrÃ©e D de la premiÃ¨re bascule.
- La sortie Q d'une bascule de rang \(i\) attaque l'entrÃ©e D de la bascule suivante de rang \(i+1\).
- Les signaux de contrÃ´le (`clk`, `reset`, `enable`) sont connectÃ©s Ã  toutes les bascules en parallÃ¨le.
- Le vecteur de sortie `dout` regroupe en parallÃ¨le les \(n\) sorties Q des diffÃ©rentes bascules.

*[InsÃ©rer SchÃ©ma Registre SIPO]*
:::

**2.2** Ecrire en VHDL RTL l'entitÃ© gÃ©nÃ©rique (`shift`) et l'architecture (`rtl`).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition de l'entitÃ© avec generic.**
 On dÃ©clare les signaux de port, ainsi que le paramÃ¨tre `n`.

**Ã‰tape 2 : Processus de dÃ©calage.**
 On crÃ©e un processus synchrone pour dÃ©crire le comportement RTL, en gÃ©rant le `reset` et le signal `enable`.

```vhdl
library IEEE;
use IEEE.std_logic_1164.all;

entity shift is
    generic (n : integer := 8);
    port (
        din    : in  std_logic;
        clk    : in  std_logic;
        reset  : in  std_logic;
        enable : in  std_logic;
        dout   : out std_logic_vector(n-1 downto 0)
    );
end entity shift;

architecture rtl of shift is
    signal shift_reg : std_logic_vector(n-1 downto 0);
begin
    process(clk)
    begin
        if rising_edge(clk) then
            if reset = '1' then
                shift_reg  '0');
            elsif enable = '1' then
                -- Decalage : le LSB glisse, din entre en position 0
                shift_reg  clk,
            reset  => reset,
            enable => enable,
            q      => q_int(i+1)
        );
    end generate gen_shift;

    dout  8)
        port map (din => din, clk => clk, reset => reset, enable => enable, dout => dout);

    clk_proc: process begin
        clk <= '0'; wait for period/2;
        clk <= '1'; wait for period/2;
    end process;

    stim_proc: process begin
        reset <= '1'; wait for 20 ns;
        reset <= '0'; enable <= '1'; din <= '1'; wait for period;
        din <= '0'; wait for 2 * period;
        enable <= '0'; wait for 2 * period; -- Retenue d'etat
        enable <= '1'; din <= '1'; wait for 2 * period;
        reset <= '1'; wait for period;
        wait;
    end process;
end architecture sim;
```
:::

**2.5** Dessinez les chronogrammes correspondant au testbench.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Analyse des signaux d'entrÃ©e.**
 D'aprÃ¨s le testbench, l'information `din` est insÃ©rÃ©e bit par bit au rythme de l'horloge, Ã  condition que `enable` soit Ã  '1'.

**Ã‰tape 2 : TracÃ© des sorties.**
 La sortie dÃ©cale les bits entrÃ©s vers la gauche. Lors de la dÃ©sactivation du signal d'enable, la valeur dans le registre fige temporairement sa progression.

:::block type="neutral" title="Chronogramme TikZ-Timing source"
```latex
\texttt{clk}    & 14{C} \\
  \texttt{reset}  & 2{1} 10{0} 2{1} \\
  \texttt{enable} & 2{0} 6{1} 2{0} 4{1} \\
  \texttt{din}    & 2{0} 2{1} 6{0} 4{1} \\
  \texttt{dout}   & 2D{00} 2D{00} 2D{01} 2D{02} 2D{04} 2D{04} 2D{09} 2D{00} \\
\extracode
  \tablegrid
```
:::
:::

\vfill

Ã‰quipe PÃ©dagogique Esisar Page 1/1
:::
