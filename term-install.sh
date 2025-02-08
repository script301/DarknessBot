#!/bin/bash

# Função para limpar o console
limpar_console() {
    clear
}

# Exibe uma mensagem de início de instalação
limpar_console
echo "🚀 Preparando o DarknessBot para ação... 🔧"
sleep 2

# Atualiza os pacotes do Termux
limpar_console
echo "🔄 Atualizando pacotes do Termux... A magia está começando!"
sleep 2
pkg update -y && pkg upgrade -y

# Instala o Node.js e npm
limpar_console
echo "💻 Instalando Node.js e npm... quase lá!"
sleep 2
pkg install nodejs -y

# Instala o Git (caso ainda não tenha sido instalado)
limpar_console
echo "📦 Instalando o Git... para conectar tudo direitinho!"
sleep 2
pkg install git -y

# Instala as dependências do bot (mineflayer e pathfinder)
limpar_console
echo "🔧 Instalando as dependências necessárias... bot está quase pronto!"
sleep 2
npm install mineflayer
npm install pathfinder

# Exibe uma mensagem de conclusão
limpar_console
echo "🎉 Instalação concluída com sucesso! Agora o bot está pronto para brilhar! ✨"
sleep 2

# Executa o bot automaticamente
limpar_console
echo "🚀 Iniciando o DarknessBot... prepare-se para a aventura!"
sleep 2
node bot.js
