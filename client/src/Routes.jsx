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


const Routes = ({ isUser }) => {
   return (
      <div className="main-bg">
         <Headers />
         <ToastContainer />
         <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user-login" component={UsersLogin} />
            <Route exact path="/staff-login" component={StaffLogin} />
            <Route exact path="/my-home-page" component={MyHomePage} />
            <Route exact path="/my-quick-transfer" component={isUser ? MyTransfer : ErrorPage} />
            <Route exact path="/my-details" component={isUser ? MyDetails : ErrorPage} />
            <Route component={ErrorPage} />
         </Switch>
      </div>
   )
}

const mapStateToProps = state => ({
   isUser: state.users.isUser
})

export default connect(mapStateToProps, null)(Routes)
