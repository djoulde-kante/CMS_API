
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

    // Ajouter un post
    async createPost(req, res) {
        try {
            const { title, description, image, tags, category } = req.body;

            // Vérifier que l’utilisateur est connecté (req.user vient du middleware auth)
            if (!req.user) {
                return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter." });
            }

            // Vérifier si l'utilisateur a le rôle admin ou editor
            if (req.user.role !== "admin" && req.user.role !== "editor") {
                return res.status(403).json({ message: "Vous n'êtes pas autorisé à créer un post." });
            }

            // Créer le post avec l’utilisateur connecté comme auteur
            const newPost = await Post.create({
                title,
                description,
                image,
                authorId: req.user.id, // L’auteur est l’utilisateur connecté
                tags,
                category
            });

            res.status(201).json({ message: "Post créé avec succès", post: newPost });

        } catch (error) {
            console.error("Erreur lors de la création du post :", error);
            res.status(500).json({ message: "Erreur serveur interne" });
        }
    }

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
