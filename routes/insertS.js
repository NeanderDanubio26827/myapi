var express = require('express');
var router = express.Router();
var fs = require('fs');
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
    cb(null, path.join(path.resolve(__dirname, "../public/uploads/suspeitos/")));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async(req, res) => {
  var dados = req.body;
  var nome = dados.nomeCompleto;
  var apelido = dados.apelido;
  var v1 = ""; 
    if(apelido === " " && nome !== " "){
      v1 = nome; 
    }
    if (nome === " " && apelido !== " "){
      v1 = apelido;
    }
    if (nome !== " " && apelido !== " "){
      v1 = nome + "_" + apelido;
    }
  //there are placa and image
  //make dir to placa e save image
  if (v1 !== " " && dados.image){
    //a instrução abaixo está correta
    //cria um path
    var nomePasta = path.join(path.resolve(__dirname, `../public/uploads/suspeitos/`), v1);

    if (fs.existsSync(nomePasta) ) {
      await saveFileFromByte(path.join(nomePasta + '/' + dados.imagem.originalname), dados.image);
      console.log('Imagem decodificada e salva com sucesso');
      
    }else{
      fs.mkdirSync(nomePasta);
      await saveFileFromByte(path.join(nomePasta + '/' + dados.imagem.originalname), dados.image);
      console.log('Imagem decodificada e salva com sucesso');
      
    }
      // Removendo o campo 'image' dos dados antes de salvar em "suspeitos.json"
      delete dados.image;
      console.log(JSON.stringify(dados));
  
      // Lendo o arquivo "suspeitos.json" e tratando como um JSON válido ou um array vazio
      let suspeitos;
      try {
        suspeitos = JSON.parse(fs.readFileSync(path.join(path.resolve(__dirname, "../public"), 'suspeitos.json'))) || [];
      } catch (error) {
        suspeitos = [];
      }
    
      // Adicionando os novos dados ao array
      suspeitos.push(dados);
    
      // Escrevendo os dados no arquivo "suspeitos.json"
      fs.writeFile(path.join(path.resolve(__dirname, "../public"), 'suspeitos.json'), JSON.stringify(suspeitos), (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          console.log('Data successfully written to suspeitos.json');
          res.sendStatus(200);
        }
      });
      
  }
  // Removendo o campo 'image' dos dados antes de salvar em "veiculos.json"
  delete dados.image;

  //No placa and no image
  //save files in json format
  if (!dados.image){
    console.log(JSON.stringify(dados));

    // Lendo o arquivo "veiculos.json" e tratando como um JSON válido ou um array vazio
    let veiculos;
    try {
      veiculos = JSON.parse(fs.readFileSync(path.join(path.resolve(__dirname, "../public"), 'suspeitos.json'))) || [];
    } catch (error) {
      veiculos = [];
    }
  
    // Adicionando os novos dados ao array
    veiculos.push(dados);
  
    // Escrevendo os dados no arquivo "veiculos.json"
    fs.writeFile(path.join(path.resolve(__dirname, "../public"), 'suspeitos.json'), JSON.stringify(veiculos), (err) => {
      if (err) {
        console.error(err);
        console.log(dados);
        res.sendStatus(500);
      } else {
        console.log('Data successfully written to suspeitos.json');
        res.sendStatus(200);
      }
    });
  }
});

module.exports = router;
