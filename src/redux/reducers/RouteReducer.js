import { ADD_NEW_ROUTES, GET_ALL_ROUTES, ERROR_ROUTES, SET_LOADING_ROUTES } from '../actions/types'
const intialState = {
  data: [],
  pageInfo: {},
  isLoading: false,
  error: null,
  showModal: false
}

export default function (state = intialState, action) {
  switch (action.type) {
    case SET_LOADING_ROUTES: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_ALL_ROUTES: {
      return {
        ...state,
        data: action.payload.data,
        pageInfo: action.payload.pageInfo,
        isLoading: false
      }
    }
    case ERROR_ROUTES: {
      return {
        ...state,
        error: action.payload
      }
    }
    case ADD_NEW_ROUTES: {
      return {
        ...state
      }
    }

    default:
      return state
  }
}
