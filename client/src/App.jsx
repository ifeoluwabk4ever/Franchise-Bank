import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import $ from 'jquery'
import 'popper.js'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router } from 'react-router-dom'



import './App.css';
import store from './Data/Store'
import setAuthToken from './Helpers/SetAuthToken'
import { loadBankUser } from './Data/Actions/BankUserAction'
import { loadBankStaff } from './Data/Actions/BankStaffAction'
import { getAccTypes } from './Data/Actions/AccountTypesAction'
import { getAccCategory } from './Data/Actions/AccountCategoryAction'
import Routes from './Routes'
import DataProvider from './Data/Context'


if (localStorage.token) {
   setAuthToken(localStorage.token)
}



const App = () => {
   useEffect(() => {
      store.dispatch(loadBankUser())
      store.dispatch(loadBankStaff())
      store.dispatch(getAccTypes())
      store.dispatch(getAccCategory())
   }, [])


   return (
      <Provider store={store}>
         <DataProvider>
            <Router>
               <Routes />
            </Router>
         </DataProvider>
      </Provider>
   )
}

export default App