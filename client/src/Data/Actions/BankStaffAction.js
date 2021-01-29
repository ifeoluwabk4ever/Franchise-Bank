import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../Helpers/SetAuthToken'
import { STAFF_AUTH_ERROR, STAFF_LOGIN_FAIL, STAFF_LOGIN_SUCCESS, STAFF_REGISTER_FAIL, STAFF_REGISTER_SUCCESS, STAFF_SET_LOADING, STAFF_USER_LOADED, LOGOUT, STAFF_VERIFY_TOKEN, STAFF_VERIFY_TOKEN_FAIL } from './ActionTypes'


// LoadUser Action
export let loadBankStaff = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }

   try {
      let res = await axios.get(`/franchise/staff/staff-info`)
      dispatch({
         type: STAFF_USER_LOADED,
         payload: res.data.user
      })
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => console.log(error.msg))
      dispatch({ type: STAFF_AUTH_ERROR })

   }
}


// Register Action
export let registerBankStaff = ({ firstName, lastName, email, telephone, dob, avatar, department, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ firstName, lastName, email, telephone, dob, avatar, department, password })

   dispatch({ type: STAFF_SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/franchise/staff/register-staff`, body, config)
      dispatch({
         type: STAFF_REGISTER_SUCCESS,
         payload: res.data
      })
      dispatch(loadBankStaff())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: STAFF_REGISTER_FAIL })
   }
}


// Login Action
export let loginBankStaff = ({ staffID, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ staffID, password })

   dispatch({ type: STAFF_SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/franchise/staff/login`, body, config)
      dispatch({
         type: STAFF_LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadBankStaff())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: STAFF_LOGIN_FAIL })
   }
}

// Staff Personal Final Registration Action
export let registerPasswordBankStaff = ({ staffID, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ staffID, password })

   dispatch({ type: STAFF_SET_LOADING })
   try {
      // Response
      let res = await axios.patch(`/franchise/staff/register-staff`, body, config)
      dispatch({
         type: STAFF_VERIFY_TOKEN,
         payload: res.data
      })
      dispatch(loadBankStaff())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: STAFF_VERIFY_TOKEN_FAIL })
   }
}

// Staff Personal Final Token Verification Action
export let verifyTokenBankUser = ({ token }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ token })

   dispatch({ type: STAFF_SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/franchise/staff/verify-token`, body, config)
      dispatch({
         type: STAFF_LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadBankStaff())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: STAFF_LOGIN_FAIL })
   }
}


// Logout Action
export let logout = () => async dispatch => {
   dispatch({ type: LOGOUT })
   toast.success("Logout success")
}