var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');

router.patch('/:name/:nick', (req, res) => {
    const nome = req.params.name;
    const apelido = req.params.nick;
    const novosValores = req.body; // Supondo que os novos valores sejam enviados no corpo da requisição

    // Lendo o conteúdo do arquivo suspeitos.json
    const json = fs.readFileSync(path.join(path.resolve(__dirname, "../public"), 'suspeitos.json'));

    // Convertendo o conteúdo JSON para um objeto JavaScript
    let suspeitos = JSON.parse(json);

    // Localizando o suspeito correspondente ao nome e apelido (caso o apelido esteja definido)
    const veiculoAtualizado = suspeitos.find((susp) => susp.nomeCompleto === nome && (susp.apelido === apelido || !apelido));

    // Se o suspeito não foi encontrado, envie uma resposta de erro
    if (!veiculoAtualizado) {
        return res.status(404).json({ error: 'Suspeito não encontrado' });
    }

    // Atualizando os valores do suspeito com os novos valores recebidos
    Object.assign(veiculoAtualizado, novosValores);

    // Convertendo os dados atualizados de volta para JSON
    const dadosAtualizadosJSON = JSON.stringify(suspeitos);

    // Salvando os dados atualizados no arquivo suspeitos.json
    fs.writeFileSync(path.join(path.resolve(__dirname, "../public"), 'suspeitos.json'), dadosAtualizadosJSON);

    // Enviando uma resposta de sucesso
    console.log('Data successfully written to suspeitos.json');
    res.sendStatus(200);
});

module.exports = router;
