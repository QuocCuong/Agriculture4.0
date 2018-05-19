#include "Arduino.h"
#include "nqc_gpio.h"

GPIO::GPIO(int pin){
  pPin = pin;
  pinMode(pPin, OUTPUT);
}

void GPIO::high(){
  digitalWrite(pPin, HIGH);
}

void GPIO::low(){
  digitalWrite(pPin, HIGH);
}

void GPIO::toggle(){
  digitalWrite(pPin, !digitalRead(pPin));
}

void GPIO::toggle(int ms){
  digitalWrite(pPin, !digitalRead(pPin));
  delay(ms);
}

void GPIO::write(boolean state){
  digitalWrite(pPin, state);
}

bool GPIO::read(){
  digitalRead(pPin);
}

