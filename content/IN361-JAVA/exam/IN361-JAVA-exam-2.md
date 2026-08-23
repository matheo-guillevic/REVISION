---
title: "Examen IN361-JAVA 2"
subject: "IN361-JAVA"
type: "exam"
target: "IN361-JAVA-exam-2.html"
eyebrow: "IN361 - Examen 2"
heading: "Examen IN361-JAVA 2"
summary: "Objets, collections, exceptions et conception de classes."
---
:::exercise label="Exercice 1" title="Exercice 1 (2 points)"
**Question :** Expliquer ce qu'est un objet immutable. Donner 2 exemples de class Java immutable.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :** Un objet immutable (immuable en franÃ§ais) est un objet dont l'Ã©tat (les valeurs de ses attributs) ne peut pas Ãªtre modifiÃ© une fois qu'il a Ã©tÃ© crÃ©Ã© et initialisÃ©.

- **Exemples :** `String`, `Integer` (ou toute autre classe Wrapper comme `Double`), et `LocalDate` (vue dans l'exercice 4).
:::
:::

:::exercise label="Exercice 2" title="Exercice 2 (1 point)"
**Question :** Expliquez pourquoi ce programme ne veut pas se lancer.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :** La signature de la mÃ©thode principale est incorrecte. Dans le code fourni, la mÃ©thode est Ã©crite `public void main(String args)`. Pour que la Machine Virtuelle Java (JVM) puisse identifier le point d'entrÃ©e du programme et l'exÃ©cuter, la mÃ©thode doit obligatoirement Ãªtre `static` et prendre en paramÃ¨tre un tableau de chaÃ®nes de caractÃ¨res. Il faudrait Ã©crire : `public static void main(String[] args)`.
:::
:::

:::exercise label="Exercice 3" title="Exercice 3 (2 points)"
**Question :** Ce programme ne compile pas. a) Expliquez l'erreur b) Proposer un correctif.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :**

- **a) Explication :** L'erreur provient de la ligne `ArrayList maListe = new ArrayList();`. En Java, les collections et la gÃ©nÃ©ricitÃ© ne fonctionnent qu'avec des types objets (rÃ©fÃ©rences). Il est impossible d'utiliser un type primitif comme `int`.
- **b) Correctif :** Il faut utiliser la classe Wrapper (enveloppe) `Integer` correspondante au type primitif `int`.

```java
ArrayList maListe = new ArrayList();
```
:::
:::

:::exercise label="Exercice 4" title="Exercice 4 (4 points)"
**Question a :** Expliquer ce que fait la ligne `return this (year, month, dayOfMonth);`.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse a :** Cette syntaxe, bien qu'incorrecte dans une mÃ©thode statique en Java classique (il faudrait un `new LocalDate(...)`), reprÃ©sente conceptuellement l'appel au constructeur de la classe courante afin d'instancier et de retourner un nouvel objet `LocalDate`.
:::

**Question b :** Indiquer la ligne causant une erreur de compilation et en expliquer la raison.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse b :** La ligne en erreur est `d = new LocalDate (2023,2,15);`. La raison est que le constructeur de la classe `LocalDate` est dÃ©clarÃ© `private`. Il est donc inaccessible depuis une autre classe (comme le programme principal).
:::

**Question c :** Si possible proposer un correctif.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse c :** Il faut utiliser les mÃ©thodes statiques fournies par la classe pour obtenir une instance (patron de conception Factory / Fabrique).

```java
d = LocalDate.of(2023, 2, 15);
```
:::

**Question d :** Comment peut-on qualifier ses 2 mÃ©thodes `of` en utilisant le vocabulaire orientÃ© objet adaptÃ© ?.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse d :** C'est de la **surcharge** (Overloading). On a plusieurs mÃ©thodes qui portent le mÃªme nom (`of`) mais qui diffÃ¨rent par la signature de leurs paramÃ¨tres (l'une prend `int, int, int` et l'autre `int, Month, int` ).
:::
:::

