// controllers/auth.controller.js
// Contrôleur pour l'inscription et la connexion

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupSchema, loginSchema } = require('../validators/auth.validator');

// INSCRIPTION
exports.signup = async (req, res, next) => {
  try {
    // 1) Validation des données reçues
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      // Joi fournit details ; on renvoie 400
      return res.status(400).json({ message: error.details.map(d => d.message).join(' | ') });
    }

    const { nom, email, motdepasse } = value;

    // 2) Vérifier si l'email existe déjà
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

    // 3) Hacher le mot de passe (sécurité)
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(motdepasse, salt);

    // 4) Créer l'utilisateur et le sauvegarder
    const user = new User({ nom, email, motdepasse: hashed });
    await user.save();

    // 5) Réponse : 201 Created
    res.status(201).json({ message: 'Utilisateur créé', user: { id: user._id, nom: user.nom, email: user.email } });
  } catch (err) {
    next(err); // passage au middleware d'erreur
  }
};

// CONNEXION
exports.login = async (req, res, next) => {
  try {
    // 1) Validation
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details.map(d => d.message).join(' | ') });

    const { email, motdepasse } = value;

    // 2) Recherche utilisateur
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    // 3) Vérifier mot de passe
    const isValid = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isValid) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    // 4) Générer token JWT (payload minimal)
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || '1d' });

    // 5) Répondre avec token
    res.json({ message: 'Connexion réussie', token });
  } catch (err) {
    next(err);
  }
};
