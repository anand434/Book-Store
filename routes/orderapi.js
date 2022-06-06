const express = require('express');
const router = express.Router();
var dbopr = require('../db/dboperation');
const jwt = require('jsonwebtoken');
require('dotenv').config()

router.route('/').get((req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
        if(err){
            res.status(401).json({message: 'access denied'});
        } else {
            dbopr.getOrders()
            .then((data) => {
                res.status(200).json({message: "sucess",data: data[0]});
            });
        }
    })
});

router.route('/:id').get((req, res) =>{ 
    dbopr.getOrder(req.params.id)
    .then((data)=>{
        res.json(data[0]);
    });
});

router.route('/').post((req, res) => {
    let order = {...req.body};
    dbopr.addOrder(order)
    .then((data)=>{
        res.status(201).json(data);
    });
});

module.exports = router