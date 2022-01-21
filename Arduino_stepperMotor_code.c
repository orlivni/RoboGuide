#include <AccelStepper.h>

int index ;
int val = 0;
//constructor with type AccelStepper,AccelStepper
//AccelStepper (uint8_t interface=AccelStepper::FULL4WIRE,
// uint8_t pin1=2, uint8_t pin2=3, uint8_t pin3=4, uint8_t pin4=5, bool enable=true)
//AccelStepper (void(*forward)(), void(*backward)()))	

AccelStepper stepperZ(1, 7, 8); 

float Z=-220000;

//int i = 500;
void setup() {
//Sets the data rate in bits per second (baud) for serial data transmission
Serial.begin(9600); 
index = 0;

pinMode(13,INPUT);
//digitalWrite() will enable ( HIGH ) or disable ( LOW ) the internal pullup on the input pin
digitalWrite(13,0);
delay(10);
}



void loop() {
 
 val = digitalRead(13);  

//move down
if(val == 1 && index == 0)
 {

 stepperZ.moveTo(-30000);
 stepperZ.setMaxSpeed(6000);
 stepperZ.setSpeed(6000);  

  
 while ( stepperZ.distanceToGo() != 0 )
   {
   //Runs at the currently selected speed until the target position is reached.
   //Does not implement accelerations.
   //Returns true if it stepped
    stepperZ.runSpeedToPosition ( ); 
  
   }

//Serial.print("HELLO2");
  stepperZ.moveTo(Z);//change to target position
 stepperZ.setMaxSpeed(12000);//change to maxSpeed
 stepperZ.setSpeed(12000);  //change to Speed
    
 while ( stepperZ.distanceToGo() != 0 )
   {
    stepperZ.runSpeedToPosition ( ); 
   }


index = 1;
val = digitalRead(13);

 }


//up and down
if(val == 1 && index == 1)
 {
 
  stepperZ.moveTo(Z+4000);
 stepperZ.setMaxSpeed(6000);
 stepperZ.setSpeed(6000);  
    
 while ( stepperZ.distanceToGo() != 0 )
   {
    stepperZ.runSpeedToPosition ( ); 
   }
   

stepperZ.moveTo(0);
 stepperZ.setMaxSpeed(15000);
 stepperZ.setSpeed(15000);  
    
 while ( stepperZ.distanceToGo() != 0 )
   {
    stepperZ.runSpeedToPosition ( ); 
   }
   
 index = 0;

 }
   
}