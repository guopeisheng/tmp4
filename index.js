const express = require('express')
const bodyParser = require('body-parser')

const enableCORS = (req, res, next) => {
    //     res.set({
    //         'Access-Control-Allow-Origin':req.get('origin'),
    //         'Access-Control-Allow-Credentials':'true',
    //         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
    //         'Access-Control-Allow-Headers': 'Content-Type,Accept',
    //         'Content-Type':'application/json'

    //     });
    //     if(req.method == 'OPTIONS'){
    //         res.status(200);
    //     }
    //     next();
    // 
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    }
    else {
        next()
    }
}

const app = express()
app.use(bodyParser.json())
app.use(enableCORS)

require('./src/auth')(app)
require('./src/profile')(app)
require('./src/following.js')(app)
require('./src/articles.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    const addr = server.address()
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
})