# EE-470 & EE-479 : Synthèse Globale et Fiches de Révision
**Capteurs, Instrumentation et Électronique de Conditionnement — Grenoble INP - Esisar**

Ce document regroupe la **synthèse condensée de toutes les leçons du cours**, conçue spécialement pour les révisions rapides d'examen. Il récapitule les concepts fondamentaux, les définitions métrologiques, les démonstrations clés, les équations mathématiques à connaître par cœur et les pièges classiques d'exercice.

---

## 📌 Fiche 0 : Principes Fondamentaux et Métrologie Statique (Intro & Leçon 1)

:::note
### 💡 Définitions à connaître sur le bout des doigts
*   **Mesurande ($m$ ou $x$)** : Grandeur physique, chimique ou biologique spécifique faisant l'objet de la mesure (ex. température $T$, pression $P$, déplacement $x$).
*   **Capteur** : Organe qui convertit le mesurande en un signal électrique mesurable (tension, courant, ou variation d'impédance).
*   **Corps d'épreuve** : Élément mécanique ou physique subissant directement l'action du mesurande pour le transformer en une grandeur secondaire intermédiaire (ex. membrane déformable convertissant une pression en déplacement).
*   **Transducteur** : Élément assurant la conversion de la grandeur intermédiaire en grandeur électrique primaire (ex. jauge de contrainte piézorésistive sur la membrane).
*   **Grandeur perturbatrice / d'influence ($a$)** : Grandeur parasite de l'environnement (ex. température ambiante, humidité, champ électromagnétique) modifiant indésirablement la réponse du capteur.
:::

### 1.1 Classification des Capteurs
1.  **Capteurs Actifs (Générateurs)** : Convertissent directement l'énergie du mesurande en énergie électrique (effet thermoélectrique, piézoélectrique, photovoltaïque, Hall, induction). Ne nécessitent pas d'alimentation extérieure pour produire le signal.
2.  **Capteurs Passifs (Modulateurs)** : Se comportent comme des impédances variables ($R, C, L$) sensibles au mesurande. Nécessitent un **conditionneur électrocinétique** muni d'une source d'énergie externe (ex. générateur de tension/courant) pour traduire la variation d'impédance en tension ou courant.

### 1.2 Caractéristiques Statiques et Qualité Métrologique
*   **Sensibilité ($S$)** : Pente de la courbe de réponse $y = f(x)$ :
    $$S(x) = \frac{dy}{dx} \quad \text{[Unité du signal / Unité du mesurande]}$$
    *Si le capteur est linéaire, $S = \text{constante}$.*
*   **Étendue de Mesure (EM / FS - Full Scale)** : Intervalle $[x_{min}, x_{max}]$ dans lequel le capteur fonctionne en respectant les spécifications. $\text{EM} = x_{max} - x_{min}$.
*   **Triade de la Qualité Métrologique (L'analogie de la cible)** :
    *   **Fidélité (Répétabilité / Dispersion)** : Proximité entre les résultats de mesures répétées de la même grandeur (absence d'erreurs aléatoires). Faible variance $\sigma^2$.
    *   **Justesse** : Proximité entre la moyenne d'un nombre infini de mesures et la valeur vraie (absence d'erreur systématique / biais).
    *   **Précision** : Qualité globale d'un instrument qui est **à la fois fidèle ET juste**.

```
    Fidèle mais non Juste           Juste mais non Fidèle            Précision Maximale
      (Biais systématique)           (Grande dispersion)            (Fidèle ET Juste)
           ◎◎◎                             ●   ●                        ●●●
          ◎   ◎                             ●                           ●●●
           ◎◎◎                            ●   ●                         ●●●
```

---

## 📌 Fiche 1 : Erreurs, Bruits et Incertitudes (Leçon 2)

:::warning
### ⚠️ Formalisme des Incertitudes en Examen
Toute valeur mesurée $x$ doit **obligatoirement** être accompagnée de son incertitude :
$$x = x_{mes} \pm \Delta x \quad \text{ou} \quad x \in [x_{mes} - \Delta x, \, x_{mes} + \Delta x]$$
:::

### 2.1 Types d'Erreurs
*   **Erreurs Systématiques** : Décalages constants ou répétables (erreur de zéro/offset, erreur de gain, non-linéarité). Peuvent être corrigées par étalonnage/calibration.
*   **Erreurs Aléatoires (Bruits)** : Fluctuations imprévisibles d'origine physique. Traitées par des outils statistiques (moyenne, écart-type).

### 2.2 Modélisation des Bruits Physiques Intrinsèques
1.  **Bruit Thermique (Johnson-Nyquist)** : Causé par l'agitation thermique des porteurs de charge dans une résistance $R$ à la température $T$ (en Kelvin) :
    $$e_n^2 = 4 \, k_B \, T \, R \, \Delta f \quad [\text{V}^2]$$
    *(avec $k_B = 1{,}38 \times 10^{-23} \text{ J/K}$ et $\Delta f$ la bande passante).*
2.  **Bruit de Grenaille (Schottky)** : Bruit lié au caractère quantique du passage des porteurs à travers une jonction PN parcourue par un courant continu $I$ :
    $$i_n^2 = 2 \, q \, I \, \Delta f \quad [\text{A}^2]$$
    *(avec $q = 1{,}602 \times 10^{-19} \text{ C}$).*

### 2.3 Lois de Propagation des Incertitudes
Soit une grandeur calculée $z = f(x_1, x_2, \dots, x_N)$ à partir de variables mesurées $x_i$ affectées d'incertitudes $\Delta x_i$ :

1.  **Calcul au Pire des Cas (Majoration absolue / Bornes strictes)** :
    $$\Delta z = \sum_{i=1}^{N} \left| \frac{\partial f}{\partial x_i} \right| \Delta x_i$$
2.  **Calcul Quadratique (Incertitude-type combinée $u_c(z)$ pour variables indépendantes/non corrélées)** :
    $$u_c^2(z) = \sum_{i=1}^{N} \left( \frac{\partial f}{\partial x_i} \right)^2 u^2(x_i)$$

:::tip
#### 📌 Cas particuliers très fréquents
*   **Somme/Soustraction** ($z = a x \pm b y$) :
    $$\Delta z = |a|\Delta x + |b|\Delta y \quad \text{et} \quad u_c^2(z) = a^2 u^2(x) + b^2 u^2(y)$$
*   **Produit/Quotient** ($z = C \cdot x^{\alpha} \cdot y^{\beta}$) : Incertitudes relatives :
    $$\frac{\Delta z}{z} = |\alpha| \frac{\Delta x}{x} + |\beta| \frac{\Delta y}{y} \quad \text{et} \quad \left(\frac{u_c(z)}{z}\right)^2 = \alpha^2 \left(\frac{u(x)}{x}\right)^2 + \beta^2 \left(\frac{u(y)}{y}\right)^2$$
:::

---

## 📌 Fiche 2 : Conditionnement des Capteurs Passifs & Ponts (Leçon 3)

### 3.1 Topologies de Conditionnement
*   **Diviseur de tension** : $V_{out} = V_g \frac{R_c(x)}{R_0 + R_c(x)}$. Inconvénient : **Réponse fortement non-linéaire** si $\Delta R/R_0$ n'est pas très petit.
*   **Montage Push-Pull (Montage symétrique)** : Utilise deux capteurs identiques fonctionnant en opposition ($R_1 = R_0(1+x)$ et $R_2 = R_0(1-x)$).
    $$V_{out} = V_g \frac{R_0(1+x)}{2 R_0} = \frac{V_g}{2}(1 + x)$$
    *Avantages : **Sensibilité double** et **linéarité rigoureusement parfaite**.*

### 3.2 Le Pont de Wheatstone
Constitué de 4 branches résistives alimentées par une tension $V_g$. Tension de sortie différentielle :
$$V_{out} = V_B - V_D = V_g \left( \frac{R_1}{R_1 + R_2} - \frac{R_4}{R_3 + R_4} \right)$$

```
          A ( + Vg )
         / \
        /   \
      R1     R4
      /       \
 (V_B) B-------D (V_D)  ---> Vout = V_B - V_D
      \       /
      R2     R3
        \   /
         \ /
          C ( GND )
```

#### Synthèse des Configurations de Pont ($\delta = \Delta R / R_0 \ll 1$) :
| Configuration | Composition des branches | Tension de sortie $V_{out}$ | Sensibilité réduite $S_{red} = \frac{V_{out}}{V_g \cdot \delta}$ |
| :--- | :--- | :--- | :--- |
| **Quart de pont** | $R_1 = R_0(1+\delta)$, $R_2=R_3=R_4=R_0$ | $V_{out} \approx \frac{V_g}{4} \delta$ | $\frac{1}{4}$ |
| **Demi-pont** | $R_1 = R_0(1+\delta)$, $R_2 = R_0(1-\delta)$, $R_3=R_4=R_0$ | $V_{out} = \frac{V_g}{2} \delta$ *(Exacte)* | $\frac{1}{2}$ |
| **Pont Complet** | $R_1=R_3=R_0(1+\delta)$, $R_2=R_4=R_0(1-\delta)$ | $V_{out} = V_g \cdot \delta$ *(Exacte)* | $1$ |

### 3.3 Lignes de Transmission Industrielles
*   **Câblage 3 fils / 4 fils** : Utilisé pour annuler l'impact des résistances parasites des câbles $r_L$ sur la mesure de sondes résistives (Pt100).
*   **Boucle de courant $4-20\text{ mA}$** : Standard industriel de transmission.
    *   $4\text{ mA}$ représente le zéro physique ($x_{min}$) $\rightarrow$ permet de détecter la rupture de câble (si $I = 0\text{ mA}$).
    *   $20\text{ mA}$ représente l'échelle maximale ($x_{max}$).
    *   Inmune aux chutes de tension résistives le long de la ligne de transmission.

---

## 📌 Fiche 3 : Physique & Conditionnement des Capteurs de Température (Leçon 4)

### 4.1 Bilan Thermique et Temps de Réponse
L'équation différentielle régissant l'évolution de la température $T(t)$ d'un capteur de masse $m$, de chaleur massique $c$, soumis à un échange convectif/conductif $K$ avec l'environnement $T_{env}$ et une puissance dissipée $P$ s'écrit :
$$\frac{dT}{dt} + \frac{1}{\tau} T(t) = \frac{T_{env}}{\tau} + \frac{P}{m c} \quad \text{avec la constante de temps } \tau = \frac{m c}{K}$$

### 4.2 Technologies de Capteurs de Température
1.  **Sondes Résistives RTD (ex. Pt100)** :
    *   Fil de platine à valeur nominale $R(0^\circ\text{C}) = 100\,\Omega$.
    *   Loi de comportement : $R(T) = R_0 (1 + A T + B T^2)$ avec $A \approx 3{,}908 \times 10^{-3} \,^\circ\text{C}^{-1}$.
2.  **Thermistances CTN (Coefficient de Température Négatif)** :
    *   Semiconducteurs à forte sensibilité non-linéaire :
        $$R(T) = R_0 \exp\left[ \beta \left( \frac{1}{T} - \frac{1}{T_0} \right) \right] \quad (T \text{ en Kelvin})$$
    *   **Condition d'Inflexion pour la Linéarisation** : En plaçant une résistance $R_p$ en parallèle sur la CTN $R_1(T)$, le point d'inflexion à $T_1$ impose $\left.\frac{d^2 R_{eq}}{dT^2}\right|_{T_1} = 0$, ce qui donne :
        $$R_p = R_1(T_1) \cdot \frac{\beta - 2 T_1}{\beta + 2 T_1}$$
3.  **Thermocouples (Effet Seebeck)** :
    *   Jonction de deux métaux différents $A$ et $B$. Génère une force électromotrice $e_{AB} = S_{AB} (T_h - T_c)$.
    *   Nécessite une **Compensation de Jonction Froide (CJC)** car le thermocouple ne mesure qu'une différence de température $\Delta T = T_h - T_c$.
4.  **Pyrométrie Optique (Mesure sans contact)** :
    *   Loi de Stefan-Boltzmann : Émendance $M = \epsilon \cdot \sigma \cdot T^4$ avec $\sigma = 5{,}67 \times 10^{-8} \text{ W/(m}^2\text{K}^4\text{)}$.
    *   Loi de Wien : Longueur d'onde d'émission maximale $\lambda_{max} \cdot T = 2898\,\mu\text{m}\cdot\text{K}$.

---

## 📌 Fiche 4 : Électronique de Conditionnement et Amplification (Module EE479)

### 4.1 L'Amplificateur d'Instrumentation (3 AOPs)
Pour amplifier le faible signal différentiel $V_{out}$ issu d'un pont de Wheatstone tout en éliminant les tensions parasites de mode commun induites par l'environnement, on utilise un **Amplificateur d'Instrumentation**.

```
       +Vcc
        │
In+ ───►├─┐ (AOP 1)
        │ ┴─────┬─────────────┐
        └───────┼──┐          │
                │  R1         │
                R_gain        ├─┐ (AOP 3)
                │             │ ┴───────────► V_out
        ┌───────┼──┘   R2     │
        │ ┬─────┴─────┬──R3───┤
In- ───►├─┘ (AOP 2)   │       │
        │             R2      │
       -Vee           │       │
                     GND     R3
                              │
                             GND
```

### 4.2 Formules du Gain et TRMC
*   **Tension de sortie** :
    $$V_S = A_d \cdot (V_{In+} - V_{In-}) + A_{cm} \cdot \left(\frac{V_{In+} + V_{In-}}{2}\right)$$
*   **Gain différentiel théorique $A_d$** (avec $R_2$ et $R_3$ ajustés dans l'étage soustracteur) :
    $$A_d = \left( 1 + \frac{2 R_1}{R_{gain}} \right) \cdot \frac{R_3}{R_2}$$
*   **Taux de Rejection du Mode Commun (TRMC / CMRR)** :
    $$\text{TRMC} = 20 \log_{10} \left( \left| \frac{A_d}{A_{cm}} \right| \right) \quad [\text{dB}]$$
    *Un amplificateur d'instrumentation de qualité offre un TRMC $> 100\text{ dB}$.*

---

## 📋 Checklist Formulaire Express pour l'Épreuve

- [ ] **Erreurs relatives & absolues** : $\frac{\Delta z}{z}$ n'a pas d'unité, $\Delta z$ a l'unité de $z$.
- [ ] **Températures en Kelvin** : Pour Stefan-Boltzmann, Wien, CTN et Bruit Thermique, **convertir toujours $T(^\circ\text{C})$ en $T(\text{K}) = T(^\circ\text{C}) + 273{,}15$**.
- [ ] **Développement limité du Pont** : En quart de pont, $V_{out} = \frac{V_g}{4}\delta$ n'est vrai que si $\delta \ll 1$. En demi-pont push-pull et pont complet, l'équation est rigoureusement exacte quel que soit $\delta$.
- [ ] **Gain d'ampli d'instrumentation** : Se règle de façon unifiée par une seule résistance externe $R_{gain}$.
- [ ] **Propagation d'incertitude type A vs type B** : Type A = évaluation statistique (écart-type expérimental $s/\sqrt{N}$), Type B = évaluation par d'autres moyens (résolution appareil $a/\sqrt{3}$ pour distribution rectangulaire).

---
*Fiche récapitulative optimisée pour le programme EE-470 / EE-479 de Grenoble INP - Esisar.*
