import AccountCategoryModel from "../Model/AccountCategoryModel.js";
import { validationResult } from 'express-validator'




// route    /franchise/account-category
// desc     POST Add account category
// access   Private Bank Admin
export const addAccountCategory = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            msg: errors.array()
         })
      }

      let { category, user_limit, credit_limit, debit_limit } = req.body

      let checkCategory = await AccountCategoryModel.findOne({ category: category.toUpperCase() })

      if (checkCategory) return res.status(400).json({
         msg: `${category} exist...`
      })



      let newAccountCategory = new AccountCategoryModel({ category: category.toUpperCase(), user_limit: user_limit ? Number(user_limit) : 1, credit_limit: credit_limit ? Number(credit_limit).toFixed(2) : '', debit_limit: debit_limit ? Number(debit_limit).toFixed(2) : '' })
      await newAccountCategory.save()

      res.json({
         msg: `${category} created...`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: `Server Error: ${error.message}`
      })
   }
}


// route    /franchise/account-category
// desc     GET Get account category
// access   Public
export const getAccountCategory = async (req, res) => {
   try {
      let allAccountCategory = await AccountCategoryModel.find().sort({ updatedAt: -1 })
      res.json({
         success: true,
         count: allAccountCategory.length,
         allAccountCategory
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: `Server Error: ${error.message}`
      })
   }
}