// Middleware pour restreindre l'accès selon les rôles
module.exports = function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    next();
  };
};
