const Post = require('../models/Post');

class PostController {
    // methode pour recuperer tous les posts
    async getAllPosts(req, res)  {
        try {
            const posts = await Post.findAll();
            res.status(200).json(posts); 
        }
        catch (error) {
            console.error('Erreur lors de la récupération des posts :', error);
            res.status(500).json({ message: 'Erreur serveur' });
        };
    }
    // methode pour recuperer un post par son id
        async getPostById(req, res) {
        try {
            const post = await Post.findByPk(id);
            if (!post) {
                return res.status(404).json({ message: 'Post introuvable' });
            }
        const { id } = req.params;}
        catch (error) {
            console.error('Erreur lors de la récupération du post :', error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }
    // ajout de la methode de suppression d'un post 
         async deletePost(req,res){

        // on recupere l'id du post a supprimer
        const {id} = req.params;
        try {
            // on cherche le post par son id
            const post = await Post.findByPk(id);   
            if (!post) {
                return res.status(404).json({ message: 'Post introuvable' });
            }
            if (post.userId !== req.user.id) {
                return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce post' });
            }
            
            // on supprime le post en base de donneees
            await post.destroy();
            res.status(200).json({ message: 'Post supprimer avec succes' });
        }   catch (error) { 
            console.error('Error de suppression du  post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }       
    }
}
module.exports = PostController;
