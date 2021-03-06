import BankUsersModel from "../Model/BankUsersModel.js";
import AccountCategoryModel from "../Model/AccountCategoryModel.js";
import AccountTypeModel from '../Model/AccountTypeModel.js'
import UserBVNModel from "../Model/UserBVNModel.js"
import { validationResult } from 'express-validator'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import BankStaffModel from "../Model/BankStaffModel.js";



// route    /franchise/account-user/register-user
// desc     POST Add User account
// access   Private Bank Staff
export const addBankUser = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            error: errors.array()
         })
      }

      let manager = await BankStaffModel.findById(req.bankStaff.id)

      let { lastName, firstName, dob, email, gender, telephone, address, mothers_lastName, mothers_firstName, mothers_telephone, avatar, occupation, bvn_number, account_type, account_category } = req.body

      let fullName = `${lastName} ${firstName}`
      let mothers_fullName = `${mothers_lastName} ${mothers_firstName}`

      let checkEmail = await BankUsersModel.findOne({ email })

      if (checkEmail) return res.status(400).json({
         error: [
            { msg: `${email} exists` }
         ]
      })

      let checkBVN = await UserBVNModel.findOne({ bvn_number })

      if (!checkBVN) return res.status(400).json({
         error: [
            { msg: `${bvn_number} does not exist...` }
         ]
      })

      if (checkBVN.email !== email) return res.status(400).json({
         error: [
            { msg: `${email} does not tally with bvn email` }
         ]
      })

      if (checkBVN.telephone !== telephone) return res.status(400).json({
         error: [
            { msg: `${telephone} does not tally with bvn telephone` }
         ]
      })

      let bvn_id = checkBVN._id

      let checkType = await AccountTypeModel.findById(account_type)

      if (!checkType) return res.status(400).json({
         error: [
            { msg: `${account_type} does not exist...` }
         ]
      })
      let account_type_name = checkType.account_type

      let checkCategory = await AccountCategoryModel.findById(account_category)

      if (!checkCategory) return res.status(400).json({
         error: [
            { msg: `${account_category} does not exist...` }
         ]
      })
      let account_category_name = checkCategory.category

      var account_number
      do {
         account_number = getAccountNumber(account_type_name)

         var checkAccountNumber = await BankUsersModel.findOne({ account_number })
      } while (checkAccountNumber)

      let verifyTelephone = await checkTelephone(account_type_name, telephone, account_category_name)

      if (verifyTelephone) return res.status(400).json({
         error: [
            { msg: `${telephone} exist for this type of account` }
         ]
      })


      let newBankUser = new BankUsersModel({ lastName: lastName.toUpperCase(), firstName: firstName.toUpperCase(), dob, email, gender: gender.toLowerCase(), telephone, address, mothers_lastName: mothers_lastName.toUpperCase(), mothers_firstName: mothers_firstName.toUpperCase(), mothers_telephone, avatar, occupation: occupation.toUpperCase(), bvn_id, account_type, account_category, bvn_number, account_type_name, account_category_name, account_number, mothers_fullName: mothers_fullName.toUpperCase(), fullName: fullName.toUpperCase(), telephone, manager: manager._id })

      await newBankUser.save()
      res.json({
         msg: `${fullName} enrolled...`,
         account_number
      })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


