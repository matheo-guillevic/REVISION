---
title: IN361-JAVA
subject: IN361-JAVA
type: course
---

:::section id="java-intro" eyebrow="IN361-JAVA" title="Comprendre les concepts avant les automatismes" summary="Ce cours est organise autour des bases du langage, des collections, puis de la programmation orientee objet en Java."
:::dashboard
:::card class="priority-card" kicker="Objectif"
Savoir lire, ecrire et expliquer un programme Java simple, puis structurer le code avec classes, objets, heritage, interfaces et exceptions.
:::

:::card class="priority-card" kicker="Reflexe"
Java est fortement type : avant d'ecrire une instruction, on se demande toujours quel est le type manipule, qui possede l'etat, et quelle methode exprime l'action.
:::
:::

:::quicklinks
- [Bases](#java-bases)
- [Collections](#java-collections)
- [Objet](#java-objet)
- [Exceptions](#java-exceptions)
- [Examens](#IN361-JAVA-exams)
:::
:::

:::section id="java-bases" eyebrow="Chapitre 1" title="Les bases du langage Java" summary="Un programme Java est compose de classes. Le point d'entree classique est une methode main."
:::grid
:::block type="definition" title="Structure minimale"
Le nom du fichier doit correspondre au nom de la classe publique. Dans `Main.java`, on declare donc `public class Main`.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour Java");
    }
}
```
:::

:::block type="method" title="Compilation et execution"
*   `javac Main.java` compile le fichier source en bytecode.
*   `java Main` lance la classe compilee.
*   La JVM execute le bytecode, ce qui rend Java portable entre machines.
:::

:::block type="definition" title="Types primitifs et references"
Les types primitifs stockent directement une valeur. Les types reference stockent une reference vers un objet.

```java
int age = 20;
double moyenne = 14.5;
boolean valide = true;
char initiale = 'A';

String nom = "Ada"; // String est un objet
```
:::

:::block type="warning" title="Difference importante"
`==` compare les valeurs primitives, mais compare les references pour les objets. Pour comparer deux chaines, on utilise `equals`.

```java
String a = "java";
String b = new String("java");

System.out.println(a == b);      // false : references differentes
System.out.println(a.equals(b)); // true : contenu identique
```
:::
:::

:::grid
:::block type="theorem" title="Conditions"
Une condition choisit un chemin d'execution selon une expression booleenne.

```java
int note = 12;

if (note >= 10) {
    System.out.println("Valide");
} else {
    System.out.println("A retravailler");
}
```
:::

:::block type="theorem" title="Boucles"
On utilise `for` quand le nombre d'iterations est connu, et `while` quand il depend d'une condition.

```java
for (int i = 0; i < 3; i++) {
    System.out.println(i);
}

int n = 3;
while (n > 0) {
    n--;
}
```
:::

:::block type="method" title="Methodes"
Une methode isole une action nommee. Elle peut recevoir des parametres et retourner une valeur.

```java
static int carre(int x) {
    return x * x;
}

int resultat = carre(5); // 25
```
:::

:::block type="remember" title="A retenir"
Une variable a un type, une portee et une duree de vie. Une methode doit avoir une responsabilite claire.
:::
:::
:::

:::section id="IN361-JAVA-exams" eyebrow="Entrainement" title="Examens Java corriges" summary="Pages maintenues en Markdown avec corrections structurees."
:::dashboard
:::card class="chapter-card" pill="6 problemes" title="Examen IN361-JAVA 2026" href="IN361-JAVA-exam-2026.html" link="Ouvrir l'examen"
Gestion de location, tri de nombres, heritage, composition, constructeurs, exceptions et analyse de code.
:::

:::card class="chapter-card" pill="6 exercices" title="Examen IN361-JAVA 1" href="IN361-JAVA-exam-1.html" link="Ouvrir l'examen"
Questions de cours, classes, methodes et premiers modeles objet.
:::

:::card class="chapter-card" pill="8 exercices" title="Examen IN361-JAVA 2" href="IN361-JAVA-exam-2.html" link="Ouvrir l'examen"
Entrainement sur les objets, les collections et les raisonnements de code.
:::

:::card class="chapter-card" pill="9 exercices" title="Examen IN361-JAVA 3" href="IN361-JAVA-exam-3.html" link="Ouvrir l'examen"
Cas de programmation objet, heritage, interfaces et corrections commentees.
:::

:::card class="chapter-card" pill="9 exercices" title="Examen IN361-JAVA 4" href="IN361-JAVA-exam-4.html" link="Ouvrir l'examen"
Synthese de revision avec exercices complets et reponses detaillees.
:::
:::
:::

:::section id="java-collections" eyebrow="Chapitre 2" title="La gestion des collections" summary="Les collections servent a stocker plusieurs objets dans une structure adaptee au besoin : liste, ensemble ou association cle/valeur."
:::grid
:::block type="definition" title="List"
Une `List` garde l'ordre d'insertion et accepte les doublons. `ArrayList` est le choix courant pour parcourir et acceder par indice.

```java
import java.util.ArrayList;
import java.util.List;

List<String> noms = new ArrayList<>();
noms.add("Ada");
noms.add("Linus");
noms.add("Ada");

System.out.println(noms.get(0)); // Ada
```
:::

:::block type="definition" title="Set"
Un `Set` represente un ensemble : il evite les doublons. `HashSet` ne garantit pas l'ordre.

```java
import java.util.HashSet;
import java.util.Set;

Set<String> langages = new HashSet<>();
langages.add("Java");
langages.add("Python");
langages.add("Java");

System.out.println(langages.size()); // 2
```
:::

:::block type="definition" title="Map"
Une `Map` associe une cle a une valeur. Elle est utile pour chercher rapidement une information par identifiant.

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> notes = new HashMap<>();
notes.put("Ada", 18);
notes.put("Linus", 16);

int noteAda = notes.get("Ada");
```
:::

:::block type="warning" title="Generics"
Les chevrons indiquent le type contenu dans la collection. Ils evitent les conversions fragiles et rendent les erreurs visibles a la compilation.

```java
List<Integer> nombres = new ArrayList<>();
nombres.add(10);
// nombres.add("dix"); // erreur de compilation
```
:::
:::

:::grid
:::block type="method" title="Parcourir une collection"
La boucle for-each lit les elements sans manipuler d'indice.

```java
for (String nom : noms) {
    System.out.println(nom.toUpperCase());
}
```
:::

:::block type="method" title="Choisir la bonne collection"
*   **Besoin d'ordre et d'indices** : `List`.
*   **Besoin d'unicite** : `Set`.
*   **Besoin de retrouver par cle** : `Map`.
:::
:::
:::

:::section id="java-objet" eyebrow="Chapitres 3 et 4" title="Les bases de l'approche objet et de la programmation objet Java" summary="L'approche objet consiste a modeliser un probleme avec des objets qui possedent un etat et exposent des comportements."
:::grid
:::block type="definition" title="Classe et objet"
Une classe est un modele. Un objet est une instance concrete de cette classe.

```java
class Compte {
    private String titulaire;
    private double solde;

    Compte(String titulaire, double soldeInitial) {
        this.titulaire = titulaire;
        this.solde = soldeInitial;
    }

    void deposer(double montant) {
        solde += montant;
    }

    double getSolde() {
        return solde;
    }
}
```
:::

:::block type="method" title="Utiliser un objet"
On construit un objet avec `new`, puis on appelle ses methodes avec le point.

```java
Compte compte = new Compte("Ada", 100.0);
compte.deposer(50.0);

System.out.println(compte.getSolde()); // 150.0
```
:::

:::block type="theorem" title="Encapsulation"
Les attributs sont souvent `private` pour proteger l'etat interne. On expose seulement les operations utiles.

```java
public void retirer(double montant) {
    if (montant <= 0) {
        return;
    }
    if (montant <= solde) {
        solde -= montant;
    }
}
```
:::

:::block type="remember" title="Constructeur et this"
Le constructeur initialise un objet coherent. `this` designe l'objet courant, utile quand un parametre porte le meme nom qu'un attribut.
:::
:::

:::grid
:::block type="warning" title="Static ou instance ?"
Un membre `static` appartient a la classe. Un membre non static appartient a chaque objet.

```java
class Etudiant {
    static int compteur = 0;
    private String nom;

    Etudiant(String nom) {
        this.nom = nom;
        compteur++;
    }
}
```
:::

:::block type="method" title="Redefinir toString"
`toString` donne une representation textuelle utile pour l'affichage et le debug.

```java
@Override
public String toString() {
    return titulaire + " : " + solde + " euros";
}
```
:::
:::
:::

:::section id="java-heritage" eyebrow="Chapitre 5" title="L'heritage" summary="L'heritage permet de specialiser une classe existante. La classe fille recupere les comportements de la classe mere et peut les adapter."
:::grid
:::block type="definition" title="extends"
Une classe fille declare son parent avec `extends`. En Java, une classe ne peut heriter que d'une seule classe.

```java
class Animal {
    void parler() {
        System.out.println("...");
    }
}

class Chien extends Animal {
    @Override
    void parler() {
        System.out.println("Wouf");
    }
}
```
:::

:::block type="theorem" title="Polymorphisme"
Une variable du type parent peut referencer un objet enfant. La methode executee est celle de l'objet reel.

```java
Animal animal = new Chien();
animal.parler(); // Wouf
```
:::

:::block type="method" title="super"
`super` permet d'appeler le constructeur ou une methode de la classe mere.

```java
class Personne {
    protected String nom;

    Personne(String nom) {
        this.nom = nom;
    }
}

class Enseignant extends Personne {
    Enseignant(String nom) {
        super(nom);
    }
}
```
:::

:::block type="warning" title="Quand eviter l'heritage"
On n'herite pas pour reutiliser quelques lignes. On herite quand il existe une vraie relation "est un". Sinon, on prefere contenir un objet comme attribut.
:::
:::
:::

:::section id="java-interfaces" eyebrow="Chapitre 6" title="Les interfaces" summary="Une interface decrit un contrat : les methodes qu'une classe promet de fournir."
:::grid
:::block type="definition" title="Contrat de comportement"
Une classe utilise `implements` pour respecter une interface. Contrairement a l'heritage de classe, une classe peut implementer plusieurs interfaces.

```java
interface Exportable {
    String exporter();
}

class Facture implements Exportable {
    private final int numero;

    Facture(int numero) {
        this.numero = numero;
    }

    @Override
    public String exporter() {
        return "Facture #" + numero;
    }
}
```
:::

:::block type="theorem" title="Programmer contre une interface"
Le code devient plus souple : il depend du contrat, pas d'une implementation precise.

```java
void imprimer(Exportable document) {
    System.out.println(document.exporter());
}
```
:::

:::block type="method" title="Exemple standard : Comparable"
`Comparable` permet de definir l'ordre naturel d'un objet.

```java
class Note implements Comparable<Note> {
    private final int valeur;

    Note(int valeur) {
        this.valeur = valeur;
    }

    @Override
    public int compareTo(Note autre) {
        return Integer.compare(this.valeur, autre.valeur);
    }
}
```
:::

:::block type="remember" title="Interface vs classe abstraite"
Une interface exprime surtout une capacite. Une classe abstraite factorise une base commune avec eventuellement de l'etat partage.
:::
:::
:::

:::section id="java-exceptions" eyebrow="Chapitre 7" title="La gestion des exceptions" summary="Une exception signale une situation anormale. Elle permet de separer le code nominal du code de traitement d'erreur."
:::grid
:::block type="definition" title="try, catch, finally"
On place le code risquÃ© dans `try`, le traitement dans `catch`, et le nettoyage dans `finally` si necessaire.

```java
try {
    int valeur = Integer.parseInt("42");
    System.out.println(valeur);
} catch (NumberFormatException e) {
    System.out.println("Nombre invalide");
} finally {
    System.out.println("Fin du traitement");
}
```
:::

:::block type="theorem" title="Checked et unchecked"
*   **Checked exception** : le compilateur oblige a la traiter ou a la declarer avec `throws`.
*   **Unchecked exception** : herite de `RuntimeException`, souvent liee a une erreur de programmation.
:::

:::block type="method" title="Lancer une exception"
On lance une exception quand une methode ne peut pas respecter son contrat.

```java
void retirer(double montant) {
    if (montant <= 0) {
        throw new IllegalArgumentException("Montant invalide");
    }
    if (montant > solde) {
        throw new IllegalStateException("Solde insuffisant");
    }
    solde -= montant;
}
```
:::

:::block type="warning" title="Bonne pratique"
Ne capture pas une exception pour l'ignorer. Soit tu sais corriger la situation, soit tu laisses l'appelant decider.
:::
:::

:::block type="neutral" title="Synthese"
*   Le langage Java impose de penser en types.
*   Les collections structurent les groupes d'objets.
*   L'objet regroupe etat et comportements.
*   L'heritage specialise ; l'interface contractualise.
*   Les exceptions rendent les erreurs explicites.
:::
:::
