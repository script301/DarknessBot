const fs = require('fs');
const readline = require('readline');
const config = require('./config.json');

// Função para ativar/desativar funcionalidades do bot
function ativarFuncao(funcao) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Digite a senha de administrador para ativar a função: ', (senha) => {
    if (senha === config.adminPassword) {
      console.log(`Função ${funcao} ativada com sucesso!`);
      rl.close();
      // Aqui você pode ativar a função solicitada
    } else {
      console.log('Senha incorreta!');
      rl.close();
    }
  });
}

// Função para gerar um código de ativação único
function gerarCodigo() {
  const codigo = Math.random().toString(36).substring(2, 15); // Gerando um código aleatório
  console.log(`Código gerado: ${codigo}`);
  return codigo;
}

// Exemplo de como usar o comando de ativar função
ativarFuncao('matarMobs');
