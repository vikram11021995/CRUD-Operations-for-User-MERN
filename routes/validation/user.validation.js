const Joi = require("joi");
module.exports = {
    createUser: {
        body: Joi.object({
            username: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        })
    },
    // getUser: {
    //     params: Joi.object({
    //         id: Joi.string().required()
    //     })
    // }
    
    // updateUser: {
    //     body: Joi.object({
    //         username: Joi.string().required(),
    //         email: Joi.string().required(),
    //         password: Joi.string().required(),
    //     })
    // },
}