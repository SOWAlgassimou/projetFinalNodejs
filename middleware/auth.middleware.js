// middleware/auth.middleware.js
// Middleware pour protéger les routes nécessitant une authentification

const jwt = require('jsonwebtoken');

/**
 * authMiddleware - vérifie présence et validité d'un JWT dans Authorization header
 * Header attendu : Authorization: Bearer <token>
 */
module.exports = function (req, res, next) {
  // Récupère le header Authorization
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

  // Support "Bearer token" ou juste token
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    // Vérifie le token et récupère le payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ex: { id: ..., role: ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};
