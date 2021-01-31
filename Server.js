import dotenv from 'dotenv'
dotenv.config({
   path: './Config/config.env'
})
import express from 'express'
import 'colors'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'


// Import files
import connectDB from './Config/Db.js'
import AccountTypeRoute from './Routes/AccountTypeRoute.js'
import AccountCategoryRoute from './Routes/AccountCategoryRoute.js'
import UserBVNRoute from './Routes/UserBVNRoute.js'
import BankUsersRoute from './Routes/BankUsersRoutes.js'
import BankStaffRoute from './Routes/BankStaffRoutes.js'
import TransactionTypeRoute from './Routes/TransactionTypeRoutes.js'
import TransactionDetailsRoute from './Routes/TransactionDetailRoutes.js'
import ImageUploadRoute from './Routes/ImageUpload.js'
import UserATMRoute from './Routes/UserATMRoutes.js'


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

// Set Public Folder
// Neccesaries Middlewares
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'Public')))



// Franchise Routes
app.use('/franchise/account-type', AccountTypeRoute)
app.use('/franchise/account-category', AccountCategoryRoute)
app.use('/franchise/account-user', BankUsersRoute)
app.use('/franchise/staff', BankStaffRoute)
app.use('/franchise/atm', UserATMRoute)
app.use('/franchise', TransactionTypeRoute)
app.use('/franchise', UserBVNRoute)
app.use('/franchise', TransactionDetailsRoute)
app.use('/franchise', ImageUploadRoute)


// Page not found
app.use((req, res) => {
   res.status(400).json({
      msg: `Route not found`
   })
})

const PORT = process.env.PORT || process.env.PORT_NUMBER

connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`.white.bgBlue.dim);
   })
})