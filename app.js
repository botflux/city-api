const express = require('express')
const searchConty = require('./src/search-county')
const convertCities = require('./src/convert-cities')
const fetch = require('node-fetch')

const APPLICATION_PORT = 3000
const app = express()

app.get('/county/:code', (req, res) => {
    const { code } = req.params

    searchConty(fetch, {
        county: code
    })
    .then(geoCities => convertCities(geoCities))
    .then(convertedCities => ({
        errors: false,
        results: convertedCities
    }))
    .then(response => res.send(JSON.stringify(response)))
    .catch(e => {
        res.send(JSON.stringify({
            errors: true,
            result: JSON.stringify(e)
        }))
    })
})

app.listen(APPLICATION_PORT, () => {
    console.log(`Your application is now listening: http://localhost:${APPLICATION_PORT}`)
})