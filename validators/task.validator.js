// validators/task.validator.js
// Schémas Joi pour créer / mettre à jour une tâche

const Joi = require('joi');

// Schéma création (titre requis)
const createTaskSchema = Joi.object({
  titre: Joi.string().min(2).max(200).required(),
  description: Joi.string().allow('').max(2000),
  priorite: Joi.string().valid('Haute', 'Moyenne', 'Basse'),
  statut: Joi.string().valid('En cours', 'Terminée'),
  assignee: Joi.string().hex().length(24).allow(null), // ObjectId ou null
  dateEcheance: Joi.date().iso().allow(null)
});

// Schéma update : au moins 1 champ
const updateTaskSchema = Joi.object({
  titre: Joi.string().min(2).max(200),
  description: Joi.string().allow('').max(2000),
  priorite: Joi.string().valid('Haute', 'Moyenne', 'Basse'),
  statut: Joi.string().valid('En cours', 'Terminée'),
  assignee: Joi.string().hex().length(24).allow(null),
  dateEcheance: Joi.date().iso().allow(null)
}).min(1);

module.exports = { createTaskSchema, updateTaskSchema };
