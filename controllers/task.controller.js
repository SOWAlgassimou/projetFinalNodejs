// controllers/task.controller.js
const Task = require('../models/Task');
const { createTaskSchema, updateTaskSchema } = require('../validators/task.validator');
const mongoose = require('mongoose');

/**
 * Créer une tâche
 * POST /api/tasks
 */
exports.createTask = async (req, res, next) => {
  try {
    // Validation Joi
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details.map(d => d.message).join(' | ') });

    // On peut associer le créateur si on le souhaite : req.user.id
    const task = new Task(value);
    await task.save();

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

/**
 * Lister les tâches avec pagination et filtres
 * GET /api/tasks?page=1&limit=10&priorite=Haute&statut=En%20cours&assignee=ID
 */
exports.getTasks = async (req, res, next) => {
  try {
    // Paramètres de query
    let { page = 1, limit = 10, priorite, statut, assignee, sortBy = 'createdAt', order = 'desc' } = req.query;
    page = parseInt(page);
    limit = Math.min(parseInt(limit), 100); // safeguard
    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    // Construction du filtre dynamique
    const filter = {};
    if (priorite) filter.priorite = priorite;
    if (statut) filter.statut = statut;
    if (assignee && mongoose.Types.ObjectId.isValid(assignee)) filter.assignee = assignee;

    // Exécution des requêtes en parallèle
    const [items, total] = await Promise.all([
      Task.find(filter)
        .populate('assignee', 'nom email')      // remplace assignee par document user minimal
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit),
      Task.countDocuments(filter)
    ]);

    res.json({
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      data: items
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Récupérer une tâche par id
 */
exports.getTaskById = async (req, res, next) => {
  try {
    const t = await Task.findById(req.params.id).populate('assignee', 'nom email');
    if (!t) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(t);
  } catch (err) {
    next(err);
  }
};

/**
 * Mettre à jour une tâche
 * PUT /api/tasks/:id
 */
exports.updateTask = async (req, res, next) => {
  try {
    // Validation Joi (au moins 1 champ)
    const { error, value } = updateTaskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details.map(d => d.message).join(' | ') });

    const updated = await Task.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/**
 * Supprimer une tâche
 */
exports.deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    next(err);
  }
};
