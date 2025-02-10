// functions.js
function attackMobsFunction(bot) {
    // Funciona a cada 2 segundos
    setInterval(() => {
      const target = bot.nearestEntity((entity) => {
        return entity && entity.type === 'mob' && entity !== bot.entity;
      });
  
      if (target) {
        bot.attack(target);
        console.log(`Atacando mob: ${target.type}`);
      }
    }, 2000);
  }
  
  module.exports = {
    attackMobsFunction,
  };
  