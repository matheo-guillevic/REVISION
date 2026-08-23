---
title: "Examen IN361-JAVA 1"
subject: "IN361-JAVA"
type: "exam"
target: "IN361-JAVA-exam-1.html"
eyebrow: "IN361 - Examen 1"
heading: "Examen IN361-JAVA 1"
summary: "Programmation orientee objet, heritage, polymorphisme et classes."
---
:::exercise label="Exercice 1" title="Exercice 1 (3 points)"
**Question :** Quel est le rÃ©sultat de ce programme?

:::block type="method" title="Correction et raisonnement"
**RÃ©sultat et Raisonnement :** Le programme illustre les principes d'hÃ©ritage et de polymorphisme (liaison dynamique).

- `A a = new A(); a.affiche();` \(\rightarrow\) **Je suis un A**
- `B b = new B(); b.affiche();` \(\rightarrow\) **Je suis un A** (B hÃ©rite de A et ne redÃ©finit pas la mÃ©thode ).
- `C c = new C(); c.affiche();` \(\rightarrow\) **Je suis un C** (C redÃ©finit `affiche()` ).
- `a = c; a.affiche();` \(\rightarrow\) **Je suis un C** (Polymorphisme : `a` pointe vers une instance de `C` ).
- `D d = new D(); d.affiche();` \(\rightarrow\) **Je suis un D** (D redÃ©finit `affiche()` ).
- `a = d; a.affiche();` \(\rightarrow\) **Je suis un D** (`a` pointe vers `D` ).
- `c = d; c.affiche();` \(\rightarrow\) **Je suis un D** (`c` pointe vers `D` ).
- `E e = new E(); e.affiche();` \(\rightarrow\) **Je suis un A** (E hÃ©rite de B, qui hÃ©rite de A. Aucune ne redÃ©finit `affiche()` ).
- `a = e; a.affiche();` \(\rightarrow\) **Je suis un A** (`a` pointe vers `E` ).
- `b = e; b.affiche();` \(\rightarrow\) **Je suis un A** (`b` pointe vers `E` ).
- `F f = new F(); f.affiche();` \(\rightarrow\) **Je suis un C** (F hÃ©rite de C qui possÃ¨de sa propre mÃ©thode `affiche()` ).
- `a = f; a.affiche();` \(\rightarrow\) **Je suis un C** (`a` pointe vers `F` ).
- `c = f; c.affiche();` \(\rightarrow\) **Je suis un C** (`c` pointe vers `F` ).
:::
:::

:::exercise label="Exercice 2" title="Exercice 2 (4 points)"
#### Question 2.1

:::block type="method" title="Correction et raisonnement"
**Raisonnement :** CrÃ©ation d'une classe classique avec attributs privÃ©s, constructeur et accesseurs/mutateurs.

```java
public class TypPneu {
    private int diametre;
    private int largeur;
    private String marque;

    public TypPneu(int diametre, int largeur, String marque) {
        this.diametre = diametre;
        this.largeur = largeur;
        this.marque = marque;
    }

    // Getters et Setters
    public int getDiametre() { return diametre; }
    public void setDiametre(int diametre) { this.diametre = diametre; }

    public int getLargeur() { return largeur; }
    public void setLargeur(int largeur) { this.largeur = largeur; }

    public String getMarque() { return marque; }
    public void setMarque(String marque) { this.marque = marque; }
}
```
:::

#### Question 2.2

:::block type="method" title="Correction et raisonnement"
**Raisonnement :** La mÃ©thode `equals(Object o)` doit Ãªtre redÃ©finie pour comparer les valeurs et non les rÃ©fÃ©rences mÃ©moires.

```java
@Override
public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    TypPneu typPneu = (TypPneu) obj;
    return diametre == typPneu.diametre &&
           largeur == typPneu.largeur &&
           marque.equals(typPneu.marque);
}
```
:::

#### Question 2.3

:::block type="method" title="Correction et raisonnement"
**Raisonnement :** CrÃ©ation de la classe `TypVoiture` avec composition (elle contient un objet `TypPneu`).

