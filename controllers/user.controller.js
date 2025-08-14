// controllers/user.controller.js
const User = require('../models/User');

/**
 * Lister tous les utilisateurs
 * (dans une app réelle, restreindre cette route aux admins)
 */
exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-motdepasse').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Récupérer un utilisateur par id
exports.getUserById = async (req, res, next) => {
  try {
    const u = await User.findById(req.params.id).select('-motdepasse');
    if (!u) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(u);
  } catch (err) {
    next(err);
  }
};

// Supprimer un utilisateur (attention : en prod, vérifier droits)
exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    next(err);
  }
};
