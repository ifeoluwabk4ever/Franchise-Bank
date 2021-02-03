import React, { useState } from 'react'
import { BsPhone } from 'react-icons/all'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalHeader, NavLink, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'



import { loadUserAirtime } from '../../Data/Actions/BankUserAction';


const MyQuickAirtime = ({ loadUserAirtime, isAirtime, isUser, isLoading }) => {

   const [isOpen, setIsOpen] = useState(false);
   const [transact_amount, setTransact_amount] = useState('');

   const toggle = () => {
      setIsOpen(!isOpen)
   }

   const handleAirtimeRecharge = e => {
      e.preventDefault()

      loadUserAirtime({ transact_amount })
   }

   if (isUser && isAirtime) {
      return <Redirect to="/my-details" />
   }

   return (
      <div>
         <NavLink href="#" onClick={toggle}>
            <div>
               <BsPhone color="#0d6efd" size={24} />
            </div>
         </NavLink>
         <Modal isOpen={isOpen}>
            <ModalHeader toggle={toggle} className="text-capitalize">airtime recharge </ModalHeader>
            <ModalBody>
               <form onSubmit={handleAirtimeRecharge}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control"
                        value={transact_amount}
                        onChange={e => setTransact_amount(e.target.value)}
                        name="transact_amount"
                        id="transact_amount"
                        placeholder="Amount to recharge"
                     />
                     <label htmlFor="transact_amount">Airtime Amount</label>
                  </div>
                  {isLoading ?
                     <div className="my-3">
                        <MoonLoader size={32} />
                     </div>
                     : <Button
                        color="dark"
                        type="submit"
                        className="text-capitalize"
                     >Recharge</Button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}
const mapStateToProps = state => ({
   isUser: state.users.isUser,
   isAirtime: state.users.isAirtime,
   isLoading: state.users.isLoading,
})


export default connect(mapStateToProps, { loadUserAirtime })(MyQuickAirtime)
