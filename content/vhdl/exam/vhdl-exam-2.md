---
title: "Examen VHDL 2"
subject: "vhdl"
type: "exam"
target: "vhdl-exam-2.html"
eyebrow: "SN361 - Examen 2"
heading: "Timer et controleur de porte de garage"
summary: "Timer 32 bits, decompteur, multiplexeur, testbench et machine a etats de Moore."
---
:::exercise label="Probleme 1" title="ProblÃ¨me I - Conception et validation d'un Â« timer Â»"
#### Contexte

:::figure src="assets/vhdl/exam/exam2_vhdl_chronogramme-.svg" alt="Chronogramme du timer pour les valeurs M=3 puis M=2." caption="Chronogramme du timer pour les valeurs M=3 puis M=2."
:::

L'objectif est de concevoir un timer gÃ©nÃ©rant pÃ©riodiquement une impulsion d'une pÃ©riode d'horloge de large. Ce timer est contrÃ´lÃ© par une horloge interne de pÃ©riode \(1\,\mu\text{s}\). Il a une largeur de 32 bits.

#### Lecture du SchÃ©ma : Liste des Ã©lÃ©ments et leur utilitÃ©

Le schÃ©ma illustre l'architecture matÃ©rielle (chemin de donnÃ©es et contrÃ´le) du timer. Voici comment le lire pas-Ã -pas :

- **1 microsec oscillator (Oscillateur)** : Fournit le signal d'horloge de base (pÃ©riode de \(1\,\mu\text{s}\)) qui cadence tous les Ã©lÃ©ments synchrones du circuit.
- **Bloc "-1" (DÃ©crÃ©menteur combinatoire)** : RÃ©alise une opÃ©ration de soustraction de 1 sur l'entrÃ©e \(M\). Cela est nÃ©cessaire car le compteur dÃ©crÃ©mente jusqu'Ã  0 inclus. Pour compter \(M\) cycles, il faut dÃ©marrer le comptage Ã  \(M-1\).
- **32-bit register (Registre de mÃ©morisation)** : Sauvegarde la valeur \(M-1\) Ã  chaque fois que la commande `load` est active (Ã  '1'). Il sert de mÃ©moire pour conserver la configuration du timer de maniÃ¨re autonome.
- **4-bit 2x1 Mux (Multiplexeur 2 vers 1)** : Aiguille la donnÃ©e qui sera chargÃ©e dans le compteur. Si `load` est Ã  '1', il laisse passer la nouvelle valeur \(M-1\). Si `load` est Ã  '0', il laisse passer la valeur sauvegardÃ©e dans le registre.
- **Porte logique OU (OR gate)** : GÃ©nÃ¨re le signal de chargement (`ld`) du compteur (si `load = 1` ou `tc = 1`).
- **32-bit down-counter (DÃ©compteur 32 bits)** : C'est le cÅ“ur du timer. ActivÃ© par `enable`, il dÃ©crÃ©mente sa valeur Ã  chaque front d'horloge. Lorsqu'il atteint 0, sa sortie `tc` passe Ã  1.

