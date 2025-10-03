// Routes d'authentification
const { Router } = require('express');
const AuthController = require('../controllers/authController');

const router = Router();

// Routes d'inscription
router.post('/sign-up', AuthController.signUp);
router.post('/sign-in', AuthController.signIn);
router.post('/sign-out', AuthController.signOut);

module.exports = router;