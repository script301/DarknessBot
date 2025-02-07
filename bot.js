const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const config = require('./config.js');

const bot = mineflayer.createBot({
    host: 'scriptnza.falixsrv.me', // IP do servidor
    port: 25565, // Porta do servidor
    username: 'DarknessBot', // Nome do bot
    auth: config.modoOffline ? 'offline' : 'mojang' // Modo de login
});

// Plugins e movimentação
bot.loadPlugin(pathfinder);
bot.once('spawn', () => {
    console.log('Bot conectado e pronto!');
    
    if (config.carregarChunks) iniciarMovimentacao();
    if (config.mensagensAutomaticas) iniciarMensagens();
});

// Movimentação para carregar chunks
function iniciarMovimentacao() {
    setInterval(() => {
        let x = bot.entity.position.x + (Math.random() * 10 - 5);
        let z = bot.entity.position.z + (Math.random() * 10 - 5);
        bot.pathfinder.setGoal(new goals.GoalBlock(x, bot.entity.position.y, z));
    }, 30000);
}

// Ataque automático a mobs hostis
bot.on('entityHurt', (entity) => {
    if (config.atacarMobs && entity.type === 'hostile') {
        bot.attack(entity);
    }
});

// Comer automaticamente (exceto carne podre)
bot.on('health', () => {
    if (config.comerComida && bot.food < 18) {
        const comida = bot.inventory.items().find(item => item.name.includes('cooked') || item.name.includes('bread'));
        if (comida) bot.equip(comida, 'hand').then(() => bot.consume());
    }
});

// Dormir em camas
bot.on('time', () => {
    if (config.dormirEmCama && bot.time.isNight) {
        const cama = bot.findBlock({ matching: block => block.name.includes('bed') });
        if (cama) bot.sleep(cama);
    }
});

// Enviar mensagens automáticas no chat
function iniciarMensagens() {
    setInterval(() => {
        const mensagens = [
            "🌙 DarknessBot ativo e carregando chunks!",
            "⚔️ Protegendo a área contra mobs hostis!",
            "⛏️ Pronto para minerar e carregar o mundo!",
            "🛌 Dormindo para passar a noite!",
        ];
        bot.chat(mensagens[Math.floor(Math.random() * mensagens.length)]);
    }, 600000); // A cada 10 minutos
}

// Comando para quebrar blocos
bot.on('chat', (username, message) => {
    if (config.quebrarBlocos && message.startsWith('!minerar')) {
        const bloco = bot.blockAt(bot.entity.position.offset(0, -1, 0));
        if (bloco) bot.dig(bloco);
    }
});
