const searchCity = (citiesResult, { name }) => {
    return citiesResult
        .then(cities => cities.find(c => c.nom === name))
        
}

module.exports = searchCity