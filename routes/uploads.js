const express = require('express');
const app = express();

const router = express.Router();
const mysql = require('../mysql').pool;
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


module.exports = app