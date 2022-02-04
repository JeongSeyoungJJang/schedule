const lineService = require("../services/line.service");

exports.sendMessage = async(req, res) => {
    try {
        const messageText = req.body.message;
        if(!messageText) return res.status(500).send("메세지 내용이 없습니다.");
        const response = await lineService.sendMessage(messageText);
        if(!response.success || response instanceof Error) return res.status(500).send(response.message);
        return res.send(response);
    } catch (error) {
        console.log(error.message);
        return new Error(error.message);
    }
}