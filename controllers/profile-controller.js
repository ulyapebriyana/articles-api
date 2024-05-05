import { errorClientResponse, successResponse, errorServerResponse } from "../helpers/response-helper.js"
import Article from "../models/article.js"
import User from "../models/user.js"
import Like from "../models/like.js"

let self = {}

self.createProfile = async (req, res) => {
    const currentUser = req.currentUser

    try {
        const user = await User.findOne({ where: { email: currentUser.email } })

        const data = await user.createProfile({...req.body})

        return successResponse(res, 200, "profile created successfully", data)

    } catch (error) {
        return errorServerResponse(res, error)
    }
}

self.deleteProfile = async (req, res) => {
    const currentUser = req.currentUser
    const { ArticleId } = req.params

    try {
        const user = await User.findOne({ where: { email: currentUser.email } })

        const article = await Article.findByPk(ArticleId)
        if (!article) return errorClientResponse(res, 404, "article not found")

        const otherLike = await user.getLikes({ where: { ArticleId } })
        if (!otherLike[0]) return errorClientResponse(res, 400, "users haven't liked this article yet")

        await Like.destroy({ where: { UserId: user.id, ArticleId: ArticleId } });
        return successResponse(res, 200, "like deleted successfully")

    } catch (error) {
        return errorServerResponse(res, error)
    }
}

export default self