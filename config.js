const fs = require('fs');

const configFile = 'config.json';

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(configFile, 'utf8'));
  } catch (error) {
    return {
      server: { host: "scriptnza.falixsrv.me", port: 25565, version: "1.21.4" },
      bot: { name: "DarknessBot" }
    };
  }
}

function saveConfig(config) {
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}

function getConfig() {
  return loadConfig();
}

function updateConfig(section, newData) {
  const config = loadConfig();
  config[section] = { ...config[section], ...newData };
  saveConfig(config);
}

module.exports = { getConfig, updateConfig };
