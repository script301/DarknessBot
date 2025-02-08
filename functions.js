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
        let coordenadaAnterior = bot.entity.position.clone(); // Guarda a coordenada inicial

        bot.on('entityHurt', (entity) => {
            // Verifica se o bot foi atacado
            if (entity === bot.entity && bot.health > 0) {
                // Encontra a entidade mais próxima (mobs hostis)
                const mob = bot.nearestEntity((entity) => {
                    return entity.type === 'mob' && entity.position.distanceTo(bot.entity.position) < 10;
                });

                if (mob) {
                    const espada = bot.inventory.items().find(item => item.name.includes('sword'));
                    if (espada) {
                        bot.equip(espada, 'hand'); // Equipa a espada na mão direita
                        bot.attack(mob); // Ataca o mob
                        console.log('⚔️ Atacando mob hostil!');
                    }
                }
            }
        });
    },

    // Função para dormir à noite (corrigida)
    dormirANoite: (bot) => {
        setInterval(() => {
            try {
                if (bot.time.timeOfDay >= 13000 && bot.time.timeOfDay <= 23000) { // Verifica se é noite
                    if (!bot.entity) {
                        console.log("🚫 O bot não está ativo para dormir.");
                        return;
                    }

                    const bed = bot.findBlock({
                        matching: (block) => block.name.includes('bed'),
                        maxDistance: 10 // Aumenta a área de busca da cama
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
        }, 5000); // Recarrega a busca por cama a cada 5 segundos
    },

    // Função para quebrar blocos na frente e na altura da cabeça
    quebrarBlocos: (bot) => {
        setInterval(() => {
            // Quebra bloco à frente
            const blocoFrente = bot.blockAt(bot.entity.position.offset(0, 0, 1)); // Bloco à frente
            const blocoCima = bot.blockAt(bot.entity.position.offset(0, 1, 0)); // Bloco acima da cabeça

            // Verifica se o bloco é quebrável e não está ocupado
            if (blocoFrente && blocoFrente.diggable) {
                bot.dig(blocoFrente, (err) => {
                    if (err) {
                        console.error('Erro ao quebrar o bloco à frente:', err);
                    } else {
                        console.log(`✅ Bloco ${blocoFrente.name} quebrado à frente!`);
                    }
                });
            }

            if (blocoCima && blocoCima.diggable) {
                bot.dig(blocoCima, (err) => {
                    if (err) {
                        console.error('Erro ao quebrar o bloco acima da cabeça:', err);
                    } else {
                        console.log(`✅ Bloco ${blocoCima.name} quebrado acima da cabeça!`);
                    }
                });
            }
        }, 1000); // Verifica e quebra os blocos a cada 1 segundo
    },

    // Função para mover o bot até as coordenadas específicas
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
                        
