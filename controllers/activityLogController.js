const ActivityLog = require('../models/ActivityLog');

class ActivityLogController {
    // Récupérer tous les journaux d'activité (admin uniquement)
    static async getAllLogs(req, res) {
        try {
            const logs = await ActivityLog.findAll();
            res.status(200).json({ message: 'Journaux d\'activité récupérés avec succès', logs });
        }
        catch (error) {
            console.error('Erreur lors de la récupération des journaux d\'activité :', error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }

    // Récupérer les journaux d'activité d'un utilisateur spécifique (admin uniquement)
    static async getLogsByUser(req, res) {
        try {
            const { userId } = req.params;
            const logs = await ActivityLog.findAll({ where: { userId } });
            res.status(200).json({ message: 'Journaux d\'activité de l\'utilisateur récupérés avec succès', logs });
        }
        catch (error) {
            console.error('Erreur lors de la récupération des journaux d\'activité de l\'utilisateur :', error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }
}

module.exports = ActivityLogController;