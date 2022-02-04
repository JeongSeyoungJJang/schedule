const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const dotenv = require("dotenv");
const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
appEnv.isLocal ? dotenv.config({path: "./envs/dev.env"}) : dotenv.config({path: "./envs/prd.env"});

app.use(express.json());
const lineRouter = require("./routes/line.router");
const scheduleRouter = require("./routes/schedule.router")
app.use("/line", lineRouter);
app.use("/schedule", scheduleRouter);

app.listen(PORT, () => {
    console.log(`PORT : ${PORT}`);
})