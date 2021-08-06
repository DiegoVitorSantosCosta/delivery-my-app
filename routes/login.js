const express = require('express');
const app = express();

const router = express.Router();
const mysql = require('../mysql').pool;
const jwt = require('jsonwebtoken');

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

               
                 bcrypt.compare(req.body.password,result[0].password,(err,response)=>{
                    if(err) return res.status(401).send({ menssage: 'falha na autentificação do email' });

                    if(response){ 
                            const userInfo
                        
                            const token = jwt.sign(userInfo, secret);
                            
                           

                        return res.status(201).send({ 
                            menssage: 'login realizado com sucesso',
                            token: token
                         });
                        }

                    return res.status(401).send({ menssage: 'senha errada' });
                   
                })
            }
        )

    })
})


module.exports = router