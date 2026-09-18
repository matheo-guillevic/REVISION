---
title: "Examen IN361-JAVA 3"
subject: "IN361-JAVA"
type: "exam"
target: "IN361-JAVA-exam-3.html"
eyebrow: "IN361 - Examen 3"
heading: "Examen IN361-JAVA 3"
summary: "Programmation objet, interfaces, heritage et exceptions."
---
:::exercise label="Exercice 1" title="Exercice 1 (2 points)"
**Question a :** Indiquer la ligne mise en cause et en expliquer la raison.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :** L'erreur de compilation se trouve Ã  la ligne : `Math m = new Math();`. La raison est que le constructeur de la classe `Math` est explicitement dÃ©clarÃ© comme privÃ© (\texttt{private Math() \{\}}). Il est donc impossible d'instancier un objet de cette classe depuis l'extÃ©rieur. De plus, `PI` est une variable statique.
:::

**Question b :** Proposer un correctif.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse :** Puisque la constante `PI` est statique, on doit l'appeler directement depuis la classe.

```java
double r = 10;
double perimetre = 2 * Math.PI * r;
```
:::
:::

:::exercise label="Exercice 2" title="Exercice 2 (2 points)"
**Question :** Modifier cette classe de faÃ§on Ã  la rendre non dÃ©rivable.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :** Pour empÃªcher l'hÃ©ritage d'une classe en Java, il faut utiliser le mot-clÃ© `final` dans sa dÃ©claration.

```java
public final class Materiel {
    // ...
}
```
:::
:::

:::exercise label="Exercice 3" title="Exercice 3 (1 point)"
**Question :** Expliquez l'erreur de compilation et proposez un correctif.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :** La mÃ©thode `main` censÃ©e Ãªtre le point d'entrÃ©e du programme a une mauvaise signature. Elle doit prendre en paramÃ¨tre un tableau de chaÃ®nes de caractÃ¨res (`String[]`). Le code actuel indique `String args` (une simple chaÃ®ne) au lieu de `String[] args`.

```java
public static void main(String[] args) {
    int a = 0;
    System.out.println("" + a);
}
```
:::
:::

:::exercise label="Exercice 4" title="Exercice 4 (2 points)"
**Question :** Expliquer la diffÃ©rence en Java entre `int` et `Integer`. Quel nom est donnÃ© aux classes `Integer`, `Double`, `Boolean` ? Quel est l'intÃ©rÃªt ?

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :**

- **DiffÃ©rence :** `int` est un type primitif (valeur stockÃ©e en mÃ©moire), tandis que `Integer` est un objet (rÃ©fÃ©rence vers un espace mÃ©moire encapsulant un entier).
- **Nom :** Ce sont des **classes enveloppes** (ou *Wrapper classes* en anglais).
- **IntÃ©rÃªt :** Elles permettent de manipuler des types primitifs comme des objets. C'est indispensable pour utiliser les collections gÃ©nÃ©riques en Java (comme `ArrayList`) qui n'acceptent que des objets. De plus, ces classes fournissent des mÃ©thodes utilitaires pratiques (ex: `Integer.parseInt()`).
:::
:::

:::exercise label="Exercice 5" title="Exercice 5 (3 points)"
**Question a :** DiffÃ©rence entre redÃ©finition et surcharge.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse :**

- **RedÃ©finition (Overriding) :** Consiste Ã  rÃ©Ã©crire une mÃ©thode hÃ©ritÃ©e d'une classe mÃ¨re en gardant **exactement la mÃªme signature** (nom, type de retour et paramÃ¨tres).
- **Surcharge (Overloading) :** Consiste Ã  crÃ©er plusieurs mÃ©thodes portant le **mÃªme nom mais avec des paramÃ¨tres diffÃ©rents** (nombre ou type) au sein de la mÃªme classe (ou hÃ©ritÃ©e).
:::

**Question b :** Dans `MaterielSki`, indiquer la mÃ©thode redÃ©finie et surchargÃ©e.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse :**

- `public double getTarifJournee()` est la mÃ©thode **redÃ©finie** (elle Ã©crase celle de `Materiel`).
- `public double getTarifJournee(double coeff)` est la mÃ©thode **surchargÃ©e**.
:::
:::

:::exercise label="Exercice 6" title="Exercice 6 (3 points)"
**Question 1 :** Indiquer les erreurs et expliquer la raison.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :**

1. La mÃ©thode `getMarque()` est dÃ©clarÃ©e `abstract` mais possÃ¨de un corps (des accolades avec un return). Une mÃ©thode abstraite ne doit avoir qu'une signature terminÃ©e par un point-virgule.
2. La classe `Materiel` contient une mÃ©thode abstraite, elle doit donc obligatoirement Ãªtre dÃ©clarÃ©e abstraite (`public abstract class Materiel`).
:::

