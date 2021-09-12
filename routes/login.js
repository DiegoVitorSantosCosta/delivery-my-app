const express = require('express');
const app = express();

const router = express.Router();
const mysql = require('../mysql').pool;
var jwt = require('jsonwebtoken');

// deixa em hash a senha
const bcrypt = require('bcrypt');

router.post('/',(req,res,next) =>{    

    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ menssage: error });

        const query = "select * from users where email =  ?";

        conn.query(

            query,[req.body.email],

            async (error,result,field) => {

                conn.release();

                if(error) return res.status(500).send({ menssage: error });

                if(result.length < 1) return   res.status(409).send({ menssage: 'email não existe' }) ;

               
                if(req.body.password == result[0].password){
                     
                    if(err) return res.status(401).send({ menssage: 'falha na autentificação do email' });

                    if(response){ 
                            
                        const token = jwt.sign({ foo: 'bar' }, 'shhhhh',{expiresIn:"24h"});

                            
                           

                        return res.status(201).send({ 
                            menssage: 'login realizado com sucesso',
                            token: token
                         });
                        }

                    return res.status(401).send({ menssage: 'senha errada' });
                   
                }
            }
        )

    })
})


module.exports = router