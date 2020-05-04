import { GET_ALL_TOPUP } from '../actions/types'
const initialState = {
  data: [],
  singleData: {},
  isLoading: false,
  pageInfo: {},
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TOPUP: {
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    }

    default: {
      return state
    }
  }
}
