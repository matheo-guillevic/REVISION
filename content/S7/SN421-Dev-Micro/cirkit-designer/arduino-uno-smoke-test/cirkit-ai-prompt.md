# Prompt pour Cirkit Designer

Creer un projet Arduino Uno simulable pour tester rapidement Cirkit Designer.

Composants :
- Arduino Uno R3
- une LED rouge avec resistance 220 ohms
- une LED verte avec resistance 220 ohms
- un bouton poussoir
- un potentiometre 10 kohms

Cablage souhaite :
- LED rouge : anode sur D13, cathode vers GND via resistance 220 ohms
- LED verte PWM : anode sur D9, cathode vers GND via resistance 220 ohms
- bouton : une borne sur D2, l'autre sur GND ; le code utilise INPUT_PULLUP
- potentiometre : curseur central sur A0, extremites sur 5V et GND
- toutes les masses doivent etre communes

Code Arduino :

```cpp
const byte LED_HEARTBEAT = 13;
const byte LED_PWM = 9;
const byte BUTTON_PIN = 2;
const byte POT_PIN = A0;

const unsigned long BLINK_PERIOD_MS = 500;
const unsigned long REPORT_PERIOD_MS = 250;

unsigned long lastBlinkAt = 0;
unsigned long lastReportAt = 0;
bool heartbeatState = false;

void setup() {
  pinMode(LED_HEARTBEAT, OUTPUT);
  pinMode(LED_PWM, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  Serial.begin(115200);
  Serial.println("Cirkit Designer smoke test - Arduino Uno");
  Serial.println("A0=potentiometre, D2=bouton, D9=PWM, D13=LED");
}

void loop() {
  const unsigned long now = millis();

  const int adcValue = analogRead(POT_PIN);
  const byte pwmValue = map(adcValue, 0, 1023, 0, 255);
  const bool buttonPressed = digitalRead(BUTTON_PIN) == LOW;

  analogWrite(LED_PWM, pwmValue);

  if (buttonPressed) {
    heartbeatState = true;
    digitalWrite(LED_HEARTBEAT, HIGH);
  } else if (now - lastBlinkAt >= BLINK_PERIOD_MS) {
    lastBlinkAt = now;
    heartbeatState = !heartbeatState;
    digitalWrite(LED_HEARTBEAT, heartbeatState ? HIGH : LOW);
  }

  if (now - lastReportAt >= REPORT_PERIOD_MS) {
    lastReportAt = now;
    Serial.print("adc=");
    Serial.print(adcValue);
    Serial.print(" pwm=");
    Serial.print(pwmValue);
    Serial.print(" button=");
    Serial.print(buttonPressed ? "pressed" : "released");
    Serial.print(" led13=");
    Serial.println(heartbeatState ? "on" : "off");
  }
}
```

Verifier que la simulation permet de modifier le potentiometre et d'appuyer sur le bouton. La LED verte doit varier avec A0, la LED rouge doit clignoter puis rester allumee quand le bouton est appuye, et le Serial Monitor doit afficher adc/pwm/button/led13.

