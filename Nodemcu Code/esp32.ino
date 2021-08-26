// Copyright 2021 By Fajar Firdaus
#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <Update.h>
#include <ESPmDNS.h>

const char* wifi = "ServerIOT";
const char* pw = "fajarfirdaus";

String cloudServer = "http://192.168.1.11:5000/";
String get_relay = cloudServer + "relay";
String send_serial = cloudServer + "serial";


WebServer server(80);
HTTPClient http;

const int relay1 = 23;
const int relay2 = 22;
const int relay3 = 21;
const int relay4 = 19;

// Default Relay Settings
void relay(){
    String get_pin = server.arg("pin");
    int pin = get_pin.toInt();
    
    if(server.arg("volt") == "HIGH"){
      digitalWrite(pin, HIGH);
      server.send(200, "text/plain", "{ pin " + get_pin + ": ON } ");
    }else if(server.arg("volt") == "LOW"){
      digitalWrite(pin, LOW);
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

void setup(void) {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi, pw);
  
  pinMode(4, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);

  while(WiFi.status() != WL_CONNECTED){
       delay(100);
       Serial.print("-");
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

  if(!MDNS.begin("Project-365")){
    while(1){
      delay(1000);
    }
  }

  server.on("/", []() {
      server.send(200, "text/plain", "{ Server: 'Project - 365%'}");
   });

  server.on("/relay", relay);
  server.on("/read", readSensor);
   
  server.on("/code", HTTP_POST, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "text/plain", (Update.hasError()) ? "FAIL" : "OK");
    ESP.restart();
  }, []() {
    HTTPUpload& upload = server.upload();
    if (upload.status == UPLOAD_FILE_START) {
      Serial.printf("Update: %s\n", upload.filename.c_str());
      if (!Update.begin(UPDATE_SIZE_UNKNOWN)) { //start with max available size
        Update.printError(Serial);
      }
    } else if (upload.status == UPLOAD_FILE_WRITE) {
      if (Update.write(upload.buf, upload.currentSize) != upload.currentSize) {
        Update.printError(Serial);
      }
    } else if (upload.status == UPLOAD_FILE_END) {
      if (Update.end(true)) { 
        Serial.printf("Update Success: %u\nRebooting...\n", upload.totalSize);
      } else {
        Update.printError(Serial);
      }
    }
  });
   

  server.begin();
}

void loop(void) {
  server.handleClient();
  delay(500);
  digitalWrite(2, HIGH);
  delay(500);
  digitalWrite(2, LOW);
  delay(500);

  http.begin(get_relay);
  
  if(http.GET() == 200){
    String payload = http.getString();
    
    JSONVar thedata = JSON.parse(payload);
  }
  
  http.end();
  
}
