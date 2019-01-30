const convertCounties = (counties) => {
    return counties.map(c => {
        const { codeRegion, nom } = c
        return {
            cp: codeRegion,
            dep: nom
        }
    })
}

module.exports = convertCounties