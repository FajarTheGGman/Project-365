# Project 365%
<p>Home Automation With MERN Stack</p>

![](https://img.shields.io/badge/react-native-blue)
![](https://img.shields.io/badge/nodejs-16.7.0-lime) 
![](https://img.shields.io/badge/expo-4.5.2-white)
![](https://img.shields.io/badge/mongo-4.0.19-green)
![](https://img.shields.io/badge/expressjs-4.17.1-white)

<div align='center'>
<img src="https://i.ibb.co/28BfB88/icon.png"  width='190' />
<h3>Project 365%</h3>
<a href="https://github.com/FajarTheGGman/Project-365/raw/main/Project-365.apk"><img src="https://img.shields.io/badge/Application-Download-green?style=for-the-badge&logo=appveyor" width='200' /></a>
</div>


![](https://img.shields.io/badge/Tested-ESP32-lime)
![](https://img.shields.io/badge/Tested-ESP8266-lime)

[![Deploy Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)  [![Deploy Vercel](https://vercel.com/button)](https://vercel.com/new) [![Deploy Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/neverendingqs/netlify-express)


# How to install ?
<img src="https://media.giphy.com/media/kQOxxwjjuTB7O/giphy.gif" width="180" />

<i>Installations</i>
<pre>
[ Linux ]
Linux : bash setup.sh --install

[ Windows ]
install-dependencies: "click setup.bat"
</pre>

<i>How to run ?</i>
<pre>
[ Linux ]
running backend: "bash setup.sh --server"
running android: "bash setup.sh --android"

[ Windows ]
running backend: "click backend.bat"
running android: "click android.bat"
</pre>

<i>Build Android Apps</i>
```bash
root@user-# cd Android
root@user-# expo build:android
```

<br>
<br>

# How can i setup this things

<b>Example Wiring</b><br></br>
<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/example_diagram.png" width="620" height="320" />
<br></br>
<b>Minimum Wiring</b><br></br>
<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/Android/assets/icons/schematic.png" width="450" height="290" />
<br></br>
<b>The Flowchart</b><br></br>
<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/flowchart.png" width="520" height="320" />
<br></br>
<b>Databases Diagram</b><br></br>
<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/erd.png" width="420" height="320" />

<b>Hardware</b>
<pre>
[ Minimal Requirements ]
- Relays
- Nodemcu esp8266 / Nodemcu esp32
- or any sensors
</pre>

<b>Software</b>
<pre>
[ Arduino IDE ]
- Nodemcu board library
- ESPHTTPClient
- ESPWebServer
- Arduino JSON
- Arduino OTA

[ Server ]
- MongoDB
- ExpressJS
- React Native
- NodeJS
</pre>

<b>Example code</b>
<i>[ Setup Routing and relays pin in offline mode ]</i>

```c
// [ESP8266]
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>

// Initialize your ssid
char* ssid = "yourssid";
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
    
http.useHTTP10(true);

// [Online Mode] get relay activities from android app and send it to nodemcu
http.begin(get_activities);
http.GET();

StaticJsonDocument<200> js;
deserializeJson(js, http.getStream());

int pin = js["pin"];
bool v = js["status"];

if(v){
    digitalWrite(pin, LOW);
}else{
    digitalWrite(pin, HIGH);
}

http.end();

// [Online Mode] get sensor activities from nodemcu and send it to android app
http.begin(get_sensor_activities);

StaticJsonDocument<200> doc;
deserializeJson(doc, http.getStream());


http.end();
}
```

```c
// [ESP-32]
// Copyright 2021 By Fajar Firdaus
#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Update.h>
#include <ESPmDNS.h>

const char* wifi = "ssid";
const char* pw = "password";

String cloudServer = "yourserver";
String token = "yourtoken";
String key = "Important";

String get_activities = cloudServer + "board/relay/activities?token=" + token + "&secret=" + key;
String get_sensor_activities = cloudServer + "board/sensor/activities?token=" + token + "&secret" + key;
String send_location = cloudServer + "board/location?token=" + token + "&secret=" + key + "&location="; 
String get_location = "http://ip-api/json";

WebServer server(80);
HTTPClient http;

const int relay1 = 23;
const int relay2 = 22;
const int relay3 = 21;
const int relay4 = 19;

// Default Relay Settings

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

void catch_relay(int pin, bool volt){
  if(volt){
    digitalWrite(pin, LOW);
  }else{
    digitalWrite(pin, HIGH);
  }
}

void setup(void) {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi, pw);
  
  // Example pin
  pinMode(4, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(13, OUTPUT);
  
  digitalWrite(LED_BUILTIN, LOW);
   
  // Check router connection
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

  digitalWrite(LED_BUILTIN, HIGH);

  if(!MDNS.begin("Project-365")){
    while(1){
      delay(1000);
    }
  }

  server.on("/", []() {
      server.send(200, "text/plain", "{ Server: 'Project - 365%'}");
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
  
http.useHTTP10(true);

// [Online Mode] get relay activities from android app and send it to nodemcu
http.begin(get_activities);
http.GET();

StaticJsonDocument<200> js;
deserializeJson(js, http.getStream());

int pin = js["pin"];
bool v = js["status"];

if(v){
    digitalWrite(pin, LOW);
}else{
    digitalWrite(pin, HIGH);
}

http.end();

// [Online Mode] get sensor activities from nodemcu and send it to android app
http.begin(get_sensor_activities);

StaticJsonDocument<200> doc;
deserializeJson(doc, http.getStream());


http.end();

}

```

# Screenshots

<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/Android/assets/splash.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/banner.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/bannner2.png" width="250" height="450" /> 

<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/banner3.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/404.png" width="250" height="450" /> 

<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/online.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/offline.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/settings.png" width="250" height="450" /> 

<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/login.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/register.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/server.png" width="250" height="450" /> 

<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/menu.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/addrelay.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/list.png" width="250" height="450" /> 


<img src="https://media.giphy.com/media/8X2kIbRJZQkdXt46ur/giphy.gif" width="180" />
<div>
<b>Special Thanks!</b><br>
<pre>
<img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg" width="50" /> <img src="https://image.flaticon.com/icons/png/512/2702/2702602.png"  width="40" /> <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg" bottom=15 width="40"  /> <img src="https://image.flaticon.com/icons/png/512/4478/4478878.png" bottom=15 width="40"  /> <img src="https://undraw.co/favicon.ico" bottom=15 width="40"  />
</pre>
</div>
