import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Navbar } from 'reactstrap'
import MyQuickHandle from './MyQuickHandle'

const MyHomePage = () => {


   return (
      <div>
         <MyQuickHandle cssprop="mobile-home-option" />
         <Navbar fixed="bottom" className="py-0 px-5">
            <ButtonGroup className="w-100">
               <Link
                  className="text-capitalize mr-5 btn btn-primary"
                  to="/user-register">
                  sign in
                  </Link>
               <Link
                  className="text-capitalize ml-5 btn btn-primary"
                  to="/user-login">
                  log in
               </Link>
            </ButtonGroup>
         </Navbar>
      </div>
   )
}

export default MyHomePage
