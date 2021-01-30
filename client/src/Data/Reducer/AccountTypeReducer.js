import { GET_ACCTYPES, ADD_ACCTYPES, DELETE_ACCTYPES, ACCTYPES_LOADING, GET_ACCTYPES_FAIL, ADD_ACCTYPES_FAIL, DELETE_ACCTYPES_FAIL, UPDATE_ACCTYPES_FAIL, UPDATE_ACCTYPES } from '../Actions/ActionTypes'


// Initial State
let initialState = {
   acctypes: [],
   isLoading: false,
   isValid: null,
   isValidAuth: null
}

export default (state = initialState, action) => {
   let { payload, type } = action
   switch (type) {
      case GET_ACCTYPES:
         return {
            ...state,
            acctypes: payload,
            isValid: true,
            isLoading: false
         }
      case DELETE_ACCTYPES:
         return {
            ...state,
            acctypes: state.acctypes.filter(item => item.acctypes_id !== payload),
            isLoading: false,
            isValidAuth: true
         }
      case ADD_ACCTYPES:
         return {
            ...state,
            acctypes: [payload, ...state.acctypes],
            isValidAuth: true
         }
      case UPDATE_ACCTYPES:
         return {
            ...state,
            acctypes: [...state.acctypes],
            isValidAuth: true
         }
      case ACCTYPES_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ADD_ACCTYPES_FAIL:
      case DELETE_ACCTYPES_FAIL:
      case GET_ACCTYPES_FAIL:
      case UPDATE_ACCTYPES_FAIL:
         return {
            ...state,
            isLoading: false,
            isValid: false,
            isValidAuth: false,
         }
      default:
         return state
   }
}