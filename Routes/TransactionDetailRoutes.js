import express from 'express'
import { check } from 'express-validator'
import { createDepositPayment, createOnlinePaymentWithATM, createTransferPayment, createTransferPaymentWithATM, createWithdrawalPayment, createWithdrawPaymentWithATM, createWithdrawPaymentAirtime, createWithdrawPaymentAirtimeWithATM } from '../Controllers/TransactionDetailController.js'
import bankStaffAuth from '../Middleware/BankStaffAuth.js'
import bankUsersAuth from '../Middleware/BankUserAuth.js'
import bankUsersPos from '../Middleware/BankUserPOSAuth.js'


const router = express.Router()

router.post('/send-money',
   bankUsersAuth,
   [
      check('transact_to', "Please specify account to transact with").notEmpty(),
      check('transact_amount', "Please specify amount to be sent").notEmpty()
   ],
   createTransferPayment)

router.post('/deposit-money',
   bankStaffAuth,
   [
      check('transact_to', "Please specify account to deposit to").notEmpty(),
      check('transact_from', "Please specify depositor's name").notEmpty(),
      check('transact_amount', "Please specify amount to be deposited").notEmpty()
   ],
   createDepositPayment)

router.post('/withdraw-money',
   bankStaffAuth,
   [
      check('account_number', "Please specify account to withdraw from").notEmpty(),
      check('transact_amount', "Please specify amount to be deposited").notEmpty()
   ],
   createWithdrawalPayment)

router.post('/withdraw-airtime',
   bankUsersAuth,
   [
      check('transact_amount', "Please specify amount to be recharged").notEmpty()
   ],
   createWithdrawPaymentAirtime)

router.post('/atm/withdraw-airtime',
   bankUsersPos,
   [
      check('transact_amount', "Please specify amount to be recharged").notEmpty()
   ],
   createWithdrawPaymentAirtimeWithATM)

router.post('/atm/withdraw-money',
   bankUsersPos,
   [
      check('account_type', "Please specify Account Type").notEmpty(),
      check('transact_amount', "Please specify amount to be deposited").notEmpty()
   ],
   createWithdrawPaymentWithATM)

router.post('/atm/send-money',
   bankUsersPos,
   [
      check('transact_to', "Please specify account to transact with").notEmpty(),
      check('account_type', "Please specify Account Type").notEmpty(),
      check('transact_amount', "Please specify amount to be sent").notEmpty(),
   ],
   createTransferPaymentWithATM)

router.post('/atm/online-payment',
   [
      check('atm_number', "ATM Number required").notEmpty(),
      check('atm_expiry', "ATM expiry required").notEmpty(),
      check('atm_cvv', "ATM Security code required").notEmpty(),
      check('atm_pin', "ATM pin required").notEmpty(),
      check('transact_amount', "Please specify amount to be sent").notEmpty()
   ],
   createOnlinePaymentWithATM)



export default router
