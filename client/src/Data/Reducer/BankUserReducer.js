import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, SET_LOADING, USER_LOADED, LOGOUT, TRANSFER_FUND, TRANSFER_FUND_FAIL, VERIFY_TOKEN, VERIFY_TOKEN_FAIL } from '../Actions/ActionTypes'

// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isLoading: null,
   isUser: null,
   isLoggedIn: null,
   isTransfer: null,
   isVerify: null,
   users: null
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
      case LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload,
            isLoggedIn: true
         }
      case REGISTER_FAIL:
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
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            users: null,
            isUser: false,
            isTransfer: false,
            isVerify: false,
            isLoggedIn: false,
            isLoading: false
         }
      default: return state
   }
}