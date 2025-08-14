// models/Task.js
// Schéma Mongoose pour les tâches

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  priorite: {
    type: String,
    enum: ['Haute', 'Moyenne', 'Basse'],
    default: 'Moyenne'
  },
  statut: {
    type: String,
    enum: ['En cours', 'Terminée'],
    default: 'En cours'
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // Référence au modèle User
    default: null
  },
  dateEcheance: {
    type: Date,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
