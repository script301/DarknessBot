// bot.js
const mineflayer = require('mineflayer');
const { getConfig, updateConfig } = require('./config');
const { attackMobsFunction } = require('./functions');

// Variável global para o bot
let bot;

// Função para criar o bot com as configurações
function createBot() {
  const config = getConfig();
  
  return mineflayer.createBot({
    host: config.server.host,
    port: config.server.port,
    username: config.bot.name,
    version: config.server.version,
    auth: 'offline',
  });
}

// Função para iniciar o bot
function startBot() {
  if (bot) {
    bot.quit(); // Desconectar o bot antigo
    console.log('Bot desconectado...');
  }

  bot = createBot();

  // Evento de inicialização do bot
  bot.on('spawn', () => {
    console.log(`Bot ${bot.username} iniciou no servidor!`);
    setInterval(logBotInfo, 3000); // Log a cada 3 segundos

    // Iniciar funções do bot
    attackMobsFunction(bot);
  });
}

// Função para exibir as informações do bot no console
function logBotInfo() {
  console.clear();

  const health = bot.health;
  const hunger = bot.food;
  const coordinates = bot.entity.position;
  const isFighting = bot.entity.target ? 'Sim' : 'Não';
  const currentTime = bot.time.timeOfDay;

  console.log(`[${bot.username}]`);
  console.log(`Saúde: ${health}/${bot.maxHealth}`);
  console.log(`Fome: ${hunger}/20`);
  console.log(`Coordenadas: X: ${coordinates.x}, Y: ${coordinates.y}, Z: ${coordinates.z}`);
  console.log(`Em combate: ${isFighting}`);
  console.log(`Hora do servidor: ${currentTime}`);
}

// Exibir o menu principal assim que o bot iniciar
showMenu();
