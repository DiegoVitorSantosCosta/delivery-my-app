const express = require('express')
const router = express.Router()

// retorna todos os produtos
router.get('/',(req,res,next)=>{
    res.status(200).send({
        menssage: "usando get dentro da rota de pedidos"
    })
})
// criar um produto
router.post('/',(req,res,next)=>{
    const request = {
        id: req.body.id,
        quantity: req.body.quantity
    }
    res.status(201).send({
        menssage: "Pedido criado",
        pedidoCriado: request
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