import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap'

const BankingWorldSelect = () => {

   const [modal, setModal] = useState(false)


   const toggle = () => {
      setModal(!modal)
   }

   return (
      <div>
         <NavLink onClick={toggle} href="#">Banking world </NavLink>
         <Modal isOpen={modal}>
            <ModalHeader toggle={toggle} className="text-uppercase">Options</ModalHeader>
            <ModalBody>
               <div className="d-flex justify-content-between align-content-center">
                  <NavLink
                     className="btn btn-info"
                     href="/user-login"
                  >User</NavLink>
                  <NavLink
                     className="btn btn-info"
                     href="/staff-login"
                  >Staff</NavLink>
               </div>
            </ModalBody>
         </Modal>
      </div>
   )
}

export default BankingWorldSelect
