const axios = require("axios");
const qs = require("node:querystring");
exports.sendMessage = async(messageText) => {
    try {
        const temporary = [];
        if(!Array.isArray(messageText) && typeof messageText === 'object') temporary.push(messageText)
        const messageContents = messageText.reduce((acc, cur, idx)=> {
            if (idx === 0) acc += `\n==============`;
            acc += `\n제목: ${cur.title}\n설명: ${cur.descr}\n시간: ${new Date(cur.date).toLocaleTimeString()}\n==============`
            return acc;
        }, "")
        const config = {
            method: "POST",
            url: process.env["LINE.API.NOTIFY.URL"],
            headers: {
                Authorization:  `Bearer ${process.env['LINE.BOT']}`
            },
            data: qs.stringify({message: `오늘의 일정 ${messageText.length}건${messageContents}`})
        }
        const {data: response} = await axios(config);
        if(response.status !== 200 || response.message !=='ok') console.log(response);
        return {
            success: true, 
            message: "메세지를 발송하였습니다."
        };
    } catch (error) {
        console.log(error.message);
        return new Error(error.message)
    }
}