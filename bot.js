const mineflayer = require('mineflayer');
const readline = require('readline');
const config = require('./config');
const funcoes = require('./functions');
const { salvarDados } = require('./database');

// Interface para entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para limpar o console
const limparConsole = () => {
    process.stdout.write('\x1B[2J\x1B[0f');
};

// Função para exibir o menu
const mostrarMenu = () => {
    limparConsole();
    console.log('\n🌟 Menu do DarknessBot 🌟');
    console.log('1. Iniciar bot normalmente');
    console.log('2. Ativar/Desativar funções');
    console.log('3. Configurar coordenadas');
    console.log('4. Configurar servidor');
    console.log('5. Salvar configurações');
    console.log('6. Sair');
    rl.question('Escolha uma opção: ', (escolha) => {
        switch (escolha) {
            case '1': iniciarBot(); break;
            case '2': alternarFuncoes(); break;
            case '3': configurarCoordenadas(); break;
            case '4': configurarServidor(); break;
            case '5': salvarConfig(); break;
            case '6': console.log('👋 Saindo...'); rl.close(); break;
            default:
                console.log('❌ Opção inválida.');
                setTimeout(() => mostrarMenu(), 1000);
        }
    });
};

// Função para salvar as configurações
const salvarConfig = () => {
    salvarDados(config);
    console.log("✅ Configurações salvas!");
    setTimeout(() => mostrarMenu(), 1000);
};

// Função para ativar/desativar funções
const alternarFuncoes = () => {
    limparConsole();
    console.log('\n🔧 Ativar/Desativar Funções 🔧');
    Object.keys(config.funcoes).forEach((func, index) => {
        console.log(`${index + 1}. ${func}: ${config.funcoes[func] ? '✅ Ativada' : '❌ Desativada'}`);
    });
    rl.question('Escolha o número da função para ativar/desativar (ou 0 para voltar): ', (escolha) => {
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

// Função para iniciar o bot
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
        console.log('🌟 DarknessBot conectado e pronto!');
        if (config.funcoes.movimentoDoBot) funcoes.movimentoDoBot(bot);
        if (config.funcoes.puloDoBot) funcoes.puloDoBot(bot);
        if (config.funcoes.atacarMobs) funcoes.atacarMobs(bot);
        if (config.funcoes.dormirANoite) funcoes.dormirANoite(bot);
        if (config.funcoes.irParaCoordenadas) funcoes.irParaCoordenadas(bot, config);
        if (config.funcoes.enviarMensagensNoChat) funcoes.enviarMensagensNoChat(bot, config);
        if (config.funcoes.comerQuandoFaminto) funcoes.comerQuandoFaminto(bot);
        funcoes.registrarLogs(bot);
    });

    bot.on('error', err => console.error('❌ Erro:', err));
    bot.on('end', () => {
        console.log('🔌 Desconectado. Tentando reconectar em 5 segundos...');
        setTimeout(iniciarBot, 5000);
    });
};

mostrarMenu();
