import React from 'react'


import MyHomePage from '../Screens/MyHomePage'
import logo from '../../Images/Franchise.png'


const MobileHome = () => {
   return (
      <div className="mobile-home-height main-view text-center">
         <div className="d-flex flex-column py-5 mobile-home-bg mobile-home-height">
            <div className="d-flex justify-content-between align-items-center px-5">
               <img src={logo} alt="logo" width="120" height="100" />
               <h1>Welcome</h1>
            </div>
            <div className="mt-auto">
               <MyHomePage />
            </div>
         </div>
      </div>
   )
}

export default MobileHome
