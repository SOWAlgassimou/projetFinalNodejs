// models/User.js
// Schéma Mongoose pour les utilisateurs

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,   // Email unique
    lowercase: true,
    trim: true
  },
  motdepasse: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['membre', 'admin'],
    default: 'membre'
  }
}, { timestamps: true });

// Export du modèle : 'User' -> collection 'users'
module.exports = mongoose.model('User', userSchema);
