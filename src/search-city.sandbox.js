const fetch = require('node-fetch')
const searchCities = require('./search-cities')
const searchCity = require('./search-city')

searchCities(fetch, {
    county: 68
})
.then(cities => searchCity(cities, { name: 'Bergheim' }))
.then(city => console.log(city))
.catch(e => console.log(e))