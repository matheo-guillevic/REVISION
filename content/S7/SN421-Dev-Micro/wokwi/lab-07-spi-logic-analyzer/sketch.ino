#include <SPI.h>

const uint8_t LATCH_PIN = PA4;
uint8_t pattern = 1;

void writeRegister(uint8_t value) {
  digitalWrite(LATCH_PIN, LOW);
  SPI.transfer(value);
  digitalWrite(LATCH_PIN, HIGH);
}

void setup() {
  pinMode(LATCH_PIN, OUTPUT);
  SPI.begin();
  SPI.beginTransaction(SPISettings(1000000, MSBFIRST, SPI_MODE0));
  Serial.begin(115200);
  Serial.println("Lab 07 - SPI mode 0 vers 74HC595. Capturer SCK/MOSI/LATCH.");
}

void loop() {
  writeRegister(pattern);
  Serial.print("SPI byte = 0b");
  for (int bit = 7; bit >= 0; bit--) Serial.print((pattern >> bit) & 1);
  Serial.println();
  pattern = (pattern << 1) | (pattern >> 7);
  delay(500);
}
