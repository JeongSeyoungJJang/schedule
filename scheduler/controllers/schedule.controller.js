const nodeSchudule = require("node-schedule");
const scheduleService = require("../services/schedule.service")
exports.config = () => {
    nodeSchudule.scheduleJob("NOTIFY_SCHEDULE", "*/10 * * * * *", scheduleService.notifySchedule);
}


