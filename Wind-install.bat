@echo off
chcp 65001 >nul
title 🌟 Instalando DarknessBot... Aguarde! 🌟
cls

echo 🔥 Preparando ambiente para o DarknessBot...
timeout /t 2 >nul

echo 📦 Instalando Node.js e dependências...
winget install OpenJS.NodeJS -h >nul 2>&1
timeout /t 2 >nul

echo 🚀 Instalando pacotes necessários...
npm install >nul 2>&1
timeout /t 2 >nul

echo 🎮 Iniciando DarknessBot...
node bot.js

echo ✅ Instalação concluída! O DarknessBot está rodando.  
pause
