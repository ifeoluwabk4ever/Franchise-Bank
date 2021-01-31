import { validationResult } from "express-validator";
import AccountTypeModel from "../Model/AccountTypeModel.js";
import BankStaffModel from "../Model/BankStaffModel.js";
import BankUsersModel from "../Model/BankUsersModel.js";
import TransactionDetailModel from "../Model/TransactionDetailModel.js";



// route    /franchise/send-money
// desc     POST Transfer money to another user
// access   Private User
export const createTransferPayment = async (req, res) => {
   try {

      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })


      let userFrom = await BankUsersModel.findById(req.bankUser.id)

      if (!userFrom) return res.status(400).json({
         error: [
            { msg: "User not found" }
         ]
      })
      let { transact_to, transact_amount } = req.body


      let accType = userFrom.account_type

      let accTypeDetail = await AccountTypeModel.findById(accType)
      let accTypeDebitAmount = accTypeDetail.user_debit

      let totalDebit = Number(Number(transact_amount) + Number(accTypeDebitAmount)).toFixed(2)

      let checkTotal = userFrom.account_balance > totalDebit
      // console.log(totalDebit, checkTotal, userFrom.account_balance);

      if (!checkTotal) return res.status(400).json({
         error: [
            { msg: `Insufficient fund...` }
         ]
      })


      let transact_from = userFrom.account_number
      let userTo = await BankUsersModel.findOne({ account_number: transact_to })

      if (!userTo) return res.status(400).json({
         error: [
            { msg: `${transact_to} account number invalid...` }
         ]
      })
      if (userTo.account_number === transact_from) return res.status(400).json({
         error: [
            { msg: `Invalid transaction, you cannot send to the same account` }
         ]
      })


      let transact_amount_from = `NGN ${Number(transact_amount).toFixed(2)} Dr, VAT = NGN ${Number(accTypeDebitAmount).toFixed(2)}`
      let transact_amount_to = `NGN ${Number(transact_amount).toFixed(2)} Cr`

      let desc = `Transfer FROM ${transact_from}-${userFrom.fullName} TO ${transact_to}-${userTo.fullName}`

      do {
         var transactionID = getTransactionID('Transfer')
         var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
      } while (checkTransactionID);


      let newTransaction = new TransactionDetailModel({
         transactionID, transact_amount_from, transact_amount_to, desc, transact_from, transact_to, transact_amount: Number(transact_amount).toFixed(2), auth: userFrom._id
      })

      let UpdatedFromTotal = Number(Number(userFrom.account_balance) - Number(totalDebit)).toFixed(2)
      let UpdatedToTotal = Number(Number(userTo.account_balance) + Number(transact_amount)).toFixed(2)


      let historyFrom = {
         _id: newTransaction._id, transactionID, transact_amount_from, desc, transact_amount: `NGN ${Number(transact_amount).toFixed(2)}`, totalDebit: `NGN ${Number(totalDebit).toFixed(2)}`, available: `NGN ${Number(UpdatedFromTotal).toFixed(2)}`, transact_type: 'Dr', time: newTransaction.createdAt
      }

      let historyTo = {
         _id: newTransaction._id, transactionID, transact_amount_to, desc, transact_amount: `NGN ${Number(transact_amount).toFixed(2)}`, available: `NGN ${Number(UpdatedToTotal).toFixed(2)}`, transact_type: 'Cr', time: newTransaction.createdAt
      }

      await BankUsersModel.findByIdAndUpdate({ _id: userFrom._id }, { account_balance: UpdatedFromTotal, history: [historyFrom, ...userFrom.history] })

      await BankUsersModel.findByIdAndUpdate({ _id: userTo._id }, { account_balance: UpdatedToTotal, history: [historyTo, ...userTo.history] })

      await newTransaction.save()

      res.json({
         msg: `Transaction Successful`
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


// route    /franchise/deposit-money
// desc     POST Deposit money to another user from cashier
// access   Private Staff
export const createDepositPayment = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let staff_auth = await BankStaffModel.findById(req.bankStaff.id)

      let { transact_from, transact_to, transact_amount } = req.body

      let userTo = await BankUsersModel.findOne({ account_number: transact_to })

      if (!userTo) return res.status(400).json({
         error: [
            { msg: `${transact_to} account number invalid...` }
         ]
      })

      let transact_amount_from = `NGN ${Number(transact_amount).toFixed(2)}`
      let transact_amount_to = `NGN ${Number(transact_amount).toFixed(2)} Cr`

      let desc = `Deposit FROM ${transact_from.toUpperCase()} TO ${transact_to}-${userTo.fullName}`

      do {
         var transactionID = getTransactionID('Deposit')
         var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
      } while (checkTransactionID);


      let newTransaction = new TransactionDetailModel({
         transactionID, transact_amount_from, transact_amount_to, desc, transact_from, transact_to, transact_amount: Number(transact_amount).toFixed(2), auth: staff_auth._id
      })

      let UpdatedToTotal = Number(Number(userTo.account_balance) + Number(transact_amount)).toFixed(2)

      let historyTo = {
         _id: newTransaction._id, transactionID, transact_amount_to, desc, transact_amount: `NGN ${Number(transact_amount).toFixed(2)}`, available: `NGN ${Number(UpdatedToTotal).toFixed(2)}`, transact_type: 'Cr', time: newTransaction.createdAt
      }

      await BankUsersModel.findByIdAndUpdate({ _id: userTo._id }, { account_balance: UpdatedToTotal, history: [...userTo.history, historyTo] })

      await newTransaction.save()

      res.json({
         msg: `Transaction Successful`
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


export const getTransactionID = type => {
   // let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
   let YearValue = new Date().getFullYear().toString()
   let YearString = YearValue.substr(2)
   let dateValue = Date.now()
   let finalValue = `${type}-${YearString}${dateValue}`

   return finalValue
}
// let ans = getTransactionID('Transfer')
// console.log(ans);