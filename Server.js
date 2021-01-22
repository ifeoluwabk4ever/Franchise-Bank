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


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

// Set Public Folder
// Neccesaries Middlewares
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'Public')))



// Love Links Routes
app.use('/love-link', AccountTypeRoute)
app.use('/love-link', AccountCategoryRoute)
app.use('/love-link', UserBVNRoute)


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