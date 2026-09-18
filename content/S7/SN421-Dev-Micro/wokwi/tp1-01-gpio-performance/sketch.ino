#include <avr/io.h>

#define MODE_DIGITAL_WRITE 1
#define MODE_DIRECT_PORT 2
#define MODE_PINB_TOGGLE 3

#define ACTIVE_MODE MODE_PINB_TOGGLE

void setup() {
#if ACTIVE_MODE == MODE_DIGITAL_WRITE
  pinMode(13, OUTPUT);
#else
  DDRB |= (1 << DDB5);
#endif
}

void loop() {
#if ACTIVE_MODE == MODE_DIGITAL_WRITE
  digitalWrite(13, HIGH);
  digitalWrite(13, LOW);
#elif ACTIVE_MODE == MODE_DIRECT_PORT
  PORTB |= (1 << PORTB5);
  PORTB &= ~(1 << PORTB5);
#elif ACTIVE_MODE == MODE_PINB_TOGGLE
  PINB |= (1 << PINB5);
#endif
}
