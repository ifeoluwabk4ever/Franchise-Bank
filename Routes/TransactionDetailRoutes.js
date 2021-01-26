import express from 'express'
import { check } from 'express-validator'
import { createDepositPayment, createTransferPayment } from '../Controllers/TransactionDetailController.js'
import bankStaffAuth from '../Middleware/BankStaffAuth.js'
import bankUsersAuth from '../Middleware/BankUserAuth.js'


const router = express.Router()

router.post('/send-money',
   bankUsersAuth,
   [
      check('transact_to', "Please specify account to transact with").not().isEmpty(),
      check('transact_amount', "Please specify amount to be sent").not().isEmpty()
   ],
   createTransferPayment)

router.post('/deposit-money',
   bankStaffAuth,
   [
      check('transact_to', "Please specify account to deposit to").not().isEmpty(),
      check('transact_from', "Please specify depositor's name").not().isEmpty(),
      check('transact_amount', "Please specify amount to be deposited").not().isEmpty()
   ],
   createDepositPayment)



export default router
