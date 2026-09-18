---
title: "Examen SN361-VHDL 4"
subject: "SN361-VHDL"
type: "exam"
target: "SN361-VHDL-exam-4.html"
eyebrow: "SN361 - Examen 4"
heading: "Questions de cours, FSM, PWM et composants"
summary: "Questions de cours VHDL, machines a etats, PWM, composants et chronogrammes."
---
:::exercise label="Partie 1" title="Probleme I - Partie cours"
**1.1** Quel type normalise doit etre utilise pour realiser des operations arithmetiques sur des vecteurs binaires signes en complement a 2 ? Appliquer la methode a \(-6 \times 7\).

:::block type="method" title="Correction et raisonnement"
Le type a utiliser est `signed`, fourni par `ieee.numeric_std`.

Pour \(-6 \times 7\), on peut coder les operandes sur 4 bits :

- \(7=0111_2\)
- \(6=0110_2\), donc \(-6=1010_2\) en complement a 2

Le produit vaut \(-42\). Sur 8 bits signes, \(42=00101010_2\), donc \(-42\) s'ecrit :

\[
\overline{00101010}+1=11010110_2
\]

Le resultat attendu est donc \(11010110_2\).
:::

**1.2** Dessiner le chronogramme du signal \(S\).

:::block type="method" title="Correction et raisonnement"
On lit le signal \(S\) front par front. Si \(S\) est affecte dans un processus cadence par `clk`, il ne change qu'apres un front actif. Si l'affectation est concurrente ou dans un processus combinatoire, il suit directement les entrees apres le delai de propagation.
:::

**1.3** Traduire un multiplexeur Verilog combinatoire en VHDL.

```vhdl
with ad select
  s <= e0 when "00",
       e1 when "01",
       e2 when "10",
       e3 when others;
```

:::block type="method" title="Correction et raisonnement"
Le `case` Verilog dans un bloc `always @(*)` decrit une logique combinatoire. En VHDL, `with ... select` est la forme directe pour un multiplexeur.
:::

**1.4** Traduire un latch Verilog en VHDL.

```vhdl
process(c, d)
begin
  if c = '1' then
    q <= d;
  end if;
end process;
```

:::block type="method" title="Correction et raisonnement"
L'absence de branche `else` impose la memorisation de l'ancienne valeur quand \(c=0\). Le materiel synthetise est donc un latch.
:::

**1.5** Traduire un registre a decalage SISO/SIPO.

```vhdl
process(clk)
begin
  if rising_edge(clk) then
    q_temp <= q_temp(3 downto 1) & d;
  end if;
end process;

s <= q_temp(1);
q <= q_temp;
```

:::block type="method" title="Correction et raisonnement"
Le registre memorise un vecteur interne. A chaque front montant, les anciens bits sont decales et le nouveau bit `d` est injecte. L'operateur VHDL de concatenation est `&`.
:::
:::

:::exercise label="Exercice 2" title="ProblÃ¨me II - Partie exercices"
#### Partie A: Analyse d'une description VHDL - 50 pts

:::figure src="assets/SN361-VHDL/exam/SN361-VHDL-exam4-fsm-chrono.svg" alt="Chronogramme associe a la machine a etats." caption="Chronogramme associe a la machine a etats."
:::

**2.1** Le reset utilisÃ© dans l'architecture *rtl* ci-dessous est-il synchrone ou asynchrone ? [2]

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Analyse de la prioritÃ©.**
 Dans le code fourni, la condition `if (reset='1')` est placÃ©e au tout dÃ©but du processus, avant l'Ã©valuation de l'horloge.

**Ã‰tape 2 : Conclusion matÃ©rielle.**
 Puisque le changement d'Ã©tat du reset est appliquÃ© immÃ©diatement sans attendre le front de l'horloge (qui est placÃ© dans le `elsif`), le reset est de type **asynchrone**.
:::

**2.2** Modifiez le code VHDL ci-dessous pour le rendre synchrone (s'il est asynchrone) ou asynchrone (s'il est synchrone) [2].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Principe de la synchronisation.**
 Pour forcer un comportement synchrone, le signal de reset ne doit Ãªtre Ã©valuÃ© qu'au moment prÃ©cis d'un front d'horloge.

