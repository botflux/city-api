const fetch = require('node-fetch')
const searchCounties = require('./search-counties')
/*
fetch('https://geo.api.gouv.fr/departements/')
    .then(res => res.json())
    .then(json => console.log(json))
*/

searchCounties(fetch)
    .then (r => console.log(r))
    .catch(e => console.log(e))