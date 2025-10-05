const { Router } = require('express');
const ActivityLogController = require('../controllers/activityLogController');
const authMiddleware = require('../middleware/auth');
const requireRole = require('../middleware/authorize');

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: ActivityLogs
 *     description: Gestion des journaux d'activité
 */

/**
 * @swagger
 * /api/activity-logs:
 *   get:
 *     tags:
 *       - ActivityLogs
 *     summary: Récupère tous les journaux d'activité (admin uniquement)
 *     responses:
 *       '200':
 *         description: Liste des journaux d'activité
 *       '403':
 *         description: Accès refusé
 */
router.get('/', requireRole('admin'), ActivityLogController.getAllLogs);

/**
 * @swagger
 * /api/activity-logs/user/{userId}:
 *   get:
 *     tags:
 *       - ActivityLogs
 *     summary: Récupère les journaux d'activité d'un utilisateur spécifique (admin uniquement)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Journaux d'activité de l'utilisateur
 *       403:
 *         description: Accès refusé
 */
router.get('/user/:userId', requireRole('admin'), ActivityLogController.getLogsByUser);

module.exports = router;