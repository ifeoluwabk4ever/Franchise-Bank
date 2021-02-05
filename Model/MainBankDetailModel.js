import mongoose from 'mongoose'


const FranchiseHQSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   salary: {
      type: Number,
      default: null
   },
   income: {
      type: Number,
      default: null
   },
   expenses: {
      type: Number,
      default: null
   },
   staff_strength: {
      type: Number,
      default: null
   },
   salaryHistory: {
      type: Array,
      default: []
   }
}, { timestamps: true })


export default mongoose.model('FranchiseHQ', FranchiseHQSchema)