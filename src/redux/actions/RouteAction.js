import axios from 'axios'
import swal from 'sweetalert'
import formSerialize from 'form-serialize'
import config from '../../utils/config'
import {
  GET_ALL_ROUTES,
  ADD_NEW_ROUTES,
  ERROR_ROUTES,
  SET_LOADING_ROUTES,
  TOOGLE_INSERT_MODAL
} from './types'
// Set Token
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
export const getAllRoutes = (query) => async (dispatch) => {
  try {
    setLoading()
    const token = `Bearer ${localStorage.getItem('token_user')}`
    const req = (query && `routes${query}`) || 'routes?limit=5'
    const res = await axios.get(config.DATA_URL.concat(req), {
      headers: { Authorization: `${token}` }
    })

    dispatch({
      type: GET_ALL_ROUTES,
      payload: {
        data: res.data.data,
        pageInfo: res.data.pageInfo
      }
    })
  } catch (error) {
    dispatch({
      type: ERROR_ROUTES,
      payload: error
    })
  }
}

export const addRoutes = (e) => async (dispatch) => {
  try {
    setLoading()
    e.preventDefault()
    const data = formSerialize(e.target, { hash: true })
    const token = `Bearer ${localStorage.getItem('token_user')}`
    const res = await axios.post(config.DATA_URL.concat('routes'), data, {
      headers: { Authorization: `${token}` }
    })
    if (res.status === 200) {
      swal('Success!', 'New route inserted!', 'success')
      dispatch({
        type: ADD_NEW_ROUTES,
        payload: res
      })
    } else {
      dispatch({
        type: ERROR_ROUTES,
        payload: res.status
      })
    }
  } catch (error) {
    dispatch({
      type: ERROR_ROUTES,
      payload: error.response.data
    })
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING_ROUTES
  }
}
export const toggleModal = () => {
  return {
    type: TOOGLE_INSERT_MODAL
  }
}
