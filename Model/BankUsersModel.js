import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)
const { ObjectId } = mongoose.Schema


const LoveLinkUserSchema = new mongoose.Schema({
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
   name_slug: {
      type: String,
      trim: true,
      unique: true,
      slug: 'fullName',
      slug_padding_size: 3
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
   mothers_firstName: {
      type: String,
      required: true,
      trim: true
   },
   mothers_lastName: {
      type: String,
      required: true,
      trim: true
   },
   mothers_fullName: {
      type: String,
      required: true,
      trim: true
   },
   mothers_email: {
      type: String,
      required: true,
      trim: true
   },
   mothers_gender: {
      type: String,
      required: true,
      trim: true
   },
   mothers_dob: {
      type: Date,
      required: true,
      trim: true
   },
   account_number: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   account_balance: {
      type: Number,
      required: true,
      trim: true
   },
   occupation: {
      type: String,
      required: true,
      trim: true
   },
   acount_type: {
      type: ObjectId,
      required: true,
      ref: 'AccountType'
   },
   acount_type_name: {
      type: String,
      required: true,
      trim: true
   },
   bvn_id: {
      type: ObjectId,
      required: true,
      ref: 'UserBVN'
   },
   bvn_number: {
      type: String,
      required: true,
      trim: true
   },
}, { timestamps: true })

export default mongoose.model('LoveLinkUser', LoveLinkUserSchema)