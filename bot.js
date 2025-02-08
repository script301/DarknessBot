const mineflayer = require('mineflayer');
const readline = require('readline');
const config = require('./config');
const funcoes = require('./functions'); // Importando funções corretamente
const { salvarDados } = require('./database');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const limparConsole = () => {
    process.stdout.write('\x1B[2J\x1B[0f'); // Limpa o console
};

const mostrarMenu = () => {
    limparConsole();
    console.log('\n🌟 Menu do DarknessBot 🌟');
    console.log('1. Iniciar bot');
    console.log('2. Ativar/Desativar funções');
    console.log('3. Configurar servidor');
    console.log('4. Salvar configurações');
    console.log('5. Sair');
    rl.question('Escolha uma opção: ', (escolha) => {
        switch (escolha) {
            case '1':
                iniciarBot();
                break;
            case '2':
                alternarFuncoes();
                break;
            case '3':
                configurarServidor();
                break;
            case '4':
                salvarConfig();
                break;
            case '5':
                console.log('👋 Saindo...');
                rl.close();
                break;
            default:
                console.log('❌ Opção inválida.');
                setTimeout(() => mostrarMenu(), 1000);
                break;
        }
    });
};

const salvarConfig = () => {
    salvarDados(config);
    console.log("✅ Configurações salvas!");
    setTimeout(() => mostrarMenu(), 1000);
};

const alternarFuncoes = () => {
    limparConsole();
    console.log('\n🔧 Ativar/Desativar Funções 🔧');
    Object.keys(config.funcoes).forEach((func, index) => {
        console.log(`${index + 1}. ${func}: ${config.funcoes[func] ? '✅ Ativada' : '❌ Desativada'}`);
    });
    rl.question('Escolha o número da função para alterar (ou 0 para voltar): ', (escolha) => {
        if (escolha === '0') {
            mostrarMenu();
        } else {
            const func = Object.keys(config.funcoes)[escolha - 1];
            if (func) {
                config.funcoes[func] = !config.funcoes[func];
                console.log(`✅ ${func} foi ${config.funcoes[func] ? 'ativada' : 'desativada'}.`);
                setTimeout(() => alternarFuncoes(), 1000);
            } else {
                console.log('❌ Opção inválida.');
                setTimeout(() => alternarFuncoes(), 1000);
            }
        }
    });
};

const configurarServidor = () => {
    limparConsole();
    console.log('\n🌐 Configurar Servidor 🌐');
    rl.question('IP do servidor: ', (host) => {
        rl.question('Porta do servidor: ', (port) => {
            config.server = { host, port: parseInt(port) };
            console.log(`✅ Servidor configurado: ${host}:${port}`);
            setTimeout(() => mostrarMenu(), 1000);
        });
    });
};

let bot;
const iniciarBot = () => {
    limparConsole();
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
    });

    bot.on('error', (err) => console.error('❌ Erro:', err));
    bot.on('end', () => {
        console.log('🔌 Bot desconectado. Reconectando em 5s...');
        setTimeout(iniciarBot, 5000);
    });
};

mostrarMenu();
