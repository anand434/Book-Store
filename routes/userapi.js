const express = require('express');
const routerUser = express.Router();
const dboperation = require('../db/dboperation');

routerUser.route('/').get((req, res) => {
    dboperation.getUsers()
    .then((data) => {
        res.json(data[0]);
    });
});

routerUser.route('/:id').get((req, res) => {
    dboperation.getUser(req.params.id)
    .then((data) => {
        res.json(data[0]);
    });
});

routerUser.route('/').post((req, res) => {
    let user = {...req.body};
    dboperation.addUser(user)
    .then((data) => {
        res.status(201).json(data);
    });
})

module.exports = routerUser;