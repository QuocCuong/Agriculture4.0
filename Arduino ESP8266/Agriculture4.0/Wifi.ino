#include <Arduino.h>
void WiFi_connect(){
  Serial.println("Scan start");
  int n = WiFi.scanNetworks();
  if(n != 0){
    int max_rssi = -100;
    String ssid = "";
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i){
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print("dBm)");
      Serial.println((WiFi.encryptionType(i) == ENC_TYPE_NONE)?" ":"*");
      delay(10);
      for(int j=0; j<NUMITEMS(wifi_station); j++){
        if((String)wifi_station[j][0] == WiFi.SSID(i)){
          if(WiFi.RSSI(i)>max_rssi)
            max_rssi = WiFi.RSSI(i);
            ssid = WiFi.SSID(i);
        }
      }
    }
    for(int i=0; i<NUMITEMS(wifi_station); i++){
      if(ssid == wifi_station[i][0]){
        Serial.println();
        Serial.print("Connecting to ");
        Serial.println(ssid);
        WiFi.begin(wifi_station[i][0], wifi_station[i][1]);
        while (WiFi.status() != WL_CONNECTED) {
          delay(200);
          Serial.print(".");
        }
        Serial.println("");
        Serial.println("WiFi connected");  
        Serial.println("IP address: ");
        Serial.println(WiFi.localIP());
      }
    }
    if(WiFi.status() != WL_CONNECTED){
      Serial.println("Cannot connect to WiFi");
    }
  }
}

String IpAddress2String(const IPAddress& ipAddress)
{
  return String(ipAddress[0]) + String(".") +\
  String(ipAddress[1]) + String(".") +\
  String(ipAddress[2]) + String(".") +\
  String(ipAddress[3])  ; 
}
