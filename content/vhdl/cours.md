---
title: vhdl - Revision ESISAR
subject: vhdl
type: course
---

:::section id="vhdl-intro" eyebrow="SN361" title="VHDL et conception de circuits numeriques" summary="Cette page transforme les supports extraits de pdf/vhdl/cours en cours de revision : chaque chapitre reprend les notions principales, explique ce qu'il faut comprendre, puis isole les points importants a retenir pour l'examen et les TP."
:::dashboard
:::card class="progress-card" kicker="Parcours" title="7 CM"
Du choix FPGA/processeur jusqu'aux machines a etats et aux composants programmables.
:::

:::card class="priority-card" kicker="Fil rouge"
1.  Un HDL decrit du materiel : le parallelisme est naturel, l'ordre du texte ne suffit pas a comprendre le circuit.
2.  La taille des vecteurs, le signe et les conversions determinent le materiel synthetise.
3.  Un circuit combinatoire n'a pas de memoire ; un circuit sequentiel memorise sur front d'horloge.
4.  Une FSM propre se separe en registre d'etat, calcul du prochain etat et calcul des sorties.
5.  Un FPGA donne des ressources concretes : LUT, bascules, routage, blocs RAM, multiplieurs et horloges.
:::
:::

:::quicklinks
- [CM1 Intro](#vhdl-cm1)
- [CM2 Nombres](#vhdl-cm2)
- [CM3 Combinatoire](#vhdl-cm3)
- [CM4 Sequentiel](#vhdl-cm4)
- [CM5 FSM](#vhdl-cm5)
- [CM6 HDL](#vhdl-cm6)
- [CM7 FPGA](#vhdl-cm7)
- [TD](#vhdl-td)
- [Examens](#vhdl-exams)
- [PDF](#vhdl-pdfs)
:::
:::

:::section id="vhdl-cm1" eyebrow="CM1" title="Introduction : pourquoi decrire du materiel en VHDL ?" summary="Le premier chapitre place le VHDL dans le flot de conception des systemes numeriques sur composants reconfigurables."
:::grid variant="two-col"
:::block type="definition" title="Objectif du module"
Le cours vise a concevoir des circuits numeriques simples sur FPGA, en sachant ecrire du VHDL, lire du Verilog et comprendre les blocs elementaires d'un processeur.

Le point central est le passage d'une idee fonctionnelle a un circuit reel : le code HDL doit pouvoir etre simule puis synthetise en portes, bascules et interconnexions.
:::

:::block type="theorem" title="Processeur contre logique reconfigurable"
Un processeur execute des instructions dans le temps. Un FPGA realise une structure materielle qui peut effectuer plusieurs operations en parallele.

*   **Processeur** : tres flexible, mais execution principalement sequentielle.
*   **FPGA** : moins flexible apres synthese, mais tres performant pour le parallelisme, les traitements rapides et les interfaces temps reel.
:::

:::block type="method" title="Quand choisir le materiel ?"
Le cours donne un ordre de grandeur utile : si les evenements se jouent en ps ou ns, on se dirige vers du materiel ; en ms, le logiciel suffit souvent ; en us, le choix depend du besoin.

Exemple typique : une expression comme \(S=A x^2 + B y + C\) peut etre decomposee en cycles sur processeur, alors qu'un circuit dedie peut calculer plusieurs produits et additions en parallele.
:::

:::block type="warning" title="Ce qu'il ne faut pas confondre"
Le VHDL n'est pas un langage de programmation classique. Deux affectations concurrentes ne sont pas deux lignes executees l'une apres l'autre : elles representent deux morceaux de materiel actifs en meme temps.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Architecture d'un FPGA SRAM"
Un FPGA SRAM contient des blocs logiques configurables, des cellules d'entrees/sorties et des interconnexions programmables. La configuration est stockee dans des cellules SRAM.

Comme la SRAM est volatile, le FPGA perd sa configuration a l'extinction : il doit etre recharge au demarrage, souvent depuis une memoire non volatile externe.
:::

:::block type="method" title="Flot de conception"
1.  Ecrire la description HDL au niveau RTL.
2.  Simuler pour verifier la fonction avant synthese.
3.  Synthetiser vers une netlist de portes et de bascules.
4.  Faire le placement-routage dans le FPGA cible.
5.  Verifier les contraintes temporelles, generer le bitstream et programmer le composant.
:::
:::

:::annotation title="A retenir"
La question a toujours poser devant un code VHDL est : quel materiel ce code decrit-il ? Si tu ne peux pas dessiner portes, registres ou multiplexeurs, le code est probablement mal compris.
:::
:::

:::section id="vhdl-cm2" eyebrow="CM2" title="Representation des nombres en binaire" summary="Ce chapitre fixe les bases de codage indispensables avant toute operation arithmetique en VHDL."
:::grid variant="two-col"
:::block type="theorem" title="Entiers non signes"
Avec \(N\) bits, on obtient \(2^N\) valeurs possibles, de \(0\) a \(2^N-1\). Par exemple, 8 bits donnent 256 valeurs, de 0 a 255.

La valeur d'un mot binaire se calcule en additionnant les puissances de 2 associees aux bits a 1. Exemple : `01011010` vaut \(64+16+8+2=90\).
:::

:::block type="definition" title="Hexadecimal"
L'hexadecimal est une base 16 compacte : chaque chiffre hexadecimal correspond a 4 bits. C'est tres pratique pour lire et ecrire des vecteurs larges.

*   `1111_0000` devient `F0`.
*   `A01` devient `1010_0000_0001`.
:::

:::block type="method" title="Nombre de bits necessaires"
Pour coder un entier positif \(x\), on utilise :

\(N=\lceil \log_2(x+1)\rceil\)

Pour coder jusqu'a 511, il faut donc 9 bits, car \(2^9-1=511\).
:::

:::block type="warning" title="Largeur des vecteurs"
En materiel, la largeur n'est jamais un detail. Un resultat tronque ou un bit de signe oublie change le circuit et peut rendre une addition fausse.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Complement a 2"
Le complement a 2 permet de coder les nombres positifs et negatifs avec les memes circuits d'addition/soustraction.

*   Pour obtenir l'oppose : inverser tous les bits puis ajouter 1.
*   Le bit de poids fort donne le signe.
*   Avec \(N\) bits signes : intervalle \([-2^{N-1}; 2^{N-1}-1]\).

Exemple sur 4 bits : \(5 = 0101\), donc \(-5 = 1011\).
:::

:::block type="method" title="Types VHDL importants"
*   `bit` et `bit_vector` : valeurs simples `'0'` et `'1'`.
*   `std_logic` et `std_logic_vector` : valeurs plus riches, dont `U`, `X`, `Z`, utiles en simulation.
*   `unsigned` et `signed` : interpretation numerique pour l'arithmetique.
:::
:::

:::block type="neutral" title="Conversions propres avec numeric_std"
Pour eviter les conversions ambigues, le cours insiste sur `IEEE.numeric_std`.

```vhdl
library IEEE;
use IEEE.std_logic_1164.all;
use IEEE.numeric_std.all;

signal n  : integer;
signal v  : std_logic_vector(15 downto 0);

v <= std_logic_vector(to_unsigned(n, 16));
n <= to_integer(unsigned(v));
```
:::

:::annotation title="A retenir"
Avant une operation arithmetique, verifie toujours trois choses : largeur, signe, type. En VHDL, `std_logic_vector` seul est un paquet de bits, pas encore un nombre.
:::
:::

:::section id="vhdl-cm3" eyebrow="CM3" title="Circuits combinatoires" summary="Un circuit combinatoire calcule ses sorties uniquement a partir de ses entrees presentes."
:::grid variant="two-col"
:::block type="definition" title="Definition"
Une fonction booleenne correspond a un circuit combinatoire. Les sorties sont determinees par les entrees, sans memoire interne.

*   Portes usuelles : NOT, AND, OR, NAND, NOR, XOR, XNOR.
*   Les boucles combinatoires sont interdites dans une conception saine.
*   Une fonction peut etre simplifiee par algebre booleenne ou tableau de Karnaugh.
:::

:::block type="method" title="Operateurs VHDL"
```vhdl
s  <= not a;
s1 <= a or b;
s2 <= a and b;
s3 <= a xor b;
s4 <= a sll 1; -- decalage gauche
s5 <= a srl 1; -- decalage droite
```
:::

:::block type="warning" title="Delais et puissance"
Les portes ont un temps de propagation lie a la charge/decharge des capacites. Dans un FPGA, les LUT ont des delais de l'ordre de la centaine de ps, mais le routage compte aussi beaucoup.

La puissance dynamique augmente avec la capacite, la tension et la frequence : \(P \approx C V_{DD}^2 F\).
:::

:::block type="remember" title="Lecture RTL"
Une affectation concurrente comme `F <= (a and b) or c;` decrit directement une porte AND suivie d'une porte OR. Il faut visualiser la structure.
:::
:::

:::block type="neutral" title="Fiche logic-gate : portes logiques de base"
La section `logic-gate` resume les portes elementaires a reconnaitre immediatement : leur role, leur table de verite et leur expression booleenne. Ces portes sont les briques de base des equations combinatoires et des schemas de synthese.

Porte

Symbole

Role

Table de verite

Expression

VHDL

Buffer

A Y

Recopie l'entree sans inversion.

`A=0 -> Y=0`  
`A=1 -> Y=1`

\(Y=A\)

`Y <= A;`

NOT

A Y

Inverse l'entree.

`A=0 -> Y=1`  
`A=1 -> Y=0`

\(Y=\overline A\)

`Y <= not A;`

AND

A B Y

Sortie a 1 uniquement si toutes les entrees valent 1.

`00 -> 0`  
`01 -> 0`  
`10 -> 0`  
`11 -> 1`

\(Y=A\cdot B\)

`Y <= A and B;`

NAND

A B Y

Inverse de AND. C'est une porte universelle.

`00 -> 1`  
`01 -> 1`  
`10 -> 1`  
`11 -> 0`

\(Y=\overline{A\cdot B}\)

`Y <= A nand B;`

OR

A B Y

Sortie a 1 si au moins une entree vaut 1.

`00 -> 0`  
`01 -> 1`  
`10 -> 1`  
`11 -> 1`

\(Y=A+B\)

`Y <= A or B;`

NOR

A B Y

Inverse de OR. C'est aussi une porte universelle.

`00 -> 1`  
`01 -> 0`  
`10 -> 0`  
`11 -> 0`

\(Y=\overline{A+B}\)

`Y <= A nor B;`

XOR

A B Y

Detecte une difference entre deux bits.

`00 -> 0`  
`01 -> 1`  
`10 -> 1`  
`11 -> 0`

\(Y=A\oplus B\)

`Y <= A xor B;`

XNOR

A B Y

Detecte une egalite entre deux bits.

`00 -> 1`  
`01 -> 0`  
`10 -> 0`  
`11 -> 1`

\(Y=\overline{A\oplus B}\)

`Y <= A xnor B;`
:::

:::grid variant="two-col"
:::block type="method" title="Comment lire une table de verite"
Pour deux entrees, la table contient \(2^2=4\) lignes. Chaque ligne correspond a une combinaison possible de \(A\) et \(B\). La colonne \(Y\) indique la sortie produite par la porte.

Cette lecture sert directement a construire une equation booleenne : on repere les lignes ou \(Y=1\), puis on ecrit une somme de produits.
:::

:::block type="remember" title="Reflexes importants"
*   **NAND** et **NOR** sont universelles : on peut reconstruire toutes les autres fonctions avec seulement l'une de ces portes.
*   **XOR** vaut 1 quand les bits sont differents ; il sert beaucoup pour additionneurs, detection de front et comparateurs.
*   **XNOR** vaut 1 quand les bits sont identiques ; c'est la brique naturelle d'un comparateur d'egalite.
*   En VHDL, ces operateurs s'appliquent aussi bit a bit sur des vecteurs compatibles.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Entity et architecture"
L'`entity` decrit la vue externe du composant : nom, entrees, sorties. L'`architecture` decrit l'interieur.

```vhdl
entity Fonction is
  port(a, b, c : in bit;
       F       : out bit);
end Fonction;

architecture comb of Fonction is
begin
  F <= (a and b) or c;
end comb;
```
:::

:::block type="method" title="Description structurelle"
La description structurelle instancie des composants et les relie par des signaux internes. Elle est utile pour construire un circuit a partir de sous-blocs.

Le `port map` peut se faire par position ou par nom ; par nom, le code est plus lisible et moins fragile.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Multiplexeur, demultiplexeur, decodeur"
Ces trois blocs sont des circuits combinatoires de routage. Ils ne memorisent rien : quand les entrees ou les signaux de selection changent, les sorties changent apres le temps de propagation.

Ils se lisent toujours avec la meme question : **qui selectionne quoi ?**

*   **Multiplexeur** : plusieurs entrees, une sortie. Les bits de selection choisissent quelle entree est recopied vers la sortie.
*   **Demultiplexeur** : une entree, plusieurs sorties. Les bits de selection choisissent vers quelle sortie l'entree est envoyee.
*   **Decodeur** : un mot binaire en entree, plusieurs sorties. Une seule sortie est activee : celle dont l'indice correspond a la valeur binaire d'entree.
:::

:::block type="warning" title="Process combinatoire complet"
Dans un processus combinatoire, tous les signaux lus doivent etre dans la liste de sensibilite, et toutes les sorties doivent etre affectees dans tous les cas.

Le reflexe utile : donner une valeur par defaut au debut du processus, puis specialiser dans le `case` ou le `if`.
:::
:::

:::block type="neutral" title="Lire les symboles"
Bloc

Symbole

Lecture

Exemple

Multiplexeur 4 vers 1

I0 I1 I2 I3 Y S1 S0 MUX

Les entrees arrivent a gauche, la sortie est a droite, les selections arrivent souvent en bas. Le mot \(S_1S_0\) designe l'indice de l'entree choisie.

\(S_1S_0=10\) selectionne \(I_2\), donc \(Y=I_2\).

Demultiplexeur 1 vers 4

E Y0 Y1 Y2 Y3 S1 S0 DEMUX

L'entree arrive a gauche. Les selections choisissent une seule sortie active ; les autres sorties sont forcees a 0.

\(S_1S_0=11\) envoie \(E\) vers \(Y_3\) : \(Y_3=E\), les autres valent 0.

Decodeur 2 vers 4

A1 A0 D0 D1 D2 D3 DEC 2 -> 4

Le mot d'entree \(A_1A_0\) est interprete comme un nombre. Une seule sortie vaut 1 : celle de meme indice.

\(A_1A_0=10\) vaut 2, donc \(D_2=1\) et \(D_0=D_1=D_3=0\).
:::

:::grid variant="two-col"
:::block type="method" title="Multiplexeur : choisir une entree"
Un multiplexeur \(2^n\) vers 1 possede \(2^n\) entrees de donnees et \(n\) bits de selection. Il agit comme un aiguillage : une seule entree est connectee logiquement a la sortie.

Pour un MUX 4 vers 1, on lit \(S_1S_0\) comme un nombre binaire :

*   \(00 \rightarrow Y=I_0\)
*   \(01 \rightarrow Y=I_1\)
*   \(10 \rightarrow Y=I_2\)
*   \(11 \rightarrow Y=I_3\)

```vhdl
with sel select
  y <= i0 when "00",
       i1 when "01",
       i2 when "10",
       i3 when "11",
       i0 when others;
```
:::

:::block type="method" title="Demultiplexeur : distribuer une entree"
Le demultiplexeur fait l'operation inverse : il recoit une entree \(E\) et l'envoie vers une seule sortie. Il faut toujours definir les sorties non selectionnees, souvent a 0.

```vhdl
process(e, sel)
begin
  y <= "0000";
  case sel is
    when "00" => y(0) <= e;
    when "01" => y(1) <= e;
    when "10" => y(2) <= e;
    when "11" => y(3) <= e;
    when others => y <= "0000";
  end case;
end process;
```
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Decodeur : produire un one-hot"
Un decodeur \(n\) vers \(2^n\) transforme un nombre binaire en sortie _one-hot_ : une seule ligne vaut 1. C'est tres utile pour selectionner un registre, une case memoire, un afficheur ou un etat.

Pour un decodeur 2 vers 4 :

*   \(D_0=\overline{A_1}\overline{A_0}\)
*   \(D_1=\overline{A_1}A_0\)
*   \(D_2=A_1\overline{A_0}\)
*   \(D_3=A_1A_0\)
:::

:::block type="remember" title="Ce qu'il faut reconnaitre en schema"
*   Un bloc qui **converge** vers une seule sortie est souvent un multiplexeur.
*   Un bloc qui **diverge** depuis une seule entree est souvent un demultiplexeur.
*   Un bloc avec seulement des entrees d'adresse et plusieurs sorties one-hot est un decodeur.
*   Les entrees notees \(S\), `sel`, `addr` ou \(A_i\) ne sont pas des donnees : elles choisissent le chemin actif.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Addition, soustraction, multiplication"
*   Une addition de deux nombres de \(n\) bits peut necessiter \(n+1\) bits.
*   Une soustraction se fait par addition du complement a 2 : \(A-B = A+(-B)\).
*   Le produit de deux nombres non signes de \(n\) bits produit jusqu'a \(2n\) bits.
*   Pour les nombres signes, la nature `signed`/`unsigned` change le multiplieur synthetise.
:::

:::block type="method" title="Division"
La division par une puissance de 2 est simple : elle devient un decalage. Les autres divisions coutent cher en materiel et sont souvent evitees ou remplacees par une architecture dediee.
:::
:::

:::annotation title="A retenir"
Un bon code combinatoire se lit comme un schema de portes ou de blocs. S'il memorise une ancienne valeur, ce n'est plus du combinatoire : il y a probablement un latch involontaire.
:::
:::

:::section id="vhdl-cm4" eyebrow="CM4" title="Circuits sequentiels : memoriser et cadencer" summary="Un circuit sequentiel contient un etat. Ses sorties dependent des entrees, mais aussi de ce qui a ete memorise."
:::grid variant="two-col"
:::block type="definition" title="D latch et D flip-flop"
Une D latch est transparente quand son signal de controle est actif : la sortie peut suivre l'entree pendant toute l'impulsion.

Une D flip-flop echantillonne l'entree sur un front d'horloge. Elle evite le probleme de transparence et sert de brique de base aux registres synchrones.
:::

:::block type="warning" title="Setup, hold, reset, enable"
*   **Setup** : D doit etre stable avant le front actif.
*   **Hold** : D doit rester stable apres le front actif.
*   **Reset/Set** : initialisation prioritaire de la bascule.
*   **Enable** : autorise ou bloque le chargement au front actif.
:::
:::

:::block type="neutral" title="Modele VHDL d'une bascule D avec reset synchrone"
```vhdl
process(clk)
begin
  if rising_edge(clk) then
    if reset = '1' then
      q <= '0';
    elsif enable = '1' then
      q <= d;
    end if;
  end if;
end process;
```
:::

:::grid variant="two-col"
:::block type="theorem" title="Registres"
Un registre \(N\) bits est un ensemble de \(N\) bascules partageant la meme horloge, le meme reset et souvent le meme enable.

Le nombre de bascules synthetisees se lit en comptant les bits affectes dans les branches `rising_edge`.
:::

:::block type="method" title="Registres a decalage"
Un registre a decalage est une chaine de bascules D. A chaque front actif de l'horloge, chaque bascule transmet son ancienne valeur a la bascule voisine, pendant qu'un nouveau bit entre dans la chaine.

Il sert a transformer un flux serie en mot parallele, a retarder un signal de plusieurs cycles, ou a construire des interfaces qui envoient les bits les uns apres les autres.

```vhdl
if rising_edge(clk) then
  q_temp <= q_temp(3 downto 1) & d;
end if;
```
:::

:::block type="theorem" title="Compteurs"
Un compteur est un registre reboucle sur un additionneur ou soustracteur. Il peut avoir un clear, un enable, une entree de chargement et un signal terminal count.

Un compteur modulo \(N\) revient a remettre le registre a zero quand la valeur \(N-1\) est atteinte.
:::

:::block type="method" title="Diviseur de frequence"
Pour obtenir des impulsions plus lentes a partir d'une horloge, on utilise un compteur. Diviser 512 MHz par 256 donne 2 MHz, avec un compteur 8 bits modulo 256.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Les quatre familles"
*   **SISO** : Serial In, Serial Out. Un bit entre a chaque cycle, un bit ressort apres \(N\) cycles. C'est une ligne a retard numerique.
*   **SIPO** : Serial In, Parallel Out. Les bits arrivent un par un, puis on lit tout le mot stocke en parallele.
*   **PISO** : Parallel In, Serial Out. On charge un mot complet, puis on l'envoie bit par bit.
*   **PIPO** : Parallel In, Parallel Out. C'est le registre classique : tout le mot est charge et lu en parallele.
:::

:::block type="method" title="Lecture de l'exemple SISO/SIPO"
Dans `q_temp <= q_temp(3 downto 1) & d;`, l'operateur `&` concatene les bits. Le nouveau vecteur est forme avec les anciens bits `q_temp(3)`, `q_temp(2)`, `q_temp(1)`, puis le nouveau bit `d`.

Si `q_temp` vaut `1010` avant le front et que `d='1'`, alors apres le front il vaut `0101`. L'ancien bit le plus a gauche est sorti de la chaine.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Effet temporel"
Un registre a decalage de \(N\) bits retarde une information de \(N\) fronts d'horloge entre son entree serie et sa sortie serie. La sortie parallele, elle, donne l'etat complet de la chaine apres chaque front.

Pour dessiner un chronogramme, on raisonne front par front : les nouvelles valeurs ne sont visibles qu'apres le front actif, car toutes les bascules se mettent a jour en meme temps.
:::

:::block type="warning" title="Pieges classiques"
*   Ne pas lire l'affectation comme une suite d'instructions : toutes les bascules changent simultanement au front d'horloge.
*   Verifier le sens du vecteur : `downto` et `to` changent la maniere naturelle de lire le decalage.
*   Initialiser le registre si l'etat de depart compte, sinon la simulation peut afficher des valeurs inconnues avec `std_logic`.
*   Ajouter un signal `enable` si le decalage ne doit pas avoir lieu a tous les cycles.
:::
:::

:::block type="neutral" title="Modele VHDL avec reset et enable"
```vhdl
signal q_temp : std_logic_vector(3 downto 0);

process(clk, reset)
begin
  if reset = '1' then
    q_temp <= (others => '0');
  elsif rising_edge(clk) then
    if enable = '1' then
      q_temp <= q_temp(2 downto 0) & din;
    end if;
  end if;
end process;

dout_parallel <= q_temp;
dout_serial   <= q_temp(3);
```

Ici, `din` entre par le bit de poids faible, les anciens bits montent vers les indices plus eleves, et `dout_serial` recupere le bit expulse en tete de chaine.
:::

:::grid variant="two-col"
:::block type="definition" title="Memoires"
Une memoire est un tableau de mots. Un bus d'adresse de \(n\) bits selectionne \(2^n\) mots ; un bus de donnees de \(m\) bits lit ou ecrit un mot de \(m\) bits.

*   **ROM** : lecture seule, non volatile, vue comme combinatoire par adresse.
*   **RAM** : lecture/ecriture, volatile.
*   **SRAM** : rapide, souvent utilisee pour caches et blocs internes.
*   **DRAM** : dense mais necessite rafraichissement.
:::

:::block type="warning" title="Test bench"
Un test bench genere les stimuli, connecte le circuit a tester et observe les signaux. Il n'a ni entree ni sortie et n'est pas synthetisable.

C'est normal d'y utiliser des delais comme `wait for 10 ns` ; ce serait en revanche suspect dans un module a synthetiser.
:::
:::

:::annotation title="A retenir"
Le sequentiel sain se reconnait a une horloge claire. Tout ce qui doit memoriser durablement une valeur doit etre dans un processus cadence, avec reset et enable reflechis.
:::
:::

:::section id="vhdl-cm5" eyebrow="CM5" title="Machines a etats finis" summary="Les FSM modelisent des systemes discrets dont le comportement depend d'un etat courant et d'evenements d'entree."
:::grid variant="two-col"
:::block type="definition" title="Diagramme de transitions"
*   Un etat est represente par un cercle et un nom.
*   L'etat initial est indique par une fleche de reset.
*   Une transition est franchie au front actif de l'horloge si sa condition est vraie.
*   Sans condition indiquee, la transition est toujours vraie.
:::

:::block type="theorem" title="Nombre de bascules"
Pour coder \(N_{etats}\) etats, il faut au minimum :

\(n=\lceil \log_2(N_{etats})\rceil\)

En pratique, le code VHDL peut utiliser un type enumere ; l'outil choisira ensuite un codage adapte.
:::

:::block type="method" title="Machine de Moore"
Dans une machine de Moore, les sorties dependent seulement de l'etat courant. Elles ne changent donc qu'apres un front actif qui change l'etat.

C'est souvent plus simple a raisonner et plus robuste temporellement.
:::

:::block type="warning" title="Machine de Mealy"
Dans une machine de Mealy, les sorties dependent de l'etat courant et des entrees. Elles peuvent donc changer sans attendre un front d'horloge.

La Mealy est souvent plus rapide et peut utiliser moins d'etats, mais elle demande plus d'attention aux glitches et aux chemins combinatoires.
:::
:::

:::block type="neutral" title="Structure VHDL recommandee"
```vhdl
type state_type is (E0, E1, E2);
signal state, next_state : state_type;

-- registre d'etat
process(clk)
begin
  if rising_edge(clk) then
    if reset = '1' then
      state <= E0;
    else
      state <= next_state;
    end if;
  end if;
end process;

-- logique combinatoire de transition et de sortie
process(state, e)
begin
  next_state <= state;
  s <= '0';
  case state is
    when E0 =>
      if e = '1' then next_state <= E1; end if;
    when E1 =>
      s <= '1';
      if e = '1' then next_state <= E2;
      else next_state <= E0;
      end if;
    when E2 =>
      if e = '0' then next_state <= E0; end if;
  end case;
end process;
```
:::

:::annotation title="A retenir"
Pour une FSM, dessine d'abord le graphe. Ensuite seulement, code le registre d'etat et la logique combinatoire. Le code doit retrouver exactement les transitions du dessin.
:::
:::

:::section id="vhdl-cm6" eyebrow="CM6" title="Complements HDL : generiques, boucles et simulation evenementielle" summary="Ce chapitre explique comment ecrire des descriptions plus flexibles et comment comprendre le simulateur VHDL."
:::grid variant="two-col"
:::block type="definition" title="Parametres generiques"
Un `generic` permet de decrire une entite parametree, par exemple un compteur ou un additionneur sur \(N\) bits. La valeur est fixee lors de l'instanciation.

```vhdl
entity countN is
  generic(N : integer := 10);
  port(clk, rst, en : in bit;
       count : out bit_vector(N-1 downto 0));
end countN;
```
:::

:::block type="method" title="Boucles synthetisables"
La boucle `for` peut etre synthetisee si ses bornes sont connues et si elle decrit une structure finie. Elle ne cree pas une boucle temporelle : elle replique ou organise du materiel.

`for ... generate` sert a creer plusieurs instances, par exemple \(N\) bascules ou \(N\) full adders.
:::

:::block type="warning" title="Erreur classique avec les signaux"
Un signal VHDL n'est pas mis a jour immediatement. Dans une boucle, faire plusieurs affectations successives au meme signal ne donne pas une accumulation immediate.

Si tu veux construire une chaine combinatoire, utilise des signaux intermediaires distincts ou une variable locale adaptee au modele voulu.
:::

:::block type="theorem" title="Generate structurel"
Le cours montre par exemple un additionneur \(N\) bits construit par instanciation repetee de full adders, avec un vecteur de retenues internes.

Ce pattern est fondamental pour passer de circuits 1 bit a des circuits parametrables.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Simulation evenementielle"
Le simulateur VHDL avance d'evenement en evenement. Un signal possede un pilote, c'est-a-dire une liste de changements prevus avec des dates.

Une affectation comme `s <= '0', '1' after 10 ns;` programme des evenements futurs, tres utile en test bench.
:::

:::block type="warning" title="Signal, variable, constante"
*   **Constante** : ne change pas.
*   **Variable** : mise a jour immediate dans le processus.
*   **Signal** : mise a jour quand les processus en cours sont suspendus.
:::

:::block type="method" title="Liste de sensibilite"
Un processus combinatoire avec liste de sensibilite est equivalent a un processus qui termine par `wait on` les signaux lus. Pour etre coherent en synthese, les signaux lus doivent y apparaitre.
:::

:::block type="remember" title="Un seul pilote"
Regle de conception importante : plusieurs composants ne doivent pas piloter le meme signal interne. En VHDL de synthese, affecte un signal dans un seul processus ou une seule affectation concurrente.
:::
:::

:::annotation title="A retenir"
Le simulateur n'execute pas du VHDL comme du C. Il reveille des processus quand des signaux changent, calcule des evenements, puis met a jour les signaux. C'est la cle pour comprendre les decalages inattendus.
:::
:::

:::section id="vhdl-cm7" eyebrow="CM7" title="Composants programmables : CPLD, FPGA et criteres de choix" summary="Le dernier chapitre relie le code VHDL aux architectures materielles programmables qui l'executent."
:::grid variant="two-col"
:::block type="definition" title="CPLD"
Les CPLD heritent des architectures SPLD/PAL : des blocs logiques de type tableaux de ET programmables et OU fixes, regroupes avec des macrocellules.

*   Peu de blocs logiques, mais blocs avec beaucoup d'entrees/sorties.
*   Interconnexions moins flexibles que dans un FPGA.
*   Souvent non volatiles.
*   Performances elevees et plus reproductibles.
:::

:::block type="theorem" title="FPGA"
Un FPGA est un tableau de blocs logiques configurables relies par des canaux de routage et des cellules d'entrees/sorties.

Les cellules logiques sont plus fines que dans un CPLD, mais tres nombreuses. Le routage devient donc une partie majeure du delai final.
:::

:::block type="method" title="LUT"
La logique programmable d'un FPGA repose souvent sur des LUT, des petites memoires qui implementent une table de verite.

Une LUT de \(2^n\) cases peut implementer n'importe quelle fonction booleenne de \(n\) variables : les entrees adressent la memoire, la sortie lit le bit configure.
:::

:::block type="warning" title="Technologies"
*   **SRAM** : majoritaire, reprogrammable, volatile, necessite un chargement au demarrage.
*   **Flash** : non volatile, plus autonome, technologie moins standard.
*   **Anti-fusible** : dense et non volatile, mais non reprogrammable.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="IP soft et hard"
Les FPGA integrent ou fournissent souvent des composants prets a l'emploi.

*   **Soft IP** : description HDL synthetisable d'un composant classique.
*   **Hard IP** : bloc cable et optimise dans le silicium : RAM, multiplieur, MAC, controleur d'horloge, processeur, etc.
:::

:::block type="method" title="Choisir un composant"
Le choix depend de la quantite de logique, du nombre de blocs RAM, des I/O, du cout, des performances, des horloges, de la consommation et des blocs cables disponibles.

Un CPLD convient bien aux logiques de controle simples et rapides ; un FPGA convient mieux aux designs larges, paralleles et riches en ressources internes.
:::
:::

:::annotation title="A retenir"
Le VHDL n'est jamais abstrait jusqu'au bout : a la fin, il occupe des LUT, des bascules, du routage et parfois des blocs dedies. Les performances dependent autant de l'architecture cible que du code.
:::
:::

:::section id="vhdl-td" eyebrow="Entrainement" title="TD VHDL corriges" summary="Les pages ci-dessous sont maintenues en Markdown, avec les enonces, corrections, tableaux, formules et blocs de code."
:::dashboard
:::card class="chapter-card" pill="TD 1" title="Codage et combinatoire" href="vhdl-td1.html" link="Ouvrir la page corrigee"
Conversions signees/non signees, complement a 2, tables de verite, portes logiques, XOR/XNOR et comparateurs.
:::

:::card class="chapter-card" pill="TD 2" title="Synthese logique" href="vhdl-td2.html" link="Ouvrir la page corrigee"
Lecture de code VHDL, schemas de bascules, sorties synchrones/asynchrones, detection d'evenements et chronogrammes.
:::

:::card class="chapter-card" pill="TD 3" title="Compteurs et test benches" href="vhdl-td3.html" link="Ouvrir la page corrigee"
Compteur 8 bits, reset asynchrone, enable, test benches VHDL/Verilog et extensions up/down.
:::

:::card class="chapter-card" pill="TD 4" title="Machines a etats" href="vhdl-td4.html" link="Ouvrir la page corrigee"
Bascule Toggle, machines de Moore et Mealy, reset asynchrone, synchronisation d'une entree asynchrone.
:::
:::
:::

:::section id="vhdl-exams" eyebrow="Examens" title="Examens VHDL corriges" summary="Ces pages sont construites depuis des sources Markdown, avec les corrections, explications, formules, tableaux, codes VHDL et chronogrammes."
:::dashboard
:::card class="chapter-card" pill="Examen 1" title="Registre et compteur modulo N" href="vhdl-exam-1.html" link="Ouvrir l'examen corrige"
Registre generique, architecture RTL et structurelle, nombre de bascules, compteur modulo N et testbench.
:::

:::card class="chapter-card" pill="Examen 2" title="Timer et porte de garage" href="vhdl-exam-2.html" link="Ouvrir l'examen corrige"
Timer 32 bits, decompteur, multiplexeur, nombre de bascules, testbench et controleur de porte de garage.
:::

:::card class="chapter-card" pill="Examen 3" title="Cours et registre SIPO" href="vhdl-exam-3.html" link="Ouvrir l'examen corrige"
Virgule fixe, Karnaugh, `numeric_std`, concurrence des processus, registre SIPO RTL/structurel et chronogrammes.
:::

:::card class="chapter-card" pill="Examen 4" title="SN360 session 2026" href="vhdl-exam-4.html" link="Ouvrir l'examen corrige"
Complement a 2, chronogramme VHDL, traduction Verilog, PWM et machine a etats de Moore.
:::
:::
:::

:::section id="vhdl-pdfs" eyebrow="Sources" title="PDF originaux et fiche syntaxe" summary="Ces liens servent a retrouver les schemas, chronogrammes et exercices complets des supports originaux."
:::dashboard
:::card class="chapter-card" pill="26 pages" title="CM1 - Introduction" href="pdf/vhdl/cours/SN361_CM1_Introduction_V2.3.pdf" link="Ouvrir le PDF"
Logique reconfigurable, FPGA SRAM, HDL et flot de conception.
:::

:::card class="chapter-card" pill="19 pages" title="CM2 - Representation des nombres" href="pdf/vhdl/cours/SN361_CM2_Representation_des_nombres_V2.4.pdf" link="Ouvrir le PDF"
Binaire, hexadecimal, types VHDL et complement a 2.
:::

:::card class="chapter-card" pill="44 pages" title="CM3 - Circuits combinatoires" href="pdf/vhdl/cours/SN361_CM3_Circuits_combinatoires_V2.4.pdf" link="Ouvrir le PDF"
Portes logiques, equations, VHDL combinatoire et blocs usuels.
:::

:::card class="chapter-card" pill="52 pages" title="CM4 - Circuits sequentiels" href="pdf/vhdl/cours/SN361_CM4_Circuits_sequentiels_V2.5.pdf" link="Ouvrir le PDF"
Bascules, registres, compteurs, memoires et processus synchrones.
:::

:::card class="chapter-card" pill="22 pages" title="CM5 - Machines a etats finis" href="pdf/vhdl/cours/SN361_CM5_Machines_a_etats_finis_V2.4.pdf" link="Ouvrir le PDF"
Moore, Mealy, transitions, sorties et codage VHDL des FSM.
:::

:::card class="chapter-card" pill="32 pages" title="CM6 - Complements HDL" href="pdf/vhdl/cours/SN361_CM6_Complements_HDL_V3.pdf" link="Ouvrir le PDF"
Generiques, generate, signaux, variables et simulation evenementielle.
:::

:::card class="chapter-card" pill="37 pages" title="CM7 - Composants programmables" href="pdf/vhdl/cours/SN361_CM7_Les_composants_programmables_3_3.pdf" link="Ouvrir le PDF"
CPLD, FPGA, LUT, technologies SRAM/Flash/anti-fusible et criteres de choix.
:::

:::card class="chapter-card" pill="Bonus" muted="true" title="Syntaxe VHDL" href="pdf/vhdl/cheatsheet/Syntaxe-VHDL-Esisar.pdf" link="Ouvrir la fiche"
Fiche de syntaxe disponible dans le dossier `pdf/vhdl/cheatsheet`.
:::
:::
:::
