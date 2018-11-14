var Profile = require('./model.js').Profile
var ValidUser = require('./model.js').ValidUser

const getFollowing = (req, res) => {
    const userid = req.params.user
    Profile.find({ _id: userid }, (err, user) => {
        if (err)
            return console.log(err)
        if (user == null || user.length == 0)
            return res.status(400).send({ result: "can't find this user" })
        return res.status(200).send({ username: user[0].username, following: user[0].following })
    })
}

const addFollowing = (req, res) => {
    const newfollowing = req.params.user
    const username = req.body.username
    ValidUser.find({ username: newfollowing }, (err, newf) => {
        if (err)
            return console.log(err)
        const newfollower = newf
        if (newfollower == null || newfollower.length == 0) {
            return res.status(400).send({ result: "no such user you can add" })
        }
        Profile.find({ username: username }).exec(function (err, user) {
            if (err)
                return console.log(err)
            if (!user || user.length == 0)
                return res.status(400).send({ result: "no such user" })
            var followings = user[0].following
            var followed = followings.filter((r) => {
                return r == newfollowing
            })
            if (followed && followed.length >= 1) {
                return res.status(400).send({ result: "you have followed this user" })
            } else {
                Profile.findOneAndUpdate({ username: username }, { $push: { following: newfollowing } }, { new: true }, function (err, usr) {
                    if (err)
                        return console.log(err)
                    if (!usr)
                        return res.status(400).send({ result: "no such user" })
                    return res.status(200).send({ username: username, following: usr.following })
                })
            }
        })
    })
}

const deleteFollowing = (req, res) => {
    const username = req.body.username
    const following = req.params.user
    if (!following)
        return res.status(400).send("no following input")
    Profile.update({ username: username }, { $pull: { following: following } }, { new: true }, function (err) {
        Profile.find({ username: username }).exec(function (err, user) {
            res.status(200).send({ username: username, following: user[0].following })
        })
    })
}

module.exports = app => {
    app.get('/following/:user?', getFollowing);
    app.put('/following/:user', addFollowing);
    app.delete('/following/:user', deleteFollowing);
}