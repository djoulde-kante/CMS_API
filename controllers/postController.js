
const Post = require('../models/Post');

class PostController {

    // Modifier un post
    static async update(req, res) {

        // Récupérer l'ID du post à modifier depuis les paramètres de l'URL
        const postId = req.params.id;

        // Récupérer les données du post depuis le corps de la requête
        const { title, description, image, authorId, tags, category } = req.body;

        // Vérifier si le post existe et le met à jour
        try {
            const post = await Post.findByIdAndUpdate(postId, {
                title,
                description,
                image,
                authorId,
                tags,
                category
            }, { new: true });

            if (!post) {
                return res.status(404).json({ message: 'Post non trouvé' });
            }

            res.status(200).json(post);
            console.log('Post modifié avec succès:', post);
        } catch (error) {
            console.error('Erreur de modification:', error);
            res.status(500).json({ message: 'Erreur du serveur' });
        }
    }
}

module.exports = PostController;