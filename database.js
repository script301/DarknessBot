const fs = require('fs');
const configPath = './database.json'; // Caminho para o arquivo de dados

// Função para carregar o banco de dados
const carregarDados = () => {
    if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath);
        return JSON.parse(data);
    } else {
        return null; // Caso o arquivo não exista, retorna null
    }
};

// Função para salvar dados no banco de dados
const salvarDados = (dados) => {
    fs.writeFileSync(configPath, JSON.stringify(dados, null, 2), 'utf8');
};

module.exports = {
    carregarDados,
    salvarDados
};
