const express = require('express')
const router = express.Router()
const cors = require('cors')
const mysql = require('../mysql').pool;
var jwt = require('jsonwebtoken');

// deixa em hash a senha

var corsOptions = {

    origin: 'http://localhost:8100',

    optionsSuccessStatus: 200 ,// some legacy browsers (IE11, various SmartTVs) choke on 204

    
  }
router.post('/', cors(corsOptions),(req,res,next) =>{    

    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ menssage: error });

        const query = "select * from users where email =  ?";

        conn.query(

            query,[req.body.email],

            async (error,result,field) => {

                conn.release();

                if(error) return res.status(500).send({ menssage: error });

                if(result.length < 1) return   res.status(409).send({ menssage: 'email não existe' }) ;

                if(req.body.password != result[0].password) return res.status(409).send({ menssage: 'senha incorreta' }) ;

                else{
                    
                    const token = jwt.sign({ foo: 'bar' }, 'shhhhh',{expiresIn: "1h"});

                            
                           

                        return res.status(201).send({ 
                            menssage: 'login realizado com sucesso',
                            token: token
                         });
                }
               
               
            }
        )

    })
})


module.exports = router