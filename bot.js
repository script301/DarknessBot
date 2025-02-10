const mineflayer = require('mineflayer');
const { getConfig } = require('./config');
const { attackMobsFunction } = require('./functions');

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
  });

  bot.on('error', (err) => {
    console.log("Erro no bot:", err.message);
  });
}

function logBotInfo() {
  console.clear();
  if (!bot || !bot.entity) return;

  const health = bot.health;
  const hunger = bot.food;
  const coords = bot.entity.position;
  const inCombat = bot.entity.target ? "Sim" : "Não";
  const time = bot.time.timeOfDay;

  console.log(`[${bot.username}]`);
  console.log(`Saúde: ${health}/20`);
  console.log(`Fome: ${hunger}/20`);
  console.log(`Coordenadas: X: ${coords.x.toFixed(1)}, Y: ${coords.y.toFixed(1)}, Z: ${coords.z.toFixed(1)}`);
  console.log(`Em combate: ${inCombat}`);
  console.log(`Hora do jogo: ${time}`);
}

module.exports = { startBot };
