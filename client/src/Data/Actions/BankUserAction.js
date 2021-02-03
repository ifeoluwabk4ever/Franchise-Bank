import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../Helpers/SetAuthToken'
import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING, USER_LOADED, LOGOUT, TRANSFER_FUND_FAIL, TRANSFER_FUND, VERIFY_TOKEN, VERIFY_TOKEN_FAIL, GENERATE_TOKEN, GENERATE_TOKEN_FAIL, GET_AIRTIME, GET_AIRTIME_FAIL, GET_MY_MANAGER, GET_MY_MANAGER_FAIL } from './ActionTypes'


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
export let registerBankUser = ({ firstName, lastName, email, telephone, dob, address, occupation, gender, bvn_number, account_category, account_type, mothers_firstName, mothers_lastName, mothers_telephone, avatar }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ firstName, lastName, email, telephone, dob, address, occupation, gender, bvn_number, account_category, account_type, mothers_firstName, mothers_lastName, mothers_telephone, avatar })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/franchise/account-user/register-user`, body, config)
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data.account_number
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

// Loading Airtime
export let loadUserAirtime = ({ transact_amount }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ transact_amount })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/franchise/withdraw-airtime`, body, config)
      dispatch({
         type: GET_AIRTIME,
         payload: res.data
      })
      dispatch(loadBankUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))

      dispatch({ type: GET_AIRTIME_FAIL })
   }
}

// User Generate Token Action
export let getGeneratedToken = () => async dispatch => {
   try {
      let res = await axios.get(`/franchise/account-user/soft-token`)
      dispatch({
         type: GENERATE_TOKEN,
         payload: res.data.token
      })
      dispatch(loadBankUser())
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => toast.error(error.msg))
      dispatch({ type: GENERATE_TOKEN_FAIL })
   }
}
// User Gets Manager Action
export let getMyManager = () => async dispatch => {
   try {
      let res = await axios.get(`/franchise/account-user/my-manager`)
      dispatch({
         type: GET_MY_MANAGER,
         payload: res.data.manager
      })
      dispatch(loadBankUser())
   } catch (err) {
      let errors = err.response.data.error
      if (errors) errors.forEach(error => console.log(error.msg))
      dispatch({ type: GET_MY_MANAGER_FAIL })
   }
}


// Logout Action
export let logout = () => async dispatch => {
   dispatch({ type: LOGOUT })
   toast.success("Logout success")
}