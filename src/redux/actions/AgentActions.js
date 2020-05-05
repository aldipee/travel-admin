import axios from 'axios'
import config from '../../utils/config'
import { SET_LOADING_AGENTS, GET_ALL_AGENTS, ERORR_AGENTS, GET_AGENT_PROFILE } from '../actions/types'
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`

export const getAgents = () => async (dispatch) => {
  try {
    setLoading()
    const token = `Bearer ${localStorage.getItem('token_user')}`
    const res = await axios.get(config.DATA_URL.concat('agents'), {
      headers: { Authorization: `${token}` }
    })
    console.log('bingo', res)
    dispatch({
      type: GET_ALL_AGENTS,
      payload: res.data.data
    })
  } catch (error) {
    dispatch({
      type: ERORR_AGENTS,
      payload: error.response
    })
  }
}

export const getAgentProfile = () => async (dispatch) => {
  try {
    setLoading()
    const token = `Bearer ${localStorage.getItem('token_user')}`
    const res = await axios.get(config.DATA_URL.concat('agents/my-profile'), {
      headers: { Authorization: `${token}` }
    })
    if (res) {
      dispatch({
        type: GET_AGENT_PROFILE,
        payload: res.data.data
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING_AGENTS
  }
}
