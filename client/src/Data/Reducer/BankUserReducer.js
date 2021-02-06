import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING, USER_LOADED, LOGOUT, TRANSFER_FUND, TRANSFER_FUND_FAIL, VERIFY_TOKEN, VERIFY_TOKEN_FAIL, GENERATE_TOKEN, GENERATE_TOKEN_FAIL, GET_AIRTIME, GET_AIRTIME_FAIL, GET_MY_MANAGER, GET_MY_MANAGER_FAIL } from '../Actions/ActionTypes'

// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isLoading: null,
   isUser: null,
   isLoggedIn: null,
   isTransfer: null,
   isTokenGen: null,
   isAirtime: null,
   isVerify: null,
   isAdded: null,
   isManager: null,
   genToken: null,
   addedMsg: null,
   users: null,
   manager: null
}

// Reducers
export default (state = initialState, action) => {
   let { type, payload } = action
   switch (type) {
      case USER_LOADED:
         return {
            ...state,
            users: payload,
            isUser: true,
            isLoading: false
         }
      case REGISTER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            isAdded: true,
            addedMsg: payload
         }
      case REGISTER_FAIL:
         return {
            ...state,
            isLoading: false,
            isAdded: false,
            addedMsg: null
         }
      case LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload,
            isLoggedIn: true
         }
      case LOGIN_FAIL:
         return {
            ...state,
            isLoggedIn: false,
            isLoading: false
         }
      case SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case TRANSFER_FUND:
         return {
            ...state,
            ...payload,
            isTransfer: true
         }
      case TRANSFER_FUND_FAIL:
         return {
            ...state,
            ...payload,
            isTransfer: false,
            isLoading: false
         }
      case GET_AIRTIME:
         return {
            ...state,
            ...payload,
            isAirtime: true
         }
      case GET_AIRTIME_FAIL:
         return {
            ...state,
            ...payload,
            isAirtime: false,
            isLoading: false
         }
      case GENERATE_TOKEN:
         return {
            ...state,
            ...payload,
            genToken: payload,
            isTokenGen: true
         }
      case GENERATE_TOKEN_FAIL:
         return {
            ...state,
            ...payload,
            isTokenGen: false,
            isLoading: false,
            genToken: null
         }
      case GET_MY_MANAGER:
         return {
            ...state,
            ...payload,
            manager: payload,
            isManager: true
         }
      case GET_MY_MANAGER_FAIL:
         return {
            ...state,
            ...payload,
            isManager: false,
            isLoading: false,
            manager: null
         }
      case VERIFY_TOKEN:
         return {
            ...state,
            ...payload,
            isVerify: true
         }
      case VERIFY_TOKEN_FAIL:
         return {
            ...state,
            ...payload,
            isVerify: false,
            isLoading: false
         }
      case AUTH_ERROR:
         return {
            ...state,
            users: null,
            manager: null,
            isUser: false,
            isTransfer: false,
            isVerify: false,
            isTokenGen: false,
            isAirtime: false,
            isManager: false,
            genToken: null,
            isLoading: false
         }
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            users: null,
            manager: null,
            isUser: false,
            isTransfer: false,
            isVerify: false,
            isTokenGen: false,
            isAirtime: false,
            isManager: false,
            genToken: null,
            isLoggedIn: false,
            isLoading: false
         }
      default: return state
   }
}