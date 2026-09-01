const uint8_t LED_PIN = PB0;
const uint8_t BUFFER_SIZE = 64;

volatile char ringBuffer[BUFFER_SIZE];
volatile uint8_t head = 0;
volatile uint8_t tail = 0;

void pushChar(char c) {
  uint8_t next = (head + 1) % BUFFER_SIZE;
  if (next != tail) {
    ringBuffer[head] = c;
    head = next;
  }
}

bool popChar(char *out) {
  if (tail == head) return false;
  *out = ringBuffer[tail];
  tail = (tail + 1) % BUFFER_SIZE;
  return true;
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
  Serial.println("Lab 05 - taper des caracteres dans le Serial Monitor.");
  Serial.println("Commande: 't' bascule la LED.");
}

void loop() {
  while (Serial.available()) {
    pushChar((char)Serial.read());
  }

  char c;
  while (popChar(&c)) {
    Serial.print("RX: ");
    Serial.println(c);
    if (c == 't' || c == 'T') {
      digitalWrite(LED_PIN, !digitalRead(LED_PIN));
    }
  }
}
