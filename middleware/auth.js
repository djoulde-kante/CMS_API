const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware qui vérifie le JWT et attache l'instance Sequelize User à req.user
module.exports = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!process.env.JWT_SECRET && !process.env.SECRET_KEY) {
        console.error('Aucun secret JWT défini (JWT_SECRET ou SECRET_KEY)');
        return res.status(500).json({ message: 'Configuration du serveur manquante' });
      }

      const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;
      const decoded = jwt.verify(token, secret);

      // Récupérer l'utilisateur en base via l'ID décodé
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Non autorisé, utilisateur introuvable' });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('Erreur middleware auth:', error.message || error);
      return res.status(401).json({ message: 'Non autorisé, jeton invalide' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, pas de jeton' });
  }
};
