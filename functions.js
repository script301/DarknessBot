// functions.js

let functions = {
    sleepAtNight: true,  // Dormir à noite
    attackMobs: true,    // Atacar mobs hostis
    eatFood: true,       // Comer alimentos (exceto carne podre)
  };
  
  // Função para dormir à noite
  function sleepAtNightFunction(bot) {
    bot.on('time', (time) => {
      if (functions.sleepAtNight && time > 12500 && time < 23500) {  // Entre 18:30 e 06:30 é noite no Minecraft
        const bed = bot.findBlock({ matching: 355, maxDistance: 5 });  // Encontra cama próxima
        if (bed) {
          bot.sleep(bed);
          console.log('Bot está indo dormir...');
        }
      }
    });
  }
  
  // Função para matar mobs automaticamente
  function attackMobsFunction(bot) {
    bot.on('entitySpawn', (entity) => {
      if (functions.attackMobs && entity.type === 'mob' && entity.mobType !== 'player') {
        bot.attack(entity);
        console.log(`Bot atacando mob: ${entity.mobType}`);
      }
    });
  }
  
  // Função para comer alimentos (exceto carne podre)
  function eatFoodFunction(bot) {
    bot.on('health', () => {
      if (functions.eatFood && bot.food < 20) {
        const food = bot.inventory.items().find(item => item.name !== 'rotten_flesh' && item.name.includes('apple'));
        if (food) {
          bot.equip(food, 'hand', () => {
            bot.consume();  // O bot vai comer o alimento
            console.log('Bot comendo...');
          });
        }
      }
    });
  }
  
  // Exportar as funções e configurações
  module.exports = {
    functions,
    sleepAtNightFunction,
    attackMobsFunction,
    eatFoodFunction,
  };
  