const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const fs = require('fs');
const readline = require('readline');
const { Item } = require('minecraft-data');

// Função para ler o arquivo de configuração data.json
function readConfig() {
  try {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
  } catch (error) {
    console.log('Arquivo de configuração não encontrado ou inválido, criando um novo...');
    return {
      host: 'localhost',
      port: 25565,
      username: 'DarknessBot',
      version: '1.16.5',
    };
  }
}

// Função para escrever no arquivo data.json
function writeConfig(config) {
  fs.writeFileSync('data.json', JSON.stringify(config, null, 2));
}

// Configurações do bot - Carregadas do arquivo data.json
let config = readConfig();

let bot;

// Função para criar e inicializar o bot
function startBot() {
  bot = mineflayer.createBot(config);

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
  if (bot.inventory) {
    const armorItems = ['helmet', 'chestplate', 'leggings', 'boots'];
    armorItems.forEach((armorSlot) => {
      const item = bot.inventory.findInventoryItem(Item[armorSlot], null);
      if (item) {
        bot.equip(item, armorSlot);
        console.log(`Equipado: ${armorSlot}`);
      }
    });
  }
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
  if (bot.inventory) { // Verifica se o inventário está carregado
    console.log(`Armadura: ${getArmorStatus()}`);
    console.log(`Item na mão: ${bot.inventory.slots[36] ? bot.inventory.slots[36].name : 'Nada'}`);
  } else {
    console.log('Inventário não carregado ainda...');
  }
}

// Função para pegar o status da armadura
function getArmorStatus() {
  const armorStatus = [];
  const armorSlots = ['helmet', 'chestplate', 'leggings', 'boots'];
  
  armorSlots.forEach((slot) => {
    const item = bot.inventory ? bot.inventory.slots[bot.registry.itemsByName[slot]] : null;
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
  console.log('3. Editar Configurações');
  console.log('4. Sair');
  rl.question('Escolha uma opção: ', (option) => {
    switch (option) {
      case '1':
        startBot();
        break;
      case '2':
        showBotStatus();
        break;
      case '3':
        editConfig();
        break;
      case '4':
        rl.close();
        bot.quit();
        break;
      default:
        console.log('Opção inválida!');
        showMenu();
    }
  });
}

// Função para editar as configurações no arquivo data.json
function editConfig() {
  console.log('Editar Configurações');
  rl.question('Digite o IP do servidor: ', (host) => {
    rl.question('Digite a porta do servidor: ', (port) => {
      rl.question('Digite o nome do bot: ', (username) => {
        rl.question('Digite a versão do Minecraft: ', (version) => {
          const newConfig = {
            host: host,
            port: parseInt(port),
            username: username,
            version: version,
          };
          writeConfig(newConfig);
          config = newConfig; // Atualiza a configuração no código
          console.log('Configurações atualizadas!');
          showMenu(); // Retorna ao menu
        });
      });
    });
  });
}

// Iniciar menu ao iniciar o bot
showMenu();
