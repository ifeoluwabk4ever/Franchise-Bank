import { validationResult } from "express-validator";
import AccountTypeModel from "../Model/AccountTypeModel.js";
import BankStaffModel from "../Model/BankStaffModel.js";
import BankUsersModel from "../Model/BankUsersModel.js";
import TransactionDetailModel from "../Model/TransactionDetailModel.js";



// route    /franchise/send-money
// desc     POST Transfer money to another user
// access   Private User Mobile/Web App
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

      await newTransaction.save()

      await BankUsersModel.findByIdAndUpdate({ _id: userFrom._id }, { account_balance: UpdatedFromTotal, history: [historyFrom, ...userFrom.history] })

      await BankUsersModel.findByIdAndUpdate({ _id: userTo._id }, { account_balance: UpdatedToTotal, history: [historyTo, ...userTo.history] })


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
// access   Private Bank Staff
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
      await newTransaction.save()

      await BankUsersModel.findByIdAndUpdate({ _id: userTo._id }, { account_balance: UpdatedToTotal, history: [historyTo, ...userTo.history] })


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


// route    /franchise/withdraw-money
// desc     POST Withdraw money by user from cashier
// access   Private Bank Staff
export const createWithdrawalPayment = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let staff_auth = await BankStaffModel.findById(req.bankStaff.id)

      let { account_number, transact_amount } = req.body

      let userFrom = await BankUsersModel.findOne({ account_number })

      if (!userFrom) return res.status(400).json({
         error: [
            { msg: `${account_number} account number invalid...` }
         ]
      })

      let checkTotal = userFrom.account_balance > transact_amount

      if (!checkTotal) return res.status(400).json({
         error: [
            { msg: `Insufficient fund...` }
         ]
      })

      let desc = `Bank Withdrawal  FROM ${userFrom.fullName} of NGN ${Number(transact_amount).toFixed(2)}`

      do {
         var transactionID = getTransactionID('Withdrawal')
         var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
      } while (checkTransactionID);


      let newTransaction = new TransactionDetailModel({
         transactionID, transact_amount_from: 'Nil', transact_amount_to: 'Nil', desc, transact_from: 'Nill', transact_to: 'Nil', transact_amount: Number(transact_amount).toFixed(2), auth: staff_auth._id
      })

      let UpdatedFromTotal = Number(Number(userFrom.account_balance) - Number(transact_amount)).toFixed(2)


      let historyFrom = {
         _id: newTransaction._id, transactionID, transact_amount_from: 'Nil', desc, transact_amount: `NGN ${Number(transact_amount).toFixed(2)}`, totalDebit: `NGN ${Number(transact_amount).toFixed(2)}`, available: `NGN ${Number(UpdatedFromTotal).toFixed(2)}`, transact_type: 'Dr', time: newTransaction.createdAt
      }
      await newTransaction.save()

      await BankUsersModel.findByIdAndUpdate({ _id: userFrom._id }, { account_balance: UpdatedFromTotal, history: [historyFrom, ...userFrom.history] })


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


// route    /franchise/atm/withdraw-money
// desc     POST Withdraw money to using atm
// access   Private User ATM Access
export const createWithdrawPaymentWithATM = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let auth = await BankUsersModel.findById(req.posBankUser.id)

      let { transact_amount, account_type } = req.body

      let userType = auth.account_type !== account_type

      if (!userType) return res.status(400).json({
         error: [
            { msg: `Account type invalid...` }
         ]
      })

      let userDebit = auth.account_balance > transact_amount

      if (!userDebit) return res.status(400).json({
         error: [
            { msg: `Insuffient fund...` }
         ]
      })

      let desc = `ATM Withdrawal THROUGH ${auth.fullName} ATM of ${transact_amount}`

      do {
         var transactionID = getTransactionID('ATM-Withdrawal')
         var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
      } while (checkTransactionID);


      let newTransaction = new TransactionDetailModel({
         transactionID, transact_amount_from: 'Nil', transact_amount_to: 'Nil', desc, transact_from: 'Nil', transact_to: 'Nil', transact_amount: Number(transact_amount).toFixed(2), auth: auth._id
      })

      let updatedTotal = Number(Number(auth.account_balance) - Number(transact_amount)).toFixed(2)

      let historyFrom = {
         _id: newTransaction._id, transactionID, desc, transact_amount: `NGN ${Number(transact_amount).toFixed(2)}`, totalDebit: `NGN ${Number(transact_amount).toFixed(2)}`, available: `NGN ${Number(updatedTotal).toFixed(2)}`, transact_type: 'Dr', time: newTransaction.createdAt
      }

      await newTransaction.save()

      await BankUsersModel.findByIdAndUpdate({ _id: auth._id }, { account_balance: updatedTotal, history: [historyFrom, ...auth.history] })


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


