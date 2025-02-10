const readline = require('readline');
const { startBot } = require('./bot');
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
        console.log("🚀 Iniciando o bot...");
        startBot();
        setTimeout(showMenu, 5000); // Aguarde 5 segundos antes de retornar ao menu
        break;
      case '2':
        configureServer();
        break;
      case '3':
        configureBot();
        break;
      case '4':
        console.log("👋 Saindo...");
        process.exit(0);
      default:
        console.log("⚠️ Opção inválida.");
        setTimeout(showMenu, 2000);
    }
  });
}

showMenu();
