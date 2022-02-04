const router = require("express").Router();
const lineController = require("../controllers/line.controller");

router.post("/message", lineController.sendMessage)

module.exports = router