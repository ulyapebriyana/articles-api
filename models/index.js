import User from "./user.js";
import Article from "./article.js";

User.hasMany(Article, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Article.belongsTo(User)

// await User.sync({alter: true})

export { User, Article }