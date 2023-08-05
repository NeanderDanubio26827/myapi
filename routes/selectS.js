var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path')


router.get('/', (req, res) => {
        
    // Lendo o conteúdo do arquivo user.json
    const json = fs.readFileSync(path.join(path.resolve(__dirname,"../public"),'suspeitos.json'))
    const suspeitos = JSON.parse(json)
    //console.log(suspeitos);
    res.json(suspeitos)

   });

module.exports = router;