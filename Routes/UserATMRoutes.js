import express from 'express'
import { destroyUserATM, registerUserATM } from '../Controllers/UserATMController.js'
import bankStaff from '../Middleware/BankStaffAuth.js'


const router = express.Router()

router.post('/register-atm', bankStaff, registerUserATM)

router.post('/atm-destroy', bankStaff, destroyUserATM)

export default router