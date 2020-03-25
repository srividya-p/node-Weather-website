const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const express = require('express')
const hbs = require('hbs')

app = express() //express is just a function

//define paths for expresses config
publicDirPath = path.join(__dirname, '../public')
viewsPath = path.join(__dirname, '../templates/views')
partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Srividya Subramanian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Srividya Subramanian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Srividya Subramanian',
        helpText: 'Here is where you can get Help.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    geocode(req.query.address, (error, { longitude, lattitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404!',
        name: 'Srividya Subramanian',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404!',
        name: 'Srividya Subramanian',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running at port 3000...')
})