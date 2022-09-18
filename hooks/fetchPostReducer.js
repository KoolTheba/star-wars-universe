import { saveToStorage } from '../utils/localStorage'

function fetchPostReducer (state, action) {
  if (action.type === 'loading') {
    return {
      loading: true,
      data: null,
      error: null
    }
  } else if (action.type === 'fetchComplete') {
    saveToStorage('films', action.data)
    return {
      loading: false,
      data: action.data,
      error: null
    }
  } else if (action.type === 'error') {
    return {
      loading: false,
      data: null,
      error: 'Error searching for films'
    }
  } else {
    throw new Error()
  }
}

export default fetchPostReducer
