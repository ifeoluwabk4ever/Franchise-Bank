import UserBVNModel from "../Model/UserBVNModel.js"
import { validationResult } from 'express-validator'



// route    /franchise/enroll/user-bvn
// desc     POST Add User to BVN  Enrollment
// access   Private Bank Admin
export const addUserBVN = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            msg: errors.array()
         })
      }

      let { lastName, firstName, email, gender, dob, address, avatar, telephone } = req.body

      let fullName = `${lastName} ${firstName}`

      let checkEmail = await UserBVNModel.findOne({ email })

      if (checkEmail) return res.status(400).json({
         msg: 'Email exists...'
      })

      let checkTelephone = await UserBVNModel.findOne({ telephone })

      if (checkTelephone) return res.status(400).json({
         msg: 'Telephone exists...'
      })

      do {
         var bvn_number = getBVNNumber()

         var checkBVN = await UserBVNModel.findOne({ bvn_number })
      } while (checkBVN);

      let newUserBVN = new UserBVNModel({ lastName: lastName.toUpperCase(), firstName: firstName.toUpperCase(), fullName: fullName.toUpperCase(), email, gender: gender.toLowerCase(), dob, address, avatar, telephone, bvn_number })
      await newUserBVN.save()
      res.json({
         msg: `${fullName} enrolled...`,
         BVN: bvn_number

      })
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         msg: `Server Error: ${error.message}`
      })
   }
}


// route    /franchise/enroll/user-bvn
// desc     GET Get User BVN Detail and Verify if BVN exists
// access   Public
export const getUserBVNDetail = async (req, res) => {
   try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({
            msg: errors.array()
         })
      }

      let { bvn_number } = req.body

      let checkBVN = await UserBVNModel.findOne({ bvn_number })

      if (!checkBVN) return res.status(400).json({
         msg: `${bvn_number}, user does not exists...`
      })

      res.json({
         UserDetail: checkBVN
      })
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         msg: `Server Error: ${error.message}`
      })
   }
}


export const getBVNNumber = () => {
   let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
   let YearValue = new Date().getFullYear().toString()
   let YearString = YearValue.substr(2)
   var numb = []
   for (let i = 1; i <= 9; i++) {
      let randomIndex = Math.floor(Math.random() * values.length)
      numb.push(values[randomIndex])
   }
   var semi = numb.reduce((r, a) => {
      return r += a
   }, '')
   let finalValue = `${YearString}${semi}`

   return finalValue
}