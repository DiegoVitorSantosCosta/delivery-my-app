const express = require('express');
const app = express();

const router = express.Router();
const mysql = require('../mysql').pool;

const bcrypt = require('bcrypt');

router.post('/',(req,res,next) =>{    

    mysql.getConnection((error,conn) => {
        if(error) return res.status(500).send({ menssage: error });

        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err) return res.status(500).send({ menssage: err });
            conn.query(
                "insert into users (email,password) values (?,?);",
                [
                    req.body.email,
                    hash
                ],
                async (error,result,field) => {
                    
                    conn.release();
                    if(error) return res.status(500).send( { menssage: error });
    
                    const response = await {
                        menssage: 'Success',
                            id: result.insertId,
                            
                            email: req.body.email,                 
                            password: req.body.password                   
                        
                    }
                
                    res.status(201).send({
            
                        user: response
                         })
                }
            )
            
        })

       
    })
})


module.exports = router