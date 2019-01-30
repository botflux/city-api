const searchCounty = require('./search-county')
const fetch = require('node-fetch')

searchCounty(fetch, { county: '68' })
    .then (r => {
        console.log(r)
    })
    .catch(e => {
        console.log(e)
    })