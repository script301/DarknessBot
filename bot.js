// bot.js
const mineflayer = require('mineflayer');
const config = require('./config');
const { functions, sleepAtNightFunction, attackMobsFunction, eatFoodFunction } = require('./functions');

// Criar o bot com base nas configurações
const bot = mineflayer.createBot({
  host: config.server.host,
  port: config.server.port,
  username: 'Bot',
  version: config.server.version,
  auth: 'offline',
});

// Evento de inicialização do bot
bot.on('spawn', () => {
  console.log('Bot iniciou no servidor!');
  setInterval(() => {
    console.log('O bot está ativo e funcionando!');
  }, 2000); // Log a cada 2 segundos

  // Iniciar funções do bot
  sleepAtNightFunction(bot);
  attackMobsFunction(bot);
  eatFoodFunction(bot);
});

// Função para exibir o menu de edição
function showMenu() {
  console.log('\n--- Menu de Configuração do Bot ---');
  console.log('1. Ativar/Desativar Dormir à Noite');
  console.log('2. Ativar/Desativar Atacar Mobs');
  console.log('3. Ativar/Desativar Comer Alimentos');
  console.log('0. Sair');
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', handleMenuChoice);
}

// Função para processar a escolha do menu
function handleMenuChoice(choice) {
  choice = choice.trim();
  
  switch (choice) {
    case '1':
      functions.sleepAtNight = !functions.sleepAtNight;
      console.log(`Dormir à noite ${functions.sleepAtNight ? 'ativado' : 'desativado'}`);
      break;
    case '2':
      functions.attackMobs = !functions.attackMobs;
      console.log(`Atacar mobs ${functions.attackMobs ? 'ativado' : 'desativado'}`);
      break;
    case '3':
      functions.eatFood = !functions.eatFood;
      console.log(`Comer alimentos ${functions.eatFood ? 'ativado' : 'desativado'}`);
      break;
    case '0':
      console.log('Saindo...');
      process.exit();
      break;
    default:
      console.log('Escolha inválida. Tente novamente.');
  }

  showMenu();  // Exibir novamente o menu após a escolha
}

// Exibir o menu de configurações assim que o bot iniciar
showMenu();
