import React, { useContext, useState } from 'react'
import { Card } from 'reactstrap'
import { MoonLoader } from 'react-spinners'


import { Link, Redirect } from 'react-router-dom'
import { GlobalState } from '../../Data/Context'

const StaffLogin = () => {
   const { isLoggedInStaff, isStaff, loginBankStaff, isLoadingStaff } = useContext(GlobalState)

   const [state, setState] = useState({
      staffID: '',
      password: ''
   });
   const [callbackStaffLogin, setCallbackStaffLogin] = useState(false);

   let { staffID, password } = state

   const handleDataChange = input => e => {
      let { value } = e.target
      setState({
         ...state,
         [input]: value
      })
   }

   const handleSubmit = async e => {
      e.preventDefault()
      loginBankStaff({ staffID, password })

      setCallbackStaffLogin(true)
   }

   if (isLoggedInStaff && isStaff && callbackStaffLogin) {
      console.log('Okay');
      return <Redirect to="/" />
   }

   return (
      <div className="d-flex align-content-center justify-content-center user-login main-view gen-height">
         <main className="m-auto">
            <Card className="shadow p-4">
               <div className="my-5">
                  <h2 className="text-uppercase text-decoration-underline text-center title-color">Welcome</h2>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control"
                        name="staffID"
                        id="staffID"
                        placeholder="StaffID"
                        value={staffID}
                        onChange={handleDataChange("staffID")}
                     />
                     <label htmlFor="staffID">StaffID</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleDataChange("password")}
                     />
                     <label htmlFor="password">Password</label>
                  </div>
                  {isLoadingStaff ?
                     <div className="my-3">
                        <MoonLoader size={32} />
                     </div>
                     : <button type="submit" className="btn btn-dark text-capitalize">Login</button>
                  }
               </form>
               <div className="d-flex justify-content-end">
                  <Link
                     to="/staff-register"
                     className="text-capitalize"
                  >New staff? Register</Link>
               </div>
            </Card>
         </main>
      </div>
   )
}

export default StaffLogin
