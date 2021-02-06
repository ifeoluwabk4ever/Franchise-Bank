import React, { Fragment, useContext, useState } from 'react'
import { Card } from 'reactstrap'
import { MoonLoader } from 'react-spinners'
import { Link, Redirect } from 'react-router-dom'


import { GlobalState } from '../../Data/Context'
import MobileNavbar from '../../Pages/Screens/MobileNavbar'

const UsersLogin = () => {
   const { isMobileScreen, loginBankUser, isLoading, isUser, isLoggedIn } = useContext(GlobalState)

   const [state, setState] = useState({
      username: '',
      password: ''
   });
   const [callbackUserLogin, setCallbackUserLogin] = useState(false);

   let { username, password } = state

   const handleDataChange = input => e => {
      let { value } = e.target
      setState({
         ...state,
         [input]: value
      })
   }

   const handleSubmit = async e => {
      e.preventDefault()
      loginBankUser({ username, password })
      setCallbackUserLogin(true)
   }
   if (isLoggedIn && isUser && callbackUserLogin) {
      return <Redirect to="/my-details" />
   }

   return (
      <Fragment>
         <div className="mobile-home-div">
            {isMobileScreen ? <MobileNavbar /> : <MobileNavbar />}
         </div>
         <div className={`d-flex align-content-center justify-content-center user-login main-view ${isMobileScreen ? 'mobile-height' : 'gen-height'}`}>
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
                           name="username"
                           id="username"
                           placeholder="Username"
                           value={username}
                           onChange={handleDataChange("username")}
                        />
                        <label htmlFor="username">Username</label>
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
                     {isLoading ?
                        <div className="my-3">
                           <MoonLoader size={32} />
                        </div>
                        : <button type="submit" className="btn btn-dark text-capitalize">Login</button>
                     }
                  </form>
                  <div className="d-flex justify-content-end">
                     <Link
                        to="/user-register"
                        className="text-capitalize"
                     >New user? Register</Link>
                  </div>
               </Card>
            </main>
         </div>
      </Fragment>
   )
}

export default UsersLogin
