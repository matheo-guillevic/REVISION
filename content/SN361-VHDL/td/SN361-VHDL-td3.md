---
title: "TD 3 corrige - Compteurs et test benches"
subject: "SN361-VHDL"
type: "td"
target: "SN361-VHDL-td3.html"
eyebrow: "SN361 - TD 3"
heading: "Compteurs, resets, enable et test benches"
summary: "Compteur 8 bits, reset asynchrone, activation synchrone, simulation VHDL/Verilog et evolution up/down."
pdf: "TD3_Correction_SN361.pdf"
---
:::exercise label="Exercice 1" title="Exercice 1 : Conception d'un compteur Ã©lectronique"
En Ã©lectronique, un compteur est un composant essentiel. ConsidÃ©rons ici un compteur 8 bits comportant:

- Une entrÃ©e d'activation synchrone appelÃ©e `Enable`.
- Un signal de reset asynchrone nommÃ© `rst`.
- Une incrÃ©mentation qui s'effectue sur les fronts montants de l'horloge `clk`.

#### Questions :

#### 1) Combien de bascules sont nÃ©cessaires pour implÃ©menter ce compteur ?

8 bascules, chaque bit Ã©tant reprÃ©sentÃ© par une bascule.

#### 2) Dessinez un chronogramme illustrant le fonctionnement du compteur.

Il s'agit d'un exemple de simulation avec Vivado pour un compteur utilisant une horloge d'une pÃ©riode de 10 ns. *(Le chronogramme affiche l'Ã©volution de `count` de 00 Ã  13 en hexadÃ©cimal Ã  chaque front d'horloge lorsque `Enable` est actif ).*

#### 3) Ã‰crivez le code de ce compteur en VHDL et en Verilog.

**VHDL :**

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;
use IEEE.NUMERIC_STD.ALL;

entity compteur is
Port (
    clk    : in STD_LOGIC;  -- horloge
    rst    : in STD_LOGIC;  -- reset
    Enable : in STD_LOGIC;  -- activation
    count  : out STD_LOGIC_VECTOR (7 downto 0) -- sortie sur 8 bits
);
end compteur;

architecture Behavioral of compteur is
    signal count_internal: unsigned(7 downto 0) := (others => '0');
begin
    process (clk, rst)
    begin
        if rst = '1' then
            count_internal  '0');
        elsif rising_edge(clk) then
            if Enable = '1' then
                count_internal  clk,
        rst    => rst,
        Enable => Enable,
        count  => count
    );

    clk_process: process
    begin
        clk  '0');
begin
    process (clk, rst)
    begin
        if rst = '1' then
            count_internal  '0'); -- Reinitialisation du compteur
        elsif rising_edge(clk) then
            if Enable = '1' then
                if up = '1' and down = '0' then
                    count_internal  '0'); -- si up et down actifs en meme temps
                end if;
            end if;
        end if;
    end process;
    count <= std_logic_vector(count_internal);
end Behavioral;
```
:::

:::exercise label="Exercice 2" title="Exercice 2 : Conception d'un registre Ã  dÃ©calage SIPO de N bits"
#### 1) On dispose de la description VHDL d'une bascule D (flip-flop) dont l'entitÃ© est donnÃ©e ci-dessous. Ecrivez le testbench de ce composant.

:::figure src="assets/SN361-VHDL/TD/SN361-TD3_2.1.svg" alt="Registre a decalage SIPO generique." caption="Registre a decalage SIPO generique."
:::

```vhdl
entity bascule is
port(d, clk, reset, enable: in std_logic;
     q: out std_logic);
end entity bascule;
```

Voici un TestBench conÃ§u pour tester le systÃ¨me. L'objectif est de vÃ©rifier un maximum d'entrÃ©es, voire toutes si possible, afin d'observer la rÃ©action de la sortie et de s'assurer qu'elle correspond aux attentes.

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity tb_bascule is
end tb_bascule;

architecture bhv of tb_bascule is
    signal tb_clk    : std_logic := '0';
    signal tb_d      : std_logic := '0';
    signal tb_enable : std_logic := '0';
    signal tb_reset  : std_logic := '0';
    signal tb_q      : std_logic;

    component bascule
    port (
        d, clk, reset, enable: in std_logic;
        q: out std_logic
    );
    end component;

begin
    i1: bascule port map (
        d      => tb_d,
        clk    => tb_clk,
        reset  => tb_reset,
        enable => tb_enable,
        q      => tb_q
    );

    -- Il est possible de tester le signal d'horloge (clk) sans utiliser de processus.
    tb_clk  din, enable => enable, clk => clk, reset => reset, q => dout_temp(0)
    );

    i2: bascule port map (
        d => dout_temp(0), enable => enable, clk => clk, reset => reset, q => dout_temp(1)
    );

    dout  dout_temp(I),
            enable => enable,
            clk    => clk,
            reset  => reset,
            q      => dout_temp(I+1)
        );
    end generate;

    dout_temp(0)  5 )
    port map (
        din    => tb_din,
        enable => tb_enable,
        clk    => tb_clk,
        reset  => tb_reset,
        dout   => tb_dout
    );

    tb_clk <= not(tb_clk) after 5 ns;

    tb_din <= '0', '1' after 5 ns, '0' after 25 ns, '1' after 45 ns;
    tb_enable <= '0', '1' after 15 ns, '0' after 25 ns, '1' after 35 ns;
    tb_reset <= '0', '1' after 55 ns, '0' after 65 ns;
end bhv;
```
:::
