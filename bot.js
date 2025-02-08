// Função para configurar o servidor
const configureServer = () => {
    clearConsole(); // Limpa o console
    console.log('\n🌐 Configurar Servidor 🌐');
    rl.question('Digite o IP do servidor: ', (host) => {
        rl.question('Digite a porta do servidor: ', (port) => {
            rl.question('Digite o modo do jogo (survival, creative, etc.): ', (mode) => {
                // Atualiza as configurações do servidor
                config.server = {
                    host: host,
                    port: parseInt(port),
                    mode: mode.toLowerCase()
                };
                console.log(`✅ Servidor configurado: ${host}:${port} (Modo: ${mode}).`);
                setTimeout(() => showMenu(), 1000); // Volta ao menu após 1 segundo
            });
        });
    });
};
