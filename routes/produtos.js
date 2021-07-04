const express = require('express')
const router = express.Router()

// retorna todos os produtos
router.get('/',(req,res,next)=>{
    res.status(200).send({
        menssage: "usando get dentro da rota de produtos"
    })
})
// criar um produto
router.post('/',(req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).send({
        menssage: "usando post dentro da rota de produtos",
        create: product
    })
})

router.patch('/',(req,res,next)=>{
    res.status(201).send({
        menssage: "usando Pacht dentro da rota de produtos"
    })
})

router.delete('/',(req,res,next)=>{
    res.status(201).send({
        menssage: "usando Delete dentro da rota de produtos"
    })
})

router.put('/',(req,res,next)=>{
    res.status(201).send({
        menssage: "usando post dentro da rota de produtos"
    })
})

// retorna os dados de um unico produto
router.get('/:id_product',(req,res,next)=>{

    // pegar o parametro id da req
    const id = req.params.id_product


    if(id == 'ok'){
        res.status(200).send({
            menssage: "alskfjalskjklasjdfalksdjlkj",
            id: id

        })
    }else{
        res.status(200).send({
            menssage: "voce passou um id"
        })
    }
   
})

module.exports = router