:::exercise label="Exercice 5" title="Exercice 5 (2 points)"
**Question 1 :** Erreur de compilation sur `Bien b = new Bien(...);`.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse 1 :** La classe `Bien` est dÃ©clarÃ©e comme `abstract`. Une classe abstraite ne peut pas Ãªtre instanciÃ©e directement avec `new`.
:::

**Question 2 :** Concernant la mÃ©thode `toString`, comment qualifier cette mÃ©thode ?.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse 2 :** C'est une **redÃ©finition** (Overriding). L'annotation `@Override` indique que la classe `Bien` fournit sa propre implÃ©mentation de la mÃ©thode `toString()` hÃ©ritÃ©e de la super-classe mÃ¨re universelle `Object`.
:::
:::

:::exercise label="Exercice 6" title="Exercice 6 (3 points)"
**Question a :** Expliquer la cause de l'erreur sur `System.out.println("" + b.getSurface());`.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse a :** La variable `b` est dÃ©clarÃ©e avec le type de rÃ©fÃ©rence `Bien`. Lors de la compilation, le compilateur vÃ©rifie les mÃ©thodes disponibles pour le type de rÃ©fÃ©rence. Or, la mÃ©thode `getSurface()` n'est pas dÃ©finie dans la classe `Bien` , elle n'existe que dans la classe fille `Maison`.
:::

**Question b :** Proposer un correctif.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse b :** On peut procÃ©der Ã  un "cast" (transtypage) pour indiquer au compilateur que l'objet pointÃ© est bien une `Maison`.

```java
System.out.println("" + ((Maison) b).getSurface());
// Alternative : dÃ©clarer b en tant que Maison
// Maison b = new Maison(1, "Villa Magnifico", "Valence", 1000);
```
:::
:::

:::exercise label="Exercice 7" title="Exercice 7 (3 points)"
**Question 1 :** Expliquer l'erreur dans la classe `Maison`.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse 1 :** La classe `Maison` hÃ©rite de la classe `Bien`. La classe `Bien` possÃ¨de une mÃ©thode abstraite `addTarif(Tarif newTarif)`. Puisque `Maison` est une classe concrÃ¨te, elle est dans l'obligation d'implÃ©menter (redÃ©finir) toutes les mÃ©thodes abstraites hÃ©ritÃ©es de sa classe mÃ¨re.
:::

**Question 2 :** Apporter un correctif (code Ã  ajouter dans la classe `Maison`).

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse 2 :**

```java
@Override
public void addTarif(Tarif newTarif) {
    // Code d'ajout du tarif
}
```
:::
:::

:::exercise label="Exercice 8" title="Exercice 8 (3 points)"
**Question 1 :** Erreur Ã  l'exÃ©cution et correctif.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse 1 :** L'erreur est une `NullPointerException`. La variable `mesBiens` est dÃ©clarÃ©e mais n'a pas Ã©tÃ© initialisÃ©e (elle vaut `null`). Quand on tente d'appeler `mesBiens.add(...)`, le programme plante.
:::

:::block type="method" title="Correction et raisonnement"
**Correctif :**

```java
ArrayList mesBiens = new ArrayList<>();
```
:::

**Question 2 :** ComplÃ©ter le programme pour afficher les maisons dont la ville est "Valence" et leur surface.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse 2 :** Il faut parcourir la liste, vÃ©rifier avec `instanceof` que le bien est une maison, puis vÃ©rifier la ville.

```java
for (Bien b : mesBiens) {
    // On verifie que c'est une Maison pour pouvoir caster et acceder a la surface
    if (b instanceof Maison) {
        if ("Valence".equals(b.getVille())) {
            Maison m = (Maison) b;
            System.out.println("Maison : " + m.getNom() + " | Surface : " + m.getSurface());
        }
    }
}
```
:::
:::
