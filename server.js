const express = require('express')
const app = express()

const homeRoutes = require('./routes/homeRoutes')

const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 4000

require('dotenv').config({path: './config/config.env'})

app.use(cors())
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', homeRoutes)


app.listen(PORT, (req, res) => {
    console.log(`RealCalc is running on port ${PORT}`)
})
