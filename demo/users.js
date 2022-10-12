const express = require('express');
const router = express.Router();

let users = [
    {
      id: 1,
      name: 'Luis',
      email: 'luis@gmail.com',
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Enrique',
      email: 'enrique@gmail.com',
      status: 'INACTIVE'
    },
    {
      id: 3,
      name: 'Maria',
      email: 'maria@gmail.com',
      status: 'ACTIVE'
    }
  ];
  
  
/**
 * GET: /users
 * Obtiene la lista de usuarios
 */
router.get('/', (req, res) => {
    res.status(200).send(users);
});

/**
 * GET: /users/:1
 * Obtiene un usuario específico
 */
router.get('/:id', (req, res) => {
    // Se busca el recurso/usuario
    const id = parseInt(req.params.id)
    const user = users.find((userItem) => userItem.id === id);

    if (user) {
        // Si existe, se envía el recurso/usuario
        res.status(200).send(user);
    } else {
        // Si no existe, se envía un mensaje de error
        res.status(404).send({ message: 'Usuario no encontrado' });
    }
});

/**
 * POST: /users
 * Crea un nuevo usuario
 */
router.post('/', (req, res) => {
    // Se valida el token de autorización
    if (req.headers.authorization !== '1234') {
        res.status(401).send({message: 'Usuario no autorizado'});
    }

    // Se validan los datos enviados por el cliente
    if (!req.body.name) {
        res.status(400).send({message: 'El nombre es obligatorio'});
    }
    if (!req.body.email) {
        res.status(400).send({message: 'El email es obligatorio'});
    }
    if (!req.body.status) {
        res.status(400).send({message: 'El status es obligatorio'});
    }

    // Se crea el nuevo recurso/usuario
    const id = users[users.length-1].id + 1;
    const newUser = {
        id,
        name: req.body.name,
        email: req.body.email,
        status: req.body.status
    }

    users.push(newUser);

    // Se envía el recurso/usuario
    res.status(201).send(newUser);
});

/**
 * PUT: /users
 * Actualiza un nuevo usuario
 */
 router.put('/:id', (req, res) => {
    // Se valida el token de autorización
    if (req.headers.authorization !== '1234') {
        res.status(401).send({message: 'Usuario no autorizado'});
    }

    // Se validan los datos enviados por el cliente
    if (!req.body.name) {
        res.status(401).send({message: 'El nombre es obligatorio'});
    }
    if (!req.body.email) {
        res.status(401).send({message: 'El email es obligatorio'});
    }
    if (!req.body.status) {
        res.status(401).send({message: 'El status es obligatorio'});
    }

    // Se busca el recurso/usuario
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(userItem => userItem.id === id);

    if (userIndex !== -1) {
        // Si existe, se actualiza el recurso/usuario
        const updateUser = {
            id,
            name: req.body.name,
            email: req.body.email,
            status: req.body.status
        }

        users = [
            ...users.slice(0, userIndex),
            updateUser,
            ...users.slice(userIndex+1)
        ]

        res.status(200).send(updateUser);
    } else {
        // Si no existe, se envía un mensaje de error
        res.status(404).send({ message: 'Usuario no encontrado' });
    }

});

/**
 * DELETE: /users/:id
 * Elimina un usuario
 */
router.delete('/:id', (req, res) => {
    // Se valida el token de autorización
    if (req.headers.authorization !== '1234') {
        res.status(401).send({message: 'Usuario no autorizado'});
    }

    // Se busca el recurso/usuario
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(userItem => userItem.id === id);
    
    if (userIndex !== -1) {
        // Si existe, se elimina el recurso/usuario
        const deleteUser = users[userIndex];
        users = [
            ...users.slice(0, userIndex),
            ...users.slice(userIndex+1)
        ]
        // res.status(200).send(deleteUser);
        res.status(204).send(deleteUser);
    } else {
        // Si no existe, se envía un mensaje de error
        res.status(404).send({ message: 'Usuario no encontrado' });
    }

});

module.exports = router;
