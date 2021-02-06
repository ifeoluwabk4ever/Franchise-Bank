import React, { createContext } from 'react'
import { connect } from 'react-redux'


import { registerBankUser, registerPasswordBankUser, verifyTokenBankUser, loginBankUser, getMyManager, loadUserAirtime, getGeneratedToken, createUserPayment } from './Actions/BankUserAction'
import { loginBankStaff, registerPasswordBankStaff, verifyTokenBankStaff, registerBankStaff } from './Actions/BankStaffAction'

export const GlobalState = createContext()

const DataProvider = ({ children, isStaff, bankStaff, isUser, isLoadingStaff, isAddedStaff, addedMsgStaff, isLoading, isAdded, addedMsg, allTypes, allCategory, registerBankUser, isLoggedInStaff, loginBankStaff, isVerifyStaff, registerPasswordBankUser, verifyTokenBankUser, isLoggedIn, loginBankUser, bankUser, isManager, manager, getMyManager, isAirtime, loadUserAirtime, isTokenGen, genToken, getGeneratedToken, isTransfer, createUserPayment, registerPasswordBankStaff, verifyTokenBankStaff, registerBankStaff }) => {
   var isMobile = /iPhone| iPod| iPad| Andriod | Mobile/i.test(navigator.userAgent)

   var isMobileWidth = window.innerWidth < 768

   let isMobileScreen = isMobileWidth || isMobile

   var timeOfDay

   let time = new Date().getHours()

   if (time >= 0 && time <= 11) {
      timeOfDay = "Good morning"
   } else if (time >= 12 && time <= 15) {
      timeOfDay = "Good afternoon"
   } else if (time >= 16 && time <= 18) {
      timeOfDay = "Good evening"
   } else {
      timeOfDay = "Good night"
   }

   let nairaSign = <span>&#8358;</span>


   const isAdmin = isStaff && bankStaff.role === 'AdminStaff'

   const state = {
      isMobileScreen,
      nairaSign,
      timeOfDay,
      isAdmin,

      isStaff, isLoadingStaff, isAddedStaff, addedMsgStaff, isLoggedInStaff, loginBankStaff, isVerifyStaff, registerPasswordBankStaff, verifyTokenBankStaff, registerBankStaff, bankStaff,

      isLoading, isAdded, addedMsg, isUser,
      registerBankUser, registerPasswordBankUser, verifyTokenBankUser, isLoggedIn, loginBankUser, bankUser, isManager, manager, getMyManager, isAirtime, loadUserAirtime, isTokenGen, genToken, getGeneratedToken, isTransfer, createUserPayment,

      allTypes, allCategory,
   }
   return (
      <GlobalState.Provider value={state}>
         {children}
      </GlobalState.Provider>
   )
}


const mapStateToProps = state => ({
   bankStaff: state.staff.bankStaff,
   isStaff: state.staff.isStaff,
   isLoadingStaff: state.staff.isLoading,
   isAddedStaff: state.staff.isAdded,
   addedMsgStaff: state.staff.addedMsg,
   isLoggedInStaff: state.staff.isLoggedIn,
   isVerifyStaff: state.staff.isVerify,

   isUser: state.users.isUser,
   isLoading: state.users.isLoading,
   isAdded: state.users.isAdded,
   bankUser: state.users.users,
   addedMsg: state.users.addedMsg,
   isAirtime: state.users.isAirtime,
   manager: state.users.manager,
   isTokenGen: state.users.isTokenGen,
   isTransfer: state.users.isTransfer,
   genToken: state.users.genToken,
   isManager: state.users.isManager,
   isLoggedIn: state.users.isLoggedIn,

   allTypes: state.accTypes.acctypes,
   allCategory: state.accCategory.acccategory,

})


export default connect(mapStateToProps, { registerBankUser, loginBankStaff, registerPasswordBankUser, verifyTokenBankUser, loginBankUser, getMyManager, loadUserAirtime, getGeneratedToken, createUserPayment, registerPasswordBankStaff, verifyTokenBankStaff, registerBankStaff })(DataProvider)
