const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const config = {
    serverSettings: {
        ip: 'localhost',
        port: 25565,
        username: 'DarknessBot'
    }
};

function showMenu() {
    console.clear();
    console.log(chalk.blue('============================='));
    console.log(chalk.green('        DARKNESS BOT         '));
    console.log(chalk.blue('============================='));
    console.log(chalk.yellow('1. Configuração do Servidor'));
    console.log(chalk.yellow('2. Sair'));
    console.log(chalk.blue('============================='));
    rl.question(chalk.cyan('Escolha uma opção: '), (option) => {
        handleMenuSelection(option);
    });
}

function handleMenuSelection(option) {
    switch (option) {
        case '1':
            configureServer();
            break;
        case '2':
            console.log(chalk.red('Saindo...'));
            rl.close();
            break;
        default:
            console.log(chalk.red('Opção inválida!'));
            setTimeout(showMenu, 1000);
    }
}

function configureServer() {
    console.clear();
    console.log(chalk.green('Configuração do Servidor'));
    rl.question(chalk.cyan(`IP Atual [${config.serverSettings.ip}]: `), (ip) => {
        if (ip) config.serverSettings.ip = ip;
        rl.question(chalk.cyan(`Porta Atual [${config.serverSettings.port}]: `), (port) => {
            if (port) config.serverSettings.port = parseInt(port);
            rl.question(chalk.cyan(`Nome de Usuário [${config.serverSettings.username}]: `), (username) => {
                if (username) config.serverSettings.username = username;
                console.log(chalk.green('Configuração salva!'));
                setTimeout(showMenu, 1000);
            });
        });
    });
}

showMenu();
