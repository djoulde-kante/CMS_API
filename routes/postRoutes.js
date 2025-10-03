const PostController = require('../controllers/userController');

router.delete('/:id', PostController.deletePost);
