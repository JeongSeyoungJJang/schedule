const axios = require("axios")
const {v4: uuidV4} = require("uuid");
exports.saveSchedule = async(data) => {
    try {
        const config = {
            method: "POST",
            url: `${process.env["CAP.API.SCHEDULE.URL"]}/schedule/Schedule`,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                ID: uuidV4(),
                email: data.email,
                title: data.title,
                descr: data.descr,
                date: new Date(`${data.date}T${data.time}:00`).toJSON() //! UTC로 저장됨
            })
        }
        const response = await axios(config);
        if(!response || response instanceof Error) return {success:false, message:response.message}
        return {success: true, value: data}
    } catch (error) {
        return {success: false, message: error.message}
    }
}