const fetch = require('node-fetch')
const searchCities = require('./search-cities')

searchCities(fetch, {
    county: 68
})
.then(cities => cities.find(c => c.nom === 'Bergheim'))
.then(city => console.log(city))
.catch(e => console.log(e))