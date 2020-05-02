import {
  SET_LOADING_RESERVATIONS,
  GET_RESERVATIONS_DATA,
  ERROR_RESERVATIONS,
  GET_RESERVATIONS_BY_ID,
  GET_ALL_PASSENGERS
} from '../actions/types'
const initialState = {
  data: [],
  singleData: {},
  isLoading: false,
  pageInfo: {},
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PASSENGERS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    }
    case SET_LOADING_RESERVATIONS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_RESERVATIONS_DATA: {
      return {
        ...state,
        data: action.payload.data,
        pageInfo: action.payload.pageInfo,
        isLoading: false
      }
    }
    case GET_RESERVATIONS_BY_ID: {
      return {
        ...state,
        singleData: action.payload
      }
    }
    case ERROR_RESERVATIONS: {
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
