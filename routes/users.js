const express = require('express');
const router = express.Router();

const UsersController = require('../controlers/users')
const users = new UsersController;

 router.get('/users',  users.select);
 router.get('/users/name/:text', users.filter);
 router.post('/users', users.insert);
 router.put('/users/:id', users.update);
 router.delete('/users/:id', users.delete);

module.exports = router
