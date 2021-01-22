import mongoose from 'mongoose'


const AccountCategorySchema = new mongoose.Schema({
   category: {
      type: String,
      unique: true,
      required: true,
      trim: true
   },
   credit_limit: {
      type: Number,
      trim: true
   },
   debit_limit: {
      type: Number,
      trim: true,
      default: null
   },
   user_limit: {
      type: Number,
      required: true,
      trim: true,
      default: null
   },
}, { timestamps: true })


export default mongoose.model('AccountCategory', AccountCategorySchema)