// route    /franchise/withdraw-airtime
// desc     POST Recharge phone number
// access   Private User Mobile/Web App
export const createWithdrawPaymentAirtime = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let auth = await BankUsersModel.findById(req.bankUser.id)

      let { transact_amount } = req.body

      let userDebit = auth.account_balance > transact_amount

      if (!userDebit) return res.status(400).json({
         error: [
            { msg: `Insuffient fund...` }
         ]
      })

      let desc = `Airtime ${auth.telephone} of NGN ${transact_amount}`

      do {
         var transactionID = getTransactionID('Airtime')
         var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
      } while (checkTransactionID);


      let newTransaction = new TransactionDetailModel({
         transactionID, transact_amount_from: 'Nil', transact_amount_to: 'Nil', desc, transact_from: 'Nil', transact_to: 'Nil', transact_amount: Number(transact_amount).toFixed(2), auth: auth._id
      })

      let updatedTotal = Number(Number(auth.account_balance) - Number(transact_amount)).toFixed(2)

      let historyFrom = {
         _id: newTransaction._id, transactionID, desc, transact_amount: `NGN ${Number(transact_amount).toFixed(2)}`, totalDebit: `NGN ${Number(transact_amount).toFixed(2)}`, available: `NGN ${Number(updatedTotal).toFixed(2)}`, transact_type: 'Dr', time: newTransaction.createdAt
      }

      await newTransaction.save()

      await BankUsersModel.findByIdAndUpdate({ _id: auth._id }, { account_balance: updatedTotal, history: [historyFrom, ...auth.history] })


      res.json({
         msg: `Airtime Recharge Success`
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


// route    /franchise/atm/withdraw-airtime
// desc     POST Recharge phone number
// access   Private User ATM Access
export const createWithdrawPaymentAirtimeWithATM = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let auth = await BankUsersModel.findById(req.posBankUser.id)

      let { transact_amount } = req.body

      let userDebit = auth.account_balance > transact_amount

      if (!userDebit) return res.status(400).json({
         error: [
            { msg: `Insuffient fund...` }
         ]
      })

      let desc = `Airtime ${auth.telephone} of NGN ${transact_amount}`

      do {
         var transactionID = getTransactionID('Airtime')
         var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
      } while (checkTransactionID);


      let newTransaction = new TransactionDetailModel({
         transactionID, transact_amount_from: 'Nil', transact_amount_to: 'Nil', desc, transact_from: 'Nil', transact_to: 'Nil', transact_amount: Number(transact_amount).toFixed(2), auth: auth._id
      })

      let updatedTotal = Number(Number(auth.account_balance) - Number(transact_amount)).toFixed(2)

      let historyFrom = {
         _id: newTransaction._id, transactionID, desc, transact_amount: `NGN ${Number(transact_amount).toFixed(2)}`, totalDebit: `NGN ${Number(transact_amount).toFixed(2)}`, available: `NGN ${Number(updatedTotal).toFixed(2)}`, transact_type: 'Dr', time: newTransaction.createdAt
      }

      await newTransaction.save()

      await BankUsersModel.findByIdAndUpdate({ _id: auth._id }, { account_balance: updatedTotal, history: [historyFrom, ...auth.history] })


      res.json({
         msg: `Airtime Recharge Success`
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


// route    /franchise/atm/send-money
// desc     POST Transfer money to another user
// access   Private User ATM Access
export const createTransferPaymentWithATM = async (req, res) => {
   try {

      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })


      let userFrom = await BankUsersModel.findById(req.posBankUser.id)

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
         var transactionID = getTransactionID('ATM-Transfer')
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

      await newTransaction.save()

      await BankUsersModel.findByIdAndUpdate({ _id: userFrom._id }, { account_balance: UpdatedFromTotal, history: [historyFrom, ...userFrom.history] })

      await BankUsersModel.findByIdAndUpdate({ _id: userTo._id }, { account_balance: UpdatedToTotal, history: [historyTo, ...userTo.history] })


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

// route    /franchise/atm/online-payment
// desc     POST PAy money to using atm
// access   Private User ATM Access
export const createOnlinePaymentWithATM = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })


      let { transact_amount, atm_pin, atm_expiry, atm_cvv, atm_number } = req.body

      let auth = await BankUsersModel.findOne({ atm_number })

      if (!auth) return res.status(400).json({
         error: [
            { msg: `${atm_number} atm number invalid` }
         ]
      })

      if (auth.atm_expiry !== atm_expiry) return res.status(400).json({
         error: [
            { msg: `${atm_expiry} expiry invalid` }
         ]
      })

      if (auth.atm_cvv !== atm_cvv) return res.status(400).json({
         error: [
            { msg: `${atm_cvv} cvv invalid` }
         ]
      })

      if (auth.atm_pin !== atm_pin) return res.status(400).json({
         error: [
            { msg: `${atm_pin} pin invalid` }
         ]
      })

      let dateNow = new Date()
      var checkDate = auth.atm_expiry > dateNow

      if (!checkDate) return res.status(400).json({
         error: [
            { msg: `ATM card has expired...` }
         ]
      })

      let userDebit = auth.account_balance > transact_amount

      if (!userDebit) return res.status(400).json({
         error: [
            { msg: `Insuffient fund...` }
         ]
      })

      let desc = `ATM WEB Payment THROUGH ${auth.fullName} ATM of ${transact_amount}`

      do {
         var transactionID = getTransactionID('ATM-WEB-Payment')
         var checkTransactionID = await TransactionDetailModel.findOne({ transactionID })
      } while (checkTransactionID);


      let newTransaction = new TransactionDetailModel({
         transactionID, transact_amount_from: 'Nil', transact_amount_to: 'Nil', desc, transact_from: 'Nil', transact_to: 'Nil', transact_amount: Number(transact_amount).toFixed(2), auth: auth._id
      })

      let updatedTotal = Number(Number(auth.account_balance) - Number(transact_amount)).toFixed(2)

      let historyFrom = {
         _id: newTransaction._id, transactionID, desc, transact_amount: `NGN ${Number(transact_amount).toFixed(2)}`, totalDebit: `NGN ${Number(transact_amount).toFixed(2)}`, available: `NGN ${Number(updatedTotal).toFixed(2)}`, transact_type: 'Dr', time: newTransaction.createdAt
      }

      await newTransaction.save()

      await BankUsersModel.findByIdAndUpdate({ _id: auth._id }, { account_balance: updatedTotal, history: [historyFrom, ...auth.history] })


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