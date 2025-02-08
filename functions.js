module.exports = {
    // Função para atacar mobs ao ser atacado
    atacarMobsAoSerAtacado: (bot) => {
        let coordenadaAnterior = bot.entity.position.clone(); // Guarda a coordenada inicial

        bot.on('health', () => {
            // Verifica se o bot está sendo atacado
            if (bot.health < bot.entity.health) {
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

                    // Espera o mob ser derrotado e volta à coordenada anterior
                    bot.on('entityGone', (entity) => {
                        if (entity === mob) {
                            setTimeout(() => {
                                const dist = bot.entity.position.distanceTo(coordenadaAnterior);
                                if (dist > 1) {
                                    bot.pathfinder.setGoal(new mineflayer.pathfinder.goals.GoalNear(coordenadaAnterior.x, coordenadaAnterior.y, coordenadaAnterior.z, 1));
                                    console.log(`🏃 Retornando para a coordenada: (${coordenadaAnterior.x}, ${coordenadaAnterior.y}, ${coordenadaAnterior.z})`);
                                }
                            }, 1000); // Aguarda 1 segundo para garantir que o mob foi derrotado
                        }
                    });
                }
            }
        });
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
};
