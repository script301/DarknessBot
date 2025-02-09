// bot.js
const mineflayer = require('mineflayer');
const { config, updateServerConfig } = require('./config');
const { functions, sleepAtNightFunction, attackMobsFunction, eatFoodFunction } = require('./functions');

// Função para criar o bot com as configurações
function createBot() {
  return mineflayer.createBot({
    host: config.server.host,
    port: config.server.port,
    username: 'Bot',
    version: config.server.version,
    auth: 'offline',
  });
}

// Função para iniciar o bot
function startBot() {
  bot = createBot();

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
}

// Função para exibir o menu de configuração
function showMenu() {
  console.clear();
  console.log('--- Menu Principal ---');
  console.log('1. Iniciar Bot');
  console.log('2. Editar Configurações do Servidor');
  console.log('3. Gerenciar Funções do Bot');
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
      startBot();
      break;
    case '2':
      editServerConfig();
      break;
    case '3':
      manageBotFunctions();
      break;
    case '0':
      console.clear();
      console.log('Saindo...');
      process.exit();
      break;
    default:
      console.log('Escolha inválida. Tente novamente.');
      break;
  }
}

// Função para gerenciar as funções do bot (submenu)
function manageBotFunctions() {
  console.clear();
  console.log('--- Gerenciar Funções do Bot ---');
  console.log('1. Ativar/Desativar Dormir à Noite');
  console.log('2. Ativar/Desativar Atacar Mobs');
  console.log('3. Ativar/Desativar Comer Alimentos');
  console.log('0. Voltar ao Menu Principal');
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', handleFunctionChoice);
}

// Função para processar a escolha no submenu de funções
function handleFunctionChoice(choice) {
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
      showMenu();
      return;
    default:
      console.log('Escolha inválida. Tente novamente.');
      break;
  }

  manageBotFunctions();  // Exibir novamente o submenu após a escolha
}

// Função para editar as configurações do servidor pelo console
function editServerConfig() {
  console.clear();
  console.log('--- Editar Configurações do Servidor ---');
  console.log('Configuração Atual:');
  console.log(`IP: ${config.server.host}, Porta: ${config.server.port}, Versão: ${config.server.version}`);

  console.log('Digite o novo IP (deixe em branco para manter):');
  process.stdin.once('data', (newHost) => {
    newHost = newHost.trim();
    console.log('Digite a nova porta (deixe em branco para manter):');
    process.stdin.once('data', (newPort) => {
      newPort = newPort.trim();
      console.log('Digite a nova versão (deixe em branco para manter):');
      process.stdin.once('data', (newVersion) => {
        newVersion = newVersion.trim();

        // Atualizar as configurações com os novos valores (se houver)
        updateServerConfig(newHost || undefined, newPort || undefined, newVersion || undefined);

        // Recriar o bot com as novas configurações
        bot.quit();  // Desconectar o bot antigo
        startBot();  // Criar um novo bot com as configurações atualizadas
      });
    });
  });
}

// Exibir o menu principal assim que o bot iniciar
showMenu();
