const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: 'localhost', // Substitua pelo IP do servidor
    port: 25565,       // Porta do servidor
    username: 'Darkness', // Nome do bot
    version: false,    // Versão automática do servidor
    auth: 'offline'    // Modo offline
});

bot.once('spawn', () => {
    console.log('Bot conectado ao servidor!');
});

bot.on('end', (reason) => {
    console.log(`Bot desconectado: ${reason}`);
    setTimeout(() => {
        bot.connect(); // Reconectar automaticamente
    }, 5000);
});

bot.on('error', (err) => {
    console.error(`Erro: ${err}`);
});
