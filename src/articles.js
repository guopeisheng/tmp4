'use strict'
const Article = require('./model.js').Article
const Comment = require('./model.js').Comment

const addArticle = (req, res) => {
    const author = req.body.username
    const text = req.body.text
    const date = new Date()
    const id = Math.ceil(Math.random() * 199505)
    const comment = req.body.comments ? req.body.comments : []
    const newArticle = { id: id, date: date, text: text, author: author, img: null, comment: comment }
    new Article(newArticle).save()
    res.status(200).send({ article: newArticle })
}

const getArticle = (req, res) => {
    if (req.params.id) {
        var objId = req.params.id
        Article.find({ _id: objId }).exec(function (err, article) {
            if (err) {
                return console.log(err)
            }
            else {
                if (article == null || article.length == 0) {
                    return res.status(400).send({ result: "no such article" })
                }
                res.status(200).send({ article: article[0] })
            }
        })
    } else {
        Article.find({}).exec(function (err, articles) {
            res.status(200).send({ articles: articles })
        })
    }
}

const changeArticle = (req, res) => {
    const article_objId = req.body.articleId
    const commentId = req.body.commentId
    const author = req.body.author
    const text = req.body.text
    if (!commentId) {
        Article.findOneAndUpdate({ _id: article_objId }, { $set: { text: text } }, { new: true }).exec(function (err, txt) {
            if (err)
                return res.status(400).send({ result: err })
            return res.status(200).send({ article: txt })
        })
    } else if (commentId >= 0) {
        Comment.update({ id: commentId }, { $set: { text: text } }, { new: true }, function (err, comment) { })
        Article.update({ _id: article_objId, 'comments.commentId': commentId }, { $set: { 'comments.$.text': text } }, { new: true }, function () { })
        Article.find({ _id: article_objId }).exec(function (err, article) {
            return res.status(200).send({ article: article, result: "changed comment success" })
        })
    } else {
        const newComment_id = Math.ceil(Math.random() * 37 + 175)
        const commentObj = new Comment({ commentId: newComment_id, author: author, date: new Date(), text: text })
        new Comment(commentObj).save(function (err, comment) {
            if (err) 
                throw err
        })
        Article.findOneAndUpdate({ _id: article_objId }, { $push: { comments: commentObj } }, { upsert: true, new: true }).exec(function (err, article) {
            return res.status(200).send({ article: article })
        })
    }
}

module.exports = (app) => {
    app.get('/articles/:id?', getArticle)
    app.post('/article', addArticle)
    app.put('/articles', changeArticle)
}