const ActivityLog = require('../models/ActivityLog');

class LogService {
    static async createLog(userId, action, context = {}) {
        if (!userId) throw new Error("UserId requis");

        return ActivityLog.create({
            userId,
            action,
            ...context
        });
    }
}

module.exports = LogService;
