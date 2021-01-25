import AccountTypeModel from '../Model/AccountTypeModel.js'
import { validationResult } from 'express-validator';


// route    /franchise/account-type
// desc     GET Get account type
// access   Public
export const getAccountType = async (req, res) => {
   try {
      let accountType = await AccountTypeModel.find().sort({ updatedAt: -1 })
      res.json({
         count: accountType.length,
         success: true,
         accountType
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: `Server Error: ${error.message}`
      })
   }
}


// route    /franchise/account-type
// desc     POST Add account type
// access   Private Admin
export const addAccountType = async (req, res) => {
   try {

      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            msg: errors.array()
         })
      }
      let { account_type, user_debit, non_user_debit, profit_rate } = req.body

      let checkAccount = await AccountTypeModel.findOne({ account_type: account_type.toUpperCase() })
      if (checkAccount) return res.status(400).json({
         msg: `${account_type} exists...`
      })

      let newAccountType = new AccountTypeModel({ account_type: account_type.toUpperCase(), user_debit: Number(user_debit).toFixed(2), non_user_debit: Number(non_user_debit).toFixed(2), profit_rate: Number(profit_rate).toFixed(2) })
      await newAccountType.save()
      res.json({
         msg: `${account_type} added`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: `Server Error: ${error.message}`
      })
   }
}

// route    /franchise/account-type/user-debit/:account_slug
// desc     PATCH Change user-debit value
// access   Private Admin
export const editUserDebitValue = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            msg: errors.array()
         })
      }
      let { account_slug } = req.params

      let checkParams = await AccountTypeModel.findOne({ account_slug })
      if (!checkParams) return res.status(400).json({
         msg: `${account_slug} does not exist...`
      })
      let { user_debit } = req.body

      let updateValue = await AccountTypeModel.findOneAndUpdate({ account_slug }, { user_debit: Number(user_debit) })

      res.json({
         msg: `${updateValue.account_type} User Debit Value Updated to $'{user_debit}'`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: `Server Error: ${error.message}`
      })
   }
}


// route    /franchise/account-type/non-user-debit/:account_slug
// desc     PATCH Change non-user-debit value
// access   Private Admin
export const editNonUserDebitValue = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            msg: errors.array()
         })
      }
      let { account_slug } = req.params

      let checkParams = await AccountTypeModel.findOne({ account_slug })
      if (!checkParams) return res.status(400).json({
         msg: `${account_slug} does not exist...`
      })
      let { non_user_debit } = req.body

      let updateValue = await AccountTypeModel.findOneAndUpdate({ account_slug }, { non_user_debit: Number(non_user_debit) })

      res.json({
         msg: `${updateValue.account_type} Non User Debit Value Updated to $'{non_user_debit}'`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: `Server Error: ${error.message}`
      })
   }
}