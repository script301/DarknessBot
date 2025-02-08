#!/bin/bash

# Função para limpar o console
clear() {
    echo -e "\033c"
}

# Mensagens de progresso
echo "🚀 Preparando o DarknessBot para ação... 🔧"
sleep 2

# Atualiza o npm
echo "🔄 Atualizando npm... A magia está começando!"
sleep 2
sudo npm install -g npm@latest

# Instala as dependências do bot
echo "🔧 Instalando as dependências necessárias... bot está quase pronto!"
sleep 2
npm install mineflayer pathfinder

# Mensagem de instalação concluída
clear
echo "🎉 Instalação concluída com sucesso! Agora o bot está pronto para brilhar! ✨"
sleep 2

# Executa o bot automaticamente
clear
echo "🚀 Iniciando o DarknessBot... prepare-se para a aventura!"
sleep 2
node index.js
