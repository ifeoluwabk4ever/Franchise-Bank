// Root reducer to combine all reducers in the app

import { combineReducers } from 'redux'
import staff from './BankStaffReducer'
import users from './BankUserReducer'
import accCategory from './AccountCategoryReducer'
import accTypes from './AccountTypeReducer'

export default combineReducers({
   users,
   staff,
   accTypes,
   accCategory
})