**Ã‰tape 2 : Modification du code VHDL.**
 On place le test du reset Ã  l'intÃ©rieur de la condition `rising_edge(clk)`.

```vhdl
process(clk)
begin
  if rising_edge(clk) then
    if (reset='1') then
      r '0');
      buf <= '0';
    else
      -- suite du compteur (r <= r + 1, etc.)
    end if;
  end if;
end process;
```
:::

**2.3** DÃ©crire les bibliothÃ¨ques et l'entitÃ© nÃ©cessaires Ã  cette architecture [2+2].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©duction des bibliothÃ¨ques.**
 L'utilisation de `std_logic` requiert `ieee.std_logic_1164.all`. Les opÃ©rations arithmÃ©tiques requiÃ¨rent `ieee.numeric_std.all`.

**Ã‰tape 2 : DÃ©finition de l'entitÃ©.**
 On identifie les entrÃ©es (`clk`, `reset`, `w`) et les sorties (`pulse`).

```vhdl
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity hidden is
  port (
    clk, reset : in std_logic;
    w          : in std_logic_vector(3 downto 0);
    pulse      : out std_logic
  );
end hidden;
```
:::

**2.4** DÃ©crire en VHDL un testbench permettant d'exercer le fonctionnement de cette entitÃ© pour 2 valeurs successives diffÃ©rentes de w [16].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Architecture du banc d'essai.**
 Il faut instancier le composant (DUT), gÃ©nÃ©rer une horloge, et crÃ©er un processus de stimulus sÃ©quentiel.

**Ã‰tape 2 : Processus de test (Stimuli).**

```vhdl
-- (Instanciation et horloge clk <= not clk after 5 ns; omises pour brievete)
process begin
  reset <= '1'; wait for 15 ns; reset <= '0';

  w <= "0011"; -- Premier test (w=3)
  wait for 160 ns; -- Attente de 16 cycles complets (16x10ns)

  w <= "0110"; -- Second test (w=6)
  wait for 160 ns;

  wait;
end process;
```
:::

**2.5** Faire un chronogramme dÃ©crivant l'Ã©volution des signaux d'entrÃ©e et de sortie, ainsi que de la valeur de r, lors de la simulation du testbench prÃ©cÃ©dent [16].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Comportement du compteur.**
 La variable interne `r` est un compteur sur 4 bits qui s'incrÃ©mente Ã  chaque cycle, formant une "dent de scie" de 0 Ã  15 de maniÃ¨re continue.

**Ã‰tape 2 : Comportement de la sortie pulse.**
 La sortie `pulse` vaut '1' tant que `r < w`.

- Si `w=3`, le signal `pulse` est Ã  l'Ã©tat haut pendant 3 cycles, puis Ã  l'Ã©tat bas pendant 13 cycles.
- Si `w=6`, il est Ã  l'Ã©tat haut pendant 6 cycles, puis bas pendant 10 cycles.
:::

**2.6** Combien de bascules seront crÃ©Ã©es par cette architecture *rtl* lors de sa synthÃ¨se. Justifiez [4].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : RÃ¨gles d'infÃ©rence de bascules.**
 Une bascule D est synthÃ©tisÃ©e pour chaque bit d'un signal assignÃ© de maniÃ¨re conditionnelle Ã  l'intÃ©rieur d'un bloc `rising_edge(clk)`.

**Ã‰tape 2 : Comptage des ressources.**
 Le signal `r` est un vecteur de 4 bits mis Ã  jour sous horloge \(\rightarrow\) 4 bascules. Le signal `buf` est sur 1 bit, Ã©galement mis Ã  jour sous horloge \(\rightarrow\) 1 bascule. La sortie `pulse` est combinatoire pure (reliÃ©e Ã  buf). \[\mathbf{Total = 5 \text{ bascules}}\]
:::

