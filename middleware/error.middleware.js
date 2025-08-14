// middleware/error.middleware.js

module.exports = function (err, req, res, next) {
  console.error('Erreur attrapée :', err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Erreur serveur'
  });
};
