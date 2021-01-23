import express from 'express'
import { check } from 'express-validator'

import { addBankUser, checkUser, getUserDetails } from '../Controllers/BankUsersController.js'


const router = express.Router()


router.post('/account-user',
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
   ], addBankUser)

router.route('/account-user/user-info')
   .post(checkUser)
   .get(getUserDetails)


export default router