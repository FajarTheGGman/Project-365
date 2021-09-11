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
    echo -e $yellow"[/] Installing Dependencies...."
    npm install --legacy-peer-deps
    echo -e $green"[+] node_modules successfully installed"
}

install_android(){
    echo -e $yellow"[/] Installing dependencies for android...."
    cd Android
    npm install --legacy-peer-deps
    echo -e $green"[+] node_modules successfully installed"
}

setup_expo(){
    echo -e $yellow"[/] Starting Expo"
    cd Android
    expo build:android
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
echo '[2] Run'
echo '[3] Setup Docker'
echo '[4] Setup Android App'
echo -e $red'[0] Exit'

echo -e $green
read -p "root@Project-365%-# " out

if [[ $out == 1 ]]; then
    echo -e $green"[/] Install node modules"
    npm install

    npm start
    break
elif [[ $out == 2 ]]; then
    running
    break
elif [[ $out == 0 ]]; then
    echo -e $red"[!] Exiting Program.."
    break
elif [[ $out == 4 ]]; then
    setup_expo
else 
    clear
fi
done
