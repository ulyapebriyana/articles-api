import express from "express"

import users from "../controllers/user-controller.js"
import articles from "../controllers/article-controller.js"
import CheckAccessToken from "../middlewares/check-access-token.js"

const router = express.Router()


router.post("/sign-up", users.signUp)
router.post("/sign-in", users.signIn)


router.get("/articles", CheckAccessToken, articles.indexArticle)
router.post("/articles", CheckAccessToken, articles.createArticle)

export default router