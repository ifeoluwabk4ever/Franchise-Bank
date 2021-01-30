import BankStaffModel from "../Model/BankStaffModel.js"


const BankAdminStaffAuth = async (req, res, next) => {
   try {
      // Get user info by Id
      let user = await BankStaffModel.findOne({ _id: req.bankStaff.id })

      if (user.role !== "AdminStaff") {
         return res.status(403).json({
            error: [
               { msg: 'Unauthorized User, Access denied' }
            ]
         })
      }

      next()
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}

export default BankAdminStaffAuth