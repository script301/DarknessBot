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

    // Função para atacar mobs hostis corretamente
    atacarMobs: (bot) => {
        setInterval(() => {
            const mob = bot.nearestEntity(entity => {
                return entity.type === 'mob' && entity.position.distanceTo(bot.entity.position) < 10;
            });

            if (mob) {
                const espada = bot.inventory.items().find(item => item.name.includes('sword'));
                if (espada) {
                    bot.equip(espada, 'hand');
                }
                bot.attack(mob);
                console.log(`⚔️ Atacando mob: ${mob.name}`);
            }
        }, 2000); // Verifica mobs a cada 2 segundos
    },

    // Função para dormir à noite
    dormirANoite: (bot) => {
        setInterval(() => {
            try {
                if (bot.time.timeOfDay >= 13000 && bot.time.timeOfDay <= 23000) {
                    const bed = bot.findBlock({ matching: block => block.name.includes('bed'), maxDistance: 10 });
                    if (bed) {
                        bot.useOn(bed);
                        console.log("💤 O bot foi dormir!");
                    } else {
                        console.log("❌ Nenhuma cama encontrada.");
                    }
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
            console.log(`🗺️ Indo até: (${x}, ${y}, ${z})`);
        });
    },

    // Função para enviar mensagens no chat
    enviarMensagensNoChat: (bot, config) => {
        setInterval(() => {
            const message = config.chatMessages[Math.floor(Math.random() * config.chatMessages.length)];
            bot.chat(message);
            console.log(`💬 Enviando mensagem: "${message}"`);
        }, 600000); // 10 minutos
    },

    // Função para comer quando estiver com fome
    comerQuandoFaminto: (bot) => {
        bot.on('health', () => {
            if (bot.food < 18) {
                const food = bot.inventory.items().find(item => item.name.includes('apple') || item.name.includes('bread'));
                if (food) {
                    bot.equip(food, 'hand');
                    bot.consume();
                    console.log("🍎 O bot comeu algo!");
                }
            }
        });
    },

    // Função para registrar logs a cada 2 segundos
    registrarLogs: (bot) => {
        setInterval(() => {
            console.log(`📌 Posição: X:${bot.entity.position.x.toFixed(2)} Y:${bot.entity.position.y.toFixed(2)} Z:${bot.entity.position.z.toFixed(2)}`);
            console.log(`❤️ Vida: ${bot.health} | 🍗 Fome: ${bot.food}`);
            const mobs = bot.entities ? Object.values(bot.entities).filter(entity => entity.type === 'mob') : [];
            console.log(`👀 Mobs próximos: ${mobs.length > 0 ? mobs.map(mob => mob.name).join(', ') : "Nenhum"}`);
        }, 2000);
    }
};
