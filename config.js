const { carregarDados, salvarDados } = require('./database');

let config = carregarDados();

if (!config) {
    config = {
        server: {
            host: '',
            port: 25565,
            mode: 'survival'
        },
        username: 'DarknessBot',
        version: '1.18.2',
        targetCoordinates: { x: 100, y: 64, z: 200 },
        chatMessages: [
            "Olá, pessoal! Estou aqui para ajudar!",
            "DarknessBot em ação! Precisam de algo?",
            "Que dia lindo para minerar!",
            "Alguém quer um café virtual? ☕",
            "Estou aqui, mas não me incomodem muito!",
            "Vamos construir um castelo? 🏰",
            "Cuidado com os creepers! 💥",
            "Estou me sentindo útil hoje!",
            "Alguém viu meu gato? 🐱",
            "Vamos explorar juntos? 🌍"
        ],
        funcoes: {
            movimentoDoBot: true,
            puloDoBot: true,
            atacarMobs: true,
            dormirANoite: true,
            irParaCoordenadas: false,
            enviarMensagensNoChat: true,
            comerQuandoFaminto: true
        }
    };

    salvarDados(config);
}

module.exports = config;
