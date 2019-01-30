/**
 * Converts all counties in a webchasse compatible format.
 * 
 * @param {[]} counties list of counties
 */
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