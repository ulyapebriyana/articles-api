import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
    passwordConfirmation: Joi.ref("password")
})

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
})