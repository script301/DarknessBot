module.exports = {
    // Função para mover o bot periodicamente
    movimentoDoBot: (bot) => {
        setInterval(() => {
            bot.setControlState('forward', true);
            setTimeout(() => {
                bot.setControlState('forward', false);
            }, 1000); // Move por 1 segundo
        }, 60000); // Move a cada 60 segundos
    },

    // Função para o bot pular periodicamente
    puloDoBot: (bot) => {
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => {
                bot.setControlState('jump', false);
            }, 500); // Pula por 0.5 segundos
        }, 30000); // Pula a cada 30 segundos
    },

    // Função para atacar mobs hostis
    atacarMobs: (bot) => {
        bot.on('physicsTick', () => {
            const mob = bot.nearestEntity((entity) => {
                return entity.type === 'mob' && entity.position.distanceTo(bot.entity.position) < 3;
            });

            if (mob) {
                const sword = bot.inventory.items().find((item) => item.name.includes('sword'));
                if (sword) {
                    bot.equip(sword, 'hand');
                }
                bot.attack(mob);
                console.log("🔪 Mobs hostis? Hora de lutar!");
            }
        });
    },

    // Função para dormir à noite (corrigida)
    dormirANoite: (bot) => {
        bot.on('time', async () => {
            try {
                if (bot.time.timeOfDay >= 13000 && bot.time.timeOfDay <= 23000) { // Verifica se é noite
                    if (!bot.entity) {
                        console.log("🚫 O bot não está ativo para dormir.");
                        return;
                    }

                    const bed = bot.findBlock({
                        matching: (block) => block.name.includes('bed'),
                        maxDistance: 5
                    });

                    if (!bed) {
                        console.log("❌ Nenhuma cama encontrada. O bot não pode dormir.");
                        return;
                    }

                    if (bot.isSleeping) {
                        console.log("💤 O bot já está dormindo.");
                        return;
                    }

                    // Usando a cama (botão direito)
                    bot.useOn(bed, (err) => {
                        if (err) {
                            console.error('Erro ao tentar usar a cama:', err);
                        } else {
                            console.log("💤 O bot foi dormir com sucesso!");
                        }
                    });
                }
            } catch (err) {
                console.error("⚠️ Erro ao tentar dormir:", err.message);
            }
        });
    },

    
    // Função para quebrar blocos à frente (corrigida)
quebrarBlocos: (bot) => {
    let quebrandoBloco = false; // Variável para evitar múltiplas quebras simultâneas

    setInterval(() => {
        if (quebrandoBloco || bot.isUsingItem) return; // Se já estiver quebrando, não faz nada

        const blocoFrente = bot.blockAt(bot.entity.position.offset(0, 0, 1)); // Bloco à frente

        if (blocoFrente && blocoFrente.diggable) {
            quebrandoBloco = true; // Define que está quebrando um bloco

            bot.dig(blocoFrente, (err) => {
                if (err) {
                    console.error('Erro ao quebrar o bloco:', err);
                } else {
                    console.log(`✅ Bloco ${blocoFrente.name} quebrado com sucesso!`);
                }

                quebrandoBloco = false; // Libera para quebrar outro bloco depois
            });
        }
    }, 3000); // Verifica a cada 3 segundos
}


    // Função para ir até coordenadas específicas
    irParaCoordenadas: (bot, config) => {
        const { x, y, z } = config.targetCoordinates;
        bot.once('spawn', () => {
            bot.pathfinder.setGoal(new mineflayer.pathfinder.goals.GoalNear(x, y, z, 1));
            console.log(`🗺️ Indo até as coordenadas: (${x}, ${y}, ${z})`);
        });
    },

    // Função para enviar mensagens no chat
    enviarMensagensNoChat: (bot, config) => {
        setInterval(() => {
            const message = config.chatMessages[Math.floor(Math.random() * config.chatMessages.length)];
            bot.chat(message);
            console.log(`💬 Enviando mensagem no chat: "${message}"`);
        }, 600000); // Envia mensagem a cada 10 minutos
    },

    // Função para comer quando estiver com fome
    comerQuandoFaminto: (bot) => {
        bot.on('health', () => {
            if (bot.food < 18) { // Se a fome estiver baixa
                const food = bot.inventory.items().find((item) => item.name.includes('apple') || item.name.includes('bread'));
                if (food) {
                    bot.equip(food, 'hand');
                    bot.consume((err) => {
                        if (err) console.error('🍎 Erro ao comer:', err);
                        else console.log("🍎 Hora de comer! Estava com fome!");
                    });
                }
            }
        });
    }
};
