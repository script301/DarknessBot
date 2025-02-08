module.exports = {
    // Lista de blocos que podem ser quebrados
    blocosPermitidos: [
        "minecraft:stone",
        "minecraft:cobblestone",
        "minecraft:dirt",
        "minecraft:sand",
        "minecraft:gravel"
    ],

    // Exibe a lista de blocos permitidos no console ao iniciar
    exibirMenu: () => {
        console.log("\n📜 Lista de blocos que serão quebrados:");
        module.exports.blocosPermitidos.forEach((bloco, index) => {
            console.log(`${index + 1}. ${bloco}`);
        });
        console.log("⛏️ O bot começará a quebrar blocos assim que for iniciado...\n");
    },

    // Função para quebrar blocos continuamente
    quebrarBlocos: (bot) => {
        let quebrandoBloco = false; // Evita múltiplas quebras simultâneas

        const quebrarProximoBloco = () => {
            if (quebrandoBloco || bot.isUsingItem) return; // Se já estiver quebrando, não faz nada

            const blocoFrente = bot.blockAt(bot.entity.position.offset(0, 0, 1)); // Bloco à frente

            if (blocoFrente && module.exports.blocosPermitidos.includes(blocoFrente.name)) {
                quebrandoBloco = true; // Define que está quebrando um bloco

                bot.dig(blocoFrente, (err) => {
                    if (err) {
                        console.error("❌ Erro ao quebrar o bloco:", err);
                    } else {
                        console.log(`✅ Bloco ${blocoFrente.name} quebrado com sucesso!`);
                    }

                    quebrandoBloco = false; // Libera para quebrar outro bloco depois
                    setTimeout(quebrarProximoBloco, 100); // Aguarda 100ms e tenta quebrar outro bloco
                });
            } else {
                setTimeout(quebrarProximoBloco, 100); // Se não houver bloco válido, tenta de novo
            }
        };

        quebrarProximoBloco(); // Inicia o loop de quebra de blocos
    }
};

// Exibe o menu no console quando o arquivo for carregado
module.exports.exibirMenu();
