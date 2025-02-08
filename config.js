module.exports = {
    host: 'seu_servidor_minecraft.com', // Endereço do servidor
    port: 25565, // Porta do servidor (padrão é 25565)
    username: 'AFKBot', // Nome do bot
    version: '1.18.2', // Versão do Minecraft
    targetCoordinates: { x: 100, y: 64, z: 200 }, // Coordenadas para ir
    chatMessages: [
        "Olá, pessoal! Estou aqui para ajudar!",
        "AFK Bot em ação! Precisam de algo?",
        "Que dia lindo para minerar!",
        "Alguém quer um café virtual? ☕",
        "Estou aqui, mas não me incomodem muito!",
        "Vamos construir um castelo? 🏰",
        "Cuidado com os creepers! 💥",
        "Estou me sentindo útil hoje!",
        "Alguém viu meu gato? 🐱",
        "Vamos explorar juntos? 🌍"
    ], // Mensagens de chat
    functions: {
        moveBot: true, // Ativar função de movimento
        jumpBot: true, // Ativar função de pulo
        attackMobs: true, // Ativar função de atacar mobs
        sleepAtNight: true, // Ativar função de dormir
        breakBlocks: true, // Ativar função de quebrar blocos
        goToCoordinates: false, // Ativar função de ir até coordenadas
        sendChatMessages: true, // Ativar função de enviar mensagens no chat
        eatWhenHungry: true // Ativar função de comer
    }
};