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
app.use('/cadastro',routesUploads);


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

// configurações de cors
app.use((req,res,next)=>{
    // dendo permissão maxima aqui
    res.header("Acces-Control-Allow-Origin","*"),
    
    res.header("Acces-Control-Allow-Header",
    "Origin,X-Requested-With,Content-type,Accept")

    if(req.method === "OPTIONS"){
        res.header("Acess-Control-Allow-Methods","PUT,POST,PATCH,GET,DELET")
        return res.status(200).send({})
    }
    next();
})



module.exports = app

