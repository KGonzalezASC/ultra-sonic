int proxTrigPin = A1; //pin;
int proxEchoPin = A0; //pin;
long duration;
float distance;
float delta;
float lastDist = 0;
float finalDist;

void setup() {
  // put your setup code here, to run once:
  pinMode(proxTrigPin, OUTPUT);
  pinMode(proxEchoPin,INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  //Sonar Data
  String arduinoData = "";
  digitalWrite(proxTrigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(proxTrigPin, HIGH);
  delayMicroseconds(5);
  digitalWrite(proxTrigPin, LOW);

  duration = pulseIn(proxEchoPin, HIGH);
  distance = duration / 29 / 2; // in centimeters
  delta = distance - lastDist;
  delta = abs(delta);
  //succeed con & start con
  if(lastDist==0||delta<300){
    finalDist = distance;
    lastDist = distance;
  }else{ // fail con
    finalDist = lastDist;
  }
  String proxData = ",Proximity:";
  proxData = proxData + finalDist;
  arduinoData += proxData;
  
  // Serial.println(duration);
  // Serial.println(distance);

  Serial.println(arduinoData);

  delay(100);
}
