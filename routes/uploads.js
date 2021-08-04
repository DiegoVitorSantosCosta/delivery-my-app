const express = require('express');
const app = express();

const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');



const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('picture'),(req,res,next) =>{
    
    
    const { picture } = req.file;
    res.status(201).send({ result: req.file })

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