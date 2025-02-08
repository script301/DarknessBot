const mineflayer = require('mineflayer');
const readline = require('readline');
const config = require('./config');
const funcoes = require('./functions');
const { salvarDados } = require('./database');

// Interface para ler entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para limpar o console
const limparConsole = () => {
    process.stdout.write('\x1B[2J\x1B[0f'); // Limpa o console
};

// Função para exibir o menu
const mostrarMenu = () => {
    limparConsole(); // Limpa o console antes de exibir o menu
    console.log('\n🌟 Menu do DarknessBot 🌟');
    console.log('1. Iniciar bot normalmente');
    console.log('2. Ativar/Desativar funções');
    console.log('3. Configurar coordenadas');
    console.log('4. Configurar servidor');
    console.log('5. Salvar configurações');
    console.log('6. Sair');
    rl.question('Escolha uma opção: ', (escolha) => {
        switch (escolha) {
            case '1':
                iniciarBot();
                break;
            case '2':
                alternarFuncoes();
                break;
            case '3':
                configurarCoordenadas();
                break;
            case '4':
                configurarServidor();
                break;
            case '5':
                salvarConfig();
                break;
            case '6':
                console.log('👋 Saindo...');
                rl.close();
                break;
            default:
                console.log('❌ Opção inválida. Tente novamente.');
                setTimeout(() => mostrarMenu(), 1000); // Volta ao menu após 1 segundo
                break;
        }
    });
};

// Função para salvar as configurações
const salvarConfig = () => {
    salvarDados(config);
    console.log("✅ Configurações salvas com sucesso!");
    setTimeout(() => mostrarMenu(), 1000); // Volta ao menu após 1 segundo
};

// Função para ativar/desativar funções
const alternarFuncoes = () => {
    limparConsole(); // Limpa o console
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
                setTimeout(() => alternarFuncoes(), 1000); // Volta ao menu após 1 segundo
            } else {
                console.log('❌ Opção inválida. Tente novamente.');
                setTimeout(() => alternarFuncoes(), 1000); // Volta ao menu após 1 segundo
            }
        }
    });
};

// Função para configurar coordenadas
const configurarCoordenadas = () => {
    limparConsole(); // Limpa o console
    console.log('\n📍 Configurar Coordenadas 📍');
    rl.question('Digite a coordenada X: ', (x) => {
        rl.question('Digite a coordenada Y: ', (y) => {
            rl.question('Digite a coordenada Z: ', (z) => {
                config.targetCoordinates = { x: parseInt(x), y: parseInt(y), z: parseInt(z) };
                console.log(`✅ Coordenadas definidas para (${x}, ${y}, ${z}).`);
                setTimeout(() => mostrarMenu(), 1000); // Volta ao menu após 1 segundo
            });
        });
    });
};

// Função para configurar o servidor
const configurarServidor = () => {
    limparConsole(); // Limpa o console
    console.log('\n🌐 Configurar Servidor 🌐');
    rl.question('Digite o IP do servidor: ', (host) => {
        rl.question('Digite a porta do servidor: ', (port) => {
            rl.question('Digite o modo do jogo (survival, creative, etc.): ', (mode) => {
                config.server = {
                    host: host,
                    port: parseInt(port),
                    mode: mode.toLowerCase()
                };
                console.log(`✅ Servidor configurado: ${host}:${port} (Modo: ${mode}).`);
                setTimeout(() => mostrarMenu(), 1000); // Volta ao menu após 1 segundo
            });
        });
    });
};

// Função para iniciar o bot
let bot; // Declara a variável como let para permitir reatribuição
const iniciarBot = () => {
    limparConsole(); // Limpa o console
    console.log('\n🚀 Iniciando o DarknessBot...');
    bot = mineflayer.createBot({
        host: config.server.host,
        port: config.server.port,
        username: config.username,
        version: config.version
    });

    // Evento quando o bot se conecta ao servidor
    bot.once('spawn', () => {
        console.log('🌟 DarknessBot conectado e pronto para ficar AFK!');
        if (config.funcoes.movimentoDoBot) funcoes.movimentoDoBot(bot);
        if (config.funcoes.puloDoBot) funcoes.puloDoBot(bot);
        if (config.funcoes.atacarMobs) funcoes.atacarMobs(bot);
        if (config.funcoes.dormirANoite) funcoes.dormirANoite(bot);
        if (config.funcoes.quebrarBlocos) funcoes.quebrarBlocos(bot);
        if (config.funcoes.irParaCoordenadas) funcoes.irParaCoordenadas(bot, config);
        if (config.funcoes.enviarMensagensNoChat) funcoes.enviarMensagensNoChat(bot, config);
        if (config.funcoes.comerQuandoFaminto) funcoes.comerQuandoFaminto(bot);
    });

    // Evento para lidar com erros de conexão
    bot.on('error', (err) => {
        console.error('❌ Erro de conexão:', err);
    });

    // Evento para lidar com desconexões
    bot.on('end', () => {
        console.log('🔌 DarknessBot desconectado. Reconectando em 5 segundos...');
    
        setTimeout(() => {
            iniciarBot(); // Tenta reconectar após 5 segundos
        }, 5000);
    });
};

mostrarMenu();

// Verificar e lidar com as entidades de forma adequada
bot.on('entitySpawn', (entity) => {
    if (entity.type === 'vehicle' && !entity.passengers) {
        console.log('🚗 Ignorando veículo sem passageiros.');
    }
});

bot.on('spawn', () => {
    for (const entityId in bot.entities) {
        const entity = bot.entities[entityId];
        if (entity.type === 'vehicle' && !entity.passengers) {
            console.log('🚗 Ignorando veículo sem passageiros.');
        }
    }
});
                    
