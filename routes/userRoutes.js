// Routes de l'utilisateur
const { Router } = require('express');
const PostController = require('../controllers/userController');

const router = Router();

// Exemple de route pour obtenir le profil utilisateur
router.get('/', (req, res) => {
  // Logique pour obtenir le profil utilisateur ici
  res.send('Liste des utilisateurs');
});
router.get('/:id', (req, res) => {
    // Logique pour obtenir un utilisateur par ID ici
    res.send(`Détails de l'utilisateur avec l'ID ${req.params.id}`);
});
router.put('/edit/:id', (req, res) => {
    // Logique pour mettre à jour un utilisateur par ID ici
    res.send(`Mise à jour de l'utilisateur avec l'ID ${req.params.id}`);
});
// route pour supprimer un utilisateur par ID
router.delete('/:id', PostController.deletePost);


module.exports = router;