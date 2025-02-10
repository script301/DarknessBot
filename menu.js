const readline = require('readline');
const { startBot } = require('./bot');  // Agora importado corretamente
const { getConfig, updateConfig } = require('./config');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.clear();
  console.log("=== DarknessBot Menu ===");
  console.log("1. Iniciar Bot");
  console.log("2. Configurações do Servidor");
  console.log("3. Configurações do Bot");
  console.log("4. Sair");

  rl.question("Escolha uma opção: ", (choice) => {
    switch (choice) {
      case '1':
        console.log("Iniciando o bot...");
        startBot();  // Agora reconhecido corretamente
        break;
      case '2':
        configureServer();
        break;
      case '3':
        configureBot();
        break;
      case '4':
        console.log("Saindo...");
        process.exit(0);
      default:
        console.log("Opção inválida.");
        setTimeout(showMenu, 2000);
    }
  });
}

function configureServer() {
  console.clear();
  console.log("=== Configuração do Servidor ===");

  rl.question("IP do servidor: ", (ip) => {
    rl.question("Porta do servidor: ", (port) => {
      rl.question("Versão do Minecraft: ", (version) => {
        updateConfig('server', { host: ip, port: parseInt(port), version });
        console.log("Configuração do servidor salva!");
        setTimeout(showMenu, 2000);
      });
    });
  });
}

function configureBot() {
  console.clear();
  console.log("=== Configuração do Bot ===");

  rl.question("Nome do Bot: ", (name) => {
    updateConfig('bot', { name });
    console.log("Nome do bot atualizado!");
    setTimeout(showMenu, 2000);
  });
}

showMenu();
