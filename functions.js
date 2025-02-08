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

    // Função para dormir à noite
    dormirANoite: (bot) => {
        bot.on('time', () => {
            if (bot.time.timeOfDay >= 13000 && bot.time.timeOfDay <= 23000) { // É noite
                const bed = bot.findBlock({
                    matching: (block) => block.name.includes('bed'),
                    maxDistance: 5
                });

                if (bed) {
                    bot.sleep(bed, (err) => {
                        if (err) console.error('💤 Erro ao dormir:', err);
                        else console.log("💤 Hora de dormir! Boa noite, mundo!");
                    });
                }
            }
        });
    },

    // Função para quebrar blocos à frente
    quebrarBlocos: (bot) => {
        bot.on('physicsTick', () => {
            const block = bot.blockAtCursor(5);
            if (block && block.name !== 'air') {
                const pickaxe = bot.inventory.items().find((item) => item.name.includes('pickaxe'));
                if (pickaxe) {
                    bot.equip(pickaxe, 'hand');
                }
                bot.dig(block);
                console.log("⛏️ Blocos? Hora de minerar!");
            }
        });
    },

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
