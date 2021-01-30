import { GET_ACCCATEGORY, ADD_ACCCATEGORY, DELETE_ACCCATEGORY, ACCCATEGORY_LOADING, GET_ACCCATEGORY_FAIL, ADD_ACCCATEGORY_FAIL, DELETE_ACCCATEGORY_FAIL, UPDATE_ACCCATEGORY_FAIL, UPDATE_ACCCATEGORY } from '../Actions/ActionTypes'


// Initial State
let initialState = {
   acccategory: [],
   isLoading: false,
   isValid: null,
   isValidAuth: null
}

export default (state = initialState, action) => {
   let { payload, type } = action
   switch (type) {
      case GET_ACCCATEGORY:
         return {
            ...state,
            acccategory: payload,
            isValid: true,
            isLoading: false
         }
      case DELETE_ACCCATEGORY:
         return {
            ...state,
            acccategory: state.acccategory.filter(item => item.acccategory_id !== payload),
            isLoading: false,
            isValidAuth: true
         }
      case ADD_ACCCATEGORY:
         return {
            ...state,
            acccategory: [payload, ...state.acccategory],
            isValidAuth: true
         }
      case UPDATE_ACCCATEGORY:
         return {
            ...state,
            acccategory: [...state.acccategory],
            isValidAuth: true
         }
      case ACCCATEGORY_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ADD_ACCCATEGORY_FAIL:
      case DELETE_ACCCATEGORY_FAIL:
      case GET_ACCCATEGORY_FAIL:
      case UPDATE_ACCCATEGORY_FAIL:
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