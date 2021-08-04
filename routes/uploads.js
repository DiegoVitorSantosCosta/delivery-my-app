const express = require('express');
const app = express();

const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');

const storage = multer.diskStorage({

    destination: function (req,file,cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null,  btoa(Date.now().toString() + file.originalname.toString()) );
      }
    
})

const upload = multer({ storage: storage });

router.post('/', upload.single('picture'),(req,res,next) =>{
    
    
    const { picture } = req.file;
    res.status(201).send({ result: 'https://delivery-myapp.herokuapp.com/' +  req.file.path })

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