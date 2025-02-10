const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const config = require('./config.json');


console.log('Iniciando o bot...');
process.on('uncaughtException', (err) => {
  console.error('Ocorreu um erro não tratado:', err);
});


let bot;
function startBot() {
    bot = mineflayer.createBot({
        host: config.server.ip,
        port: config.server.port,
        username: config.bot.nickname || 'DarknessBot',
        version: config.server.version
    });

    bot.loadPlugin(pathfinder);

    bot.once('spawn', () => {
        console.clear();
        console.log(`\n🚀 ${bot.username} entrou no servidor!`);
        updateLog();
        equipArmor();
        moveAround();
    });

    bot.on('health', updateLog);
    bot.on('time', () => {
        updateLog();
        if (bot.time.isNight) {
            sleepAtNight();
        }
    });
    
    bot.on('physicsTick', attackMobs);
}

function updateLog() {
    console.clear();
    console.log(`\n=== ${bot.username} Status ===`);
    console.log(`❤️ Vida: ${bot.health}`);
    console.log(`🍗 Fome: ${bot.food}`);
    console.log(`📍 Coordenadas: X: ${bot.entity.position.x.toFixed(1)}, Y: ${bot.entity.position.y.toFixed(1)}, Z: ${bot.entity.position.z.toFixed(1)}`);
    console.log(`⚔️ Em combate: ${bot.target ? 'Sim' : 'Não'}`);
    console.log(`⏳ Hora do jogo: ${bot.time.age}`);
    console.log(`📡 Ping: ${bot.player.ping}ms`);
    console.log(`👥 Jogadores online: ${Object.keys(bot.players).length}`);
    console.log(`🛡️ Armadura: ${getArmor()}`);
    console.log(`🖐️ Mão Principal: ${bot.heldItem ? bot.heldItem.name : 'Vazia'}`);
}

function equipArmor() {
    const armorItems = bot.inventory.items().filter(item =>
        item.name.includes('helmet') ||
        item.name.includes('chestplate') ||
        item.name.includes('leggings') ||
        item.name.includes('boots')
    );
    armorItems.forEach(item => {
        bot.equip(item, 'torso', () => {});
    });
}

function attackMobs() {
    const mob = bot.nearestEntity(entity => entity.type === 'mob' && entity.position.distanceTo(bot.entity.position) < 5);
    if (mob) {
        bot.attack(mob);
        setTimeout(() => bot.attack(mob), 500);
    }
}

function sleepAtNight() {
    const bed = bot.findBlock({
        matching: block => bot.isABed(block),
        maxDistance: 5
    });
    if (bed) {
        bot.sleep(bed, () => {
            console.log('🛏️ O bot foi dormir...');
        });
    }
}

function moveAround() {
    setInterval(() => {
        const x = bot.entity.position.x + (Math.random() * 6 - 3);
        const z = bot.entity.position.z + (Math.random() * 6 - 3);
        const goal = new goals.GoalBlock(x, bot.entity.position.y, z);
        bot.pathfinder.setGoal(goal);
    }, 10000);
}

function getArmor() {
    return Object.values(bot.inventory.slots).filter(item => item && (item.name.includes('helmet') || item.name.includes('chestplate') || item.name.includes('leggings') || item.name.includes('boots'))).map(item => item.name).join(', ') || 'Nenhuma';
}

module.exports = { startBot };
