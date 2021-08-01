const express = require('express');
const router = express.Router();

const mysql = require("../mysql").pool


// retorna todos os produtos
router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ error: error })

        conn.query(
            "SELECT * FROM pedidos;",
            (error,result,field) => {

                if(error) return res.status(500).send({ error: error })

                    const response = {
                        length: result.length,
                        pedidos: result.map( prod => {
                            return {
                                id_pedidos: prod.id_pedidos,
                                quantity: prod.quantity,
                                products_id_products: prod.products_id_products
                            }
                        })
                    }
                    return res.status(200).send({result: response })
                    conn.release();
            }
        )

    })
})
// criar um produto
router.post('/',(req,res)=>{
  

    mysql.getConnection((error,conn) => {

        if(error) return res.status(500).send({ error: error })

        conn.query(
            "insert into pedidos (products_id_products,quantity) values (?,?)",
            [req.body.products_id_products,req.body.quantity],

            (error,result,field) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: error,
                        response: 'res laksj'
                    })
                }
                const response = {
                    menssage: 'Pedido solicitado com sucesso',
                    productCreate:{
                        id_pedido: result.id_pedidos,
                        id_products: req.body.products_id_products,
                        quantity: req.body.quantity
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


router.patch('/',(req,res,next)=>{
    res.status(201).send({
        menssage: "usando Pacht dentro da rota de pedidos"
    })
})

router.delete('/',(req,res,next)=>{
    res.status(201).send({
        menssage: "Deleted success"
    })
})

router.put('/',(req,res,next)=>{
    res.status(201).send({
        menssage: "Atualizado usando o put"
    })
})

// retorna os dados de um unico produto
router.get('/:id_product',(req,res,next)=>{

    // pegar o parametro id da req
    const id = req.params.id_product


    if(id == 'ok'){
        res.status(200).send({
            menssage: "Detalhe dos pedidos",
            id: id

        })
    }
   
})

module.exports = router