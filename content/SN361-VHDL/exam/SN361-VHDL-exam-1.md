---
title: "Examen SN361-VHDL 1"
subject: "SN361-VHDL"
type: "exam"
target: "SN361-VHDL-exam-1.html"
eyebrow: "SN361 - Examen 1"
heading: "Registre generique et compteur modulo N"
summary: "Register Transfer Level, description structurelle, generate, compteur modulo N et testbench."
---
:::exercise label="Probleme 1" title="ProblÃ¨me I - Conception d'un registre"
**Question 1.1** : Dessinez en utilisant uniquement des bascules DFF (possÃ©dant des entrÃ©es reset et enable) le circuit d'un registre \(n\) bits Ã  chargement parallÃ¨le et sortie parallÃ¨le capturant de l'entrÃ©e `Din` sur la sortie `Dout` sur les fronts montants de l'horloge `clk` avec :

- une entrÃ©e `enable` active Ã  l'Ã©tat haut autorisant le chargement de l'entrÃ©e `Din`.
- une entrÃ©e de donnÃ©es `Din` sur \(n\) bits.
- une sortie `Dout` sur \(n\) bits.
- une remise Ã  zÃ©ro `Reset` synchrone active Ã  l'Ã©tat haut.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Structure globale du registre.**
 Un registre sur \(n\) bits n'est rien d'autre qu'une mise en parallÃ¨le de \(n\) bascules de type D indÃ©pendantes, permettant de mÃ©moriser simultanÃ©ment un mot complet de \(n\) bits.

**Ã‰tape 2 : CÃ¢blage des signaux de contrÃ´le.**
 Tous les signaux de commande ou de rythme (`clk`, `reset`, `enable`) sont connectÃ©s de maniÃ¨re commune et distribuÃ©s Ã  toutes les bascules du circuit en parallÃ¨le.

**Ã‰tape 3 : CÃ¢blage des bus de donnÃ©es.**
 Le bit de poids \(i\) du bus d'entrÃ©e (`Din[i]`) attaque directement l'entrÃ©e `D` de la bascule de rang \(i\). Sa sortie `Q` correspond directement au bit \(i\) du bus de sortie (`Dout[i]`). Ainsi, sur un front montant, si `enable=1` et `reset=0`, chaque bascule recopie l'Ã©tat de son bit d'entrÃ©e respectif.
:::

**Question 1.2** : Ecrire en VHDL RTL l'entitÃ© gÃ©nÃ©rique (`registerN`) et l'architecture (`rtl`) du composant prÃ©cÃ©dent [10].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition de l'entitÃ©.**
 On dÃ©clare l'entitÃ© avec un paramÃ¨tre gÃ©nÃ©rique pour la taille \(n\) et les ports d'entrÃ©e/sortie sur forme de vecteurs.

**Ã‰tape 2 : ImplÃ©mentation du comportement RTL.**
 On utilise un processus sÃ©quentiel sensible Ã  l'horloge. Le `reset` Ã©tant synchrone, il est testÃ© Ã  l'intÃ©rieur de la condition `rising_edge(clk)`, avec une prioritÃ© supÃ©rieure Ã  `enable`.

```vhdl
library IEEE;
use IEEE.std_logic_1164.all;

entity registerN is
    generic (
        n : integer := 8
    );
    port (
        clk    : in  std_logic;
        reset  : in  std_logic;
        enable : in  std_logic;
        Din    : in  std_logic_vector(n-1 downto 0);
        Dout   : out std_logic_vector(n-1 downto 0)
    );
end entity registerN;

architecture rtl of registerN is
begin
    process(clk)
    begin
        if rising_edge(clk) then
            if reset = '1' then
                Dout  '0'); -- Remise a zero synchrone
            elsif enable = '1' then
                Dout  Din(i),
                clk    => clk,
                reset  => reset,
                enable => enable,
                q      => Dout(i)
            );
    end generate gen_bascules;
end architecture struct;
```
:::
:::

:::exercise label="Probleme 2" title="ProblÃ¨me II - Conception d'un Â« compteur gÃ©nÃ©rique Â»"
**Question 2.1** : Ecrire en VHDL RTL l'entitÃ© (`compteur_moduloN`) avec un paramÃ¨tre gÃ©nÃ©rique `N` et l'architecture (`rtl`) d'un compteur comptant sur 4 bits et modulo N [15].

