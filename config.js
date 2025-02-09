// config.js
const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, 'data.json');

// Função para ler as configurações do arquivo JSON
function getConfig() {
  try {
    const rawData = fs.readFileSync(configFilePath);
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Erro ao ler o arquivo de configuração:', err);
    return null;
  }
}

// Função para atualizar as configurações do arquivo JSON
function updateConfig(newHost, newPort, newVersion) {
  const config = getConfig();
  
  if (config) {
    if (newHost) config.server.host = newHost;
    if (newPort) config.server.port = newPort;
    if (newVersion) config.server.version = newVersion;

    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  }
}

module.exports = {
  getConfig,
  updateConfig
};
