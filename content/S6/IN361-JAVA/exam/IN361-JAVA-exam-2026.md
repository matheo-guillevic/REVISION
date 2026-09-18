---
title: "Examen IN361-JAVA 2026"
subject: "IN361-JAVA"
type: "exam"
target: "IN361-JAVA-exam-2026.html"
eyebrow: "IN360 - Examen 2026"
heading: "Correction examen IN361-JAVA 2026"
summary: "Gestion de location, tri de nombres, heritage, composition, constructeurs, exceptions et analyse de code."
---
:::exercise label="Probleme 1" title="ProblÃ¨me 1 - Gestion de location"
Vous Ãªtes loueur de voiture. Vous souhaitez informatiser la gestion de votre magasin. Chaque vÃ©hicule possÃ¨de 3 caractÃ©ristiques : un numÃ©ro d'immatriculation (9 caractÃ¨res, unique), un poids en kg, et un nombre total de places. Vous louez 3 types de vÃ©hicules : des voitures (on gÃ¨re le nombre de places enfants), des camions (on gÃ¨re la charge utile en kg) et des motos (on gÃ¨re la cylindrÃ©e). Chaque vÃ©hicule appartient Ã  une catÃ©gorie (qui dÃ©termine le prix Ã  la journÃ©e).

#### Questions 1 et 2

Donnez le code des classes `Categorie`, `Vehicule`, `Camion`, `Moto`, `Voiture`. La classe `Vehicule` doit contenir une mÃ©thode `getPrixLocation(int nbJour)`.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : CrÃ©ation de la classe Categorie.**
 Il s'agit d'une classe simple agissant comme un conteneur de donnÃ©es pour le nom et le prix.
:::

```java
public class Categorie {
    private String nom;
    private double prixJour;

    public Categorie(String nom, double prixJour) {
        this.nom = nom;
        this.prixJour = prixJour;
    }
    public double getPrixJour() { return prixJour; }
}
```

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 2 : CrÃ©ation de la super-classe Vehicule.**
 On la dÃ©clare abstraite car un "VÃ©hicule" gÃ©nÃ©rique n'est pas censÃ© Ãªtre instanciÃ© directement.
:::

```java
public abstract class Vehicule {
    protected String immatriculation;
    protected double poids;
    protected int nbPlaces;
    protected Categorie categorie;

    public Vehicule(String imm, double p, int nb, Categorie c) {
        this.immatriculation = imm;
        this.poids = p;
        this.nbPlaces = nb;
        this.categorie = c;
    }

    public String getImmatriculation() { return immatriculation; }

    public double getPrixLocation(int nbJour) {
        return categorie.getPrixJour() * nbJour;
    }
}
```

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 3 : CrÃ©ation des classes filles.**
 Elles hÃ©ritent de Vehicule et utilisent `super()` pour initialiser les attributs communs.
:::

```java
public class Voiture extends Vehicule {
    private int placesEnfants;

    public Voiture(String imm, double p, int nb, Categorie c, int pe) {
        super(imm, p, nb, c);
        this.placesEnfants = pe;
    }
}

// Le principe est exactement le meme pour Moto (cylindree) et Camion (chargeUtile).
```

#### Question 3

CrÃ©ez une classe `Parc` possÃ©dant les mÃ©thodes `addVehicule`, `removeVehicule`, `displayParc` et `getPrixTotalLocation`. Les ajouts/suppressions doivent gÃ©rer les exceptions en cas d'erreurs (doublons ou introuvables).

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : ImplÃ©mentation du Parc et gestion de la collection.**
 On utilise une `ArrayList` pour stocker les objets.
:::

