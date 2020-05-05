import {
  SET_LOADING_RESERVATIONS,
  GET_RESERVATIONS_DATA,
  ERROR_RESERVATIONS,
  GET_RESERVATIONS_BY_ID,
  GET_ALL_PASSENGERS,
  USER_CHECK_IN
} from '../actions/types'
const initialState = {
  data: [],
  singleData: {},
  checkIn: {},
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
        data: action.payload.data,
        pageInfo: action.payload.pageInfo
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
    case USER_CHECK_IN: {
      return {
        ...state,
        checkIn: action.payload
      }
    }

    default: {
      return state
    }
  }
}
