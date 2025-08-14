# Gestion Tâches (API)

📄 [Lire la documentation complète](./DOCUMENTATION.md)

## Installation locale

1. Cloner le repo ou copier les fichiers.
2. `cd gestion-taches`
3. `npm install`
4. Copier `.env.example` en `.env` et remplir `MONGO_URI`, `JWT_SECRET`, etc.
5. Lancer en dev :

L'API écoute sur `http://localhost:5000` (si PORT=5000).

## Endpoints principaux

- `POST /api/auth/signup` - body: { nom, email, motdepasse }
- `POST /api/auth/login` - body: { email, motdepasse } -> renvoie token
- `GET /api/tasks` - liste paginée/filter (requiert header Authorization)
- `POST /api/tasks` - créer tâche (requiert token)
- `PUT /api/tasks/:id` - modifier
- `DELETE /api/tasks/:id` - supprimer
- `GET /api/users` - lister les utilisateurs (requiert token)

## Déploiement (bref)
1. Créer cluster MongoDB Atlas et récupérer `MONGO_URI`.
2. Push sur GitHub.
3. Créer un service Web sur Render :
   - Build: `npm install`
   - Start: `npm start`
   - Add Environment variables (MONGO_URI, JWT_SECRET, PORT, CORS_ORIGIN)
4. Déployer et tester l'URL fournie par Render.

> Note : pour les images/fichiers en prod, évite stockage local ; utiliser S3/Cloudinary.
