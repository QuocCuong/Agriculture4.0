#include <ArduinoJson.h>
#include <SocketIOClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include "/libs/nqc_gpio.h"

#define NUMITEMS(arg) ((unsigned int) (sizeof (arg) / sizeof (arg [0])))
const String LOCATION[2] = {"10.0289683", "105.7810024"};


extern String RID;
extern String Rcontent;

const char* wifi_station[][2]={
  {"CTY PHU THO","Phutho88888888"},
  {"QuanDiemDem", "012345679"},
  {"Tenda_4252D8", ""},
  {"NT Giao Cuong", "111333555"},
  {"CTY-PHUTHO", "ctyphutho"}
};

String JSON;
SocketIOClient client;
StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

GPIO led_status(LED_BUILTIN);
void setup() {
  Serial.begin(115200);
  
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  
  Serial.printf("\nESP8266 Chip id = %08X\n", ESP.getChipId());
  Serial.println("Setup done!");
  
  WiFi_connect();

  if (!client.connect("192.168.111.42", 3000))
    Serial.println("connection failed");
  else
    client.send("new-connection", "", "");
}
void loop(){
  if(client.monitor() && client.connected()){
    if(RID == "who-are-you"){
      RID = "";
      char ID[12];
      sprintf(ID, "0x%08X", ESP.getChipId());
      
      root["DEVICE"] = "ESP8266";
      root["ID"] = ID;
      root["IP"] = IpAddress2String(WiFi.localIP());
      JsonArray& location = root.createNestedArray("LOCATION");
      location.add(LOCATION[0]);
      location.add(LOCATION[1]);
      
      root.printTo(JSON);
      client.sendJSON("i-am-device", JSON);
    }
  }
  else{
    led_status.toggle(500);
  }
}
