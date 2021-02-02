import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'


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
import MobileHome from './Pages/Views/MobileHome'


const Routes = ({ isUser }) => {
   const { isMobileScreen } = useContext(GlobalState)

   return (
      <div className="main-bg">
         {!isMobileScreen && <Headers />}
         <ToastContainer />
         <Switch>
            <Route exact path="/" component={!isMobileScreen ? Home : MobileHome} />
            <Route exact path="/user-login" component={UsersLogin} />
            <Route exact path="/user-register" component={UserRegister} />
            <Route exact path="/full-user-register" component={!isMobileScreen ? FullUserRegistration : ErrorPage} />
            <Route exact path="/staff-register" component={!isMobileScreen ? StaffRegister : ErrorPage} />
            <Route exact path="/full-staff-register" component={!isMobileScreen ? FullStaffRegistration : ErrorPage} />
            <Route exact path="/staff-login" component={!isMobileScreen ? StaffLogin : ErrorPage} />
            <Route exact path="/my-quick-transfer" component={isUser ? MyTransfer : ErrorPage} />
            <Route exact path="/my-user-info" component={isUser ? MyInfo : ErrorPage} />
            <Route exact path="/my-details" component={isUser ? MyDetails : ErrorPage} />
            <Route component={ErrorPage} />
         </Switch>
         {!isMobileScreen && <Footer />}
      </div>
   )
}

const mapStateToProps = state => ({
   isUser: state.users.isUser
})

export default connect(mapStateToProps, null)(Routes)
