import React, { useState } from 'react'
import { Card, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'


import { registerPasswordBankUser, verifyTokenBankUser } from '../../Data/Actions/BankUserAction'

const UserRegister = ({ registerPasswordBankUser, isLoading, isUser, isVerify, verifyTokenBankUser, isLoggedIn }) => {

   const [state, setState] = useState({
      username: '',
      password: '',
      account_number: ''
   });
   const [callbackUserRegister, setCallbackUserRegister] = useState(false);
   const [callbackVerifyToken, setCallbackVerifyToken] = useState(false);
   const [modal, setModal] = useState(false);
   const [token, setToken] = useState('');

   let { username, password, account_number } = state

   const handleDataChange = input => e => {
      let { value } = e.target
      if (input === "token") {
         setToken(value)
      } else {
         setState({
            ...state,
            [input]: value
         })
      }
   }

   const handleSubmit = async e => {
      e.preventDefault()
      registerPasswordBankUser({ username, password, account_number })
      setCallbackUserRegister(true)
   }

   const toggle = () => {
      setModal(!modal)
   }

   if (isVerify && callbackUserRegister) {
      if (!modal) {
         toggle()
      }
   }

   const handleVerifyToken = async e => {
      e.preventDefault()
      verifyTokenBankUser({ token })
      setCallbackVerifyToken(true)
   }

   if (isLoggedIn && isUser && callbackVerifyToken) {
      return <Redirect to="/my-details" />
   }

   return (
      <div className="d-flex align-content-center justify-content-center user-login main-view" style={{ height: '80vh' }}>
         <main className="m-auto">
            <Card className="shadow p-4">
               <div className="my-5">
                  <h2 className="text-center">Welcome</h2>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control"
                        name="account_number"
                        id="account_number"
                        placeholder="Account Number"
                        value={account_number}
                        onChange={handleDataChange("account_number")}
                     />
                     <label htmlFor="account_number">Account Number</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleDataChange("username")}
                     />
                     <label htmlFor="username">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleDataChange("password")}
                     />
                     <label htmlFor="password">Password</label>
                  </div>
                  {isLoading ?
                     <div className="my-3">
                        <MoonLoader size={32} />
                     </div>
                     : <button type="submit" className="btn btn-dark text-capitalize">Login</button>
                  }
               </form>
            </Card>
            <Modal isOpen={modal}>
               <ModalHeader toggle={toggle}>
                  <h1>Verify Token</h1>
               </ModalHeader>
               <ModalBody>
                  <form onSubmit={handleVerifyToken}>
                     <div className="form-floating mb-3">
                        <input
                           type="text"
                           className="form-control"
                           name="token"
                           id="password"
                           placeholder="Token"
                           value={token}
                           onChange={handleDataChange("token")}
                        />
                        <label htmlFor="token">Token:</label>
                     </div>
                     {isLoading ?
                        <div className="my-3">
                           <MoonLoader size={32} />
                        </div>
                        : <button type="submit" className="btn btn-dark text-capitalize">verify</button>
                     }
                  </form>
               </ModalBody>
            </Modal>
         </main>
      </div>
   )
}

const mapStateToProps = state => ({
   isVerify: state.users.isVerify,
   isLoggedIn: state.users.isLoggedIn,
   isLoading: state.users.isLoading,
   isUser: state.users.isUser
})

export default connect(mapStateToProps, { registerPasswordBankUser, verifyTokenBankUser })(UserRegister)