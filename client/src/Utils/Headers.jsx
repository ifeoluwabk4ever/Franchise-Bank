import React, { Fragment, useContext, useState } from 'react'
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap'


import BankingWorldSelect from './BankingWorldSelect'
import Logout from './Logout'
import logo from '../Images/Franchise.png'
import { GlobalState } from '../Data/Context'
import CheckUserModal from '../Components/StaffActivity/CheckUserModal'


const Headers = () => {

   const { isUser, isStaff } = useContext(GlobalState)

   const [isOpen, setIsOpen] = useState(false)


   const toggle = () => {
      setIsOpen(!isOpen)
   }

   const staffLinks = (
      <Fragment>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/full-user-register">user registration</NavLink>
         </NavItem>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/full-staff-register">staff registration</NavLink>
         </NavItem>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <CheckUserModal />
         </NavItem>
      </Fragment>
   )

   const mainLinks = (
      <Fragment>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <NavLink href="/">Home</NavLink>
         </NavItem>
         {isUser &&
            <NavItem className="text-white-50 text-capitalize animate2 navList">
               <NavLink href="/my-details">My Profile</NavLink>
            </NavItem>
         }
         {!isStaff ?
            <Fragment>
               <NavItem className="text-white-50 text-capitalize animate2 navList">
                  <NavLink href="/about-us">about us</NavLink>
               </NavItem>
               <NavItem className="text-white-50 text-capitalize animate2 navList">
                  <NavLink href="/contact-us">contact us</NavLink>
               </NavItem>
            </Fragment>
            : (staffLinks)
         }
      </Fragment>
   )

   const authLinks = (
      <Fragment>
         <NavItem className="text-white-50 text-capitalize animate2 navList">
            <BankingWorldSelect />
         </NavItem>
      </Fragment>

   )

   const notAuthLinks = (
      <Fragment>
         <NavItem className="text-white-50 animate2 navList">
            <Logout />
         </NavItem>
      </Fragment>
   )


   return (
      <Navbar dark sticky="top" style={{ background: '#063251' }} expand="lg"
         className="shadow">
         <Container>
            <NavbarToggler onClick={toggle} />
            <div className="d-flex align-items-center">
               <NavbarBrand href={`${isUser ? '/my-details' : '/'}`}>
                  <img src={logo} alt="Franchise" className="main-logo" />
               </NavbarBrand>
               <NavbarBrand href={`${isUser ? '/my-details' : '/'}`} className="d-none d-lg-block">
                  <h2 className="text-capitalize animate2" style={{ fontFamily: 'MV Boli,cursive' }}><span className="text-primary">Franchise</span>Bank</h2>
               </NavbarBrand>
            </div>
            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-auto d-flex align-items-center" navbar onClick={toggle}>
                  {mainLinks}
                  {(isUser || isStaff) ? notAuthLinks : authLinks}
               </Nav>
            </Collapse>
         </Container>
      </Navbar>
   )
}


export default Headers
