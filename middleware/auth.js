const jwt = require('jsonwebtoken');

// Middleware simple pour vérifier le token JWT et attacher req.user
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token manquant ou mal formaté' });
    }

    const token = authHeader.split(' ')[1];
    if (!process.env.JWT_SECRET && !process.env.SECRET_KEY) {
      console.error('Aucun secret JWT défini (JWT_SECRET ou SECRET_KEY)');
      return res.status(500).json({ message: 'Configuration du serveur manquante' });
    }

    const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;
    const payload = jwt.verify(token, secret);
    // Attacher les informations utilisateur décodées à req.user
    req.user = payload;
    next();
  } catch (err) {
    console.error('Erreur middleware auth:', err.message || err);
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};
