// Controller d'authentification
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const LogService = require('../services/logService');

class AuthController {
    // Inscription
    static async signUp(req, res) {
        const { firstName, lastName, email, password } = req.body;
        try {
            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Utilisateur déjà existant' });
            }

            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créer un nouvel utilisateur
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: 'viewer'
            });

            // Création du log d'activité (utilisateur créé)
            await LogService.createLog(newUser.id, 'User SignUp');

            res.status(201).json({ message: 'Inscription réussie', user: newUser });
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }

    // Connexion
    static async signIn(req, res) {
        const { email, password } = req.body;
        try {
            // Trouver l'utilisateur par email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Email incorrect' });
            }

            // Vérifier le mot de passe
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Mot de passe incorrect' });
            }

            // Générer un token JWT
            if (!process.env.SECRET_KEY) {
                return res.status(500).json({ message: 'Clé secrète non définie dans les variables d\'environnement' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.SECRET_KEY,
                { expiresIn: process.env.SECRET_KEY_EXPIRES_IN || '24h' }
            );

            // Création du log d'activité (connexion réussie)
            await LogService.createLog(user.id, 'User SignIn');

            res.status(200).json({ message: 'Connexion réussie', token });
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }

    // Déconnexion
    static async signOut(req, res) {
        // La déconnexion côté serveur est généralement gérée côté client en supprimant le token
        res.status(200).json({ message: 'Déconnexion réussie' });
    }
}

module.exports = AuthController;