**Question 1** : Quelle valeur doit Ãªtre programmÃ©e (c'est-Ã -dire envoyÃ©e vers M) pour gÃ©nÃ©rer une impulsion toutes les 300 ms ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Analyse des pÃ©riodes.**
 L'horloge a une pÃ©riode de \(1\,\mu\text{s}\). On souhaite une pÃ©riode globale de \(300\text{ ms}\), ce qui Ã©quivaut Ã  \(300\,000\,\mu\text{s}\).

**Ã‰tape 2 : Calcul du nombre de cycles.**
 Il faut donc compter exactement \(300\,000\) cycles d'horloge entre chaque impulsion.

**Ã‰tape 3 : Logique de comptage.**
 Le circuit dÃ©crÃ©mente de \(M-1\) jusqu'Ã  \(0\) (soit un total de \(M\) Ã©tats ou \(M\) cycles). Le bloc "-1" matÃ©riel s'occupe dÃ©jÃ  de soustraire 1 Ã  la valeur de consigne.

**Ã‰tape 4 : DÃ©duction de M.**
 La valeur Ã  programmer sur l'entrÃ©e \(M\) correspond donc directement au nombre de cycles souhaitÃ©s : \[\mathbf{M = 300\,000}\]
:::

**Question 2** : Faire un chronogramme pour deux impulsions avec \(M=3\) puis deux impulsions avec \(M=2\).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Initialisation (Cycle 0).**
 `load` = 1, \(M = 3\). Le bloc "-1" calcule \(M-1 = 2\). Le registre R32 charge 2. Le Mux32 laisse passer 2. Le compteur C charge 2 car la porte OU donne 1.

**Ã‰tape 2 : PremiÃ¨re sÃ©quence d'impulsions (M=3).**

- **Cycle 1 :** `load` = 0, `enable` = 1. C = 2. `tc` (Q) = 0. Au front, C \(\rightarrow\) 1.
- **Cycle 2 :** C = 1, Q = 0. Au front, C \(\rightarrow\) 0.
- **Cycle 3 (Impulsion) :** C = 0. Donc Q = 1 (`tc`=1). La porte OU vaut 1. Le Mux32 laisse passer R32 (2). Au front, C recharge 2.
- **Cycles 4, 5, 6 :** Identique aux cycles 1 Ã  3. On obtient une 2Ã¨me impulsion.

**Ã‰tape 3 : Seconde sÃ©quence d'impulsions (M=2).**

- **Cycle 7 (Changement) :** `load` = 1, \(M = 2\). R32 et C chargent 1 (\(2-1\)).
- **Cycle 8 (Impulsion) :** `load` = 0, `enable` = 1. C passe de 1 Ã  0 au cycle 9. La pÃ©riode est maintenant de 2 cycles.
:::

**Question 3** : Est-ce que les pÃ©riodes des impulsions gÃ©nÃ©rÃ©es correspondent aux valeurs de M successives (3 puis 2) ? Si ce n'est pas le cas, expliquez.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : VÃ©rification pour M=3.**
 Pour \(M=3\), le compteur prend les valeurs \(2 \rightarrow 1 \rightarrow 0\). Il faut donc 3 cycles d'horloge complets pour revenir Ã  l'Ã©tat initial. La pÃ©riode correspond.

**Ã‰tape 2 : VÃ©rification pour M=2.**
 Pour \(M=2\), le compteur prend les valeurs \(1 \rightarrow 0\). Il faut donc 2 cycles d'horloge. La pÃ©riode correspond.

**Ã‰tape 3 : Conclusion et rÃ´le du bloc soustracteur.**
 **Oui**, les pÃ©riodes correspondent parfaitement. Le bloc "-1" placÃ© en amont compense le fait que le compteur passe par l'Ã©tat "0". Il garantit que la pÃ©riode mesurÃ©e en cycles d'horloge soit exactement Ã©gale Ã  la valeur entiÃ¨re \(M\) demandÃ©e.
:::

**Question 4** : Donnez une description en VHDL de l'entitÃ© du timer.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification des ports et bibliothÃ¨ques.**
 Le schÃ©ma montre les entrÃ©es d'horloge, de contrÃ´le (`load`, `enable`), le bus de donnÃ©es \(M\) sur 32 bits et la sortie scalaire \(Q\). On inclut `numeric_std` en prÃ©vision de l'architecture.

```vhdl
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity timer is
    port (
        clk    : in  std_logic;
        load   : in  std_logic;
        enable : in  std_logic;
        M      : in  std_logic_vector(31 downto 0);
        Q      : out std_logic
    );
end entity timer;
```
:::

**Question 5** : DÃ©crire en VHDL RTL l'architecture `rtl` de ce circuit.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©claration des signaux internes.**
 On dÃ©clare les signaux de type `unsigned` pour les bus de donnÃ©es (M32, R32, Mux32, C) pour permettre l'arithmÃ©tique.

**Ã‰tape 2 : ImplÃ©mentation combinatoire et processus synchrones.**
 La logique combinatoire gÃ¨re le soustracteur, le multiplexeur, la porte OU et le comparateur Ã  zÃ©ro. Deux processus distincts gÃ¨rent les Ã©lÃ©ments mÃ©morisants (Registre R32 et Compteur C).

```vhdl
architecture rtl of timer is
    signal M32_uns, R32_uns, Mux32_uns, C_uns : unsigned(31 downto 0);
    signal OR1, Q_int : std_logic;
begin
    -- Logique Combinatoire
    M32_uns  '0');
    constant CLK_PERIOD : time := 1 us;
begin
    UUT: entity work.timer port map(clk, load, enable, M, Q);

    clk_process : process begin
        clk  6 cycles)
        load  4 cycles)
        load <= '0'; wait for 4 * CLK_PERIOD;

        enable <= '0'; wait;
    end process;
end architecture sim;
```
:::
:::

:::exercise label="Probleme 2" title="ProblÃ¨me II - ContrÃ´leur de porte de garage"
#### Contexte

:::figure src="assets/vhdl/exam/vhdl_exam2_moore_2.svg" alt="Diagramme de transition de la porte de garage avec remt continu." caption="Diagramme de transition de la porte de garage avec remt continu."
:::

:::figure src="assets/vhdl/exam/vhdl_exam2_moore_1.svg" alt="Diagramme de transition de la porte de garage avec remt impulsionnel." caption="Diagramme de transition de la porte de garage avec remt impulsionnel."
:::

Une porte de garage est contrÃ´lÃ©e par une machine Ã  Ã©tats. `ctr(1)` gÃ¨re l'alimentation du moteur (1=ON, 0=OFF) et `ctr(0)` dÃ©finit le sens (0=ouverture, 1=fermeture). Les capteurs `sen1` et `sen2` dÃ©tectent respectivement l'ouverture totale et la fermeture totale. Le bouton `remt` donne les ordres.

**Question 2.1** : Donnez un diagramme de transitions de la machine Ã  Ã©tats de Moore avec `remt` sous forme d'impulsion d'une seule pÃ©riode.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : DÃ©finition des Ã©tats et sorties.**
 La sortie dÃ©pend uniquement de l'Ã©tat (Machine de Moore). On dÃ©finit les vecteurs `ctr` associÃ©s :

- **FERME** (`ctr = "0X"`) : Moteur coupÃ©.
- **OUVERTURE** (`ctr = "10"`) : Moteur ON, sens ouverture.
- **OUVERT** (`ctr = "0X"`) : Moteur coupÃ©.
- **FERMETURE** (`ctr = "11"`) : Moteur ON, sens fermeture.
- **STOP_OUVERTURE** (`ctr = "0X"`) : ArrÃªt d'urgence/pause.
- **STOP_FERMETURE** (`ctr = "0X"`) : ArrÃªt d'urgence/pause.

**Ã‰tape 2 : Conditions de transition.**

- Depuis **FERME** : Si `remt = 1` \(\rightarrow\) **OUVERTURE**.
- Depuis **OUVERTURE** : Si `sen1 = 1` \(\rightarrow\) **OUVERT**. Si `remt = 1` \(\rightarrow\) **STOP_OUVERTURE**.
- Depuis **OUVERT** : Si `remt = 1` \(\rightarrow\) **FERMETURE**.
- Depuis **FERMETURE** : Si `sen2 = 1` \(\rightarrow\) **FERME**. Si `remt = 1` \(\rightarrow\) **STOP_FERMETURE**.
- Depuis **STOP_OUVERTURE** : Si `remt = 1` \(\rightarrow\) **FERMETURE** (inversion de sens).
- Depuis **STOP_FERMETURE** : Si `remt = 1` \(\rightarrow\) **OUVERTURE** (inversion de sens).
:::

**Question 2.2** : Donnez un diagramme de transitions de la machine Ã  Ã©tats de Moore si le signal `remt` est un signal continu tant qu'on appuie sur le bouton. Il faut dÃ©tecter les passages Ã  0.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Identification du problÃ¨me (Bouton continu).**
 Si `remt` reste Ã  '1' sur plusieurs cycles d'horloge, la machine basculerait instantanÃ©ment entre, par exemple, **OUVERTURE** et **STOP_OUVERTURE** Ã  chaque coup d'horloge.

**Ã‰tape 2 : RÃ©solution avec des Ã©tats d'attente (Wait states).**
 Pour Ã©viter le rebouclage indÃ©sirable, il faut attendre le relÃ¢chement du bouton (`remt = 0`) avant de valider l'action. On double les Ã©tats dÃ©clenchÃ©s par `remt` :

- **FERME** : Si `remt = 1` \(\rightarrow\) **ATTENTE_RELACHEMENT_OUV** (`ctr = "0X"`).
- **ATTENTE_RELACHEMENT_OUV** : Si `remt = 0` \(\rightarrow\) **OUVERTURE**. Si `remt = 1`, boucle sur lui-mÃªme.
- **OUVERTURE** : Si `remt = 1` \(\rightarrow\) **ATTENTE_RELACHEMENT_STOP** (`ctr = "0X"`).
- **ATTENTE_RELACHEMENT_STOP** : Si `remt = 0` \(\rightarrow\) **STOP_OUVERTURE**.

Cette logique s'applique symÃ©triquement pour la fermeture.
:::

\vfill

Ã‰quipe PÃ©dagogique Esisar Page 1/1
:::
