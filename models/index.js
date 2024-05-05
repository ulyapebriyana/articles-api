import User from "./user.js";
import Article from "./article.js";
import Like from "./like.js";
import Profile from "./profile.js";

User.hasMany(Article, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})
Article.belongsTo(User)

User.hasMany(Like, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Article.hasMany(Like, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Like.belongsTo(Article)
Like.belongsTo(User)

User.hasOne(Profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Profile.belongsTo(User)
// await Profile.sync({alter: true})

export { User, Article, Like, Profile }