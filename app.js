const express = require('express')
const app = express()
const morgan = require('morgan')
const routesProducts = require('./routes/produtos')
const routesUploads = require('./routes/uploads')


app.use('/uploads',express.static('uploads'));
// monitora as requisições feitas.
app.use(morgan('dev'))

app.use(express.urlencoded( { extended: false }))  // apenas dados simples
app.use(express.json()) // entrada de json no body

app.use('/products',routesProducts);
app.use('/upload',routesUploads);

// const multer = require('multer');


// Configuração de armazenamento
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         // Extração da extensão do arquivo original:
//         const extensaoArquivo = file.originalname.split('.')[1];

//         // Cria um código randômico que será o nome do arquivo
//         const novoNomeArquivo = require('crypto')
//             .randomBytes(64)
//             .toString('hex');

//         // Indica o novo nome do arquivo:
//         cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
//     }
// });

// const upload = multer({ storage });

app.use((req,res,next)=>{
    const error = new Error('Não encontrado ...')
    error.status = 404
    next(error)
})

app.use((error,req,res,next) =>{
    // passamos o status do error diretamente do paarametro da função, se não encontrar, ele vem como 500
    res.status(404 )

    return res.send({
        error:{
            mensage: "Não encontrado"
        }
    })
})



module.exports = app

