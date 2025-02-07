const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder');
const { GoalBlock } = require('mineflayer-pathfinder').goals;
const fs = require('fs');

let bot = mineflayer.createBot({
  host: 'scriptnza.falixsrv.me',
  port: 25565,
  username: 'DarknessBot',
  auth: 'offline',
});

const functionsConfig = JSON.parse(fs.readFileSync('./functionsConfig.json', 'utf8'));

bot.loadPlugin(pathfinder);

bot.on('spawn', () => {
  console.log('Bot spawned!');
  
  // Start mining if enabled in configuration
  if (functionsConfig.autoMine.enabled) {
    mineResources();
  }
  
  // Start woodcutting if enabled in configuration
  if (functionsConfig.woodCutter.enabled) {
    cutWood();
  }
  
  // Sleep during the night if enabled
  if (functionsConfig.sleepAtNight) {
    bot.on('time', (time) => {
      if (time >= 13000 && time <= 23500) {
        sleepAtNight();
      }
    });
  }

  // Chat messages every interval if enabled
  if (functionsConfig.chatMessages.enabled) {
    setInterval(() => {
      sendMessageToChat();
    }, functionsConfig.chatMessages.interval);
  }
});

function mineResources() {
  const minerals = functionsConfig.autoMine.minerals;
  const avoidLava = functionsConfig.autoMine.avoidLava;
  const breakAndPlaceBlocks = functionsConfig.autoMine.breakAndPlaceBlocks;

  // Example of a mining loop for ores
  setInterval(() => {
    const targetMinerals = minerals.map(mineral => bot.findBlock({
      matching: mineflayer.itemsByName[mineral].id,
      maxDistance: 64
    }));

    if (targetMinerals.length > 0) {
      const target = targetMinerals[0];
      bot.pathfinder.setGoal(new GoalBlock(target.position.x, target.position.y, target.position.z));

      bot.dig(target).then(() => {
        if (breakAndPlaceBlocks) {
          // Place a block if needed
        }
      });
    }
  }, 10000);
}

function cutWood() {
  // Gather wood until maxWood is reached
  let woodCount = 0;
  const maxWood = functionsConfig.woodCutter.maxWood;

  setInterval(() => {
    if (woodCount < maxWood) {
      const wood = bot.findBlock({
        matching: mineflayer.BlockID.LOG,
        maxDistance: 64
      });

      if (wood) {
        bot.dig(wood).then(() => {
          woodCount++;
          console.log(`Wood gathered: ${woodCount}/${maxWood}`);
        });
      }
    }
  }, 5000);
}

function sleepAtNight() {
  const bed = bot.findBlock({
    matching: mineflayer.BlockID.BED,
    maxDistance: 64
  });

  if (bed) {
    bot.sleep(bed).then(() => {
      console.log('Bot is sleeping');
    });
  }
}

function sendMessageToChat() {
  const messages = functionsConfig.chatMessages.messages;
  const message = messages[Math.floor(Math.random() * messages.length)];
  bot.chat(message);
}

bot.on('error', (err) => console.log(err));
bot.on('end', () => console.log('Bot disconnected!'));
