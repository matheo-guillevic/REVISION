const uint8_t ADC_PIN = PA0;

void setup() {
  analogReadResolution(12);
  Serial.begin(115200);
  Serial.println("Lab 04 - ADC 12 bits et conversion mV en entier.");
}

void loop() {
  uint16_t raw = analogRead(ADC_PIN);

  // Q8.8: scale = 3300 / 4095 * 256 ~= 206.
  uint32_t millivoltsQ8 = (uint32_t)raw * 206UL;
  uint16_t millivolts = millivoltsQ8 >> 8;

  Serial.print("ADC=");
  Serial.print(raw);
  Serial.print("  U=");
  Serial.print(millivolts);
  Serial.println(" mV");
  delay(400);
}
