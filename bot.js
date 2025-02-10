const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const Vec3 = require('vec3');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Criação do bot
const bot = mineflayer.createBot({
  host: 'scriptnza.falixsrv.me', // IP do servidor
  port: 25565,                   // Porta do servidor
  username: 'DarknessBot',        // Nome do bot
  version: '1.21.4',
  auth: 'offline'                 // Autenticação offline por padrão
});

// Carregar os plugins
bot.loadPlugin(pathfinder);

// Função para configurar os movimentos
function setMovement() {
  const movements = new Movements(bot);
  movements.canDig = false; // Não permitir que o bot cave blocos
  movements.allowSprinting = true; // Habilitar corrida
  bot.pathfinder.setMovements(movements);
}

// Equipando armaduras automaticamente
function equipArmor() {
  const armorItems = [
    bot.inventory.items().find(item => item.type === 298), // Capacete
    bot.inventory.items().find(item => item.type === 302), // Peito
    bot.inventory.items().find(item => item.type === 306), // Calças
    bot.inventory.items().find(item => item.type === 310)  // Botas
  ];

  armorItems.forEach(item => {
    if (item) {
      bot.equip(item, 'armor');
      console.log(`Equipando: ${item.name}`);
    }
  });
}

// Função para atacar qualquer mob
bot.on('spawn', () => {
  bot.on('entitySpawn', (entity) => {
    if (entity.type === 'mob') {
      bot.attack(entity);
      console.log(`Atacando: ${entity.name}`);
    }
  });
});

// Função para verificar quando o bot estiver em combate
bot.on('health', () => {
  if (bot.health < 20) {
    console.log('Bot está em combate!');
  } else {
    console.log('Bot está seguro!');
  }
});

// Função de dormir em camas
function sleepNearBed() {
  const bed = bot.findBlock({
    matching: 26, // ID da cama
    maxDistance: 64
  });

  if (bed) {
    bot.sleep(bed);
    console.log('Bot dormindo...');
  }
}

// Função para imprimir informações do bot
function printBotInfo() {
  console.clear();
  console.log(`=== Informações do ${bot.username} ===`);
  console.log(`Saúde: ${bot.health} / 20`);
  console.log(`Fome: ${bot.food}`);
  console.log(`Posição: ${bot.entity.position}`);
  console.log(`Ping: ${bot.ping} ms`);
  console.log(`Jogadores no servidor: ${bot.players.size}`);
  console.log(`Equipamento: ${bot.inventory.items().map(item => item.name).join(', ')}`);
  console.log('====================================');
}

// Menu de opções
function showMenu() {
  rl.question('Escolha uma opção:\n1. Iniciar Bot\n2. Equipar Armadura\n3. Atacar Mobs\n4. Dormir\n5. Sair\n', (answer) => {
    switch(answer) {
      case '1':
        startBot();
        break;
      case '2':
        equipArmor();
        break;
      case '3':
        attackMobs();
        break;
      case '4':
        sleepNearBed();
        break;
      case '5':
        bot.quit();
        rl.close();
        break;
      default:
        console.log('Opção inválida');
        showMenu();
        break;
    }
  });
}

// Iniciar o bot
function startBot() {
  console.log('Iniciando o bot...');
  setMovement();
  bot.on('spawn', () => {
    setInterval(printBotInfo, 3000); // Exibe informações a cada 3 segundos
    showMenu();
  });
}

// Quando o bot estiver pronto, o menu será mostrado
startBot();

// Comando para atacar qualquer mob
function attackMobs() {
  bot.on('entitySpawn', (entity) => {
    if (entity.type === 'mob') {
      bot.attack(entity);
      console.log(`Atacando: ${entity.name}`);
    }
  });
}
