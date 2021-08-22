const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool

// retorna todos os produtos
router.get('/',(req,res,next)=>{

    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ error: error })

        conn.query(
            "SELECT * FROM arr;",
            (error,result,field) => {
                conn.release();

                if(error) return res.status(500).send({ error: error })

                    const response = {
                        length: result.length,
                        data: result.map( prod => {
                            return {
                                arr
                                
                            }
                        })
                    }
                    
                    return res.status(200).send({result: response })
                    
            }
        )

    })
    
})