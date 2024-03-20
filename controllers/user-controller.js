import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { errorClientResponse, errorServerResponse, successResponse } from "../helpers/response-helper.js"
import { User } from "../models/index.js"
import { registerSchema, signInSchema } from "../schemas/user-schema.js"

let self = {}

self.signUp = async (req, res) => {
    try {
        const { email, password, passwordConfirmation } = req.body
        const { error, value } = registerSchema.validate({
            email,
            password,
            passwordConfirmation
        })
        if (error) return errorClientResponse(res, 422, error.message)

        const existedUser = await User.findOne({ where: { email } })

        if (existedUser) return errorClientResponse(res, 422, "email already exist")

        const encryptPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ email, password: encryptPassword })
        return successResponse(res, 200, "user registered successfully", user)
    } catch (error) {
        return errorServerResponse(res, error)
    }
}

self.signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const { error, value } = signInSchema.validate({
            email,
            password
        })
        if (error) return errorClientResponse(res, 422, error.message)
        const currentUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (!currentUser) return errorClientResponse(res, 404, "user not found")

        const comparedPassword = await bcrypt.compare(password, currentUser.password)
        if (!comparedPassword) return errorClientResponse(res, 422, "password incorrect")

        const accessToken = jwt.sign({ id: currentUser.id, email: currentUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
        const refreshToken = jwt.sign({ id: currentUser.id, email: currentUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" })

        await User.update({ refreshToken: refreshToken }, {
            where: { email: email }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        return successResponse(res, 200, "login successfully", {
            id: currentUser.id,
            email: currentUser.email,
            accessToken: accessToken
        })


    } catch (error) {
        errorServerResponse(res, error)
    }
}

self.refreshToken = async (req, res) => {
    try {
        const currentUser = req.currentUser
        const accessToken = jwt.sign({ id: currentUser.id, email: currentUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
        return successResponse(res, 200, "generated new access token", {
            id: currentUser.id,
            email: currentUser.email,
            accessToken: accessToken
        })

    } catch (error) {
        errorServerResponse(res, error)
    }
}

self.signOut = async (req, res) => {
    try {
        const currentUser = req.currentUser
        const user = await User.findByPk(currentUser.id)

        user.update({ refreshToken: null })
        res.clearCookie("refreshToken")

        return successResponse(res, 200, "user logged out successfuly", {})

    } catch (error) {
        errorServerResponse(res, error)
    }
}

export default self