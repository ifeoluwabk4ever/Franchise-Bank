import mongoose from 'mongoose'

const UserBVNSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      trim: true
   },
   lastName: {
      type: String,
      required: true,
      trim: true
   },
   fullName: {
      type: String,
      required: true,
      trim: true
   },
   email: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   gender: {
      type: String,
      required: true,
      trim: true
   },
   dob: {
      type: Date,
      required: true,
      trim: true
   },
   bvn_number: {
      type: String,
      requried: true,
      unique: true,
      trim: true
   },
   avatar: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   telephone: {
      type: String,
      required: true,
      unique: true
   }
}, { timestamps: true })

export default mongoose.model('UserBVN', UserBVNSchema)