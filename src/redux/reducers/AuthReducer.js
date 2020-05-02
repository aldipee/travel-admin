import { SET_LOADING_AUTH, SET_LOGIN } from '../actions/types'
const initialState = {
  isLogin: false,
  isLoading: false,
  error: null,
  role: 0,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_AUTH: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case SET_LOGIN: {
      return {
        ...state,
        isLogin: true,
        role: parseInt(payload),
      }
    }
    default:
      return state
  }
}
