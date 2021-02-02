import mongoose from 'mongoose'


const { ObjectId } = mongoose.Schema

const UserATMSchema = new mongoose.Schema({
   staff_auth: {
      type: ObjectId,
      ref: 'FranchiseStaff'
   },
   user_auth: {
      type: ObjectId,
      ref: 'FranchiseUser'
   },
   fullName: {
      type: String,
      required: true
   },
   account_number: {
      type: String,
      required: true
   },
   atm_number: {
      type: String,
      required: true,
      length: 16,
      unique: true
   },
   atm_expiry: {
      type: Date,
      required: true,
   },
   atm_cvv: {
      type: String,
      required: true,
      length: 3
   },
   card_type: {
      type: String,
      required: true
   }
}, { timestamps: true })

export default mongoose.model('UserATM', UserATMSchema)