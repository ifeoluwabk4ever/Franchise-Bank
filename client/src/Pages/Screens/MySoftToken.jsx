import React, { useState, useEffect } from 'react'
import { BiWalletAlt } from 'react-icons/all'
import { connect } from 'react-redux'
import { Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap'


import { getGeneratedToken } from '../../Data/Actions/BankUserAction';


const MySoftToken = ({ getGeneratedToken, genToken, isTokenGen, isUser }) => {

   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => {
      setIsOpen(!isOpen)
   }

   const handleTokenGen = e => {
      e.preventDefault()

      getGeneratedToken()
   }

   useEffect(() => {
      if (isUser && isTokenGen) {
         toggle()
      }
   }, [genToken, isTokenGen])

   return (
      <div>
         <NavLink href="#" onClick={handleTokenGen}>
            <div>
               <BiWalletAlt color="#0d6efd" size={24} />
            </div>
         </NavLink>
         <Modal isOpen={isOpen}>
            <ModalHeader toggle={toggle} className="text-capitalize"> soft token </ModalHeader>
            <ModalBody>
               <p>Your one-time soft token is:- <b>{genToken}</b></p>
            </ModalBody>
         </Modal>
      </div>
   )
}
const mapStateToProps = state => ({
   isUser: state.users.isUser,
   isTokenGen: state.users.isTokenGen,
   genToken: state.users.genToken,
})


export default connect(mapStateToProps, { getGeneratedToken })(MySoftToken)
