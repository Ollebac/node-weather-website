const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//random comment

// Define paths for Express Config
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ian Cabello'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ian Cabello'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'I can help ye with any of yer problems.',
        name: 'Ian Cabello'
    })
})

// app.get('/products' , (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search'
//         })
//     }
    
//     console.log(req.query.search);
//     res.send({
//         products: []
//     })
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.',
    })}
    
    geoCode (req.query.address, (error, {latitude, longitude, city, state, country} = {}) => {
        if (error) {
            return res.send({
                error: 'Unable to determine location.'
            })
        } 
        

        forecast(latitude, longitude, (error, {weather, temperature, feelsLike}) => {
            if (error) {
                return res.send({
                    error: 'Unable to determine location.'
                })
            } 
            
            if (!state) {
                return res.send({
                    location: city + ' - ' + country,
                    forecast: 'The current weather is ' + weather + '. The temperature is ' + temperature + ' but feels like ' + feelsLike + '.'
                })
            } else {
                return res.send({
                    location: city + ', ' + state + ' - ' + country,
                    forecast: 'The current weather is ' + weather + '. The temperature is ' + temperature + ' but feels like ' + feelsLike + '.'
                })
            }        
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        name: 'Ian Cabello'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        name: 'Ian Cabello'
    })
})

// Port is either 3000 (local) or variable for heroku
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})