import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import BankStaffModel from "../Model/BankStaffModel.js";
import BankUsersModel from "../Model/BankUsersModel.js";
import { getToken } from "./BankUsersController.js";
import MainBankDetailModel from "../Model/MainBankDetailModel.js";
import { getTransactionID } from './TransactionDetailController.js'
import TransactionDetailModel from "../Model/TransactionDetailModel.js";


// route    /franchise/staff/register-staff
// desc     POST Add Staff account
// access   Private Bank Admin
export const addBankStaff = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            error: errors.array()
         })
      }

      let manager = await BankStaffModel.findById(req.bankStaff.id)

      let { lastName, firstName, dob, email, gender, telephone, address, avatar, account_number } = req.body

      let fullName = `${lastName} ${firstName}`

      let checkEmail = await BankStaffModel.findOne({ email })
      if (checkEmail) return res.status(400).json({
         error: [
            { msg: `${email} exists...` }
         ]
      })

      let checkAccountNumber = await BankUsersModel.findOne({ account_number })
      if (!checkAccountNumber) return res.status(400).json({
         error: [
            { msg: `${account_number} does not exists...` }
         ]
      })

      if (checkAccountNumber.fullName !== fullName.toUpperCase()) return res.status(400).json({
         error: [
            { msg: `${fullName} does not tally with account fullName` }
         ]
      })

      if (checkAccountNumber.email !== email) return res.status(400).json({
         error: [
            { msg: `${email} does not tally with account email` }
         ]
      })

      if (checkAccountNumber.telephone !== telephone) return res.status(400).json({
         error: [
            { msg: `${telephone} does not tally with account telephone` }
         ]
      })

      let checkAccountNumber2 = await BankStaffModel.findOne({ account_number })
      if (checkAccountNumber2) return res.status(400).json({
         error: [
            { msg: `${account_number} exists for another staff...` }
         ]
      })

      let checkTelephone = await BankStaffModel.findOne({ telephone })
      if (checkTelephone) return res.status(400).json({
         error: [
            { msg: `${telephone} exists...` }
         ]
      })

      let account_id = checkAccountNumber._id

      do {
         var staffID = getStaffID()
         var checkStaffID = await BankStaffModel.findOne({ staffID })
      } while (checkStaffID);


      let newBankStaff = new BankStaffModel({ lastName: lastName.toUpperCase(), firstName: firstName.toUpperCase(), dob, email, gender: gender.toLowerCase(), telephone, address, avatar, account_number, fullName: fullName.toUpperCase(), telephone, account_id, staffID, enrolled_by: manager._id, avatar })

      await newBankStaff.save()

      res.json({
         msg: `${fullName} enrolled...`,
         staffID
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


// route    /franchise/staff/staff-info
// desc     GET Get staff details info
// access   Private Bank Staff
export const getStaffDetails = async (req, res) => {
   try {
      let user = await BankStaffModel.findById(req.bankStaff.id).select('-password -initUsername -initPassword -token')

      if (!user) return res.status(400).json({
         error: [
            { msg: "User does not exist..." }
         ]
      })

      res.json({ user })
   } catch (error) {
      console.log(error.message);
      return res.json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}


// route    /franchise/staff/login
// desc     POST Login Staff
// access   Public
export const loginStaff = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let { staffID, password } = req.body

      // Find user
      let user = await BankStaffModel.findOne({ staffID })

      // If no user in db
      if (!user) return res.status(400).json({
         error: [
            { msg: 'User does not exist...' }
         ]
      })

      // Know user found by email, comparing password
      let isMatch = await bcrypt.compare(password, user.password)

      // If error
      if (!isMatch) return res.status(400).json({
         error: [
            { msg: 'Invalid password...' }
         ]
      })


      // If login success, create accesstoken and refreshtoken
      const accesstoken = createAccessToken({ id: user._id })

      res.json({
         token: accesstoken,
         msg: `Welcome ${user.fullName}`
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


// route    /franchise/staff/register-staff
// desc     PATCH Register Staff password
// access   Public
export const registerPassword = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let { staffID, password } = req.body

      let checkStaffID = await BankStaffModel.findOne({ staffID })

      if (!checkStaffID) return res.status(400).json({
         error: [
            { msg: `${staffID} invalid...` }
         ]
      })

      let verifyPassword = checkStaffID.password
      if (verifyPassword) return res.status(400).json({
         error: [
            { msg: `${checkStaffID.fullName} has an existing password` }
         ]
      })

      do {
         var token = getToken()
         var checkToken = await BankStaffModel.findOne({ token })
      } while (checkToken);

      await BankStaffModel.findOneAndUpdate({ staffID }, { token, initPassword: password })

      res.json({
         msg: `Please check your phone number and fill in token sent there in`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(400).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}

// route    /franchise/staff/verify-token
// desc     POST Verify token
// access   Private Bank User
export const verifyToken = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let { token } = req.body

      let checkToken = await BankStaffModel.findOne({ token })

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

      let updatedData = await BankStaffModel.findByIdAndUpdate({ _id: checkToken._id }, { password: savePassword, token: '', initPassword: '' })

      let newUser = await BankStaffModel.findById(updatedData._id)

      // Create jwt to auth
      const accesstoken = createAccessToken({ id: newUser._id })
      res.json({
         token: accesstoken,
         msg: `Welcome ${newUser.fullName}`
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

// desc     Pay Workers Salary
// access   Self invoking function based on day of month
const salaryPayment = async () => {
   try {
      let allStaff = await BankStaffModel.find()
      let totalSalary = allStaff.reduce((r, a) => {
         return r += a.salary
      }, 0)

      var hqName = await MainBankDetailModel.findOne({ name: "FRANCHISE BANK" })

      let mainSalary = hqName.salary

      var isFull = mainSalary > totalSalary
      // var isFull = false
      var isHalf = mainSalary > Number(totalSalary / 2)
      // var isHalf = false
      var isQuarter = mainSalary > Number(totalSalary / 4)
      // var isQuarter = false

      let month = new Date().getMonth()


      if (isFull) {
         let allStaffAccount = allStaff.map(item => {
            return item.account_id
         })

         for (let i = 0; i < allStaffAccount.length; i++) {
            let userAcct = await BankUsersModel.findById(allStaffAccount[i]).select('account_balance account_number fullName history')

            let userSal = allStaff.filter(item =>
               item.account_id === allStaffAccount[i]
            )

            let finalUserSal = userSal.map(item => item.salary).toString()

            let userAcctTotal = userAcct.account_balance

            let finalTotal = Number(Number(userAcctTotal) + Number(finalUserSal))

            let transact_amount_from = `NGN ${Number(finalUserSal).toFixed(2)}`

            let transact_amount_to = `NGN ${Number(finalUserSal).toFixed(2)} Cr`

            let desc = `Full Salary of ${month} FROM 'FRANCHISE BANK' TO ${userAcct.account_number}-${userAcct.fullName}`

            do {
               var transactionID = getTransactionID('Salary')
               var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
            } while (checkTransactionID);


            let newTransaction = new TransactionDetailModel({
               transactionID, transact_amount_from, transact_amount_to, desc, transact_from: "FRANCHISE BANK", transact_to: userAcct.fullName, transact_amount: Number(finalUserSal).toFixed(2), auth: hqName._id
            })
            await newTransaction.save()

            let historyTo = {
               _id: newTransaction._id, transactionID, transact_amount_to, desc, transact_amount: `NGN ${Number(finalUserSal).toFixed(2)}`, available: `NGN ${Number(finalTotal).toFixed(2)}`, transact_type: 'Cr', time: newTransaction.createdAt
            }

            await BankUsersModel.findByIdAndUpdate({ _id: allStaffAccount[i] }, { account_balance: finalTotal, history: [historyTo, ...userAcct.history] })
         }

         let isFullTotal = Number(mainSalary - totalSalary)
         await MainBankDetailModel.findOneAndUpdate({ name: "FRANCHISE BANK" }, { salary: Number(isFullTotal), salaryHistory: [{ isPaid: isFull, type: 'Full Payment', month, totalPaid: Number(totalSalary), datePaid: new Date() }, ...hqName.salaryHistory] })

      } else if (isHalf) {
         let allStaffAccount = allStaff.map(item => {
            return item.account_id
         })

         for (let i = 0; i < allStaffAccount.length; i++) {
            let userAcct = await BankUsersModel.findById(allStaffAccount[i]).select('account_balance account_number fullName history')

            let userSal = allStaff.filter(item =>
               item.account_id === allStaffAccount[i]
            )

            let finalUserSal = userSal.map(item => item.salary).toString()

            let userAcctTotal = userAcct.account_balance

            let finalTotal = Number(Number(userAcctTotal) + Number(finalUserSal / 2))

            let transact_amount_from = `NGN ${Number(finalUserSal / 2).toFixed(2)}`

            let transact_amount_to = `NGN ${Number(finalUserSal / 2).toFixed(2)} Cr`

            let desc = `Half Salary of ${month} FROM 'FRANCHISE BANK' TO ${userAcct.account_number}-${userAcct.fullName}`

            do {
               var transactionID = getTransactionID('Salary')
               var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
            } while (checkTransactionID);


            let newTransaction = new TransactionDetailModel({
               transactionID, transact_amount_from, transact_amount_to, desc, transact_from: "FRANCHISE BANK", transact_to: userAcct.fullName, transact_amount: Number(finalUserSal / 2).toFixed(2), auth: hqName._id
            })
            await newTransaction.save()

            let historyTo = {
               _id: newTransaction._id, transactionID, transact_amount_to, desc, transact_amount: `NGN ${Number(finalUserSal / 2).toFixed(2)}`, available: `NGN ${Number(finalTotal).toFixed(2)}`, transact_type: 'Cr', time: newTransaction.createdAt
            }

            await BankUsersModel.findByIdAndUpdate({ _id: allStaffAccount[i] }, { account_balance: finalTotal, history: [historyTo, ...userAcct.history] })
         }
         let isFullHalf = mainSalary - Number(totalSalary / 2)
         await MainBankDetailModel.findOneAndUpdate({ name: "FRANCHISE BANK" }, { salary: Number(isFullHalf), salaryHistory: [{ isPaid: isHalf, type: 'Half Payment', month, totalPaid: Number(totalSalary / 2), datePaid: new Date() }, ...hqName.salaryHistory] })

      } else if (isQuarter) {
         let allStaffAccount = allStaff.map(item => {
            return item.account_id
         })

         for (let i = 0; i < allStaffAccount.length; i++) {
            let userAcct = await BankUsersModel.findById(allStaffAccount[i]).select('account_balance account_number fullName history')

            let userSal = allStaff.filter(item =>
               item.account_id === allStaffAccount[i]
            )

            let finalUserSal = userSal.map(item => item.salary).toString()

            let userAcctTotal = userAcct.account_balance

            let finalTotal = Number(Number(userAcctTotal) + Number(finalUserSal / 4))

            let transact_amount_from = `NGN ${Number(finalUserSal / 4).toFixed(2)}`

            let transact_amount_to = `NGN ${Number(finalUserSal / 4).toFixed(2)} Cr`

            let desc = ` Quarter Salary of ${month} FROM 'FRANCHISE BANK' TO ${userAcct.account_number}-${userAcct.fullName}`

            do {
               var transactionID = getTransactionID('Salary')
               var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
            } while (checkTransactionID);


            let newTransaction = new TransactionDetailModel({
               transactionID, transact_amount_from, transact_amount_to, desc, transact_from: "FRANCHISE BANK", transact_to: userAcct.fullName, transact_amount: Number(finalUserSal / 4).toFixed(2), auth: hqName._id
            })
            await newTransaction.save()

            let historyTo = {
               _id: newTransaction._id, transactionID, transact_amount_to, desc, transact_amount: `NGN ${Number(finalUserSal / 4).toFixed(2)}`, available: `NGN ${Number(finalTotal).toFixed(2)}`, transact_type: 'Cr', time: newTransaction.createdAt
            }

            await BankUsersModel.findByIdAndUpdate({ _id: allStaffAccount[i] }, { account_balance: finalTotal, history: [historyTo, ...userAcct.history] })
         }

         let isFullQuarter = mainSalary - Number(totalSalary / 4)
         await MainBankDetailModel.findOneAndUpdate({ name: "FRANCHISE BANK" }, { salary: Number(isFullQuarter), salaryHistory: [{ isPaid: isQuarter, type: "Quarter Payment", month, totalPaid: Number(totalSalary / 4), datePaid: new Date() }, ...hqName.salaryHistory] })

      } else {
         await MainBankDetailModel.findOneAndUpdate({ name: "FRANCHISE BANK" }, { salaryHistory: [{ isPaid: false, type: "No Payment", month, totalPaid: 'Nil', datePaid: new Date() }, ...hqName.salaryHistory] })
      }

   } catch (error) {
      console.log(error.message);
   }
}

let access = async () => {
   var hqName = await MainBankDetailModel.findOne({ name: "FRANCHISE BANK" })

   let salaryHistory = hqName.salaryHistory
   let salaryDate = salaryHistory.map(item => item.datePaid)
   let initSerial = salaryDate.length === 0 ? 0 : Math.max(...salaryDate.map(item => item))

   let init = new Date(initSerial)
   let init1 = init.getDate()
   let fin = new Date(initSerial)
   let fin1 = fin.getDate()
   if (init1 !== fin1) {
      salaryPayment()
   }
}

let salaryDay = new Date().getDate()
const paySalary = salaryDay === 25

if (paySalary) {
   access()
}


// route    /franchise/staff/remain-half-salary
// desc     POST Payment of Outstanding half salary
// access   Private Bank Staff Admin
export const halfSalaryPayment = async (req, res) => {
   try {

      let { month } = req.body

      if (!month) return res.status(400).json({
         error: [
            { msg: `Month required` }
         ]
      })

      let allStaff = await BankStaffModel.find()
      let totalSalary = allStaff.reduce((r, a) => {
         return r += a.salary
      }, 0)

      var hqName = await MainBankDetailModel.findOne({ name: "FRANCHISE BANK" })

      let mainSalary = hqName.salary

      var isHalf = mainSalary > Number(totalSalary / 2)


      if (isHalf) {
         let allStaffAccount = allStaff.map(item => {
            return item.account_id
         })

         for (let i = 0; i < allStaffAccount.length; i++) {
            let userAcct = await BankUsersModel.findById(allStaffAccount[i]).select('account_balance account_number fullName history')

            let userSal = allStaff.filter(item =>
               item.account_id === allStaffAccount[i]
            )

            let finalUserSal = userSal.map(item => item.salary).toString()

            let userAcctTotal = userAcct.account_balance

            let finalTotal = Number(Number(userAcctTotal) + Number(finalUserSal / 2))

            let transact_amount_from = `NGN ${Number(finalUserSal / 2).toFixed(2)}`

            let transact_amount_to = `NGN ${Number(finalUserSal / 2).toFixed(2)} Cr`

            let desc = `Remaining Half Salary of ${month} FROM 'FRANCHISE BANK' TO ${userAcct.account_number}-${userAcct.fullName}`

            do {
               var transactionID = getTransactionID('Salary')
               var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
            } while (checkTransactionID);


            let newTransaction = new TransactionDetailModel({
               transactionID, transact_amount_from, transact_amount_to, desc, transact_from: "FRANCHISE BANK", transact_to: userAcct.fullName, transact_amount: Number(finalUserSal / 2).toFixed(2), auth: hqName._id
            })
            await newTransaction.save()

            let historyTo = {
               _id: newTransaction._id, transactionID, transact_amount_to, desc, transact_amount: `NGN ${Number(finalUserSal / 2).toFixed(2)}`, available: `NGN ${Number(finalTotal).toFixed(2)}`, transact_type: 'Cr', time: newTransaction.createdAt
            }

            await BankUsersModel.findByIdAndUpdate({ _id: allStaffAccount[i] }, { account_balance: finalTotal, history: [historyTo, ...userAcct.history] })
         }
         let isFullHalf = mainSalary - Number(totalSalary / 2)
         await MainBankDetailModel.findOneAndUpdate({ name: "FRANCHISE BANK" }, { salary: Number(isFullHalf), salaryHistory: [{ isPaid: isHalf, type: 'Half Payment', month, totalPaid: Number(totalSalary / 2), datePaid: new Date() }, ...hqName.salaryHistory] })

         res.json({
            msg: `Remaining half salary of ${month} paid...`
         })

      } else {
         await MainBankDetailModel.findOneAndUpdate({ name: "FRANCHISE BANK" }, { salaryHistory: [{ isPaid: false, type: "No Payment", month, totalPaid: 'Nil', datePaid: new Date() }, ...hqName.salaryHistory] })

         res.status(400).json({
            error: [
               { msg: `Insufient fund...` }
            ]
         })
      }

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}



// route    /franchise/staff/remain-major-salary
// desc     POST Payment of Outstanding 3/4 salary
// access   Private Bank Staff Admin
export const majorSalaryPayment = async (req, res) => {
   try {

      let { month } = req.body

      if (!month) return res.status(400).json({
         error: [
            { msg: `Month required` }
         ]
      })

      let allStaff = await BankStaffModel.find()
      let totalSalary = allStaff.reduce((r, a) => {
         return r += a.salary
      }, 0)

      var hqName = await MainBankDetailModel.findOne({ name: "FRANCHISE BANK" })

      let mainSalary = hqName.salary

      var isQuarter = mainSalary > Number(totalSalary * 0.75)


      if (isQuarter) {
         let allStaffAccount = allStaff.map(item => {
            return item.account_id
         })

         for (let i = 0; i < allStaffAccount.length; i++) {
            let userAcct = await BankUsersModel.findById(allStaffAccount[i]).select('account_balance account_number fullName history')

            let userSal = allStaff.filter(item =>
               item.account_id === allStaffAccount[i]
            )

            let finalUserSal = userSal.map(item => item.salary).toString()

            let userAcctTotal = userAcct.account_balance

            let finalTotal = Number(Number(userAcctTotal) + Number(finalUserSal * 0.75))

            let transact_amount_from = `NGN ${Number(finalUserSal * 0.75).toFixed(2)}`

            let transact_amount_to = `NGN ${Number(finalUserSal * 0.75).toFixed(2)} Cr`

            let desc = `Remaining Major Salary of ${month} FROM 'FRANCHISE BANK' TO ${userAcct.account_number}-${userAcct.fullName}`

            do {
               var transactionID = getTransactionID('Salary')
               var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
            } while (checkTransactionID);


            let newTransaction = new TransactionDetailModel({
               transactionID, transact_amount_from, transact_amount_to, desc, transact_from: "FRANCHISE BANK", transact_to: userAcct.fullName, transact_amount: Number(finalUserSal * 0.75).toFixed(2), auth: hqName._id
            })
            await newTransaction.save()

            let historyTo = {
               _id: newTransaction._id, transactionID, transact_amount_to, desc, transact_amount: `NGN ${Number(finalUserSal * 0.75).toFixed(2)}`, available: `NGN ${Number(finalTotal).toFixed(2)}`, transact_type: 'Cr', time: newTransaction.createdAt
            }

            await BankUsersModel.findByIdAndUpdate({ _id: allStaffAccount[i] }, { account_balance: finalTotal, history: [historyTo, ...userAcct.history] })
         }

         let isFullQuarter = mainSalary - Number(totalSalary * 0.75)
         await MainBankDetailModel.findOneAndUpdate({ name: "FRANCHISE BANK" }, { salary: Number(isFullQuarter), salaryHistory: [{ isPaid: isQuarter, type: "Quarter Payment", month, totalPaid: Number(totalSalary * 0.75), datePaid: new Date() }, ...hqName.salaryHistory] })

         res.json({
            msg: `Remaining major salary of ${month} paid...`
         })

      } else {
         await MainBankDetailModel.findOneAndUpdate({ name: "FRANCHISE BANK" }, { salaryHistory: [{ isPaid: false, type: "No Payment", month, totalPaid: 'Nil', datePaid: new Date() }, ...hqName.salaryHistory] })

         res.status(400).json({
            error: [
               { msg: `Insufient fund...` }
            ]
         })
      }

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
   return jwt.sign(user, process.env.Jwt_Secret_Staff, { expiresIn: '2h' })
}



export const getStaffID = () => {
   let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
   let YearValue = new Date().getFullYear().toString()
   let YearString = YearValue.substr(2)
   var numb = []
   for (let i = 1; i <= 5; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')
   let finalValue = `FRANCHISE${YearString}-${semi}`

   return finalValue
}