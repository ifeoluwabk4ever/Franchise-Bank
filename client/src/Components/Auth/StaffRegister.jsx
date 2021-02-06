import React, { useContext, useState } from 'react'
import { Card, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { MoonLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'

import { GlobalState } from '../../Data/Context'


const StaffRegister = () => {

   const { registerPasswordBankStaff, isLoadingStaff, isStaff, isVerifyStaff, verifyTokenBankStaff, isLoggedInStaff } = useContext(GlobalState)

   const [state, setState] = useState({
      staffID: '',
      password: ''
   });
   const [callbackStaffRegister, setCallbackStaffRegister] = useState(false);
   const [callbackStaffVerifyToken, setCallbackStaffVerifyToken] = useState(false);
   const [modal, setModal] = useState(false);
   const [token, setToken] = useState('');

   let { staffID, password } = state

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
      registerPasswordBankStaff({ staffID, password })
      setCallbackStaffRegister(true)
   }

   const toggle = () => {
      setModal(!modal)
   }

   if (isVerifyStaff && callbackStaffRegister) {
      if (!modal) {
         toggle()
      }
   }

   const handleVerifyToken = async e => {
      e.preventDefault()
      verifyTokenBankStaff({ token })
      setCallbackStaffVerifyToken(true)
   }

   if (isLoggedInStaff && isStaff && callbackStaffVerifyToken) {
      return <Redirect to="staff-details" />
   }

   return (
      <div className="d-flex align-content-center justify-content-center user-login main-view gen-height">
         <main className="m-auto">
            <Card className="shadow p-4">
               <div className="my-5">
                  <h2 className="text-uppercase text-decoration-underline text-center title-color">Welcome</h2>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control"
                        name="staffID"
                        id="staffID"
                        placeholder="StaffID"
                        value={staffID}
                        onChange={handleDataChange("staffID")}
                     />
                     <label htmlFor="staffID">StaffID</label>
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
                  {isLoadingStaff ?
                     <div className="my-3">
                        <MoonLoader size={32} />
                     </div>
                     : <button type="submit" className="btn btn-dark text-capitalize">send</button>
                  }
               </form>
            </Card>
            <Modal isOpen={modal}>
               <ModalHeader toggle={toggle} className="list-group-item-primary"> Verify Token </ModalHeader>
               <ModalBody>
                  <form onSubmit={handleVerifyToken}>
                     <div className="form-floating mb-3">
                        <input
                           type="text"
                           className="form-control"
                           name="token"
                           id="token"
                           placeholder="Token"
                           value={token}
                           onChange={handleDataChange("token")}
                        />
                        <label htmlFor="token">Token:</label>
                     </div>
                     {isLoadingStaff ?
                        <div className="my-3">
                           <MoonLoader size={32} color="#0d6efd" />
                        </div>
                        : <button type="submit" className="btn btn-primary text-capitalize">verify</button>
                     }
                  </form>
               </ModalBody>
            </Modal>
         </main>
      </div>
   )
}


export default StaffRegister
