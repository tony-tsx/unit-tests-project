const Axios = require( 'axios' )

const api = Axios.create( {
  baseURL: 'https://pokeapi.co/api/v2'
} )

module.exports = api