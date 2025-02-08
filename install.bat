@echo off
:: Função para limpar o console
cls

:: Exibe uma mensagem de início de instalação
echo 🚀 Preparando o DarknessBot para ação... 🔧
timeout /t 2 /nobreak >nul

:: Atualiza o npm
echo 🔄 Atualizando npm... A magia está começando!
timeout /t 2 /nobreak >nul
npm install -g npm@latest

:: Instala as dependências do bot (mineflayer e pathfinder)
echo 🔧 Instalando as dependências necessárias... bot está quase pronto!
timeout /t 2 /nobreak >nul
npm install mineflayer pathfinder

:: Exibe uma mensagem de conclusão
cls
echo 🎉 Instalação concluída com sucesso! Agora o bot está pronto para brilhar! ✨
timeout /t 2 /nobreak >nul

:: Executa o bot automaticamente
cls
echo 🚀 Iniciando o DarknessBot... prepare-se para a aventura!
timeout /t 2 /nobreak >nul
node index.js
