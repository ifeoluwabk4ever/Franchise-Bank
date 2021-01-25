import mongoose from 'mongoose'

const TransactionTypeSchema = new mongoose.Schema({
   transaction: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      length: 2
   },
}, { timestamps: true })

export default mongoose.model('TransactionType', TransactionTypeSchema)