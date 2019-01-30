const assert = require('assert')
const searchCities = require('../src/search-cities')
const convertCities = require('../src/convert-cities')
const searchCounties = require('../src/search-counties')
const convertCounties = require('../src/convert-counties')
const searchCity = require('../src/search-city')

// this flag is here to know if the fake fetch has been called
let isFakeFetchCalled = false

// mocking a fake request
const fakeFetchCounty = (url) => {
    assert.strictEqual(url, 'https://geo.api.gouv.fr/departements/68/communes')

    isFakeFetchCalled = true

    return Promise.resolve({
        json: () => {
            return Promise.resolve([
                { nom: 'Bergheim', code: '68028', codeDepartement: '68', codeRegion: '44', codesPostaux: [ '68750' ], population: 1986 }
            ])
        }
    })
}

// mocking a fake request
const fakeFetchCounties = (url) => {
    assert.strictEqual(url, 'https://geo.api.gouv.fr/departements')

    isFakeFetchCalled = true

    return Promise.resolve({
        json: () => {
            return Promise.resolve([
                { nom: 'Bergheim', code: '68028', codeDepartement: '68', codeRegion: '44', codesPostaux: [ '68750' ], population: 1986 }
            ])
        }
    })
}

describe('#searchCounty', () => {
    // reset fake fetch state before testing
    isFakeFetchCalled = false

    it ('calls geo.api.gouv.fr', () => {
        searchCities(fakeFetchCounty, { county: '68' })
            .then(result => {
                assert.strictEqual(isFakeFetchCalled, true)
            })
    })

    it ('returns data correctly', (done) => {
        searchCities(fakeFetchCounty, { county: '68' })
            .then(result => {
                assert.strictEqual(
                    JSON.stringify(result[0]), 
                    JSON.stringify({ nom: 'Bergheim', code: '68028', codeDepartement: '68', codeRegion: '44', codesPostaux: [ '68750' ], population: 1986 }))
                done()
            })
    })
})

describe('#searchCounties', () => {
    // reset fake fetch called before testing it
    isFakeFetchCalled = false

    it ('calls geo.api.gouv.fr', (done) => {
        searchCounties(fakeFetchCounties)
            .then(res => {
                assert.strictEqual(isFakeFetchCalled, true)
                done()
            })
    })
    
    it ('returns data correctly', (done) => {
        searchCounties(fakeFetchCounties)
            .then(result => {
                assert.strictEqual(
                    JSON.stringify(result[0]), 
                    JSON.stringify({ nom: 'Bergheim', code: '68028', codeDepartement: '68', codeRegion: '44', codesPostaux: [ '68750' ], population: 1986 }))
                done()
            })
    })
})

describe('#convertCities', () => {
    it ('returns the cities converted into the correct format', () => {
        assert.strictEqual(
            JSON.stringify(convertCities([
                { nom: 'Bergheim', code: '68028', codeDepartement: '68', codeRegion: '44', codesPostaux: [ '68750' ], population: 1986 }
            ])),
            JSON.stringify([
                { city: 'Bergheim', dep: '68', insee: '68028', cp: '68750' }
            ])
        )
    })
})

describe('#convertCounties', () => {
    it('converts the counties into the correct format', () => {
        assert.strictEqual(
            JSON.stringify(convertCounties([
                { nom: 'Ain', code: '01', codeRegion: '84' },
            ])),
            JSON.stringify([
                { cp: '84', dep: 'Ain' }
            ])
        )
    })
})

const cities = [
    { nom: 'Bergheim' },
    { nom: 'Colmar' }
]

describe('#searchCity', () => {
    it('calls geo.api.gouv.fr', (done) => {
        searchCity(cities, {name: 'Bergheim'})
            .then(city => {
                assert.strictEqual(city.nom, 'Bergheim')
                done()
            })
    })
})