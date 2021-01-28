import { STAFF_AUTH_ERROR, STAFF_LOGIN_FAIL, STAFF_LOGIN_SUCCESS, STAFF_REGISTER_FAIL, STAFF_REGISTER_SUCCESS, STAFF_SET_LOADING, STAFF_USER_LOADED, LOGOUT } from '../Actions/ActionTypes'

// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isLoading: null,
   isStaff: null,
   isLoggedIn: null,
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
      case STAFF_LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload,
            isLoggedIn: true
         }
      case STAFF_SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case STAFF_REGISTER_FAIL:
      case STAFF_LOGIN_FAIL:
      case STAFF_AUTH_ERROR:
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            bankStaff: null,
            isStaff: false,
            isLoggedIn: false,
            isLoading: false
         }
      default: return state
   }
}