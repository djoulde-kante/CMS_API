// Imports
const express = require('express');
require('dotenv').config();
const db = require('./config/config');

// Import des routes
const authRoutes = require('./routes/authRoutes');

// Import des modèles (pour s'assurer qu'ils sont enregistrés)
require('./models/User');

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour parser le JSON
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

// Routes
app.use('/api/auth', authRoutes);

// Fonction pour démarrer le serveur
const startServer = async () => {
    try {


        // Connection à la base de données
        await db.authenticate();
        console.log('Connexion à la base de données réussie.');

        // Synchronisation des modèles avec la base de données
        await db.sync();
        await db.sync({ alter: true });
        console.log('Modèles synchronisés avec la base de données.');


        app.listen(PORT, () => {
            console.log(`Serveur démarré sur l'addresse  http://localhost:${PORT}`);
        }
        );
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
        process.exit(1);
    }
};

startServer();