// route    /franchise/account-user/user-info
// desc     POST View User account
// access   Private Bank Staff
export const checkUser = async (req, res) => {
   try {
      let { email, account_number } = req.body

      if (!account_number && !email) return res.status(400).json({
         error: [
            { msg: "Please provide either account number or email" }
         ]
      })

      var user
      if (account_number) {
         user = await BankUsersModel.findOne({ account_number }).select('-password')
      } else {
         user = await BankUsersModel.findOne({ email }).select('-password')
      }

      if (!user) return res.status(400).json({
         error: [
            { msg: `${account_number ? account_number : email} does not exists` }
         ]
      })

      res.json({
         user
      })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


// route    /franchise/account-user/user-fullname
// desc     POST Verify User account
// access   Private Bank User
export const verifyUser = async (req, res) => {
   try {
      let { account_number } = req.body

      if (!account_number) return res.status(400).json({
         error: [
            { msg: "Please provide account number" }
         ]
      })

      var user = await BankUsersModel.findOne({ account_number }).select('-password')

      if (!user) return res.status(400).json({
         error: [
            { msg: `${account_number} does not exists` }
         ]
      })

      res.json({
         name: user.fullName
      })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}

// route    /franchise/account-user/register-user
// desc     PATCH Add Username and password to User account
// access   Private Bank User
export const addUserRegister = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let { account_number, username, password } = req.body

      let checkAccountNumber = await BankUsersModel.findOne({ account_number })
      if (!checkAccountNumber) return res.status(400).json({
         error: [
            { msg: `${account_number} does not exist...` }
         ]
      })

      let checkUserExist = await BankUsersModel.findOne({ username })
      if (checkUserExist) return res.status(400).json({
         error: [
            { msg: `${username} already exist in database, please choose another username` }
         ]
      })

      let checkUserName = checkAccountNumber.username
      if (checkUserName) return res.status(400).json({
         error: [
            { msg: `${checkAccountNumber.fullName} already added username and password` }
         ]
      })

      do {
         var token = getToken()
         var checkToken = await BankUsersModel.findOne({ token })
      } while (checkToken);

      await BankUsersModel.findOneAndUpdate({ account_number }, { token, initPassword: password, initUsername: username })

      res.json({
         msg: `Please check your phone number and fill in token sent there in`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


// route    /franchise/account-user/verify-token
// desc     POST Verify token
// access   Private Bank User
export const verifyToken = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let { token } = req.body

      let checkToken = await BankUsersModel.findOne({ token })

      if (!checkToken) return res.status(400).json({
         error: [
            { msg: "Invalid token" }
         ]
      })

      // Create salt && hash
      // Encrypt password
      let salt = await bcrypt.genSalt(10)
      // Save password
      let savePassword = await bcrypt.hash(checkToken.initPassword, salt)
      // Save data in database

      let updatedData = await BankUsersModel.findByIdAndUpdate({ _id: checkToken._id }, { username: checkToken.initUsername, password: savePassword, token: '', initPassword: '', initUsername: '' })

      let newUser = await BankUsersModel.findById(updatedData._id)

      // Create jwt to auth
      const accesstoken = createAccessToken({ id: newUser._id })
      res.json({
         token: accesstoken,
         msg: `Welcome ${newUser.username}`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


// route    /franchise/account-user/login-user
// desc     POST Login User to User account
// access   Public
export const loginUsers = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let { username, password } = req.body

      let userData = await BankUsersModel.findOne({ username })

      // If no user in db
      if (!userData) return res.status(400).json({
         error: [
            { msg: 'User does not exist...' }
         ]
      })

      // Know user found by email, comparing password
      let isMatch = await bcrypt.compare(password, userData.password)

      // If error
      if (!isMatch) return res.status(400).json({
         error: [
            { msg: 'Invalid password...' }
         ]
      })


      // If login success, create accesstoken and refreshtoken
      const accesstoken = createAccessToken({ id: userData._id })

      res.json({
         token: accesstoken,
         msg: `Welcome ${userData.username}`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


// route    /franchise/account-user/user-info
// desc     GET Get User detail
// access   Private Bank User
export const getUserDetails = async (req, res) => {
   try {
      let user = await BankUsersModel.findById(req.bankUser.id).select("-password -token -initPassword -initUsername -ussd_pin -atm_pin, -atm_cvv, -atm_expiry")

      if (!user) return res.status(400).json({
         error: [
            { msg: "User does not exist" }
         ]
      })

      res.json({ user })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}

// route    /franchise/account-user/atm-pin
// desc     POST Add atm pin
// access   Private Bank User
export const addUserATMPin = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let { atm_pin, atm_number } = req.body

      let user = await BankUsersModel.findOne({ atm_number })

      if (!user) return res.status(400).json({
         error: [
            { msg: `User not found` }
         ]
      })

      let checkPin = user.atm_pin
      if (checkPin) return res.status(400).json({
         error: [
            { msg: `${user.fullName} already registered a pin to atm` }
         ]
      })

      // Create salt && hash
      // Encrypt password
      let salt = await bcrypt.genSalt(10)
      // Save password
      let saveAtmPin = await bcrypt.hash(atm_pin, salt)
      // Save data in database

      let updatedData = await BankUsersModel.findByIdAndUpdate({ _id: user._id }, { atm_pin: saveAtmPin })

      res.json({
         msg: `${updatedData.fullName} atm pin added`
      })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


// route    /franchise/account-user/login-atm-pin
// desc     POST Login User to Use ATM
// access   Public
export const loginUsersWithATMPin = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let { atm_pin, atm_number } = req.body

      let userData = await BankUsersModel.findOne({ atm_number })

      // If no user in db
      if (!userData) return res.status(400).json({
         error: [
            { msg: 'User does not exist...' }
         ]
      })

      let dateNow = new Date()
      var checkDate = userData.atm_expiry > dateNow

      if (!checkDate) return res.status(400).json({
         error: [
            { msg: `ATM card has expired...` }
         ]
      })

      // Know user found by email, comparing atm_pin
      let isMatch = await bcrypt.compare(atm_pin, userData.atm_pin)

      // If error
      if (!isMatch) return res.status(400).json({
         error: [
            { msg: 'Invalid ATM Pin...' }
         ]
      })


      // If login success, create accesstoken and refreshtoken
      const accesstoken = createATMAccessToken({ id: userData._id })

      res.json({
         token: accesstoken,
         msg: `Welcome ${userData.fullName}`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


// route    /franchise/account-user/soft-token
// desc     GET Generate soft token for user transaction
// access   Private User Mobile/App Access
export const generateToken = async (req, res) => {
   try {
      let user = await BankUsersModel.findById(req.bankUser.id)

      do {
         var token = getToken()
         var checkToken = await BankUsersModel.findOne({ token })
      } while (checkToken);

      await BankUsersModel.findByIdAndUpdate({ _id: user._id }, { token })

      res.json({ token })
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


// route    /franchise/account-user/my-manager
// desc     GET Generate my account manager
// access   Private User Mobile/App Access
export const getAccountManager = async (req, res) => {
   try {
      let user = await BankUsersModel.findById(req.bankUser.id)

      let myManager = user.manager
      let manager = await BankStaffModel.findById(myManager).select('-password -initUsername -initPassword -token')

      res.json({ manager })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


const createAccessToken = user => {
   return jwt.sign(user, process.env.Jwt_Secret_Users, { expiresIn: '2h' })
}

const createATMAccessToken = user => {
   return jwt.sign(user, process.env.Jwt_Secret_Users_ATM, { expiresIn: '2h' })
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

export const getAccountNumber = type => {
   let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
   let YearValue = new Date().getFullYear().toString()
   let YearString = YearValue.substr(2)
   var numb = []
   for (let i = 1; i <= 6; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')

   var prefix

   if (type === 'SAVINGS') {
      prefix = 0
   } else if (type === 'CURRENT') {
      prefix = 1
   } else if (type === 'FIXED-DEPOSIT') {
      prefix = 2
   }
   let finalValue = `0${prefix}${YearString}${semi}`

   return finalValue
}

export const getToken = () => {
   let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
   var numb = []
   for (let i = 1; i <= 6; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')
   let finalValue = `${semi}`

   return finalValue
}