```java
public class TypVoiture {
    private String marque;
    private String modele;
    private TypPneu pneu;

    public TypVoiture(String marque, String modele, TypPneu pneu) {
        this.marque = marque;
        this.modele = modele;
        this.pneu = pneu;
    }

    // Getters et Setters
    public String getMarque() { return marque; }
    public void setMarque(String marque) { this.marque = marque; }

    public String getModele() { return modele; }
    public void setModele(String modele) { this.modele = modele; }

    public TypPneu getTypPneu() { return pneu; }
    public void setTypPneu(TypPneu pneu) { this.pneu = pneu; }
}
```
:::

#### Question 2.4

:::block type="method" title="Correction et raisonnement"
**Raisonnement :** Ajout d'une mÃ©thode validant les dimensions avant de remplacer le pneu.

```java
public void changementPneu(TypPneu tp) {
    if (this.pneu.getLargeur() == tp.getLargeur() &&
        this.pneu.getDiametre() == tp.getDiametre()) {
        this.pneu = tp;
    } else {
        throw new RuntimeException("Dimensions incompatibles");
    }
}
```
:::

#### Question 2.5

**Erreur : ** La mÃ©thode `changementPneu` est appelÃ©e sur la classe `TypVoiture` (`TypVoiture.changementPneu(p2);`) au lieu d'Ãªtre appelÃ©e sur l'instance `v1`. Le code correct serait : `v1.changementPneu(p2);`

#### Question 2.6

:::block type="method" title="Correction et raisonnement"
**Raisonnement :** `==` compare les rÃ©fÃ©rences mÃ©moires. `equals()` compare le contenu.

