import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


import { GlobalState } from './Data/Context'
import StaffLogin from './Components/Auth/StaffLogin'
import UsersLogin from './Components/Auth/UsersLogin'
import MyDetails from './Pages/Screens/MyDetails'
import MyTransfer from './Pages/Screens/MyTransfer'
import ErrorPage from './Pages/Views/404Page'
import Home from './Pages/Views/Home'
import Headers from './Utils/Headers'
import UserRegister from './Components/Auth/UserRegister'
import MyInfo from './Pages/Screens/MyInfo'
import StaffRegister from './Components/Auth/StaffRegister'
import Footer from './Utils/Footer'
import FullUserRegistration from './Components/Auth/Authentication/FullUserRegistration'
import FullStaffRegistration from './Components/Auth/Authentication/FullStaffRegistration'
import MyAccountManager from './Pages/Screens/MyAccountManager'
import MyStaffInfo from './Pages/Views/MyStaffInfo'
import CheckedUser from './Components/StaffActivity/CheckedUser'


const Routes = () => {
   const { isMobileScreen, isAdmin, isUser, isStaff } = useContext(GlobalState)

   var notMobileStaff = !isMobileScreen || !isStaff,
      mobileStaff = !isMobileScreen || isStaff

   return (
      <div className="main-bg">
         <div className="desktop-home-div">
            {!isMobileScreen ? <Headers /> : <Headers />}
         </div>
         <ToastContainer />
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user-login" component={UsersLogin} />
            <Route exact path="/user-register" component={UserRegister} />
            <Route exact path="/full-user-register" component={mobileStaff ? FullUserRegistration : ErrorPage} />
            <Route exact path="/staff-register" component={notMobileStaff ? StaffRegister : ErrorPage} />
            <Route exact path="/full-staff-register" component={!isMobileScreen && isAdmin ? FullStaffRegistration : ErrorPage} />
            <Route exact path="/staff-login" component={notMobileStaff ? StaffLogin : ErrorPage} />
            <Route exact path="/my-quick-transfer" component={isUser ? MyTransfer : ErrorPage} />
            <Route exact path="/my-user-info" component={isUser ? MyInfo : ErrorPage} />
            <Route exact path="/my-details" component={isUser ? MyDetails : ErrorPage} />
            <Route exact path="/my-account-manager" component={isUser ? MyAccountManager : ErrorPage} />
            <Route exact path="/staff-details" component={mobileStaff ? MyStaffInfo : ErrorPage} />
            <Route exact path="/checked-user" component={mobileStaff ? CheckedUser : ErrorPage} />
            <Route component={ErrorPage} />
         </Switch>
         <div className="desktop-home-div">
            {!isMobileScreen ? <Footer /> : <Footer />}
         </div>
      </div>
   )
}

export default Routes
