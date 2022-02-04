const scheduleService = require("../services/schedule.service");
const validator = require("../common/validation")
exports.saveSchedule = async(req, res) => {
    try {
        const valid = await validator.validate(req.body);
        if(valid instanceof Error || valid.error) return {success: false, message: valid.message}
        const response = await scheduleService.saveSchedule(req.body);
        if(!response.success || response instanceof Error) return res.send({success: false, meesage: response.message});
        return res.send({success:true, message:"저장되었습니다."})
    } catch (error) {
        return res.send({success: false, message:error.meesage});
    }
}