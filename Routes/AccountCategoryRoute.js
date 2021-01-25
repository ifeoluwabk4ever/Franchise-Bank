import express from 'express'
import { check } from 'express-validator'

import { addAccountCategory, getAccountCategory } from '../Controllers/AccountCategoryController.js'

const router = express.Router()

router.route('/account-category')
   .get(getAccountCategory)
   .post(
      [
         check('category', 'Category required').not().isEmpty()
      ], addAccountCategory)



export default router