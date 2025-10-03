const { Router } = require('express');

const PostController = require('../controllers/postController');

router.post('/', PostController.createPost);
router.delete('/:id', PostController.deletePost);


module.exports = router;