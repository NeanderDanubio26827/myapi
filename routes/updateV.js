var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');

router.patch('/:placa/:modelo', (req, res) => {
    const placa = req.params.placa;
    const modelo = req.params.modelo;
    const novosValores = req.body; // Supondo que os novos valores sejam enviados no corpo da requisição

    // Lendo o conteúdo do arquivo veiculos.json
    const json = fs.readFileSync(path.join(path.resolve(__dirname, "../public"), 'veiculos.json'));

    // Convertendo o conteúdo JSON para um objeto JavaScript
    let veiculos = JSON.parse(json);

    // Localizando o veículo correspondente à placa
    const veiculoAtualizado = veiculos.find((veiculo) => veiculo.placa === placa && veiculo.modelo === modelo);

    // Se o veículo não foi encontrado, envie uma resposta de erro
    if (!veiculoAtualizado) {
        return res.status(404).json({ error: 'Veículo não encontrado' });
    }

    // Atualizando os valores do veículo com os novos valores recebidos
    Object.assign(veiculoAtualizado, novosValores);

    // Convertendo os dados atualizados de volta para JSON
    const dadosAtualizadosJSON = JSON.stringify(veiculos);

    // Salvando os dados atualizados no arquivo veiculos.json
    fs.writeFileSync(path.join(path.resolve(__dirname, "../public"), 'veiculos.json'), dadosAtualizadosJSON);

    // Enviando uma resposta de sucesso
    console.log('Data successfully written to veiculos.json');
    res.sendStatus(200);
});

module.exports = router;
