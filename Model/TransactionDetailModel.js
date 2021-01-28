import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)
const { ObjectId } = mongoose.Schema


const TransactionDetailSchema = new mongoose.Schema({
   transactionID: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   transact_from: {
      type: String,
      required: true,
   },
   transact_to: {
      type: String,
      required: true,
   },
   desc: {
      type: String,
      requried: true
   },
   transact_amount: {
      type: Number
   },
   transact_amount_to: {
      type: String,
      required: true
   },
   transact_amount_from: {
      type: String,
      required: true
   },
   staff_auth: {
      type: ObjectId,
      ref: 'FranchiseStaff',
      default: '600f5a4edbbeb72d8cb23008'
   },
}, { timestamps: true })

export default mongoose.model('TransactionDetail', TransactionDetailSchema)