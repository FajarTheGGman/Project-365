# Project 365%
<p>Home Automation With MERN Stack and Adafruit MQTT</p>

![](https://img.shields.io/badge/caution-information-yellow) <b>Online Mode Still in development</b>

![](https://img.shields.io/badge/react-native-blue)
![](https://img.shields.io/badge/nodejs-16.7.0-lime) 
![](https://img.shields.io/badge/expo-4.5.2-white)
![](https://img.shields.io/badge/mongo-4.0.19-green)
![](https://img.shields.io/badge/expressjs-4.17.1-white)
![](https://img.shields.io/badge/Backend-Adafruit_MQTT-black?logo=adafruit)

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

<i>How to deploy to Heroku ? </i>
<pre>
1.fork this project
2.change "your mongodb url" to your mongodb server in app.json file
3.click deploy to heroku
</pre>

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
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

ESP8266WebServer server(80);

// [Offline Mode] define a relays pin
#define relay1 D1 // or another pin, it's up to you
#define relay2 D2 // or another pin, it's up to you
#define relay3 D3 // or another pin, it's up to you
#define relay4 D4 // or another pin, it's up to you

// [Offline Mode] relay function [ ON ]
void relayone() {
  digitalWrite(relay1, LOW);
  server.send(200, "text/plain", "{ Relay1: ON }");
}

void relaytwo() {
  digitalWrite(relay2, LOW);
  server.send(200, "text/plain", "{ Relay2: ON }");
}

void relaythree() {
  digitalWrite(relay3, LOW);
  server.send(200, "text/plain", "{ Relay3: ON }");
}

void relayfour() {
  digitalWrite(relay4, LOW);
  server.send(200, "text/plain", "{ Relay4: ON }");
}

// [Offline Mode] relay function [ OFF ]
void relayonedie() {
  digitalWrite(relay1, HIGH);
  server.send(200, "text/plain", "{ Relay1: OFF }");
}

void relaytwodie() {
  digitalWrite(relay2, HIGH);
  server.send(200, "text/plain", "{ Relay2: OFF }");
}

void relaythreedie() {
  digitalWrite(relay3, HIGH);
  server.send(200, "text/plain", "{ Relay3: OFF }");
}

void relayfourdie() {
  digitalWrite(relay4, HIGH);
  server.send(200, "text/plain", "{ Relay4: OFF }");
}

void notfound(){
  server.send(404, "text/plain", "{ Not_Found: 404 }");
}


// [Online Mode] Setup The Adafruit IO

#define WLAN_SSID       "YOUR_SSID"
#define WLAN_PASS       "YOUR_PASS"

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883                   // use 8883 for SSL
#define AIO_USERNAME    "YOUR_USERNAME"
#define AIO_KEY         "YOUR_KEY"

WiFiClient client;

Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

Adafruit_MQTT_Publish photocell = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/photocell");

Adafruit_MQTT_Subscribe relay_one = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/relay-one");
Adafruit_MQTT_Subscribe relay_two = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/relay-two");
Adafruit_MQTT_Subscribe relay_three = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/relay-three");
Adafruit_MQTT_Subscribe relay_four = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/relay-four");

void MQTT_connect();

void setup() {
  Serial.begin(115200);
  
  pinMode(relay1, OUTPUT);
  pinMode(relay2, OUTPUT);
  pinMode(relay3, OUTPUT);
  pinMode(relay4, OUTPUT);
  pinMode(2, OUTPUT);

  // Connect to WiFi access point.
  Serial.println(); Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.println("WiFi connected");
  Serial.println("IP address: "); Serial.println(WiFi.localIP());

  // Setup MQTT subscription
  mqtt.subscribe(&relay_one);
  mqtt.subscribe(&relay_two);
  mqtt.subscribe(&relay_three);
  mqtt.subscribe(&relay_four);

  digitalWrite(2, LOW);

  server.on("/", []() {
    server.send(200, "text/html", "{ Server: 'Project-365% - Main Machine' }");
  });

  // [Offline Mode] routing url
  server.on("/relay1", HTTP_POST, relayone);
  server.on("/relay2", HTTP_POST, relaytwo);
  server.on("/relay3", HTTP_POST,  relaythree);
  server.on("/relay4", HTTP_POST, relayfour);

  server.on("/relay1die", HTTP_POST, relayonedie);
  server.on("/relay2die", HTTP_POST, relaytwodie);
  server.on("/relay3die", HTTP_POST, relaythreedie);
  server.on("/relay4die", HTTP_POST, relayfourdie);

  server.onNotFound(notfound);


  server.begin();
}

uint32_t x=0;

void loop() {

  server.handleClient();
  
  MQTT_connect();

  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(500))) {
    if (subscription == &relay_one) {
      String relayOne = (char *)relay_one.lastread;

      Serial.print("Relay One said : ");
      Serial.println((char *)relay_one.lastread);

      if(relayOne == "OFF"){
        digitalWrite(relay1, HIGH);
      }else if(relayOne == "ON"){
        digitalWrite(relay1, LOW);
      }
    }else if (subscription == &relay_two) {
      String relayTwo = (char *)relay_two.lastread;

      Serial.print("Relay Two said : ");
      Serial.println((char *)relay_two.lastread);

      if(relayTwo == "OFF"){
        digitalWrite(relay2, HIGH);
      }else if(relayTwo == "ON"){
        digitalWrite(relay2, LOW);
      }
    }else if (subscription == &relay_three) {
      String relayThree = (char *)relay_three.lastread;

      Serial.print("Relay Three said : ");
      Serial.println((char *)relay_three.lastread);

      if(relayThree == "OFF"){
        digitalWrite(relay3, HIGH);
      }else if(relayThree == "ON"){
        digitalWrite(relay3, LOW);
      }
    }else if (subscription == &relay_four) {
      String relayFour = (char *)relay_four.lastread;

      Serial.print("Relay Four said : ");
      Serial.println((char *)relay_four.lastread);

      if(relayFour == "OFF"){
        digitalWrite(relay4, HIGH);
      }else if(relayFour == "ON"){
        digitalWrite(relay4, LOW);
      }
    }
  }
  
  if(! mqtt.ping()) {
    mqtt.disconnect();
  }
  
}

void MQTT_connect() {
  int8_t ret;

  if (mqtt.connected()) {
    return;
  }

  Serial.print("Connecting to MQTT... ");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) { // connect will return 0 for connected
       Serial.println(mqtt.connectErrorString(ret));
       mqtt.disconnect();
  }
  Serial.println("MQTT Connected!");
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
