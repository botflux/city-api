const express = require('express')
const searchCities = require('./src/search-cities')
const convertCities = require('./src/convert-cities')
const searchCounties = require('./src/search-counties')
const convertCounties = require('./src/convert-counties')
const fetch = require('node-fetch')

const APPLICATION_PORT = process.env.PORT || 3000
const app = express()

app.get('/county', (req, res) => {
    searchCounties(fetch)
        .then(geoCounties => convertCounties(geoCounties))
        .then(convertedCounties => ({
            errors: false,
            results: convertedCounties
        }))
        .then(response => res.send(JSON.stringify(response)))
        .catch(e => res.send(JSON.stringify({
            errors: true,
            result: JSON.stringify(e)
        })))
})

app.get('/county/:code', (req, res) => {
    const { code } = req.params

    searchCities(fetch, {
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

app.all('*', (req, res) => {
    res.send(JSON.stringify({
        error: true,
        message: 'No route matching your request!'
    }))
})

app.use((e, req, res, next) => {
    res.status(500).send(JSON.stringify({
        errors: true,
        message: 'Something went wrong!'
    }))
}) 

app.listen(APPLICATION_PORT, () => {
    console.log(`Your application is now listening on port ${APPLICATION_PORT}`)
})