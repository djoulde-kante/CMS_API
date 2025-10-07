const { Router } = require('express');
const PostController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/authorize');

const router = Router();

// Public
/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Gestion des posts
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags: [Posts]
 *     summary: Récupère tous les posts (publique, nécessite authentification dans ce projet)
 *     responses:
 *       200:
 *         description: Liste des posts
 */
router.get('/', authMiddleware, PostController.getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Récupère un post par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du post
 *       404:
 *         description: Post non trouvé
 */
router.get('/:id', authMiddleware, PostController.getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags: [Posts]
 *     summary: Crée un nouveau post (admin, editor)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post créé
 */
// Routes accessibles uniquement aux utilisateurs authentifiés avec les rôles "admin" ou "editor"
router.post('/', authMiddleware, requireRole('admin', 'editor'), PostController.createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: Met à jour un post par son ID (admin, editor)
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post mis à jour
 *       404:
 *         description: Post non trouvé
 */
router.put('/edit/:id', authMiddleware, requireRole('admin', 'editor'), PostController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Supprime un post par son ID (admin, editor)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post supprimé
 *       404:
 *         description: Post non trouvé
 */
router.delete('/delete/:id', authMiddleware, requireRole('admin', 'editor'), PostController.deletePost);

module.exports = router;