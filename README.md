# Gestion Tâches (API)

Application Node.js avec MongoDB Atlas pour la gestion des tâches d'une équipe.

📄 [Lire la documentation complète](./DOCUMENTATION.md)

## 🌐 Démo en ligne
[Accéder à l'application sur Render](https://gestion-tache-api.onrender.com)

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


## 📦 Exemples de requêtes avec Postman

### Inscription
**Méthode :** POST  
**URL :** http://localhost:5000/api/auth/signup  
**Headers :**  
  - Content-Type: application/json  
**Body (raw, JSON) :**
```json
{
  "nom": "Jean",
  "email": "jean@example.com",
  "motdepasse": "monmotdepasse"
}
```

### Connexion
**Méthode :** POST  
**URL :** http://localhost:5000/api/auth/login  
**Headers :**  
  - Content-Type: application/json  
**Body (raw, JSON) :**
```json
{
  "email": "jean@example.com",
  "motdepasse": "monmotdepasse"
}
```

### Lister les tâches (avec token)
**Méthode :** GET  
**URL :** http://localhost:5000/api/tasks  
**Headers :**  
  - Authorization: Bearer VOTRE_TOKEN

### Créer une tâche (avec token)
**Méthode :** POST  
**URL :** http://localhost:5000/api/tasks  
**Headers :**  
  - Authorization: Bearer VOTRE_TOKEN  
  - Content-Type: application/json  
**Body (raw, JSON) :**
```json
{
  "titre": "Ma tâche",
  "description": "Description de la tâche"
}
```

### Modifier une tâche (avec token)
**Méthode :** PUT  
**URL :** http://localhost:5000/api/tasks/ID_TACHE  
**Headers :**  
  - Authorization: Bearer VOTRE_TOKEN  
  - Content-Type: application/json  
**Body (raw, JSON) :**
```json
{
  "titre": "Nouveau titre"
}
```

### Supprimer une tâche (avec token)
**Méthode :** DELETE  
**URL :** http://localhost:5000/api/tasks/ID_TACHE  
**Headers :**  
  - Authorization: Bearer VOTRE_TOKEN

### Lister les utilisateurs (avec token)
**Méthode :** GET  
**URL :** http://localhost:5000/api/users  
**Headers :**  
  - Authorization: Bearer VOTRE_TOKEN

## Déploiement (bref)
1. Créer cluster MongoDB Atlas et récupérer `MONGO_URI`.
2. Push sur GitHub.
3. Créer un service Web sur Render :
   - Build: `npm install`
   - Start: `npm start`
   - Add Environment variables (MONGO_URI, JWT_SECRET, PORT, CORS_ORIGIN)
4. Déployer et tester l'URL fournie par Render.