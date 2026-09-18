const uint8_t PWM_PIN = PA8;
const uint16_t DUTIES[] = { 64, 128, 192 };
uint8_t indexDuty = 0;
unsigned long lastChange = 0;

void setup() {
  pinMode(PWM_PIN, OUTPUT);
  analogWriteFrequency(1000);
  analogWriteResolution(8);
  Serial.begin(115200);
  Serial.println("Lab 03 - PWM 1 kHz sur PA8, mesure sur analyseur logique D0.");
}

void loop() {
  if (millis() - lastChange >= 2000) {
    lastChange = millis();
    analogWrite(PWM_PIN, DUTIES[indexDuty]);
    Serial.print("Duty ~= ");
    Serial.print((DUTIES[indexDuty] * 100UL) / 255UL);
    Serial.println("%");
    indexDuty = (indexDuty + 1) % 3;
  }
}