- `p1 == p2` \(\rightarrow\) **false** (DiffÃ©rentes instances en mÃ©moire).
- `p1 == p3` \(\rightarrow\) **false** (DiffÃ©rentes instances).
- `p1.equals(p2)` \(\rightarrow\) **false** (Marques diffÃ©rentes : "Michelin" \(\neq\) "Dunlop" ).
- `p1.equals(p3)` \(\rightarrow\) **false** (Dimensions diffÃ©rentes ).
- `p1 == p4` \(\rightarrow\) **false** (`p4` pointe vers `p3` ).
- `p3 == p4` \(\rightarrow\) **true** (MÃªme rÃ©fÃ©rence ).
- `p3.equals(p4)` \(\rightarrow\) **true** (MÃªme rÃ©fÃ©rence, donc mÃªme contenu).
- `v1.getTypPneu() == v2.getTypPneu()` \(\rightarrow\) **true** (Les deux voitures partagent l'objet `p1` ).
- `v1.getTypPneu() == v3.getTypPneu()` \(\rightarrow\) **false** (`p1` \(\neq\) `p3`).
- `v1.getTypPneu().equals(p2)` \(\rightarrow\) **false** (Ã‰quivaut Ã  `p1.equals(p2)`).
:::
:::

:::exercise label="Exercice 3" title="Exercice 3 (3 points)"
#### 3.1

On crÃ©e un objet en utilisant le mot-clÃ© `new` suivi de l'appel au constructeur de la classe (ex: `A a = new A();`).

#### 3.2

En Java, le dÃ©veloppeur ne supprime pas explicitement les objets. C'est le **Garbage Collector** (Ramasse-miettes) qui dÃ©truit automatiquement les objets en mÃ©moire lorsqu'ils ne sont plus rÃ©fÃ©rencÃ©s.

#### 3.3

Java est **Ã  la fois compilÃ© et interprÃ©tÃ©**. Le code source (.java) est d'abord compilÃ© en un code intermÃ©diaire appelÃ© **Bytecode** (.class). Ce bytecode est ensuite interprÃ©tÃ© (et souvent compilÃ© Ã  la volÃ©e, JIT) par la Machine Virtuelle Java (JVM) lors de l'exÃ©cution.

#### 3.4

Le mot-clÃ© `final` pour une variable indique qu'elle est une **constante**. Une fois initialisÃ©e, sa valeur ne peut plus Ãªtre modifiÃ©e. *Exemple :* `final double PI = 3.14159;` Si on tente de rÃ©assigner `PI = 3.14;`, le compilateur renverra une erreur.

#### 3.5

- **Classe abstraite :** Peut contenir des attributs (Ã©tat), des mÃ©thodes concrÃ¨tes et des constructeurs. Une classe ne peut hÃ©riter que d'une seule classe (abstraite ou non).
- **Interface :** Ne contient (traditionnellement) que des signatures de mÃ©thodes abstraites et des constantes (`public static final`). Une classe peut implÃ©menter plusieurs interfaces.
:::

:::exercise label="Exercice 4" title="Exercice 4 (3 points)"
```java
public abstract class Vehicule {
    protected String immatriculation; // Format AA-111-AA sur 9 caracteres
    protected int poids;
    protected int places;

    public Vehicule(String immatriculation, int poids, int places) {
        this.immatriculation = immatriculation;
        this.poids = poids;
        this.places = places;
    }
    // Getters et setters omis pour brevetÃ©
}

public class Voiture extends Vehicule {
    private int placesEnfants;

    public Voiture(String immatriculation, int poids, int places, int placesEnfants) {
        super(immatriculation, poids, places);
        this.placesEnfants = placesEnfants;
    }
}

public class Camion extends Vehicule {
    private int chargeUtile;

    public Camion(String immatriculation, int poids, int places, int chargeUtile) {
        super(immatriculation, poids, places);
        this.chargeUtile = chargeUtile;
    }
}

public class Moto extends Vehicule {
    private int cylindree;

    public Moto(String immatriculation, int poids, int places, int cylindree) {
        super(immatriculation, poids, places);
        this.cylindree = cylindree;
    }
}
```
:::

:::exercise label="Exercice 5" title="Exercice 5 (4 points)"
```java
public class Categorie {
    private char nom; // ex: 'A', 'B'...
    private double prixJour;

    public Categorie(char nom, double prixJour) {
        this.nom = nom;
        this.prixJour = prixJour;
    }
    public double getPrixJour() { return prixJour; }
}

// Modifications dans Vehicule
public abstract class Vehicule {
    // ... autres attributs (immatriculation, poids, places)
    protected Categorie categorie;

    public Vehicule(String immat, int poids, int places, Categorie categorie) {
        this.immatriculation = immat;
        this.poids = poids;
        this.places = places;
        this.categorie = categorie;
    }

    public double getPrixLocation(int nbJour) {
        return this.categorie.getPrixJour() * nbJour;
    }
}

// Exemple de modification du constructeur (idem pour Moto et Camion)
public class Voiture extends Vehicule {
    private int placesEnfants;
    public Voiture(String immat, int poids, int places, Categorie cat, int placesEnfants) {
        super(immat, poids, places, cat);
        this.placesEnfants = placesEnfants;
    }
}

// Classe de test
public class TestLocation {
    public static void main(String[] args) {
        Categorie catA = new Categorie('A', 50.0);
        Voiture v1 = new Voiture("AB-123-CD", 1200, 5, catA, 2);
        System.out.println("Prix pour 3 jours: " + v1.getPrixLocation(3));
    }
}
```
:::

:::exercise label="Exercice 6" title="Exercice 6 (3 points)"
```java
import java.util.ArrayList;
import java.util.List;

public class Parc {
    private List vehicules;

    public Parc() {
        this.vehicules = new ArrayList<>();
    }

    public void addVehicule(Vehicule v) {
        for (Vehicule existant : vehicules) {
            if (existant.immatriculation.equals(v.immatriculation)) {
                throw new RuntimeException("Vehicule deja existant");
            }
        }
        vehicules.add(v);
    }

    public void removeVehicule(String immat) {
        Vehicule aSupprimer = null;
        for (Vehicule v : vehicules) {
            if (v.immatriculation.equals(immat)) {
                aSupprimer = v;
                break;
            }
        }
        if (aSupprimer == null) {
            throw new RuntimeException("Vehicule introuvable");
        }
        vehicules.remove(aSupprimer);
    }

    public void displayParc() {
        for (Vehicule v : vehicules) {
            System.out.println("Immat: " + v.immatriculation +
                ", Prix jour: " + v.getPrixLocation(1));
            // L'ideal serait d'avoir une methode toString() dans Vehicule
        }
    }

    public double getPrixTotalLocation(int nbJour) {
        double total = 0;
        for (Vehicule v : vehicules) {
            total += v.getPrixLocation(nbJour);
        }
        return total;
    }
}
```
:::
