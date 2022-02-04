const router = require("express").Router();
const scheduleController = require("../controllers/schedule.controller");

router.post("/", scheduleController.saveSchedule)
module.exports = router;