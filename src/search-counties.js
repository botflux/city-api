
/**
 * Fetch all the counties
 * 
 * @param {Function} fetch function used for fetching data
 */
const searchCounties = (fetch) => {
    return fetch(`https://geo.api.gouv.fr/departements`)
        .then(response => response.json())
}

module.exports = searchCounties