import express from 'express'


import MainBankDetailModel from '../Model/MainBankDetailModel.js'


const router = express.Router()

router.route('/')
   .post(async (req, res) => {
      try {
         let { name, salary } = req.body

         if (!name) return res.status(400).json({
            error: [
               { msg: "Name required" }
            ]
         })

         let newDetail = new MainBankDetailModel({ name: name.toUpperCase(), salary: salary ? salary : 10000000 })
         await newDetail.save()

         res.json({
            msg: `${name} created`
         })
      } catch (error) {
         console.log(error.message);
         return res.status(500).json({
            error: [
               { msg: `Server Error: ${error.message}` }
            ]
         })
      }
   })


export default router