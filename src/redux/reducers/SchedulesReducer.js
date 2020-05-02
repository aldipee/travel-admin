import {
  SET_LOADING_SCHEDULES,
  GET_SCHEDULES,
  ERROR_SCHEDULES,
  LOAD_ROUTES,
  LOAD_ROUTES_WITH_ID,
  AGENT_ADD_NEW_SCHEDULES,
  GET_SCHEDULES_FOR_AGENT,
  GET_SCHEDULES_BY_ID,
  EDIT_SCHEDULES
} from '../actions/types'

const initialState = {
  data: [],
  routes: [],
  dataSchedules: [],
  pageInfo: {},
  isLoading: false,
  error: null,
  isRequestSucceed: false,
  singleData: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ROUTES: {
      return {
        ...state,
        routes: action.payload,
        isLoading: false
      }
    }
    case EDIT_SCHEDULES: {
      return {
        ...state,
        isLoading: false
      }
    }
    case GET_SCHEDULES_BY_ID: {
      return {
        ...state,
        isLoading: false,
        singleData: action.payload
      }
    }
    case GET_SCHEDULES_FOR_AGENT: {
      return {
        ...state,
        isLoading: false,
        dataSchedules: action.payload
      }
    }
    case LOAD_ROUTES_WITH_ID: {
      return {
        ...state,
        routes: action.payload,
        isLoading: false
      }
    }
    case AGENT_ADD_NEW_SCHEDULES: {
      return {
        ...state,
        isRequestSucceed: true
      }
    }
    case GET_SCHEDULES: {
      return {
        ...state,
        dataSchedules: action.payload.data,
        pageInfo: action.payload.pageInfo,
        isLoading: false
      }
    }

    case SET_LOADING_SCHEDULES: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ERROR_SCHEDULES: {
      return {
        ...state,
        error: action.payload
      }
    }

    default:
      return state
  }
}
