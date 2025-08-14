// validators/auth.validator.js
// Contient les schémas Joi pour l'inscription et la connexion

const Joi = require('joi');

// Schéma pour l'inscription
const signupSchema = Joi.object({
  nom: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Le nom doit être une chaîne',
    'string.empty': 'Le nom est requis',
    'string.min': 'Le nom doit faire au moins {#limit} caractères',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email invalide',
    'string.empty': 'Email est requis'
  }),
  motdepasse: Joi.string().min(6).required().messages({
    'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères'
  })
});

// Schéma pour la connexion
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  motdepasse: Joi.string().required()
});

module.exports = { signupSchema, loginSchema };
