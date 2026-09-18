const uint8_t START_PIN = PA0;
const uint8_t RESET_PIN = PA1;
const uint8_t RED_PIN = PB0;
const uint8_t GREEN_PIN = PB1;
const uint8_t BLUE_PIN = PB10;

enum State {
  IDLE,
  ACQUIRE,
  PROCESS,
  ALERT
};

volatile bool startEvent = false;
volatile bool resetEvent = false;
State state = IDLE;
unsigned long stateSince = 0;

void onStart() {
  startEvent = true;
}

void onReset() {
  resetEvent = true;
}

void setRgb(bool r, bool g, bool b) {
  digitalWrite(RED_PIN, r);
  digitalWrite(GREEN_PIN, g);
  digitalWrite(BLUE_PIN, b);
}

void enterState(State next) {
  state = next;
  stateSince = millis();
  Serial.print("Etat = ");
  Serial.println((int)state);
}

void setup() {
  pinMode(START_PIN, INPUT_PULLUP);
  pinMode(RESET_PIN, INPUT_PULLUP);
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(START_PIN), onStart, FALLING);
  attachInterrupt(digitalPinToInterrupt(RESET_PIN), onReset, FALLING);
  Serial.begin(115200);
  enterState(IDLE);
}

void loop() {
  if (resetEvent) {
    resetEvent = false;
    enterState(IDLE);
  }

  switch (state) {
    case IDLE:
      setRgb(false, false, true);
      if (startEvent) {
        startEvent = false;
        enterState(ACQUIRE);
      }
      break;

    case ACQUIRE:
      setRgb(false, true, false);
      if (millis() - stateSince > 3000) enterState(PROCESS);
      break;

    case PROCESS:
      setRgb(true, true, false);
      if (millis() - stateSince > 3000) enterState(ALERT);
      break;

    case ALERT:
      setRgb((millis() / 250) % 2, false, false);
      if (startEvent) {
        startEvent = false;
        enterState(IDLE);
      }
      break;
  }
}
