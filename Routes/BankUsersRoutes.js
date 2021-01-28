import express from 'express'
import { check } from 'express-validator'

import { addBankUser, addUserRegister, checkUser, getUserDetails, loginUsers, verifyToken, verifyUser } from '../Controllers/BankUsersController.js'
import bankStaffAuth from '../Middleware/BankStaffAuth.js'
import bankUsersAuth from '../Middleware/BankUserAuth.js'


const router = express.Router()


router.route('/register-user')
   .post(
      [
         check(['lastName', 'firstName'], 'Name is required').not().isEmpty(),
         check('email', 'Please included an email').isEmail(),
         check('telephone', 'Please include user mobile number').not().isEmpty(),
         check('gender', 'Please specify user gender').not().isEmpty(),
         check('dob', 'Please specify user date of birth').not().isDate(),
         check('address', 'Please include an address').not().isEmpty(),
         check(['mothers_lastName', 'mothers_firstName'], "Mother's Name is required").not().isEmpty(),
         check('mothers_telephone', "Mother's mobile number is required").not().isEmpty(),
         check('mothers_dob', "Mother's date of birth required").not().isDate(),
         check('avatar', 'Please include a passport photogragh').not().isEmpty(),
         check('occupation', 'Please specify user occupation').not().isEmpty(),
         check('account_category', 'Please specify account category').not().isEmpty(),
         check('account_type', 'Please specify account type').not().isEmpty(),
         check('bvn_number', 'Please included BVN Number').not().isEmpty()
      ], bankStaffAuth, addBankUser)
   .patch(
      [
         check('username', 'Username required').not().isEmpty(),
         check('account_number', 'Account Number required').not().isEmpty(),
         check('password', 'Password too weak, required to be 6 or more').isLength({ min: 6 })
      ], addUserRegister
   )

router.post('/user-fullname', bankUsersAuth, verifyUser)
router.post('/verify-token',
   [
      check('token', "Token required to be 6 digits").isLength({
         min: 6, max: 6
      })
   ], verifyToken)

router.post('/login-user',
   [
      check('username', 'Username required').not().isEmpty(),
      check('password', 'Password required').not().isEmpty()
   ], loginUsers)

router.route('/user-info')
   .post(bankStaffAuth, checkUser)
   .get(bankUsersAuth, getUserDetails)


export default router