import React, { useState, useEffect, useContext } from 'react'
import { BiWalletAlt } from 'react-icons/all'
import { Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap'
import { GlobalState } from '../../Data/Context'



const MySoftToken = () => {

   const { getGeneratedToken, genToken, isTokenGen, isUser } = useContext(GlobalState)

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
            <ModalHeader toggle={toggle} className="text-capitalize list-group-item-primary"> soft token </ModalHeader>
            <ModalBody>
               <p>Your one-time soft token is:- <b>{genToken}</b></p>
            </ModalBody>
         </Modal>
      </div>
   )
}

export default MySoftToken
