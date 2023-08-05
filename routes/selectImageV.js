const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:placa', async function(req, res, next) {
  const placa = req.params.placa;
  //const modelo = req.params.modelo;

  // Construindo o caminho para a pasta das imagens com base na placa e modelo
  //const pastaImagens = path.join(__dirname, '..', 'public', 'images', 'uploads', 'veiculos', placa);
  var pastaImagens = path.join(path.resolve(__dirname, `../public/uploads/veiculos/`), placa +'/');
  console.log(pastaImagens)
  try {
    // Verificando se a pasta de imagens existe
    if (!fs.existsSync(pastaImagens)) {
      console.error('Pasta de imagens não encontrada:', pastaImagens);
      return res.sendStatus(404); // Retornar status 404 (Not Found) caso a pasta não exista
    }

    // Lendo o conteúdo da pasta
    fs.readdir(pastaImagens, async (err, files) => {
      if (err) {
        console.error('Erro ao ler a pasta:', err);
        return res.sendStatus(500); // Retornar status 500 (Internal Server Error) em caso de erro
      }

      const imagensBase64 = await Promise.all(files.map(async (file) => {
        const filepath = path.join(pastaImagens, file);
        const bytes = await fs.promises.readFile(filepath);
        return bytes.toString('base64');
      }));
      console.log('até aqui conseguiu')
      res.json(imagensBase64);
      
    });
  } catch (ex) {
    console.error('Erro ao processar as imagens:', ex);
    res.sendStatus(500); // Retornar status 500 (Internal Server Error) em caso de erro
  }
});

module.exports = router;
