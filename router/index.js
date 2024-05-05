import express from "express"

import users from "../controllers/user-controller.js"
import articles from "../controllers/article-controller.js"
import likes from "../controllers/like-controller.js"
import profiles from "../controllers/profile-controller.js"
import CheckAccessToken from "../middlewares/check-access-token.js"
import CheckRefreshToken from "../middlewares/check-refresh-token.js"

const router = express.Router()


router.post("/sign-up", users.signUp)
router.post("/sign-in", users.signIn)
router.get("/refresh-token", CheckRefreshToken, users.refreshToken)
router.delete("/sign-out", CheckRefreshToken, users.signOut)

router.post("/profiles", CheckAccessToken, profiles.createProfile)

router.get("/articles", CheckAccessToken, articles.indexArticle)
router.get("/articles/all", CheckAccessToken, articles.indexAllArticle)
router.post("/articles", CheckAccessToken, articles.createArticle)

router.post("/likes/articles", CheckAccessToken, likes.createLikeArticle)
router.delete("/likes/articles/:ArticleId", CheckAccessToken, likes.deleteLikeArticle)

export default router