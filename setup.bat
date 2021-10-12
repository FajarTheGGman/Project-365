@echo off
color a
echo [ Project 365% ]
echo Coder: Fajar Firdaus
echo IG: @fajar.psd
echo Twitter: @kernel024
echo Github: FajarTheGGman

color b
echo [/] Installing dependencies for backend
npm install


color b
echo [/] Installing dependencies for react native
cd Android
npm install --legacy-peer-deps

color a
echo [+] Successfully installing dependencies
echo [!] Click backend.bat to start the express server
echo [!] Click android.bat to start react native server