```java
import java.util.ArrayList;

public class Parc {
    private ArrayList liste = new ArrayList<>();

    public void addVehicule(Vehicule v) {
        for(Vehicule existant : liste) {
            if(existant.getImmatriculation().equals(v.getImmatriculation())) {
                throw new RuntimeException("Vehicule deja existant");
            }
        }
        liste.add(v);
    }

    public void removeVehicule(String immat) {
        Vehicule vToRemove = null;
        for(Vehicule v : liste) {
            if(v.getImmatriculation().equals(immat)) {
                vToRemove = v;
                break;
            }
        }
        if(vToRemove == null) throw new RuntimeException("Vehicule introuvable");
        liste.remove(vToRemove);
    }

    public double getPrixTotalLocation(int nbJour) {
        double total = 0;
        for(Vehicule v : liste) total += v.getPrixLocation(nbJour);
        return total;
    }
}
```
:::

:::exercise label="Probleme 2" title="ProblÃ¨me 2 - Tri de nombres"
Ã‰crire un programme qui lit une suite de nombres au clavier et qui les affiche ensuite triÃ©s par ordre croissant. Le nombre de nombres sera fourni au dÃ©part.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Utilisation du Scanner et des tableaux.**
 On importe `Scanner` pour la lecture et `Arrays` pour le tri automatique.
:::

```java
import java.util.Scanner;
import java.util.Arrays;

public class Tri {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Combien de nombres ? ");
        int nbl = sc.nextInt();

        int[] tab = new int[nbl];
        System.out.println("Donnez vos nombres :");
        for(int i=0; i<nbl; i++) {
            tab[i] = sc.nextInt();
        }

        Arrays.sort(tab);

        System.out.println("Liste par ordre croissant :");
        for(int val : tab) {
            System.out.print(val + " ");
        }
        sc.close();
    }
}
```
:::

:::exercise label="Probleme 3" title="ProblÃ¨me 3 - HÃ©ritage vs Composition"
On dispose d'une classe `Point(x, y)`. Ã‰crire une classe `Cercle` avec constructeur, `deplaceCentre`, `changeRayon`, `getCentre` et `affiche`.

- Question 1 : Comme classe dÃ©rivÃ©e de Point.
- Question 2 : PossÃ©dant un membre de type Point.

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : HÃ©ritage (Cercle EST UN Point).**
:::

```java
public class Cercle extends Point {
    private double rayon;

    public Cercle(double x, double y, double r) {
        super(x, y);
        this.rayon = r;
    }

    public void deplaceCentre(double dx, double dy) {
        super.deplace(dx, dy);
    }

    public Point getCentre() {
        return new Point(getX(), getY());
    }
}
```

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 2 : Composition (Cercle A UN Point).**
:::

```java
public class Cercle {
    private Point centre;
    private double rayon;

    public Cercle(double x, double y, double r) {
        this.centre = new Point(x,y);
        this.rayon = r;
    }

    public void deplaceCentre(double dx, double dy) {
        centre.deplace(dx, dy);
    }

    public Point getCentre() {
        return centre;
    }
}
```
:::

:::exercise label="Probleme 4" title="ProblÃ¨me 4 - Constructeurs"
On donne les classes `A` et `B extends A`. Quel est le rÃ©sultat de l'exÃ©cution ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Trace de l'exÃ©cution.**
 Lors de l'appel Ã  `new A(5)`, les attributs sont d'abord initialisÃ©s (`n=0, p=10`) puis le constructeur est exÃ©cutÃ©.
 Lors de l'appel Ã  `new B(5, 3)`, le constructeur de B appelle `super(n)` avant d'exÃ©cuter le reste de son code. L'attribut `q` de B est initialisÃ© Ã  25.
 **Sortie Console :**
 `ENA n=0 p=10`
 `SOA n=5 p=10`
 `ENA n=0 p=10`
 `SOA n=5 p=10`
 `ENB n=5 p=10 q=25`
 `SOB n=5 p=3 q=25`
:::
:::

:::exercise label="Probleme 5" title="ProblÃ¨me 5 - Exceptions"
On donne un programme effectuant une boucle `for(i=0; i<=3; i++)` qui appelle une mÃ©thode jetant des exceptions `Erreur1`, `Erreur2` et `Erreur` selon la valeur de `i`. Quel est le rÃ©sultat ?

