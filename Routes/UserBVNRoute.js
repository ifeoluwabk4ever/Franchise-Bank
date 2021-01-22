import express from 'express'
import { check } from 'express-validator'

import { addUserBVN, getUserBVNDetail } from '../Controllers/UserBVNController.js'


const router = express.Router()

router.route('/enroll/user-bvn')
   .post(
      [
         check(['lastName', 'firstName'], 'Name is required').not().isEmpty(),
         check('email', 'Please included an email').isEmail(),
         check('telephone', 'Please include yor mobile number').not().isEmpty(),
         check('gender', 'Please specify your gender').not().isEmpty(),
         check('dob', 'Please specify your date of birth').not().isEmpty(),
         check('address', 'Please include an address').not().isEmpty(),
         check('avatar', 'Please include a passport photogragh').not().isEmpty()
      ], addUserBVN)
   .get(
      [
         check('bvn_number', 'BVN Number required').not().isEmpty()
      ], getUserBVNDetail)



export default router