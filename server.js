// server.js
// Point d'entrée de l'application

require('dotenv').config();            // charge .env
const express = require('express');
const helmet = require('helmet');      // sécurité headers
const cors = require('cors');          // gestion CORS
const morgan = require('morgan');      // logs HTTP

const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/error.middleware');

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Middlewares globaux
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' })); // limiter en prod
app.use(morgan('dev'));
app.use(express.json()); // parse application/json

// Routes principales (préfixées)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// 404 si route non trouvée
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} introuvable` });
});

// Middleware gestion d'erreurs centralisé
app.use(errorHandler);

// Connexion DB puis démarrage du serveur
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  });
});
