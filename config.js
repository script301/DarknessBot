const { carregarDados, salvarDados } = require('./database');

// Tentamos carregar as configurações salvas
let config = carregarDados();

// Se não houver configuração salva, definimos as configurações padrão
if (!config) {
    config = {
        server: {
            host: '', // Endereço do servidor
            port: 25565, // Porta do servidor
            mode: 'survival' // Modo do jogo
        },
        username: 'DarknessBot', // Nome do bot
        version: '1.18.2', // Versão do Minecraft
        targetCoordinates: { x: 100, y: 64, z: 200 }, // Coordenadas para ir
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
        ], // Mensagens de chat
        funcoes: {
            movimentoDoBot: true, // Ativar função de movimento
            puloDoBot: true, // Ativar função de pulo
            atacarMobs: true, // Ativar função de atacar mobs
            dormirANoite: true, // Ativar função de dormir
            quebrarBlocos: true, // Ativar função de quebrar blocos
            irParaCoordenadas: false, // Ativar função de ir até coordenadas
            enviarMensagensNoChat: true, // Ativar função de enviar mensagens no chat
            comerQuandoFaminto: true // Ativar função de comer
        }
    };

    // Salva as configurações iniciais no banco de dados
    salvarDados(config);
}

module.exports = config;
