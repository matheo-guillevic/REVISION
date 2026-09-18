#include <avr/io.h>
#include <avr/interrupt.h>

#define MODE_REGISTER_ISR 1
#define MODE_ATTACH_INTERRUPT 2

#define ACTIVE_MODE MODE_REGISTER_ISR

#if ACTIVE_MODE == MODE_REGISTER_ISR
ISR(INT0_vect) {
  PORTB |= (1 << PORTB5);
}
#else
void onInt0() {
  PORTB |= (1 << PORTB5);
}
#endif

void setup() {
  DDRB |= (1 << DDB5);
  PORTD &= ~(1 << PORTD2);

#if ACTIVE_MODE == MODE_REGISTER_ISR
  EICRA |= (1 << ISC01) | (1 << ISC00);
  EIMSK |= (1 << INT0);
  EIFR |= (1 << INTF0);
  sei();
#else
  attachInterrupt(digitalPinToInterrupt(2), onInt0, RISING);
#endif
}

void loop() {
  PORTB &= ~(1 << PORTB5);
}
