import Joi from "joi";

export const createSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(5).max(300).required()
})