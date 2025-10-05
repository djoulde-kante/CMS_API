const bcrypt = require('bcrypt');
const User = require('../models/User');
const LogService = require('../services/logService');

function sanitizeUser(userInstance) {
  if (!userInstance) return null;
  const user = userInstance.toJSON ? userInstance.toJSON() : { ...userInstance };
  if (user.password) delete user.password;
  return user;
}

class UserController {
 static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({ attributes: { exclude: ['password'] } });
      return res.status(200).json(users);
    } catch (err) {
      console.error('Erreur getAllUsers:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
      if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
      return res.status(200).json(user);
    } catch (err) {
      console.error('Erreur getUserById:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      // Autorisation: l'utilisateur peut se mettre à jour ou un admin
      if (parseInt(id, 10) !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      const { firstName, lastName, email, password, role } = req.body;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

      const updates = {};
      if (firstName) updates.firstName = firstName;
      if (lastName) updates.lastName = lastName;
      if (email) updates.email = email;
      if (role && req.user.role === 'admin') updates.role = role; // seul admin peut changer role
      if (password) updates.password = await bcrypt.hash(password, 10);

      await user.update(updates);

      // Création du log d'activité
      await LogService.createLog(req.user.id, 'Update User');
      
      return res.status(200).json({ message: 'Utilisateur mis à jour', user: sanitizeUser(user) });
    } catch (err) {
      console.error('Erreur updateUser:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      // Autorisation: seul admin ou l'utilisateur lui-même
      if (parseInt(id, 10) !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

      await user.destroy();

      // Création du log d'activité
      await LogService.createLog(req.user.id, 'Delete User');

      return res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (err) {
      console.error('Erreur deleteUser:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  // Changer le rôle d'un utilisateur (admin uniquement)
  static async changeUserRole(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      // Vérifier rôle demandé
      const allowedRoles = ['admin', 'editor', 'viewer'];
      if (!role || !allowedRoles.includes(role)) {
        return res.status(400).json({ message: 'Rôle invalide ou manquant' });
      }

      // Seul admin peut changer les rôles
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé : admin uniquement' });
      }

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

      await user.update({ role });

      // Création du log d'activité
      await LogService.createLog(req.user.id, 'Change User Role');

      return res.status(200).json({ message: 'Rôle mis à jour', user: sanitizeUser(user) });
    } catch (err) {
      console.error('Erreur changeUserRole:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }
}

module.exports = UserController;
