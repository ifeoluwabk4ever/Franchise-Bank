import React, { useState, useEffect, useContext, Fragment } from 'react'
import { Card } from 'reactstrap'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


import { numberWithCommas } from '../../Utils/Misc/Format'
import { GlobalState } from '../../Data/Context'
import MobileNavbar from './MobileNavbar'

const MyTransfer = () => {
   const { isMobileScreen, createUserPayment, isLoading, isUser, isTransfer } = useContext(GlobalState)

   const [state, setState] = useState({
      transact_to: '',
      transact_amount: ''
   });
   const [userFullName, setUserFullName] = useState('');
   const [callbackUserTransfer, setCallbackUserTransfer] = useState(false);
   const [loading, setLoading] = useState(false);

   let { transact_to, transact_amount } = state

   const handleDataChange = input => e => {
      let { value } = e.target
      setState({
         ...state,
         [input]: value
      })
   }

   const handleNameDetail = async () => {
      // Config header for axios
      let config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }

      // Set body
      let body = JSON.stringify({ account_number: transact_to })
      try {
         let res = await axios.post(`/franchise/account-user/user-fullname`, body, config)
         // let recieverName = 
         setUserFullName(res.data.name)
      } catch (err) {
         let errors = err.response.data.error
         if (errors) errors.forEach(error => toast.error(error.msg))
      }
   }

   useEffect(() => {
      if (transact_to.length === 10) {
         handleNameDetail()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [transact_to])

   const handleSubmit = async e => {
      e.preventDefault()
      setLoading(true)
      if (transact_to.length !== 10) {
         setLoading(false)
         return toast.error("Account number should be 10 digits")
      }
      if (!transact_amount) {
         setLoading(false)
         return toast.error("Transaction amount needed")
      }
      if (window.confirm(`Do you want to send ${numberWithCommas(transact_amount)} to ${userFullName}?`)) {
         setLoading(false)
         createUserPayment({ transact_to, transact_amount })
         setCallbackUserTransfer(true)
      }
      setLoading(false)
   }

   if (isUser && isTransfer && callbackUserTransfer) {
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
                     <h2 className="text-center text-capitalize">Banking with ease</h2>
                  </div>
                  <form onSubmit={handleSubmit}>
                     <div className="form-floating mb-3">
                        <input
                           type="text"
                           className="form-control"
                           name="transact_to"
                           id="transact_to"
                           placeholder="Transfer To"
                           value={transact_to}
                           onChange={handleDataChange("transact_to")}
                        />
                        <label htmlFor="transact_to">Account Number:</label>
                     </div>
                     <div className="form-floating mb-3">
                        <input
                           type="number"
                           className="form-control"
                           name="transact_amount"
                           id="transact_amount"
                           placeholder="Amount"
                           value={transact_amount}
                           onChange={handleDataChange("transact_amount")}
                        />
                        <label htmlFor="transact_amount">Amount:</label>
                     </div>
                     {isLoading || loading ?
                        <div className="my-3">
                           <MoonLoader size={32} />
                        </div>
                        : <button type="submit" className="btn btn-dark text-capitalize">send</button>
                     }
                  </form>
               </Card>
            </main>
         </div>
      </Fragment>
   )
}

export default MyTransfer
