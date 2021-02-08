import React, { useContext } from 'react'
import { Link } from 'react-router-dom'


import { GlobalState } from '../../Data/Context'
import Loading from '../../Utils/Misc/Loading'
import MobileNavbar from '../Screens/MobileNavbar'

const ErrorPage = () => {

   const { isMobileScreen, isLoading, isLoadingStaff } = useContext(GlobalState)

   var loading = isLoading || isLoadingStaff

   if (loading) return <Loading />

   return (
      <div className="gen-bg">
         <div className="mobile-home-div">
            {isMobileScreen ? <MobileNavbar /> : <MobileNavbar />}
         </div>
         <div className={`error-page container d-flex justify-content-center align-content-center ${isMobileScreen ? 'mobile-height' : 'gen-height'}`}>
            <div className="m-auto p-4">
               <h1>404</h1>
               <p>Page not found</p>
               <Link to="/" className="btn btn-outline-primary text-uppercase navList">return home</Link>
            </div>

         </div>
      </div>
   )
}

export default ErrorPage
