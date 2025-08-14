// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

// Toutes ces routes nécessitent d'être authentifié (token)
router.get('/', auth, userCtrl.listUsers);
router.get('/:id', auth, userCtrl.getUserById);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
