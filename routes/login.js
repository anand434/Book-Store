const express = require('express');
const loginRouter = express.Router();
var dbopr = require('../db/dboperation');
const jwt = require('jsonwebtoken');
require('dotenv').config()

loginRouter.route('/').post((req, res)=>{
    let username = req.body.UserName;
    let passowrd = req.body.Password;
    let id = dbopr.getUser(username, passowrd)
            .then((data)=>{
                return data[0];
            });  
    console.log(id);  
    jwt.sign({id}, process.env.SECRET_KEY, (err, token) => {
        if(err) console.log(err);
        res.json(token);
    });
});

module.exports = loginRouter