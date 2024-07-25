const Joi = require("joi");
module.exports = {
    createPost: {
        body: Joi.object({
            message: Joi.string().required(),
            createdBy: Joi.string().required(),
        })
    },
    
}