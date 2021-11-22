#Copyright 2021 by Fajar Firdaus

# Colors
blue='\033[34;1m'
green='\033[32;1m'
purple='\033[35;1m'
cyan='\033[36;1m'
red='\033[31;1m'
white='\033[37;1m'
yellow='\033[33;1m'


installing(){
    cp .env.sample .env
    echo -e $yellow"[/] Installing Dependencies...."
    npm install --legacy-peer-deps
    echo -e $green"[+] node_modules successfully installed"
}

install_android(){
    echo -e $yellow"[/] Installing dependencies for android...."
    cd Android
    npm install --legacy-peer-deps
    cd ..
    echo -e $green"[+] node_modules successfully installed"
}

setup_expo(){
    echo -e $yellow"[/] Starting Expo"
    cd Android
    expo build:android
}

run_android(){
    cd Android
    npm start
}

running(){
    echo -e $green"[+] Running The Servers..."
    echo -e $green"{ Choose }"
    echo -e "[1] Use localhost "
    echo -e "[2] Use Local IP"

    read -p "root@Project-365%-# " ip

    if [[ $ip == 1 ]]; then
        npm start
    elif [[ $ip == 2 ]]; then
        read -p "[?] Input Your IP : " x
        npm start $x
    else
        npm start
    fi
}

if [[ $1 == '--install' ]]; then
    installing
    install_android

    exit
elif [[ $1 == '--run' ]]; then
    if [[ $2 ]]; then
        npm start $2
    else
        x=$(hostname -I | awk '{print $1}')
        npm start $x
    fi
elif [[ $1 == '--install-android' ]]; then
    install_android
elif [[ $1 == '--dev' ]]; then
    ip=$(hostname -I | awk '{print $1}')
    npm run dev $ip
elif [[ $1 == '--server' ]]; then
    if [[ $2 ]]; then
        npm start $2
    else
        x=$(hostname -I | awk '{print $1}')
        npm start $x
    fi
elif [[ $1 == '--android' ]]; then
    cd Android
    npm start
fi

echo -e $yellow"[/] Checking some dependencies..."

check=$(apt list --installed | grep "figlet")

if [[ $check != *"figlet"* ]]; then
    echo -e $red"[!] Figlet not installed, try to installing now"
    sudo apt-get install figlet -y
fi

clear

while true
do

echo -e $white
figlet Project - 365%

echo -e $white"[!] use --run 'your ip' to running with ip or --install to install"

echo -e $green"
{
    Coder: 'Fajar Firdaus',
    Github: 'FajarTheGGman',
    IG: '@kernel024',
    Twitter: '@kernel024',
    Website: 'fajarfirdaus.now.sh'
}
"

echo -e $blue"{ Choose: One }"
echo '[1] Install'
echo '[2] Run Backend'
echo '[3] Run React Native'
echo '[4] Setup Docker'
echo '[5] Setup Android App'
echo '[6] Update Application'
echo -e $red'[0] Exit'

echo -e $green
read -p "root@Project-365%-# " out

if [[ $out == 1 ]]; then
    echo -e $green"[/] Install node modules"
    installing
    install_android

    break
elif [[ $out == 2 ]]; then
    running
    break
elif [[ $out == 3 ]]; then
    run_android
elif [[ $out == 0 ]]; then
    echo -e $red"[!] Exiting Program.."
    break
elif [[ $out == 5 ]]; then
    setup_expo
elif [[ $out == 6 ]]; then
    cd Android
    expo publish
else
    clear
fi
done
