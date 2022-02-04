const got = require("got").default;
const dayjs = require("dayjs");
exports.notifySchedule =async () => {
    try {
        // const params = new URLSearchParams({
        //     "$filter" : `` 
        // })
        const {error, value: myschedules} = await getMySchedule();
        if(error) {
            console.log({success: false, message: error.message});
            return {success: false, message: error.message};
        }
        const notifyResult = await sendNotification(myschedules);
        if(!notifyResult || notifyResult instanceof Error) return notifyResult;
        console.log("메세지 발송 성공")
        return notifyResult;
    } catch (error) {
        console.log(error.message);
        return new Error(error.message);
    }
}


const sendNotification = async(myschedules) => {
    try {
        const response = await got.post(`${process.env["MIDDLEWARE.API.URL"]}/line/message`, {
            responseType: "json",
            json: {
                message: myschedules
            }
        })
        return response.body;
    } catch (error) {
        console.log(error.message);
        return new Error(error.message);
    }

}


const getMySchedule = async() => {
    try {
        const UTC_DATE_FROM = dayjs(new Date().toLocaleDateString()).subtract(1, "day").format('YYYY-MM-DDT15:mm:ss.SSS[Z]');
        const UTC_DATE_TO = dayjs(new Date().toLocaleDateString()).format('YYYY-MM-DDT15:mm:ss.SSS[Z]');
        const filterParam = `date ge ${UTC_DATE_FROM} and date le ${UTC_DATE_TO}`
        const response = await got.get(`${process.env["CAP.API.SCHEDULE.URL"]}/schedule/Schedule?$filter=${filterParam}`,{
            responseType: "json"
        });
        return {success: true, value: response.body.value}
    } catch (error) {
        console.log(error)
        return {success: false, error: error.message}
    }
}