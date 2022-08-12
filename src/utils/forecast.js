const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherURL = 'http://api.weatherstack.com/current?access_key=b1bac9e75450133ce3e2c2af523fb25a&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: weatherURL, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service.')
        } else if (body.error) {
            callback('Unable to find location and determine weather.')
        // } else {
        //     console.log(response.body)
        // } 
        
        } else {
            callback(undefined, {
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })

}

module.exports = forecast