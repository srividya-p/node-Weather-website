const request = require('request')

forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/408f987e9851bf11c54460b2240cfb6e/' + lattitude + ',' + longitude + '?units=si&lang=en'
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to Weather Services!', undefined)
        } else if (body.error) {
            callback('Unable to find Location!', undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is " + body.currently.precipProbability + "% chance of rain.The humidity is currently "+body.currently.temperature+".\nThe highest recorded temperature for today is "+body.daily.data[0].temperatureHigh+" degrees.\nThe lowest recorded temperature for today is "+body.daily.data[0].temperatureLow+" degrees")
        }
    })
}

// const url = 'https://api.darksky.net/forecast/408f987e9851bf11c54460b2240cfb6e/19.185143,72.96074?units=si&lang=en'

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to Weather Services!')
//     } else if (response.body.error) {
//         console.log('Unable to find Location!')
//     }
//     else {
//         console.log(response.body.daily.data[0].summary + " It is currently " + response.body.currently.temperature + " out. There is " + response.body.currently.precipProbability + "% chance of rain.")
//     }
// })
// //out of error and response only one may be populated other will be undefined

// //you can directly get json object from request by setting json property of your input 
// //oject to true. you can modify you http requrest by adding ? in the end of the url and 
// //adding an option with its value for more options use & 

module.exports = forecast
