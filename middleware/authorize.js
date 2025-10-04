// Middleware pour restreindre l'accès selon les rôles
module.exports = function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // if (!req.user) return res.status(401).json({ message: 'Authentification requise' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    next();
  };
};
