import axios from 'axios'
import config from '../../utils/config'
import {
  GET_RESERVATIONS_DATA,
  ERROR_RESERVATIONS,
  SET_LOADING_RESERVATIONS,
  GET_RESERVATIONS_BY_ID,
  GET_ALL_PASSENGERS
} from './types'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`

export const getReservations = (query) => async (dispatch) => {
  try {
    setLoading()
    query = (query && `reservations/all${query}`) || 'reservations/all'
    const res = await axios.get(config.DATA_URL.concat(query))
    dispatch({
      type: GET_RESERVATIONS_DATA,
      payload: {
        data: res.data.data,
        pageInfo: res.data.pageInfo
      }
    })
  } catch (error) {
    console.error('Error from Reservations ACtiond', error)
    dispatch({
      type: ERROR_RESERVATIONS,
      payload: error.response.data
    })
  }
}

export const getAllPassengers = (query) => async (dispatch) => {
  try {
    setLoading()
    query = (query && `reservations/all-passengers${query}`) || 'reservations/all-passengers'
    const result = await axios.get(config.DATA_URL.concat(query))
    dispatch({
      type: GET_ALL_PASSENGERS,
      payload: result.data.data
    })
  } catch (error) {
    dispatch({
      type: ERROR_RESERVATIONS,
      payload: error
    })
  }
}

export const getReservationById = (id) => async (dispatch) => {
  try {
    setLoading()
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    const res = await axios.get(config.DATA_URL.concat(`reservations/${id}`))
    dispatch({
      type: GET_RESERVATIONS_BY_ID,
      payload: res.data.data
    })
  } catch (error) {
    console.error('Error', error)
    dispatch({
      type: ERROR_RESERVATIONS,
      payload: error.response.data
    })
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING_RESERVATIONS
  }
}
