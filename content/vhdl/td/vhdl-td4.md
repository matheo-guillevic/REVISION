---
title: "TD 4 corrige - Machines a etats finis"
subject: "vhdl"
type: "td"
target: "vhdl-td4.html"
eyebrow: "SN361 - TD 4"
heading: "Bascule Toggle, Moore, Mealy et synchronisation"
summary: "FSM Moore/Mealy, reset asynchrone, nombre de bascules et synchronisation d'une entree asynchrone."
pdf: "TD4_correction_vb.pdf"
---
:::exercise label="Exercice 1" title="Exercice 1 :"
Vous allez dÃ©crire en VHDL une bascule Toggle dont la sortie \(q\) change de valeur Ã  chaque nouveau front d'horloge `clk` quand `t` est actif. Le signal de remise Ã  zÃ©ro `reset` est asynchrone.

| **clk** | **t** | **reset** | \(\mathbf{q'}\) |
| --- | --- | --- | --- |
| Front montant | 1 | 0 | \(\overline{q}\) |
| Front montant | 0 | 0 | \(q\) |
| X | X | 1 | 0 |

#### 1) Donner le diagramme de transitions d'une machine Ã  Ã©tats de Moore de ce circuit.

:::figure src="assets/vhdl/TD/SN361-TD4_2_Mealy.svg" alt="Machine de Mealy pour la bascule Toggle." caption="Machine de Mealy pour la bascule Toggle."
:::

:::figure src="assets/vhdl/TD/SN361-TD4_1_Moore.svg" alt="Machine de Moore pour la bascule Toggle." caption="Machine de Moore pour la bascule Toggle."
:::

*(Le schÃ©ma SVG de la machine de Moore correspond aux Ã©tats S0/S1 avec les transitions \(t=0\) et \(t=1\) et l'initialisation \(reset=1 \rightarrow q=0\)).*

#### 2) Donner le code VHDL de cette machine (dÃ©crire uniquement son architecture) avec 2 processus comme vu dans le cours.

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity Toggle_FlipFlop_Moore is
port (
    clk: in std_logic;
    reset: in std_logic;
    t: in std_logic;
    q: out std_logic
);
end Toggle_FlipFlop_Moore;

architecture Behavioral of Toggle_FlipFlop_Moore is
    type state_type is (S0, S1);
    signal current_state, next_state: state_type := S0;
begin

    process(clk, reset)
    begin
        if reset = '1' then
            current_state
                q
                q
                next_state
                if t = '1' then
                    next_state
                if t = '1' then
                    next_state
                next_state <= S0;
                q <= '0';
        end case;
    end process;
end Behavioral;
```

*(Note : Le comportement de Mealy dÃ©crit ici assigne les sorties en fonction de l'Ã©tat actuel et de l'entrÃ©e, bien que les valeurs de sortie soient similaires Ã  celles de l'Ã©tat actuel).*

#### 4) Combien de bascules nÃ©cessite l'implantation de chaque machine ?

Une bascule pour les deux.

#### On suppose maintenant que le signal t est asynchrone.

1. Afin d'Ã©viter l'apparition de mÃ©tastabilitÃ©, dÃ©crire en VHDL un unique processus permettant de synchroniser le signal asynchrone `t`.

```vhdl
-- Processus de synchronisation (Double bascule)
process(clk, reset)
begin
    if reset = '1' then
        t_sync1 <= '0';
        t_sync_out <= '0';
    elsif rising_edge(clk) then
        t_sync1 <= t;          -- Premiere bascule de synchronisation
        t_sync_out <= t_sync1; -- Deuxieme bascule de synchronisation
    end if;
end process;
```
:::

:::exercise label="Exercice 2" title="Exercice 2 : DÃ©tecteur de sÃ©quence"
Dans cet exercice vous allez concevoir une machine Ã  Ã©tats qui dÃ©tecte la sÃ©quence \(abc= \text{>}\) avec la contrainte que cette sÃ©quence doit Ãªtre ordonnÃ©e temporellement : d'abord \(a='1'\) pendant un premier cycle d'horloge, puis \(b='1'\), puis enfin \(c='1'\). La sortie \(x\) devient '1' quand la sÃ©quence est correctement ordonnÃ©e. On considÃ¨rera les recouvrements (ex: \(x\) reste Ã  '1' tant que la sÃ©quence \(111\) est maintenue).

#### 1) Dessiner le diagramme de transitions de cette machine Ã  Ã©tats.

:::figure src="assets/vhdl/TD/SN361-TD4_2.svg" alt="Machine a etats du detecteur de sequence." caption="Machine a etats du detecteur de sequence."
:::

La machine d'Ã©tats (de type Moore) est conÃ§ue de maniÃ¨re Ã  ce que les signaux \(a, b, c\) apparaissent successivement. L'entrÃ©e est Ã©valuÃ©e comme un vecteur \(abc\).

- **S0** (attente de \(a\), \(x=0\)) : Si \(abc = "100" \rightarrow \text{aller Ã  S1}\). Sinon rester dans S0.
- **S1** (attente de \(b\), \(x=0\)) : Si \(abc = "110" \rightarrow \text{aller Ã  S2}\). Si \(abc = "100" \rightarrow \text{rester dans S1}\). Sinon \(\rightarrow \text{retour Ã  S0}\).
- **S2** (attente de \(c\), \(x=0\)) : Si \(abc = "111" \rightarrow \text{aller Ã  S3}\). Si \(abc = "110" \rightarrow \text{rester dans S2}\). Si \(abc = "100" \rightarrow \text{aller Ã  S1}\). Sinon \(\rightarrow \text{retour Ã  S0}\).
- **S3** (succÃ¨s, \(x=1\)) : Si \(abc = "111" \rightarrow \text{rester dans S3}\). Si \(abc = "110" \rightarrow \text{aller Ã  S2}\). Si \(abc = "100" \rightarrow \text{aller Ã  S1}\). Sinon \(\rightarrow \text{retour Ã  S0}\).

*(Le schÃ©ma SVG correspondant est Ã  inclure ici).*

#### 2) Combien de bascules seront nÃ©cessaires au minimum pour implanter cette machine? Justifiez.

Le diagramme de transitions comporte **4 Ã©tats distincts** (S0, S1, S2, S3). Le nombre minimum de bascules \(n\) nÃ©cessaires pour coder \(E\) Ã©tats est donnÃ© par la relation \(2^n \ge E\). Ainsi, \(2^n \ge 4\), ce qui donne **\(n = 2\) bascules au minimum**.

#### 3) Donner le code VHDL de cette machine.

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity sequence_detector is
    Port ( a   : in STD_LOGIC;
           b   : in STD_LOGIC;
           c   : in STD_LOGIC;
           clk : in STD_LOGIC;
           rst : in STD_LOGIC;
           x   : out STD_LOGIC);
end sequence_detector;

architecture Behavioral of sequence_detector is
    type state_type is (S0, S1, S2, S3);
    signal current_state, next_state : state_type;
    signal abc : std_logic_vector(2 downto 0);
begin
    -- ConcatÃ©nation des entrees pour faciliter la lecture
    abc
                if abc = "100" then
                    next_state
                if abc = "110" then
                    next_state
                if abc = "111" then
                    next_state
                x
                next_state <= S0;
        end case;
    end process;
end Behavioral;
```

#### 4) Combien de bascules gÃ©nÃ©rera la synthÃ¨se de votre code ? Justifiez.

En utilisant un type Ã©numÃ©rÃ© VHDL (`type state_type is (S0, S1, S2, S3);`), l'outil de synthÃ¨se (comme Vivado ou Quartus) choisit par dÃ©faut un encodage **"One-Hot"**.

- Si l'encodage **One-Hot** est appliquÃ©, la synthÃ¨se gÃ©nÃ©rera **4 bascules** (une bascule dÃ©diÃ©e pour chaque Ã©tat).
- Si l'outil de synthÃ¨se est configurÃ© pour optimiser la surface (encodage **Binaire**), il gÃ©nÃ©rera **2 bascules**, car 2 bits suffisent pour reprÃ©senter 4 Ã©tats.
:::
