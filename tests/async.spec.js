const api = require( '../src/api' )

let numberOfRequest = 0

beforeAll( () => {
  expect( numberOfRequest ).toBe( 0 )
} )

afterAll( () => {
  expect( numberOfRequest ).toBe( 6 )
} )

beforeEach( () => {
  expect( [ 0, 1 ] ).toContain( numberOfRequest )
} )

afterEach( () => {
  expect( [ 1, 6 ] ).toContain( numberOfRequest )
} )

describe( 'pokemons request', () => {
  it( 'test if receive array of pokemons', done => {
    numberOfRequest++
    api.get( '/pokemon' )
      .then( response => {
        const pokemonNames = response.data.results.map( pokemon => pokemon.name )
        expect( pokemonNames ).toContain( 'pikachu' )
        expect( response.data.results ).toContainEqual( { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' } )
        done()
      } )
      .catch( done )
  }, 5000 * 3 )
  
  it( 'test snapshot first get in pokemon', done => {
    numberOfRequest += 5
    Promise.all( [
      api.get( '/pokemon', { params: { offset: 0 } } )
        .then( response => expect( response.data ).toMatchSnapshot( 'request 1' ) ),
      api.get( '/pokemon', { params: { offset: 20 } } )
        .then( response => expect( response.data ).toMatchSnapshot( 'request 2' ) ),
      api.get( '/pokemon', { params: { offset: 40 } } )
        .then( response => expect( response.data ).toMatchSnapshot( 'request 3' ) ),
      api.get( '/pokemon', { params: { offset: 60 } } )
        .then( response => expect( response.data ).toMatchSnapshot( 'request 4' ) ),
      api.get( '/pokemon', { params: { offset: 80 } } )
        .then( response => expect( response.data ).toMatchSnapshot( 'request 5' ) ),
    ] )
      .then( () => done() )
      .catch( done )
  }, 5000 * 10 )
} )
