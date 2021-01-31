import BankStaffModel from "../Model/BankStaffModel.js";
import BankUsersModel from "../Model/BankUsersModel.js";
import UserATMModel from "../Model/UserATMModel.js";
import { validationResult } from 'express-validator'



// route    /franchise/atm/register-atm
// desc     POST Register User for Atm
// access   Private Bank Staff
export const registerUserATM = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({
         error: errors.array()
      })

      let staff_auth = await BankStaffModel.findById(req.bankStaff.id)
      let { account_number, card_type, bvn_number } = req.body

      let user = await BankUsersModel.findOne({ account_number })

      if (!user) return res.status(400).json({
         error: [
            { msg: `${account_number} does not exist` }
         ]
      })

      let checkExpiry = user.atm_expiry

      if (checkExpiry) {
         let dateNow = new Date()
         var checkDate = user.atm_expiry > dateNow

         if (!checkDate) return res.status(400).json({
            error: [
               { msg: `User ATM yet to expiry` }
            ]
         })
      }

      let atm_cvv = getATMCCV()
      let atm_expiry = getExpiryTime()

      do {
         var atm_number = getATMNumbers(card_type)
         var checkATMNumber = await UserATMModel.findOne({ atm_number })
      } while (checkATMNumber);


      let newUserATM = new UserATMModel({ staff_auth: staff_auth._id, account_number, user_auth: user._id, fullName: user.fullName, card_type, bvn_number, atm_cvv, atm_number, atm_expiry })

      await BankUsersModel.findByIdAndUpdate({ _id: user._id }, { atm_number, atm_expiry, atm_cvv, card_type, atm_pin: '' })

      await newUserATM.save()

      res.json({
         msg: `${fullName} atm detail updated`
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


// route    /franchise/atm/atm-destroy
// desc     POST Remove User Atm
// access   Private Bank Staff
export const destroyUserATM = async (req, res) => {
   try {
      let { account_number } = req.body

      let checkAccount = await BankUsersModel.findOne({ account_number })
      if (!checkAccount) return res.status(400).json({
         error: [
            { msg: `${account_number} invalid...` }
         ]
      })

      let atm_number = checkAccount.atm_number

      let atmDetail = await UserATMModel.findOne({ atm_number })

      await BankUsersModel.findByIdAndUpdate({ _id: checkAccount._id }, { atm_number: '', atm_expiry: '', atm_cvv: '', card_type: '', atm_pin: '' })

      await UserATMModel.findByIdAndDelete({ _id: atmDetail._id })

      res.json({
         msg: `User Atm detail deleted successfully`
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

export const getATMNumbers = type => {
   var card
   if (type === 'MasterCard') {
      card = 5366
   } else if (type === 'VerveCard') {
      card = 5488
   } else if (type === 'VisaCard') {
      card = 5544
   }
   let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
   var numb = []
   for (let i = 1; i <= 12; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')
   let finalValue = `${card}${semi}`

   return finalValue
}

export const getATMCCV = () => {
   let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
   var numb = []
   for (let i = 1; i <= 3; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')
   let finalValue = `${semi}`

   return finalValue
}

const getExpiryTime = () => {
   let presentYear = new Date().getFullYear() + 3
   let presentMonth = new Date().getMonth()
   let presentDate = new Date().getDate()
   let YearValue = new Date().setFullYear(presentYear, presentMonth, presentDate)
   let finalValue = new Date(YearValue)

   return finalValue
}