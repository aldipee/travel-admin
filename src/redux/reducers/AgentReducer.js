import { GET_ALL_AGENTS, ERORR_AGENTS, SET_LOADING_AGENTS, GET_AGENT_PROFILE } from '../actions/types'
const initialState = {
  data: [],
  isLoading: false,
  singleData: {},
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_AGENTS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_AGENT_PROFILE: {
      return {
        ...state,
        isLoading: false,
        singleData: action.payload
      }
    }
    case GET_ALL_AGENTS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    }
    case ERORR_AGENTS: {
      return {
        ...state,
        error: action.payload
      }
    }

    default: {
      return {
        state
      }
    }
  }
}