:::block type="method" title="Correction et raisonnement"
**Ã‰tape 1 : Analyse des itÃ©rations.**
 - \(i=0\) : Aucune erreur, imprime "-----".
 - \(i=1\) : `Erreur1` jetÃ©e. AttrapÃ©e dans `fn()`, affiche "fn1". Fin de boucle, affiche "-----".
 - \(i=2\) : `Erreur2` jetÃ©e. `Erreur2` hÃ©rite d'`Erreur`. AttrapÃ©e dans `fn()` par le bloc `catch(Erreur)`, affiche "fn0", puis est relancÃ©e (`throw e;`). AttrapÃ©e dans le `main` par le bloc `catch(Erreur2)`, affiche "main2". Affiche "-----".
 - \(i=3\) : `Erreur` jetÃ©e. AttrapÃ©e dans `fn()`, affiche "fn0", relancÃ©e. AttrapÃ©e dans le `main` par `catch(Erreur)`, affiche "main0". Affiche "-----". A la fin, "fin".

**Sortie Console :**
 `-----`
 `fn1`
 `-----`
 `fn0`
 `main2`
 `-----`
 `fn0`
 `main0`
 `-----`
 `fin`
:::
:::

:::exercise label="Probleme 6" title="ProblÃ¨me 6 - Analyse de code"
Pour 12 petits extraits de code, indiquer s'il compile, s'il s'exÃ©cute, et donner sa sortie (ou l'erreur).

:::block type="method" title="Correction et raisonnement"
**Question 1 :**
 Compile : Oui. ExÃ©cution : Oui. **Sortie :** `B` (Polymorphisme : appel de la mÃ©thode de l'objet rÃ©el).

**Question 2 :**
 Compile : **Non**. IncompatibilitÃ© de type : la rÃ©fÃ©rence `B` (fille) ne peut pas instancier un objet `A` (mÃ¨re).

**Question 3 :**
 Compile : **Non**. La mÃ©thode `f(int)` n'est pas dÃ©finie dans la classe `A` (qui est le type de dÃ©claration de la rÃ©fÃ©rence).

**Question 4 :**
 Compile : **Non**. IncompatibilitÃ© de type : une rÃ©fÃ©rence de type `B` ne peut pas pointer vers une instance de type `A`.

**Question 5 :**
 Compile : Oui. ExÃ©cution : **Non**. `NullPointerException` (Appel de la mÃ©thode `length()` sur une String nulle).

**Question 6 :**
 Compile : Oui. ExÃ©cution : **Non**. Boucle infinie car la variable `i` n'est jamais incrÃ©mentÃ©e dans le `while`.

**Question 7 :**
 Compile : Oui. ExÃ©cution : Oui. **Sortie :** `A` puis `B` (Appel Ã  `super.afficher()` depuis la classe fille).

**Question 8 :**
 Compile : Oui. ExÃ©cution : Oui. **Sortie :** `Erreur` puis `Finally`.

**Question 9 :**
 Compile : **Non**. La variable `c` est dÃ©clarÃ©e `final` et ne peut donc Ãªtre affectÃ©e qu'une seule fois (erreur Ã  la ligne du second `c=a+b;`).

**Question 10 :**
 Compile : Oui. ExÃ©cution : Oui. **Sortie :**
 `true` / `true` / `true` (Un Chien est un Animal, un Mammifere et un Chien).
 `true` / `true` / `true` (Idem pour la rÃ©fÃ©rence Mammifere).
 `false` (Un Animal pur n'est pas une instance de Chien).

**Question 11 :**
 Compile : Oui. ExÃ©cution : Oui. **Sortie :**
 `Indice 0 -> 0` (jusqu'Ã  Indice 4 -> 40)
 `[0, 10, 30, 40]`
 `[1, 11, 31, 41]`

**Question 12 :**
 Compile : Oui. ExÃ©cution : Oui. **Sortie :** `a.x = 2.0 a.y=3.0` (Le passage de paramÃ¨tre se fait par valeur de la rÃ©fÃ©rence, la rÃ©affectation locale dans `fn1` ne modifie pas l'objet original dans le `main`).
:::

\vfill

JL Koning, E. Brun, JB Caignaert, S. Grivolat Esisar Page \thepage
:::
