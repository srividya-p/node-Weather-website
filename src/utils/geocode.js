const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2NzMyIsImEiOiJjazgzMnNnbTMwdjFyM25tc2NvdHo1bjBnIn0.WIVPq2oOF0he4P4RHpgdBw&limit=1'
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to Location Services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find Location! Try another Search', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                lattitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}
//encodeURIComponent is used to handle special characters in input

// const urlGoecode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/thane.json?access_token=pk.eyJ1Ijoic2NzMyIsImEiOiJjazgzMnNnbTMwdjFyM25tc2NvdHo1bjBnIn0.WIVPq2oOF0he4P4RHpgdBw&limit=1'

// request({ url: urlGoecode, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to Location Services!')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find Location! Try another Search')
//     }
//     else {
//         const longitude = response.body.features[0].center[0]
//         const lattitude = response.body.features[0].center[1]
//         console.log('Longitude:' + longitude + '\nLattitude:' + lattitude)
//     }
// })

module.exports=geocode