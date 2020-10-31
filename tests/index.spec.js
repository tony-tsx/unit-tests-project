import { array, string, object, symbol } from '../src'

it( '5 * 2 = 10', () => {
  expect( 5 * 2 ).toEqual( 10 )
} )

it( '4 * 2 = 8', () => {
  expect( 4 * 2 ).toEqual( 8 )
} )

it( 'receive "some string"', () => {
  expect( string ).toEqual( 'some string' )
} )

it( 'array contain exact positions ', () => {
  expect( array ).toEqual( [ 0, 1, 2, 3 ] )
} )

it( 'object contain some props', () => {
  expect( object ).toEqual( { name: 'Thomas', age: 2 } )
} )

it( 'compare symbol receive', () => {
  expect( symbol ).not.toEqual( Symbol( 'any symbol' ) )
} )

it( 'compartions of null', () => {
  const n = null
  expect( n ).toBeNull()
  expect( n ).toBeDefined()
  expect( n ).not.toBeUndefined()
  expect( n ).not.toBeTruthy()
  expect( n ).toBeFalsy()
} )

it( 'compartions of void string', () => {
  const s = ''
  expect( s ).not.toBeUndefined()
  expect( s ).toBeDefined()
  expect( s ).not.toBeUndefined()
  expect( s ).not.toBeTruthy()
  expect( s ).toBeFalsy()
} )

it( 'compartions of numbers', () => {
  const n = 4 * 3
  expect( n ).toBeGreaterThan( 10 )
  expect( n ).toBeGreaterThanOrEqual( 12 )
  expect( n ).toBeLessThan( 15 )
  expect( n ).toBeLessThanOrEqual( 12 )

  expect( n ).toBe( 12 )
  expect( n ).toEqual( 12 )

  expect( n ).not.toBe( 10 )
  expect( n ).not.toEqual( 13 )
} )

it( 'compartions string', () => {
  const s = 'some string'

  expect( s ).toMatch( 'string' )
  expect( s ).toMatch( /S[oO]me [s]t[ri]{2}ng/i )
  expect( s ).not.toMatch( 'any string' )
} )

it( 'compration arrays', () => {
  const a = [ 'dog', 'cat', 'bird', 'snake', 'bird' ]
  const set = new Set( a )
  expect( a ).toContain( 'bird' )
  expect( a ).not.toContain( 'crocodile' )
  expect( set ).toContain( 'cat' )
} )


it( 'test api request sync', () => {
  const c = () => {
    const request = () => {
      throw new Error( 'request failed' )
    }
    return request()
  }
  expect( c ).toThrow()
  expect( c ).toThrow( Error )
  expect( c ).toThrow( 'request failed' )
  expect( c ).toThrow( /Request/i )
} )
