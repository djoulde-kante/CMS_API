// Routes de l'utilisateur
const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Routes publiques (si besoin)
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users/sign-up:
 *   post:
 *     tags: [Users]
 *     summary: Crée un nouvel utilisateur (inscription)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/sign-up', UserController.signUp);

// Routes protégées
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Récupère tous les utilisateurs (nécessite authentification)
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', authMiddleware, UserController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Récupère un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', authMiddleware, UserController.getUserById);

/**
 * @swagger
 * /api/users/edit/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Met à jour un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put('/edit/:id', authMiddleware, UserController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Supprime un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', authMiddleware, UserController.deleteUser);

/**
 * @swagger
 * /api/users/{id}/role:
 *   patch:
 *     tags: [Users]
 *     summary: Change le rôle d'un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, editor, admin]
 *     responses:
 *       200:
 *         description: Rôle mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 */
router.patch('/:id/role', authMiddleware, UserController.changeUserRole);

module.exports = router;