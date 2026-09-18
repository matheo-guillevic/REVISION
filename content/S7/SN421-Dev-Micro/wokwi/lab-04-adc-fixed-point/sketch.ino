const uint8_t ADC_PIN = PA0;

void setup() {
  analogReadResolution(12);
  Serial.begin(115200);
  Serial.println("adc:0 millivolts:0");
}

void loop() {
  uint16_t raw = analogRead(ADC_PIN);

  // Q8.8: scale = 3300 / 4095 * 256 ~= 206.
  uint32_t millivoltsQ8 = (uint32_t)raw * 206UL;
  uint16_t millivolts = millivoltsQ8 >> 8;

  Serial.print("adc:");
  Serial.print(raw);
  Serial.print(" millivolts:");
  Serial.print(millivolts);
  Serial.println();
  delay(400);
}
