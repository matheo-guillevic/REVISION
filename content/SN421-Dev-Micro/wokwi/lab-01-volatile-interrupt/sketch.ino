// STM32 Blue Pill - Wokwi
// Bouton sur PA0 (actif a LOW) et LED externe sur PB0.

const uint32_t BUTTON_PIN = PA0;
const uint32_t LED_PIN = PB0;

volatile bool buttonEvent = false;

// Anti-rebond traite dans loop(), pas dans l'ISR.
const uint32_t DEBOUNCE_MS = 50;
uint32_t lastAcceptedPress = 0;
bool ledState = false;

void onButtonPress() {
  buttonEvent = true;
}

void setup() {
  Serial.begin(115200);

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  // Le bouton est cable entre PA0 et GND.
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), onButtonPress, FALLING);

  Serial.println("Lab 01 - Appuyez sur le bouton pour basculer la LED.");
}

void loop() {
  if (buttonEvent) {
    // Recuperation atomique du flag pose par l'interruption.
    noInterrupts();
    buttonEvent = false;
    interrupts();

    const uint32_t now = millis();

    // Ignore les rebonds rapproches et verifie que le bouton est encore appuye.
    if ((now - lastAcceptedPress >= DEBOUNCE_MS) && digitalRead(BUTTON_PIN) == LOW) {
      lastAcceptedPress = now;
      ledState = !ledState;
      digitalWrite(LED_PIN, ledState ? HIGH : LOW);
      Serial.println("Evenement bouton recu depuis l'ISR : LED basculee.");
    }
  }
}
