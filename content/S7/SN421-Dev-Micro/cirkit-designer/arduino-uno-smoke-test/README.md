# Projet test Cirkit Designer - Arduino Uno

Ce projet sert a verifier rapidement que Cirkit Designer permet de concevoir, coder et simuler un montage Arduino simple.

## Objectif

Tester dans un seul montage :

- une sortie numerique avec LED ;
- une entree numerique avec bouton ;
- une entree analogique avec potentiometre ;
- une sortie PWM avec une LED gradable ;
- le Serial Monitor.

## Composants

- Arduino Uno R3
- 1 LED rouge
- 1 LED verte
- 2 resistances 220 ohms
- 1 bouton poussoir
- 1 potentiometre 10 kohms
- fils de connexion

## Cablage

| Signal | Arduino Uno | Composant | Detail |
| --- | --- | --- | --- |
| LED rouge | D13 | anode LED rouge | cathode vers GND via 220 ohms |
| LED verte PWM | D9 | anode LED verte | cathode vers GND via 220 ohms |
| Bouton | D2 | borne 1 bouton | autre borne vers GND |
| Potentiometre | A0 | curseur central | extremites vers 5V et GND |
| Alimentation | 5V | rail + | pour potentiometre |
| Masse | GND | rail - | commun a tous les composants |

Le bouton utilise `INPUT_PULLUP`, donc l'etat logique est inverse :

- bouton relache : lecture `HIGH` ;
- bouton appuye : lecture `LOW`.

## Comportement attendu

- La LED verte suit la position du potentiometre avec une luminosite PWM de 0 a 255.
- La LED rouge clignote lentement quand le bouton est relache.
- La LED rouge reste allumee quand le bouton est appuye.
- Le Serial Monitor affiche periodiquement la valeur ADC, la valeur PWM et l'etat du bouton.

## Utilisation dans Cirkit Designer

1. Ouvrir <https://app.cirkitdesigner.com/>.
2. Creer un nouveau projet Arduino Uno.
3. Ajouter les composants listes ci-dessus.
4. Realiser le cablage avec la table.
5. Ajouter le code depuis `arduino-uno-smoke-test.ino` sur l'Arduino Uno.
6. Lancer la simulation et ouvrir le Serial Monitor.

Si tu veux utiliser l'assistant IA de Cirkit, le fichier `cirkit-ai-prompt.md` contient une consigne prete a coller.

