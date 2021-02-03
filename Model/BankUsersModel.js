import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)
const { ObjectId } = mongoose.Schema


const FranchiseUserSchema = new mongoose.Schema({
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
   mothers_telephone: {
      type: String,
      required: true,
      trim: true
   },
   telephone: {
      type: String,
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
      trim: true,
      default: 0
   },
   occupation: {
      type: String,
      required: true,
      trim: true
   },
   account_type: {
      type: ObjectId,
      required: true,
      ref: 'AccountType'
   },
   account_type_name: {
      type: String,
      required: true,
      trim: true
   },
   account_category: {
      type: ObjectId,
      required: true,
      ref: 'AccountCategory'
   },
   account_category_name: {
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
   history: {
      type: Array,
      default: []
   },
   username: {
      type: String,
      default: ''
   },
   password: {
      type: String,
      default: ''
   },
   atm_pin: {
      type: String,
      default: ''
   },
   atm_number: {
      type: String,
      default: ''
   },
   atm_expiry: {
      type: Date,
      default: ''
   },
   atm_cvv: {
      type: String,
      default: ''
   },
   ussd_pin: {
      type: String,
      default: ''
   },
   token: {
      type: String,
      default: ''
   },
   initUsername: {
      type: String,
      default: ''
   },
   initPassword: {
      type: String,
      default: ''
   },
   manager: {
      type: ObjectId,
      ref: 'FranchiseStaff',
      required: true
   }
}, { timestamps: true })

export default mongoose.model('FranchiseUser', FranchiseUserSchema)