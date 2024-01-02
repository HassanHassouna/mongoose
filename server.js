const express = require('express')
const app = express()
const api = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect("mongodb://127.0.0.1:27017/mongooseEx", {
    useNewUrlParser: true,
}).catch((err) => console.log(err))


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', api)

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})


