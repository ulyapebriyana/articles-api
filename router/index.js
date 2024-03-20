import express from "express"

import users from "../controllers/user-controller.js"
import articles from "../controllers/article-controller.js"
import CheckAccessToken from "../middlewares/check-access-token.js"
import CheckRefreshToken from "../middlewares/check-refresh-token.js"

const router = express.Router()


router.post("/sign-up", users.signUp)
router.post("/sign-in", users.signIn)
router.get("/refresh-token", CheckRefreshToken, users.refreshToken)
router.delete("/sign-out", CheckRefreshToken, users.signOut)


router.get("/articles", CheckAccessToken, articles.indexArticle)
router.post("/articles", CheckAccessToken, articles.createArticle)

export default router