const searchCity = (citiesResult, { name }) => {
    return Promise.resolve(citiesResult.find(c => c.nom === name))
}

module.exports = searchCity