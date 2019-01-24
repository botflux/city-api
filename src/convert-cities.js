/**
 * Convert a geo.api.gouv.fr city row into a webchasse compatible format.
 * 
 * @param {Array} cities array of cities
 */
const convertCities = (cities) => {
    return cities.map(city => {
        const { nom, code, codesPostaux, codeDepartement } = city

        return {
            city: nom,
            dep: codeDepartement,
            insee: code,
            cp: codesPostaux[0]
        }
    })
}

module.exports = convertCities