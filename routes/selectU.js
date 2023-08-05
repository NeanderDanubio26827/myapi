var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path')


router.get('/', (req, res) => {
        
    // Lendo o conteúdo do arquivo user.json
    const json = fs.readFileSync(path.join(path.resolve(__dirname,"../public"),'users.json'))
    const users = JSON.parse(json)
    console.log(users);
    res.json(users)

   });

module.exports = router;