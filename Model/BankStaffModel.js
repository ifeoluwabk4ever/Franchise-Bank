import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)
const { ObjectId } = mongoose.Schema


const FranchiseStaffSchema = new mongoose.Schema({
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
   telephone: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   account_number: {
      type: String,
      required: true,
      trim: true,
      unique: true
   },
   account_id: {
      type: ObjectId,
      ref: 'FranchiseUser',
      required: true
   },
   role: {
      type: String,
      default: "NormalStaff"
   },
   salary: {
      type: Number,
      default: 50000
   },
   level: {
      type: Number,
      default: 5
   },
   staffID: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      default: ''
   },
   avatar: {
      type: String,
      required: true
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
}, { timestamps: true })

export default mongoose.model('FranchiseStaff', FranchiseStaffSchema)