const express = require("express");
const bodyParser = require("body-parser")
const feedRoutes = require("./routes/feed");
const db = require("./util/database").db;
const app = express();

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// routes
app.use('/feed', feedRoutes)

db()
    .then(result => {
        console.log('connected')
        app.listen(8080);
    })
    .catch(err => {
    console.log(err)
})

