import jwt from 'jsonwebtoken'

const bankUsersPos = async (req, res, next) => {
   try {
      let token = req.header("x-auth-token")
      if (!token) return res.status(400).json({
         error: [
            { msg: "No token , authorization denied" }
         ]
      })

      jwt.verify(token, process.env.Jwt_Secret_Users_ATM, (err, user) => {
         if (err) return res.status(400).json({
            error: [
               { msg: "Invalid Authentication, Unauthorized User" }
            ]
         })

         req.posBankUser = user
         next()
      })
   } catch (error) {
      return res.status(500).json({
         error: [
            { msg: `Server Error: ${error.message}` }
         ]
      })
   }
}

export default bankUsersPos