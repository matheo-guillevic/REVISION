#include <avr/io.h>
#include <avr/interrupt.h>

#define DEMO_CTC_INTERRUPT 1
#define DEMO_FAST_PWM 2

#define ACTIVE_DEMO DEMO_CTC_INTERRUPT

void setup() {
#if ACTIVE_DEMO == DEMO_CTC_INTERRUPT
  DDRB |= (1 << DDB5);

  TCCR1A = 0;
  TCCR1B = 0;
  TCCR1B |= (1 << WGM12);
  OCR1A = 62499;
  TIMSK1 |= (1 << OCIE1A);
  TCCR1B |= (1 << CS12);
  sei();
#else
  DDRB |= (1 << DDB1);

  TCCR1A = 0;
  TCCR1B = 0;
  TCCR1A |= (1 << WGM11);
  TCCR1B |= (1 << WGM13) | (1 << WGM12);
  TCCR1A |= (1 << COM1A1);

  ICR1 = 62499;
  OCR1A = 31249;
  TCCR1B |= (1 << CS12);
#endif
}

#if ACTIVE_DEMO == DEMO_CTC_INTERRUPT
ISR(TIMER1_COMPA_vect) {
  PINB |= (1 << PINB5);
}
#endif

void loop() {}
