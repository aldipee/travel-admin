import axios from 'axios'
import { GET_ALL_TOPUP, APPROVE_TOPUP } from '../actions/types'
import config from '../../utils/config'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`

export const getAllTopUp = (query) => async (dispatch) => {
  try {
    query = (query && `topup/${query}`) || 'topup?limit=5'
    const res = await axios.get(config.DATA_URL.concat(query))
    dispatch({
      type: GET_ALL_TOPUP,
      payload: {
        data: res.data.data,
        pageInfo: res.data.pageInfo
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const approveTopUp = (id, callback) => async (dispatch) => {
  try {
    let query = `topup/${id}`
    const res = await axios.patch(config.DATA_URL.concat(query))
    if (res.data.success) {
      dispatch({
        type: APPROVE_TOPUP,
        payload: {
          data: res.data.data
        }
      })
      callback(true)
    } else {
      callback(false)
    }
  } catch (error) {
    console.log(error)
  }
}
