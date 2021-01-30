import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'


import StaffLogin from './Components/Auth/StaffLogin'
import UsersLogin from './Components/Auth/UsersLogin'
import MyDetails from './Pages/Screens/MyDetails'
import MyHomePage from './Pages/Screens/MyHomePage'
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


const Routes = ({ isUser }) => {
   return (
      <div className="main-bg">
         <Headers />
         <ToastContainer />
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user-login" component={UsersLogin} />
            <Route exact path="/user-register" component={UserRegister} />
            <Route exact path="/full-user-register" component={FullUserRegistration} />
            <Route exact path="/staff-register" component={StaffRegister} />
            <Route exact path="/full-staff-register" component={FullStaffRegistration} />
            <Route exact path="/staff-login" component={StaffLogin} />
            <Route exact path="/my-home-page" component={MyHomePage} />
            <Route exact path="/my-quick-transfer" component={isUser ? MyTransfer : ErrorPage} />
            <Route exact path="/my-user-info" component={isUser ? MyInfo : ErrorPage} />
            <Route exact path="/my-details" component={isUser ? MyDetails : ErrorPage} />
            <Route component={ErrorPage} />
         </Switch>
         <Footer />
      </div>
   )
}

const mapStateToProps = state => ({
   isUser: state.users.isUser
})

export default connect(mapStateToProps, null)(Routes)
