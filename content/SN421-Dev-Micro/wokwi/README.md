# Laboratoires Wokwi SN421 Dev-Micro

Ces dossiers contiennent les montages et programmes correspondant aux emplacements Wokwi du cours.

## Utilisation

1. Creer un nouveau projet Wokwi STM32 Blue Pill.
2. Remplacer le fichier `diagram.json` du projet Wokwi par celui du laboratoire.
3. Remplacer le fichier `sketch.ino` du projet Wokwi par celui du laboratoire.
4. Sauvegarder le projet Wokwi.
5. Copier l'URL `https://wokwi.com/projects/...` dans le bloc `:::wokwi` correspondant du cours.

## Laboratoires

- `lab-01-volatile-interrupt` : interruption bouton et variable `volatile`.
- `lab-02-gpio-open-drain` : sortie push-pull et simulation open-drain.
- `lab-03-timer-pwm` : PWM mesuree par analyseur logique.
- `lab-04-adc-fixed-point` : potentiometre ADC et conversion en millivolts sans float.
- `lab-05-uart-ring-buffer` : reception serie non bloquante avec tampon circulaire.
- `lab-06-i2c-logic-analyzer` : transaction I2C vers TMP102 et capture SDA/SCL.
- `lab-07-spi-logic-analyzer` : SPI vers 74HC595 et capture SCK/MOSI/LATCH.
- `lab-08-fsm-non-blocking` : automate non bloquant avec boutons et LED RGB.

## Remarque

Les projets utilisent `stm32-bluepill` et le style Arduino pour rester faciles a importer dans l'editeur web Wokwi. Les noms de broches STM32 sont gardes explicitement (`PA0`, `PA1`, `PB6`, etc.).