- EntrÃ©es : horloge (`clk`) sur front montant, reset (`rst`) asynchrone actif haut, enable (`en`) actif haut.
- Sorties : valeur (`count`, sur 4 bits), signal (`fin`) qui passe Ã  '1' quand la valeur max (N-1) est atteinte.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition du comportement (Modulo).**
 Un compteur modulo \(N\) s'incrÃ©mente de 0 jusqu'Ã  la borne \(N-1\), puis retourne Ã  0 au cycle suivant.

**Ã‰tape 2 : Processus de comptage (Reset asynchrone).**
 Puisque le signal `rst` est dÃ©fini comme asynchrone, il doit Ãªtre inclus dans la liste de sensibilitÃ© du processus et doit Ãªtre Ã©valuÃ© en prioritÃ© de maniÃ¨re isolÃ©e, sans attendre le front d'horloge.

**Ã‰tape 3 : Logique de sortie.**
 La valeur courante `count` est recopiÃ©e depuis un signal interne de type `unsigned`. Le drapeau `fin` est un signal combinatoire qui compare directement la valeur du compteur avec la borne.

```vhdl
library IEEE;
use IEEE.std_logic_1164.all;
use IEEE.numeric_std.all;

entity compteur_moduloN is
    generic ( N : integer := 10 );
    port (
        clk   : in  std_logic;
        rst   : in  std_logic;
        en    : in  std_logic;
        count : out std_logic_vector(3 downto 0);
        fin   : out std_logic
    );
end entity compteur_moduloN;

architecture rtl of compteur_moduloN is
    signal count_int : unsigned(3 downto 0);
begin
    process(clk, rst)
    begin
        if rst = '1' then
            count_int  '0');   -- Reset asynchrone
        elsif rising_edge(clk) then
            if en = '1' then
                if count_int = N - 1 then
                    count_int  '0'); -- Bouclage modulo N
                else
                    count_int  8 )
        port map ( clk => clk, rst => rst, en => en, count => count, fin => fin );

    clk_process : process begin
        clk <= '0'; wait for clk_period/2;
        clk <= '1'; wait for clk_period/2;
    end process;

    stim_proc: process begin
        rst <= '1'; en <= '0'; wait for 20 ns;

        rst <= '0'; en <= '1'; -- Demarrage
        wait for 100 ns;       -- Attente de 10 cycles (modulo 8 sera visible)

        en <= '0';             -- Arret
        wait;
    end process;
end architecture behavior;
```
:::

**Question 2.4** : Dessinez les chronogrammes des signaux de l'entitÃ© correspondant trÃ¨s exactement Ã  la simulation que donnerait votre testbench prÃ©cÃ©dent [15]. Indiquez clairement l'Ã©chelle des temps sur l'axe temporel.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : PÃ©riode de maintien sous reset (0 Ã  20 ns).**
 Le signal `rst` force le maintien du compteur `count` Ã  "0000" et `fin` Ã  '0'. L'horloge bat toutes les \(10\text{ ns}\) mais sans effet sur la sortie.

**Ã‰tape 2 : Phase d'incrÃ©mentation (20 ns Ã  100 ns).**
 DÃ¨s le relÃ¢chement du reset et l'activation de `en`, la valeur s'incrÃ©mente au rythme des fronts montants : \(0 \rightarrow 1 \rightarrow 2 \rightarrow 3 \rightarrow 4 \rightarrow 5 \rightarrow 6 \rightarrow 7\). Lors du passage Ã  la valeur 7 (Ã  \(t = 85\text{ ns}\)), le signal `fin` passe immÃ©diatement Ã  '1' de faÃ§on combinatoire car il vaut \(N-1\).

**Ã‰tape 3 : Bouclage modulo (100 ns).**
 Au front d'horloge suivant (\(t = 95\text{ ns}\)), le compteur ne peut pas passer Ã  8. Il reboucle Ã  "0000" (condition modulo vÃ©rifiÃ©e). Le signal `fin` retombe instantanÃ©ment Ã  '0'. Le testbench fige l'exÃ©cution ensuite.
:::

\vfill

Ã‰quipe PÃ©dagogique Esisar Page 1/1
:::
