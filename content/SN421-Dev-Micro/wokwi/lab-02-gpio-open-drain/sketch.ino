const uint8_t PUSH_PULL_PIN = PB0;
const uint8_t OPEN_DRAIN_PIN = PB1;

void setup() {
  pinMode(PUSH_PULL_PIN, OUTPUT);
  Serial.begin(115200);
  Serial.println("Lab 02 - PB0 push-pull, PB1 open-drain emule avec pull-up 4.7k.");
}

void loop() {
  digitalWrite(PUSH_PULL_PIN, HIGH);
  pinMode(OPEN_DRAIN_PIN, OUTPUT);
  digitalWrite(OPEN_DRAIN_PIN, LOW);
  Serial.println("Push-pull=HIGH, open-drain tire la ligne a 0");
  delay(1000);

  digitalWrite(PUSH_PULL_PIN, LOW);
  pinMode(OPEN_DRAIN_PIN, INPUT);
  Serial.println("Push-pull=LOW, open-drain relache la ligne: pull-up => 1");
  delay(1000);
}
