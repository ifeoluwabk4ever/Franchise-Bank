import express from 'express'
import { check } from 'express-validator'


import { addBankStaff, getStaffDetails, loginStaff, registerPassword } from '../Controllers/BankStaffController.js'
import BankAdminStaffAuth from '../Middleware/BankAdminStaffAuth.js'
import staffAuth from '../Middleware/BankStaffAuth.js'



const router = express.Router()


router.post('/register-staff',
   staffAuth, BankAdminStaffAuth,
   [
      check(['lastName', 'firstName'], 'Name is required').not().isEmpty(),
      check('email', 'Please included an email').isEmail(),
      check('telephone', 'Please include user mobile number').not().isEmpty(),
      check('gender', 'Please specify user gender').not().isEmpty(),
      check('dob', 'Please specify user date of birth').not().isDate(),
      check('address', 'Please include an address').not().isEmpty(),
      check('avatar', 'Please include a passport photogragh').not().isEmpty(),
      check('account_number', 'Please specify user account number').not().isEmpty(),
      check('telephone', 'Please specify user mobile number').not().isEmpty(),
   ], addBankStaff)

router.patch('/register-password',
   [
      check('staffID', 'Name is required').not().isEmpty(),
      check('password', 'Password required, 6 or more characters').isLength({ min: 6 })
   ], registerPassword)

router.post('/login', loginStaff)

router.get('/staff-info', staffAuth, getStaffDetails)


export default router