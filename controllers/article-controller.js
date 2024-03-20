import { createSchema } from "../schemas/article-schema.js"
import { errorClientResponse, successResponse, errorServerResponse } from "../helpers/response-helper.js"
import User from "../models/user.js"

let self = {}

self.createArticle = async (req, res) => {
    try {
        const currentUser = req.currentUser
        const { title, description } = req.body
        const { error, value } = createSchema.validate({ title, description })
        if (error) return errorClientResponse(res, 422, error.message)

        const user = await User.findOne({ where: { email: currentUser.email } })

        const article = await user.createArticle({ title, description })

        return successResponse(res, 200, "article created successfully", article)

    } catch (error) {
        return errorServerResponse(res, error)
    }
}

self.indexArticle = async (req, res) => {
    try {
        const currentUser = req.currentUser
        const user = await User.findOne({ where: { email: currentUser.email } })

        const articles = await user.getArticles()

        return successResponse(res, 200, "article created successfully", articles)

    } catch (error) {
        return errorServerResponse(res, error)
    }
}

export default self