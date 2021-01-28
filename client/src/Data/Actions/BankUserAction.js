import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../Helpers/SetAuthToken'
import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING, USER_LOADED, LOGOUT, TRANSFER_FUND_FAIL, TRANSFER_FUND, VERIFY_TOKEN, VERIFY_TOKEN_FAIL } from './ActionTypes'


// LoadUser Action
export let loadBankUser = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }

   try {
      let res = await axios.get(`/franchise/account-user/user-info`)
      dispatch({
         type: USER_LOADED,
         payload: res.data.user
      })
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => console.log(error.msg))
      dispatch({ type: AUTH_ERROR })

   }
}


// Register Action
export let registerBankUser = ({ firstName, lastName, email, telephone, dob, avatar, department, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ firstName, lastName, email, telephone, dob, avatar, department, password })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/franchise/account-user/register-user`, body, config)
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
      })
      dispatch(loadBankUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: REGISTER_FAIL })
   }
}


// Login Action
export let loginBankUser = ({ username, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ username, password })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/franchise/account-user/login-user`, body, config)
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadBankUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: LOGIN_FAIL })
   }
}

// User Personal Final Registration Action
export let registerPasswordBankUser = ({ account_number, username, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ account_number, username, password })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.patch(`/franchise/account-user/register-user`, body, config)
      dispatch({
         type: VERIFY_TOKEN,
         payload: res.data
      })
      dispatch(loadBankUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: VERIFY_TOKEN_FAIL })
   }
}

// User Personal Final Token Verification Action
export let verifyTokenBankUser = ({ token }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ token })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/franchise/account-user/verify-token`, body, config)
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadBankUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: LOGIN_FAIL })
   }
}

// Transfer fund
export let createUserPayment = ({ transact_to, transact_amount }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ transact_to, transact_amount })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/franchise/send-money`, body, config)
      dispatch({
         type: TRANSFER_FUND,
         payload: res.data
      })
      dispatch(loadBankUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: TRANSFER_FUND_FAIL })
   }
}


// Logout Action
export let logout = () => async dispatch => {
   dispatch({ type: LOGOUT })
   toast.success("Logout success")
}