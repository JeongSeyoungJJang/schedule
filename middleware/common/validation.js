const Joi = require("joi");

const schema = Joi.object({
    email: Joi.string().email().required(),
    title: Joi.string().required(),
    descr: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.string().regex(/^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/).required()
});
(async() => {
    const value = await schema.validateAsync({
        email: "freebomh@naver.com",
        title:"일정",
        descr: "상세",
        date: "2022-02-03",
        time: "23:00:00"
    })
    console.log(value)
})

exports.validate = async(body) => {
    try {
        const {error} = await schema.validateAsync(body)
        return {error: error ? error : undefined}
    } catch (error) {
        return error
    }
}