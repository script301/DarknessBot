const mineflayer = require('mineflayer');
const { getConfig } = require('./config');
const { attackMobsFunction } = require('./functions');

let bot = null;

function createBot() {
  console.log("🛠 Criando bot..."); // Adicionado para depuração
  const config = getConfig();
  console.log(`🔗 Conectando ao servidor ${config.server.host}:${config.server.port}, versão ${config.server.version}`);

  return mineflayer.createBot({
    host: config.server.host,
    port: config.server.port,
    username: config.bot.name,
    version: config.server.version,
    auth: 'offline',
  });
}

function startBot() {
  console.log("🚀 Iniciando o bot...");

  if (bot) {
    console.log("🔴 Desconectando bot antigo...");
    bot.quit();
  }

  bot = createBot();

  bot.on('spawn', () => {
    console.log(`✅ Bot ${bot.username} entrou no servidor!`);
    setInterval(logBotInfo, 3000);
    attackMobsFunction(bot);
  });

  bot.on('end', () => {
    console.log("⚠️ Bot desconectado. Use o menu para reiniciar.");
  });

  bot.on('error', (err) => {
    console.log("❌ Erro no bot:", err.message);
  });
}

function logBotInfo() {
  console.clear();
  if (!bot || !bot.entity) {
    console.log("⏳ Bot ainda não conectado...");
    return;
  }

  const health = bot.health;
  const hunger = bot.food;
  const coords = bot.entity.position;
  const inCombat = bot.entity.target ? "Sim" : "Não";
  const time = bot.time.timeOfDay;

  console.log(`[${bot.username}]`);
  console.log(`❤️ Saúde: ${health}/20`);
  console.log(`🍗 Fome: ${hunger}/20`);
  console.log(`📍 Coordenadas: X:${coords.x.toFixed(1)}, Y:${coords.y.toFixed(1)}, Z:${coords.z.toFixed(1)}`);
  console.log(`⚔️ Em combate: ${inCombat}`);
  console.log(`🕒 Hora do jogo: ${time}`);
}

module.exports = { startBot };
