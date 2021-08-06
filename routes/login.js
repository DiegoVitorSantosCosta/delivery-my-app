const express = require('express');
const app = express();

const router = express.Router();
const mysql = require('../mysql').pool;

const bcrypt = require('bcrypt');

router.post('/',(req,res,next) =>{    

    mysql.getConnection((error,conn) => {
        if(error) return res.status(500).send({ menssage: error });

        conn.query(
            "select * from users where email =  ?",
            query,[req.body.email],
            async (error,result,field) => {
                conn.release();
                if(error) return res.status(500).send({ menssage: error });

                if(result.length < 1) return   res.status(409).send({ menssage: 'email não existe' }) ;

               
                 bcrypt.compare(req.body.password,result[0].password,(err,hash)=>{
                    if(err) return res.status(401).send({ menssage: 'falha na autentificação do email' });

                    if(result) return res.status(201).send({ menssage: 'login realizado com sucesso' });

                    return res.status(401).send({ menssage: 'senha errada' });
                   
                    
                })
            }
        )

        

       
    })
})


module.exports = router