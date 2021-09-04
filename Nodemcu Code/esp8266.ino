#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>

SoftwareSerial mainMachine(5, 6);
ESP8266WebServer server(80);
HTTPClient http;

String cloudServer = "http://192.168.1.9:5000/";
String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZhamFyIiwicGFzc3dvcmQiOiIkMmIkMTAkUmt5Y041ZnpFSG9mVGpYN1NJTTRXdUxHZ2hkUnFMcTFZT0NkdHVKbzRtdnhjeUg1MmUvQUsiLCJpYXQiOjE2MzAwMzA5NDl9.ZATeLVH-eatbmducQ5qLpFYOHt_372ThVebOsEjeFLc";
String key = "Important";

String get_relay = cloudServer + "board/relay/getall?token=" + token + "&secret=" + key;
String get_spesific_relay = cloudServer + "board/relay?token=" + token + "&secret=" + key;
String send_location = cloudServer + "board/location?token=" + token + "&secret=" + key + "&location="; 
String get_location = "http://ip-api/json";


char* ssid = "ServerIOT";
char* pwd = "fajarfirdaus";


void relay(){
    String get_pin = server.arg("pin");
    int pin = get_pin.toInt();
    
    if(server.arg("volt") == "HIGH"){
      digitalWrite(pin, LOW);
      server.send(200, "text/plain", "{ pin " + get_pin + ": ON } ");
    }else if(server.arg("volt") == "LOW"){
      digitalWrite(pin, HIGH);
      server.send(200, "text/plain", "{ pin " + get_pin + ": OFF } ");
    }else{
      server.send(200, "text/plain", "{ error: 'No Arguments' }");
    }
}

void readSensor(){
  String get_pin = server.arg("pin");
  int pin = get_pin.toInt();

  if(server.arg("type") == "analog"){
    int data_sensor = analogRead(pin);
    String str = String(data_sensor);
    server.send(200, "text/plain", str);
  }else if(server.arg("type") == "digital"){
    int data_sensor = digitalRead(pin);
    String str = String(data_sensor);
    server.send(200, "text/plain", str);
  }else{
    server.send(200, "text/plain","{ Error: 'No Arguments' }");
  }
}


void relaysatu(){
   server.send(200, "text/plain", "{'Relay1': 'Menyala'}");
   digitalWrite(D0, LOW);
}

void relaydua(){
  server.send(200, "text/plain", "{'Relay2': 'Menyala'}");
  digitalWrite(D1, LOW);
}

void relaytiga(){
  server.send(200, "text/plain", "{'Relay3': 'Menyala'}");
  digitalWrite(D2, LOW);
}

void relayempat(){
  server.send(200, "text/plain", "{'Relay4': 'Menyala'}");
  digitalWrite(D3, LOW);
}

// Relay Mode Mati

void relaysatumati(){
   server.send(200, "text/plain", "{'Relay1': 'Mati'}");
   digitalWrite(D0, HIGH);
}

void relayduamati(){
  server.send(200, "text/plain", "{'Relay2': 'Mati'}");
  digitalWrite(D1, HIGH);
}

void relaytigamati(){
  server.send(200, "text/plain", "{'Relay3': 'Mati'}");
  digitalWrite(D2, HIGH);
}

void relayempatmati(){
  server.send(200, "text/plain", "{'Relay4': 'Mati'}");
  digitalWrite(D3, HIGH);
}

void generate(int pin, bool volt, bool type){
  if(type){
    if(volt){
      digitalWrite(pin, HIGH); 
    }else{
      digitalWrite(pin, LOW); 
    }
 }else{
     if(volt){
      analogWrite(pin, HIGH); 
    }else{
      analogWrite(pin, LOW); 
    }
  }
}

void setup() {
  Serial.begin(115200);
  mainMachine.begin(9600);
  WiFi.begin(ssid, pwd);
  pinMode(D0, OUTPUT);
  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);

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

server.on("/relay", relay);
server.on("/read", readSensor);

server.on("/relay1", relaysatu);
server.on("/relay2", relaydua);
server.on("/relay3", relaytiga);
server.on("/relay4", relayempat);

server.on("/relay1mati", relaysatumati);
server.on("/relay2mati", relayduamati);
server.on("/relay3mati", relaytigamati);
server.on("/relay4mati", relayempatmati);


server.begin();

// Get board location 
String coordinates;
http.begin(get_location);

if(http.GET() == 200){
  coordinates = http.getString();
}else{
  Serial.println("[!] Error GET location data");
}

http.end();

http.begin(send_location + coordinates);

if(http.GET() == 200){
  Serial.println(http.getString());
}else{
  Serial.println("[!] Error Sending data");
}

http.end();

}


void loop(void) {
  server.handleClient();

  http.begin(get_relay);
  if(http.GET() == 200){
    Serial.println(http.getString());
  }else if(http.GET() == 404){
    Serial.println("relay/getall -> 404");
  }else{
    Serial.println("[!] Network Unreachable");
  }
  http.end();
  
  delay(3000);
}
