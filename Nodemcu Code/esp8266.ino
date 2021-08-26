#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <Update.h>

#define ssid = "ServerIOT"
#define pwd = "fajarfirdaus"

#define relay1 = D0
#define relay2 = D1
#define relay3 = D2
#define relay4 = D3

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, pwd);
  pinMode(LED_BUILTIN);
  pinMode(relay1);
  pinMode(relay2);
  pinMode(relay3);
  pinMode(relay4);

 if(WiFi.status() != WL_CONNECTED){
  delay(100);
   Serial.print(".");
 }

  Serial.print(" [+] Connected");
  Serial.println("{");
  Serial.println("Coder: 'Fajar Firdaus'");
  Serial.println("IG: '@kernel024'");
  Serial.println("Twitter: @kernel024'");
  Serial.println("GIthub: 'FajarTheGGman'");
  
  Serial.println("{");
  Serial.print("IP : ");
  Serial.println(WiFi.localIP());
  Serial.println("}");


server.on("/", [](){
  server.send(200, "text/plain", "{ Wellcome: 'Project - 365%' }");
});

 server.begin();
  
}

void loop() {
  server.handleClient();
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
