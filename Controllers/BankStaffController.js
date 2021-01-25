import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import BankStaffModel from "../Model/BankStaffModel.js";
import BankUsersModel from "../Model/BankUsersModel.js";


// route    /franchise/staff/register-staff
// desc     POST Add Staff account
// access   Private Bank Admin
export const addBankStaff = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            msg: errors.array()
         })
      }

      let { lastName, firstName, dob, email, gender, telephone, address, avatar, account_number } = req.body

      let fullName = `${lastName} ${firstName}`

      let checkEmail = await BankStaffModel.findOne({ email })
      if (checkEmail) return res.status(400).json({
         msg: `${email} exists...`
      })

      let checkAccountNumber = await BankUsersModel.findOne({ account_number })
      if (!checkAccountNumber) return res.status(400).json({
         msg: `${account_number} does not exists...`
      })

      let checkTelephone = await BankStaffModel.findOne({ telephone })
      if (checkTelephone) return res.status(400).json({
         msg: `${telephone} exists...`
      })

      let account_id = checkAccountNumber._id

      do {
         var staffID = getStaffID()
         var checkStaffID = await BankStaffModel.findOne({ staffID })
      } while (checkStaffID);


      let newBankStaff = new BankStaffModel({ lastName: lastName.toUpperCase(), firstName: firstName.toUpperCase(), dob, email, gender: gender.toLowerCase(), telephone, address, avatar, account_number, fullName: fullName.toUpperCase(), telephone, account_id, staffID })

      await newBankStaff.save()

      res.json({
         msg: `${fullName} enrolled...`
      })

   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         msg: "Server Error"
      })
   }
}


// route    /franchise/staff/staff-info
// desc     GET Get staff details info
// access   Private Bank Staff
export const getStaffDetails = async (req, res) => {
   try {
      let user = await BankStaffModel.findById(req.staff.id).select('-password')

      if (!user) return res.status(400).json({
         msg: "User does not exist..."
      })

      res.json({ user })
   } catch (error) {
      console.log(error.message);
      return res.json({
         msg: `Server Error: ${error.message}`
      })
   }
}


// route    /franchise/staff/login
// desc     POST Login Staff
// access   Public
export const loginStaff = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (errors.isEmpty()) return res.status(400).json({
         msg: errors.array()
      })

      let { staffID, password } = req.body

      // Find user
      let user = await BankStaffModel.findOne({ staffID })

      // If no user in db
      if (!user) return res.status(400).json({
         msg: 'User does not exist...'
      })

      // Know user found by email, comparing password
      let isMatch = await bcrypt.compare(password, user.password)

      // If error
      if (!isMatch) return res.status(400).json({
         msg: 'Invalid password...'
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
         msg: `Server Error: ${error.message}`
      })
   }
}


// route    /franchise/staff/register-password
// desc     POST Register Staff password
// access   Public
export const registerPassword = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (errors.isEmpty()) return res.status(400).json({
         msg: errors.array()
      })

      let { staffID, password } = req.body

      let checkStaffID = await BankStaffModel.findOne({ staffID })

      if (!checkStaffID) return res.status(400).json({
         msg: `${staffID} invalid...`
      })

      let verifyPassword = checkStaffID.password
      if (verifyPassword) return res.status(400).json({
         msg: `${checkStaffID.fullName} has an existing password`
      })

      // Create salt && hash
      // Encrypt password
      let salt = await bcrypt.genSalt(10)
      // Save password
      await bcrypt.hash(password, salt)
      // Save data in database

      let updatedData = await BankStaffModel.findOneAndUpdate({ staffID }, { password })

      // Create jwt to auth
      const accesstoken = createAccessToken({ id: updatedData._id })

      res.json({
         token: accesstoken,
         msg: `Welcome ${updatedData.lastName}`
      })
   } catch (error) {
      console.log(error.message);
      return res.status(400).json({
         msg: `Server Error: ${error.message}`
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
   let finalValue = `LOVELINK${YearString}-${semi}`

   return finalValue
}