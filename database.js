const fs = require('fs');
const configPath = './database.json';

const carregarDados = () => {
    if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath);
        return JSON.parse(data);
    } else {
        return null;
    }
};

const salvarDados = (dados) => {
    fs.writeFileSync(configPath, JSON.stringify(dados, null, 2), 'utf8');
};

module.exports = {
    carregarDados,
    salvarDados
};
