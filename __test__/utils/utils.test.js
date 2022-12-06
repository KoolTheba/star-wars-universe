import { arrayHandler } from '../../src/utils/arrayTransform'
import { removeSpaces, removeSpecialChars } from '../../src/utils/searchValueParsers'

describe('Utils', () => {
  const lukeString = 'luke'
  it('returns an array from strings using arrayHandler function', () => {
    expect(arrayHandler('luke c3po')).toStrictEqual([lukeString, 'c3po'])
    expect(arrayHandler(lukeString)).toStrictEqual([lukeString])
  })

  it('removes special characters and spaces correctly', () => {
    expect(removeSpecialChars('&/%$$)=)luke)=)=')).toEqual(lukeString)
    expect(removeSpaces('              luke')).toEqual(lukeString)
  })
})
