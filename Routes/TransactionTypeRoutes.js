import express from 'express'
import { check, validationResult } from 'express-validator'
import TransactionTypeModel from '../Model/TransactionTypeModel.js'


const router = express.Router()

router.route('/transaction-type')
   .post(
      [
         check('transcaction', 'Transaction type required').not().isEmpty(),
         check('code', 'Code required to be two letters').not().isLength({ max: 2, min: 2 })
      ], async (req, res) => {
         try {
            let errors = validationResult(req)
            if (!errors.isEmpty()) {
               return res.status(400).json({
                  msg: errors.array()
               })
            }

            let { transaction, code } = req.body

            let checkTransaction = await TransactionTypeModel.findOne({ transaction: transaction.toUpperCase() })
            if (checkTransaction) return res.status(400).json({
               msg: `${transaction} exists...`
            })

            let checkCode = await TransactionTypeModel.findOne({ code })
            if (checkCode) return res.status(400).json({
               msg: `${code} exists...`
            })

            let newTransactionType = new TransactionTypeModel({ transaction: transaction.toUpperCase(), code })
            await newTransactionType.save()
         } catch (error) {
            console.log(error.message);
            return res.status(500).json({
               msg: `Server Error: ${error.message}`
            })
         }
      })
   .get(async (req, res) => {
      try {
         let allTransactionTypes = await TransactionTypeModel.find().sort({ updatedAt: -1 })

         res.json({
            success: true,
            count: allTransactionTypes.length,
            allTransactionTypes
         })
      } catch (error) {
         console.log(error.message);
         return res.status(500).json({
            msg: `Server Error: ${error.message}`
         })
      }
   })

export default router