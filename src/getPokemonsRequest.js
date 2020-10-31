import axios from 'axios'

const getPokemonsRequest = ( offset = 0, limit = 9 ) => {
  return axios
    .get( 'https://pokeapi.co/api/v2/pokemon', { params: { offset, limit } } )
    .then( response => response.data.results )
}

export default getPokemonsRequest
