#include <Wire.h>

const uint8_t MPU6050_ADDR = 0x68;
const uint8_t REG_PWR_MGMT_1 = 0x6B;
const uint8_t REG_TEMP_OUT_H = 0x41;

bool writeRegister(uint8_t reg, uint8_t value) {
  Wire.beginTransmission(MPU6050_ADDR);
  Wire.write(reg);
  Wire.write(value);
  return Wire.endTransmission() == 0;
}

bool readTemperatureRaw(int16_t &raw) {
  Wire.beginTransmission(MPU6050_ADDR);
  Wire.write(REG_TEMP_OUT_H);
  if (Wire.endTransmission(false) != 0) return false;

  if (Wire.requestFrom(MPU6050_ADDR, (uint8_t)2) != 2) return false;
  raw = (int16_t)((uint16_t)Wire.read() << 8 | Wire.read());
  return true;
}

void setup() {
  Serial.begin(115200);
  Wire.begin(); // Blue Pill: PB7=SDA, PB6=SCL avec le core STM32 Arduino

  Serial.println("Lab 06 - I2C MPU6050 sur PB7=SDA, PB6=SCL. Capturer D0/D1.");

  if (!writeRegister(REG_PWR_MGMT_1, 0x00)) {
    Serial.println("Erreur: MPU6050 non detecte a l'adresse 0x68.");
  }
}

void loop() {
  int16_t raw;
  if (readTemperatureRaw(raw)) {
    // Formule MPU6050: T = raw/340 + 36.53 °C
    int32_t tempCenti = ((int32_t)raw * 100L) / 340L + 3653L;
    Serial.print("Temperature ~= ");
    if (tempCenti < 0) {
      Serial.print('-');
      tempCenti = -tempCenti;
    }
    Serial.print(tempCenti / 100);
    Serial.print('.');
    uint8_t decimals = tempCenti % 100;
    if (decimals < 10) Serial.print('0');
    Serial.print(decimals);
    Serial.println(" C");
  } else {
    Serial.println("Erreur de lecture I2C.");
  }

  delay(1000);
}
