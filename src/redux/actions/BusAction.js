import axios from 'axios'
import config from '../../utils/config'
import { SET_LOADING_BUS, ERROR_BUS, GET_ALL_BUS_FOR_AGENT, GET_ALL_BUS_FOR_ADMIN, GET_AGENTS } from './types'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`

export const getBusForAgent = () => async (dispatch) => {
  try {
    const res = await axios.get(config.DATA_URL.concat('bus'))
    if (res) {
      let bus = res.data.data.map((bus) => ({
        value: `${bus.id}`,
        label: `${bus.name} - (${bus.total_seat} seats)`
      }))
      dispatch({
        type: GET_ALL_BUS_FOR_AGENT,
        payload: bus
      })
    }
  } catch (error) {
    dispatch({
      type: ERROR_BUS,
      payload: error
    })
  }
}

export const getBusForAdmin = (id) => async (dispatch) => {
  try {
    const res = await axios.get(config.DATA_URL.concat(`bus/agent/${id}`))
    if (res) {
      dispatch({
        type: GET_ALL_BUS_FOR_ADMIN,
        payload: res.data.data
      })
    }
  } catch (error) {
    dispatch({
      type: ERROR_BUS,
      payload: error
    })
  }
}

export const loadAgents = () => async (dispatch) => {
  const data = await axios.get(config.DATA_URL.concat('agents'))
  let agents = data.data.data.map((dest) => ({
    value: `${dest.agent_id}`,
    label: `${dest.agent_name} `
  }))
  dispatch({
    type: GET_AGENTS,
    payload: agents
  })
}

export const setLoading = () => {
  return {
    type: SET_LOADING_BUS
  }
}
