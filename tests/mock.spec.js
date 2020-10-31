import axios from 'axios'
import getPokemonsRequest from '../src/getPokemonsRequest'
describe( 'test with mock functions', () => {
  it( 'create first mock', () => {
    const foo = jest.fn( number => number % 2 === 0 )
    const arrayCalls = [ 5, 10, 16, 9, 18 ]
    arrayCalls.forEach( number => foo( number ) )
    expect( foo.mock.calls.length ).toBe( 5 )

    expect( foo.mock.calls[0][0] ).toBe( 5 )
    expect( foo.mock.calls[1][0] ).toBe( 10 )
    expect( foo.mock.calls[2][0] ).toBe( 16 )
    expect( foo.mock.calls[3][0] ).toBe( 9 )
    expect( foo.mock.calls[4][0] ).toBe( 18 )

    expect( foo.mock.calls[0][1] ).toBeUndefined()

    expect( foo.mock.results[0].value ).toBeFalsy()
    expect( foo.mock.results[1].value ).toBe( true )
    expect( foo.mock.results[2].value ).toBe( true )
    expect( foo.mock.results[3].value ).toBe( false )
    expect( foo.mock.results[4].value ).toBeTruthy()
  } )

  it( 'mock instance', () => {
    const Foo = jest.fn()
    const fooA = new Foo()
    const objectB = {}
    const fooB = Foo.bind( objectB )
    fooB()

    expect( Foo.mock.instances.length ).toBe( 2 )
    expect( Foo.mock.instances[0] ).toBe( fooA )
    expect( Foo.mock.instances[0] ).toBeInstanceOf( Foo )
    expect( Foo.mock.instances[1] ).toBe( objectB )
  } )

  it( 'mock with manualy return', () => {
    const foo = jest.fn()
    expect( foo() ).toBeUndefined()

    foo.mockReturnValueOnce( 100 )

    expect( foo() ).toBe( 100 )
    expect( foo() ).toBeUndefined()

    foo.mockReturnValueOnce( false )
      .mockReturnValueOnce( 'some string' )
      .mockReturnValue( true )

    expect( foo() ).toBe( false )
    expect( foo() ).toBe( 'some string' )
    expect( foo() ).toBe( true )
    expect( foo() ).toBe( true )
    expect( foo() ).toBe( true )
  } )

  it( 'mock with manualy implementation', () => {
    const foo = jest.fn( x => `default ${x}` )
    foo
      .mockImplementationOnce( x => x * 2 )
      .mockImplementationOnce( x => x * 5 )
      .mockImplementationOnce( x => x * 3 )
    
    expect( foo( 2 ) ).toBe( 4 )
    expect( foo( 2 ) ).toBe( 10 )
    expect( foo( 2 ) ).toBe( 6 )
    expect( foo( 2 ) ).toBe( 'default 2' )
    expect( foo( 2 ) ).toBe( 'default 2' )

    foo.mockImplementation( x => x ** x )

    expect( foo( 3 ) ).toBe( 27 )
    expect( foo( 3 ) ).toBe( 27 )
  } )
} )

jest.mock( 'axios' )

describe( 'mock infilter modules', () => {
  it( 'mocking axios', () => {
    const results = [
      { "name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/" },
      { "name":"ivysaur", "url":"https://pokeapi.co/api/v2/pokemon/2/" },
      { "name":"venusaur", "url":"https://pokeapi.co/api/v2/pokemon/3/" },
      { "name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/" },
      { "name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/" },
      { "name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/" },
      { "name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/" },
      { "name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/" },
      { "name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/" }
    ]
    const data = { count: 800, next: '', results }
    axios.get.mockResolvedValue( { data } )
    getPokemonsRequest()
      .then( pokemons => {
        expect( pokemons ).toContainEqual( { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' } )
      } )
  } )
} )

describe( 'mock context', () => {
  it( 'test object context with mock', () => {
    const mockWithoutContext = jest.fn().mockReturnThis()
    const object = {
      name: 'Tony',
      someMethod: jest.fn().mockReturnThis(),
      otherMethod: jest.fn( function() {
        return this
      } )
    }
    expect( mockWithoutContext() ).toBeUndefined()
    expect( object.someMethod() ).toBe( object )
    expect( object.otherMethod() ).toBe( object )
  } )
} )

describe( 'expect with mock', () => {
  it( 'explain expect mock usage', () => {
    const foo = jest.fn()
    expect( foo ).not.toHaveBeenCalled()
    foo()
    expect( foo ).toHaveBeenCalled()
    foo( 1, 'x' )
    expect( foo ).toHaveBeenCalledWith( 1, 'x' )
    expect( foo ).toHaveBeenCalledTimes( 2 )
    foo( 5, 'a' )
    foo( 2, 'y' )
    expect( foo ).toHaveBeenLastCalledWith( 2, 'y' )
    expect( foo ).toHaveBeenNthCalledWith( 3, 5, 'a' )
    expect( foo ).toHaveBeenCalledTimes( 4 )
    expect( foo ).toMatchSnapshot()
  } )
} )