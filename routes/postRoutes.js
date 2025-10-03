const { Router } = require('express');

const PostController = require('../controllers/postController');

router.post('/', PostController.createPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;