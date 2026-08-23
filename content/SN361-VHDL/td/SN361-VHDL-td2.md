---
title: "TD 2 corrige - Synthese logique et circuits sequentiels"
subject: "SN361-VHDL"
type: "td"
target: "SN361-VHDL-td2.html"
eyebrow: "SN361 - TD 2"
heading: "Synthese de schemas, bascules et detection d'evenements"
summary: "Lecture de code VHDL, schemas de bascules, sorties synchrones/asynchrones et chronogrammes."
pdf: "TD2_Correction_SN361.pdf"
---
:::exercise label="Exercice 1.1" title="Exercice 1.1"
On considÃ¨re le programme ci-dessous :

:::figure src="assets/SN361-VHDL/TD/SN361-TD2_1.1.svg" alt="Schema de synthese de l'exercice 1.1." caption="Schema de synthese de l'exercice 1.1."
:::

1. DÃ©duire de ce programme, par une construction mÃ©thodique, un schÃ©ma (bascules et portes logiques).
2. ComplÃ©ter le chronogramme Fig 1.1.

```vhdl
entity transitm is
port (hor, e : in bit;
      s      : out bit);
end transitm;
architecture quasi_struct of transitm is
signal qa, qb : bit;
begin
    s <= qa xor qb;
    schem: process (hor)
    begin
        if hor'event and hor = '1' then
            qa <= e;
            qb <= qa;
        end if;
    end process schem;
end quasi_struct;
```

#### Correction

**1. SchÃ©ma :**
 Le schÃ©ma correspondant se trouve dans le fichier SVG 1.1 (Ã  inclure ici). Il est constituÃ© de deux bascules D en cascade pour `qa` et `qb`, pilotÃ©es par la mÃªme horloge `hor`, dont les sorties attaquent une porte XOR pour gÃ©nÃ©rer `s`.
:::

:::exercise label="Exercice 1.2" title="Exercice 1.2"
On considÃ¨re le programme ci-dessous :

:::figure src="assets/SN361-VHDL/TD/SN361-TD2_1.2.svg" alt="Schema de synthese de l'exercice 1.2." caption="Schema de synthese de l'exercice 1.2."
:::

1. ComplÃ©ter le code manquant.
2. DÃ©duire un schÃ©ma (bascules et portes logiques) de ce programme.
3. CaractÃ©riser les sorties : synchrones ou asynchrones ?
4. ComplÃ©ter le chronogramme Fig 1.2.

```vhdl
entity condit is
port (
    clk    : in bit;
    eclk   : in bit;
    e      : in bit;
    s_clk  : out bit;
    s_eclk : out bit);
end condit;
architecture reg_lvl of condit is
    signal qe : bit ;
begin
    s_clk <= e and not (qe);

    echl : process (clk)
    begin
        if clk'event and clk = '1' then
            qe <= e;
        end if;
    end process echl;

    ech : process (eclk)
    begin
        if eclk'event and eclk = '1' then
            s_eclk <= (qe and not(e));
        end if;
    end process ech;
end reg_lvl;
```

#### Correction

**2. SchÃ©ma :**
 Voir le fichier SVG 1.2 pour le schÃ©ma de synthÃ¨se.

**3. CaractÃ©risation des sorties :**
 La sortie `s_clk` est **asynchrone** car elle est affectÃ©e en dehors de tout processus synchrone.
 La sortie `s_eclk` est **synchrone** (synchronisÃ©e sur `eclk`) car son affectation se trouve dans un processus sensible au front montant de l'horloge `eclk`.
:::

:::exercise label="Exercice 1.3" title="Exercice 1.3"
On considÃ¨re le programme ci-dessous :

:::figure src="assets/SN361-VHDL/TD/SN361-TD2_1.3.svg" alt="Schema de synthese de l'exercice 1.3." caption="Schema de synthese de l'exercice 1.3."
:::

1. Ce code est-il correct ?
2. DÃ©duire un schÃ©ma (bascules et portes logiques) de ce programme.
3. ComplÃ©ter le chronogramme Fig 1.3.

