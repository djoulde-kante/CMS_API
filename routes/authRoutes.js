// Routes d'authentification
const { Router } = require('express');
const AuthController = require('../controllers/authController');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentification
 */

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     tags: [Auth]
 *     summary: Créer un nouvel utilisateur
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
router.post('/sign-up', AuthController.signUp);

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     tags: [Auth]
 *     summary: Authentifier un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentification réussie
 */
router.post('/sign-in', AuthController.signIn);

/**
 * @swagger
 * /api/auth/sign-out:
 *   post:
 *     tags: [Auth]
 *     summary: Déconnecter un utilisateur (invalider token / cookie)
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.post('/sign-out', AuthController.signOut);

module.exports = router;