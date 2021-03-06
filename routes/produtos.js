const express = require('express')
const router = express.Router()

const mysql = require("../mysql").pool
const multer = require('multer');

// faz o caminho da imagem 
const storage =  multer.diskStorage({
    destination: function (req,file,cb){
        
        cb(null,`./uploads/`);
    },
    filename: function (req,file,cb) {
        cb(null,new Date().toISOString() +  file.originalname)
    }
})

// filtra o tipo de arquivo que eu quero receber
const filter = (req,file,cb) => {
    file.mimetype === 'image/pdf' ? cb(null,false) : cb(null,true)
}

const upload = multer({ 
    storage: storage,
    // fileFilter: filter
 })


// retorna todos os produtos
router.get('/',(req,res,next)=>{

    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ error: error })

        conn.query(
            "SELECT * FROM products;",
            (error,result,field) => {
                conn.release();

                if(error) return res.status(500).send({ error: error })

                    const response = {
                        length: result.length,
                        products: result.map( prod => {
                            return {
                                name: prod.name,
                                price: prod.price,
                                id_products: prod.id_products,
                                description: prod.description,
                                filename: prod.filename,
                                fileServerPath: prod.fileServerPath
                                
                            }
                        })
                    }
                    
                    return res.status(200).send({result: response })
                    
            }
        )

    })
    
})



// criar um produto
router.post('/',(req,res,next)=>{

    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ error: error })

        conn.query(
            "insert into products (name,price,description,filename,fileServerPath) values (?,?,?,?,?)",
            [
                req.body.name,
                req.body.price,
                req.body.description,
                req.body.filename,
                req.body.fileServerPath
            ],

            (error,result,field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: error,
                        response: 'res laksj'
                    })
                }
                const response = {
                    menssage: 'produto criado com sucesso',
                    productCreate:{
                        id_product: result.id_products,
                        name: req.body.name,
                        price: req.body.price,
                        description: req.body.description,
                        filename: req.body.filename,                 
                        fileServerPath: req.body.fileServerPath                       
                    }
                }
                res.status(201).send({
                    menssage: "cadastrado com sucesso",
                    create: response
                })
            }
        )
    })
    
    
})

router.put('/',(req,res,next)=>{
    console.log(req.body.filename);
    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ error: error })

        conn.query(
            `UPDATE products
             SET name = ?,
             price = ?,
             filename = ?

              WHERE id_products = ?`,
            [
                req.body.name,
                req.body.price,
                req.body.id_products,
                req.body.filename
                
            ],
            (error,result,field) => {
                conn.release();

                if(error) return res.status(500).send({ error: error })

                return res.status(204).send({
                    menssage: "produto alterado !"
                })
            }
        )

    })
})

router.delete('/',(req,res,next)=>{
    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ error: error })

        conn.query(
            `DELETE FROM  products
            
              WHERE id_products = ?`,
            [
                req.body.id_products,
            ],
            (error,result,field) => {
                conn.release();

                if(error) return res.status(500).send({ error: error })

                return res.status(204).send({
                    menssage: "produto deletado !"
                })
            }
        )

    })
})

router.patch('/',(req,res,next)=>{
    res.status(201).send({
        menssage: "usando post dentro da rota de produtos"
    })
})

// retorna os dados de um unico produto
router.get('/:id_product',(req,res,next)=>{

    // pegar o parametro id da req

    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ error: error })

        conn.query(
            "SELECT * FROM products WHERE id_products = ?;",
            [req.params.id_product],
            (error,result,field) => {
                conn.release();

                if(error) return res.status(500).send({ error: error })

                if(result.length === 0 ) return res.status(404).send({menssage: 'n??o tem este produto'})
                const response = {
                
                    product: {
                        
                            id_products: prod[0].id_products,
                            name: prod[0].name,
                            price: prod[0].price
                        
                    }
                }

                return res.status(200).send({result: result })
            }
        )

    })
   
})

module.exports = router