#ifndef NQC_GPIO_H
#define NQC_GPIO_H

#include "Arduino.h"

class GPIO{
  public:
    GPIO(int pin);
    void high();
    void low();
    void toggle();
    void toggle(int ms);
    void write(boolean state);
    bool read();
  private:
    int pPin;
};
#endif
