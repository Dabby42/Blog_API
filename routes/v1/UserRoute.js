const express = require('express');
const routes = express.Router();
const UserController = require('./../../controllers/v1/UserController');
const AuthMiddeware = require('../../middleware/VerifyTokenMiddleware');

const user = new UserController();
const verify = new AuthMiddeware();;

const {getUsers, deleteUser} = user;
const { verifyToken } = verify;

routes.get('/', verifyToken, getUsers);
routes.delete('/:id', verifyToken, deleteUser);

module.exports = routes;
