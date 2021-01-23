import BankUsersModel from "../Model/BankUsersModel.js";
import AccountCategoryModel from "../Model/AccountCategoryModel.js";
import AccountTypeModel from '../Model/AccountTypeModel.js'
import UserBVNModel from "../Model/UserBVNModel.js"
import { validationResult } from 'express-validator'



// route    /love-link/account-user
// desc     POST Add User account
// access   Private Admin
export const addBankUser = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            msg: errors.array()
         })
      }

      let { lastName, firstName, dob, email, gender, telephone, address, mothers_lastName, mothers_firstName, mothers_dob, mothers_telephone, avatar, occupation, bvn_number, account_type, account_category } = req.body

      let fullName = `${lastName} ${firstName}`
      let mothers_fullName = `${mothers_lastName} ${mothers_firstName}`

      let checkEmail = await BankUsersModel.findOne({ email })

      if (checkEmail) return res.status(400).json({
         msg: `${email} exists`
      })

      let checkBVN = await UserBVNModel.findOne({ bvn_number })

      if (!checkBVN) return res.status(400).json({
         msg: `${bvn_number} does not exist...`
      })
      let bvn_id = checkBVN._id

      let checkType = await AccountTypeModel.findById(account_type)

      if (!checkType) return res.status(400).json({
         msg: `${account_type} does not exist...`
      })
      let account_type_name = checkType.account_type

      let checkCategory = await AccountCategoryModel.findById(account_category)

      if (!checkCategory) return res.status(400).json({
         msg: `${account_category} does not exist...`
      })
      let account_category_name = checkCategory.category

      var account_number
      do {
         account_number = getAccountNumber()

         var checkAccountNumber = await BankUsersModel.findOne({ account_number })
      } while (checkAccountNumber)

      let verifyTelephone = await checkTelephone(account_type_name, telephone, account_category_name)

      if (verifyTelephone) return res.status(400).json({
         msg: `${telephone} exist for this type of account`
      })


      let newBankUser = new BankUsersModel({ lastName: lastName.toUpperCase(), firstName: firstName.toUpperCase(), dob, email, gender: gender.toLowerCase(), telephone, address, mothers_lastName: mothers_lastName.toUpperCase(), mothers_firstName: mothers_firstName.toUpperCase(), mothers_dob, mothers_telephone, avatar, occupation: occupation.toUpperCase(), bvn_id, account_type, account_category, bvn_number, account_type_name, account_category_name, account_number, mothers_fullName: mothers_fullName.toUpperCase(), fullName: fullName.toUpperCase(), telephone })

      await newBankUser.save()
      res.json({
         msg: `${fullName} enrolled...`,
         account_number
      })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: "Server Error"
      })
   }
}


// route    /love-link/account-user/user-info
// desc     POST View User account
// access   Private Admin
export const checkUser = async (req, res) => {
   try {
      let { email, account_number } = req.body

      if (!account_number && !email) return res.status(400).json({
         msg: "Please provide either account number or email"
      })

      var sortUser
      if (account_number) {
         sortUser = await BankUsersModel.findOne({ account_number })
      } else {
         sortUser = await BankUsersModel.findOne({ email })
      }

      if (!sortUser) return res.status(400).json({
         msg: `${account_number ? account_number : email} does not exists`
      })

      res.json({
         user: sortUser
      })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: "Server Error"
      })
   }
}


// route    /love-link/account-user/user-info
// desc     GET Get User detail
// access   Private User
export const getUserDetails = async (req, res) => {
   try {
      let user = await BankUsersModel.findById(req.bankUser.id)

      if (!user) return res.status(400).json({
         msg: "User does not exist"
      })

      res.json({ user })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: "Server Error"
      })
   }
}


const checkTelephone = async (type, tele, category) => {
   try {
      let teleArr = await BankUsersModel.find()
      let sortArr = teleArr.map(item => type === item.account_type_name && item)
      let semiSort = sortArr.find(item => tele === item.telephone)
      let catSort = category === "STUDENT ACCOUNT" || category === "NORMAL ACCOUNT"
      let finalSort = semiSort && catSort


      return finalSort
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: "Server Error"
      })
   }
}

export const getAccountNumber = () => {
   let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
   let YearValue = new Date().getFullYear().toString()
   let YearString = YearValue.substr(2)
   var numb = []
   for (let i = 1; i <= 7; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')
   let finalValue = `0${YearString}${semi}`

   return finalValue
}