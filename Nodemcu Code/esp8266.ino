#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>

SoftwareSerial mainMachine(5, 6);
ESP8266WebServer server(80);
HTTPClient http;

String cloudServer = "http://yourserver.com/";
String token = "yourtoken";
String key = "Important";

String get_relay = cloudServer + "board/relay/getall?token=" + token + "&secret=" + key;
String get_spesific_relay = cloudServer + "board/relay?token=" + token + "&secret=" + key;
String send_location = cloudServer + "board/location?token=" + token + "&secret=" + key + "&location="; 
String get_location = "http://ip-api/json";

// Initialize your ssid
char* ssid = "yourssdname";
char* pwd = "yourpassword";

// [Offline Mode] define a relays pin
#define relay1 D0 // or another pin, it's up to you
#define relay2 D1 // or another pin, it's up to you
#define relay3 D2 // or another pin, it's up to you
#define relay4 D3 // or another pin, it's up to you

// [Offline Mode] relay function [ ON ]
void relayone(){
    digitalWrite(relay1, LOW);
    server.send(200, "text/plain", "{ Relay1: ON }");
}

void relaytwo(){
    digitalWrite(relay2, LOW);
    server.send(200, "text/plain", "{ Relay2: ON }");
}

void relaythree(){
    digitalWrite(relay3, LOW);
    server.send(200, "text/plain", "{ Relay3: ON }");
}

void relayfour(){
    digitalWrite(relay4, LOW);
    server.send(200, "text/plain", "{ Relay4: ON }");
}

// [Offline Mode] relay function [ OFF ]
void relayonedie(){
    digitalWrite(relay1, HIGH);
    server.send(200, "text/plain", "{ Relay1: OFF }");
}

void relaytwodie(){
    digitalWrite(relay2, HIGH);
    server.send(200, "text/plain", "{ Relay2: OFF }");
}

void relaythreedie(){
    digitalWrite(relay3, HIGH);
    server.send(200, "text/plain", "{ Relay3: OFF }");
}

void relayfourdie(){
    digitalWrite(relay4, HIGH);
    server.send(200, "text/plain", "{ Relay4: OFF }");
}

void setup(void) {
  Serial.begin(115200);
  mainMachine.begin(9600);
  WiFi.begin(ssid, pwd);
    
  // [Offline Mode] Initialize pin
  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  pinMode(relay3, OUTPUT);
  pinMode(relay4, OUTPUT);

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

// [Offline Mode] routing url
server.on("/relay1", relayone);
server.on("/relay2", relaytwo);
server.on("/relay3", relaythree);
server.on("/relay4", relayfour);

server.on("/relay1die", relayonedie);
server.on("/relay2die", relaytwodie);
server.on("/relay3die", relaythreedie);
server.on("/relay4die", relayfourdie);


server.begin();
}


void loop(void) {
  server.handleClient();
}
