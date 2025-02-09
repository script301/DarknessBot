// config.js

let config = {
    server: {
      host: 'localhost',  // IP do servidor
      port: 25565,        // Porta do servidor (padrão 25565)
      version: '1.19.4',  // Versão do Minecraft (substituir por uma versão específica)
    }
  };
  
  // Função para alterar as configurações de servidor
  function updateServerConfig(newHost, newPort, newVersion) {
    if (newHost) config.server.host = newHost;
    if (newPort) config.server.port = newPort;
    if (newVersion) config.server.version = newVersion;
  
    console.log(`Configurações do servidor atualizadas: 
      IP: ${config.server.host}, 
      Porta: ${config.server.port}, 
      Versão: ${config.server.version}`);
  }
  
  module.exports = { config, updateServerConfig };
  