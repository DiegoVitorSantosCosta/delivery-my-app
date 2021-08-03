const express = require('express')
const app = express()
const morgan = require('morgan')
const routesProducts = require('./routes/produtos')
// const routesUploads = require('./routes/uploads').app;


app.use('/uploads',express.static('uploads'));
// monitora as requisições feitas.
app.use(morgan('dev'))

app.use(express.urlencoded( { extended: false }))  // apenas dados simples
app.use(express.json()) // entrada de json no body

app.use('/products',routesProducts);
// app.use('/upload',routesUploads);

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('picture'),(req,res) =>{
    
    
    const {lastName,numbe,picture} = req.body;
    res.json({ lastName, number,picture })
    // mysql.getConnection((error,conn) => {
    //     if(error) return res.status(500).send({ menssage: error });

    //     conn.query(
    //         (error,result,field) => {
    //             conn.release();
    //             if(error) return res.status(500).send( { menssage: error });

            
    //         }
    //     )
    // })
})


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

