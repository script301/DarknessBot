const mineflayer = require('mineflayer');
const readline = require('readline');
const config = require('./config');
const functions = require('./functions');

// Interface para ler entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para exibir o menu
const showMenu = () => {
    console.log('\n🌟 Menu do AFK Bot 🌟');
    console.log('1. Iniciar bot normalmente');
    console.log('2. Ativar/Desativar funções');
    console.log('3. Configurar coordenadas');
    console.log('4. Sair');
    rl.question('Escolha uma opção: ', (choice) => {
        switch (choice) {
            case '1':
                startBot();
                break;
            case '2':
                toggleFunctions();
                break;
            case '3':
                setCoordinates();
                break;
            case '4':
                console.log('👋 Saindo...');
                rl.close();
                break;
            default:
                console.log('❌ Opção inválida. Tente novamente.');
                showMenu();
                break;
        }
    });
};

// Função para ativar/desativar funções
const toggleFunctions = () => {
    console.log('\n🔧 Ativar/Desativar Funções 🔧');
    Object.keys(config.functions).forEach((func, index) => {
        console.log(`${index + 1}. ${func}: ${config.functions[func] ? '✅ Ativada' : '❌ Desativada'}`);
    });
    rl.question('Escolha o número da função para ativar/desativar (ou 0 para voltar): ', (choice) => {
        if (choice === '0') {
            showMenu();
        } else {
            const func = Object.keys(config.functions)[choice - 1];
            if (func) {
                config.functions[func] = !config.functions[func];
                console.log(`✅ ${func} foi ${config.functions[func] ? 'ativada' : 'desativada'}.`);
                toggleFunctions();
            } else {
                console.log('❌ Opção inválida. Tente novamente.');
                toggleFunctions();
            }
        }
    });
};

// Função para configurar coordenadas
const setCoordinates = () => {
    console.log('\n📍 Configurar Coordenadas 📍');
    rl.question('Digite a coordenada X: ', (x) => {
        rl.question('Digite a coordenada Y: ', (y) => {
            rl.question('Digite a coordenada Z: ', (z) => {
                config.targetCoordinates = { x: parseInt(x), y: parseInt(y), z: parseInt(z) };
                console.log(`✅ Coordenadas definidas para (${x}, ${y}, ${z}).`);
                showMenu();
            });
        });
    });
};

// Função para iniciar o bot
const startBot = () => {
    console.log('\n🚀 Iniciando o bot...');
    const bot = mineflayer.createBot({
        host: config.host,
        port: config.port,
        username: config.username,
        version: config.version
    });

    // Evento quando o bot se conecta ao servidor
    bot.once('spawn', () => {
        console.log('🌟 Bot conectado e pronto para ficar AFK!');
        if (config.functions.moveBot) functions.moveBot(bot);
        if (config.functions.jumpBot) functions.jumpBot(bot);
        if (config.functions.attackMobs) functions.attackMobs(bot);
        if (config.functions.sleepAtNight) functions.sleepAtNight(bot);
        if (config.functions.breakBlocks) functions.breakBlocks(bot);
        if (config.functions.goToCoordinates) functions.goToCoordinates(bot, config);
        if (config.functions.sendChatMessages) functions.sendChatMessages(bot, config);
        if (config.functions.eatWhenHungry) functions.eatWhenHungry(bot);
    });

    // Evento para lidar com erros de conexão
    bot.on('error', (err) => {
        console.error('❌ Erro de conexão:', err);
    });

    // Evento para lidar com desconexões
    bot.on('end', () => {
        console.log('🔌 Bot desconectado. Reconectando em 5 segundos...');
        setTimeout(() => {
            bot = mineflayer.createBot({
                host: config.host,
                port: config.port,
                username: config.username,
                version: config.version
            });
        }, 5000); // Tenta reconectar após 5 segundos
    });
};

// Inicia o menu
showMenu();