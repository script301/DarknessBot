module.exports = {
    movimentoDoBot: (bot) => {
        setInterval(() => {
            bot.setControlState('forward', true);
            setTimeout(() => bot.setControlState('forward', false), 1000);
        }, 60000);
    },

    puloDoBot: (bot) => {
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    },

    atacarMobs: (bot) => {
        setInterval(() => {
            const alvo = bot.nearestEntity(entity => {
                return entity.type === 'mob' && entity.position.distanceTo(bot.entity.position) < 5;
            });

            if (alvo) {
                const arma = bot.inventory.items().find(item => item.name.includes('sword'));
                if (arma) bot.equip(arma, 'hand');
                
                bot.lookAt(alvo.position.offset(0, alvo.height, 0), true);
                bot.attack(alvo);
                console.log('⚔️ Atacando', alvo.name);
            }
        }, 2000);
    },

    dormirANoite: (bot) => {
        setInterval(() => {
            if (bot.time.timeOfDay >= 13000 && bot.time.timeOfDay <= 23000) {
                const cama = bot.findBlock({ matching: block => block.name.includes('bed'), maxDistance: 10 });
                if (cama) bot.sleep(cama).then(() => console.log("💤 Dormindo!")).catch(() => {});
            }
        }, 5000);
    },

    irParaCoordenadas: (bot, config) => {
        bot.pathfinder.setGoal(new mineflayer.pathfinder.goals.GoalNear(config.targetCoordinates.x, config.targetCoordinates.y, config.targetCoordinates.z, 1));
        console.log(`🗺️ Indo para: (${config.targetCoordinates.x}, ${config.targetCoordinates.y}, ${config.targetCoordinates.z})`);
    },

    enviarMensagensNoChat: (bot, config) => {
        setInterval(() => {
            const msg = config.chatMessages[Math.floor(Math.random() * config.chatMessages.length)];
            bot.chat(msg);
            console.log(`💬 Mensagem enviada: "${msg}"`);
        }, 600000);
    },

    comerQuandoFaminto: (bot) => {
        bot.on('health', () => {
            if (bot.food < 18) {
                const comida = bot.inventory.items().find(item => item.name.includes('apple') || item.name.includes('bread'));
                if (comida) {
                    bot.equip(comida, 'hand');
                    bot.consume().then(() => console.log("🍎 Comendo!")).catch(() => {});
                }
            }
        });
    }
};
