import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)

const AccountTypeSchema = new mongoose.Schema({
   account_type: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   account_slug: {
      slug: 'account_type',
      unique: true,
      type: String,
      trim: true,
      slug_padding_size: 3
   },
   user_debit: {
      type: Number,
      required: true
   },
   non_user_debit: {
      type: Number,
      required: true
   }
}, { timestamps: true })

export default mongoose.model('AccountType', AccountTypeSchema)