const express = require('express')
const app = express()
const morgan = require('morgan')
const routesProducts = require('./routes/produtos')
const routesUploads = require('./routes/uploads');
const routerUser = require('./routes/users');
const routerLogin = require('./routes/login');

const cors = require('cors');
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Headers","*");
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Request-Headers","*")
//     app.use(cors());
//   })
// configurações de cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers","*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Headers","*")
    app.use(cors());
    next();
    })


app.use('/uploads',express.static('uploads'));
// monitora as requisições feitas.
app.use(morgan('dev'))

app.use(express.urlencoded( { extended: false }))  // apenas dados simples
app.use(express.json()) // entrada de json no body


//Rotas para requests
app.use('/products',routesProducts);
app.use('/cadastro',routesUploads);
app.use('/users',routerUser);
app.use('/login',routerLogin);


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

