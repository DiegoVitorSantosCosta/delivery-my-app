const express = require('express');
const app = express();

const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');



// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});




const upload = multer({ storage: storage });

router.post('/', upload.single('picture'),(req,res,next) =>{
    
    
    const { picture } = req.file;
    res.status(201).send({ result: req.file })
    mysql.getConnection((error,conn) => {
        if(error) return res.status(500).send({ menssage: error });

        conn.query(
            (error,result,field) => {
                conn.release();
                if(error) return res.status(500).send( { menssage: error });

            
            }
        )
    })
})


module.exports = router