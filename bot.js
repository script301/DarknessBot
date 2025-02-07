const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder');  // Certifique-se de instalar esse pacote com npm install mineflayer-pathfinder
const { Movements, GoalBlock } = require('mineflayer-pathfinder'); // Importando as funções necessárias

const bot = mineflayer.createBot({
  host: 'localhost',  // Endereço do servidor
  port: 25565,        // Porta do servidor
  username: 'bot',    // Nome de usuário
  version: false      // Versão do Minecraft
});

bot.on('spawn', () => {
  bot.loadPlugin(pathfinder);  // Carregando o plugin corretamente
});
  
// Defina as configurações para as funções
const functionsConfig = {
  autoMine: {
    enabled: false, // Ative ou desative a mineração automática
    // Adicione mais parâmetros de configuração para autoMine se necessário
  },
  sleepAtNight: true, // Ativar/desativar a função de dormir à noite
  chatMessages: {
    enabled: true, // Ativar/desativar envio de mensagens no chat
    interval: 600000, // Intervalo em milissegundos (10 minutos)
    messages: [
      "Olá, estou aqui!",
      "Cuidando do meu mundo!",
      "Me sigam no @SCRIPT_NZA_OFC!"
    ]
  }
};

// Sleep during the night if enabled
if (functionsConfig.sleepAtNight) {
  bot.on('time', (time) => {
    if (time >= 13000 && time <= 23500) {
      sleepAtNight();
    }
  });
}

// Chat messages every interval if enabled
if (functionsConfig.chatMessages.enabled) {
  setInterval(() => {
    sendMessageToChat();
  }, functionsConfig.chatMessages.interval);
}

// Verifique outras funções de configuração
if (functionsConfig.autoMine.enabled) {
  // Lógica de mineração automática
}

function mineResources() {
  const minerals = functionsConfig.autoMine.minerals;
  const avoidLava = functionsConfig.autoMine.avoidLava;
  const breakAndPlaceBlocks = functionsConfig.autoMine.breakAndPlaceBlocks;

  // Example of a mining loop for ores
  setInterval(() => {
    const targetMinerals = minerals.map(mineral => bot.findBlock({
      matching: mineflayer.itemsByName[mineral].id,
      maxDistance: 64
    }));

    if (targetMinerals.length > 0) {
      const target = targetMinerals[0];
      bot.pathfinder.setGoal(new GoalBlock(target.position.x, target.position.y, target.position.z));

      bot.dig(target).then(() => {
        if (breakAndPlaceBlocks) {
          // Place a block if needed
        }
      });
    }
  }, 10000);
}

function cutWood() {
  // Gather wood until maxWood is reached
  let woodCount = 0;
  const maxWood = functionsConfig.woodCutter.maxWood;

  setInterval(() => {
    if (woodCount < maxWood) {
      const wood = bot.findBlock({
        matching: mineflayer.BlockID.LOG,
        maxDistance: 64
      });

      if (wood) {
        bot.dig(wood).then(() => {
          woodCount++;
          console.log(`Wood gathered: ${woodCount}/${maxWood}`);
        });
      }
    }
  }, 5000);
}

function sleepAtNight() {
  const bed = bot.findBlock({
    matching: mineflayer.BlockID.BED,
    maxDistance: 64
  });

  if (bed) {
    bot.sleep(bed).then(() => {
      console.log('Bot is sleeping');
    });
  }
}

function sendMessageToChat() {
  const messages = functionsConfig.chatMessages.messages;
  const message = messages[Math.floor(Math.random() * messages.length)];
  bot.chat(message);
}

bot.on('error', (err) => console.log(err));
bot.on('end', () => console.log('Bot disconnected!'));
