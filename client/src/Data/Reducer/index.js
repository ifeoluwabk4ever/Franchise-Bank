// Root reducer to combine all reducers in the app

import { combineReducers } from 'redux'
import staff from './BankStaffReducer'
import users from './BankUserReducer'

export default combineReducers({
   users,
   staff,
})