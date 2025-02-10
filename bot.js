const mineflayer = require('mineflayer');
const { getConfig } = require('./config');
const { attackMobsFunction } = require('./functions');
const { showMenu } = require('./menu');

let bot = null;

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

function startBot() {
  if (bot) {
    bot.quit();
    console.log("Desconectando o bot anterior...");
  }

  bot = createBot();

  bot.on('spawn', () => {
    console.log(`Bot ${bot.username} entrou no servidor.`);
    setInterval(logBotInfo, 3000);
    attackMobsFunction(bot);
  });

  bot.on('end', () => {
    console.log("Bot desconectado.");
    setTimeout(showMenu, 2000);
  });

  bot.on('error', (err) => {
    console.log("Erro no bot:", err.message);
    setTimeout(showMenu, 2000);
  });
}

function logBotInfo() {
  console.clear();
  const health = bot.health;
  const hunger = bot.food;
  const coords = bot.entity.position;
  const inCombat = bot.entity.target ? "Sim" : "Não";
  const time = bot.time.timeOfDay;

  console.log(`[${bot.username}]`);
  console.log(`Saúde: ${health}/20`);
  console.log(`Fome: ${hunger}/20`);
  console.log(`Coordenadas: X: ${coords.x}, Y: ${coords.y}, Z: ${coords.z}`);
  console.log(`Em combate: ${inCombat}`);
  console.log(`Hora do jogo: ${time}`);
}

showMenu();
