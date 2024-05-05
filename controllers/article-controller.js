import { createSchema } from "../schemas/article-schema.js"
import { errorClientResponse, successResponse, errorServerResponse, paginate } from "../helpers/response-helper.js"
import { Like, Article, User, Profile } from '../models/index.js'
import { col, fn, literal, Op, where } from "sequelize"

let self = {}

self.indexAllArticle = async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const offset = (page - 1) * limit

    const { name, likes } = req.query

    const currentUser = req.currentUser

    try {
        const whereClause = {}

        if (name) {
            whereClause[Op.and] = [
                where(fn('CONCAT', col('User.Profile.firstName'), ' ', col('User.Profile.lastName')), 'LIKE', `%${name}%`)
            ]
        }

        if (likes) {
            whereClause[Op.and] = [
                ...(whereClause[Op.and] || []),
                literal(`(SELECT COUNT(*) FROM Likes WHERE Likes.ArticleId = Article.id) > ${likes}`)
            ]
        }

        const { count, rows } = await Article.findAndCountAll({
            where: whereClause,
            offset,
            limit,
            distinct: true,
            include: [
                { model: Like },
                {
                    model: User,
                    required: true,
                    include: [
                        { model: Profile, required: true }
                    ]
                },
            ]
        })
        return successResponse(res, 200, "get articles successfully", paginate(page, limit, count, rows))
    } catch (error) {
        return errorServerResponse(res, error)
    }
}

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

        return successResponse(res, 200, "get article successfully", articles)

    } catch (error) {
        return errorServerResponse(res, error)
    }
}

export default self