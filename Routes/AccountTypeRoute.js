import express from 'express'
import { check } from 'express-validator'

import { addAccountType, editNonUserDebitValue, editUserDebitValue, getAccountType } from '../Controllers/AccountTypeController.js'



const router = express.Router()


router.route('/')
   .get(getAccountType)
   .post(
      [
         check('account_type', 'Account type requried').not().isEmpty(),
         check('user_debit', 'Value to be charged on user transaction required').not().isEmpty(),
         check('non_user_debit', 'Value to be charged on non-user transaction required').not().isEmpty(),
         check('profit_rate', 'Profit rate required').not().isEmpty(),
      ], addAccountType)


router.patch('/user-debit/:account_slug',
   [
      check('user_debit', 'Please provide new value to update with').not().isEmpty()
   ], editUserDebitValue
)


router.patch('/non-user-debit/:account_slug',
   [
      check('non_user_debit', 'Please provide new value to update with').not().isEmpty()
   ], editNonUserDebitValue
)


export default router