const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const { Vec3 } = require('vec3');
const fs = require('fs');
const readline = require('readline');
const { Item } = require('minecraft-data');

// Configurações do bot
const botConfig = {
  host: 'localhost', // Altere para o seu servidor, se necessário
  port: 25565,       // Altere para a porta do seu servidor, se necessário
  username: 'DarknessBot', // Nome do bot
  version: '1.16.5', // Versão do Minecraft (ajuste conforme seu servidor)
};

let bot;

// Função para criar e inicializar o bot
function startBot() {
  bot = mineflayer.createBot(botConfig);

  bot.loadPlugin(pathfinder);

  bot.once('spawn', () => {
    console.log('Bot conectado ao servidor!');

    // Definir movimentos do pathfinder
    const movements = new Movements(bot, bot.registry);
    bot.pathfinder.setMovements(movements);

    // Equipar armadura automaticamente
    equipArmor();

    // Configurar o tempo de ataque (meio segundo)
    bot.timeToAttack = 500; // Em milissegundos (meio segundo)

    // Definir comportamento de ataque
    bot.on('physicTick', () => {
      attackNearbyMobs();
    });

    // Atualizar o status do bot no console
    setInterval(() => {
      console.log(`Ping: ${bot.ping}ms | Jogadores online: ${bot.players.size}`);
      showBotStatus();
    }, 5000); // Atualiza a cada 5 segundos
  });

  // Caso o bot morra, reconectar automaticamente
  bot.on('death', () => {
    console.log('O bot morreu! Reconectando...');
    bot.end();
    startBot(); // Recria o bot
  });

  bot.on('error', (err) => {
    console.log(`Erro do bot: ${err}`);
  });

  bot.on('end', () => {
    console.log('Bot desconectado!');
  });
}

// Equipar armadura automaticamente
function equipArmor() {
  const armorItems = ['helmet', 'chestplate', 'leggings', 'boots'];
  armorItems.forEach((armorSlot) => {
    const item = bot.inventory.findInventoryItem(Item[armorSlot], null);
    if (item) {
      bot.equip(item, armorSlot);
      console.log(`Equipado: ${armorSlot}`);
    }
  });
}

// Atacar mobs hostis próximos
function attackNearbyMobs() {
  const mob = bot.nearestEntity((entity) => entity.type === 'mob' && entity.mobType !== 'Player' && bot.entity.position.distanceTo(entity.position) < 5);
  if (mob) {
    bot.attack(mob);
    console.log(`Atacando ${mob.mobType}...`);
  }
}

// Exibir informações sobre o bot
function showBotStatus() {
  console.log(`Armadura: ${getArmorStatus()}`);
  console.log(`Item na mão: ${bot.inventory.slots[36] ? bot.inventory.slots[36].name : 'Nada'}`);
}

// Função para pegar o status da armadura
function getArmorStatus() {
  const armorStatus = [];
  ['helmet', 'chestplate', 'leggings', 'boots'].forEach((slot) => {
    const item = bot.inventory.slots[bot.registry.itemsByName[slot]];
    armorStatus.push(item ? item.name : 'Nada');
  });
  return armorStatus.join(', ');
}

// Menu e interações no console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log('=== DarknessBot Menu ===');
  console.log('1. Iniciar Bot');
  console.log('2. Exibir Status');
  console.log('3. Sair');
  rl.question('Escolha uma opção: ', (option) => {
    switch (option) {
      case '1':
        startBot();
        break;
      case '2':
        showBotStatus();
        break;
      case '3':
        rl.close();
        bot.quit();
        break;
      default:
        console.log('Opção inválida!');
        showMenu();
    }
  });
}

showMenu();
