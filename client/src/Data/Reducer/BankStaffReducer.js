import { STAFF_AUTH_ERROR, STAFF_LOGIN_FAIL, STAFF_LOGIN_SUCCESS, STAFF_REGISTER_FAIL, STAFF_REGISTER_SUCCESS, STAFF_SET_LOADING, STAFF_USER_LOADED, LOGOUT, STAFF_DEPOSIT_FUND_FAIL, STAFF_VERIFY_TOKEN, STAFF_VERIFY_TOKEN_FAIL, STAFF_DEPOSIT_FUND } from '../Actions/ActionTypes'

// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isLoading: null,
   isStaff: null,
   isLoggedIn: null,
   isDeposit: null,
   isVerify: null,
   isAdded: null,
   addedMsg: null,
   bankStaff: null
}

// Reducers
export default (state = initialState, action) => {
   let { type, payload } = action
   switch (type) {
      case STAFF_USER_LOADED:
         return {
            ...state,
            bankStaff: payload,
            isStaff: true,
            isLoading: false
         }
      case STAFF_REGISTER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            isAdded: true,
            addedMsg: payload
         }
      case STAFF_REGISTER_FAIL:
         return {
            ...state,
            isLoading: false,
            isAdded: false,
            addedMsg: null
         }
      case STAFF_LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload,
            isLoggedIn: true
         }
      case STAFF_LOGIN_FAIL:
         return {
            ...state,
            isLoggedIn: false,
            isLoading: false
         }
      case STAFF_DEPOSIT_FUND:
         return {
            ...state,
            ...payload,
            isDeposit: true
         }
      case STAFF_DEPOSIT_FUND_FAIL:
         return {
            ...state,
            ...payload,
            isDeposit: false,
            isLoading: false
         }
      case STAFF_VERIFY_TOKEN:
         return {
            ...state,
            ...payload,
            isVerify: true
         }
      case STAFF_VERIFY_TOKEN_FAIL:
         return {
            ...state,
            ...payload,
            isVerify: false,
            isLoading: false
         }
      case STAFF_SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case STAFF_AUTH_ERROR:
         return {
            ...state,
            bankStaff: null,
            isStaff: false,
            isDeposit: false,
            isVerify: false,
            isLoading: false,
            isAdded: false,
            addedMsg: null
         }
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            bankStaff: null,
            isStaff: false,
            isDeposit: false,
            isVerify: false,
            isLoggedIn: false,
            isAdded: false,
            addedMsg: null,
            isLoading: false
         }
      default: return state
   }
}