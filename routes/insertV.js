var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');


async function saveFileFromByte(filepath, bytes) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(bytes, 'base64');
    fs.writeFile(filepath, buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filepath);
      }
    });
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve(__dirname, "../public/uploads/veiculos/")));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  let dados = req.body;
  let placa = dados.placa;

  //there are placa and image
  //make dir to placa e save image
  if (placa !== " " && dados.image){
    //a instrução abaixo está correta
    //cria um path
    var nomePasta = path.join(path.resolve(__dirname, `../public/uploads/veiculos/`), placa);

    if (fs.existsSync(nomePasta) ) {
      await saveFileFromByte(path.join(nomePasta + '/' + dados.imagem.originalname), dados.image);
      console.log('Imagem decodificada e salva com sucesso');
    }else{
      fs.mkdirSync(nomePasta);
      await saveFileFromByte(path.join(nomePasta + '/' + dados.imagem.originalname), dados.image);
      console.log('Imagem decodificada e salva com sucesso');
    }
      // Removendo o campo 'image' dos dados antes de salvar em "veiculos.json"
      delete dados.image;
      console.log(JSON.stringify(dados));
  
      // Lendo o arquivo "veiculos.json" e tratando como um JSON válido ou um array vazio
      let veiculos;
      try {
        veiculos = JSON.parse(fs.readFileSync(path.join(path.resolve(__dirname, "../public"), 'veiculos.json'))) || [];
      } catch (error) {
        veiculos = [];
      }
    
      // Adicionando os novos dados ao array
      veiculos.push(dados);
    
      // Escrevendo os dados no arquivo "veiculos.json"
      fs.writeFile(path.join(path.resolve(__dirname, "../public"), 'veiculos.json'), JSON.stringify(veiculos), (err) => {
        if (err) {
          console.error(err);
          console.log(dados);
          res.sendStatus(500);
        } else {
          console.log('Data successfully written to veiculos.json');
          res.sendStatus(200);
        }
      });
    
    
  }
  
  if (placa === " " && dados.originalname && dados.image){
    var nomePasta = path.join(path.resolve(__dirname, `../public/uploads/veiculos/`), dados.imagem.filename);

    if (fs.existsSync(nomePasta) ) {
      await saveFileFromByte(path.join(nomePasta + '/' + dados.imagem.originalname), dados.image);
      console.log('Imagem decodificada e salva com sucesso');
      
    }
    else{
      fs.mkdirSync(nomePasta);
      await saveFileFromByte(path.join(nomePasta + '/' + dados.imagem.originalname), dados.image);
      console.log('Imagem decodificada e salva com sucesso');
    
    }
      // Removendo o campo 'image' dos dados antes de salvar em "veiculos.json"
      delete dados.image;
      console.log(JSON.stringify(dados));
  
      // Lendo o arquivo "veiculos.json" e tratando como um JSON válido ou um array vazio
      let veiculos;
      try {
        veiculos = JSON.parse(fs.readFileSync(path.join(path.resolve(__dirname, "../public"), 'veiculos.json'))) || [];
      } catch (error) {
        veiculos = [];
      }
    
      // Adicionando os novos dados ao array
      veiculos.push(dados);
    
      // Escrevendo os dados no arquivo "veiculos.json"
      fs.writeFile(path.join(path.resolve(__dirname, "../public"), 'veiculos.json'), JSON.stringify(veiculos), (err) => {
        if (err) {
          console.error(err);
          console.log(dados);
          res.sendStatus(500);
        } else {
          console.log('Data successfully written to veiculos.json');
          res.sendStatus(200);
        }
      });
    }
    
  
  // Removendo o campo 'image' dos dados antes de salvar em "veiculos.json"
  delete dados.image;

  //No placa and no image
  //save files in json format
  if (placa === " "){
    console.log(JSON.stringify(dados));

    // Lendo o arquivo "veiculos.json" e tratando como um JSON válido ou um array vazio
    let veiculos;
    try {
      veiculos = JSON.parse(fs.readFileSync(path.join(path.resolve(__dirname, "../public"), 'veiculos.json'))) || [];
    } catch (error) {
      veiculos = [];
    }
  
    // Adicionando os novos dados ao array
    veiculos.push(dados);
  
    // Escrevendo os dados no arquivo "veiculos.json"
    fs.writeFile(path.join(path.resolve(__dirname, "../public"), 'veiculos.json'), JSON.stringify(veiculos), (err) => {
      if (err) {
        console.error(err);
        console.log(dados);
        res.sendStatus(500);
      } else {
        console.log('Data successfully written to veiculos.json');
        res.sendStatus(200);
      }
    });
  }
  
});

module.exports = router;
