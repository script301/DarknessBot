const mineflayer = require('mineflayer');

module.exports = {
    // Função para mover o bot periodicamente
    movimentoDoBot: (bot) => {
        setInterval(() => {
            bot.setControlState('forward', true);
            setTimeout(() => {
                bot.setControlState('forward', false);
            }, 1000);
        }, 60000);
    },

    // Função para o bot pular periodicamente
    puloDoBot: (bot) => {
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => {
                bot.setControlState('jump', false);
            }, 500);
        }, 30000);
    },

    // Função para atacar mobs hostis automaticamente
    atacarMobs: (bot) => {
        setInterval(() => {
            const mob = bot.nearestEntity(entity => 
                entity.type === 'mob' && 
                entity.position.distanceTo(bot.entity.position) < 10
            );

            if (mob) {
                const arma = bot.inventory.items().find(item => item.name.includes('sword') || item.name.includes('axe'));
                if (arma) bot.equip(arma, 'hand');

                bot.lookAt(mob.position.offset(0, mob.height, 0), true, () => {
                    bot.attack(mob);
                    console.log(`⚔️ Atacando mob: ${mob.name}`);
                });
            }
        }, 1000);
    },

    // Função para dormir à noite
    dormirANoite: (bot) => {
        setInterval(() => {
            try {
                if (bot.time.timeOfDay >= 13000 && bot.time.timeOfDay <= 23000) {
                    if (!bot.entity) return;

                    const bed = bot.findBlock({
                        matching: (block) => block.name.includes('bed'),
                        maxDistance: 10
                    });

                    if (!bed) return;

                    if (bot.isSleeping) return;

                    bot.useOn(bed, (err) => {
                        if (err) console.error('Erro ao tentar dormir:', err);
                        else console.log("💤 O bot foi dormir!");
                    });
                }
            } catch (err) {
                console.error("⚠️ Erro ao tentar dormir:", err.message);
            }
        }, 5000);
    },

    // Função para mover o bot até coordenadas específicas
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
        }, 600000);
    },

    // Função para comer quando estiver com fome
    comerQuandoFaminto: (bot) => {
        bot.on('health', () => {
            if (bot.food < 18) {
                const food = bot.inventory.items().find((item) => item.name.includes('apple') || item.name.includes('bread'));
                if (food) {
                    bot.equip(food, 'hand');
                    bot.consume((err) => {
                        if (err) console.error('🍎 Erro ao comer:', err);
                        else console.log("🍎 Hora de comer!");
                    });
                }
            }
        });
    },

    // Função para logs periódicos otimizados
    registrarLogs: (bot) => {
        setInterval(() => {
            console.clear();
            console.log(`📌 Posição: ${bot.entity.position.round().toString()}`);
            console.log(`❤️ Vida: ${bot.health}`);
            console.log(`🍗 Fome: ${bot.food}`);
            console.log(`🔄 Status: ${bot.state || 'Normal'}`);
        }, 1000);
    }
};
