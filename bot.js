const mineflayer = require('mineflayer');
const config = require('./config');
const funcoes = require('./functions');

let bot;

const iniciarBot = () => {
    console.clear();
    console.log('\n🚀 Iniciando o DarknessBot...');
    
    bot = mineflayer.createBot({
        host: config.server.host,
        port: config.server.port,
        username: config.username,
        version: config.version
    });

    bot.once('spawn', () => {
        console.log('🌟 DarknessBot conectado!');

        if (config.funcoes.movimentoDoBot) funcoes.movimentoDoBot(bot);
        if (config.funcoes.puloDoBot) funcoes.puloDoBot(bot);
        if (config.funcoes.atacarMobs) funcoes.atacarMobs(bot);
        if (config.funcoes.dormirANoite) funcoes.dormirANoite(bot);
        if (config.funcoes.irParaCoordenadas) funcoes.irParaCoordenadas(bot, config);
        if (config.funcoes.enviarMensagensNoChat) funcoes.enviarMensagensNoChat(bot, config);
        if (config.funcoes.comerQuandoFaminto) funcoes.comerQuandoFaminto(bot);

        funcoes.registrarLogs(bot);
    });

    bot.on('error', (err) => console.error('❌ Erro:', err));
    bot.on('end', () => {
        console.log('🔌 Desconectado. Tentando reconectar em 5s...');
        setTimeout(iniciarBot, 5000);
    });
};

iniciarBot();
