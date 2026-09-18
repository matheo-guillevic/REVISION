---
title: TP 1 corrige - GPIO et mesures de performances
subject: SN421-Dev-Micro
type: tp
target: SN421-Dev-Micro-tp1.html
eyebrow: SN421 - TP 1
heading: GPIO, interruptions et timers sur ATmega328P
summary: TP guide autour de l'Arduino Uno, avec manipulations Wokwi pour observer les GPIO, INT0 et Timer1.
withPrism: true
---

:::section id="sn421-tp1-intro" eyebrow="TP SN421" title="Objectif du TP" summary="Comparer plusieurs facons de piloter une sortie numerique, mesurer le cout des abstractions Arduino, puis exploiter les interruptions et le Timer1 de l'ATmega328P."

:::quicklinks
- [Preparation individuelle](#sn421-tp1-preparation)
- [GPIO et performances](#sn421-tp1-gpio)
- [Interruptions externes](#sn421-tp1-interruptions)
- [Timers](#sn421-tp1-timers)
- [Synthese](#sn421-tp1-synthese)
:::

:::block type="remember" title="Carte cible"
Le TP utilise une Arduino Uno R3 basee sur un microcontroleur **ATmega328P** cadence a **16 MHz**.

La LED integree de la carte est reliee a la broche Arduino **D13**, qui correspond au port materiel **PB5** de l'ATmega328P.
:::

:::

:::section id="sn421-tp1-preparation" eyebrow="Preparation" title="Preparation individuelle" summary="Identifier les broches, les registres et les mecanismes materiels avant de passer aux manipulations."

:::exercise label="Preparation 1" title="LED integree et correspondance Arduino / ATmega328P"
La LED integree de l'Arduino Uno est connectee a la broche **D13**.

Sur l'ATmega328P, cette broche correspond a :

| Element | Valeur |
| :--- | :--- |
| Microcontroleur | `ATmega328P` |
| Broche Arduino | `D13` |
| Port materiel | `PB5` |
| Bit de direction | `DDB5` |
| Bit de sortie | `PORTB5` |

`D13` est le nom logique expose par la carte Arduino. `PB5` est le nom reel de la broche au niveau du microcontroleur.
:::

:::exercise label="Preparation 2" title="Configurer PB5 en sortie haute"
Pour utiliser PB5 en sortie, on met le bit `DDB5` du registre `DDRB` a 1.

Pour forcer la sortie a l'etat haut, on met le bit `PORTB5` du registre `PORTB` a 1.

```cpp
DDRB |= (1 << DDB5);     // PB5 en sortie
PORTB |= (1 << PORTB5);  // PB5 a l'etat haut
```

Equivalent Arduino :

```cpp
pinMode(13, OUTPUT);
digitalWrite(13, HIGH);
```
:::

:::exercise label="Preparation 3" title="Inversion rapide avec PINB et SBI"
Sur ATmega328P, ecrire un `1` dans le bit correspondant du registre `PINB` inverse l'etat de la sortie.

En assembleur AVR :

```asm
sbi 0x03, 5
```

`0x03` est l'adresse I/O du registre `PINB`, et `5` designe le bit `PB5`.
:::

:::exercise label="Preparation 4" title="Oscillateur de la carte"
La carte Arduino Uno utilise un oscillateur de **16 MHz**.

Pour une precision de `+/- 5 ppm` au bout d'un an a 25 degC, la derive maximale vaut :

\[
\Delta f = 16\,\text{MHz} \times 5 \times 10^{-6} = 80\,\text{Hz}
\]
:::

:::

:::section id="sn421-tp1-gpio" eyebrow="Manipulation 1" title="GPIO et mesures de performances" summary="Comparer digitalWrite, l'acces direct aux registres et une boucle assembleur."

:::block type="method" title="Principe de mesure"
On produit un signal carre sur la LED ou sur une sortie logique, puis on observe sa frequence avec l'analyseur logique Wokwi.

Pour convertir une frequence mesuree en cycles par toggle :

\[
N_{\text{cycles/toggle}} = \frac{f_{\text{CPU}}}{2f_{\text{signal}}}
\]

avec \( f_{\text{CPU}} = 16\,\text{MHz} \).
:::

:::wokwi id="sn421-tp1-wokwi-gpio" label="Wokwi TP1.1" title="GPIO - digitalWrite vs registres" src="https://wokwi.com/projects/475481421742399489" height="620"
Montage a importer depuis `content/S7/SN421-Dev-Micro/wokwi/tp1-01-gpio-performance`.

Manipulations :

1. Executer le code en mode `MODE_DIGITAL_WRITE`.
2. Ouvrir l'analyseur logique et mesurer la frequence sur `D13`.
3. Passer en mode `MODE_DIRECT_PORT`, relancer puis comparer.
4. Passer en mode `MODE_PINB_TOGGLE` pour observer l'inversion directe par `PINB`.

Le but est de visualiser le cout de l'abstraction `digitalWrite()` par rapport a un acces direct aux registres.
:::

:::solution title="Configuration minimale en registre"
```cpp
void setup() {
  DDRB |= (1 << DDB5);
  PORTB |= (1 << PORTB5);
}

void loop() {}
```
:::

:::solution title="Clignotement avec digitalWrite"
```cpp
void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(500);
}
```
:::

:::solution title="Clignotement par acces direct aux registres"
```cpp
void setup() {
  DDRB |= (1 << DDB5);
}

void loop() {
  PORTB |= (1 << PORTB5);
  delay(500);
  PORTB &= ~(1 << PORTB5);
  delay(500);
}
```
:::

:::solution title="Toggle tres rapide"
```cpp
void setup() {
  DDRB |= (1 << DDB5);
}

void loop() {
  PINB |= (1 << PINB5);
}
```

L'ecriture dans `PINB` inverse directement la sortie. C'est generalement plus rapide que deux operations separees sur `PORTB`.
:::

:::block type="warning" title="Attention au calcul des cycles"
Si la frequence du signal carre vaut `150 kHz`, alors :

\[
N = \frac{16\times10^6}{2\times150\times10^3} \approx 53 \text{ cycles/toggle}
\]

Une valeur de `208 cycles/toggle` correspondrait plutot a une frequence proche de `38,5 kHz`.
:::

:::solution title="Impact d'une transmission serie bloquante"
Une emission serie a `9600 bauds` peut fortement perturber une boucle de clignotement si elle est faite directement dans la boucle principale.

Pour 10 caracteres, l'ordre de grandeur est :

\[
T_{\text{serie}} \approx \frac{10 \times 10}{9600} \approx 10{,}4\,\text{ms}
\]

Ce temps devient dominant devant une demi-periode de `500 us` pour un signal de `1 kHz`.
:::

:::

:::section id="sn421-tp1-interruptions" eyebrow="Manipulation 2" title="Interruptions externes" summary="Configurer INT0 sur front montant et comparer une ISR bas niveau avec attachInterrupt."

:::exercise label="Preparation interruptions" title="Broches disponibles"
Sur Arduino Uno :

| Broche Arduino | Broche ATmega328P | Interruption externe | Pin change |
| :--- | :--- | :--- | :--- |
| `D2` | `PD2` | `INT0` | `PCINT18` |
| `D3` | `PD3` | `INT1` | `PCINT19` |

`INT0` est une interruption externe dediee. Les interruptions `PCINTx` detectent un changement logique sur un groupe de broches et partagent un vecteur.
:::

:::exercise label="Preparation interruptions" title="Configuration de INT0 sur front montant"
Pour declencher `INT0` sur front montant, il faut configurer `ISC01 = 1` et `ISC00 = 1` dans `EICRA`.

| `ISC01` | `ISC00` | Declenchement |
| :---: | :---: | :--- |
| 0 | 0 | Niveau bas |
| 0 | 1 | Changement logique |
| 1 | 0 | Front descendant |
| 1 | 1 | Front montant |

Le vecteur d'interruption avr-gcc associe est :

```cpp
ISR(INT0_vect) {
  // traitement interruption INT0
}
```
:::

:::wokwi id="sn421-tp1-wokwi-int0" label="Wokwi TP1.2" title="INT0 - bouton sur D2 et reponse LED" src="https://wokwi.com/projects/475481683256289281" height="620"
Montage a importer depuis `content/S7/SN421-Dev-Micro/wokwi/tp1-02-int0-response`.

Manipulations :

1. Lancer la simulation.
2. Appuyer sur le bouton relie a `D2`.
3. Observer la sortie `D13` dans l'analyseur logique.
4. Comparer le mode registre bas niveau et le mode `attachInterrupt()`.

L'objectif est d'observer le temps de reaction entre le front d'entree et la commutation de la LED.
:::

:::solution title="INT0 configuree en registres"
```cpp
#include <avr/io.h>
#include <avr/interrupt.h>

ISR(INT0_vect) {
  PORTB |= (1 << PORTB5);
}

void setup() {
  DDRB |= (1 << DDB5);
  PORTD &= ~(1 << PORTD2);

  EICRA |= (1 << ISC01) | (1 << ISC00);
  EIMSK |= (1 << INT0);
  EIFR |= (1 << INTF0);
  sei();
}

void loop() {
  PORTB &= ~(1 << PORTB5);
}
```
:::

:::solution title="Version Arduino avec attachInterrupt"
```cpp
void onInt0() {
  PORTB |= (1 << PORTB5);
}

void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT);
  attachInterrupt(digitalPinToInterrupt(2), onInt0, RISING);
}

void loop() {
  PORTB &= ~(1 << PORTB5);
}
```

`attachInterrupt()` est plus lisible et portable dans l'ecosysteme Arduino, mais ajoute une couche logicielle au-dessus du vecteur d'interruption AVR.
:::

:::

:::section id="sn421-tp1-timers" eyebrow="Manipulation 3" title="Timer1, mode CTC et PWM" summary="Utiliser Timer1 pour generer une base de temps precise ou un signal materiel sans occuper la boucle principale."

:::exercise label="Timer1" title="Taille et periode maximale"
Timer1 est un timer **16 bits**. Il compte donc de `0` a `65535`.

Avec le prescaler maximal `1024` et \(f_{\text{CPU}} = 16\,\text{MHz}\) :

\[
T_{\max} = \frac{1024 \times 65536}{16\times10^6} \approx 4{,}19\,\text{s}
\]
:::

:::exercise label="Timer1" title="Mode CTC pour une base de temps de 1 seconde"
En mode CTC, le compteur est remis a zero lorsqu'il atteint `OCR1A`.

\[
T_{\text{CTC}} = \frac{N(\text{OCR1A}+1)}{f_{\text{CPU}}}
\]

Avec `N = 256` et `T = 1 s` :

\[
\text{OCR1A}+1 = \frac{16\times10^6}{256}=62500
\]

\[
\boxed{\text{OCR1A}=62499}
\]
:::

:::wokwi id="sn421-tp1-wokwi-timer1" label="Wokwi TP1.3" title="Timer1 - CTC et PWM materielle" src="https://wokwi.com/projects/475481954633085953" height="620"
Montage a importer depuis `content/S7/SN421-Dev-Micro/wokwi/tp1-03-timer1-ctc-pwm`.

Manipulations :

1. Lancer le mode `DEMO_CTC_INTERRUPT` pour observer une interruption periodique.
2. Observer `D13` : la LED change d'etat toutes les secondes, donc le signal complet vaut `0,5 Hz`.
3. Passer en mode `DEMO_FAST_PWM`.
4. Observer `D9`, sortie materielle `OC1A`, pour verifier un signal PWM genere sans ISR.

La LED integree `D13/PB5` n'est pas une sortie PWM materielle du Timer1. Pour la PWM Timer1, il faut utiliser `D9/PB1/OC1A` ou `D10/PB2/OC1B`.
:::

:::solution title="Mode CTC avec interruption"
```cpp
#include <avr/io.h>
#include <avr/interrupt.h>

void setup() {
  DDRB |= (1 << DDB5);

  TCCR1A = 0;
  TCCR1B = 0;
  TCCR1B |= (1 << WGM12);

  OCR1A = 62499;
  TIMSK1 |= (1 << OCIE1A);
  TCCR1B |= (1 << CS12);

  sei();
}

ISR(TIMER1_COMPA_vect) {
  PINB |= (1 << PINB5);
}

void loop() {}
```
:::

:::solution title="Fast PWM 14 sur OC1A / D9"
```cpp
void setup() {
  DDRB |= (1 << DDB1);

  TCCR1A = 0;
  TCCR1B = 0;

  TCCR1A |= (1 << WGM11);
  TCCR1B |= (1 << WGM13) | (1 << WGM12);
  TCCR1A |= (1 << COM1A1);

  ICR1 = 62499;
  OCR1A = 31249;

  TCCR1B |= (1 << CS12);
}

void loop() {}
```

La frequence PWM obtenue vaut :

\[
f_{\text{PWM}}=\frac{16\times10^6}{256\times62500}=1\,\text{Hz}
\]
:::

:::

:::section id="sn421-tp1-synthese" eyebrow="Synthese" title="Ce qu'il faut retenir" summary="Les manipulations montrent le lien direct entre abstraction logicielle, cout temporel et exploitation des peripheriques materiels."

:::grid variant="two-col"
:::block type="remember" title="Registres GPIO"
`DDRx` configure la direction, `PORTx` ecrit la sortie ou active le pull-up, et `PINx` lit l'entree. Sur AVR, ecrire un `1` dans `PINx` peut aussi inverser une sortie.
:::

:::block type="remember" title="Interruptions"
Une interruption reduit la latence de reaction, mais l'ISR doit rester courte. On evite les traitements longs, les delais et les communications bloquantes dans une ISR.
:::

:::block type="remember" title="Timers"
Le mode CTC donne une base de temps precise avec ISR. Les modes PWM materiels generent un signal sans intervention continue du CPU.
:::

:::block type="warning" title="Abstraction Arduino"
`digitalWrite()` est pratique mais couteux. Pour du controle temporel fin, il faut comprendre et utiliser les registres du microcontroleur.
:::
:::

:::