```vhdl
entity mise_feu is
port (
    clk : in bit;
    ina : in bit;
    maf : out bit);
end mise_feu;
architecture detect of mise_feu is
    signal maf_sync : bit;
begin
    maf <= maf_sync;
    sync : process (clk)
    begin
        if clk'event and clk = '1' then
            maf_sync <= ina and not maf_sync;
        end if;
    end process sync;
end detect;
```

#### Correction

**2. SchÃ©ma :**
 Voir le fichier SVG 1.3 (boucle de rÃ©troaction sur la bascule avec porte AND).
:::

:::exercise label="Exercice 2.1" title="Exercice 2.1"
On considÃ¨re la fonction logique de la figure 2.1 (Bloc fonctionnel) :

:::figure src="assets/SN361-VHDL/TD/SN361-TD2_2.1.svg" alt="Bloc fonctionnel de l'exercice 2.1." caption="Bloc fonctionnel de l'exercice 2.1."
:::

1. ComplÃ©ter le programme pour rÃ©aliser cette fonction.
2. RÃ©aliser un chronogramme de test de cette fonction (complÃ©ter le chronogramme fig 2.2).

#### Correction

**1. Code VHDL :**

```vhdl
entity detect is
port (
    clk : in bit;
    e   : in bit;
    s   : out bit);
end detect;
architecture reg of detect is
    signal qe : bit;
begin
    sync : process (clk)
    begin
        if clk'event and clk = '1' then
            qe <= e;
            s  <= qe xor e;
        end if;
    end process sync;
end reg;
```

*(Le schÃ©ma est illustrÃ© dans le SVG 2.1)*
:::

:::exercise label="Exercice 2.2" title="Exercice 2.2"
On considÃ¨re l'Ã©quation logique ci-dessous : \[Q_{(t+1)} = \overline{(init \cdot (T \oplus Q_{(t)}))}\]

:::figure src="assets/SN361-VHDL/TD/SN361-TD2_2.2.svg" alt="Schema de synthese de l'exercice 2.2." caption="Schema de synthese de l'exercice 2.2."
:::

1. Concevoir le schÃ©ma de rÃ©alisation de cette Ã©quation.
2. ComplÃ©ter le code VHDL pour rÃ©aliser cette fonction.
3. Le cahier des charges Ã©volue : il faut transformer le signal `init` en une commande > (si \(init='0'\)), de remise Ã  zÃ©ro asynchrone.
4. Transformer le programme pour qu'il utilise le type `std_logic`. Rajouter une commande de haute impÃ©dance > active basse, qui pilote la sortie uniquement lorsque > est actif.

#### Correction

**1. SchÃ©ma :**
 Voir le fichier SVG 2.2. Il est composÃ© d'une porte XOR, d'une porte NAND et d'une bascule D.

**2. Code VHDL classique :**

```vhdl
entity basc is
port (T, clk, init : in bit;
      s            : out bit);
end basc;
architecture primitive of basc is
    signal q : bit;
begin
    s <= q;
    process (clk)
    begin
        if clk'event and clk = '1' then
            q <= not (init and (T xor q));
        end if;
    end process;
end primitive;
```

**3. Programme avec la commande init en remise Ã  zÃ©ro asynchrone :**

```vhdl
entity basc is
port (T, clk, init : in bit;
      s            : out bit);
end basc;
architecture primitive of basc is
    signal q : bit;
begin
    s <= q;
    process (clk, init)
    begin
        if init = '0' then
            q <= '0';
        elsif clk'event and clk = '1' then
            q <= not (T xor q);
        end if;
    end process;
end primitive;
```

**4. Programme avec le type `std_logic` et `oe` :**

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity basc is
port (
    T, clk, init, oe : in std_logic;
    s                : out std_logic);
end basc;
architecture primitive of basc is
    signal q : std_logic;
begin
    s <= q when oe = '0' else 'Z';
    process (clk, init)
    begin
        if init = '0' then
            q <= '0';
        elsif clk'event and clk = '1' then
            q <= not (T xor q);
        end if;
    end process;
end primitive;
```
:::
