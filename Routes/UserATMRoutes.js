import express from 'express'
import { check } from 'express-validator'

import { destroyUserATM, registerUserATM } from '../Controllers/UserATMController.js'
import bankStaff from '../Middleware/BankStaffAuth.js'


const router = express.Router()

router.post('/register-atm',
   bankStaff,
   [
      check('account_number', 'Account Number required').notEmpty(),
      check('card_type', 'Card Type required').notEmpty(),
   ],
   registerUserATM)

router.post('/atm-destroy',
   bankStaff,
   [
      check('account_number', 'Account number required').notEmpty()
   ],
   destroyUserATM)

export default router