**Question 2 :** Apporter un correctif.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse :** L'attribut `marque` Ã©tant prÃ©sent dans la classe, le plus logique n'est pas de faire une mÃ©thode abstraite, mais une mÃ©thode concrÃ¨te classique. On retire simplement le mot-clÃ© `abstract`.

```java
public String getMarque() {
    return marque;
}
```
:::
:::

:::exercise label="Exercice 7" title="Exercice 7 (2 points)"
**Question :** Quel est le rÃ©sultat de ce programme ?

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :** GrÃ¢ce au polymorphisme (liaison dynamique), la mÃ©thode appelÃ©e est toujours celle du type rÃ©el de l'objet instanciÃ© en mÃ©moire. Si la mÃ©thode n'est pas redÃ©finie, c'est celle de la classe mÃ¨re qui est utilisÃ©e.

- `a = new A(); a.affiche();` \(\rightarrow\) **Je suis un A **
- `b = new B(); b.affiche();` \(\rightarrow\) **Je suis un A ** (B hÃ©rite de A, pas de redÃ©finition)
- `a = b; a.affiche();` \(\rightarrow\) **Je suis un A **
- `c = new C(); c.affiche();` \(\rightarrow\) **Je suis un C** (C redÃ©finit la mÃ©thode)
- `a = c; a.affiche();` \(\rightarrow\) **Je suis un C**
- `d = new D(); d.affiche();` \(\rightarrow\) **Je suis un D** (D redÃ©finit)
- `a = d; a.affiche(); c = d; c.affiche();` \(\rightarrow\) **Je suis un D** \newline **Je suis un D**
- `e = new E(); e.affiche();` \(\rightarrow\) **Je suis un A ** (E hÃ©rite de B qui hÃ©rite de A)
- `a = e; a.affiche(); b = e; b.affiche();` \(\rightarrow\) **Je suis un A ** \newline **Je suis un A **
- `f = new F(); f.affiche();` \(\rightarrow\) **Je suis un C** (F hÃ©rite de C qui a sa redÃ©finition)
- `a = f; a.affiche(); c = f; c.affiche();` \(\rightarrow\) **Je suis un C** \newline **Je suis un C**
:::
:::

:::exercise label="Exercice 8" title="Exercice 8 (3 points)"
**Question 1 :** RedÃ©finir la mÃ©thode `equals` dans `Materiel`.

```java
@Override
public boolean equals(Object obj) {
    if (this == obj) return true; // Meme reference
    if (obj == null || getClass() != obj.getClass()) return false;
    Materiel m = (Materiel) obj;
    // Meme marque et meme tarif
    return Double.compare(m.tarifJournee, tarifJournee) == 0 &&
           (marque != null ? marque.equals(m.marque) : m.marque == null);
}
```

**Question 2 :** Indiquer pour chaque affichage la valeur indiquÃ©e et expliquer.

- `m1.equals(m4)` \(\rightarrow\) **false** (Marques diffÃ©rentes : "rossignol" vs "Nordica").
- `m1 == m2` \(\rightarrow\) **false** (`==` compare les adresses mÃ©moire. Ce sont deux instances distinctes avec `new`).
- `m1 == m3` \(\rightarrow\) **true** (`m3` est une copie de la rÃ©fÃ©rence de `m1`, ils pointent vers la mÃªme adresse mÃ©moire).
- `m1.equals(m2)` \(\rightarrow\) **true** (Ils sont identiques du point de vue de notre mÃ©thode redÃ©finie : mÃªme marque "rossignol" et mÃªme tarif 10).
:::

:::exercise label="Exercice 9" title="Exercice 9 (3 points)"
**Question 1 :** Erreur Ã  l'exÃ©cution et correctif.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :** Le programme lance une `NullPointerException` car la liste `lesMateriels` est dÃ©clarÃ©e mais n'est jamais instanciÃ©e. Elle vaut `null` au moment de l'appel `lesMateriels.add(...)`.

```java
ArrayList lesMateriels = new ArrayList<>();
```
:::

**Question 2 :** Afficher le catalogue en appliquant 20% de rÃ©duction sur les skis.

:::block type="method" title="Correction et raisonnement"
**RÃ©ponse et Raisonnement :** On utilise `instanceof` pour vÃ©rifier si l'objet est un Ã©quipement de ski. Si c'est le cas, on le caste pour appeler la mÃ©thode surchargÃ©e avec le coefficient `0.8` (ce qui Ã©quivaut Ã  -20%).

```java
for (Materiel m : lesMateriels) {
    if (m instanceof MaterielSki) {
        MaterielSki ms = (MaterielSki) m;
        // La methode surchagee applique un multiplicateur (ex: 0.8 pour -20%)
        double tarifPromo = ms.getTarifJournee(0.8);
        System.out.println(ms.toString() + " PROMO!!" + tarifPromo);
    } else {
        System.out.println(m.toString());
    }
}
```
:::
:::