**2.7** En analysant le code VHDL de l'architecture *rtl* et le rÃ©sultat de la simulation de votre testbench, expliquez quelle est la fonction de cette architecture [2]. Expliquez comment varie la forme du signal *pulse* en fonction de la valeur de w [4].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification du composant.**
 Le code dÃ©crit un gÃ©nÃ©rateur de signal **MLI** (Modulation de Largeur d'Impulsion) ou **PWM**.

**Ã‰tape 2 : Effet de l'entrÃ©e W.**
 Le signal d'entrÃ©e `w` contrÃ´le le **rapport cyclique** de la sortie. Plus la valeur numÃ©rique de `w` est grande, plus le temps passÃ© Ã  l'Ã©tat haut par le signal `pulse` augmente proportionnellement sur une pÃ©riode fixe de 16 cycles d'horloge.
:::

#### Partie B: Ecriture d'une machine Ã  Ã©tats - 34 pts

:::figure src="assets/SN361-VHDL/exam/SN361-VHDL-exam4-fsm.svg" alt="Diagramme de machine a etats de l'examen VHDL 4." caption="Diagramme de machine a etats de l'examen VHDL 4."
:::

**3.1** Dessinez le diagramme de transitions d'une FSM de Moore qui a deux entrÃ©es X et rst et une sortie Y. Chaque fois que X change de 0 Ã  1, Y passe Ã  1 pour deux cycles d'horloge et ensuite revient Ã  0 -- mÃªme si X est toujours 1 [12].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition des Ã©tats nÃ©cessaires.**
 Pour garantir que la sortie ne s'active que pendant 2 cycles et ignore un X maintenu Ã  1, 4 Ã©tats sont requis : Repos (S0), Temporisation 1 (S1), Temporisation 2 (S2), et Attente/Verrouillage (S3).

**Ã‰tape 2 : DÃ©finition du Graphe.**

- **S0** (\(Y=0\)) : Si X=1 \(\rightarrow\) Aller vers S1. Sinon \(\rightarrow\) Rester en S0.
- **S1** (\(Y=1\)) : Transition inconditionnelle vers S2 au prochain cycle.
- **S2** (\(Y=1\)) : Si X=1 \(\rightarrow\) Aller vers S3 (pour se verrouiller). Si X=0 \(\rightarrow\) Retour S0.
- **S3** (\(Y=0\)) : Attendre. Si X=0 \(\rightarrow\) Retour S0. Sinon, rester en S3.
:::

**3.2** Faire un chronogramme reprÃ©sentant l'horloge clk, l'entrÃ©e X, l'entrÃ©e rst et la sortie Y [6].

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Comportement de la machine de Moore.**
 Par nature (Moore), la sortie est synchronisÃ©e sur les Ã©tats. Il y aura donc un dÃ©calage d'un front d'horloge entre le passage de X Ã  1 et le passage de Y Ã  1.

**Ã‰tape 2 : Visualisation temporelle.**
 Au front d'horloge nÂ°1, la machine dÃ©tecte X=1 et passe en S1. Au front nÂ°2, Y vaut 1. Au front nÂ°3, la machine passe en S2 (Y reste Ã  1). Au front nÂ°4, la machine passe en S3 (Verrou), et Y retombe Ã  0, mÃªme si X est toujours haut.
:::

**3.3** Ecrire le code VHDL de cette FSM (entitÃ© et architecture complÃ¨te) [12]

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Architecture VHDL Ã  deux processus.**
 On code la FSM en sÃ©parant clairement le registre d'Ã©tat (synchrone) de la logique de calcul du prochain Ã©tat (combinatoire).

**Ã‰tape 2 : Code complet.**

```vhdl
architecture rtl of edge_fsm is
  type state_t is (S0, S1, S2, S3);
  signal state, next_state : state_t;
begin
  process(clk) begin -- Processus Synchrone
    if rising_edge(clk) then
      if rst = '1' then state  if X = '1' then next_state  Y  Y  if X = '0' then next_state <= S0; end if;
    end case;
  end process;
end architecture;
```
:::

**3.4** Combien au minimum de bascules seront nÃ©cessaires pour implÃ©menter votre description prÃ©cÃ©dente et la FSM correspondante [4] ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©nombrement des Ã©tats.**
 Le systÃ¨me modÃ©lisÃ© contient 4 Ã©tats distincts (S0, S1, S2, S3).

**Ã‰tape 2 : Calcul des bascules matÃ©rielles.**
 Pour coder \(N\) Ã©tats en binaire pur, le nombre minimum de bascules \(n\) nÃ©cessaires rÃ©pond Ã  la formule : \(n = \lceil \log_2(N) \rceil\). \[\mathbf{\lceil \log_2(4) \rceil = 2 \text{ bascules}}\]
:::

\vfill

VB Esisar Page 1/1
:::
