const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:nome/:apelido', async function(req, res, next) {
  const nome = req.params.nome;
  const apelido = req.params.apelido;
  var v1 = ""; 
    if(apelido === " " && nome !== " "){
      v1 = nome; 
    };
    if (nome === " " && apelido !== " "){
      v1 = apelido;
    };
    if (nome !== " " && apelido !== " "){
      v1 = nome + "_" + apelido;
    };

    if (v1 !== " "){
        var pastaImagens = path.join(path.resolve(__dirname, `../public/uploads/suspeitos/`), v1 +'/');
        console.log(pastaImagens)
    };    
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

      console.log('até aqui conseguiu');
      res.json(imagensBase64);
    });
  } catch (ex) {
    console.error('Erro ao processar as imagens:', ex);
    res.sendStatus(500); // Retornar status 500 (Internal Server Error) em caso de erro
  }
});

module.exports = router;
