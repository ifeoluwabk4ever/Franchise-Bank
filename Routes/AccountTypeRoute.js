import express from 'express'
import { check } from 'express-validator'

import { addAccountType, editNonUserDebitValue, editUserDebitValue, getAccountType } from '../Controllers/AccountTypeController.js'



const router = express.Router()


router.route('/account-type')
   .get(getAccountType)
   .post(
      [
         check('account_type', 'Account type requried').not().isEmpty(),
         check('user_debit', 'Value to be charged on user transaction requried').not().isEmpty(),
         check('non_user_debit', 'Value to be charged on non-user transaction requried').not().isEmpty(),
      ], addAccountType)


router.patch('/account-type/user-debit/:account_slug',
   [
      check('user_debit', 'Please provide new value to update with').not().isEmpty()
   ], editUserDebitValue
)


router.patch('/account-type/non-user-debit/:account_slug',
   [
      check('non_user_debit', 'Please provide new value to update with').not().isEmpty()
   ], editNonUserDebitValue
)


export default router