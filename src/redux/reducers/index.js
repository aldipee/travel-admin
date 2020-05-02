import { SET_LOGOUT } from '../actions/types'
import { combineReducers } from 'redux'

import AuthReducer from './AuthReducer'
import ReservationReducer from './ReservationReducer'
import SchedulesReducer from './SchedulesReducer'
import BusReducer from './BusReducer'
import AgentReducer from './AgentReducer'

const appReducer = combineReducers({
  Auth: AuthReducer,
  Reservations: ReservationReducer,
  Schedules: SchedulesReducer,
  Bus: BusReducer,
  Agent: AgentReducer
})

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === SET_LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}
export default rootReducer
