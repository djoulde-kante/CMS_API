const { Router } = require('express');
const PostController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/authorize');

const router = Router();

// Public
router.get('/', authMiddleware, PostController.getAllPosts);
router.get('/:id', authMiddleware, PostController.getPostById);
// Routes accessibles uniquement aux utilisateurs authentifiés avec les rôles "admin" ou "editor"
router.post('/', requireRole('admin', 'editor'), PostController.createPost);
router.put('/:id', authMiddleware, requireRole('admin', 'editor'), PostController.updatePost);
router.delete('/:id', authMiddleware, requireRole('admin', 'editor'), PostController.deletePost);

module.exports = router;