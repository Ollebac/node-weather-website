const request = require('request')

const geoCode = (address, callback) => {
    const geocodeURL = 'https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(address) + '.json?key=w0WL3AF7XALmMLUfnseyqT5FcSwyBTqe'

    request ({ url: geocodeURL, json: true }, (error, {body} = {}) => {      
        if (error) {
            callback('Unable to retrieve coordinates for specified location due to following reason: ' + response.body.detailedError.message) 
        } else if (body.errorText) {
            callback('Unable to retrieve coordinates for specified location due to following reason: ' + response.body.detailedError.message)
        } else if (!body.results[0]) {
            callback('Unable to obtain location of "' + process.argv[2] + '"')
        } else {
            callback(undefined, {
                city: body.results[0].address.municipality,
                state: body.results[0].address.countrySubdivisionName,
                country: body.results[0].address.country,
                latitude: body.results[0].position.lat,
                longitude: body.results[0].position.lon
            
                //Destructuring of above values...
               
            
            })
        }

    })
}

module.exports = geoCode