import React, { useState } from 'react'
import { Card } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'


import { createUserPayment } from '../../Data/Actions/BankUserAction';

const MyTransfer = ({ createUserPayment, isLoading, isUser, isTransfer }) => {

   const [state, setState] = useState({
      transact_to: '',
      transact_amount: ''
   });
   const [callbackUserTransfer, setCallbackUserTransfer] = useState(false);

   let { transact_to, transact_amount } = state

   const handleDataChange = input => e => {
      let { value } = e.target
      setState({
         ...state,
         [input]: value
      })
   }

   const handleSubmit = async e => {
      e.preventDefault()
      createUserPayment({ transact_to, transact_amount })
      setCallbackUserTransfer(true)
   }
   if (isUser && isTransfer && callbackUserTransfer) {
      return <Redirect to="/my-details" />
   }


   return (
      <div className="d-flex align-content-center justify-content-center user-login main-view" style={{ height: '80vh' }}>
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
                  {isLoading ?
                     <div className="my-3">
                        <MoonLoader size={32} />
                     </div>
                     : <button type="submit" className="btn btn-dark text-capitalize">Login</button>
                  }
               </form>
            </Card>
         </main>
      </div>
   )
}
const mapStateToProps = state => ({
   isLoading: state.users.isLoading,
   isTransfer: state.users.isTransfer,
   isUser: state.users.isUser,
})

export default connect(mapStateToProps, { createUserPayment })(MyTransfer)
