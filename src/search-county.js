/**
 * Return all the cities from a given county.
 * 
 * @param {Function} fetch function that manage the fetching
 * @param {{}} options options
 */
const searchCounty = (fetch, { county }) => {
    return fetch(`https://geo.api.gouv.fr/departements/${county}/communes`)
        .then(response => response.json())
}

module.exports = searchCounty