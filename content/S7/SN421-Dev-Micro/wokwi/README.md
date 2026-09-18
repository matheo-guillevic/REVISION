# Laboratoires Wokwi SN421 Dev-Micro

Ces dossiers contiennent les montages et programmes correspondant aux emplacements Wokwi du cours.

## Utilisation

1. Creer un nouveau projet Wokwi STM32 Blue Pill.
2. Remplacer le fichier `diagram.json` du projet Wokwi par celui du laboratoire.
3. Remplacer le fichier `sketch.ino` du projet Wokwi par celui du laboratoire.
4. Si le laboratoire contient `logic-scope.chip.c` et `logic-scope.chip.json`, creer un Custom Chip nomme `logic-scope` dans Wokwi puis remplacer les deux fichiers generes par ceux du laboratoire.
5. Sauvegarder le projet Wokwi.
6. Copier l'URL `https://wokwi.com/projects/...` dans le bloc `:::wokwi` correspondant du cours.

## Visualisation des signaux

Les montages numeriques incluent un instrument de visualisation :

- `chip-logic-scope` : scope graphique communautaire affichant les formes d'onde directement dans le schema Wokwi.

Le scope graphique vient du projet MIT `giltal/Wokwi-graphical-logic-analyzer`. Sa licence est conservee dans chaque dossier qui embarque le custom chip (`logic-scope.LICENSE`).

Wokwi n'expose pas les displays de custom chips dans un onglet separe comme la console : le display est attache au composant du schema. Pour une vue dockee, l'alternative native reste le Serial Plotter, mais il impose d'envoyer les signaux par `Serial` et perturbe les mesures temporelles fines.

Le laboratoire ADC (`lab-04-adc-fixed-point`) utilise plutot le Serial Plotter Wokwi, car le scope graphique est numerique.

## Laboratoires

- `lab-01-volatile-interrupt` : interruption bouton et variable `volatile`.
- `lab-02-gpio-open-drain` : sortie push-pull et simulation open-drain.
- `lab-03-timer-pwm` : PWM mesuree par analyseur logique.
- `lab-04-adc-fixed-point` : potentiometre ADC et conversion en millivolts sans float.
- `lab-05-uart-ring-buffer` : reception serie non bloquante avec tampon circulaire.
- `lab-06-i2c-logic-analyzer` : transaction I2C vers TMP102 et capture SDA/SCL.
- `lab-07-spi-logic-analyzer` : SPI vers 74HC595 et capture SCK/MOSI/LATCH.
- `lab-08-fsm-non-blocking` : automate non bloquant avec boutons et LED RGB.
- `tp1-01-gpio-performance` : Arduino Uno, comparaison `digitalWrite`, acces registre et toggle par `PINB`.
- `tp1-02-int0-response` : Arduino Uno, bouton sur `D2/INT0`, reponse LED et mesure logique.
- `tp1-03-timer1-ctc-pwm` : Arduino Uno, Timer1 en CTC puis PWM materielle sur `D9/OC1A`.

## Remarque

Les laboratoires utilisent `stm32-bluepill` et le style Arduino pour rester faciles a importer dans l'editeur web Wokwi. Les noms de broches STM32 sont gardes explicitement (`PA0`, `PA1`, `PB6`, etc.). Les dossiers `tp1-*` utilisent une Arduino Uno.
