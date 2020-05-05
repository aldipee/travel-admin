import axios from 'axios'
import { SET_LOADING_AUTH, SET_LOGIN, ERROR_AUTH } from '../actions/types'

export const userLogin = (username, password, callback) => async (dispatch) => {
  try {
    setLoading()
    const res = await axios.post('http://localhost:5001/auth/login', { username, password })
    if (res.data.token) {
      localStorage.setItem('token_user', res.data.token)
      localStorage.setItem('role', res.data.role)
      dispatch({
        type: SET_LOGIN,
        payload: res.data.role
      })
      callback(true)
    } else {
      callback(false)
    }
  } catch (error) {
    console.error('This Error comes from Auth Actions', error)
    dispatch({
      type: ERROR_AUTH,
      payload: error
    })
  }
}

export const setLoading = () => {
  return {
    action: SET_LOADING_AUTH
  }
}
