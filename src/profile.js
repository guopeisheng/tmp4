
const Profile = require('./model.js').Profile

const getDisplayname = (req, res) => {
    const username = req.username
    Profile.find({ username: username }).exec(function (error, profiles) {
        if (error)
            return console.log(error)
        else if (!profiles || profiles.length == 0) {
            return res.status(400)
                .send("can't find the user")
        } else {
            res.status(200).send({ username: username, displayname: profiles[0].displayname })
        }
    })
}

const changeDisplayname = (req, res) => {
    if (!req.body.displayname) {
        return res.status(400).send({ result: "no update displayname" })
    } else {
        const displayname = req.body.displayname
        const username = req.username
        Profile.update({ username: username }, { $set: { displayname: displayname } }, { new: true }, function (err) {
            if (err)
                return console.log(err)
            else {
                Profile.find({ username: username }).exec(function (err, profiles) {
                    if (err) {
                        return console.log(err)
                    } else if (!profiles || profiles.length === 0) {
                        return res.status(400).send({ result: "can't find this user" })
                    } else {
                        res.status(200).send({
                            username: username,
                            displayname: profiles[0].displayname
                        })
                    }
                })
            }
        })
    }
}

const getHeadlines = (req, res) => {
    var users = req.params.users ? req.params.users.split('|') : [req.body.username]
    Profile.find({ username: { $in: users } }).exec(function (err, profiles) {
        if (!profiles || profiles.length == 0) {
            return res.status(400)
                .send({ result: "no users find" })
        }
        var users = []
        profiles.forEach(function (item) {
            users.push({ username: item.username, headline: item.headline })
        })
        res.status(200).send({ healines: users })
    })
}

const getUserHeadline = (req, res) => {
    const username = req.username
    Profile.find({ username: username }).exec(function (error, profiles) {
        if (error)
            return console.log(error)
        else if (!profiles || profiles.length == 0) {
            return res.status(400).send("can't find the user")
        } else {
            res.status(200).send({ username: username, headline: profiles[0].headline })
        }
    })
}

const changeHeadline = (req, res) => {
    if (!req.body.headline) {
        return res.status(400).send({ result: "no update headline" })
    } else {
        const headline = req.body.headline
        const username = req.username
        Profile.update({ username: username }, { $set: { headline: headline } }, { new: true }, function (err) {
            if (err)
                return console.log(err)
            else {
                Profile.find({ username: username }).exec(function (err, profiles) {
                    if (err) {
                        return console.log(err)
                    } else if (!profiles || profiles.length === 0) {
                        return res.status(400).send({ result: "can't find this user" })
                    } else {
                        res.status(200).send({
                            username: username,
                            headline: profiles[0].headline
                        })
                    }
                })
            }
        })
    }
}

const getEmail = (req, res) => {
    const username = req.username
    Profile.find({ username: username }).exec(function (error, profiles) {
        if (error)
            return console.log(error)
        else if (!profiles || profiles.length == 0) {
            return res.status(400)
                .send("can't find the user")
        } 
        else {
            res.status(200).send({ username: username, email: profiles[0].email })
        }
    })
}

const changeEmail = (req, res) => {
    if (!req.body.email) {
        return res.status(400).send({ result: "no update email" })
    } else {
        const email = req.body.email
        const username = req.username
        Profile.update({ username: username }, { $set: { email: email } }, { new: true }, function (err) {
            if (err)
                return console.log(err)
            else {
                Profile.find({ username: username }).exec(function (err, profiles) {
                    if (err) {
                        return console.log(err)
                    } 
                    else if (!profiles || profiles.length === 0) {
                        return res.status(400).send({ result: "can't find this user" })
                    } 
                    else {
                        res.status(200).send({
                            username: username,
                            email: profiles[0].email
                        })
                    }
                })
            }
        })
    }
}

const getDob = (req, res) => {
    const username = req.username
    Profile.find({ username: username }).exec(function (error, profiles) {
        if (error)
            return console.log(error)
        else if (!profiles || profiles.length == 0) {
            return res.status(400).send("can't find the user")
        } else {
            const dob = new Date(profiles[0].dob)
            res.status(200).send({ username: username, dob: dob })
        }
    })
}

const getPhone = (req, res) => {
    const username = req.username
    Profile.find({ username: username }).exec(function (error, profiles) {
        if (error)
            return console.log(error)
        else if (!profiles || profiles.length == 0) {
            return res.status(400)
                .send("can't find the user")
        } else {
            res.status(200).send({ username: username, phone: profiles[0].phone })
        }
    })
}

const changePhone = (req, res) => {
    if (!req.body.phone) {
        return res.status(400).send({ result: "no update phone" })
    } else {
        const phone = req.body.phone
        const username = req.username
        Profile.update({ username: username }, { $set: { phone: phone } }, { new: true }, function (err) {
            if (err)
                return console.log(err)
            else {
                Profile.find({ username: username }).exec(function (err, profiles) {
                    if (err) {
                        return console.log(err)
                    } else if (!profiles || profiles.length === 0) {
                        return res.status(400).send({ result: "can't find this user" })
                    } else {
                        res.status(200).send({
                            username: username,
                            phone: profiles[0].phone
                        })
                    }
                })
            }
        })
    }
}

const getZipcode = (req, res) => {
    const username = req.username
    Profile.find({ username: username }).exec(function (error, profiles) {
        if (error)
            return console.log(error)
        else if (!profiles || profiles.length == 0) {
            return res.status(400)
                .send("can't find the user")
        } 
        else {
            res.status(200).send({ username: username, zipcode: profiles[0].zipcode })
        }
    })
}

const getUsername = (req, res) => {
    if (!req.username)
        return res.status(400).send({ result: "no such username" })
    else
        return res.status(200).send({ result: "get username success", username: req.username })
}

const changeZipcode = (req, res) => {
    if (!req.body.zipcode) {
        return res.status(400).send({ result: "no update zipcode" })
    } else {
        const zipcode = req.body.zipcode
        const username = req.username
        Profile.update({ username: username }, { $set: { zipcode: zipcode } }, { new: true }, function (err) {
            if (err)
                return console.log(err)
            else {
                Profile.find({ username: username }).exec(function (err, profiles) {
                    if (err) {
                        return console.log(err)
                    } else if (!profiles || profiles.length === 0) {
                        return res.status(400).send({ result: "can't find this user" })
                    } else {
                        res.status(200).send({
                            username: username,
                            zipcode: profiles[0].zipcode
                        })
                    }
                })
            }
        })
    }
}

module.exports = app => {
    app.get('/displayname/:user?', getDisplayname)
    app.put('/displayname', changeDisplayname)

    app.get('/headlines/:users?', getHeadlines)
    app.get('/headline/:user?', getUserHeadline)
    app.put('/headline', changeHeadline)

    app.get('/email/:user?', getEmail)
    app.put('/email', changeEmail)

    app.get('/dob/:user?', getDob)

    app.get('/phone/:user?', getPhone)
    app.put('/phone', changePhone)

    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', changeZipcode)
    app.get('/username', getUsername)
    // app.get('/avatars/:user?',getAvatar)
    // app.put('/avatar', uploadImage('avatar'), putAvatars)
}