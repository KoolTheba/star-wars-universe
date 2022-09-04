export const removeSpaces = (str) => str.replace(/\s{2,}/g,' ').trim()

export const removeSpecialChars = (str) => str.replace(/[^a-zA-Z0-9 ]/g, '')