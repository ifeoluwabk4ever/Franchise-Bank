import React, { useContext, useState } from 'react'
import { MoonLoader } from 'react-spinners';
import { Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap'
import { GlobalState } from '../../Data/Context';

const CheckUserModal = () => {

   const { isLoading } = useContext(GlobalState)

   const [modal, setModal] = useState(false);
   // const [checkModal, setCheckModal] = useState(false);
   const [data, setData] = useState({
      email: '',
      account_number: ''
   });

   const { email, account_number } = data

   const handleDataChange = input => e => {
      setData({ ...data, [input]: e.target.value })
   }

   const toggle = () => {
      setModal(!modal)
   }

   // const toggleCheck = () => {
   //    setCheckModal(!checkModal)
   //    toggle()
   // }

   return (
      <div>
         <NavLink href="#" onClick={toggle}>Check user</NavLink>
         <Modal isOpen={modal}>
            <ModalHeader toggle={toggle} className="list-group-item-primary">Check User</ModalHeader>
            <ModalBody>
               <form>
                  <div className="form-floating mb-3">
                     <input type="email"
                        placeholder="Email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleDataChange("email")}
                     />
                     <label htmlFor="email">Email:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input type="text"
                        placeholder="Account Number"
                        className="form-control"
                        id="account_number"
                        name="account_number"
                        value={account_number}
                        onChange={handleDataChange("account_number")}
                     />
                     <label htmlFor="account_number">Account Number:</label>
                  </div>
                  {isLoading ?
                     <div className="my-3">
                        <MoonLoader size={32} color="#0d6efd" />
                     </div>
                     : <button type="submit" className="btn btn-primary text-capitalize my-3">check</button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}

export default CheckUserModal
