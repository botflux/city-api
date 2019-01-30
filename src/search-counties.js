
const searchCounties = (fetch) => {
    return fetch(`https://geo.api.gouv.fr/departements`)
        .then(response => response.json())
}

module.exports = searchCounties