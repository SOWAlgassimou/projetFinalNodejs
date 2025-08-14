📄 Documentation Technique – Application de Gestion des Tâches d'une Équipe
📌 1. Introduction

Cette application est une API REST permettant à une équipe de gérer efficacement ses tâches.
Elle inclut :

Création, modification, suppression et consultation des tâches

Validation des données avec Joi

Connexion à MongoDB Atlas

Déploiement sur Render

Structure modulaire et extensible

📂 2. Structure du Projet
gestion-taches/
│
├── README.md              # Résumé rapide
├── DOCUMENTATION.md       # Documentation détaillée
├── package.json           # Dépendances et scripts
├── .env.example           # Variables d'environnement exemple
│
├── src/
│   ├── server.js          # Point d'entrée
│   ├── config/
│   │    └── db.js         # Connexion MongoDB Atlas
│   ├── routes/
│   │    └── task.routes.js# Routes des tâches
│   ├── controllers/
│   │    └── task.controller.js
│   ├── models/
│   │    └── Task.js       # Schéma Mongoose
│   ├── middlewares/
│   │    └── errorHandler.js
│   ├── validations/
│   │    └── task.validation.js
│   └── utils/
│        └── logger.js     # Logger d'événements

⚙️ 3. Technologies utilisées
Technologie	Utilisation
Node.js	Environnement d’exécution JavaScript
Express.js	Framework pour créer l’API REST
MongoDB Atlas	Base de données NoSQL hébergée
Mongoose	ODM pour interagir avec MongoDB
Joi	Validation des données
dotenv	Gestion des variables d’environnement
Render	Déploiement de l’API
📦 4. Installation et configuration
4.1. Cloner le projet
git clone https://github.com/toncompte/gestion-taches.git
cd gestion-taches

4.2. Installer les dépendances
npm install

4.3. Variables d'environnement

Créer un fichier .env à la racine :

PORT=5000
MONGO_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/gestion-taches"

🗄️ 5. Modèle de données

Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  statut: { type: String, enum: ['en cours', 'terminée', 'en attente'], default: 'en attente' },
  dateEcheance: { type: Date },
  assignee: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

🛡️ 6. Validation des données avec Joi

task.validation.js

const Joi = require('joi');

exports.createTaskSchema = Joi.object({
  titre: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  statut: Joi.string().valid('en cours', 'terminée', 'en attente'),
  dateEcheance: Joi.date().optional(),
  assignee: Joi.string().optional()
});

🔄 7. Routes de l’API
Méthode	Endpoint	Description
POST	/api/tasks	Créer une nouvelle tâche
GET	/api/tasks	Lister toutes les tâches
GET	/api/tasks/:id	Obtenir une tâche par ID
PUT	/api/tasks/:id	Modifier une tâche
DELETE	/api/tasks/:id	Supprimer une tâche
🖥️ 8. Exemple de contrôleur

task.controller.js

const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

🚀 9. Déploiement sur Render + MongoDB Atlas
9.1. Créer la base de données MongoDB Atlas

Aller sur MongoDB Atlas

Créer un Cluster

Ajouter un utilisateur avec nom + mot de passe

Autoriser l’IP 0.0.0.0/0

Copier l’URI de connexion et le mettre dans .env

9.2. Déployer sur Render

Créer un compte sur Render

Créer un New Web Service

Connecter le dépôt GitHub

Définir les variables d’environnement (MONGO_URI, PORT)

Build Command : npm install

Start Command : node src/server.js

🧪 10. Tests avec Postman

Exemple – Création d’une tâche

POST /api/tasks
{
  "titre": "Préparer la réunion",
  "description": "Réunion d'équipe à 10h",
  "statut": "en attente",
  "dateEcheance": "2025-08-20",
  "assignee": "Marlyatou"
}

📜 11. Gestion des erreurs

errorHandler.js

module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
};

📈 12. Améliorations possibles

Authentification JWT pour gérer les utilisateurs

Pagination des tâches

Filtres par statut ou assignee

Interface front-end (React.js)