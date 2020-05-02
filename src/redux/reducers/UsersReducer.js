import { GET_ALL_USERS, GET_USER_BY_ID, SET_LOADING_USERS, ERROR_USERS } from '../actions/types'
const initialState = {
  data: [],
  singleData: {},
  isLoading: false,
  pageInfo: {},
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_BY_ID: {
      return {
        ...state,
        singleData: action.payload,
        isLoading: false
      }
    }
    case GET_ALL_USERS: {
      return {
        ...state,
        data: action.payload.data,
        pageInfo: action.payload.pageInfo,
        isLoading: false
      }
    }
    case SET_LOADING_USERS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ERROR_USERS: {
      return {
        ...state,
        error: action.payload
      }
    }
    default: {
      return state
    }
  }
}
