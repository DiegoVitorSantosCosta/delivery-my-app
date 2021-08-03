const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.post('/',(req,res) =>{
    
    console.log(req.body);
    const {lastName,number} = req.body;
    res.json({ lastName, number })
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


module.exports = router