import express from 'express'
import { check } from 'express-validator'
import { createDepositPayment, createOnlinePaymentWithATM, createTransferPayment, createTransferPaymentWithATM, createWithdrawPaymentWithATM } from '../Controllers/TransactionDetailController.js'
import bankStaffAuth from '../Middleware/BankStaffAuth.js'
import bankUsersAuth from '../Middleware/BankUserAuth.js'
import bankUsersPos from '../Middleware/BankUserPOSAuth.js'


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

router.post('/withdraw-money-atm',
   bankUsersPos,
   [
      check('account_type', "Please specify Account Type").not().isEmpty(),
      check('transact_amount', "Please specify amount to be deposited").not().isEmpty()
   ],
   createWithdrawPaymentWithATM)

router.post('/atm-send-money',
   bankUsersPos,
   [
      check('transact_to', "Please specify account to transact with").not().isEmpty(),
      check('transact_amount', "Please specify amount to be sent").not().isEmpty()
   ],
   createTransferPaymentWithATM)

router.post('/atm-online-payment',
   [
      check('atm_number', "ATM Number required").notEmpty(),
      check('atm_expiry', "ATM expiry required").notEmpty(),
      check('atm_cvv', "ATM Security code required").notEmpty(),
      check('atm_pin', "ATM pin required").notEmpty(),
      check('transact_amount', "Please specify amount to be sent").notEmpty()
   ],
   createOnlinePaymentWithATM)



export default router
