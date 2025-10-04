// Routes de l'utilisateur
const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Routes publiques (si besoin)
router.post('/sign-up', UserController.signUp);

// Routes protégées
router.get('/', authMiddleware, UserController.getAllUsers);
router.get('/:id', authMiddleware, UserController.getUserById);
router.put('/edit/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);
router.patch('/:id/role', authMiddleware, UserController.changeUserRole);

module.exports = router;