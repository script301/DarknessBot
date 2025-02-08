#!/bin/bash

# Verifica se o sistema é Termux ou Linux
if [[ $(uname -o) == "Android" ]]; then
    echo "🔍 Detectado Termux (Android)."
    pkg update -y && pkg upgrade -y
    pkg install nodejs -y
    pkg install git -y
else
    echo "🔍 Detectado Linux."
    sudo apt update -y && sudo apt upgrade -y
    sudo apt install nodejs -y
    sudo apt install npm -y
    sudo apt install git -y
fi

# Instala as dependências do projeto
echo "📦 Instalando dependências..."
npm install

# Inicia o bot
echo "🚀 Iniciando o bot..."
node bot.js
