const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const dotenv = require("dotenv");
const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
appEnv.isLocal ? dotenv.config({path: "./envs/dev.env"}) : dotenv.config({path: "./envs/prd.env"});

app.use(express.json({}));
app.use(express.urlencoded({extended: true}))
const scheduleController = require("./controllers/schedule.controller");

app.listen(PORT, () => {
    scheduleController.config();
    console.log(`Schedule Server is running on ${PORT}`);
})