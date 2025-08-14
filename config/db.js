// config/db.js
// Fichier central pour se connecter à MongoDB via mongoose.

const mongoose = require('mongoose');

/**
 * connectDB: se connecte à la base MongoDB.
 * @param {string} uri - chaîne de connexion MongoDB (depuis .env)
 */
async function connectDB(uri) {
  try {
    // mongoose.connect retourne une promesse ; on attend la connexion
    await mongoose.connect(uri);
    console.log('✅ MongoDB connecté');
  } catch (err) {
    // Si échec de connexion, on affiche et on arrête l'application
    console.error('❌ Erreur de connexion MongoDB :', err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
