const mineflayer = require('mineflayer');
const fs = require('fs');
const readline = require('readline');
const config = require('./config.json');

// Função para verificar o código de ativação
function verificarCodigo(codigo) {
  if (config.codes.includes(codigo)) {
    // Remover código após ativação única
    const index = config.codes.indexOf(codigo);
    config.codes.splice(index, 1);
    fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
    console.log('Código de ativação bem-sucedido!');
    return true;
  } else {
    console.log('Código inválido ou já usado!');
    return false;
  }
}

// Função para pedir senha do administrador
function pedirSenha() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Digite a senha do administrador: ', (senha) => {
    if (senha === config.adminPassword) {
      console.log('Senha correta!');
      rl.close();
      // Iniciar o bot após ativação
      iniciarBot();
    } else {
      console.log('Senha incorreta!');
      rl.close();
    }
  });
}

// Função para iniciar o bot
function iniciarBot() {
  const bot = mineflayer.createBot({
    host: config.server.host,
    port: config.server.port,
    username: config.server.username,
    version: '1.16.4', // versão do Minecraft (ajuste conforme necessário)
    auth: config.server.loginMode === 'offline' ? 'mojang' : 'minecraft'
  });

  bot.on('spawn', () => {
    console.log('Bot iniciou com sucesso!');
    // Coloque outras lógicas do bot aqui (mover, atacar, etc)
  });

  bot.on('error', err => console.log(err));
  bot.on('end', () => console.log('Bot desconectado!'));
}

// Verificar se o código de ativação foi fornecido ao iniciar
if (process.argv[2]) {
  const codigo = process.argv[2];
  if (verificarCodigo(codigo)) {
    pedirSenha();
  }
} else {
  console.log('Por favor, forneça um código de ativação!');
}
