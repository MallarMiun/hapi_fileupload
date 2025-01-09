const userController = require('../controllers/user.controller');

module.exports = (server) => {
    server.route({
        method: 'GET',
        path: '/users',
        handler: userController.getAllUsers,
    });

    server.route({
        method: 'GET',
        path: '/users/{id}',
        handler: userController.getUserById
    });

    server.route({
        method: 'POST',
        path: '/users',
        handler: userController.createUser,
    });

    server.route({
        method: 'PUT',
        path: '/users/{id}',
        handler: userController.updateUser
    });

    server.route({
        method: 'DELETE',
        path: '/users/{id}',
        handler: userController.deleteUser
    });
};