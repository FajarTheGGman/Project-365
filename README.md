# Project 365%
<p>Simple Project For Home Automation</p>

![](https://img.shields.io/badge/react-native-blue)
![](https://img.shields.io/badge/nodejs-16.7.0-lime) 
![](https://img.shields.io/badge/expo-4.5.2-white)
![](https://img.shields.io/badge/mongo-4.0.19-green)
![](https://img.shields.io/badge/expressjs-4.17.1-white)

<b top="10">This Project Still Under Development!</b>

<div align='center'>
<img src="https://i.ibb.co/28BfB88/icon.png"  width='190' />
<h3>Project 365%</h3>
</div>

[![Deploy Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)  [![Deploy Vercel](https://vercel.com/button)](https://vercel.com/new) [![Deploy Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/neverendingqs/netlify-express)


# How to install ?
<img src="https://media.giphy.com/media/kQOxxwjjuTB7O/giphy.gif" width="180" />

<i>Installations</i>
<pre>
Linux : bash install.sh
Windows: "click install.bat"
</pre>

<i>How to run ?</i>
<pre>
Linux: "bash run.sh"
Windows: "click run.bat"
</pre>

<i>Build Android Apps<i/>
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
}
```

```c
// [ESP-32]
#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>
#include <Update.h>
#include <ESPmDNS.h>

const char* wifi = "yourssid";
const char* pw = "yourpassword";

WebServer server(80);

// [Offline Mode] Initialize relays pin
const int relay1 = 23;
const int relay2 = 22;
const int relay3 = 21;
const int relay4 = 19;

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
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi, pw);
  
  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  pinMode(relay3, OUTPUT);
  pinMode(relay4, OUTPUT);

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

  // [Offline Mode] Routing url
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
}
```

# Screenshots
<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/banner1.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/banner2.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/banner3.png" width="250" height="450" /> 

<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/online.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/offline.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/settings.png" width="250" height="450" /> 

<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/login.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/register.png" width="250" height="450" /> 

<img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/menu.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/addrelay.png" width="250" height="450" /> <img src="https://raw.githubusercontent.com/FajarTheGGman/Project-365/main/images/screenshots/list.png" width="250" height="450" /> 


<img src="https://media.giphy.com/media/8X2kIbRJZQkdXt46ur/giphy.gif" width="180" />
<div>
<b>Special Thanks!</b><br>
<pre>
<img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg" width="50" /> <img src="https://image.flaticon.com/icons/png/512/2702/2702602.png"  width="40" /> <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg" bottom=15 width="40"  /> <img src="https://image.flaticon.com/icons/png/512/4478/4478878.png" bottom=15 width="40"  /> <img src="https://undraw.co/favicon.ico" bottom=15 width="40"  />
</pre>
</div>
