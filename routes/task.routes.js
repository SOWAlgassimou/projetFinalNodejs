// routes/task.routes.js
const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/task.controller');
const auth = require('../middleware/auth.middleware');

// Protection : toutes les routes nécessitent un token
router.post('/', auth, taskCtrl.createTask);
router.get('/', auth, taskCtrl.getTasks);
router.get('/:id', auth, taskCtrl.getTaskById);
router.put('/:id', auth, taskCtrl.updateTask);
router.delete('/:id', auth, taskCtrl.deleteTask);

module.exports = router;
